import React from 'react';
import { Modal } from 'react-bootstrap';

const ErrorModal = ({ errorModalVisible, setErrorModalVisible, generalError, fieldErrors, fieldLabels }) => (
    <>
        {errorModalVisible && (
            <Modal show onHide={() => setErrorModalVisible(false)} centered>
                <Modal.Header closeButton>
                    <h3>Error</h3>
                </Modal.Header>
                <Modal.Body>
                    {generalError && <p>{generalError}</p>}
                    {Object.keys(fieldErrors).length > 0 && (
                        <ul>
                            {Object.entries(fieldErrors).map(([field, errors]) => (
                                <li key={field}>
                                    <strong>{fieldLabels[field] || field}:</strong> {errors.join(', ')}
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => setErrorModalVisible(false)}>Close</button>
                </Modal.Footer>
            </Modal>
        )}
    </>
);

export default ErrorModal;
