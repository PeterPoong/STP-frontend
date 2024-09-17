import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrashAlt } from 'react-icons/fa';

const PhotoUpload = ({ onFileChange, file }) => {
  const [showPreview, setShowPreview] = useState(false);

  const onDrop = (acceptedFiles) => {
    onFileChange(acceptedFiles[0]);
  };

  const handleRemove = () => {
    onFileChange(null);
  };

  const handleShowPreview = () => setShowPreview(true);
  const handleClosePreview = () => setShowPreview(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop
  });

  return (
    <Container>
      <Row>
        <Col md={12} className="mb-3">
          <div
            {...getRootProps()}
            className="border border-primary rounded p-4 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Drag & drop a photo here, or click to select one</p>
          </div>
        </Col>
      </Row>
      {file && (
        <Row className="mb-3">
          <Col md={12}>
            <div className="d-flex align-items-center">
              <span className="me-3">{file.name}</span>
              <Button
                variant="danger"
                onClick={handleRemove}
                className="me-3"
              >
                <FaTrashAlt />
              </Button>
              <Button variant="primary" onClick={handleShowPreview}>
                Click here to preview
              </Button>
            </div>
          </Col>
        </Row>
      )}
      <Modal show={showPreview} onHide={handleClosePreview}>
        <Modal.Header closeButton>
          <Modal.Title>Photo Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="img-fluid"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePreview}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PhotoUpload;
