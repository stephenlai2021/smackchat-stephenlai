<template>
  <q-page class="flex q-pa-sm">
    <q-list class="full-width">
      <q-item
        v-for="user in store.state.users"
        :key="user.id"
        class="q-my-sm"
        clickable
        v-ripple
        @click="handleClick(user)"
      >
        <!-- :to="`/chat/${user.id}`" -->
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
import { defineComponent, ref, inject, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = inject('store')

    const router = useRouter()
    const route = useRoute()

    onMounted(() => {
      store.methods.getAllUsers('smackchat-users')
    })

    const handleClick = (user) => {
      // store.methods.saveUserId(user.id)
      store.methods.saveUser(user)
      router.push(`/chat/${user.id}`)
      console.log(`other user id: ${user.id}`)
    }
    
    return { store, handleClick };
  },
});
</script>

<style lang="sass" scoped>
.q-page flex
  padding: 0
</style>
