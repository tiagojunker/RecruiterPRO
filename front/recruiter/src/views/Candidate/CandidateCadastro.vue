<template>
  <div class="content">
        <h1 class=" text-center mb-2 mt-2">Criar cadastro de Candidato</h1>
        <div v-if="userCreated.length > 0" class="alert alert-success text-center col-sm-10 col-md-8 col-lg-6" role="alert">
            {{ userCreated }}
        </div>
        <div v-if="error.length > 0" class="alert alert-danger text-center col-sm-10 col-md-8 col-lg-6" role="alert">
            {{ error }}
        </div>
        <form action="" class="bg-white p-4 col-sm-10 col-md-8 col-lg-6 form-horizontal rounded shadow-lg">
            <div class="form-group mb-2 text-start">
                <label class="form-label" for="name">name</label>
                <input v-model="name" class="form-control" type="text" name="name" id="name" placeholder="Nome: " required>
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
                <label class="form-label" for="linkCV">Link CV</label>
                <input v-model="linkCV" class="form-control" type="text" name="linkCV" id="linkCV" placeholder="Link CV: ">
            </div>
            <div class="form-group mb-2 text-start">
                <label class="form-label" for="linkedIn">LinkedIn</label>
                <input v-model="linkedIn" class="form-control" type="text" name="linkedIn" id="linkedIn" placeholder="LinkedIn: ">
            </div>
            <div class="form-group text-start">
                <label class="form-label" for="decription">Outras Informações (Tecnologias, Portfólio, GitHub e etc...)</label>
            </div>
            <div class="form-floating mb-2 text-start">
                <textarea v-model="description" class="form-control" name="description" id="description" cols="30" rows="60"></textarea>
            </div>
            <div class="d-grid gap-2">
                <button @click.prevent="createCandidate" class="btn btn-primary mt-2">Cadastrar</button>
            </div>
            <p class="text-center mt-2">Já tem um cadastrado? <a href="/candidate/login">Clique Aqui!</a></p>
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
            description: "",
            linkCV: "",
            linkedIn: "",
            error: "",
            userCreated: ""
        }
    },

    methods: {
        async createCandidate() {
            try {
                let url = 'http://localhost:3000/candidate/create'
                let newUser = {name: this.name, email: this.email, password: this.password, 
                                description: this.description, linkCV: this.linkCV, linkedIn: this.linkedIn}
                                
                let create = await axios.post(url, newUser)
                this.userCreated = create.data.msg
                this.error = ''
                this.name = ""
                this.email = ""
                this.password = ""
                this.description = ""
                this.linkCV = ""
                this.linkedIn = ""

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