import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePostCounter = () => {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/get-posts");
      const data = response.data;
      return data.data;
    },
  });

  return data || [];
};

export default usePostCounter;