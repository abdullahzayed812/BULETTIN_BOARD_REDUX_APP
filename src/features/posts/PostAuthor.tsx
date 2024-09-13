import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

interface PostUserProps {
  userId: string;
}

export const PostAuthor: React.FC<PostUserProps> = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return <span>By: {author ? author.name : "Unknown author"}</span>;
};
