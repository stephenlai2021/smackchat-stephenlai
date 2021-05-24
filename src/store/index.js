import { reactive, readonly } from "vue";
import { auth, db } from "../firebase/config";

const state = reactive({
  registerError: null,
  loginError: null,
  logoutError: null,
  userDetails: null
});

const methods = {
  async loginUser(payload) {
    const { email, password } = payload;    

    try {
      // user login successfully
      await auth.signInWithEmailAndPassword(email, password);
      
      // get current user id
      const userId = auth.currentUser.uid;
      
      // const res = await db.collection("smackchat-users").doc(userId).get();
      // if (res.data() === state.userDetails) {
      //   state.loginError = 'This account is already logged in !'
      //   return
      // }
      
      
      console.log("current user: ", state.userDetails);

      // set user online status to true
      await db
        .collection("smackchat-users")
        .doc(userId)
        .update({ online: true });

      state.loginError = null;
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
      console.log(`user id: ${userId} is logged out`)
      
      state.userDetails = null
      state.logoutError = null
      
      // logout user
      await auth.signOut();

    } catch (err) {
      state.logoutError = err.message;
      console.log(`logout error: ${state.logoutError}`);
    }
  },
  handleAuthStateChanged() {
    auth.onAuthStateChanged(async (_user) => {
      if (_user) {
        // user is logged in.

        // get current user from auth
        // state.user = auth.currentUser;
        // console.log(`current user: ${JSON.stringify(state.user)}`)

        // get current user from firestore
        const userId = auth.currentUser.uid;
        const res = await db.collection("smackchat-users").doc(userId).get();
        state.userDetails = res.data()
        console.log('current user: ', state.userDetails)

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
