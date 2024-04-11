import { Modal } from "react-bootstrap";

function MessageModal({title, message, show, onCloseCallback}) {
    return (
        <Modal show={show} onHide={onCloseCallback} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Dialog>{message}</Modal.Dialog>
            </Modal.Body>
        </Modal>
    );
}

export default MessageModal;