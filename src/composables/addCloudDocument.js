import { ref } from 'vue'
import { db } from '../firebase/config'

const addCloudDocument = (collection) => {
  const addCloudError = ref(null)

  const addCloudDoc = async (doc) => {
    // reset the error
    addCloudError.value = null

    try {
      await db.collection(collection).add(doc)
    } catch (err) {
      console.log(err.message)
      addCloudError.value = 'could not send the message'
    }
  }

  return { addCloudError, addCloudDoc }
}

export default addCloudDocument