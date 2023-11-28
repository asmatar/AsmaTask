import { Timestamp, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase-config'
export const fetchBoards = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'boards'))

    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data()
      const serializedData = { ...docData, id: doc.id }

      // Convert Timestamp fields to Date objects and format to a non serialized string
      if (serializedData.date instanceof Timestamp) {
        serializedData.date = serializedData.date.toDate().toISOString()
      }
      return serializedData
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
