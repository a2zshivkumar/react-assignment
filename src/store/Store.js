import { configureStore } from '@reduxjs/toolkit'
import AddItem from './AddItem'

export const store = configureStore({
  reducer: {
      productList: AddItem
  },
})