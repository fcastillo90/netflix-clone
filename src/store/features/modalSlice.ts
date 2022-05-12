import { CategoryProp } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ModalState {
  isOpen: boolean;
  id: number | false;
  category: CategoryProp;
}

const initialState: ModalState = {
  isOpen: false,
  id: false,
  category: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{
      id: number, 
      category: CategoryProp
    }>) => {
      state.isOpen = true;
      state.id = action.payload.id;
      state.category = action.payload.category;
    },
    closeModal: (state) => {
      state.category = false;
      state.id = false;
      state.isOpen = false;
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
