<template>
  <router-view />
</template>
<script>
import { defineComponent, provide, onMounted } from 'vue';
import store from './store'

export default defineComponent({
  setup() {
    provide('store', store)

    onMounted(() => {
      store.methods.handleAuthStateChanged()      
    })
  }
})
</script>
