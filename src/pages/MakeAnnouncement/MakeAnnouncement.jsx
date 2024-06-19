import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import LoadContent from "../../components/Loader/LoadContent";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();
  const { user, isLoading: userLoading } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const handleFormData = async (data) => {
    console.log(data);
    try {
      const response = await axiosSecure.post("/admin/add-announcement", data);
      console.log(response.data);
      toast.success("Announcement posted successfully!!!");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during posting Announcement!!!");
    }
  };

  if (userLoading) return <LoadContent />;

  const { displayName, photoURL } = user || {};

  return (
    <div className="min-h-[calc(100vh-80px)] mx-auto w-full mt-12 p-2">
      <Helmet>
        <title>Buzz Forums | Make Announcement</title>
      </Helmet>

      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        <div className="size-40 rounded-full overflow-hidden mt-4">
          <img
            src={photoURL}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-4 text-base font-mulish">
          <div className="text-zinc-600">
            <span className="font-semibold">Author Name: </span>{" "}
            {displayName || "Not available"}
          </div>
        </div>
      </div>

      <form className="space-y-5 mb-8 mx-auto" onSubmit={handleSubmit(handleFormData)}>
        <div>
          <label className="font-medium">Announcement Title</label>
          <input
            type="text"
            required
            {...register("title")}
            placeholder={"Add your post title"}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Announcement Description</label>
          <textarea
            required
            {...register("description")}
            placeholder="Add your post description"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-gray-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
