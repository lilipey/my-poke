import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonList from '../views/PokemonList.vue'
import PokemonDetail from "@/components/PokemonDetail.vue";
import MonPokedex from "@/views/MonPokedex.vue";

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: HomeView,
  }
  ],
})

export default router
