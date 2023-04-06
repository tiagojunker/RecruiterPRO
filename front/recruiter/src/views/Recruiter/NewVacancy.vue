<template>
    <div class="content">
        <NavBarRecruiter/>
        <h3 class="text-center">Cadastro de Vaga</h3>
        <hr>
        <div class="content2">
            <div v-if="vacancyCreated.length > 0" class="text-center alert alert-success col-sm-10 col-md-8 col-lg-6" role="alert">
                {{ vacancyCreated }}
            </div>
            <div v-if="error.length > 0" class="text-center alert alert-danger col-sm-10 col-md-8 col-lg-6" role="alert">
                {{ error }}
            </div>
            <form action="" class="bg-white mt-2 p-4 col-sm-10 col-md-8 col-lg-6 form-horizontal rounded shadow-lg">
                <div class="form-group mb-2 text-start">
                    <label class="form-label" for="name">Titulo</label>
                    <input v-model="title" class="form-control" type="text" name="title" id="title" placeholder="Titulo: " required>
                </div>
                <div class="form-group text-start">
                    <label class="form-label" for="decription">Descrição (Stack, Horário, Remuneração, Local...)</label>
                </div>
                <div class="form-floating mb-2 text-start">
                    <textarea v-model="description" class="form-control" name="description" id="description" cols="30" rows="60"></textarea>
                </div>
                <div class="d-grid gap-2">
                    <button @click.prevent="createVacancy" class="btn btn-primary mt-2">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import NavBarRecruiter from '../../components/NavBarRecruiters.vue'
import axios from 'axios'

export default {
    components: {NavBarRecruiter},

    data() {
        return{
            title: '',
            description: '',
            recruiterId: localStorage.getItem('id'),
            vacancyCreated: '',
            error: ''
        }
    },

    methods:{
        async createVacancy() {
            try {
                const url = 'http://localhost:3000/vacancy/new'
                const response = await axios.post(url, {title: this.title, description: this.description, recruiterId: this.recruiterId})
                this.vacancyCreated = response.data.msg
                this.error = ''
                this.title = ''
                this.description = ''
                this.vacancyCreated = response.data.msg

            } catch (error) {
                this.vacancyCreated = ''
                this.error = error.response.data.msg
                console.log(error.response.data.msg)
            }
        }
    }
}
</script>

<style scoped>
    .content2{
        min-height: 70vh;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    textarea{
        min-height: 200px;
        height: 100%;
    }
</style>