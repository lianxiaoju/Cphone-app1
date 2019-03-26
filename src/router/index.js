import Vue from 'vue'
import Router from 'vue-router'
import Phoneproject from '@/components/phoneproject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'phoneproject',
      component: Phoneproject
    }
  ]
})
