const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageUsers.vue") },
      { path: "/chat/:userId", component: () => import("pages/PageChat.vue") },
      { path: "/auth", component: () => import("pages/PageAuth.vue") },
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
