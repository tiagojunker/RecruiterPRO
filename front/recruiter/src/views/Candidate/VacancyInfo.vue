<template>
    <div class="content">
        <NavBarCandidates/>
        <h3 class="text-center mt-2">Vaga {{ vacancy.title }}</h3>
        <hr>
        <div class="mt-4 card text-center col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-4 shadow">
            <div class="card-header">
                Detalhes
            </div>
            <div class="card-body text-start">
                <div v-for="p in vacancy.description.split('\n')" :key="p">
                    <p>{{ p }}</p>
                </div>
            </div>
            <div class="card-footer text-muted">
                <div class="d-grid gap-2">                    
                    <button v-if="applied == false" class="btn btn-sm btn-primary" @click="apply">Demonstrar Interesse</button>
                    <button v-else class="btn btn-sm btn-primary disabled">Você já se candidatou</button>
                </div>
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
            id: '',
            candidateId: localStorage.getItem('id'),
            vacancy: {},
            applied: false
        }
    },

    methods: {
        verifyApplied() {
            let includes = this.vacancy.candidates.includes(this.candidateId)
            return includes ? true : false
        },

        async apply() {
            try{
                let url = 'http://localhost:3000/vacancy/apply'
                let response = await axios.post(url, { vacancyId: this.id, candidateId: this.candidateId })
                window.alert(response.data.msg)
                window.location.reload()              

            } catch(error) {
                console.log(error)
            }
        }
    },

    async created() {
        this.id = this.$route.params.vacancyId
        try{
            let url = 'http://localhost:3000/vacancyInfo/' + this.id // ---> colocar candidateId dinamicamente
            let response = await axios.get(url)
            this.vacancy = response.data.vacancy
            
            let verify = this.verifyApplied()
            verify ? this.applied = true : this.applied = false

        } catch(error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>

</style>