import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import AddCommentModal from "../../components/AddCommentModal/AddCommentModal";
import DeletePostModal from "../../components/DeletePostModal/DeletePostModal";
import LoadContent from "../../components/Loader/LoadContent";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const [openDelete, setOpenDelete] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [postId, setPostId] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/get-posts");
      const data = response.data;
      // console.log(data.data);
      return data.data;
    },
  });

  if (isLoading) {
    return <LoadContent />;
  }

  if (isError) {
    return <div>Error fetching posts</div>;
  }

  if (data.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="w-[95%] mx-auto overflow-x-auto font-mulish my-8">
      <table className="w-full text-center">
        <thead>
          <tr className="border-b-2">
            <th className="px-4 py-2">Post Title</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Number of Votes</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        {data.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={6} className="text-center text-xl font-bold">
                No Post Found
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((post) => (
              <tr key={post._id} className="border-b">
                <td className="px-4 py-2">{post.title}</td>
                
                <td className="px-4 py-2 flex justify-center items-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-20 object-cover object-center"
                  />
                </td>

                <td className="px-4 py-2">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="flex items-center gap-1">
                      <span>{post.upVotes}</span>
                      <FaArrowUp />
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{post.downVotes}</span>
                      <FaArrowDown />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setPostId(post._id);
                      setOpenComment(true);
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md w-fit mx-auto"
                  >
                    Comment{" "}
                    <span className="text-blue-200">
                      ({post.comments.length})
                    </span>
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      setPostId(post._id);
                      setOpenDelete(true);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded-md w-fit mx-auto"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {/* delete modal */}
      <DeletePostModal
        open={openDelete}
        setOpen={setOpenDelete}
        postId={postId}
        refetch={refetch}
      />

      {/* add comment modal */}
      <AddCommentModal
        open={openComment}
        setOpen={setOpenComment}
        postId={postId}
        refetch={refetch}
      />
    </div>
  );
};

export default MyPosts;
