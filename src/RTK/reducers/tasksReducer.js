import { createSlice } from '@reduxjs/toolkit'
import { fetchTaskByBoards } from '@/Services/API-firebase'

const initialState = {
  tasks: [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTaskByBoards.fulfilled, (state, action) => {
      state.tasks = action.payload
    })
  },
})

export const selectTasks = (state) => state.tasks.tasks
export default tasksSlice.reducer
