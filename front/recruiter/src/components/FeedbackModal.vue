<template>
    <div class="content">
        <form action="" class="bg-white mt-2 p-4 col-sm-10 col-md-8 col-lg-6 form-horizontal rounded shadow-lg">
            <h4 class="text-center">Enviar Feedback</h4>
            <div class="form-group mb-2 text-start">
                <label class="form-label" for="feedbackTitle">Titulo</label>
                <input v-model="feedbackTitle" class="form-control" type="text" name="feedbackTitle" id="feedbackTitle" placeholder="Titulo: " required>
            </div>
            <div class="form-group text-start">
                <label class="form-label" for="feedbackMensage">Mensagem</label>
            </div>
            <div class="form-floating mb-2 text-start">
                <textarea v-model="feedbackMensage" class="form-control" name="feedbackMensage" id="feedbackMensage" cols="30" rows="60"></textarea>
            </div>
            <div class="d-grid gap-2">
                <button @click.prevent="sendFeedback" class="btn btn-primary mt-2">enviar</button>
            </div>
            <hr>
            <p class="text-center">ESC para fechar a janela!</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        vacancyId: { required: true },
        vacancyTitle: { required: true },
        candidateId: { required: true }
    },
    data() {
        return {
            feedbackTitle: '',
            feedbackMensage: ''
        }
    }, 

    methods: {
        async sendFeedback() {
            try {
                let url = 'http://localhost:3000/vacancy/sendFeedback'

                let response = await axios.post(url, {
                    vacancyId: this.vacancyId,
                    vacancyTitle: this.vacancyTitle,
                    candidate: this.candidateId,
                    feedbackTitle: this.feedbackTitle,
                    feedbackMensage: this.feedbackMensage
                })
                
                window.alert(response.data.msg)
                document.location.reload(true)

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
    .content{
        min-height: 70vh;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    textarea{
        min-height: 150px;
        height: 100%;
    }
</style>