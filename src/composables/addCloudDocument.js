import { ref, inject } from 'vue'
import { db, auth } from '../firebase/config'

const addCloudDocument = (collection) => {
  const addCloudError = ref(null)

  const store = inject('store')

  const addCloudDoc = async (doc) => {
    // reset the error
    addCloudError.value = null
    try {
      // const userId = store.state.userId
        
      // await db.collection(collection).doc(userId).collection('messages').add(doc)
      await db.collection(collection).add(doc)
    } catch (err) {
      console.log(err.message)
      addCloudError.value = 'could not send the message'
    }
  }

  return { addCloudError, addCloudDoc }
}

export default addCloudDocument