<template>
<div class="a-container">
    <RouterLink :to="to">{{title}}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// Déclarez une prop pour le chemin de navigation
defineProps({
  to: {
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  }
})
</script>
<style scoped>
a{
  text-decoration: none;
  border-radius: 4px;
  padding:10px;
  color:#fff;
  background-color: #3b82c4;
 
}
.a-container{
  margin-bottom: 16px;
  height: auto;
}
</style>