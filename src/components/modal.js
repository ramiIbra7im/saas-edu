// components/DeleteStudentModal.jsx
import Modal from "react-modal";
import styles from "./DeleteStudentModal.module.css"; // هنستخدم CSS Module مخصص

Modal.setAppElement("body");

export default function DeleteStudentModal({
    showModal,
    setShowModal,
    studentToDelete,
    handleDelete,
}) {
    return (
        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            className={styles.modal}
            overlayClassName={styles.overlay}
            contentLabel="تأكيد الحذف"
        >
            <div className="modal-content p-4">
                <div className="modal-header border-0">
                    <h5 className="modal-title">تأكيد الحذف</h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowModal(false)}
                    ></button>
                </div>

                <div className="modal-body">
                    <p>
                        هل أنت متأكد أنك تريد حذف الطالب{" "}
                        <strong>{studentToDelete?.name}</strong>؟
                    </p>
                </div>

                <div className="modal-footer border-0">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        إلغاء
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        نعم، حذف
                    </button>
                </div>
            </div>
        </Modal>
    );
}
