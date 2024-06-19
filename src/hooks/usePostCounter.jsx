import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePostCounter = () => {
  const axiosSecure = useAxiosSecure();
  const { user, isLoading: userLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["my-posts", user?.uid, user],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/user/post-count?sorted=createdAt`
      );
      const data = response.data;
      console.log(data);
      return data.data;
    },
  });

  return { posts: data, isLoading: isLoading || userLoading };
};

export default usePostCounter;
