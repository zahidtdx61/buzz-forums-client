import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const AddPost = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const { photoURL, displayName, email } = user || {};

  return (
    <div className="max-w-screen-lg mt-12 mx-auto">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        <div className="animate__animated animate__fadeInDown text-2xl text-center font-mulish">
          Welcome, <span className="font-lexend">{displayName || "User"}</span>
        </div>
        <h1 className="text-2xl">Add a new Post</h1>
        <div className="size-30 rounded-full overflow-hidden mt-5">
          <img
            src={photoURL || ""}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
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

      <form className="space-y-5 mb-8">
        <div>
          <label className="font-medium">Post Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder={"Add your post title"}
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Post Description</label>
          <textarea
            {...register("description")}
            placeholder="Add your post description"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="image" className="font-medium">
            Select an Image for your Post:
          </label>
          <input
            required
            type="file"
            {...register("image")}
            accept="image/*"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="image" className="font-medium">
            Select a Tag for your Post:
          </label>
          <Select
            defaultValue={selectedOption}
            onChange={({ value }) => setSelectedOption(value)}
            options={options}
          />
        </div>

        <div>
          <label className="font-medium">Up Vote</label>
          <input
            type="number"
            {...register("upVote")}
            placeholder="Add the number of up votes"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <label className="font-medium">Down Vote</label>
          <input
            type="number"
            {...register("downVote")}
            placeholder="Add the number of down votes"
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
