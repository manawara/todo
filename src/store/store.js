import { configureStore } from '@reduxjs/toolkit'
import toDoSlice from './todo-slice'

const store = configureStore({
  reducer: toDoSlice.reducer,
})

export default store
