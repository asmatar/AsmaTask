import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './reducers/boardReducer'

const store = configureStore({
  reducer: {
    board: boardReducer,
  },
})

export default store
