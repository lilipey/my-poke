import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from '../views/PokemonList.vue'
import PokemonDetail from "@/components/PokemonDetail.vue";
import MonPokedex from "../views/MonPokedex.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/pokemon' // Redirection automatique du chemin racine vers /pokemon
    },
    {
      path: '/pokemon',
      name: 'PokemonList',
      component: PokemonList
    },
    {
      path: '/mon-pokedex',
      name: 'MonPokedex',
      component: MonPokedex,
    },
    {
      path: '/pokemon/:id',
      name: 'PokemonDetail',
      components: {
        default: PokemonList,   // la liste reste affichée
        detail: PokemonDetail   // le détail s'affiche dans la vue nommée "detail"
      }
    },
    {
      path: '/:catchAll(.*)', // Capture toutes les routes non définies
      name: 'NotFound',
      component: NotFound, // Affiche le composant NotFound
    }
  ],
})

export default router
