<template>
  <div class="filter-container">
    <label for="type-filter" class="filter-label">Filtrer par type :</label>
    <div class="filter-options">
      <label v-for="type in types" :key="type" class="filter-option">
        <input
            type="checkbox"
            :id="type"
            :value="type"
            v-model="selectedTypes"
            :disabled="isMaxSelected && !selectedTypes.includes(type)"
            class="filter-checkbox"
        />
        {{ type }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Définition des props et de l'emit pour communiquer avec la vue parente
const props = defineProps<{ pokemons: any[] }>()
const emit = defineEmits(['update:filteredPokemons'])
//en francais
const types = ref<string[]>(['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Électrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy', 'Sol', 'Roche', 'Spectre', 'Dragon', 'Acier', 'Ténèbres', 'Glace'])
const isMaxSelected = computed(() => selectedTypes.value.length >= 2)


const selectedTypes = ref<string[]>([])
const filterTypes = computed(() => {
  if (selectedTypes.value.length === 0) {
    emit('update:filteredPokemons', props.pokemons)
    return props.pokemons
  }

  const filtered = props.pokemons.filter(pokemon => {
    if (pokemon.types === null) {

      return
    }
    return selectedTypes.value.every(type => pokemon.types.some((pokemonType: { name: string | string[]; }) => pokemonType.name.includes(type)))
  })

  emit('update:filteredPokemons', filtered)
  return filtered
})
watch(selectedTypes, () => {
  filterTypes.value
})  
</script>
<style scoped>
.filter-container {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #333;
}

.filter-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

.filter-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0.5rem;
  border-radius: 4px;
}

.filter-option:hover {
  background-color: #e0e0e0;
}

.filter-checkbox {
  margin-right: 0.5rem;
  accent-color: #6200ea;
}
</style>