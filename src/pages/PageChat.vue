<template>
  <q-page class="page-chat flex column">
    <div v-if="store.state.user">
      <q-banner v-if="!store.state.user.online" class="bg-grey-4 text-center fixed-top">
        {{ store.state.user.name }} is offline
      </q-banner>
    </div>
    <div v-else></div>
    <div
      v-if="store.state.user && store.state.userDetails"
      :class="{ invisible: !showMessages }"
      class="q-pa-lg column col justify-end"
      ref="chats"
    >
      <!-- <q-chat-message :label="timer" /> -->
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :stamp="message.createdAt"
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
        :bg-color="message.from === auth.currentUser.uid ? 'white' : 'light-green-2'"
      />
    </div>
    <div v-else class="q-pa-lg column col justify-end" ref="chats">
      <!-- <q-chat-message :label="timer" /> -->
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :stamp="message.createdAt"
        :avatar="
          message.from === auth.currentUser.uid
            ? 'https://cdn.quasar.dev/img/avatar1.jpg'
            : 'https://cdn.quasar.dev/img/avatar5.jpg'
        "
        name="null"
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
import { auth, timestamp } from "../firebase/config";
import { formatDistanceToNow } from 'date-fns'

export default defineComponent({
  setup() {
    const store = inject("store");
    const { rtdbDocs, getRtdbError } = getRealtimeDB("smackchat-chats");
    const { addCloudDoc, addCloudError } = addCloudDocument("smackchat-chats");
    const route = useRoute();

    const newMessage = ref("");
    const messages = ref(rtdbDocs);
    const timer = ref(null);
    const showMessages = ref(false);

    const formattedMessages = computed(() => {
      if (messages.value) {
        return messages.value.map(message => {
          let time = formatDistanceToNow(message.createdAt)
          return { ...message, createdAt: time }
        })
      }
      return null
    })

    const sendMessage = async () => {
      if (!newMessage.value) return;

      const userMessage = {
        text: newMessage.value,
        from: auth.currentUser.uid,
        createdAt: new Date().toLocaleString()
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
        showMessages.value = true;
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
      // timer,
      showMessages,
      formattedMessages
    };
  },
});
</script>

<style lang="scss" scoped>
.q-message {
  z-index: 1;
}
.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
.page-chat {
  background: #e2dfd5;
  &:after {
    content: '';
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.1;
    background-image: radial-gradient(
        circle at 100% 150%,
        silver 24%,
        white 24%,
        white 28%,
        silver 28%,
        silver 36%,
        white 36%,
        white 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 0 150%,
        silver 24%,
        white 24%,
        white 28%,
        silver 28%,
        silver 36%,
        white 36%,
        white 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 50% 100%,
        white 10%,
        silver 10%,
        silver 23%,
        white 23%,
        white 30%,
        silver 30%,
        silver 43%,
        white 43%,
        white 50%,
        silver 50%,
        silver 63%,
        white 63%,
        white 71%,
        transparent 71%,
        transparent
      ),
      radial-gradient(
        circle at 100% 50%,
        white 5%,
        silver 5%,
        silver 15%,
        white 15%,
        white 20%,
        silver 20%,
        silver 29%,
        white 29%,
        white 34%,
        silver 34%,
        silver 44%,
        white 44%,
        white 49%,
        transparent 49%,
        transparent
      ),
      radial-gradient(
        circle at 0 50%,
        white 5%,
        silver 5%,
        silver 15%,
        white 15%,
        white 20%,
        silver 20%,
        silver 29%,
        white 29%,
        white 34%,
        silver 34%,
        silver 44%,
        white 44%,
        white 49%,
        transparent 49%,
        transparent
      );
    background-size: 100px 50px;
  }
}
</style>
