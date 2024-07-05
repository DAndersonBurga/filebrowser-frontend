import { Box, Modal } from "@mui/material";
import useGlobalContext from "../../hooks/useGlobalContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const CustomModal = ({ modalIsOpen, closeModal, children }) => {

    return (
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          mx={style}
        >
            {children}
        </Box>
      </Modal>
    )
}

export default CustomModal