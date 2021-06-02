<template>
  <q-page class="flex column">
    <div v-if="store.state.user">
      <q-banner v-if="!store.state.user.online" class="bg-grey-4 text-center">
        {{ store.state.user.name }} is offline
      </q-banner>
    </div>
    <div v-else></div>
    <div v-if="store.state.user && store.state.userDetails" class="q-pa-lg column col justify-end" ref="chats">
      <q-chat-message :label="timer" />
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        stamp="4 minutes ago"
        :avatar="
          message.from === auth.currentUser.uid
            ? 'https://cdn.quasar.dev/img/avatar1.jpg'
            : 'https://cdn.quasar.dev/img/avatar5.jpg'
        "
        :name="
          message.from === auth.currentUser.uid
            ? store.state.userDetails.name
            : store.state.user.name
        "
        :text="[message.text]"
        :sent="message.from === auth.currentUser.uid ? true : false"
      />
    </div>
    <div v-else class="q-pa-lg column col justify-end" ref="chats">
      <q-chat-message :label="timer" />
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        stamp="4 minutes ago"
        :avatar="
          message.from === auth.currentUser.uid
            ? 'https://cdn.quasar.dev/img/avatar1.jpg'
            : 'https://cdn.quasar.dev/img/avatar5.jpg'
        "
        name=null
        :text="[message.text]"
        :sent="message.from === auth.currentUser.uid ? true : false"
      />
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
              <q-btn
                round
                dense
                flat
                icon="send"
                color="white"
                @click="sendMessage"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch, inject } from "vue";
import { useRoute } from "vue-router";
import getRealtimeDB from "../composables/getRealtimeDB";
import addCloudDocument from "../composables/addCloudDocument";
import { auth, db } from "../firebase/config";

export default defineComponent({
  setup() {
    const store = inject("store");
    const { rtdbDocs, getRtdbError } = getRealtimeDB("smackchat-chats");
    const { addCloudDoc, addCloudError } = addCloudDocument("smackchat-chats");
    const route = useRoute();

    const newMessage = ref("");
    const messages = ref(rtdbDocs);
    const timer = ref(null);

    const sendMessage = async () => {
      if (!newMessage.value) return;

      const userMessage = {
        text: newMessage.value,
        from: auth.currentUser.uid,
        createdAt: Date.now(),
      };

      await addCloudDoc(userMessage);

      newMessage.value = "";
    };

    // auto-scroll to bottom of chats
    const chats = ref(null);

    setInterval(() => {
      timer.value = new Date().toLocaleTimeString();
    }, 1000);

    watch(messages, () => {
      console.log("watch function ran");
      setTimeout(() => {
        window.scrollTo(0, chats.value.scrollHeight);
      }, 20);
    });

    return {
      newMessage,
      messages,
      sendMessage,
      chats,
      auth,
      store,
      route,
      timer
    };
  },
});
</script>

<style lang="scss" scoped>
.q-message-container.row.items-end.no-wrap.reverse {
  margin-bottom: 15px;
}
</style>
