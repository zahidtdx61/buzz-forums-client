import PropTypes from "prop-types";
import { useState } from "react";

const CommentContent = ({ comment }) => {
  const [feedback, setFeedback] = useState("");

  return (
    <tr>
      <td className="p-2 text-left">{comment.comment}</td>
      <td className="p-2">{new Date(comment.createdAt).toLocaleString()}</td>
      <td className="p-2">{comment?.userId?.email}</td>
      <td className="p-2">
        <input
          type="text"
          defaultValue={comment?.feedback?.length ? comment.feedback : feedback}
          placeholder="Enter your feedback "
          className="border-gray-200 border-2 p-2 rounded-md"
          onChange={(e) => setFeedback(e.target.value)}
        />
      </td>
      <td className="p-2">
        <button
          className="text-white bg-red-600 px-5 py-1 rounded-md disabled:cursor-not-allowed"
          disabled={feedback.length === 0}
        >
          Report
        </button>
      </td>
    </tr>
  );
};

CommentContent.propTypes = {
  comment: PropTypes.object,
};

export default CommentContent;
