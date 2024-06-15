import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LoadContent from "../../components/Loader/LoadContent";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePostCounter from "../../hooks/usePostCounter";

const MyProfile = () => {
  const { user, isLoading: userLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["my-profile", "user?.uid", "user"],
    queryFn: async () => {
      if (!user) return null;
      const response = await axiosSecure.get(`/user/find/${user?.uid}`);
      console.log(response.data);
      return response.data;
    },
  });

  const { posts, isLoading: postLoading } = usePostCounter();

  if (isLoading || userLoading || postLoading) return <LoadContent />;

  const { displayName, email, photoURL } = user || {};
  console.log(posts?.length);

  return (
    <div className="min-h-[calc(100vh-80px)] w-full mt-12 p-2">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        <div className="text-2xl text-center font-mulish">
          Welcome, <span className="font-lexend">{displayName || "User"}</span>
        </div>
        <div className="size-40 rounded-full overflow-hidden mt-10">
          <img
            src={photoURL}
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
          <div className="mt-16 flex gap-3 items-center">
            <p>Wish to update your profile, </p>
            <Link
              to="/update-profile"
              className="px-4 py-1 bg-blue-600 rounded text-zinc-50 hover:scale-105 hover:bg-opacity-75 transition-all duration-300 ease-in-out"
            >
              {" "}
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
