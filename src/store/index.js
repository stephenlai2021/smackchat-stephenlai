import { reactive, readonly } from "vue";
import { auth, db } from "../firebase/config";

const state = reactive({
  counter: 0,
  colorCode: "red",
  registerError: null,
  loginError: null,
});

const methods = {
  decreaseCounter() {
    state.counter--;
  },
  increaseCounter() {
    state.counter++;
  },
  setColorCode(val) {
    state.colorCode = val;
  },
  async loginUser(payload) {
    const { email, password } = payload;

    try {
      // user login successfully
      await auth.signInWithEmailAndPassword(email, password);
      state.loginError = null;

      // get current user id
      const userId = auth.currentUser.uid;

      // update online status (true)
      await db
        .collection("smackchat-users")
        .doc(userId)
        .update({ online: true });

      // get current user details
      // const res = await db.collection("smackchat-users").doc(userId).get();
      console.log(`login user id: ${userId}`)
    } catch (err) {
      state.loginError = err.message;
    }
  },
  async registerUser(payload) {
    const { email, password } = payload;

    try {
      await auth.createUserWithEmailAndPassword(email, password);

      const userId = auth.currentUser.uid;

      // save registered user details to firestore
      db.collection("smackchat-users")
        .doc(userId)
        .set({ ...payload, online: true, id: userId });
      
      state.registerError = "";
    } catch (err) {
      state.registerError = err.message;
    }
  },
  async logoutUser() {
    try {
      const userId = auth.currentUser.uid;
      await db
        .collection("smackchat-users")
        .doc(userId)
        .update({ online: false });
      console.log(`user id: ${userId} is logged out`)

      await auth.signOut();
    } catch (err) {
      state.logError = err.message;
      console.log(`logout error: ${state.logError}`);
    }
  },
  handleAuthStateChanged() {
    auth.onAuthStateChanged(async (_user) => {
      if (_user) {
        // user is logged in. (register or login is executed)
        const userId = auth.currentUser.uid;
        console.log(`user id: ${userId}`);
        
        // get current user details
        // const res = await db.collection("smackchat-users").doc(userId).get();      
      } else {
        // user is logged out.
        console.log("user logout");
      }
    });
  },
};

const getters = {
  counterSquared() {
    return state.counter * state.counter;
  },
};

export default {
  state: readonly(state),
  // state,
  methods,
  getters,
};
