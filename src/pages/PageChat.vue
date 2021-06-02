<template>
  <q-page class="flex column">
    <!-- <q-banner class="bg-grey-4 text-center">
      {{ otherUserDetails.name }} is
      {{ otherUserDetails.online ? "online" : "offline" }}
    </q-banner> -->
    <q-banner v-if="!otherUserDetails.online" class="bg-grey-4 text-center">
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <div class="q-pa-lg column col justify-end" ref="chats">
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
            : otherUserDetails.name
        "
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

    // onMounted(() => {
    //   console.log(`current route: /chat/${route.params.userId}`);
    //   console.log(`otherUserDetails: ${JSON.stringify(otherUserDetails)}`)
    //   otherUserDetails.value = store.state.users.find(user => user.id === route.params.userId)
    // });

    const otherUserDetails = computed(() => {
      return store.state.users.find((user) => user.id === route.params.userId);
    });

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
      otherUserDetails,
      timer,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-message-container.row.items-end.no-wrap.reverse {
  margin-bottom: 15px;
}
</style>
