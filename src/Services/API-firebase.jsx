import { Timestamp, collection, getDocs } from 'firebase/firestore'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '@/firebase-config'
export const fetchBoards = createAsyncThunk(
  'boardSlice/fetchBoards',
  async () => {
    console.log('here')
    try {
      const querySnapshot = await getDocs(collection(db, 'boards'))

      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data()
        console.log(docData)
        const serializedData = { ...docData, id: doc.id }

        // Convert Timestamp fields to Date objects and format to a non serialized string
        if (serializedData.date instanceof Timestamp) {
          serializedData.date = serializedData.date.toDate().toISOString()
        }
        return serializedData
      })
      console.log('data', data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
)
