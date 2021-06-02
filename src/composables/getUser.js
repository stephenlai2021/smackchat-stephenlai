import { ref } from "vue";
import { auth } from "../firebase/config";

// get current logged in user
const user = ref(auth.currentUser);

// onAuthStateChanged must have arguments, so async/await is not applicable
auth.onAuthStateChanged((_user) => {
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
