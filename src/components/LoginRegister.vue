<template>
  <q-form @submit="submitForm">
    <q-input v-if="tab === 'register'" outlined v-model="formData.name" label="Name" class="q-mb-md" />
    <q-input
      outlined
      v-model="formData.email"
      label="Email"
      class="q-mb-md"
      type="email"
      required
    />
    <q-input
      outlined
      v-model="formData.password"
      label="Password"
      class="q-mb-md"
      type="password"
      required
    />
    <p class="text-red" v-if="tab === 'register'">{{ store.state.registerError }}</p>
    <p class="text-red" v-else>{{ store.state.loginError }}</p>
    <div class="row">
      <!-- <q-space /> -->
      <q-btn color="primary" :label="tab" type="submit" />
      <q-space />
      <q-btn color="secondary" label="logout" @click="userLogout" />
      <!-- <q-btn color="secondary" label="logout" /> -->
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
// import { timestamp } from '../firebase/config'

export default defineComponent({
  props: ["tab"],
  setup(props) {
    const store = inject('store')

    const formData = ref({
      name: "",
      email: "",
      password: "",
      createdAt: Date.now()
    });

    const submitForm = () => {
      if (props.tab === "login") {
        store.methods.loginUser(formData.value)
        // console.log("login the user");
      } else {
        store.methods.registerUser(formData.value)
      }
    };

    const userLogout = async () => {
      await store.methods.logoutUser()
    }

    return { formData, submitForm, store, userLogout };
  },
});
</script>

<style lang="sass" scoped></style>
