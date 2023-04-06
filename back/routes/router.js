const express = require('express')
const router = express.Router()

const RecruiterController = require('../controllers/RecruiterController')
const CandidateController = require('../controllers/CandidateController')
const RecruiterLoginAuth = require('../middlewares/RecruiterLoginAuth')
const CandidateLoginAuth = require('../middlewares/CandidateLoginAuth')

router.post('/recruiter/login', RecruiterController.Login)  // Rota que faz autenticação do recruiter
router.post('/recruiter/create', RecruiterController.Create)  // Rota que registra um novo recrutador
router.post('/vacancy/new', RecruiterController.NewVacancy)  // Rota que cria uma nova vaga
router.delete('/vacancy/:id', RecruiterController.deleteVacancy)  // Rota que deleta uma nova vaga
router.get('/vacancy/:vacancyId', RecruiterController.findVacancy)  // Rota que retorna informações de uma vaga
router.patch('/vacancy/:id', RecruiterController.UpdateVacancy)  // Rota que atualiza informações de uma vaga
router.post('/vacancies/show', RecruiterController.ShowMyVacancies)  // Rota que retorna as vagas cadastradas por um recrutador
router.post('/vacancy/sendFeedback', RecruiterController.SendFeedback)  // Rota que envia feedback ao usuário
router.post('/recruiter/validate', RecruiterLoginAuth, RecruiterController.validate)  // Rota que faz validação da autenticação


router.post('/candidate/login', CandidateController.Login)  // Rota que faz autenticação do candidato
router.post('/candidate/create', CandidateController.Create)  // Rota que registra um novo candidato
router.get('/candidate/:candidateId', CandidateController.ShowCandidate)  // Rota que retorna informações de um candidato
router.post('/vacancy/apply', CandidateController.VacancyApply)  // Rota que applica um dandidato a uma vaga
router.post('/vacancy/feedbacks', CandidateController.GetFeedback)  // Rota que rota que obtém os feedbacks de um candidato
router.post('/vacancy/applications', CandidateController.MyApplications)  // Rota que obtém as aplicações em aberto de um candidato
router.get('/vacancyInfo/:vacancyId', CandidateController.FindVacancy)  // Rota que retorna informações de uma vaga 
router.get('/vacancies', CandidateController.AllVacancies)  // Rota que retorna todas as vagas em aberto
router.post('/candidate/validate', CandidateLoginAuth, CandidateController.validate)  // Rota que validação da autenticação

module.exports = router