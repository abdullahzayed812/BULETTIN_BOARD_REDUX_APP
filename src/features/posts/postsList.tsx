import { useAppSelector } from "../../app/hooks";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionsButtons";
import { TimeAgo } from "./TimeAgo";
import { selectAllPosts } from "./postsSlice";

export const PostsList: React.FC = () => {
  const { posts } = useAppSelector(selectAllPosts);

  const sortedPostsByDescendingOrder = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = sortedPostsByDescendingOrder.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>

      <div className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>

      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
