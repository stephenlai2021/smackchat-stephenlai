<template>
  <q-page class="flex column">
    <!-- <q-banner class="bg-grey-4 text-center"> {{ store.state.user.name }} is {{ store.state.user.online ? 'online' : 'offline'  }} </q-banner> -->
    <q-banner class="bg-grey-4 text-center"></q-banner>
    <div class="q-pa-lg column col justify-end" ref="chats">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from === auth.currentUser.uid ? store.state.userDetails.name : 'them'"
        :text="[message.text]"
        :sent="message.from === auth.currentUser.uid ? true : false"
      />
      <!-- <div class="error">{{ error }}</div> -->
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input
            bg-color="white"
            rounded
            outlined
            v-model="newMessage"
            label="Message"
            dense
            @keypress.enter.prevent="sendMessage"
          >
            <template v-slot:after>
              <!-- <q-btn round dense flat type="submit" icon="send" color="white" /> -->
              <q-btn round dense flat icon="send" color="white" @click="sendMessage" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch, inject } from "vue";
import { useRoute } from 'vue-router'
import getRealtimeDB from "../composables/getRealtimeDB";
import addCloudDocument from "../composables/addCloudDocument";
import { auth, db } from "../firebase/config";

export default defineComponent({
  setup() {
    const store = inject('store')
    const { rtdbDocs, getRtdbError } = getRealtimeDB("smackchat-chats");
    const { addCloudDoc, addCloudError } = addCloudDocument("smackchat-chats");
    const route = useRoute()

    const newMessage = ref("");
    const messages = ref(rtdbDocs);

    onMounted(() => {
      // store.methods.getAllChats('smackchat-chats')
      // console.log(`user id: ${store.state.userId}`)
    })

    const sendMessage = async () => {
      if (!newMessage.value) return;

      const userMessage = {
        text: newMessage.value,
        from: auth.currentUser.uid,
        createdAt: Date.now()
      };
      
      // store.methods.addDocument('smackchat-chats', userMessage)
      await addCloudDoc(userMessage)

      newMessage.value = "";
    };

    // const otherUserDetails = computed(() => {
    //   return store.state.users[route.params.userId]
    // })

    // auto-scroll to bottom of chats
    const chats = ref(null);

    watch(messages, () => {
      console.log('watch function ran')
      setTimeout(() => {
        window.scrollTo(0, chats.value.scrollHeight);
      }, 20);
    })
    
    return { newMessage, messages, sendMessage, chats, auth, store, route };
  },
});
</script>

<style lang="sass" scoped></style>
