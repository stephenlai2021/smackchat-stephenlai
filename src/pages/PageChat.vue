<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center"> User is offline. </q-banner>
    <div class="q-pa-md column col justify-end" ref="chats">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false"
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
import { defineComponent, ref, onUpdated, watchEffect, watch } from "vue";
import getRealtimeDB from "../composables/getRealtimeDB";
import addCloudDocument from "../composables/addCloudDocument";
import { timestamp } from "../firebase/config";

export default defineComponent({
  setup() {
    const { rtdbDocs, getRtdbError } = getRealtimeDB("smackchat-chats");
    const { addCloudDoc, addCloudError } = addCloudDocument("smackchat-chats");

    const newMessage = ref("");
    const messages = ref(rtdbDocs);

    const sendMessage = async () => {
      if (!newMessage.value) return;

      const userMessage = {
        text: newMessage.value,
        from: "me",
        createdAt: Date.now()
      };
      await addCloudDoc(userMessage);

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
    
    return { newMessage, messages, sendMessage, chats };
  },
});
</script>

<style lang="sass" scoped></style>
