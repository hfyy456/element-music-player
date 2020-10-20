import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index')
    },
    {
      path: '/player',
      name: 'Player',
      component: () => import('@/views/player/index')
    },
    {
      path: '/local',
      name: 'Local',
      component: () => import('@/views/local/index')
    },
    {
      path: '/jstags',
      name: 'Jstags',
      component: () => import('@/views/tool/jstags')
    }

  ]
})
