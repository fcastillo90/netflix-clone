import { CategoryProp } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConfigState {
  navbar: {isVisible: boolean};
}

const initialState: ConfigState = {
  navbar: {isVisible: true},
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setNavbarVisibility: (state, action: PayloadAction<boolean>) => {
      state.navbar.isVisible = action.payload;
    },
    toggleNavbarVisibility: (state) => {
      state.navbar.isVisible = !state.navbar.isVisible;
    },
  },
})

export const { setNavbarVisibility, toggleNavbarVisibility } = configSlice.actions
