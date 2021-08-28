import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  component: () =>
    import('../views/Login.vue')
},
{
  path: '/search',
  component: () =>
    import('@/views/search/index.vue')
},
{
  path: '/article/:articleId',
  name: 'article',
  props: true, // 开启路由传参
  component: () =>
    import('@/views/article/index.vue')

},
{

  path: '/user/profile',
  name: 'userProfil',
  component: () =>
    import('@/views/UserProfile')
},
{
  path: '/',
  component: () =>
    import('../views/Layout.vue'),

  children: [{
    path: '', // 默认路由路径
    component: () =>
      import('@/views/child/Head.vue')
  },
  {
    path: '/qa',
    component: () =>
      import('@/views/child/QueryAnswer.vue')
  },
  {
    path: '/video',
    component: () =>
      import('@/views/child/Video.vue')
  }, {
    path: '/my',
    component: () =>
      import('@/views/child/My.vue')
  }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router
