import { createSlice } from '@reduxjs/toolkit'
import { fetchBoards } from '@/Services/API-firebase'

const initialState = {
  board: [],
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.board = action.payload
    })
  },
})

export const selectBoards = (state) => state.board.board
export default boardSlice.reducer
