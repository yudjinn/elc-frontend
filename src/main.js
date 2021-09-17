import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'jquery/dist/jquery.slim.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import('@/assets/elc.css')
import NetClient from '@/util/NetClient.js'

NetClient.init(router)

createApp(App).use(router).mount('#app')
