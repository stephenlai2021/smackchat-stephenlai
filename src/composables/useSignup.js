import { ref } from "@vue/reactivity";
import { auth } from "../firebase/config";

const error = ref(null);

const signup = async (email, password, displayName) => {
  // if there is an existing singup error, e.g. email is already in use, password lenght must be 6 characters, reset error value (clear error message)
  error.value = null;

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    // if we don't get valid response
    if (!res) {
      throw new Error("Could not complete the signup");
    }
    
    // set user name 
    await res.user.updateProfile({ displayName });
    console.log(`user name: ${res.user.displayName}`)

    error.value = null;

    // return res for later use
    return res
  } catch (err) {
    // error sent back from firebase, e.g. 
    // email is already in use, 
    // password lenght must be 6 characters
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
