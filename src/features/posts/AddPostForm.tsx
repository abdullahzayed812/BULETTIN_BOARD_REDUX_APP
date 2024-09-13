import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

export const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const onTitleChange = (e: any) => setTitle(e.target.value);
  const onContentChange = (e: any) => setContent(e.target.value);
  const onAuthorChange = (e: any) => setUserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(addPost(title, content, userId));

      setTitle("");
      setContent("");
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.name}>
      {user.name}
    </option>
  ));

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

        <label htmlFor="postAuthor">Post Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>

        <button type="button" disabled={!canSave} onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};
