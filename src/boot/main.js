// import { useRouter } from 'vue-router'

export default async ({ app, router, store, Vue }) => {
  store.methods.handleAuthStateChanged();
  // router.push('/')
};
