import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/get-posts");
      const data = response.data;
      return data.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching posts</div>;
  }

  if (data.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div>
      {data.map((post) => (
        <div key={post.id} className="border p-4 my-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
