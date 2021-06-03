import { auth } from "../firebase/config";
import { inject } from 'vue'

const store = inject('store')

const user = auth.currentUser;
console.log(`auth route: ${user}`);

// auth guard
const checkAuthPage = (to, from, next) => {
  if (user) next("/");
  if (!user) next();
};

const checkUserPage = (to, from, next) => {
  if (!user) next("/auth");
  if (user) next();
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PageUsers.vue"),
        // beforeEnter: checkUserPage,
      },
      {
        path: "/auth",
        component: () => import("pages/PageAuth.vue"),
        // beforeEnter: checkAuthPage,
      },
      { path: "/chat/:userId", component: () => import("pages/PageChat.vue") },
      { path: "/temp", component: () => import("pages/PageCounter.vue") },
      { path: "/about", component: () => import("pages/PageAbout.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
