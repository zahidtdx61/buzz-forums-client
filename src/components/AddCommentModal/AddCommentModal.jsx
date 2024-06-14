import { Comment } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddCommentModal = ({ open, setOpen, postId, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [comment, setComment] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axiosSecure.post(`/user/add-comment/${id}`, {
        comment,
      });
      return response.data.success;
    },
    onSuccess: () => {
      refetch();
      setOpen(false);
      setComment("");
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      console.log(error);
      setOpen(false);
      toast.error("Error adding comment");
    },
  });

  const deleteFood = async (id) => {
    if (comment.length === 0 || !comment) {
      toast.error("Please add a comment");
      return;
    }
    await mutateAsync({ id });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <Comment />
          Make a Comment
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div>
            <label className="font-medium">Write your comment here</label>
            <textarea
              required
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your post description"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="primary"
            onClick={() => deleteFood(postId)}
          >
            Comment
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

AddCommentModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
  postId: PropTypes.string,
};

export default AddCommentModal;
