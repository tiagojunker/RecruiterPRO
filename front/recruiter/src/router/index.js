import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

async function recruiterAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    try {
      const validate = await axios.post('http://localhost:3000/recruiter/validate',{},req)
      if(validate.data.status){
        next()
      } else {
        next('/')
      }

    } catch (err) {
      next('/')
    }
  } else {
    next('/')
  }
}

async function candidateAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    let req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    try {
      const validate = await axios.post('http://localhost:3000/candidate/validate',{},req)
      if(validate.data.status){
        next()
      } else {
        next('/')
      }

    } catch (err) {
      next('/')
    }
  } else {
    next('/')
  }
}


const routes = [

  {
    path: '/',
    component: () => import('../views/HomeView')
  },
  {
    path: '/recruiter/login',
    component: () => import('../views/Recruiter/RecruiterLogin')
  },
  {
    path: '/recruiter/new',
    component: () => import('../views/Recruiter/RecruiterCadastro')
  },
  {
    path: '/recruiter/vacancies',
    component: () => import('../views/Recruiter/VacanciesAll'),
    beforeEnter:recruiterAuth
  },
  {
    path: '/recruiter/vacancies/new',
    component: () => import('../views/Recruiter/NewVacancy'),
    beforeEnter:recruiterAuth
  },
  {
    path: '/recruiter/vacancy/:id',
    component: () => import('../views/Recruiter/UpdateVacancy'),
    beforeEnter:recruiterAuth
  },
  {
    path: '/recruiter/vacancy/applications/:id',
    component: () => import('../views/Recruiter/VacancyApplications'),
    beforeEnter:recruiterAuth
  },
  {
    path: '/candidate/login',
    component: () => import('../views/Candidate/CandidateLogin')
  },
  {
    path: '/candidate/new',
    component: () => import('../views/Candidate/CandidateCadastro')
  },
  {
    path: '/candidate/vacancies',
    component: () => import('../views/Candidate/VacanciesAll'),
    beforeEnter: candidateAuth
  },
  {
    path: '/candidate/applications',
    component: () => import('../views/Candidate/MyApplications'),
    beforeEnter: candidateAuth
  },
  {
    path: '/candidate/feedbacks',
    component: () => import('../views/Candidate/MyFeedbacks'),
    beforeEnter: candidateAuth
  },
  {
    path: '/candidate/profile',
    name: 'My Profile',
    component: () => import('../views/Candidate/CandidateProfile'),
    beforeEnter: candidateAuth
  },
  {
    path: '/candidate/:vacancyId',
    component: () => import('../views/Candidate/VacancyInfo'),
    beforeEnter: candidateAuth
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
