<template>
  <div class="search-container">
    <label for="name-search" class="search-label">Recherche</label>
    <input
        type="text"
        id="name-search"
        class="search-input"
        placeholder="Entrez le nom du pokemon"
        v-model="searchTerm"
    />
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch, watchEffect } from 'vue'
  import { normalizeString } from '@/utils/normalizeUtils'
  
  // Définition des props et de l'emit pour communiquer avec la vue parente
  const props = defineProps<{ pokemons: any[] }>()
  const emit = defineEmits(['update:filteredPokemons'])
  
  const searchTerm = ref('')
  
  const filtersearch = computed(() => {

    const normalizedSearch = normalizeString(searchTerm.value)
    const searchTokens = normalizedSearch // découpe en tokens
  
    // if (normalizedSearch === '') {
    //   emit('update:filteredPokemons', props.pokemons)
    //   return props.pokemons;
    // }
  
    const filtered = props.pokemons.filter(pokemon => {
      return searchTokens.every(token =>
        pokemon.nameToken.some((name: string) => name.startsWith(token))
      );
    });
  
    emit('update:filteredPokemons', filtered)
    return filtered;
  });
  
  // Optionnel : Utiliser un watcher pour forcer l'évaluation dès que searchTerm change
    watchEffect(() => {
      filtersearch.value
    })
  </script>
<style scoped>
.search-container {
  margin-bottom: 1rem;
}

.search-label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
}
</style>