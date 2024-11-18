import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill theme
import { Form, Row, Col, Button, Image, Modal, Card } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Editor } from "@tinymce/tinymce-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { useDropzone } from "react-dropzone";
import {
  FaTrashAlt,
  FaUpload,
  FaFileImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
const Size = Quill.import("formats/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "24px", "32px"];
Quill.register(Size, true);
const AdminFormComponent = ({
  formTitle,
  formFields,
  formTextarea,
  formPassword,
  shouldRenderPasswordCard,
  shouldRenderHorizontalLine,
  formCheckboxes,
  formPersonInCharge,
  formCategory,
  formAccount,
  formCountry,
  formWebsite,
  formAddress,
  checkboxTitle,
  checkboxDetail,
  helperStar,
  courseTitle,
  formPeriod,
  formUrl,
  formHTML,
  formRadio,
  formName,
  formPrice,
  formPackage,
  formDrop,
  formMode,
  formGender,
  formCourse,
  formDates,
  formCourses,
  formStatus,
  formRead,
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
  newBannerFile,
  logo,
  newLogo,
  handleLogoChange,
  icon,
  newIcon,
  handleIconChange,
  handleBannerFileChange,
  startDate,
  endDate,
  onDateChange,
  showUploadFeature,
  handleDateChange,
  coverUploadProps,
  coverInputProps,
  albumUploadProps,
  albumInputProps,
  selectedStartDate,
  selectedEndDate,
  coverFile,
  setCoverFile,
  albumFiles,
  setAlbumFiles,
  handleRemoveCover,
  handleRemoveAlbum,
  handleShowPreview,
  handleShowCoverPreview,
  handleClosePreview,
  handleCloseCoverPreview,
  showPreview,
  showCoverPreview,
  previewFile,
}) => {
  const [formData, setFormData] = useState({});

  const handleFieldChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "file" ? files[0] : value,
    }));
  };

  // Add useState hooks for managing selected dates

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
      // First click: Set the start date
      handleDateChange(adjustedDate, "start");
    } else if (selectedStartDate && !selectedEndDate) {
      // Second click: Set the end date
      handleDateChange(adjustedDate, "end");
    } else {
      // Third click: Reset both start and end dates, and set the new start date
      handleDateChange(adjustedDate, "start");
      handleDateChange(null, "end"); // Reset the end date
    }
  };
  const formatDateTimeLocal = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Define the acceptable file types and size limit
  const acceptedFormats = ["image/jpeg", "image/png"];
  const maxFileSize = 2 * 1024 * 1024; // 2MB

  // Handler for cover photo drop
  const handleCoverDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Check file format and size
    if (!acceptedFormats.includes(file.type)) {
      setErrorMessage(
        "Invalid file format. Only JPG, JPEG, and PNG are allowed."
      );
      return;
    }

    if (file.size > maxFileSize) {
      setErrorMessage("File size exceeds the limit of 2MB.");
      return;
    }

    // Clear any previous error
    setErrorMessage("");

    // Set the cover photo file
    setCoverFile(file);
  };

  // Handler for album photo drop
  const handleAlbumDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Check file format and size
    if (!acceptedFormats.includes(file.type)) {
      setErrorMessage(
        "Invalid file format. Only JPG, JPEG, and PNG are allowed."
      );
      return;
    }

    if (file.size > maxFileSize) {
      setErrorMessage("File size exceeds the limit of 2MB.");
      return;
    }

    // Clear any previous error
    setErrorMessage("");

    // Add the album file
    setAlbumFiles([...albumFiles, file]);
  };

  // const handleShowCoverPreview = () => {
  //   if (coverFile) {
  //     setPreviewFile(coverFile.location || URL.createObjectURL(coverFile));
  //     setShowCoverPreview(true);
  //   }
  // };

  // const handleShowCoverPreview = () => {
  //   if (coverFile) {
  //     setPreviewFile(coverFile.location || URL.createObjectURL(coverFile));
  //     setShowCoverPreview(true);
  //   }
  // };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setCoverFile(acceptedFiles[0]);
      },
    });
  // Dropzone hooks for album photos
  const { getRootProps: getAlbumRootProps, getInputProps: getAlbumInputProps } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setAlbumFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      },
    });

  const handleRadioChange = (radioId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [radioId]: value, // Update the selected radio value in formData
    }));
  };

  return (
    <Form onSubmit={onSubmit} className="admin-form-component">
      <h3 className="fw-light text-left mt-4 mb-4">{formTitle}</h3>
      {error && <p className="text-danger">{error}</p>}
      <hr />
      <div className="fieldSide">
        <Row className="mb-3">
          {formRead &&
            formRead.map((read, index) => (
              <Form.Group key={index} controlId={read.id} className="mb-4 mt-3">
                <Form.Label>{read.label}</Form.Label>
                <div className="form-control-plaintext">
                  {read.value || "-"}{" "}
                  {/* Display the value or a placeholder if no value */}
                </div>
              </Form.Group>
            ))}
          {shouldRenderHorizontalLine && (
                <div className="mt-5 mb-2">
                  <hr></hr>
                  </div>
          )}
          <Col md={6}>
         
            {formFields &&
              formFields.map((field, index) => (
                <Form.Group key={index} controlId={field.id} className="mb-5">
                  <Form.Label>{field.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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

            {formDrop &&
              formDrop.map((drop, index) => (
                <Form.Group key={index} controlId={drop.id} className="mb-5">
                  <Form.Label>{drop.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
                  <Form.Control
                    as="select"
                    value={drop.value}
                    onChange={drop.onChange}
                    required={drop.required || false}
                  >
                    <option value="">Select School</option>
                    {drop.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              ))}
            {formCourses &&
              formCourses.map((courses, index) => (
                <Form.Group key={index} controlId={courses.id} className="mb-5">
                  <Form.Label>{courses.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
                  <Form.Control
                    as="select"
                    value={courses.value}
                    onChange={courses.onChange}
                    required={courses.required || false}
                  >
                    <option value="">Select Course</option>
                    {courses.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              ))}
            {formPackage &&
              formPackage.map((packages, index) => (
                <Form.Group
                  key={index}
                  controlId={packages.id}
                  className="mb-5"
                >
                  <Form.Label>{packages.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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
            {formUrl &&
              formUrl.map((urlField, index) => (
                <Col md={12} key={index}>
                  <Form.Group controlId={urlField.id} className="banner">
                    <Form.Label>{urlField.label}</Form.Label>{" "}
                    <span class="text-danger">*</span>
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
            {error && <div className="alert alert-danger">{error}</div>}
            {handleBannerFileChange && (
              <Form.Group controlId="banner_file" className="mb-5">
                <Form.Label>Banner File (2MB)</Form.Label>{" "}
                <span class="text-danger">*</span>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleBannerFileChange}
                />
              </Form.Group>
            )}
            {banner_file && !newBannerFile && (
              <div className="mb-3">
                <Image
                  src={banner_file}
                  alt="Existing banner"
                  className="img-banner-admin"
                />
              </div>
            )}
            {newBannerFile && (
              <div className="mb-3">
                <Image
                  src={newBannerFile}
                  alt="New banner file"
                  className="img-banner-admin"
                />
              </div>
            )}

            {/* Contact Number Phone Input */}
            {handlePhoneChange && phone !== undefined && (
              <Form.Group controlId="contact_number" className="mb-5">
                <Form.Label>Contact Number</Form.Label>{" "}
                <span class="text-danger">*</span>
                <PhoneInput
                  country="my"
                  value={`${country_code}${phone}`}
                  onChange={(value, country) =>
                    handlePhoneChange(value, country, "contact_number")
                  }
                  inputProps={{
                    name: "contact_number",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </Form.Group>
            )}
            {shouldRenderPasswordCard && (
              <Card className="mt-5 mb-2">
                <Card.Body>
                  {formPassword.map((password, index) => (
                    <Form.Group
                      key={index}
                      controlId={password.id}
                      className="mb-4 position-relative"
                    >
                      <Form.Label>{password.label}</Form.Label>
                      {password.helperText && (
                        <Form.Text
                          className="text-danger mb-2"
                          style={{ display: "block" }}
                        >
                          {password.helperText}
                        </Form.Text>
                      )}
                      {password.helperStar && (
                        <Form.Text className="text-danger mb-2 ms-1">
                          {password.helperStar}
                        </Form.Text>
                      )}
                      <Form.Control
                        type={password.type}
                        placeholder={password.placeholder}
                        value={password.value}
                        onChange={password.onChange}
                        autoComplete={password.autoComplete}
                      />
                      <span
                        className="password-toggle mt-1"
                        onClick={password.toggleVisibility}
                        role="button"
                      >
                        {password.showVisibility ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </Form.Group>
                  ))}
                </Card.Body>
              </Card>
            )}

            {formAccount &&
              formAccount.map((account, index) => (
                <Form.Group key={index} controlId={account.id} className="mb-5">
                  <Form.Label>{account.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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
            {formMode &&
              formMode.map((mode, index) => (
                <Form.Group key={index} controlId={mode.id} className="mb-5">
                  <Form.Label>{mode.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
                  <Form.Control
                    as="select"
                    value={mode.value}
                    onChange={mode.onChange}
                    required={mode.required || false}
                  >
                    <option value="">Select Study Mode</option>
                    {mode.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              ))}
          </Col>
          <Col md={6}>
            {formDates &&
              formDates.map((date, index) => (
                <Form.Group key={index} controlId={date.id} className="mb-5">
                  <Form.Label>{date.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
                  <DatePicker
                    selected={date.value ? new Date(date.value) : null} // Convert value to Date object
                    onChange={date.onChange} // Call the provided onChange function
                    placeholderText={date.placeholder || ""}
                    required={date.required || false}
                    dateFormat="yyyy-MM-dd" // Format date as Y-m-d
                    className="form-control mb-2 mt-4 ms-2" // Use Bootstrap styling
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select" // Enable dropdown for selecting year/month
                  />
                </Form.Group>
              ))}

            {formGender &&
              formGender.map((gender, index) => (
                <Form.Group key={index} controlId={gender.id} className="mb-5">
                  <Form.Label>{gender.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
                  <Form.Control
                    as="select"
                    value={gender.value}
                    onChange={gender.onChange}
                    required={gender.required || false}
                  >
                    <option value="">Select Gender</option>
                    {gender.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              ))}
            {/* Logo Upload */}
            {error && <div className="alert alert-danger">{error}</div>}
            {handleLogoChange && (
              <Form.Group controlId="logo" className="mb-5">
                <Form.Label>Logo (2MB)</Form.Label>{" "}
                <span class="text-danger">*</span>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </Form.Group>
            )}
            {logo && !newLogo && (
              <div className="mb-3">
                <Image
                  src={logo}
                  alt="Existing logo"
                  className="img-fluid-admin"
                />
              </div>
            )}
            {newLogo && (
              <div className="mb-3">
                <Image
                  src={newLogo}
                  alt="New logo"
                  className="img-fluid-admin"
                />
              </div>
            )}
            {handleIconChange && (
              <Form.Group controlId="icon" className="mb-5">
                <Form.Label>Category Icon (2MB)</Form.Label>{" "}
                <span class="text-danger">*</span>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                />
              </Form.Group>
            )}
            {icon && !newIcon && (
              <div className="mb-3">
                <Image
                  src={icon}
                  alt="Existing icon"
                  className="img-fluid-admin"
                />
              </div>
            )}
            {newIcon && (
              <div className="mb-3">
                <Image
                  src={newIcon}
                  alt="New icon"
                  className="img-fluid-admin"
                />
              </div>
            )}
            {formPrice &&
              formPrice.map((Price, index) => (
                <Form.Group key={index} controlId={Price.id} className="mb-5">
                  <Form.Label>{Price.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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

            {formCategory &&
              formCategory.map((category, index) => (
                <Form.Group
                  key={index}
                  controlId={category.id}
                  className="mb-5"
                >
                  <Form.Label>{category.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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

            {formStatus &&
              formStatus.map((status, index) => (
                <Form.Group key={index} controlId={status.id} className="mb-5">
                  <Form.Label>{status.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
                  <Form.Control
                    as="select"
                    value={status.value}
                    onChange={status.onChange}
                    required={status.required || false}
                  >
                    <option value="">Select Status</option>
                    {status.options.map((option, optIndex) => (
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
                      <Form.Label>Banner Start</Form.Label>{" "}
                      <span class="text-danger">*</span>
                      <Form.Control
                        type="datetime-local"
                        value={
                          selectedStartDate
                            ? formatDateTimeLocal(selectedStartDate)
                            : ""
                        }
                        onChange={(e) => {
                          const newDate = new Date(e.target.value);
                          handleDateChange(newDate, "start");
                        }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="banner_end" className="mb-3">
                      <Form.Label>Banner End</Form.Label>{" "}
                      <span class="text-danger">*</span>
                      <Form.Control
                        type="datetime-local"
                        value={
                          selectedEndDate
                            ? formatDateTimeLocal(selectedEndDate)
                            : ""
                        }
                        onChange={(e) => {
                          const newDate = new Date(e.target.value);
                          handleDateChange(newDate, "end");
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
                <Form.Label>Person in Charge's Contact</Form.Label>{" "}
                <span class="text-danger">*</span>
                <PhoneInput
                  country="my"
                  value={personPhone}
                  onChange={(value, country) =>
                    handlePhoneChange(
                      value,
                      country,
                      "person_in_charge_contact"
                    )
                  }
                  inputProps={{
                    name: "person_in_charge_contact",
                    required: true,
                    autoFocus: true,
                  }}
                />
              </Form.Group>
            )}
            {formPersonInCharge &&
              formPersonInCharge.map((PersonInCharge, index) => (
                <Form.Group
                  key={index}
                  controlId={PersonInCharge.id}
                  className="mb-5"
                >
                  <Form.Label>{PersonInCharge.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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

            {formName &&
              formName.map((Name, index) => (
                <Form.Group key={index} controlId={Name.id} className="mb-5">
                  <Form.Label>{Name.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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

            {formWebsite &&
              formWebsite.map((Website, index) => (
                <Form.Group key={index} controlId={Website.id} className="mb-5">
                  <Form.Label>{Website.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
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
      {formAddress &&
        formAddress.map((Address, index) => (
          <Form.Group key={index} controlId={Address.id} className="mb-5 ms-2">
            <Form.Label>{Address.label}</Form.Label>{" "}
            <span class="text-danger">*</span>
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
          {formCountry &&
            formCountry.map((field, index) => (
              <Col md={4} key={index}>
                <Form.Group controlId={field.id} className="mb-5 ms-2">
                  <Form.Label>{field.label}</Form.Label>{" "}
                  <span class="text-danger">*</span>
                  <Form.Control
                    as="select"
                    value={field.value}
                    onChange={field.onChange}
                    required={field.required}
                    disabled={field.disabled}
                  >
                    {field.options.length > 0 &&
                      field.options.map((option, optIndex) => (
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
      {formTextarea &&
        formTextarea.map((Textarea) => (
          <Form.Group
            key={Textarea.id}
            controlId={Textarea.id}
            className="mb-5 ms-2"
          >
            <Form.Label>{Textarea.label}</Form.Label>{" "}
            <span class="text-danger">*</span>
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
            <h5>Cover Photos</h5>
            <div className="cover-photo-dropzone">
              {coverFile ? (
                <div className="file-info d-flex align-items-center">
                  <FaFileImage className="me-2" />
                  <span className="file-name me-3">{coverFile.name}</span>
                  <Button
                    variant="link"
                    onClick={handleShowCoverPreview}
                    className="p-0 me-2"
                  >
                    Click to view
                  </Button>
                  <Button
                    variant="link"
                    onClick={handleRemoveCover}
                    className="p-0"
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              ) : (
                <div
                  {...getCoverRootProps()}
                  className="dropzone text-center p-3 border rounded"
                >
                  <input {...getCoverInputProps()} />
                  <FaUpload size={32} className="mb-2" />
                  <p>Click to upload or drag and drop</p>
                  <small className="text-muted">
                    JPG, JPEG, PNG less than 2MB
                  </small>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <h5>Photo Album</h5>
            <div
              {...getAlbumRootProps()}
              className="dropzone text-center p-3 border rounded mb-3"
            >
              <input {...getAlbumInputProps()} />
              <FaUpload size={32} className="mb-2" />
              <p>Click to upload or drag and drop</p>
              <small className="text-muted">JPG, JPEG, PNG less than 2MB</small>
            </div>
            {albumFiles.map((file, index) => (
              <div
                key={index}
                className="file-info d-flex align-items-center mb-2"
              >
                <FaFileImage className="me-2" />
                <span className="file-name me-3">{file.name}</span>
                <Button
                  variant="link"
                  onClick={() => handleShowPreview(file)}
                  className="p-0 me-2"
                >
                  Click to view
                </Button>
                <Button
                  variant="link"
                  onClick={() => handleRemoveAlbum(file)}
                  className="p-0"
                >
                  <FaTrashAlt />
                </Button>
              </div>
            ))}
          </div>
          {/* Modal for Cover Preview */}
          {showCoverPreview && (
            <Modal
              show={showCoverPreview}
              onHide={handleCloseCoverPreview}
              centered
              size="lg"
              dialogClassName="modal-preview"
            >
              <Modal.Header closeButton>
                <Modal.Title>Cover Photo Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  {previewFile && (
                    <Image
                      src={previewFile}
                      alt="Cover Preview"
                      className="img-fluid preview-img"
                    />
                  )}
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
          {showPreview && (
            <Modal
              show={showPreview}
              onHide={handleClosePreview}
              centered
              size="lg"
              dialogClassName="modal-preview"
            >
              <Modal.Header closeButton>
                <Modal.Title>Album Photo Preview</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center">
                  {previewFile && (
                    <Image
                      src={previewFile}
                      alt="Album Preview"
                      className="img-fluid preview-img"
                    />
                  )}
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
      {formHTML &&
        formHTML.map((field) => (
          <Form.Group key={field.id} controlId={field.id} className="ms-2">
            <Form.Label>
              {field.label}{" "}
              {field.required && <span className="text-danger">*</span>}
            </Form.Label>
            <ReactQuill
              value={field.value} // Bind the value from formHTML
              onChange={field.onChange} // Handle changes using the onChange passed from formHTML
              modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [
                      {
                        size: [
                          "10px",
                          "12px",
                          "14px",
                          "16px",
                          "18px",
                          "24px",
                          "32px",
                        ],
                      },
                    ],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline", "strike"],
                    [{ align: [] }],
                    ["link", "image"],
                    ["clean"], // Remove formatting
                    ["code-block"],
                  ],
                },
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "bullet",
                "align",
                "link",
                "image",
                "code-block",
              ]}
              theme="snow" // Set the Quill theme to "snow"
            />
          </Form.Group>
        ))}
      {shouldRenderHorizontalLine && (
                    <div className="mt-5 mb-2">
                      <hr></hr>
                      </div>
              )}
      {/* Render checkboxes conditionally */}
      {formCheckboxes && formCheckboxes.length > 0 && (
        <div className="check">
          <h4 className="detail text-left">{checkboxDetail}</h4>
          <h4 className="fw-light text-left mt-2">{checkboxTitle}</h4>
          <h5 className="text-danger mb-2" style={{ display: "block" }}>
            {helperStar}
          </h5>
          <Form.Group controlId="formBasicCheckboxes">
            <div className="row">
              {formCheckboxes.map((checkbox, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-2">
                  <Form.Check
                    type="checkbox"
                    id={checkbox.id}
                    label={checkbox.label}
                    value={checkbox.value}
                    checked={checkbox.checked}
                    onChange={checkbox.onChange}
                    className="mb-2"
                  />
                </div>
              ))}
            </div>
          </Form.Group>
        </div>
      )}
      {formCourse && formCourse.length > 0 && (
        <div className="check">
          <h4 className="detail text-left">{checkboxDetail}</h4>
          <h4 className="fw-light text-left mt-2">{courseTitle}</h4>

          <Form.Group controlId="formBasicCheckboxes">
            <div className="row">
              {formCourse.map((course, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-2">
                  <Form.Check
                    type="checkbox"
                    id={course.id}
                    label={course.label}
                    value={course.value}
                    checked={course.checked}
                    onChange={course.onChange}
                    className="mb-2"
                  />
                </div>
              ))}
            </div>
          </Form.Group>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {/* Submit Button */}
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          {buttons.map((button, index) => (
            <Button
              key={index}
              type={button.type}
              variant="primary"
              className="save"
            >
              {button.label}
            </Button>
          ))}
        </Col>
      </Row>
    </Form>
  );
};
export default AdminFormComponent;
