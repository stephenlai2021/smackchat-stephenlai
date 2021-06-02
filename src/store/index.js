import { reactive, readonly, ref, watchEffect } from "vue";
import { auth, db } from "../firebase/config";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const state = reactive({
  userDetails: null,
  users: null,
  user: null,
  userId: null,
  chats: null,
  registerError: null,
  loginError: null,
  logoutError: null,
  getUsersError: null,
  getChatsError: null,
  addDocumentError: null,
});

const methods = {
  async loginUser(payload) {
    const { email, password } = payload;
    
    try {
      // user login successfully
      await auth.signInWithEmailAndPassword(email, password);
      state.loginError = null;
      
      // get current user id
      const userId = auth.currentUser.uid;

      // set user online status to true
      await db
        .collection("smackchat-users")
        .doc(userId)
        .update({ online: true });

      // router.push('/')
    } catch (err) {
      state.loginError = err.message;
    }
  },
  async registerUser(payload) {
    const { email, password } = payload;

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      
      // auth.currentUser.displayName = name
      // console.log(`displayName: ${auth.currentUser.displayName}`);

      const userId = auth.currentUser.uid;

      // save registered user details to firestore
      db.collection("smackchat-users")
        .doc(userId)
        .set({ ...payload, online: true });

      state.registerError = null;
    } catch (err) {
      state.registerError = err.message;
    }
  },
  async logoutUser() {
    try {
      // get current user
      const userId = auth.currentUser.uid;

      // set user online status to false
      await db
        .collection("smackchat-users")
        .doc(userId)
        .update({ online: false });
      console.log(`user id: ${userId} is logged out`);

      state.userDetails = null;
      state.logoutError = null;

      // logout user
      await auth.signOut();
    } catch (err) {
      state.logoutError = err.message;
      console.log(`logout error: ${state.logoutError}`);
    }
  },
  getAllUsers(collection) {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    const unsub = collectionRef.onSnapshot(
      (snap) => {
        console.log("snapshot");
        let results = [];
        snap.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
          // results.push(doc.data());
        });

        // hide current user from user page
        state.users = results.filter(
          (result) => result.id !== auth.currentUser.uid
        );
        // console.log(`all users: ${JSON.stringify(state.users)}`)
        state.getUsersError = null;
      },
      (err) => {
        console.log(err.message);
        state.users = null;
        state.getUsersError = "could not fetch data";
      }
    );

    watchEffect((onInvalidate) => onInvalidate(() => unsub()));
  },
  getAllChats(collection) {
    let collectionRef = db.collection(collection).orderBy("createdAt");

    const unsub = collectionRef.onSnapshot(
      (snap) => {
        console.log("snapshot");
        let results = [];
        snap.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        state.chats = results;
        state.getChatsError = null;
      },
      (err) => {
        console.log(err.message);
        state.chats = null;
        state.getChatsError = "could not fetch data";
      }
    );

    watchEffect((onInvalidate) => onInvalidate(() => unsub()));
  },
  async addDocument(collection, doc) {
    const addDocumentError = ref(null);
    try {
      await db.collection(collection).add(doc);
      addDocumentError.value = null;
    } catch (err) {
      console.log(err.message);
      addDocumentError.value = "could not send the message";
    }
  },
  saveUserId(id) {
    state.userId = id
  },
  saveUser(user) {
    state.user = user;
  },
  handleAuthStateChanged() {
    auth.onAuthStateChanged(async (_user) => {
      if (_user) {
        // user is logged in
        // get current user from firestore
        const userId = auth.currentUser.uid;
        const res = await db.collection("smackchat-users").doc(userId).get();
        state.userDetails = { ...res.data(), id: userId }
        console.log("current user: ", state.userDetails);
      } else {
        // user is logged out.
        console.log("user logout");
        state.userDetails = null;
      }
    });
  },
};

const getters = {
  counterSquared() {
    return state.counter * state.counter;
  },
  // otherUserDetails() {
  //   return state.user.name
  // }
};

export default {
  state: readonly(state),
  // state,
  methods,
  getters,
};
