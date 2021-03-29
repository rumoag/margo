import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import TravelSingle from '../views/TravelSingle.vue'
import TravelPlan from '../views/TravelPlan.vue'
import ActivitySingle from '../views/ActivitySingle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/',
    name: 'About',
    component: About
  },
  {
    path: '/travel/:travelId',
    name: 'TravelSingle',
    component: TravelSingle
  },
  {
    path: '/travelPlan/:travelId',
    name: 'TravelPlan',
    component: TravelPlan
  },
  {
    path: '/ActivitySingle/:ActivityId',
    name: 'ActivitySingle',
    component: ActivitySingle
  },

]
const router = new VueRouter({
  routes
})
export default router
