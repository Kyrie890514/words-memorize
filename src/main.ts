import { createApp } from 'vue'

import App from './App'
import router from './router'
import './style/main.scss'


const app = createApp(App)

app.use(router)

app.mount('#app')