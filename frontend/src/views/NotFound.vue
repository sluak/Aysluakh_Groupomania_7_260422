<template>
  <div class="card">
    <div class="centered">
      <h1>Not Found</h1>
      <p class="text-large">
        Oups, nous n'avons pas trouvé ce que vous cherchez ! Essayez de nouveau:
        <router-link class="home" to="/posts">Page d'accueil</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.home {
  font-size: 20px;
  color: rgb(37, 37, 180);
}
.centered {
  text-align: center;
}
</style>
