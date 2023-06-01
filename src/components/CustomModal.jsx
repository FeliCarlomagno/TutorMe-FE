import { Button, Modal } from "react-bootstrap";
import LogIn from "./LogIn";

const CustomModal = (props) => {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <LogIn />
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
