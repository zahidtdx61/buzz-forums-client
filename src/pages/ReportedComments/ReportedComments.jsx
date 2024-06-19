import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadContent from "../../components/Loader/LoadContent";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-comments"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/reported-comments");
      const data = response.data;
      // console.log(data);
      return data.data;
    },
  });

  const { mutateAsync, isLoading: mutationLoading } = useMutation({
    mutationFn: async (commentId) => {
      const response = await axiosSecure.delete(
        `/admin/delete-comment/${commentId}`
      );
      return response.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Comment Deleted Successfully");
    },
  });

  const deleteComment = async (commentId) => {
    try {
      await mutateAsync(commentId);
    } catch (error) {
      console.log(error);
      toast.error("Error Deleting Comment");
    }
  };

  if (isLoading || mutationLoading) return <LoadContent />;

  return (
    <div>
      <div className="w-[95%] mx-auto">
        <h1 className="text-2xl font-bold text-center mt-8">
          All Reported Comments.
        </h1>

        {comments.length === 0 && (
          <p className="text-xl text-center font-semibold text-slate-400 mt-4">
            No Comments were Reported.
          </p>
        )}

        {comments.length !== 0 && (
          <div className="mx-auto sm:overflow-x-auto md:overflow-visible">
            <table className="w-full text-center mt-8">
              <thead>
                <tr className="border-b-2">
                  <th className="px-4 py-2">Reported Comment</th>
                  <th className="px-4 py-2">Commenter Email</th>
                  <th className="px-4 py-2">Feedback</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {comments?.length !== 0 &&
                  comments?.map((comment) => (
                    <tr key={comment._id}>
                      <td className="text-left p-2">{comment.comment}</td>
                      <td>{comment.userId.email}</td>
                      <td>{comment.feedback}</td>
                      <td>
                        <button
                          onClick={() => deleteComment(comment._id)}
                          className="text-white bg-red-600 px-5 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedComments;
