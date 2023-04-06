<template>
  <div class="content">
        <h1 class="text-center mb-2">Criar cadastro de Recrutador</h1>
        <div v-if="userCreated.length > 0" class="alert alert-success text-center col-sm-10 col-md-8 col-lg-6" role="alert">
            {{ userCreated }}
        </div>
        <div v-if="error.length > 0" class="alert alert-danger text-center col-sm-10 col-md-8 col-lg-6" role="alert">
            {{ error }}
        </div>
        <form action="" class="bg-white p-4 col-sm-10 col-md-8 col-lg-6 form-horizontal rounded shadow-lg">
            <div class="form-group mb-2 text-start">
                <label class="form-label" for="name">Nome</label>
                <input v-model="name" class="form-control" type="text" name="nome" id="nome" placeholder="Nome: " required>
            </div>
            <div class="form-group mb-2 text-start">
                <label class="form-label" for="email">Email</label>
                <input v-model="email" class="form-control" type="text" name="email" id="email" placeholder="Email: " required>
            </div>
            <div class="form-group mb-2 text-start">
                <label class="form-label" for="password">Password</label>
                <input v-model="password" class="form-control" type="password" name="password" id="password" placeholder="Password: " required>
            </div>
            <div class="form-group mb-2 text-start">
                <label class="form-label" for="company">Empresa</label>
                <input v-model="company" class="form-control" type="text" name="company" id="company" placeholder="Empresa que trabalha: ">
            </div>
            <div class="d-grid gap-2">
                <button @click.prevent="createRecruiter" class="btn btn-primary mt-2">Cadastrar</button>
            </div>
            <p class="text-center mt-2">Já tem um cadastrado? <a href="/recruiter/login">Clique Aqui!</a></p>
        </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            company: "",
            error: "",
            userCreated: ""
        }
    },

    methods: {
        async createRecruiter() {
            try {
                let url = 'http://localhost:3000/recruiter/create'
                let newUser = {name: this.name, email: this.email, password: this.password, 
                                company: this.company }
                                
                let create = await axios.post(url, newUser)
                this.userCreated = create.data.msg
                this.error = ''
                this.name = ""
                this.email = ""
                this.password = ""
                this.company = ""

            } catch (error) {
                this.userCreated = ""
                this.error = error.response.data.msg
            }
        }
    }
}

</script>

<style scoped>
    .content{
        min-height: 100vh;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>