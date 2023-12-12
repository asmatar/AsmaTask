import { createSlice } from '@reduxjs/toolkit'
import { fetchBoards } from '@/Services/API-firebase'

const initialState = {
  board: [],
  loading: false,
  error: null,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      console.log('action.payload', action.payload)
      state.board = action.payload
    })
  },
})

export const selectBoards = (state) => state.board.board
export const loadingBoards = (state) => state.board.loading
export const errorBoards = (state) => state.board.error
export default boardSlice.reducer
