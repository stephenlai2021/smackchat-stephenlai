import { ref } from "vue";
import Localbase from "localbase";

let db = new Localbase("db");

const addLocalDocument = (collection) => {
  const addLocalError = ref(null);

  const addLocalDoc = async (doc) => {
    // reset the error
    addLocalError.value = null;

    try {
      await db.collection(collection).add(doc);
    } catch (err) {
      console.log(err.message);
      addLocalError.value = "could not send the message";
    }
  };

  return { addLocalError, addLocalDoc };
};

export default addLocalDocument;
