<template>
    <div class="content">
        <NavBarRecruiter/>
        <h3 class="text-center">Alterar Informações da Vaga</h3>
        <hr>
        <div class="content2">
            <div class="content2">
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
                    <button @click.prevent="updateVacancy" class="btn btn-primary mt-2">Alterar Vaga</button>
                </div>
            </form>
        </div>
        </div>
    </div>
</template>

<script>
import NavBarRecruiter from '../../components/NavBarRecruiters.vue'
import axios from 'axios'

export default {
    components: { NavBarRecruiter },
    data() {
        return {
            id: this.$route.params.id,
            vacancy: {},
            description: '',
            title: '',
            error: ''
        }
    },

    methods: {
       async updateVacancy() {
            console.log(this.title, this.description)
            try {
                let url = 'http://localhost:3000/vacancy/' + this.id
                let response = await axios.patch(url, {title: this.title, description: this.description, vacancyId: this.id})
                console.log(response.data)
                window.alert(response.data.msg)
                this.$router.push({ path: '/recruiter/vacancies' })

            } catch (error) {
                console.log(error)
            }
       }
    },

    async created() {
        try {
            let url = 'http://localhost:3000/vacancy/' + this.id
            let response = await axios.get(url)
            this.description = response.data.vacancy.description
            this.title = response.data.vacancy.title

        } catch (error) {
            console.log(error)
        }
    }
}

</script>

<style>
    .content2{
        min-height: 70vh;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .content2 textarea{
        min-height: 200px;
        height: 100%;
    }
</style>