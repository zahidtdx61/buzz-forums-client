import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useAnnouncement = () => {
  const axios = useAxiosCommon();

  const { data: allAnnouncement, isLoading: announcementLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const response = await axios.get("/user/announcements");
      console.log(response?.data?.data);
      return response?.data?.data;
    },
  });

  return { allAnnouncement, announcementLoading };
};

export default useAnnouncement;
