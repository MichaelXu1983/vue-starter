import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/About.vue")
  },
  {
    path: "/exception/403",
    name: "Exception403",
    component: () => import("../views/exception/403"),
    meta: { title: "403", permission: ["exception"] }
  },
  {
    path: "/exception/404",
    name: "Exception404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "../views/exception/404"),
    meta: { title: "404", permission: ["exception"] }
  },
  {
    path: "/exception/500",
    name: "Exception500",
    component: () =>
      import(/* webpackChunkName: "fail" */ "../views/exception/500"),
    meta: { title: "500", permission: ["exception"] }
  },
  {
    path: "/comming",
    name: "Comming",
    component: () =>
      import(/* webpackChunkName: "fail" */ "../views/exception/comming"),
    meta: { title: "comming", permission: ["exception"] }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
