import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Home2 from '../components/Home2'
import Home3 from '../components/Home3'
import Home4 from '../components/Home4'
import topinput from '../components/topinput'
import mv from '../components/mv'
import playlist from '../components/playlist'


Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes:[{
        path: '/',
        component: Home
    },{
        path: '/home',
        component: Home
    },{
        path: '/home2',
        component: Home2
    },{
        path: '/home3',
        component: Home3
    },{
        path: '/home4',
        component: Home4
    }
    ,{
        path: '/topinput',
        component: topinput
    },{
        path: '/mv',
        component: mv
    },{
        path: '/playlist',
        component: playlist
    }
]
})