import Vue from 'vue'
import Router from 'vue-router'
import baseDemo from '@/components/base-demo'
import baseDemo1 from '@/components/base-demo-01'
import baiduBase from '@/components/baidubase'
import wechat from '@/components/wechat'

Vue.use(Router)

const routes =  [
    {
      path: '/',
      name: "微信",
      component: resolve => require(["../components/wechat.vue"], resolve)
    },
    {
      path: '/wechat/dialogue',
        name: "",
        components: {
          "default": resolve => require(["../components/wechat.vue"], resolve),
          "subPage": resolve => require(["../components/dialogue.vue"], resolve)
        }
    },
    {
      path: '/wechat/dialogue/dialogue-info',
      name: "",
      components: {
          "subPage": resolve => require(["../components/dialogue-info.vue"], resolve)
      }
    },
    {
      path: '/base',
      name: 'baseDemo',
      component: baseDemo
    },
    {
      path: '/base1',
      name: 'baseDemo1',
      component: baseDemo1
    },
    {
      path: '/baiduBase',
      name: 'baiduBase',
      component: baiduBase
    }
  ]

  export default new Router({
    base: "/vue-wechat/",
    routes,
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition
    //     } else {
    //         return { x: 0, y: 0 }
    //     }
    // }

})  
