import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "./postsSlice";
import { PostExcerpt } from "./PostExcerpt";

export const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(getPostsStatus);
  const error = useAppSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
