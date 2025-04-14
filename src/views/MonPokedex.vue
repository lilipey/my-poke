<template>
  <RouterLink to="/">Retour à la liste</RouterLink>
  <div>
    <h1 class="h1">Mon Pokédex</h1>
    <div v-if="store.pokedex.length === 0">
      Aucun Pokémon ajouté pour le moment.
    </div>
    <ul class="pokemon-list">
      <li v-for="pokemon in store.pokedex" :key="pokemon.pokedex_id">
        <PokemonCard :pokemon="pokemon" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue';
import { usePokedexStore } from '@/stores/usePokemonStores.ts';
import PokedexToggleButton from "@/components/PokedexToggleButton.vue";

const store = usePokedexStore();

</script>

<style scoped>
@font-face {
  font-family: 'Pokemon Solid';
  src: url('src/assets/font/PokemonSolidNormal-xyWR.ttf');
}
.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: blue;
  list-style-type: none;
  padding: 0;
}

</style>