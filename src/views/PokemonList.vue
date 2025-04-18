<template>
  <div class="page-container">
    <!-- Partie gauche : tout le contenu principal -->
    <div class="left-container">
      <div class="card">
        <h1>Pokédex</h1>
        <Search v-if="pokemons" :pokemons="pokemons" @update:filteredPokemons="updateFilteredPokemons" />
        <FilterType v-if="pokemons" :pokemons="pokemons" @update:filteredPokemons="updateFilteredPokemons" />
        <RouterLinkStyle to="/mon-pokedex" title="Mon poke"></RouterLinkStyle>

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
import RouterLinkStyle from '@/components/RouterLinkStyle.vue';
import { useRouter, useRoute } from 'vue-router';

import PokemonDetail from "@/components/PokemonDetail.vue";
export interface PokemonType {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
    gmax: string | null;
  };
  types: {
    name: string;
    image: string;
  }[];
  talents: {
    name: string;
    tc: boolean;
  }[];
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  resistances: {
    name: string;
    multiplier: number;
  }[];
  evolution: {
    pre: Evolution | null;
    next: Evolution[];
    mega: Evolution | null;
  };
  height: string;
  weight: string;
  egg_groups: string[];
  sexe: {
    male: number;
    female: number;
  };
  catch_rate: number;
  level_100: number;
  formes: string | null;
  nameToken?: string[];
}

export interface Evolution {
  pokedex_id: number;
  name: string;
  condition: string;
}

const pokemons = ref<PokemonType[]>([]);
const filteredPokemons = ref<any[]>([]);
const loading = ref<boolean>(true);
const error = ref<Error | null>(null);
const router = useRouter();
const route = useRoute();


const selectedPokemonData = computed(() => {
  return pokemons.value.find(pokemon => pokemon.pokedex_id === Number(route.params.id)) || null;
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
}
.list-container {
  margin-top: 10px;
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