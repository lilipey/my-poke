<template>
  <button @click="togglePokedex(pokemon)">
    <div v-if="store.pokedex.some(p => p.pokedex_id === pokemon.pokedex_id)">
      <p  >Relaché</p>
      <img
          src="@/assets/logo.jpg"
          alt="Retirer du Pokédex"
          class="pokeball-image"
      />
    </div>
    <div v-else>
      <p>Capturé</p>
      <img
          src="@/assets/pokeball.webp"
          alt="Ajouter au Pokédex"
          class="pokeball-image"
      />
    </div>

  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import {usePokedexStore} from "@/stores/usePokemonStores.ts";

const props = defineProps({
  pokemon: Object || null,
});

const store = usePokedexStore()

const togglePokedex = (pokemon: { pokedex_id: number }) => {
  console.log(pokemon)
  if (store.pokedex.some(p => p.pokedex_id === pokemon.pokedex_id)) {
    store.pokedex =store.pokedex.filter(
        p => p.pokedex_id !== pokemon.pokedex_id
    );
  } else {
    store.pokedex.push(pokemon);
  }
};

</script>
<style scoped>
.pokeball-image {
  display: block;
  margin: 0 auto;
  width: 25px;
  height: auto;
}
button{
  border: none;
  background: none;
}
</style>