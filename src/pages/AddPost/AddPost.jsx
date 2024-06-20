import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadContent from "../../components/Loader/LoadContent";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePostCounter from "../../hooks/usePostCounter";
import useRole from "../../hooks/useRole";
import { imageUpload } from "../../utils";

// const options = [
//   { value: "TechNews", label: "Tech News" },
//   { value: "Gadgets", label: "Gadgets" },
//   { value: "Programming", label: "Programming" },
//   { value: "Software", label: "Software" },
//   { value: "Hardware", label: "Hardware" },
//   { value: "Startups", label: "Startups" },
//   { value: "CyberSecurity", label: "Cyber Security" },
//   { value: "AI", label: "Artificial Intelligence" },
//   { value: "Gaming", label: "Gaming" },
//   { value: "ArtsAndCrafts", label: "Arts and Crafts" },
//   { value: "DIY", label: "DIY" },
//   { value: "Photography", label: "Photography" },
//   { value: "Cooking", label: "Cooking" },
//   { value: "Gardening", label: "Gardening" },
//   { value: "Fitness", label: "Fitness" },
//   { value: "Travel", label: "Travel" },
//   { value: "Books", label: "Books" },
//   { value: "Movies", label: "Movies" },
//   { value: "Music", label: "Music" },
//   { value: "CareerAdvice", label: "Career Advice" },
//   { value: "JobSearch", label: "Job Search" },
//   { value: "Networking", label: "Networking" },
//   { value: "Entrepreneurship", label: "Entrepreneurship" },
//   { value: "IndustryTrends", label: "Industry Trends" },
//   { value: "Leadership", label: "Leadership" },
//   { value: "SkillsDevelopment", label: "Skills Development" },
//   { value: "WorkLifeBalance", label: "Work-Life Balance" },
//   { value: "StudyTips", label: "Study Tips" },
//   { value: "HomeworkHelp", label: "Homework Help" },
//   { value: "Exams", label: "Exams" },
//   { value: "Research", label: "Research" },
//   { value: "Scholarships", label: "Scholarships" },
//   { value: "StudentLife", label: "Student Life" },
//   { value: "Courses", label: "Courses" },
//   { value: "Tutoring", label: "Tutoring" },
// ];

const AddPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tagError, setTagError] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const { photoURL, displayName, email } = user || {};
  const { posts, isLoading: postLoading } = usePostCounter();
  const { role, isRoleLoading } = useRole();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: options, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axiosSecure.get("/user/tags");
      const data = response.data;
      return data.data;
    },
  });

  const handleFormData = async (data) => {
    setTagError(false);
    // console.log(data);
    if (selectedOption === null) {
      setTagError(true);
      return;
    }
    try {
      setIsLoading(true);
      const image = await imageUpload(data.imageFile[0]);
      await axiosSecure.post("/user/add-post", {
        ...data,
        image,
        tag: selectedOption,
      });
      navigate("/dashboard/my-posts");
      setIsLoading(false);
      toast.success("Post added successfully");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error?.response?.data?.error?.code === 313) {
        toast.error("Unavailable image format!!! Please upload another image");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || postLoading || isRoleLoading || tagsLoading)
    return (
      <>
        <Helmet>
          <title>Buzz Forums | Add Post</title>
        </Helmet>
        <LoadContent />
      </>
    );

  if (role?.badge === "bronze" && posts?.length >= 5) {
    toast.error(
      "You have reached the maximum limit of posts for your badge. Please upgrade your badge to 'Gold' to add more posts"
    );
  }

  return (
    <div className="max-w-screen-lg mt-12 mx-auto">
      <Helmet>
        <title>Buzz Forums | Add Post</title>
      </Helmet>

      <div className="w-[95%] max-w-screen-lg mx-auto flex flex-col items-center">
        <div className="animate__animated animate__fadeInDown text-2xl text-center font-mulish">
          Welcome, <span className="font-lexend">{displayName || "User"}</span>
        </div>
        <h1 className="text-2xl">Add a new Post</h1>
        <div className="h-[70px] w-[70px] rounded-full overflow-hidden mt-5">
          <img
            src={photoURL || ""}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {role?.badge === "bronze" && posts?.length >= 5 && (
          <div className="mt-10 max-w-screen-lg mx-auto flex flex-col justify-center">
            <p className="text-xl text-red-500 text-center">
              You have reached to maximum post capacity as Bronze user of 5
              posts. If you want to post more feel free buy our Gold Membership{" "}
            </p>
            <button className="mt-8 px-5 py-1 rounded-md bg-red-600 text-white w-fit block mx-auto">
              <Link to="/membership">Be a Gold Member</Link>
            </button>
          </div>
        )}

        <div className="p-4">
          <div className="mt-8 text-base font-mulish ">
            <div className="text-zinc-600">
              <span className="font-semibold">Email: </span>{" "}
              {email || "Not available"}
            </div>
            <div className="text-zinc-600">
              <span className="font-semibold">Name: </span>{" "}
              {displayName || "Not available"}
            </div>
          </div>
        </div>
      </div>

      <form
        className="space-y-5 mb-8 mx-auto"
        onSubmit={handleSubmit(handleFormData)}
      >
        <div className="flex flex-col mx-4">
          <label className="font-medium">Post Title</label>
          <input
            type="text"
            required
            {...register("title")}
            placeholder={"Add your post title"}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="flex flex-col mx-4">
          <label className="font-medium">Post Description</label>
          <textarea
            required
            {...register("description")}
            placeholder="Add your post description"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="flex flex-col mx-4">
          <label htmlFor="image" className="font-medium">
            Select an Image for your Post:
          </label>
          <input
            required
            type="file"
            {...register("imageFile")}
            accept="image/*"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="flex flex-col mx-4">
          <label htmlFor="image" className="font-medium">
            Select a Tag for your Post:
          </label>
          <Select
            required
            defaultValue={selectedOption}
            onChange={({ value }) => setSelectedOption(value)}
            options={options}
          />
          {tagError && <p className="text-red-500">Please select a tag</p>}
        </div>

        <div className="flex flex-col mx-4">
          <label className="font-medium">Up Vote</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            {...register("upVotes")}
            placeholder="Add the number of up votes"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="flex flex-col mx-4">
          <label className="font-medium">Down Vote</label>
          <input
            type="number"
            min={0}
            defaultValue={0}
            {...register("downVotes")}
            placeholder="Add the number of down votes"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div className="mx-4">
          <button
            disabled={role?.badge === "bronze" && posts?.length >= 5}
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

export default AddPost;
