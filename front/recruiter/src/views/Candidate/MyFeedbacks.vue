<template>
  <div class="content">
        <NavBarCandidates/>
        <h1 class="text-center">Meus Feedbacks</h1>
        <hr>
        <div class="applications">
            
             <div v-if="feedbacks.length > 0" class="show">

                <div v-for="feedback in feedbacks" :key="feedback.title" class="card card col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-4 shadow">
                    <div class="card-header">
                        {{feedback.vacancyTitle}}
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                        <p>{{ feedback.feedback[0].title }}</p>
                        <footer class="blockquote-footer">{{ feedback.feedback[0].mensage }}</footer>
                        </blockquote>
                    </div>
                </div>

            </div>
            <div v-else class="empty">
                <h3 class="text-center">Você não possui feedbacks.</h3>
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
            feedbacks: [],
            candidateId: localStorage.getItem('id')  // Trocar para pegar ID automáticamente
        }
    },

    async created() {
        try {
            let url = 'http://localhost:3000/vacancy/feedbacks'
            let response = await axios.post(url, {candidateId: this.candidateId})
            this.feedbacks = response.data.feedbacks
        } catch(error) {
            console.log(error)
        }
    }
}

</script>

<style>

</style>