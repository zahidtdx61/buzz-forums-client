import { Tooltip } from "@mui/joy";
import { Avatar } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddCommentModal from "../../components/AddCommentModal/AddCommentModal";
import Loader from "../../components/Loader/Loader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostShareModal from "./PostShareModal";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [openComment, setOpenComment] = useState(false);
  const { user, isLoading: userLoading } = useAuth();
  const [voteLoading, setVoteLoading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/get-post/${postId}`);
      return response.data.data;
    },
  });

  if (postLoading || userLoading)
    return (
      <>
        <Helmet>
          <title>Buzz Forums | Post Details</title>
        </Helmet>
        <Loader />
      </>
    );

  const handleModal = () => {
    if (!user) {
      navigate("/join-us", { state: location.pathname, replace: true });
    } else {
      setOpenComment(true);
    }
  };

  const handleVote = async (vote) => {
    try {
      setVoteLoading(true);
      await axiosSecure.post(`/user/vote/${postId}`, { vote });
      // console.log(response.data);
      setVoteLoading(false);
      toast.success(`Post ${vote} voted successfully`);
    } catch (error) {
      console.log(error.message);
      setVoteLoading(false);
      toast.error("Something went wrong");
    } finally {
      setVoteLoading(false);
    }
  };

  // console.log(post);

  const shareLink = `https://buzz-forums.vercel.app/post/${postId}`;

  return (
    <div className="w-[95%] max-w-screen-xl mx-auto my-8 min-h-svh">
      <Helmet>
        <title>Buzz Forums | Post Details</title>
      </Helmet>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <Avatar src={post?.userId?.image} />
          <p className="font-semibold text-slate-600">
            Author : <span className="font-normal">{post?.userId?.name}</span>{" "}
          </p>
        </div>

        <div>
          <p className="font-semibold text-slate-600">
            Posted At:{" "}
            <span className="font-normal">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* post image */}
      <div className="h-[400px] mt-8 rounded">
        <img
          src={post.image}
          alt="post"
          className="object-cover w-full h-full"
        />
      </div>

      {/* post title, tag and desc */}
      <div className="mt-8 flex flex-col">
        <h1 className="text-3xl font-semibold text-slate-800">{post.title}</h1>
        <span className="px-2 py-1 text-blue-800 rounded bg-blue-200 mt-2 w-fit">
          #{post.tag}
        </span>
        <p className="text-lg text-slate-600 mt-4">{post.description}</p>
      </div>

      {/* share, comment, upVote, downVote */}
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setShareModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-8"
          >
            Share
          </button>
          <button
            onClick={handleModal}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-8 ml-4"
          >
            Add your Comment
          </button>
        </div>

        <div className="flex items-center">
          <Tooltip title="Upvote">
            <button
              disabled={voteLoading}
              onClick={() => handleVote("up")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-8 disabled:cursor-not-allowed"
            >
              <BiUpvote />
            </button>
          </Tooltip>

          <Tooltip title="Downvote">
            <button
              disabled={voteLoading}
              onClick={() => handleVote("down")}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-8 ml-4 disabled:cursor-not-allowed"
            >
              <BiDownvote />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* add comment modal */}
      <AddCommentModal
        open={openComment}
        setOpen={setOpenComment}
        postId={postId}
      />

      {/* share modal */}
      <PostShareModal
        open={shareModalOpen}
        setOpen={setShareModalOpen}
        shareUrl={shareLink}
      />
    </div>
  );
};

export default PostDetails;
