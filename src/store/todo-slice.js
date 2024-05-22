import { createSlice } from '@reduxjs/toolkit'

const toDoSlice = createSlice({
  name: 'todo',
  initialState: {
    items: [],
    totalQuantity: 0,
    edit: {
      id: null,
      title: null,
      description: null,
    },
    filterBy: 'all',
    filteredData: [],
  },
  reducers: {
    addItemToList(state, action) {
      const item = action.payload
      state.items.push({
        id: Date.now(),
        ...item,
        status: 'active',
      })
      state.totalQuantity++
    },
    removeItemWithList(state, action) {
      const id = action.payload
      const filteredItems = state.items.filter((item) => item.id !== id)
      state.items = filteredItems
      state.totalQuantity--
    },
    changeStatusItem(state, action) {
      const id = action.payload
      const findIndex = state.items.findIndex((item) => item.id === id)
      let status = state.items[findIndex].status
      state.items[findIndex].status = status === 'active' ? 'completed' : 'active'
    },

    filterByCategory(state, action) {
      const status = action.payload
      state.filterBy = status
    },
    filteredData(state, action) {
      const status = action.payload
      state.filteredData = state.items.filter((el) => el.status === status)
    },
    updateItem(state, action) {
      const data = action.payload
      const findIndex = state.items.findIndex((el) => el.id === data.id)
      state.items[findIndex] = { ...state.items[findIndex], title: data.title, description: data.description }
    },
    editItem(state, action) {
      const item = action.payload
      state.edit = item
    },
  },
})

export const toDoSliceAction = toDoSlice.actions
export default toDoSlice
