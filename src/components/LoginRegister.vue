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
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, inject } from "vue";
import { useRouter } from 'vue-router'

export default defineComponent({
  props: ["tab"],
  setup(props) {
    const store = inject('store')
    const router = useRouter()

    const formData = ref({
      name: "",
      email: "",
      password: "",
      createdAt: Date.now()
    });

    const submitForm = () => {
      if (props.tab === "login") {
        store.methods.loginUser(formData.value)

        if (!store.state.loginError) router.push('/')
        // console.log("login the user");
      } else {
        store.methods.registerUser(formData.value)
        
        if (!store.state.registerError) router.push('/')
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
