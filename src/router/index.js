import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/Contact.vue'
import AddContact from '../views/AddContact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/addcontact',
      name: 'addcontact',
      component: AddContact
    }
  ]
})

export default router
