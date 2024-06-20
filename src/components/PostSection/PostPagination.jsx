import PropTypes from "prop-types";

const PostPagination = ({ totalPages, setPage, currPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  // console.log(pages);
  return (
    <div className="mx-auto w-fit flex gap-1">
      <button
        onClick={() => setPage(currPage-1)}
        disabled={currPage === 1}
        className="disabled:text-slate-500 disabled:cursor-not-allowed px-2 py-1 rounded bg-zinc-200"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          onClick={() => setPage(page)}
          key={page}
          className={`disabled:text-zinc-100 disabled:cursor-not-allowed px-2 py-1 rounded ${
            currPage === page ? "bg-zinc-400" : "bg-zinc-200"
          } `}
        >
          {page}
        </button>
      ))}
      <button
      onClick={() => setPage(currPage+1)}
        className="disabled:text-slate-500 disabled:cursor-not-allowed px-2 py-1 rounded bg-zinc-200"
        disabled={currPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

PostPagination.propTypes = {
  totalPages: PropTypes.number,
  setPage: PropTypes.func,
  currPage: PropTypes.number,
};

export default PostPagination;
