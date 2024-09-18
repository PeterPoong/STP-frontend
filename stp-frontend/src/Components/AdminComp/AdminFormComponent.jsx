import React, { useState } from "react";
import { Form, Row, Col, Button, Image, Modal } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Editor } from '@tinymce/tinymce-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useDropzone } from "react-dropzone";
import { FaTrashAlt, FaUpload, FaFileImage, FaEye, FaEyeSlash} from 'react-icons/fa';

const AdminFormComponent = ({
  formTitle,
  formFields,
  formTextarea,
  formPassword,
  formCheckboxes,
  formPersonInCharge,
  formCategory,
  formAccount,
  formCountry,
  formStudentCountry,
  formWebsite,
  formAddress,
  checkboxTitle,
  checkboxDetail,
  formPeriod,
  formUrl,
  formHTML,
  formRadio,
  formName,
  formPrice,
  formPackage,
  onSubmit,
  error,
  buttons,
  handlePhoneChange,
  personPhone,
  phone,
  country_code,
  onChange,
  value,
  banner_file,
  logo,
  handleLogoChange,
  handleBannerFileChange,
  startDate,
  endDate,
  onDateChange,
  showUploadFeature,
  handleDateChange,
  coverUploadProps,
  coverInputProps,
  albumUploadProps,
  albumInputProps

}) => {
  const [formData, setFormData] = useState({});
  
  const handleFieldChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value
    }));
  };
  
   // Add useState hooks for managing selected dates
   const [selectedStartDate, setSelectedStartDate] = useState(null);
   const [selectedEndDate, setSelectedEndDate] = useState(null);
 
  //  const handleDateChange = (date, type) => {
  //    if (!date) return;
 
  //    const formattedDate = formatDateTimeLocal(date);
 
  //    if (type === 'start') {
  //      setSelectedStartDate(date);
  //      // You can update the formData with the new banner start date here
  //    } else if (type === 'end') {
  //      setSelectedEndDate(date);
  //      // You can update the formData with the new banner end date here
  //    }
  //  };
 
   const handleDateClick = (date) => {
     const adjustedDate = new Date(date);
     adjustedDate.setHours(0, 0, 0, 0); // Set time to midnight
 
     if (!selectedStartDate) {
       // Set start date if no start date is selected
       setSelectedStartDate(adjustedDate);
       handleDateChange(adjustedDate, 'start');
     } else if (selectedStartDate && !selectedEndDate) {
       // Set end date if start date is selected and end date is not
       setSelectedEndDate(adjustedDate);
       handleDateChange(adjustedDate, 'end');
     } else {
       // Reset both dates if a new start date is selected after end date
       setSelectedStartDate(adjustedDate);
       setSelectedEndDate(null);
       handleDateChange(adjustedDate, 'start');
     }
   };
 
   const formatDateTimeLocal = (date) => {
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     const hours = String(date.getHours()).padStart(2, '0');
     const minutes = String(date.getMinutes()).padStart(2, '0');
     return `${year}-${month}-${day}T${hours}:${minutes}`;
   };
 
const [coverFile, setCoverFile] = useState(null);
const [albumFiles, setAlbumFiles] = useState([]);
const [showPreview, setShowPreview] = useState(false);
const [showCoverPreview, setShowCoverPreview] = useState(false);
const [previewFile, setPreviewFile] = useState(null);
const [file, setFile] = useState(null);
const [errorMessage, setErrorMessage] = useState('');
const handleRemoveCover = () => {
  setCoverFile(null);
};

// Define the acceptable file types and size limit
const acceptedFormats = ['image/jpeg', 'image/png'];
const maxFileSize = 2 * 1024 * 1024; // 2MB

// Handler for cover photo drop
const handleCoverDrop = (acceptedFiles) => {
  const file = acceptedFiles[0];
  
  // Check file format and size
  if (!acceptedFormats.includes(file.type)) {
    setErrorMessage('Invalid file format. Only JPG, JPEG, and PNG are allowed.');
    return;
  }
  
  if (file.size > maxFileSize) {
    setErrorMessage('File size exceeds the limit of 2MB.');
    return;
  }

  // Clear any previous error
  setErrorMessage('');
  
  // Set the cover photo file
  setCoverFile(file);
};

