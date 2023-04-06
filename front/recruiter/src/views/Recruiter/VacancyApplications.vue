<template>
    <div class="content">
        <NavBarRecruiter/>
        <h3 class="text-center mt-2">Vaga {{ vacancy.title }}</h3>
        <h5 class="text-center">Candidatos Cadastrados</h5>
        <hr>
        <h3 v-if="candidatesInfo.length == 0" class="text-center">Você não possui candidatos interessados nessa vaga.</h3>
        <div v-else v-for="candidate in candidatesInfo" :key="candidate._id" class="card col-sm-10 offset-sm-1 col-md-8 offset-md-2 mt-4 shadow">
            <div class="card-header text-center">
                    Perfil
                </div>
            <div class="card-body text-start">
                <h5 class="card-title text-center">{{ candidate.name }}</h5>
                <p class="card-text"> <strong>Email: </strong> {{ candidate.email }} </p>
                <p class="card-text"> <strong>Currículo: </strong> {{ candidate.linkCV }} </p>
                <p class="card-text"> <strong>LinkedIn: </strong> {{ candidate.linkedIn }} </p>
                <br>
                <p><strong>Informações: </strong></p>
                <div v-for="p in candidate.description.split('\n')" :key="p">
                    <p>{{ p }}</p>
                </div>
            </div>
            <div class="car-footer">
                <div class="d-grid gap-2">
                    <button @click.prevent="showModal" class="btn btn-primary"> Enviar Feedback</button>
                </div>
            </div>
            <dialog>
                <FeedbackModal :vacancy-id="vacancyId" :candidate-id="candidate._id" :vacancy-title="vacancy.title"/>
            </dialog>
        </div>
    </div>
</template>

<script>
import NavBarRecruiter from '../../components/NavBarRecruiters.vue'
import FeedbackModal from '../../components/FeedbackModal.vue'
import axios from 'axios'

export default {

    components: { NavBarRecruiter, FeedbackModal },
    data() {
        return {
            vacancy: {},
            vacancyId: this.$route.params.id,
            candidates: [],
            candidatesInfo: []
        }
    },

    methods: {
        async getCandidate(candidateId) {
            try {
                const url = 'http://localhost:3000/candidate/' + candidateId
                let response = await axios.get(url)
                this.candidatesInfo.push(response.data.candidate[0])

            } catch (error) {
                console.log(error)
            }
        },
        showModal(){
            this.$el.querySelector('dialog').showModal();
        }
    },

    async created() {
        try {
            const url = 'http://localhost:3000/vacancy/' + this.vacancyId
            let response = await axios.get(url)
            this.vacancy = response.data.vacancy
            this.candidates = this.vacancy.candidates

            this.candidates.map((candidate) => {
                this.getCandidate(candidate)
            })

        } catch (error) {
            console.log(error)
        }

        
    }

}

</script>

<style scoped>
    dialog {
        width: auto;
        margin: 50px;
        border: 1px solid rgba(0, 0, 0, 0);
        padding: 5vw;
        top: 50%;
        transform: translate(0%,-50%);
        background: rgba(0, 0, 0, 0);
    }
</style>