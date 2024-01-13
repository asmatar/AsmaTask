import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './reducers/boardsReducer'
import tasksReducer from './reducers/tasksReducer'

const store = configureStore({
  reducer: {
    board: boardReducer,
    tasks: tasksReducer,
  },
})

export default store
