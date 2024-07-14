import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Post {
  id: string;
  title: string;
  content: string;
}

export interface InitialState {
  posts: Post[];
}

const initialState: InitialState = {
  posts: [
    { id: "1", title: "Learning Redux Toolkit", content: "" },
    { id: "2", title: "Slices...", content: "" },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const selectAllPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
