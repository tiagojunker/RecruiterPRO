<template>
    <div class="container-fluid">
        <NavBarSwitch/>
        <div class="content">

            <h1 class="text-center">Login de Recrutadores</h1>
            <div v-if="error.length > 0" class="alert alert-danger col-sm-10 col-md-8 col-lg-6 text-center" role="alert">
                {{ error }}
            </div>
            <form action="" class="bg-white p-4 col-sm-10 off-set-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 form-horizontal rounded shadow-lg">
                <div class="form-group mb-2 text-start">
                    <label class="form-label" for="email">Email</label>
                    <input v-model="email" class="form-control" type="text" name="email" id="email" placeholder="Email: ">
                </div>
                <div class="form-group mb-2 text-start">
                    <label class="form-label" for="password">Password</label>
                    <input v-model="password" class="form-control" type="password" name="password" id="password" placeholder="Password: ">
                </div>
                <div class="d-grid gap-2">
                    <button @click.prevent="login" class="btn btn-primary mt-2">Login</button>
                </div>
                <p class="text-center mt-2">Ainda não é cadastrado? <a href="/recruiter/new">Clique Aqui!</a></p>
            </form>

        </div>
    </div>
</template>

<script>
import NavBarSwitch from '../../components/NavBarSwitch'
import axios from 'axios'

export default {

    components: { NavBarSwitch },

    data() {
        return{
            email: '',
            password: '',
            error: ''
        }
    },

    methods: {
        async login() {
            try {
                let url = 'http://localhost:3000/recruiter/login'
                let login = await axios.post(url, {email: this.email, password: this.password})
                const token = login.data.token
                const id = login.data.id
                localStorage.setItem('token', token)
                localStorage.setItem('id', id)
                console.log(login.data)
                this.$router.push({ path: '/recruiter/vacancies' })
                
            } catch (error) {
                console.log(error.response.data.msg)
                this.error = error.response.data.msg
            }
        }
    }

}
</script>

<style scoped>
    div.content {
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    form{
        margin:3vh auto;
    }

    p{
        margin: 0;
    }

    NavBarSwitch{
        align-self: flex-start;
    }
</style>