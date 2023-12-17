import { createSlice } from '@reduxjs/toolkit'
import { fetchTaskByBoards } from '@/Services/API-firebase'

const initialState = {
  todo: null,
  inProgress: null,
  done: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTaskByBoards.fulfilled, (state, action) => {
      console.log(action.payload)
      state.todo = action.payload.todo
      state.inProgress = action.payload['in progress']
      state.done = action.payload.done
    })
  },
})

export const selectTodotask = (state) => state.tasks.todo
export const selectProgresstask = (state) => state.tasks.inProgress
export const selectDonetask = (state) => state.tasks.done
export default tasksSlice.reducer
