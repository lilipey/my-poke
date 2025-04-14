import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia as piniaFactory } from 'pinia';

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
function createPinia() {
    return piniaFactory();
}

