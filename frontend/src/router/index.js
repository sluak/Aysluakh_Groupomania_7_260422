import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Login,
    },

    {
      path: "/posts",
      name: "posts",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AllPosts.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Profile.vue"),
    },

    {
      path: "/disconnect",
      name: "disconnect",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Disconnect.vue"),
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ],
});

router.beforeEach(async (to, from) => {
  if (localStorage.getItem("user") == null && to.name != "home") {
    return {
      name: "home",
    };
  }
});
export default router;
