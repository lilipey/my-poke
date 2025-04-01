
import { defineStore } from 'pinia';
import {ref, watch} from 'vue';

export const usePokedexStore = defineStore('pokedex', () => {
const pokedex = ref<any[]>([]);

const storedPokedex = sessionStorage.getItem('pokedex');
if (storedPokedex) {
    pokedex.value = JSON.parse(storedPokedex);
}

//const addPokemon = (pokemon: Object ) => {
// if (!pokedex.value.some(p => p.pokedex_id === pokemon.pokedex_id)) {
// pokedex.value.push(pokemon);
// }
// };
//     const removePokemon = (pokemon: { pokedex_id: number }) => {
//         pokedex.value = pokedex.value.filter(
//             p => p.pokedex_id !== pokemon.pokedex_id
//         );
//     };
    const togglePokedex = (pokemon: { pokedex_id: number }) => {
        if (pokedex.value.some(p => p.pokedex_id === pokemon.pokedex_id)) {
            pokedex.value = pokedex.value.filter(
                p => p.pokedex_id !== pokemon.pokedex_id
            );
        } else {
            pokedex.value.push(pokemon);
        }
    };
    watch(
        pokedex,
        (newVal) => {
            sessionStorage.setItem('pokedex', JSON.stringify(newVal));
        },
        { deep: true }
    );
return { pokedex,togglePokedex };
});
