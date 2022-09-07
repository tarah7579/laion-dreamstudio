import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/app.css'
import '@/assets/css/app2.css'
import '@/assets/css/app3.css'
import  { createRouter, createWebHashHistory } from 'vue-router'


import App from "@/App.vue";
import { createAuth0 } from '@auth0/auth0-vue';
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
app.use(
createAuth0({
    domain: "dev-ub9j8-ei.us.auth0.com",
    client_id: "pH2eWgEr3N4nAqgiQUPDQ4dmP71Xv7Fu",
    redirect_uri: window.location.origin
})
);
app.use(router)
app.use(ElementPlus)
app.mount('#app')