// Handler for album photo drop
const handleAlbumDrop = (acceptedFiles) => {
  const file = acceptedFiles[0];
  
  // Check file format and size
  if (!acceptedFormats.includes(file.type)) {
    setErrorMessage('Invalid file format. Only JPG, JPEG, and PNG are allowed.');
    return;
  }
  
  if (file.size > maxFileSize) {
    setErrorMessage('File size exceeds the limit of 2MB.');
    return;
  }

  // Clear any previous error
  setErrorMessage('');

  // Add the album file
  setAlbumFiles([...albumFiles, file]);
};

const handleRemoveAlbum = (fileToRemove) => {
  setAlbumFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
};
const handleShowPreview = (file) => {
  setPreviewFile(file);
  setShowPreview(true);
};
const handleShowCoverPreview = () => {
  if (coverFile) {
    setPreviewFile(coverFile);
    setShowCoverPreview(true);
  }
};
const handleCloseCoverPreview = () => {
  setShowCoverPreview(false);
};
const handleClosePreview = () => {
  setShowPreview(false);
};
const { getRootProps, getInputProps } = useDropzone({
  accept: 'image/*',
  onDrop: (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }
});
const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
  accept: 'image/*',
  onDrop: (acceptedFiles) => {
    setCoverFile(acceptedFiles[0]);
  },
});
// Dropzone hooks for album photos
const { getRootProps: getAlbumRootProps, getInputProps: getAlbumInputProps } = useDropzone({
  accept: 'image/*',
  onDrop: (acceptedFiles) => {
    setAlbumFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  },
});

  return (
    <Form onSubmit={onSubmit} className="admin-form-component">
      <h3 className="fw-light text-left mt-4 mb-4">{formTitle}</h3>
      {error && <p className="text-danger">{error}</p>}
      <hr />
      <div className="fieldSide">
        <Row className="mb-3">
          <Col md={6}>
            {formFields && formFields.map((field, index) => (
              <Form.Group key={index} controlId={field.id} className="mb-5">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  as={field.as || "input"}
                  type={field.type || "text"}
                  placeholder={field.placeholder || ""}
                  value={field.value}
                  onChange={field.onChange}
                  required={field.required || false}
                />
              </Form.Group>
            ))}

{formPackage && formPackage.map((packages, index) => (
              <Form.Group key={index} controlId={packages.id} className="mb-5">
                <Form.Label>{packages.label}</Form.Label>
                <Form.Control 
                  as="select" 
                  value={packages.value} 
                  onChange={packages.onChange} 
                  required={packages.required || false}
                >
                  <option value="">Package Type</option>
                  {packages.options.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}
            {/* Conditionally render formUrl */}
            {formUrl && formUrl.map((urlField, index) => (
              <Col md={12} key={index}>
                <Form.Group controlId={urlField.id}  className="banner">
                  <Form.Label>{urlField.label}</Form.Label>
                  <Form.Control
                    type={urlField.type || "text"}
                    placeholder={urlField.placeholder || ""}
                    value={urlField.value}
                    onChange={urlField.onChange}
                    required={urlField.required || false}
                  />
                </Form.Group>
              </Col>
            ))}
            {/* Banner File Upload */}
            {handleBannerFileChange && (
              <Col md={12}>
                <Form.Group controlId="banner_file" className="mb-3" >
                  <Form.Label>Banner File (2MB)</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleBannerFileChange} />
                </Form.Group>
                {banner_file && (
                  <div className="mb-3">
                    <Image src={banner_file} alt="bannerFile" fluid />
                  </div>
                )}
              </Col>
            )}

            {/* Contact Number Phone Input */}
            {handlePhoneChange && phone !== undefined && (
              <Form.Group controlId="contact_number" className="mb-5">
                <Form.Label>Contact Number</Form.Label>
                <PhoneInput
                  country="my"
                  value={`${country_code}${phone}`} 
                  onChange={(value, country) => handlePhoneChange(value, country, "contact_number")} 
                  inputProps={{
                    name: 'contact_number',
                    required: true,
                    autoFocus: true
                  }}
                />
              </Form.Group>
            )}
           {formPassword && formPassword.map((password, index) => (
             <Form.Group key={index} controlId={password.id} className="mb-5 position-relative">
                <Form.Label>{password.label}</Form.Label>
                <Form.Control
                    type={password.type}
                    placeholder={password.placeholder}
                    value={password.value}
                    onChange={password.onChange}
                    required={password.required}
                    autoComplete={password.autoComplete}
                />
                <span
                    className="password-toggle"
                    onClick={password.toggleVisibility}
                    role="button"
                >
                    {password.showVisibility ? <FaEyeSlash /> : <FaEye />}
                </span>
            </Form.Group>
            ))}
            {formAccount && formAccount.map((account, index) => (
              <Form.Group key={index} controlId={account.id} className="mb-5">
                <Form.Label>{account.label}</Form.Label>
                <Form.Control 
                  as="select" 
                  value={account.value} 
                  onChange={account.onChange} 
                  required={account.required || false}
                >
                  <option value="">Select School Account Type</option>
                  {account.options.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}

          </Col>
          <Col md={6}>
            {/* Logo Upload */}
            {handleLogoChange && (
              <Form.Group controlId="logo" className="mb-5">
                <Form.Label>Logo (2MB)</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleLogoChange} />
              </Form.Group>
            )}
            {logo && (
              <div className="mb-3">
                <Image src={logo} alt="logo" className="img-fluid-admin" />
              </div>
            )}

            {formPrice && formPrice.map((Price, index) => (
                <Form.Group key={index} controlId={Price.id} className="mb-5">
                  <Form.Label>{Price.label}</Form.Label>
                  <Form.Control
                    as={Price.as || "input"}
                    type={Price.type || "text"}
                    placeholder={Price.placeholder || ""}
                    value={Price.value}
                    onChange={Price.onChange}
                    required={Price.required || false}
                  />
                </Form.Group>
              ))}
   
            {formCategory && formCategory.map((category, index) => (
              <Form.Group key={index} controlId={category.id} className="mb-5">
                <Form.Label>{category.label}</Form.Label>
                <Form.Control 
                  as="select" 
                  value={category.value} 
                  onChange={category.onChange} 
                  required={category.required || false}
                >
                  <option value="">Select Category</option>
                  {category.options.map((option, optIndex) => (
                    <option key={optIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            ))}

{formPeriod && (
        <Col md={12}>
          <Row>
            <Col md={12}>
              <Form.Group controlId="banner_start" className="mb-3">
                <Form.Label>Banner Start</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={selectedStartDate ? formatDateTimeLocal(selectedStartDate).replace(' ', 'T') : ''}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    handleDateChange(newDate, 'start');
                  }}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="banner_end" className="mb-3">
                <Form.Label>Banner End</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={selectedEndDate ? formatDateTimeLocal(selectedEndDate).replace(' ', 'T') : ''}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    handleDateChange(newDate, 'end');
                  }}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <div className="date-picker-container">
                <Calendar
                  selectRange={false}
                  onClickDay={handleDateClick}
                  value={
                    selectedStartDate
                      ? selectedEndDate
                        ? [selectedStartDate, selectedEndDate]
                        : selectedStartDate
                      : null
                  }
                />
              </div>
            </Col>
          </Row>
        </Col>
      )}
            {/* Person In Charge Contact Phone Input */}
            {handlePhoneChange && personPhone !== undefined && (
              <Form.Group controlId="person_in_charge_contact" className="mb-5">
                <Form.Label>Person in Charge's Contact</Form.Label>
                <PhoneInput
                  country="my"
                  value={personPhone} 
                  onChange={(value, country) => handlePhoneChange(value, country, "person_in_charge_contact")} 
                  inputProps={{
                    name: 'person_in_charge_contact',
                    required: true,
                    autoFocus: true
                  }}
                />
              </Form.Group>
            )}
            {formPersonInCharge && formPersonInCharge.map((PersonInCharge, index) => (
              <Form.Group key={index} controlId={PersonInCharge.id} className="mb-5">
                <Form.Label>{PersonInCharge.label}</Form.Label>
                <Form.Control
                  as={PersonInCharge.as || "input"}
                  type={PersonInCharge.type || "text"}
                  placeholder={PersonInCharge.placeholder || ""}
                  value={PersonInCharge.value}
                  onChange={PersonInCharge.onChange}
                  required={PersonInCharge.required || false}
                />
              </Form.Group>
            ))}

       {/* Render radio buttons dynamically */}
       {formRadio && formRadio.map(radio => (
          <Form.Group key={radio.id} controlId={radio.id}>
              <Form.Label>{radio.label}</Form.Label>
              {radio.options.map(option => (
                  <Form.Check
                      key={option.value}
                      type={radio.type}
                      id={`${radio.id}-${option.value}`}
                      label={option.label}
                      value={option.value}
                      checked={radio.value === option.value}
                      onChange={radio.onChange}
                      required={radio.required}
                      className="custom-radio"
                  />
              ))}
          </Form.Group>
      ))}
            {formName && formName.map((Name, index) => (
              <Form.Group key={index} controlId={Name.id} className="mb-5">
                <Form.Label>{Name.label}</Form.Label>
                <Form.Control
                  as={Name.as || "input"}
                  type={Name.type || "text"}
                  placeholder={Name.placeholder || ""}
                  value={Name.value}
                  onChange={Name.onChange}
                  required={Name.required || false}
                />
              </Form.Group>
            ))}
             {formStudentCountry && formStudentCountry.map((field, index) => (
                    <Col md={12} key={index}>
                      <Form.Group controlId={field.id} className="mb-5 ms-2">
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control 
                          as="select" 
                          value={field.value} 
                          onChange={field.onChange} 
                          required={field.required}
                        >
                          {/* Conditionally render placeholder option */}
                          {field.id === "country" && (
                            <option value="">Select {field.label}</option>
                          )}
                          {field.options.map((option, optIndex) => (
                            <option key={optIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  ))}
            {formWebsite && formWebsite.map((Website, index) => (
              <Form.Group key={index} controlId={Website.id} className="mb-5">
                <Form.Label>{Website.label}</Form.Label>
                <Form.Control
                  as={Website.as || "input"}
                  type={Website.type || "text"}
                  placeholder={Website.placeholder || ""}
                  value={Website.value}
                  onChange={Website.onChange}
                  required={Website.required || false}
                />
              </Form.Group>
            ))}
          </Col>
        </Row>
      </div>
      {formAddress && formAddress.map((Address, index) => (
        <Form.Group key={index} controlId={Address.id} className="mb-5 ms-2">
          <Form.Label>{Address.label}</Form.Label>
            <Form.Control
              as={Address.as || "input"}
              type={Address.type || "text"}
              placeholder={Address.placeholder || ""}
              value={Address.value}
              onChange={Address.onChange}
              required={Address.required || false}
              />
            </Form.Group>
          ))}
             <Col md={12}>
                <Row>
                  {formCountry && formCountry.map((field, index) => (
                    <Col md={4} key={index}>
                      <Form.Group controlId={field.id} className="mb-5 ms-2">
                        <Form.Label>{field.label}</Form.Label>
                        <Form.Control 
                          as="select" 
                          value={field.value} 
                          onChange={field.onChange} 
                          required={field.required}
                        >
                          {/* Conditionally render placeholder option */}
                          {field.id === "country" && (
                            <option value="">Select {field.label}</option>
                          )}
                          {field.options.map((option, optIndex) => (
                            <option key={optIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
              </Col>
      {formTextarea && formTextarea.map((Textarea) => (
        <Form.Group key={Textarea.id} controlId={Textarea.id} className="mb-5 ms-2">
          <Form.Label>{Textarea.label}</Form.Label>
          <Form.Control
            as={Textarea.as}
            rows={Textarea.rows}
            placeholder={Textarea.placeholder}
            value={Textarea.value}
            onChange={Textarea.onChange}
            required={Textarea.required}
          />
        </Form.Group>
      ))}
             {/* Conditionally show the drag-and-drop upload for cover photo */}
             {showUploadFeature && (
          <div className="upload-section">
            <div className="mb-4">
              <h5>Cover Photo</h5>
              <div className="cover-photo-dropzone">
                {coverFile ? (
                  <div className="file-info d-flex align-items-center">
                    <FaFileImage className="me-2" />
                    <span className="file-name me-3">{coverFile.name}</span>
                    <Button variant="link" onClick={handleShowCoverPreview} className="p-0 me-2">
                      Click to view
                    </Button>
                    <Button variant="link" onClick={handleRemoveCover} className="p-0">
                      <FaTrashAlt />
                    </Button>
                  </div>
                ) : (
                  <div {...getCoverRootProps()} className="dropzone text-center p-3 border rounded">
                    <input {...getCoverInputProps()} />
                    <FaUpload size={32} className="mb-2" />
                    <p>Click to upload or drag and drop</p>
                    <small className="text-muted">JPG, JPEG, PNG less than 2MB</small>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <h5>Photo Album</h5>
              <div {...getAlbumRootProps()} className="dropzone text-center p-3 border rounded mb-3">
                <input {...getAlbumInputProps()} />
                <FaUpload size={32} className="mb-2" />
                <p>Click to upload or drag and drop</p>
                <small className="text-muted">JPG, JPEG, PNG less than 2MB</small>
              </div>
              {albumFiles.map((file, index) => (
                <div key={index} className="file-info d-flex align-items-center mb-2">
                  <FaFileImage className="me-2" />
                  <span className="file-name me-3">{file.name}</span>
                  <Button variant="link" onClick={() => handleShowPreview(file)} className="p-0 me-2">
                    Click to view
                  </Button>
                  <Button variant="link" onClick={() => handleRemoveAlbum(file)} className="p-0">
                    <FaTrashAlt />
                  </Button>
                </div>
              ))}
            </div>
           {/* Modal for Cover Preview */}
            {showCoverPreview && previewFile && (
              <Modal
                show={showCoverPreview}
                onHide={handleCloseCoverPreview}
                centered // To center the modal
                size="lg" // To give it a larger size initially
                dialogClassName="modal-preview" // Custom class for modal dialog
              >
                <Modal.Header closeButton>
                  <Modal.Title>Cover Photo Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center"> {/* Center the image */}
                    <Image 
                      src={URL.createObjectURL(previewFile)} 
                      alt="Cover Preview" 
                      className="img-fluid preview-img" // Custom class for styling
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseCoverPreview}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {/* Modal for Album Preview */}
            {showPreview && previewFile && (
              <Modal
                show={showPreview}
                onHide={handleClosePreview}
                centered // Center the modal
                size="lg" // Start with larger modal size
                dialogClassName="modal-preview" // Custom class for modal dialog
              >
                <Modal.Header closeButton>
                  <Modal.Title>Album Photo Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center"> {/* Center the image */}
                    <Image 
                      src={URL.createObjectURL(previewFile)} 
                      alt="Album Preview" 
                      className="img-fluid preview-img" // Custom class for styling
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClosePreview}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        )}
      {formHTML && formHTML.map(field => (
        <Form.Group key={field.id} controlId={field.id} className="ms-2">
          <Form.Label>{field.label}</Form.Label>
          <Editor
            apiKey="y5c72cgxrai71v1jmggt9a2gx878yajnqxrxxkhtylowcqbb"
            value={field.value}
            onEditorChange={field.onChange}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "link",
                "lists",
                "charmap",
                "anchor",
                "pagebreak",
                "searchreplace",
                "wordcount",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "emoticons"
              ],
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent",
              menubar: false,
              content_style: "ul {list-style-type: disc; margin-left: 20px;}", // Ensuring the correct bullet formatting
              forced_root_block: 'div', // Prevents adding unwanted <p> tags around the content
              entity_encoding: "raw",  // Ensures that the raw HTML is saved without escaping
              setup: (editor) => {
                editor.on('init', () => {
                  // Additional CSS adjustments if needed
                  const style = `
                    .tox-toolbar {
                      position: relative;
                      z-index: 1000;
                    }
                    .tox-menu {
                      position: absolute;
                      top: 100%;
                      z-index: 1001;
                    }
                  `;
                  const styleSheet = document.createElement('style');
                  styleSheet.type = 'text/css';
                  styleSheet.innerText = style;
                  document.head.appendChild(styleSheet);
                });
              }
            }}
          />
        </Form.Group>
      ))}
      {/* Render checkboxes conditionally */}
      {formCheckboxes && formCheckboxes.length > 0 && (
        <div className="check">
          <h4 className="detail text-left">{checkboxDetail}</h4>
          <h4 className="fw-light text-left mt-2 mb-2">{checkboxTitle}</h4>
          <Form.Group controlId="formBasicCheckboxes">
            {formCheckboxes.map((checkbox, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                id={checkbox.id}
                label={checkbox.label}
                value={checkbox.value}
                checked={checkbox.checked}
                onChange={checkbox.onChange}
                className="mb-2"
              />
            ))}
          </Form.Group>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {/* Submit Button */}
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          {buttons.map((button, index) => (
            <Button key={index} type={button.type} variant="primary" className="save">
              {button.label}
            </Button>
          ))}
        </Col>
      </Row>
    </Form>
  );
};
export default AdminFormComponent;
