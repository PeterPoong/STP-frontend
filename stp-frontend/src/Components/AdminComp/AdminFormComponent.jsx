import React, { useState } from "react";
import { Form, Row, Col, Button, Image } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Editor } from '@tinymce/tinymce-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdminFormComponent = ({
  formTitle,
  formFields,
  formTextarea,
  formPassword,
  formCheckboxes,
  formPersonInCharge,
  formCategory,
  formAccount,
  formWebsite,
  checkboxTitle,
  checkboxDetail,
  formPeriod,
  formUrl,
  formHTML,
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
  onDateChange
}) => {
  const [formData, setFormData] = useState({});
  const handleFieldChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [id]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };
  const [selectedStartDate, setSelectedStartDate] = useState(startDate || null);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate || null);

  const handleDateClick = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(0, 0, 0, 0); // Set time to midnight to prevent timezone shift
  
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Reset start and end date when both are selected
      setSelectedStartDate(adjustedDate);
      setSelectedEndDate(null);
      onDateChange({ startDate: adjustedDate, endDate: null });
    } else if (selectedStartDate && !selectedEndDate) {
      // Set the end date when only the start date is selected
      setSelectedEndDate(adjustedDate);
      onDateChange({ startDate: selectedStartDate, endDate: adjustedDate });
    }
  };
  
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
          {/* Banner File Upload */}
          {handleBannerFileChange && (
            <Col md={12}>
              <Form.Group controlId="banner_file" className="banner">
                <Form.Label>Banner File</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleBannerFileChange} />
              </Form.Group>
              {banner_file && (
                <div className="mb-3">
                  <Image src={banner_file} alt="bannerFile" fluid />
                </div>
              )}
            </Col>
          )}
           {/* Conditionally render formUrl */}
           {formUrl && formUrl.map((urlField, index) => (
            <Col md={12}>
              <Form.Group key={index} controlId={urlField.id} className="mb-3">
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
              <Form.Group key={index} controlId={password.id} className="mb-5">
                <Form.Label>{password.label}</Form.Label>
                <Form.Control
                  type={password.type}
                  placeholder={password.placeholder}
                  value={password.value}
                  onChange={password.onChange}
                  required={password.required}
                  autoComplete={password.autoComplete}
                />
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
                <Form.Label>Logo</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleLogoChange} />
              </Form.Group>
                )}
              {logo && (
                <div className="mb-3">
                  <Image src={logo} alt="logo" className="img-fluid-admin" />
                </div>
              )}
          
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
              

            </Col> 
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
           {/* Conditionally render formPeriod or the Calendar */}
        {formPeriod && (
          <Col md={6}>
            <Row>
              {formPeriod.map((periodField, index) => (
                <Col md={6} key={index}>
                  <Form.Group controlId={periodField.id} className="mb-3">
                    <Form.Label>{periodField.label}</Form.Label>
                    <Form.Control
                      type={periodField.type || "date"}
                      // Set value to the selectedStartDate or selectedEndDate based on the field
                      value={periodField.id === "banner_start"
                        ? (selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : '')
                        : (selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : '')}
                      onChange={periodField.onChange}
                      required={periodField.required || false}
                    />
                  </Form.Group>
                </Col>
              ))}
              <Col md={12}>
                <div className="date-picker-container">
                  <Calendar
                    selectRange={false}
                    onClickDay={handleDateClick}
                    value={selectedStartDate ? (selectedEndDate ? [selectedStartDate, selectedEndDate] : selectedStartDate) : null}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      </div>

      {formTextarea && formTextarea.map((field) => (
        <Form.Group key={field.id} controlId={field.id} className="mb-5">
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            as={field.as}
            rows={field.rows}
            placeholder={field.placeholder}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
          />
        </Form.Group>
      ))}


{formHTML && formHTML.map(field => (
        <Form.Group key={field.id} controlId={field.id}>
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
