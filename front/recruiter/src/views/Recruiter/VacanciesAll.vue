<template>
    <div class="content">
        <NavBarRecruiter/>
        <h3 class="text-center">Vagas Cadastradas</h3>
        <hr>
        <div v-if="vacancies.length != 0" >
            <div v-for="vacancy in vacancies" :key="vacancy.title" class="card col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-4 shadow">
                <h5 class="card-header">{{ vacancy.title }}</h5>
                <div class="card-body">
                    <div v-for="p in vacancy.description.split('\n')" :key="p">
                        <p>{{ p }}</p>
                    </div>
                    <a class="btn btn-primary" 
                        :href="'/recruiter/vacancy/applications/'+ vacancy._id">Ver Candidatos</a>

                    <a :href="'/recruiter/vacancy/'+ vacancy._id " class="ms-2 btn btn-warning">Alterar Vaga</a>
                    <span @click.prevent="del( vacancy._id )" class="ms-2 btn btn-danger">Deletar Vaga</span>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="text-center">Você ainda não cadastrou vagas!</h3>
        </div>
    </div>
</template>

<script>
import NavBarRecruiter from '../../components/NavBarRecruiters.vue'
import axios from 'axios'

export default {

    components: {NavBarRecruiter},
    data() {
        return {
            recruiterId: localStorage.getItem('id'),
            vacancies: []
        }
    },

    methods: {
        async del(id) {
            const verify = window.confirm('Realmente deseja excluir a vaga?')

            if(verify) {
                
                try {
                    let url = 'http://localhost:3000/vacancy/' + id
                    let response = await axios.delete(url)
                    let msg = response.data.msg
                    window.alert(msg)
                    window.location.reload(true)  

                } catch (error) {
                    console.log(error)
                    window.alert('Houve um erro ao deletar')
                }

            }
        }
    },

    async created() {

        try {
            const url = 'http://localhost:3000/vacancies/show'
            let response = await axios.post(url, {recruiterId: this.recruiterId})
            this.vacancies = response.data.vacancies

        } catch (error) {
            console.log(error)
        }

    }

}

</script>

<style scoped>

</style>