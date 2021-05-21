import { ref, watchEffect } from "vue";
import Localbase from "localbase";

let db = new Localbase("db");

const getLocalDB = (collection) => {
  const localDocs = ref(null);
  const getLocalDBError = ref(null);

  let collectionRef = db.collection(collection);

  const load = async () => {
    try {
      const res = await collectionRef.get();
      console.log(res)
      localDocs.value = res
    } catch (err) {
      getLocalDBError.value = err.message
      console.log(getLocalDBError.value)
    }
  };

  return { localDocs, getLocalDBError, load };
};

export default getLocalDB;
