import { Comment } from "@mui/icons-material";
import PropTypes from "prop-types";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link
      to={`/post/${post._id}`}
      key={post._id}
      className="bg-zinc-100 p-4 rounded w-full"
    >
      <h1 className="text-base font-semibold text-slate-800">{post.title}</h1>
      <div className="w-fit mt-1 text-sm bg-zinc-300 text-slate-700 px-2 rounded">
        #{post.tag}
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:justify-between">
        {/* author and post date */}
        <div className="flex gap-2 items-center">
          <div className="size-8">
            <img
              src={post?.user?.image}
              alt={post?.user?.name}
              className="rounded-full"
            />
          </div>
          <div className="text-slate-600 text-sm font-semibold">
            <p>
              Author name: <span className="font-normal">{post.user.name}</span>
            </p>
            <p>
              Posted at:{" "}
              <span className="font-normal">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* comments and votes */}
        <div className="flex gap-3">
          <p className="text-slate-600 text-sm font-semibold mt-2 flex gap-1">
            <Comment />
            <span className="font-normal">{post.comments.length}</span>
          </p>
          <p className="text-slate-600 text-sm font-semibold mt-2 flex gap-1">
            <BiUpvote size={18} />
            <span className="font-normal">{post.upVotes}</span>
          </p>
          <p className="text-slate-600 text-sm font-semibold mt-2 flex gap-1">
            <BiDownvote size={18} />
            <span className="font-normal">{post.downVotes}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
