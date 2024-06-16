import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LoadContent from "../../components/Loader/LoadContent";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePostCounter from "../../hooks/usePostCounter";

const MyProfile = () => {
  const { user, isLoading: userLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["my-profile", "user?.uid", "user"],
    queryFn: async () => {
      if (!user) return null;
      const response = await axiosSecure.get(`/user/find/${user?.uid}`);
      // console.log(response.data);
      return response?.data?.data;
    },
  });

  const { posts, isLoading: postLoading } = usePostCounter();

  if (isLoading || userLoading || postLoading) return <LoadContent />;

  const { displayName, email, photoURL } = user || {};
  const { badge } = userData || {};

  console.log(posts);

  const goldBadge = "https://i.ibb.co/m5nn4xs/golden.png";
  const bronzeBadge = "https://i.ibb.co/yVJ7jpX/bronze.png";

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
            <div className="mt-4 flex gap-3 items-center">
              <p>Badge: </p>
              <div className="flex items-center">
                <Avatar src={badge === "bronze" ? bronzeBadge : goldBadge} />
                <span className="text-zinc-500 capitalize">({badge})</span>
              </div>
            </div>
          </div>
        </div>

        {posts && (
          <div className="mt-8 mb-4">
            <div className="text-2xl font-mulish">Your Recent Posts</div>
            <div className="mt-4">
              {posts.slice(0, Math.min(3, posts.length)).map((post) => (
                <div
                  onClick={() => navigate(`/post/${post?._id}`)}
                  key={post._id}
                  className="bg-zinc-100 p-4 rounded-md my-2 hover:cursor-pointer"
                >
                  <div className="font-semibold text-lg">{post.title}</div>
                  <div className="text-zinc-600 mt-2 text-base">{post.description}</div>
                  <div className="text-zinc-600 mt-2 text-sm flex flex-col">
                    <div>Comments: {post.comments.length}</div>
                    <div>Tag: {post.tag || "Uncategorized"}</div>
                    <div className="flex gap-2 items-center">
                      <span>Votes: </span>
                      <div className="flex items-center gap-1">
                        <span>{post.upVotes}</span>
                        <FaArrowUp />
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{post.downVotes}</span>
                        <FaArrowDown />
                      </div>
                    </div>
                    <div>
                      Posted: {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
