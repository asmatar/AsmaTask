import {
  Timestamp,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'
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

export const fetchTaskByBoards = createAsyncThunk(
  'tasksSlice/fetchTaskByBoards',
  async (id) => {
    console.log(id)
    try {
      const boardRef = doc(db, 'boards', id)
      const taskSnapshot = await getDocs(collection(boardRef, 'tasks'))
      const tasks = taskSnapshot.docs.map((taskDoc) => {
        const taskdata = taskDoc.data()
        const serializedData = { ...taskdata, id: taskDoc.id, boardsId: id }
        if (serializedData.date instanceof Timestamp) {
          serializedData.date = serializedData.date.toDate().toISOString()
        }
        console.log(serializedData)
        return serializedData
      })
      console.log(tasks)
      // return 3 diferent arrays filter base on a object keys
      const groupedArrays = tasks.reduce((result, obj) => {
        result[obj.status] = result[obj.status] || []
        result[obj.status].push(obj)
        return result
      }, {})

      return groupedArrays
      /* return tasks */
    } catch (error) {
      console.log(error)
    }
  }
)
export const deleteTaskFromFirebase = async (taskId, boardId) => {
  try {
    console.log(taskId, boardId)
    const boardRef = doc(db, 'boards', boardId, 'tasks', taskId)
    await deleteDoc(boardRef)
  } catch (error) {
    return error.message
  }
}
export const addNewBoard = async ({ boardName, displayName }) => {
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
export const addNewTask = async ({
  taskTitle,
  displayName,
  status,
  boardId,
}) => {
  try {
    const collectionRef = collection(db, 'boards', boardId, 'tasks')
    console.log(collectionRef)
    await addDoc(collectionRef, {
      title: taskTitle,
      date: new window.Date(),
      author: displayName,
      status,
    })
  } catch (error) {
    return error.message
  }
}
