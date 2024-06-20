import PropTypes from "prop-types";
import LoadContent from "../Loader/LoadContent";

const Tags = ({ tag, setTag, allTags, tagsLoading }) => {
  if (tagsLoading) return <LoadContent />;

  return (
    <div className="max-w-screen-lg mx-auto my-8">
      <div className="flex gap-2 flex-wrap justify-center">
        {allTags?.map((tagItem) => (
          <button
            key={tagItem._id}
            onClick={() => setTag(tagItem.value)}
            className={`px-4 py-2 rounded ${
              tag === tagItem.value
                ? "bg-slate-500 text-white"
                : "bg-slate-200 text-slate-800"
            }`}
          >
            #{tagItem.label}
          </button>
        ))}
        <button onClick={() => setTag(null)} className={`px-4 py-2 rounded bg-red-200 text-blue-800`}>
            Clear tags
        </button>
      </div>
    </div>
  );
};

Tags.propTypes = {
  tag: PropTypes.string,
  setTag: PropTypes.func,
  allTags: PropTypes.array,
  tagsLoading: PropTypes.bool,
};

export default Tags;
