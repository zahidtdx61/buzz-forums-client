import PropTypes from "prop-types";
import { useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadContent from "../Loader/LoadContent";
import SeeCommentModal from "./SeeCommentModal";
import toast from "react-hot-toast";

const CommentContent = ({ comment }) => {
  const axiosSecure = useAxiosSecure();
  const [feedback, setFeedback] = useState("");
  const [seeComment, setSeeComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reportComment = async () => {
    try {
      setIsLoading(true);
      const response = await axiosSecure.post(
        `/user/comment/report/${comment._id}`,
        { feedback }
      );
      console.log(response.data);
      setIsLoading(false);
      setFeedback("");
      toast.success("Comment Reported Successfully");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Error Reporting Comment");
    } finally {
      setIsLoading(false);
      setFeedback("");
    }
  };

  const options = [
    { value: "bad", label: "Bad Comment" },
    { value: "harsh", label: "Harsh Comment" },
    { value: "bully", label: "Bully Me" },
  ];

  if (isLoading)
    return (
      <tr>
        <td>
          <LoadContent />
        </td>
        <td>
          <LoadContent />
        </td>
        <td>
          <LoadContent />
        </td>
        <td>
          <LoadContent />
        </td>
        <td>
          <LoadContent />
        </td>
      </tr>
    );

  return (
    <tr>
      <td className="p-2 text-left">
        {comment.comment.slice(0, Math.min(20, comment.comment.length))}
        {comment.comment.length > 20 ? "..." : ""}
        {comment.comment.length > 20 && (
          <button
            className="text-sm text-blue-500"
            onClick={() => setSeeComment(true)}
          >
            See More
          </button>
        )}
        <SeeCommentModal
          open={seeComment}
          setOpen={setSeeComment}
          comment={comment}
        />
      </td>
      <td className="p-2">{new Date(comment.createdAt).toLocaleString()}</td>
      <td className="p-2">{comment?.userId?.email}</td>
      <td className="p-2">
        <Select options={options} onChange={(e) => setFeedback(e.value)} />
      </td>
      <td className="p-2">
        <button
          className="text-white bg-red-600 px-5 py-1 rounded-md disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-gray-800"
          onClick={reportComment}
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
