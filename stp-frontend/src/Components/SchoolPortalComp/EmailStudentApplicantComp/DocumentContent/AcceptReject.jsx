import styles from "../../../../css/SchoolPortalStyle/EmailApplicantDetail/EmailApplicantDetail.module.css";
import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Modal } from "react-bootstrap"; // Ensure Modal is imported
import { useParams, useNavigate } from "react-router-dom";

const AcceptRejectTab = ({ applicantId }) => {
  const token = localStorage.getItem("token");

  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("no feedback");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [applicantStatus, setApplicantStatus] = useState(null);
  const [applicantCurrentStatus, setApplicantCurrentStatus] = useState(null);
  const navigate = useNavigate();
  const [completeUpdate, setCompleteUpdate] = useState("");
  const [showValidateCompletionModal, setShowValidateCompletionModal] =
    useState(false);

  const updateApplicant = async () => {
    try {
      const formData = {
        id: applicantId,
        type: actionType,
        feedback: feedback,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/editApplicantStatus`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch co-curriculum activities");
      }
    } catch (error) {
      console.error("Error fetching co-curriculum activities:", error);
      setError(error.message);
    }
  };

  const getApplicantDetail = async () => {
    try {
      const formData = { applicantId: applicantId };
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/applicantDetail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Data:", errorData["error"]);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApplicantStatus(data.form_status);
    } catch (error) {
      console.error("Failed To get Applicant Detail", error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    setActionType(selectedOption === "accept" ? "Accepted" : "Rejected");
    setShowConfirmModal(true);
  };

  const handleConfirmAction = () => {
    updateApplicant();
    setShowConfirmModal(false);
    setCompleteUpdate(true);
  };

  const handleBack = () => {
    navigate("/schoolPortalDashboard"); // This will go back to the previous page
  };

  // useEffect(() => {
  //   console.log("selectedOption", selectedOption);
  // }, [selectedOption]);

  useEffect(() => {
    getApplicantDetail();
  }, []);

  useEffect(() => {
    if (applicantStatus) {
      if (applicantStatus != 2) {
        setShowValidateCompletionModal(true);
      }
    }
  }, [applicantStatus]);

  return (
    <>
      {/* already accept/reject  */}
      <Modal
        show={showValidateCompletionModal}
        // onHide={() => setShowValidateCompletionModal(false)}
      >
        <Modal.Header>
          <Modal.Title>
            Application {actionType === "Accepted" ? "Accepted" : "Rejected"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The application has been{" "}
          {applicantStatus === 4 ? "Accepted" : "Rejected"} !
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleBack}
            className={`${styles.cancelBtn}`}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={`${styles.acceptRejectContentContainer}`}>
        <div className="accept-reject-application">
          <p className="px-4 mb-3 ms-4">Actions</p>
          <div className={`${styles.acceptRejectSection}`}>
            {/* Accept Radio Button */}
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="success-outlined"
              value="accept"
              autoComplete="off"
              checked={selectedOption === "accept"}
              onChange={handleOptionChange}
            />
            <label
              className={`btn btn-outline-success ms-2 ${styles.acceptBtn}`}
              htmlFor="success-outlined"
            >
              Accept
            </label>

            {/* Reject Radio Button */}
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="danger-outlined"
              value="reject"
              autoComplete="off"
              checked={selectedOption === "reject"}
              onChange={handleOptionChange}
            />
            <label
              className={`btn btn-outline-danger ms-5 ${styles.rejectBtn}`}
              htmlFor="danger-outlined"
            >
              Reject
            </label>
          </div>
        </div>
      </div>
      <div className={`${styles.acceptRejectContentContainer}`}>
        <div className="mb-4 px-5 mt-4">
          <p className="fw-normal">Feedback to Student:</p>
          <textarea
            id="feedback"
            className="applicant-form-control"
            rows="4"
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback here..."
          ></textarea>
        </div>
         {/* Conditionally render the submit button only if an option is selected */}
      {selectedOption && (
        <div className="d-flex justify-content-end mt-4 px-5 " >
          <button className={`${styles.submitButton}`} style={{margin:0}} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}

      </div>

     
      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === "Accepted" ? "Accept" : "Reject"} Application
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          {actionType === "Accepted" ? "accept" : "reject"} this application?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
            className={`${styles.cancelBtn}`}
          >
            Cancel
          </Button>
          <Button
            variant={actionType === "Accepted" ? "success" : "danger"}
            className={
              actionType === "Accepted"
                ? styles.confirmAcceptBtn
                : styles.confirmRejectBtn
            }
            onClick={handleConfirmAction}
          >
            Confirm {actionType === "Accepted" ? "Accept" : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* complete modal  */}
      <Modal show={completeUpdate} onHide={() => setCompleteUpdate(false)}>
        <Modal.Header>
          <Modal.Title>
            Application {actionType === "Accepted" ? "Accepted" : "Rejected"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The application has been{" "}
          {actionType === "Accepted" ? "accepted" : "rejected"} successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleBack}
            className={`${styles.cancelBtn}`}
          >
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AcceptRejectTab;
