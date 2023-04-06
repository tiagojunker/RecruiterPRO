const mongoose = require('mongoose')

const jwt = require('jsonwebtoken');
const secret = 'aoskjd0219834jkf09dm256'

const bcrypt = require('bcrypt')

const RegisterRecruiter = require('../models/RegisterRecruiter')
const Register = mongoose.model('RegisterRecruiter', RegisterRecruiter)

const NewVacancy =require('../models/Vacancy')
const Vacancy = mongoose.model('Vacancies', NewVacancy)

const NewFeedback = require('../models/Feedbacks')
const Feedback = mongoose.model('Feedbacks', NewFeedback)

class Recruiter {

    async Create(req, res) {

        let { name, email, password, company } = req.body

        if(name != undefined &&
            email != undefined &&
            password != undefined && 
            name.length != 0 &&
            email.length != 0 &&
            password.length != 0) {

            let verify = await Register.find({'email': email})
            
            if(verify.length == 0) {

                let hash = await bcrypt.hash(password, 10);
                let newRegister = new Register({ name, email, password: hash, company })

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
                res.json({status: false, msg: 'Já existe um cadastro com esse email no sistema.'})
            }

            
            
        } else {
            res.status(401)
            res.json({status: false, msg: 'Preencha todos os dados necessários.'})
        }

    }

    async NewVacancy(req, res) {

        let { title, description, recruiterId } = req.body

        if(title != undefined && 
            description != undefined &&
            recruiterId != undefined && 
            title.length != 0 &&
            description.length != 0 &&
            recruiterId.length != 0 ) {

            try {
                let newVacancy = new Vacancy({ title, description, recruiterId })
                await newVacancy.save()
                res.status(200)
                res.json({status: true, msg: 'Vaga cadastrada com sucesso!'})

            } catch(err) {
                console.log(err)
                res.status(500)
                res.json({status: false, msg: 'Houve um problema com o servidor.'})
            }

        } else {
            res.status(401)
            res.json({status: false, msg: 'Preencha todos os dados necessários.'})
        }

    }

    async deleteVacancy(req, res) {

        let _id = req.params.id

        try {
            await Vacancy.findByIdAndDelete(_id)
            res.status(200)
            res.json({ status: true, msg: 'Vaga finalizada com sucesso.' })

        } catch(err) {
            console.log(err)
            res.status(500)
            res.json({ status: false, msg: 'Houve uma falha ao deletar.' })
        }
    }

    async ShowMyVacancies(req, res) {

        let recruiterId = req.body.recruiterId
    
        try {
            let vacancies = await Vacancy.find({"recruiterId": recruiterId}).sort({_id: -1})

            res.status(200)
            res.json({ status: true, vacancies })
            
        } catch (error) {
            console.log(error)
            res.status(500)
            res.json({ status: false, msg: 'Houve um problema ao consultar as vagas.' })
        }
    }

    async UpdateVacancy(req, res) {
        
        let { title, description, vacancyId } = req.body

        if(title != undefined &&
            description != undefined &
            title.length != 0 &&
            description.length != 0) {

                try{
                    await Vacancy.findByIdAndUpdate(vacancyId, { title, description })
                    res.status(200)
                    res.json({ status: true, msg: 'Informações da vaga atualizadas com sucesso.' })
                    
                } catch(err) {
                    console.log(err)
                    res.status(500)
                    res.json({ status:false, msg: 'Houve um erro ao atualizar.' })
                }


        } else {
            res.status(401)
            res.json({ status:false, msg: 'Necessário inserir todas as informações.' })
        }

    }

    async SendFeedback(req, res) {

        let { vacancyTitle, feedbackTitle, feedbackMensage, candidate, vacancyId } = req.body

        console.log(candidate, vacancyId)

        if(vacancyTitle != undefined && vacancyTitle.length != 0 && 
            feedbackTitle != undefined && feedbackTitle.length != 0 &&
            feedbackMensage != undefined && feedbackMensage.length != 0 &&
            candidate != undefined && candidate.length != 0 ) {

                let newFeedback = new Feedback({ 
                    vacancyTitle,
                    feedback: { title: feedbackTitle, mensage: feedbackMensage },
                    candidate
                 })

                 try {
                    await newFeedback.save()

                    try {
                        
                        await Vacancy.updateOne({ _id: vacancyId }, { $pull: { candidates: candidate } });

                        res.status(200)
                        res.json({ status: true, msg: 'Feedback enviado com sucesso.' })

                    } catch (err) {
                        console.log(err)
                        res.status(500)
                        res.json({ status: false, msg: 'Houve um problema finalizar o candidato.' })
                    }

                 } catch(err) {
                    console.log(err)
                    res.status(500)
                    res.json({ status: false, msg: 'Houve um problema ao enviar o feedback.' })
                 }


        } else {
            res.status(401)
            res.json({ status: false, msg: 'Não permitido! Confira os dados e tente novamente.' })
        }
    }

    async findVacancy(req, res) {

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

    async Login(req, res) {

        const {email, password} = req.body
        let user = await Register.find({'email': email})

        if(user.length > 0){

            let compare = await bcrypt.compare(password, user[0].password);
            
            if(compare){
                let token = jwt.sign({ name: user[0].name, email: user[0].email }, secret);
                res.status(200)
                res.json({status: true, token: token, id: user[0]._id.valueOf()})
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

module.exports = new Recruiter