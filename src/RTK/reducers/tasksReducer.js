/* eslint-disable no-prototype-builtins */
import { createSlice, current } from '@reduxjs/toolkit'
import { fetchTaskByBoards } from '@/Services/API-firebase'

const initialState = {
  tasks: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    moveColumn: (state, action) => {
      const { source, destination } = action.payload
      const destinationIndex = destination.index
      const sourceIndex = source.index
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

        return orderedObj
      }

      state.tasks = changeKeyOrder(state.tasks, sourceIndex, destinationIndex)
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTaskByBoards.fulfilled, (state, action) => {
      state.tasks = action.payload
    })
  },
})
export const { moveColumn } = tasksSlice.actions
export default tasksSlice.reducer
export const selectAllTasks = (state) => state.tasks.tasks
