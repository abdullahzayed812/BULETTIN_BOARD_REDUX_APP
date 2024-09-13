import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";

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
}

const initialState: InitialState = {
  posts: [
    {
      id: "1",
      title: "Learning Redux Toolkit",
      content:
        "This is the good thing to do, to make my app structured well and make state to be available",
      userId: "",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    },
    {
      id: "2",
      title: "Learning C++ Language",
      content:
        "It's a great language to take the core programming concepts, and applied in very wide domains.",
      userId: "",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      },
    },
  ],
};

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
});

export const selectAllPosts = (state: RootState) => state.posts;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
