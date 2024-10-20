import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionsButtons";
import { TimeAgo } from "./TimeAgo";
import { Post } from "./postsSlice";

interface PostExcerptProps {
  post: Post;
}

export const PostExcerpt: React.FC<PostExcerptProps> = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};
