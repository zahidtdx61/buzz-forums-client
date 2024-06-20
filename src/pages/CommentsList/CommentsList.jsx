import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CommentContent from "../../components/CommentContent/CommentContent";
import LoadContent from "../../components/Loader/LoadContent";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CommentsList = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log(postId);

  const { data, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/comments/${postId}`);
      const data = response.data;
      return data.data;
    },
  });

  if (isLoading)
    return (
      <>
        <Helmet>
          <title>Buzz Forums | Comments List</title>
        </Helmet>
        <LoadContent />
      </>
    );
  console.log(data);

  return (
    <div className="w-[95%] mx-auto">
      <Helmet>
        <title>Buzz Forums | Comments List</title>
      </Helmet>

      <h1 className="text-2xl font-bold text-center mt-8">
        All Comments on this Post.
      </h1>

      <p className="font-semibold text-slate-700 text-lg text-center my-4">
        <span className="font-bold">Your Post Title: </span> {data?.title}
      </p>

      <p className="text-xl text-center font-semibold text-slate-400 mt-4">
        {data?.comments?.length === 0 ? "No Comments Found" : ""}
      </p>

      {data?.comments?.length !== 0 && (
        <div className="mx-auto overflow-auto lg:overflow-visible">
          <table className="w-full text-center mt-8">
            <thead>
              <tr className="border-b-2">
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2">Commented At</th>
                <th className="px-4 py-2">Commenter Email</th>
                <th className="px-4 py-2">Feedback</th>
                <th className="px-4 py-2">Report</th>
              </tr>
            </thead>
            <tbody>
              {data?.comments?.length !== 0 &&
                data?.comments?.map((comment) => (
                  <CommentContent key={comment._id} comment={comment} />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommentsList;
