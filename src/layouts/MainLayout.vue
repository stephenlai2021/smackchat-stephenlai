<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn v-if="$route.fullPath.includes('/chat')" icon="arrow_back" label="Back" flat dense /> -->
        <q-toolbar-title class="absolute-center">
          <q-btn to="/">Users</q-btn>
          <q-btn to="/auth">Auth</q-btn>
          <q-btn to="/chat">Chat</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const title = ref("SmackChat");

    return { title };
  },
});
</script>
