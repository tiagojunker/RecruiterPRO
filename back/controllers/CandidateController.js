const mongoose = require('mongoose')

const jwt = require('jsonwebtoken');
const secret = '!$&*askRUObck1209'
const bcrypt = require('bcrypt')

const RegisterCandidate = require('../models/ResgisterCandidate')
const Register = mongoose.model('RegisterCandidate', RegisterCandidate)

const NewVacancy =require('../models/Vacancy')
const Vacancy = mongoose.model('Vacancies', NewVacancy)

const GetFeedback = require('../models/Feedbacks')
const Feedback = mongoose.model('Feedbacks', GetFeedback)

class Candidate {

    async Create(req, res) {
        let { name, 
            email, 
            password, 
            description,
            linkCV,
            linkedIn } = req.body

        if(name, email, password != undefined && name, email, password != '') {

            let verify = await Register.find({'email': email})

            if(verify.length == 0) {

                let hash = await bcrypt.hash(password, 10);
                let newRegister = new Register({ name, 
                                                email, 
                                                password: hash, 
                                                description,
                                                linkCV,
                                                linkedIn })

                try {
                    await newRegister.save()
                    res.status(200)
                    res.json({status: true, msg: 'Usuário cadastrado com sucesso!'})

                } catch (error) {
                    console.log(error)
                    res.status(500)
                    res.json({status: false, msg: 'Houve um problema com o servidor.'})
                }

            } else {
                res.status(401)
                res.json({status: false, msg: 'Já existe um usuário com esse email no sistema.'})
            }
            
        } else {
            res.status(401)
            res.json({status: false, msg: 'Preencha todos os dados necessários.'})
        }

    }

    async ShowCandidate(req, res) {

        let id = req.params.candidateId
        
        try{
            let candidate = await Register.find({'_id': id})

            if(candidate.length == 0) {
                res.status(404)
                res.json({status: false, msg: 'Nenhum Perfil Encontrado.'})

            } else {
                res.status(200)
                res.json({ status: true, candidate: candidate })

            }

        } catch(error) {
            console.log(error)
            res.status(500)
            res.json({status: false, msg: 'Problemas ao conectar com o servidor.'})
        }
        

    }

    async VacancyApply(req, res) {

        let { vacancyId, candidateId } = req.body

        if(vacancyId != undefined && vacancyId.length != 0 &&
            candidateId != undefined && candidateId.length != 0 ) {

            let validate = await Vacancy.findOne({'_id': vacancyId})
            let candidated = validate.candidates.includes(candidateId)

           if(candidated) {
                res.status(401)
                res.json({status: false, msg: 'Não autorizado, você já está concorrendo a esta vaga.'})
           } else {

                try {
                    const data = await Vacancy.findOne({'_id': vacancyId})
                    data.candidates.push(candidateId)
                    await data.save()
                    res.status(200)
                    res.json({ status: true, msg: 'Candidatura Realizada com sucesso.' })
        
                } catch(err) {
                    console.log(err)
                    res.status(500)
                    res.json({status: false, msg: 'Falha ao se candidatar'})
                }

           }

        } else {

            res.status(401)
            res.json({status: false, msg: 'Não autorizado, preencha todos os dados para se candidatar.'})

        }


    }

    async FindVacancy(req, res) {
        
        let vacancyId = req.params.vacancyId

        try {
            const data = await Vacancy.findOne({'_id': vacancyId})
            res.status(200)
            res.json({status: true, vacancy: data})
        } catch (error) {
            console.log(error)
            res.status(500)
            res.json({status: false, msg: 'Problema ao conectar com servidor.'})
        }
    }

    async GetFeedback(req, res) {

        let candidateId = req.body.candidateId

        try{
            let feedbacks = await Feedback.find({"candidate": candidateId})

            if(feedbacks.length == 0) {
                res.status(404)
                res.json({status: false, msg: 'Nenhum registro de feedback foi encontrado.'})

            } else {     
                res.status(200)
                res.json({status: true, feedbacks: feedbacks})           
            }
            

        } catch(err) {
            console.log(err)
            res.status(500)
            res.json({status: false, msg: 'Houve um erro ao consultar seus feedbacks.'})
        }

    }

    async MyApplications(req, res) {

        let candidateId = req.body.candidateId 

        try {
            const applications = await Vacancy.find({'candidates': candidateId}).sort({'_id': -1})

            if(applications.length == 0) {
                res.status(404)
                res.json({ status: false, msg: 'Você ainda não aplicou para nenhuma vaga.' })

            } else {
                res.status(200)
                res.json({ status: true, applications: applications })
            }

        } catch(err) {
            console.log(err)
            res.status(500)
            res.json({ status: false, msg: 'Houve um problema com o servidor.' })

        }

    }

    async AllVacancies(req, res) {

        try{
            const vacancies = await Vacancy.find({}).sort({'_id': -1})

            if(vacancies.length == 0) {
                res.status(404)
                res.json({ status: false, msg: 'Não existem vagas abertas.' })

            } else {
                res.status(200)
                res.json({ status: true, vacancies: vacancies })

            }

        } catch(err) {
            console.log(err)
            res.status(500)
            res.json({ ststua: false, msg: 'Houve um problema com o servidor' })
        }
        

    }

    async Login(req, res) {

        const {email, password} = req.body
        let user = await Register.find({'email': email})

        if(user.length > 0){

            let compare = await bcrypt.compare(password, user[0].password);
            
            if(compare){
                let token = jwt.sign({ name: user[0].name, email: user[0].email }, secret);
                res.status(200)
                res.json({status: true, token: token, id: user[0]._id.valueOf() })
            } else {
                res.status(401)
                res.json({status: false, msg: 'Senha inválida'})
            }

        } else {
            res.status(404)
            res.json({status: false, msg: 'Usuário não encontrado em nossa base de dados'})
        }

    }

    async validate(req, res){
        res.status(200)
        res.send({status: true, msg: 'Validação OK'})
    }
    
}

module.exports = new Candidate