import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const response = await axiosSecure("/user/role");
      return response.data.data;
    },
  });

  return {isRoleLoading: isLoading, role};
};

export default useRole;
