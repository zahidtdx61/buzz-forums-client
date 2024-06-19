import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner4 } from "react-icons/im";
import LoadContent from "../../components/Loader/LoadContent";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AdminPieChart from "./AdminPieChat";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormData = async (data) => {
    // console.log(data);
    try {
      setIsLoading(true);
      await axiosSecure.post("/admin/add-tag", data);
      // console.log(response.data);
      toast.success("Tag added successfully!!!");
      setIsLoading(false);
      reset();
    } catch (error) {
      toast.error("Something went wrong during adding Tag!!!");
      setIsLoading(false);
      console.log(error);
    }
  };

  const { data: siteData, isLoading: statsLoading } = useQuery({
    queryKey: ["site-stats"],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/all-users-data");
      return response.data.data;
    },
  });

  if (statsLoading) return <LoadContent />;

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

      <AdminPieChart siteData={siteData} />

      <div className="my-12 font-mulish">
        <h1 className="text-slate-700 text-xl font-semibold">
          Add Tags for Posts
        </h1>
        <p className="text-slate-600 text-base">
          Add tags to posts to make them more searchable.
        </p>

        <form
          className="space-y-5 mb-8 mt-2 mx-auto text-sm"
          onSubmit={handleSubmit(handleFormData)}
        >
          <div>
            <label className="font-medium">Add a Tag Title</label>
            <input
              type="text"
              required
              {...register("value")}
              placeholder={"Add your tag title"}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            />
          </div>

          <div>
            <label className="font-medium">
              Add a short name or Short description for the tag
            </label>
            <input
              type="text"
              required
              {...register("label")}
              placeholder="Add your tag description"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed"
            >
              {isLoading ? <ImSpinner4 className="animate-spin" /> : "Add Tag"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
