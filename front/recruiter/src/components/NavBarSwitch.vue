<template>
  <nav class="text-center">
    <router-link to="/recruiter/login">Recruiters</router-link> |
    <router-link to="/candidate/login">Candidatos</router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>

    nav {
        padding: 30px;
        height: 10vh;
    }

    nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    nav a.router-link-exact-active {
        color: #42b983;
    }

</style>