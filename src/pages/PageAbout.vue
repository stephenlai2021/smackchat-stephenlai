<template>
  <div class="container">
    <div class="counter">{{ store.state.counter }}</div>
    <div class="btn-group">
      <button @click="store.methods.decreaseCounter">-</button>
      <button @click="store.methods.increaseCounter">+</button>
    </div>
    <video ref="userVideo" width="320" height="240" autoplay></video>
  </div>
</template>

<script>
import { ref, defineComponent, inject, onMounted } from "vue";

const constraints = window.constraints = {
  audio: false,
  video: true
};

export default defineComponent({
  setup() {
    const store = inject("store");

    const userVideo = ref(null);

    onMounted(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        userVideo.value.srcObject = stream;
      } catch (err) {
        console.log(err.message);
      }
    });

    return { store, userVideo };
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
video {
  border: 1px solid green;
}
</style>
