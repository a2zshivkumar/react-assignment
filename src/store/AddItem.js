import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  itemList: [],
  selectedItem:null,
}

export const AddItem = createSlice({
  name: 'AddItem',
  initialState,
  reducers: {
    addItem: (state, list) => {
        state.itemList.push(list.payload);
    },
    removeItem: (state, removeIndex) => {
        state.itemList.splice(removeIndex.payload, 1);
    },
    clearCartItem:(state)=>{
      state.itemList = [];
    }
  },
})

export const { addItem, removeItem, clearCartItem } = AddItem.actions

export default AddItem.reducer