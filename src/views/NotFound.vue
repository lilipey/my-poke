<template>
  <div class="not-found">
    <h1>404 - Page non trouvée</h1>
    <p>La page que vous recherchez n'existe pas.</p>
    <RouterLink to="/" class="home-link">Retour à l'accueil</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 2.5rem;
  color: #ff6b6b;
}

.not-found p {
  font-size: 1.2rem;
  margin: 20px 0;
}

.home-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.home-link:hover {
  text-decoration: underline;
}
</style>