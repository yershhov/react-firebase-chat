import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AppContainerState {
  sideBarIsOpen: boolean;
}

const initialState: AppContainerState = {
  sideBarIsOpen: false,
};

export const appContainerSlice = createSlice({
  name: "appContainer",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.sideBarIsOpen = !state.sideBarIsOpen;
    },
  },
});

export const { toggleSideBar } = appContainerSlice.actions;
export default appContainerSlice.reducer;
