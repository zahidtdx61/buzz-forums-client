import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadContent from "../../components/Loader/LoadContent";
import AdminPieChart from "./AdminPieChat";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { data: siteData, isLoading:statsLoading } = useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/all-users-data");
      return response.data.data;
    },
  });

  if(statsLoading) return <LoadContent />;

  return (
    <div className="w-[95%] lg:max-w-screen-lg mx-auto mb-4">
      <div className="mt-8">
        <div className="text-xl font-mulish">Site Statistics:</div>
        <div className="">
          <div className="text-base text-slate-600 font-semibold">
            Total Users:{" "}
            <span className="font-normal">
              {siteData?.userCount || "Loading..."}
            </span>
          </div>
          <div className="text-base text-slate-600 font-semibold">
            Total Posts:{" "}
            <span className="font-normal">
              {siteData?.postCount || "Loading..."}
            </span>
          </div>
          <div className="text-base text-slate-600 font-semibold">
            Total Comments:{" "}
            <span className="font-normal">
              {siteData?.commentCount || "Loading..."}
            </span>
          </div>
        </div>
      </div>

      <AdminPieChart  siteData={siteData} />
    </div>
  );
};

export default AdminProfile;
