<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center"> {{ store.state.user.name }} is {{ store.state.user.online ? 'online' : 'offline'  }} </q-banner>
    <div class="q-pa-lg column col justify-end" ref="chats">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="store.state.user.name"
        :text="[message.text]"
        :sent="message.id === auth.currentUser.uid ? false : message.id === store.state.user.id ? true : null"
      />
      <!-- <div class="error">{{ error }}</div> -->
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
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
              <q-btn round dense flat type="submit" icon="send" color="white" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watch, inject } from "vue";
import getRealtimeDB from "../composables/getRealtimeDB";
import addCloudDocument from "../composables/addCloudDocument";
import { auth, db } from "../firebase/config";

export default defineComponent({
  setup() {
    const store = inject('store')
    const { rtdbDocs, getRtdbError } = getRealtimeDB("smackchat-chats");
    const { addCloudDoc, addCloudError } = addCloudDocument("smackchat-chats");

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
        id: auth.currentUser.uid,
        createdAt: Date.now()
      };
      
      // store.methods.addDocument('smackchat-chats', userMessage)
      await addCloudDoc(userMessage)

      newMessage.value = "";
    };

    // auto-scroll to bottom of chats
    const chats = ref(null);

    watch(messages, () => {
      console.log('watch function ran')
      setTimeout(() => {
        window.scrollTo(0, chats.value.scrollHeight);
      }, 20);
    })
    
    return { newMessage, messages, sendMessage, chats, auth, store };
  },
});
</script>

<style lang="sass" scoped></style>
