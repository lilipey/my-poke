<template>
  <div class="pokemon-detail-sidebar" tabindex="0" ref="sidebar" >
    <RouterLink to="/pokemon" class="close-btn" aria-label="fermer la vue de détail">
      <i class="fas fa-times"></i>
    </RouterLink>
    <h2>{{ pokemon.name.fr }}</h2>
    <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" class="pokemon-image" />
    <div class="pokemon-types">
      <strong><i class="fas fa-layer-group"></i> Types :</strong>
      <div class="d-flex">
        <div v-for="type in pokemon.types" :key="type.name" class="pokemon-type">
          <img :src="type.image" class="type-image" />
          <span>{{ type.name }}</span>
        </div>
      </div>
    </div>
    <p><strong><i class="fas fa-align-left"></i> Description :</strong> {{ pokemon.description }}</p>
    <p><strong><i class="fas fa-ruler-vertical"></i> Taille :</strong> {{ pokemon.height }} m</p>
    <p><strong><i class="fas fa-weight-hanging"></i> Poids :</strong> {{ pokemon.weight }} kg</p>
    <div class="pokemon-stats">
      <strong><i class="fas fa-chart-bar"></i> Statistiques de Base :</strong>
      <ul>
        <li v-for="(value, stat) in pokemon.stats" :key="stat">
          <i :class="getStatIcon(stat)"></i> {{ stat }} : {{ value }}
        </li>
      </ul>
    </div>
    <div class="pokemon-abilities">
      <strong><i class="fas fa-star"></i> Talents :</strong>
      <ul>
        <li v-for="ability in pokemon.abilities" :key="ability.name">
          {{ ability.name }} : {{ ability.description }}
        </li>
      </ul>
    </div>
    <div class="pokemon-evolution" v-if="pokemon.evolutions && pokemon.evolutions.length">
      <strong><i class="fas fa-long-arrow-alt-up"></i> Évolutions :</strong>
      <ul>
        <li v-for="evolution in pokemon.evolutions" :key="evolution.pokedex_id">
          {{ evolution.name }} (Niveau {{ evolution.min_level }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, watchEffect, onMounted,ref} from 'vue';
import {usePokedexStore} from "@/stores/usePokemonStores.ts";
import {useRouter} from "vue-router";

defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const store = usePokedexStore()
const getStatIcon = (stat: string) => {
  const icons: Record<string, string> = {
    hp: 'fas fa-heart',
    atk: 'fas fa-bolt',
    def: 'fas fa-shield-alt',
    'spe_atk': 'fas fa-magic',
    'spe_def': 'fas fa-shield-virus',
    vit: 'fas fa-tachometer-alt',
  };
  return icons[stat] || 'fas fa-question';
};

const router = useRouter();

const sidebar = ref<HTMLElement | null>(null);
const goBack = () => {
  console.log("ahh")
  router.push('/pokemon');

};
onMounted(() => {
  // Focus automatique sur la sidebar à l'ouverture
  if (sidebar.value) {
    sidebar.value.focus();
  }
});

const handleBlur = (event: FocusEvent) => {
  // Vérifier si le nouvel élément focusé (relatedTarget) est à l'intérieur de la sidebar
  if (sidebar.value && !sidebar.value.contains(event.relatedTarget as Node)) {
    goBack();
  }
};

</script>

<style scoped>
.pokemon-detail-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background: #f8f9fa;
  color: #212529;
  box-shadow: -2px 0 5px rgba(0,0,0,0.2);
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
  transition: transform 0.3s ease;
  font-family: 'Arial', sans-serif;
}

.close-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  border: none;
  font-size: 1.8em;
  color: #dc3545;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #c82333;
}

.pokemon-image {
  width: 100%;
  max-width: 250px;
  display: block;
  margin: 0 auto 20px;
  border-radius: 10px;
  border: 2px solid #dee2e6;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.pokemon-types, .pokemon-stats, .pokemon-abilities, .pokemon-evolution {
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  background-color: #ffffff;
}

.pokemon-type {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.type-image {
  width: 28px;
  height: 28px;
  margin-right: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

li i {
  margin-right: 8px;
  color: #6c757d;
}
.d-flex{
  display: flex;
  justify-content: space-around;
}
</style>