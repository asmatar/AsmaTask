import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase-config'

export const fetchBoards = async () => {
  const querySnapshot = await getDocs(collection(db, 'boards'))
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data())
  })
  return querySnapshot
}
