import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import PropTypes from "prop-types";

const SeeCommentModal = ({ open, setOpen, comment }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog color="primary" layout="center">
        <ModalClose />
        <Typography>Commented By - {comment?.userId?.name}</Typography>
        <div className="p-8 bg-zinc-200 rounded-md">
          <Typography>{comment.comment}</Typography>
        </div>
        <Typography>
          Commented At - {new Date(comment.createdAt).toLocaleString()}
        </Typography>
      </ModalDialog>
    </Modal>
  );
};

SeeCommentModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  comment: PropTypes.object,
};

export default SeeCommentModal;
