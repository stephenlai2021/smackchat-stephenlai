import { ref, watchEffect } from "vue";
import Localbase from "localbase";

let db = new Localbase("db");

const getCloudDB = (collection) => {
  const cloudDocs = ref(null);
  const getCloudDBError = ref(null);

  let collectionRef = db.collection(collection);

  const load = async () => {
    try {
      const res = await collectionRef.get();
      console.log(res)
      cloudDocs.value = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })

    } catch (err) {
      getCloudDBError.value = err.message
      console.log(getCloudDBError.value)
    }
  };

  return { cloudDocs, getCloudDBError, load };
};

export default getCloudDB;
