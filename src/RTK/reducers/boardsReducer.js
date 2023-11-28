import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  board: [],
}
const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.board.push(action.payload)
    },
  },
})

export const { addBoard } = boardSlice.actions
export default boardSlice.reducer
