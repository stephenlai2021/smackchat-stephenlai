<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="route.fullPath.includes('/chat')"
          @click="router.push('/')"
          icon="arrow_back"
          label="Back"
          flat
          dense
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="!store.state.userDetails"
          @click="router.push('/auth')"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          label="Login"
          no-caps
          flat
          dense
        />

        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
        >
          &nbsp;Logout<br>
          <!-- &nbsp;{{ store.state.userDetails.name.substring(0, 5) + '...' }} -->
          &nbsp;{{ userName }}
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, computed, inject } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = inject('store')

    const title = computed(() => {
      if (route.fullPath === "/") return "Smackchat";
      if (route.fullPath === "/chat") return "Chat";
      if (route.fullPath === "/auth") return "Login";
      return "Something went wrong 😅😅😅 ";
    });

    const logoutUser = () => {
      store.methods.logoutUser()

      if (!store.state.logoutError) router.push('/auth')
    }

    const userName = computed(() => {
      if (store.state.userDetails.name.length >= 5) {
        return store.state.userDetails.name.substring(0, 5) + '...'        
      }
      return store.state.userDetails.name
    })

    return { title, route, router, store, logoutUser, userName };
  },
});
</script>

<style scoped>
.q-toolbar .q-btn {
  line-height: 1.2;
  text-align-last: left;
}
</style>
