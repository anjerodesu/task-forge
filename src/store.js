import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './reducers/todosReducer'

const store = configureStore({
    reducer: todosReducer
})

export default store
