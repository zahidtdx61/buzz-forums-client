import PropTypes from "prop-types";
import LoadContent from "../Loader/LoadContent";
import { Link } from "react-router-dom";

const PostSection = ({ allPosts, isLoading }) => {
  if (isLoading) return <LoadContent />;
  return (
    <div className="w-[95%] lg:max-w-screen-lg mx-auto my-12 ">
      <h1 className="text-2xl font-semibold text-slate-800 text-center mb-4">
        Popular Posts
      </h1>
      {allPosts.length === 0 && (
        <div className="bg-zinc-100 p-4 rounded border-l-4 border-slate-600">
          <h1 className="text-base font-semibold text-slate-800">
            No Posts Found
          </h1>
        </div>
      )}

      {allPosts.length !== 0 && (
        <div className="mx-auto flex flex-col gap-2">
          {allPosts.map((post) => (
            <Link
              to={`/post/${post._id}`}
              key={post._id}
              className="bg-zinc-100 p-4 rounded border-l-4 border-slate-600"
            >
              <h1 className="text-base font-semibold text-slate-800">
                {post.title}
              </h1>
              <p className="text-slate-600 mt-2">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

PostSection.propTypes = {
  allPosts: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default PostSection;
