<template>
    <div class="content">
        <NavBarCandidates/>
        <div class="profile">
            <div class="card text-center col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-4 shadow">
                <div class="card-header">
                    Perfil
                </div>
                <div class="card-body text-start">
                    <h5 class="card-title text-center">{{ candidate.name }}</h5>
                    <p class="card-text"> <strong>Email: </strong> {{ candidate.email }} </p>
                    <p class="card-text"> <strong>Currículo: </strong> <a href="#">{{ candidate.linkCV }}</a> </p>
                    <p class="card-text"> <strong>LinkedIn: </strong> <a href="#">{{ candidate.linkedIn }}</a> </p>
                    <br>
                    <p><strong>Informações: </strong></p>
                    <div v-for="p in candidate.description.split('\n')" :key="p">
                        <p>{{ p }}</p>
                    </div>

                </div>
                <div class="card-footer text-muted">
                    <div class="d-grid gap-2">                    
                        <a href="/candidate/editProfile" class="btn btn-sm btn-secondary">Editar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBarCandidates from '../../components/NavBarCandidates.vue'
import axios from 'axios'

export default {
    components: { NavBarCandidates },

    data() {
        return {
            candidate: {},
            candidateId: localStorage.getItem('id')
        }
    },

    async created() {
        try{
            let url = 'http://localhost:3000/candidate/' + this.candidateId // ---> colocar candidateId dinamicamente
            let response = await axios.get(url)
            this.candidate = response.data.candidate[0]

        } catch(error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>

    .profile{
        min-height: 70vh;
        height: 100%;
        display: flex;
        align-items: center;
    }

</style>