import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/app.css'
import '@/assets/css/app2.css'
import '@/assets/css/app3.css'
import  { createRouter, createWebHashHistory } from 'vue-router'


import App from "@/App.vue";

const routes = [
    {
        path:'/',
        name:'Home',
        component:()=>import('@/views/IndexContent.vue')
    },
    { 
        path: '/dream', 
        name:'Dream',
        component:()=>import('@/views/DreamContent.vue') 
    },
    { 
        path: '/annotate', 
        name:'Annotate',
        component:()=>import('@/views/AnnotateContent.vue') 
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
