import { Timestamp, collection, getDocs, addDoc } from 'firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '@/firebase-config'
export const fetchBoards = createAsyncThunk(
  'boardSlice/fetchBoards',
  async () => {
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
)

export const addNewBoard = async ({ boardName, displayName }) => {
  console.log(boardName, 'boardName')
  console.log(displayName, 'userName')
  try {
    const collectionRef = collection(db, 'boards')
    await addDoc(collectionRef, {
      name: boardName,
      date: new window.Date(),
      author: displayName,
    })
  } catch (error) {
    return error.message
  }
}
