import { useQuery } from "@tanstack/react-query";
import LoadContent from "../../components/Loader/LoadContent";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: comments, isLoading } = useQuery({
    queryKey: ["reported-comments"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/reported-comments");
      const data = response.data;
      // console.log(data);
      return data.data;
    },
  });

  if (isLoading) return <LoadContent />;

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
                    <td><button className="text-white bg-red-600 px-5 py-1 rounded-md">Delete</button></td>
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
