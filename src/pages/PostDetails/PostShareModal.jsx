import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import PropTypes from "prop-types";
import { FaRegShareFromSquare } from "react-icons/fa6";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const PostShareModal = ({ open, setOpen, shareUrl }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <div className="flex gap-2 items-center">
            <FaRegShareFromSquare />
            Share
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <p>Share this post with the following link:</p>
          <div className="mt-2 flex gap-1">
            <EmailShareButton url={shareUrl}>
              <EmailIcon size={32} round />
            </EmailShareButton>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Done
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

PostShareModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  shareUrl: PropTypes.string,
};

export default PostShareModal;
