import { ref, watchEffect } from "vue";
import { db, auth } from "../firebase/config";

const getChatMessages = (collection) => {
  const rtdbDocs = ref(null);
  const getRtdbError = ref(null);

  let collectionRef = db.collection(collection).orderBy('createdAt')

  const unsub = collectionRef.onSnapshot(snap => {
    console.log('snapshot')
    let results = []
    snap.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })

    // get users details info (email, id, name, online, password)
    // rtdbDocs.value = results.filter(result => result.id !== auth.currentUser.uid)
    rtdbDocs.value = results

    console.log(rtdbDocs.value)
    getRtdbError.value = null
  }, err => {
    console.log(err.message)
    rtdbDocs.value = null
    getRtdbError.value = 'could not fetch data'
  })

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { rtdbDocs, getRtdbError }
};

export default getChatMessages;
