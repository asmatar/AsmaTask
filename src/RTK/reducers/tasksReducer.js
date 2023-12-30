/* eslint-disable no-prototype-builtins */
import { createSlice } from '@reduxjs/toolkit'
import { fetchTaskByBoards } from '@/Services/API-firebase'
import { sortTaskArray } from '../../Utils/sort'

const initialState = {
  tasks: {},
  status: 'idle', // 'loading' | 'succeeded' | 'failed'
  error: null,
  searchString: '',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveColumn: (state, action) => {
      const { source, destination, allTasks } = action.payload
      const destinationIndex = destination.index
      const sourceIndex = source.index
      console.log(source, destination)
      /* test */
      const changeKeyOrder = (obj, sourceIndex, destinationIndex) => {
        const keys = Object.keys(obj)
        const values = Object.values(obj)

        // Remove the key-value pair from the source index
        const [removedKey] = keys.splice(sourceIndex, 1)
        const [removedValue] = values.splice(sourceIndex, 1)

        // Insert the removed key-value pair at the destination index
        keys.splice(destinationIndex, 0, removedKey)
        values.splice(destinationIndex, 0, removedValue)

        // Create a new object with the updated key order
        const orderedObj = {}
        keys.forEach((key, index) => {
          orderedObj[key] = values[index]
        })
        console.log(orderedObj)
        return orderedObj
      }

      state.tasks = changeKeyOrder(allTasks, sourceIndex, destinationIndex)
    },
    moveTask: (state, action) => {
      const { source, destination } = action.payload

      const destinationId = destination.droppableId
      const destinationIndex = destination.index

      const sourceId = source.droppableId
      const sourceIndex = source.index

      const changeTaskOrder = (
        obj,
        sourceIndex,
        sourceId,
        destinationId,
        destinationIndex
      ) => {
        let updatedTasks = { ...obj }
        const sourceKey = Object.keys(updatedTasks)[sourceId]
        const destinationKey = Object.keys(updatedTasks)[destinationId]

        if (
          !updatedTasks.todo ||
          !updatedTasks.progress ||
          !updatedTasks.done
        ) {
          const allTasksUnsorted = {
            ...updatedTasks,
            todo: updatedTasks.todo || [],
            progress: updatedTasks.progress || [],
            done: updatedTasks.done || [],
          }

          updatedTasks = sortTaskArray(allTasksUnsorted)

          const sourceKey = Object.keys(updatedTasks)[sourceId]
          const destinationKey = Object.keys(updatedTasks)[destinationId]
          const sourceArray = updatedTasks[sourceKey]
          const [removedTask] = sourceArray.splice(sourceIndex, 1)
          const destinationArray = updatedTasks[destinationKey]
          destinationArray.splice(destinationIndex, 0, removedTask)
          return updatedTasks
        }

        if (sourceKey && destinationKey) {
          const sourceArray = updatedTasks[sourceKey]
          const [removedTask] = sourceArray.splice(sourceIndex, 1)

          const destinationArray = updatedTasks[destinationKey]
          destinationArray.splice(destinationIndex, 0, removedTask)
        }
        return updatedTasks
      }
      const updatedTasks = changeTaskOrder(
        state.tasks,
        sourceIndex,
        sourceId,
        destinationId,
        destinationIndex
      )

      // Update state with the modified tasks object
      state.tasks = updatedTasks
    },
    searchByName: (state, action) => {
      state.searchString = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchTaskByBoards.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(fetchTaskByBoards.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchTaskByBoards.pending, (state, action) => {
        state.status = 'loading'
      })
  },
})
export const { moveColumn, moveTask, searchByName } = tasksSlice.actions
export default tasksSlice.reducer
export const selectAllTasks = (state) => state.tasks.tasks
export const selectStatus = (state) => state.tasks.status
export const selecterror = (state) => state.tasks.error
export const selectSearchString = (state) => state.tasks.searchString
