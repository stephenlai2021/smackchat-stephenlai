import { ref } from "@vue/reactivity";
import { auth } from "../firebase/config";

const error = ref(null);

const login = async (email, password) => {
  // if there is an existing singup error, e.g. email is already in use, password lenght must be 6 characters, reset error value (clear error message)
  error.value = null;

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    error.value = null;

    if (!res) {
      throw new Error("Incorrect login credentials");
    }
    console.log(res);

    // return res for later use
    return res;
  } catch (err) {
    // error sent back from firebase, e.g. 
    // There is no user record corresponding to this identifier.
    // The user may have been deleted., The password is invalid or the user does not have a password.
    error.value = err.message;
    console.log(error.value);
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
