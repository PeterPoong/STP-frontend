import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State, City } from 'country-state-city';


const BasicInformationWidget = () => {
  const [studentData, setStudentData] = useState({
    id: '',
    username: '',
    contact: '',
    country_code: '',
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    state: '',
    postcode: '',
    ic: '',
    address: '',
    gender: ''
  });
  const [phone, setPhone] = useState('');
  const [countryCode,setCountryCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [genderList, setGenderList] = useState([]);

  useEffect(() => {
    fetchStudentDetails();
    fetchGenderList();
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    console.log('Student data updated:', studentData);
    setPhone(studentData.country_code + studentData.contact || '');
    if (studentData.country_code && studentData.contact) {
      setPhone(studentData.contact);
      setCountryCode(studentData.country_code.replace('+', ''));
    }
    // Update states when country changes
    if (studentData.country) {
      //const countryData = Country.getAllCountries().find(c => c.isoCode === studentData.country);
      //if (countryData) {
      //  setStates(State.getStatesOfCountry(countryData.isoCode));
      // }
      setStates(State.getStatesOfCountry(studentData.country));
    }

    // Update cities when state changes
    if (studentData.state && studentData.country) {
      // const countryData = Country.getAllCountries().find(c => c.isoCode === studentData.country);
      // const stateData = State.getStatesOfCountry(countryData.isoCode).find(s => s.isoCode === studentData.state);
      // if (stateData) {
      //   setCities(City.getCitiesOfState(countryData.isoCode, stateData.isoCode));
      // }
      setCities(City.getCitiesOfState(studentData.country, studentData.state));
    }
  }, [studentData]);

  const fetchGenderList = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/genderList`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch gender list. Status: ${response.status}`);
      }

      const data = await response.json();
      setGenderList(data.data || []);
    } catch (error) {
      console.error('Error fetching gender list:', error);
      setError('Failed to load gender options. Please try again later.');
    }
  };



  const fetchStudentDetails = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const id = sessionStorage.getItem('id') || localStorage.getItem('id');

      if (!id) {
        setError('User ID not found. Please log in again.');
        setIsLoading(false);
        return;
      }

      const url = `${import.meta.env.VITE_BASE_URL}api/student/studentDetail?id=${id}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });

      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      if (!response.ok) {
        throw new Error(`Failed to fetch student details. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Fetched student data:', responseData);

      if (!responseData.data || Object.keys(responseData.data).length === 0) {
        throw new Error('No data received from the server. Your profile might be incomplete.');
      }

      setStudentData(responseData.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error in fetchStudentDetails:', error.message);
      setError(error.message || 'Error fetching student details. Please try logging out and back in.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhoneChange = (value, country, e, formattedValue) => {
    setPhone(value);
    setCountryCode(country.dialCode);
    setStudentData(prevData => ({
      ...prevData,
      contact: value.slice(country.dialCode.length),
      country_code: `+${country.dialCode}`
    }));
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    // const countryData = Country.getAllCountries().find(c => c.name === value);
    setStudentData(prevData => ({
      ...prevData,
      country: '1',
      state: '1',
      city: '1'
    }));
    // if (countryData) {
    //   setStates(State.getStatesOfCountry(countryData.isoCode));
    // }
    setStates(State.getStatesOfCountry(value));
    setCities([]);
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    //const countryData = Country.getAllCountries().find(c => c.isoCode === studentData.country);
    //const stateData = State.getStatesOfCountry(countryData.isoCode).find(s => s.name === value);
    setStudentData(prevData => ({
      ...prevData,
      //state: stateData ? stateData.isoCode : '',
      state: value,
      city: ''
    }));
    //if (stateData) {
    //  setCities(City.getCitiesOfState(countryData.isoCode, stateData.isoCode));
    //}
    setCities(City.getCitiesOfState(studentData.country, value));
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    //const cityData = cities.find(c => c.name === value);
    setStudentData(prevData => ({
      ...prevData,
      //  city: cityData ? cityData.id : ''
      city: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Create a new object with only the fields we want to send
    const submissionData = {
  
      name: studentData.username,
      country_code: '+60',
      contact_number: '12345678',
      email: studentData.email,
      first_name: studentData.firstName,
      last_name: studentData.lastName,
      country: '1',  // Set default value
      state: '1',    // Set default value
      city: '1',     // Set default value
      postcode: studentData.postcode,
      ic: studentData.ic,
      address: studentData.address,
      
      gender: '53',   //studentData.contact,  // Use the contact from studentData  //studentData.country_code,  // Use the country_code from studentData
    };
  

    
    console.log('Data to be sent to the API:', JSON.stringify(submissionData, null, 2));

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/editStudentDetail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submissionData)
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);
      

      if (!response.ok) {
        if (response.status === 422) {
          const errorMessages = Object.values(responseData.errors).flat().join(', ');
          throw new Error(`Validation error: ${errorMessages}`);
        }
        throw new Error(`Failed to update student details. Status: ${response.status}`);
      }

      if (responseData.success) {
        setSuccess('Student details updated successfully!');
        // Optionally, you can refetch the student details here to update the form with the latest data
        // fetchStudentDetails();
      } else {
        setError(responseData.message || 'Failed to update student details');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(`Error updating student details: ${error.message}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <h4 className="title-widget">{studentData.username || ''}'s Profile</h4>
      <Card className="mb-4">
        <Card.Body className="mx-4">
          <div className="border-bottom mb-4">
            <h2 className="fw-light title-widgettwo" style={{ color: "black" }}>Basic Information</h2>
          </div>
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="fw-bold small formlabel">Username <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75"
                    name="username"
                    value={studentData.username || ''}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="first_name">
                  <Form.Label className="fw-bold small formlabel">First Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    className="w-75"
                    type="text"
                    required
                    name="firstName"
                    value={studentData.firstName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="last_name">
                  <Form.Label className="fw-bold small formlabel">Last Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75"
                    name="lastName"
                    value={studentData.lastName || ''}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="ic">
                  <Form.Label className="fw-bold small formlabel">Identity Card Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75"
                    name="ic"
                    value={studentData.ic || ''}
                    onChange={handleInputChange}
                    placeholder="Enter IC number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="gender">
                  <Form.Label className="fw-bold small formlabel">Gender <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    required
                    className="w-75"
                    name="gender"
                    value={studentData.gender || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select gender</option>
                    {genderList.map((gender) => (
                      <option key={gender.id} value={gender.id}>
                        {gender.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formBasicPhone" className="mb-3">
                  <Form.Label className="fw-bold small formlabel">Contact Number</Form.Label>
                  <PhoneInput
                    country={'my'}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: 'contact',
                      required: true,
                      placeholder: 'Enter phone number'
                    }}
                    inputClass="form-control"
                    containerClass="phone-input-container"
                    buttonClass="btn btn-outline-secondary"
                    dropdownClass="country-dropdown custom-dropdown"
                    countryCodeEditable={false}
                    className="w-75"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label className="fw-bold small formlabel">Email Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    required
                    className="w-75"
                    name="email"
                    value={studentData.email || ''}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label className="fw-bold small formlabel">Address <span className="text-danger">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                className="w-100"
                name="address"
                value={studentData.address || ''}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="country">
                  <Form.Label className="fw-bold small formlabel">Country <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    /*required*/
                    className="w-75"
                    name="country"
                    //  value={Country.getAllCountries().find(c => c.isoCode === studentData.country)?.name || ''}
                    value={studentData.country || ''}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="state">
                  <Form.Label className="fw-bold small formlabel">State <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    /*required*/
                    className="w-75"
                    name="state"
                    // value={State.getStatesOfCountry(studentData.country).find(s => s.isoCode === studentData.state)?.name || ''}
                    value={studentData.state || ''}
                    onChange={handleStateChange}
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label className="fw-bold small formlabel">City <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    /*required*/
                    className="w-75"
                    name="city"
                    //value={cities.find(c => c.id === studentData.city)?.name || ''}
                    value={studentData.city || ''}
                    onChange={handleCityChange}
                  ><option value="">Select city</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="postcode">
                  <Form.Label className="fw-bold small formlabel">Postcode <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    required
                    className="w-75"
                    name="postcode"
                    value={studentData.postcode || ''}
                    onChange={handleInputChange}
                    placeholder="Enter postcode"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end mt-3">
              <div className="w-25">
                <Button variant="danger" type="submit" className="m-0 w-100 fw-bold rounded-pill">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BasicInformationWidget;