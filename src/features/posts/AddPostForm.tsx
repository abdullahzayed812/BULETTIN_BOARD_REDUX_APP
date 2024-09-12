import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addPost } from "./postsSlice";

export const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChange = (e: any) => setTitle(e.target.value);
  const onContentChange = (e: any) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(addPost(title, content));

      setTitle("");
      setContent("");
    }
  };

  return (
    <section>
      <h2>Add new post</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="postContent">Post Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        ></textarea>

        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};
