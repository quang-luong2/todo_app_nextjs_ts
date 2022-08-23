import { createSlice } from '@reduxjs/toolkit'
import Todo from '../typescript/model'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state: Todo[], action) => {
      state.push(action.payload)
    },
    deleteTodo: (state: Todo[], action) => {
      state.splice(action.payload, 1)
    },
    updateTodo: (state: Todo[], action) => {
      state.splice(action.payload.index, 1, action.payload.name)
    },
  },
})

const { reducer, actions } = todoSlice
export const { addTodo, deleteTodo, updateTodo } = actions
export default reducer
