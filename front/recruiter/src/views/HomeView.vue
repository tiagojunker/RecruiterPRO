<template>
    <div class="content">
        <h1>Recruiter<span class="accent">PRO</span></h1>
        <p>A plataforma especializada em recrutamento e seleção de TI no Brasil e no mundo!</p>
        <div class="buttons">
            <a href="/recruiter/login" class="button">Sou Recrutador</a>
            <a href="/candidate/login" class="button">Sou Candidato</a>
        </div>
    </div>
</template>

<script>

export default {

}

</script>

<style scoped>

    .content{
        background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../assets/business-team-meeting-boardroom.jpg');
        background-size:cover cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 100vh;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1{
        font-size: 4rem;
        margin: 0 40px;
        text-shadow: 2px 2px 2px black;
    }

    .accent{
        color: blueviolet;
    }

    p{
        font-size: 1.2rem;
        margin: 0 10px;
        text-align: center;
        text-shadow: 2px 2px 2px black;
    }

    .buttons{
        margin: 0 20px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .button{
        margin: 0 5px;
        padding: 10px 60px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0);
        border: 2px solid #fff;
        text-decoration: none;
        color: #fff;
        font-size: 1.2rem;
        text-shadow: 2px 2px 2px black;
        box-shadow: 2px 2px 2px black;
    }

    .button:hover{
        background-color: rgba(255, 255, 255, 0.474);
        transition: 0.3s;
    }

</style>