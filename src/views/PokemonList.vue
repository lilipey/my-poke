<template>
  <div class="page-container">
    <!-- Partie gauche : tout le contenu principal -->
    <div class="left-container">
      <div class="card">
        <h1>Pokédex</h1>
        <Search v-if="pokemons" :pokemons="pokemons" @update:filteredPokemons="updateFilteredPokemons" />
        <FilterType v-if="pokemons" :pokemons="pokemons" @update:filteredPokemons="updateFilteredPokemons" />
        <RouterLink to="/mon-pokedex">mon poke</RouterLink>
        <div v-if="loading">Chargement…</div>
        <div v-else-if="error">Erreur : {{ error.message }}</div>
        <div class="list-container">
          <ul class="pokemon-list">
            <li v-for="pokemon in filteredPokemons" :key="pokemon.name.fr">
              <PokemonCard
                  :pokemon="pokemon"
                  @click="selectPokemon(pokemon.pokedex_id)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Partie droite : le détail -->
    <div class="detail-container" v-if="selectedPokemonData">
      <PokemonDetail :pokemon="selectedPokemonData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import PokemonCard from '@/components/PokemonCard.vue';
import Search from '@/components/Searching.vue';
import { preprocessUsers } from '@/utils/normalizeUtils';
import FilterType from '@/components/FilterType.vue';
import { useRouter, useRoute } from 'vue-router';

import PokemonDetail from "@/components/PokemonDetail.vue";
import PokedexToggleButton from "@/components/PokedexToggleButton.vue";

const pokemons = ref<any[]>([]);
const filteredPokemons = ref<any[]>([]);
const loading = ref<boolean>(true);
const error = ref<Error | null>(null);
const router = useRouter();
const route = useRoute();

import { usePokedexStore } from '../stores/usePokemonStores.ts';

const store = usePokedexStore();


const selectedPokemonData = computed(() => {
  return pokemons.value.find(pokemon => pokemon.pokedex_id == route.params.id) || null;
});

const selectPokemon = (id: number) => {
  router.push({ name: 'PokemonDetail', params: { id } });
};

const updateFilteredPokemons = (filtered: any[]) => {
  filteredPokemons.value = filtered;
};

onMounted(async () => {
  try {
    const { data } = await axios.get('https://tyradex.app/api/v1/gen/1');
    pokemons.value = preprocessUsers(data);
    filteredPokemons.value = pokemons.value;
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false;
  }
});

</script>

<style scoped>
.page-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
}

/* La partie gauche prend toute la place disponible */
.left-container {
  flex: 1;
}

/* Le détail a une largeur fixe et se place à droite */
.detail-container {
  width: 350px;
}

/* Exemple de style pour la liste et autres éléments */
.card {
  padding: 1rem;
  background: #fff;
  //border: 1px solid #ddd;
}

.pokemon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  list-style-type: none;
  justify-content: center;
}
h1 {
  font-size: 4rem;
  font-family: 'Pokemon Solid',serif !important;
}
a{
  text-decoration: none;
  padding:10px;
  background-color: powderblue;
  margin : 10px;
}
</style>