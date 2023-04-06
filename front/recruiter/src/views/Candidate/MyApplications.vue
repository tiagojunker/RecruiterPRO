<template>
  <div class="content">
        <NavBarCandidates/>
        <h1 class="text-center">Minhas Candidaturas</h1>
        <hr>
        <div class="applications">
            
             <div v-if="applications.length > 0" class="show">

                <div v-for="application in applications" :key="application.title" class="card col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-4 shadow">
                    <div class="card-header">
                        {{ application.title }}
                    </div>
                    <div class="card-body">
                        <!-- <h5 class="card-title">Special title treatment</h5> -->
                        <div v-for="p in application.description.split('\n')" :key="p">
                            <p>{{ p }}</p>
                        </div>
                        <a href="#" class="btn btn-primary disabled">Enviado</a>
                    </div>
                </div>

            </div>
            <div v-else class="empty">
                <h3 class="text-center">Você ainda não se candidatou a nenhuma vaga.</h3>
            </div>

        </div>
  </div>
</template>

<script>
import NavBarCandidates from '../../components/NavBarCandidates'
import axios from 'axios'

export default {
    components: { NavBarCandidates },

    data() {
        return {
            applications: [],
            candidateId: localStorage.getItem('id')  // Trocar para pegar ID automáticamente
        }
    },

    async created() {
        let url = 'http://localhost:3000/vacancy/applications'
        let response = await axios.post(url, { candidateId: this.candidateId })
        this.applications = response.data.applications
    }
}

</script>

<style>

</style>