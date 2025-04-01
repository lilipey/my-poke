<template>
    <button class="pokemon-card">
        <div class="pokemon-card-content">
          <PokedexToggleButton
              :pokemon="pokemon"
              @click.stop
          />
            <h2>{{ pokemon.name.fr }}</h2>
            <img :src="pokemon.sprites.regular" :alt="pokemon.name.fr" />
            <div class="pokemon-types">
                    <div v-for="type in pokemon.types" :key="type.name" class="pokemon-type">
                        <img :src="type.image" :alt="type.name" class="type-image" />
                        <p>{{ type.name }}</p>
                    </div>
            </div>
        </div>
    </button>
  </template>

  <script setup lang="ts">
  import { defineProps } from 'vue'
  import PokemonDetail from "@/components/PokemonDetail.vue";
  import PokedexToggleButton from "@/components/PokedexToggleButton.vue";
  
  interface Pokemon {
    name: {
      fr: string
    }
    sprites: {
      regular: string
    }
    types: {
      name: string,
      image: string
    }[]
  }
  
  const props = defineProps<{ pokemon: Pokemon }>()
  </script>
  
  <style scoped>
  .pokemon-card {
    background-color: #f8f9fa;
    color: black;
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    overflow: hidden;
    transition: transform 0.2s;
    width: 200px;
    text-align: center;
  }
  
  .pokemon-card:hover {
    transform: scale(1.05);
  }
  
  .pokemon-link {
    text-decoration: none;
    color: inherit;
  }
  
  .pokemon-card-content {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-direction: column;
 
  }
  
  .pokemon-card img {
    max-width: 100%;
    width: 30%;
    display: block;
  }
  
  .pokemon-card h2 {
    font-size: 1.25rem;
    margin: 0;
    text-transform: capitalize;
  }
  
  .pokemon-type {
    background-color: #e0e0e0;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    text-transform: capitalize;
  }

  .pokemon-types {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.5rem;
}

.pokemon-type {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background-color: #e0e0e0;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  text-transform: capitalize;
}

.type-image {
  width: 20px;
  height: 20px;
}
  </style>