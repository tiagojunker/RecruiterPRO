<template>
    <div class="content">
        <NavBarCandidates/>
        <h1 class="text-center">Quadro de vagas</h1>
        <hr>
        <div class="vagas">
            <div v-if="vacancies.length > 0" class="show">

                <div v-for="vacancy in vacancies" :key="vacancy.title" class="card col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-4 shadow">
                    <div class="card-header">
                        {{ vacancy.title }}
                    </div>
                    <div class="card-body">
                        <!-- <h5 class="card-title">Special title treatment</h5> -->
                        <div v-for="p in vacancy.description.split('\n')" :key="p">
                            <p>{{ p }}</p>
                        </div>
                        <a :href="'/candidate/'+vacancy._id" class="btn btn-primary">Ver Vaga</a>
                    </div>
                </div>

            </div>
            <div v-else class="empty">
                <h3 class="text-center">Nenhuma vaga cadastrada</h3>
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
            vacancies: []
        }
    },

    async created() {

        try{
            let url = 'http://localhost:3000/vacancies'
            let response = await axios.get(url)
            this.vacancies = response.data.vacancies
            console.log(this.vacancies)

        } catch(error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>

</style>