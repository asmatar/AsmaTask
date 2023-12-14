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
import { showErrorToast, showSuccessToast } from '@/Utils/Toast'

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
      return error.message
    }
  }
)

export const fetchTaskByBoards = createAsyncThunk(
  'tasksSlice/fetchTaskByBoards',
  async (id) => {
    try {
      const boardRef = doc(db, 'boards', id)
      const taskSnapshot = await getDocs(collection(boardRef, 'tasks'))
      const tasks = taskSnapshot.docs.map((taskDoc) => {
        const taskdata = taskDoc.data()
        const serializedData = { ...taskdata, id: taskDoc.id, boardsId: id }
        if (serializedData.date instanceof Timestamp) {
          serializedData.date = serializedData.date.toDate().toISOString()
        }
        return serializedData
      })
      // return 3 diferent arrays filter base on a object keys
      const groupedArrays = tasks.reduce((result, obj) => {
        result[obj.status] = result[obj.status] || []
        result[obj.status].push(obj)
        return result
      }, {})
      return groupedArrays
    } catch (error) {
      return error.message
    }
  }
)
export const deleteTaskFromFirebase = async (taskId, boardId, value) => {
  try {
    const boardRef = doc(db, 'boards', boardId, 'tasks', taskId)
    await deleteDoc(boardRef)
    showSuccessToast('Task has been deleted !!', value)
  } catch (error) {
    return showErrorToast(error.message, value)
  }
}
export const deleteBoardFromFirebase = async (boardId, value) => {
  try {
    const boardRef = doc(db, 'boards', boardId)
    await deleteDoc(boardRef)
    showSuccessToast('Board has been deleted !!', value)
  } catch (error) {
    return showErrorToast(error.message, value)
  }
}
export const addNewBoard = async ({ boardName, displayName, value }) => {
  try {
    const collectionRef = collection(db, 'boards')
    await addDoc(collectionRef, {
      name: boardName,
      date: new window.Date(),
      author: displayName,
    })
    showSuccessToast('Board created !!', value)
  } catch (error) {
    return showErrorToast(error.message, value)
  }
}

export const addNewTask = async ({
  taskTitle,
  displayName,
  status,
  boardId,
  value,
}) => {
  try {
    const collectionRef = collection(db, 'boards', boardId, 'tasks')
    // Check if the tasks collection exists
    const tasksCollectionSnapshot = await getDocs(collectionRef)
    const tasksCollectionExists = !tasksCollectionSnapshot.empty

    // If the tasks collection doesn't exist, create it first
    if (!tasksCollectionExists) {
      await addDoc(collectionRef, {
        title: taskTitle,
        date: new window.Date(),
        author: displayName,
        status,
      })
      showSuccessToast('Task created !!', value)
    } else {
      await addDoc(collectionRef, {
        title: taskTitle,
        date: new window.Date(),
        author: displayName,
        status,
      })
      showSuccessToast('Task created !!', value)
    }
  } catch (error) {
    return showErrorToast(error.message, value)
  }
}
