<template>
    <div class="content">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand ms-4" href="#">RecruiterPRO</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse  ms-4" id="navbarNavDropdown">
                    <ul class="navbar-nav navbar-nav ms-auto pe-4">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/candidate/vacancies">Vagas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/candidate/applications">Candidaturas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/candidate/feedbacks">Feedbacks</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/candidate/profile">Perfil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" @click.prevent="logout" style="cursor: pointer;">Sair</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>


export default {

    methods: {
        logout(){
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            this.$router.push('/')
        }
    }

}
</script>

<style scoped>

</style>