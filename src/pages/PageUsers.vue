<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width">
      <q-item
        v-for="user in users"
        :key="user.id"
        class="q-my-sm"
        clickable
        v-ripple
        to="/chat"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0).toUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">{{ user.online ? 'Online' : 'Offline' }}</q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import getRealtimeDB from '../composables/getRealtimeDB'
import { auth } from '../firebase/config'

export default defineComponent({
  setup() {
    const { rtdbDocs } = getRealtimeDB('smackchat-users')

    const users = ref(rtdbDocs);

    return { users };
  },
});
</script>

<style lang="sass" scoped>
.q-page flex
  padding: 0
</style>
