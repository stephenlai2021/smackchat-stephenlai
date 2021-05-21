<template>
  <div class="container">
    <div class="counter" :style="{ color: store.state.colorCode }">{{ store.state.counter }}</div>
    <div class="counter-square">
      {{ store.state.counter }}
      <sup>2</sup> = 
      {{ store.getters.counterSquared() }}
    </div>
    <div class="btn-group">
      <button @click="store.methods.decreaseCounter">-</button>
      <button @click="store.methods.increaseCounter">+</button>
    </div>
    <div>
      <input type="text" placeholder="Enter color code" v-model="colorCode">
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, computed } from "vue";

export default defineComponent({
  setup() {
    const store = inject('store')

    const colorCode = computed({
      get() {
        return store.state.colorCode
      },
      set(val) {
        // console.log(val)
        store.methods.setColorCode(val)
      }
    })

    return { store, colorCode };
  },
});
</script>

<style scoped>
.container {
  text-align: center;
}
div {
  margin-bottom: 10px;
}
.counter {
  font-size: 80px;
}
.btn-group button {
  font-size: 40px;
  width: 100px;
  margin: 0 10px;
}
</style>
