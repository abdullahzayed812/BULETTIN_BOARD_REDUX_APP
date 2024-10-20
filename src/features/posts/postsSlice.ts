import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";
import axios from "axios";

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions?: {
    [index: string]: number;
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

export interface InitialState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState: InitialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts: AsyncThunk<Post[], void, any> = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    try {
      const response = await axios.get(POSTS_URL);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewPost: AsyncThunk<any, void, any> = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    addReaction(
      state,
      action: PayloadAction<{
        postId: string;
        reaction: keyof NonNullable<Post["reactions"]>;
      }>
    ) {
      const { postId, reaction } = action.payload;

      const post = state.posts.find((post) => post.id === postId);

      if (post) {
        if (!post.reactions) {
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
        }

        post.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";

        const error: SerializedError = action.error as SerializedError; // Optional: Ensure it's a SerializedError
        state.error = error.message || null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
