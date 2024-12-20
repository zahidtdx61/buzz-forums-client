import PropTypes from "prop-types";
import Select from "react-select";
import LoadContent from "../Loader/LoadContent";
import PostCard from "./PostCard";

const PostSection = ({ allPosts, isLoading, setSorted }) => {
  const options = [
    { value: "createdAt", label: "Sort By Posting time" },
    { value: "vote", label: "Sort By Popularity" },
  ];

  if (isLoading) return <LoadContent />;

  return (
    <div className="w-[95%] lg:max-w-screen-md mx-auto my-16 ">
      <h1 className="text-2xl font-semibold text-slate-800 text-center mb-4">
        Popular Posts
      </h1>
      <Select
        options={options}
        className="w-52 mx-auto max-w-screen-sm mb-4"
        onChange={(e) => setSorted(e.value)}
      />
      {allPosts.length === 0 && (
        <div className="bg-zinc-100 p-4 rounded">
          <h1 className="text-base font-semibold text-slate-800 text-center">
            No Posts Found
          </h1>
        </div>
      )}

      {allPosts.length !== 0 && (
        <div className="mx-auto flex flex-col gap-2">
          {allPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

PostSection.propTypes = {
  allPosts: PropTypes.array,
  isLoading: PropTypes.bool,
  setSorted: PropTypes.func,
};

export default PostSection;
