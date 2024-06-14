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
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DeletePostModal = ({ open, setOpen, postId, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axiosSecure.delete(`/user/delete-post/${id}`);
      return response.data.success;
    },
    onSuccess: () => {
      refetch();
      setOpen(false);
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      console.log(error);
      setOpen(false);
      toast.error("Error deleting post");
    },
  });

  const deleteFood = async (id) => {
    console.log(id);
    await mutateAsync({ id });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <IoWarningOutline />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          Are you sure you want to delete this food?
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            onClick={() => deleteFood(postId)}
          >
            Delete
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

DeletePostModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  refetch: PropTypes.func,
  postId: PropTypes.string,
};

export default DeletePostModal;
