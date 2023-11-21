import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './reducers/boardsReducer'

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
})

export default store
