import { useAppDispatch } from "../../app/hooks";
import { Post, addReaction } from "./postsSlice";

interface ReactionButtonsProps {
  post: Post;
}

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

export const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      type="button"
      name="reactionButton"
      className="reactionButton"
      onClick={() => dispatch(addReaction({ postId: post.id, reaction: name }))}
    >
      {emoji} {post.reactions![name]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
};
