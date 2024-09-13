import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface User {
  id: string;
  name: string;
}

export interface InitialState {
  users: User[];
}

const initialState: InitialState = {
  users: [
    { id: "0", name: "Abdullah zayed" },
    { id: "1", name: "Hamza abdullah" },
    { id: "2", name: "Mohamed abdullah" },
  ],
};

const usersSlice = createSlice({ name: "users", initialState, reducers: {} });

export const selectAllUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
