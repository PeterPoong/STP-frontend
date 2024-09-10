import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import "../../css/StudentPortalStyles/StudentPortalLoginForm.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "../../css/StudentPortalStyles/StudentButtonGroup.css";
import axios from 'axios';

const BasicInformationWidget = ({ onProfilePicUpdate }) => {
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
  const [countryCode, setCountryCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [genderList, setGenderList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchGenderList();
      await fetchStudentDetails();
      await fetchCountries();
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Student data updated:', studentData);
    if (studentData.contact && studentData.country_code) {
      setPhone(`${studentData.country_code}${studentData.contact}`);
    }
    if (studentData.country) {
      const countryId = countries.find(c => c.country_name === studentData.country)?.id;
      if (countryId) fetchStates(countryId);
    }
  }, [studentData, countries]);

  useEffect(() => {
    if (studentData.state) {
      const stateId = states.find(s => s.state_name === studentData.state)?.id;
      if (stateId) fetchCities(stateId);
    }
  }, [studentData.state, states]);

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

      if (!response.ok) {
        throw new Error(`Failed to fetch student details. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Fetched student data:', responseData);

      if (!responseData.data || Object.keys(responseData.data).length === 0) {
        throw new Error('No data received from the server. Your profile might be incomplete.');
      }

      if (responseData.data) {
        // Map gender ID to name
        // Use the gender from the response directly, as it's already the core_metaName
        const genderName = responseData.data.gender || '';

        const updatedStudentData = {
          ...responseData.data,
          gender: genderName, // This is already the core_metaName, not the ID
          // contact: responseData.data.contact_number || '',
          // country_code: responseData.data.country_code || ''
        };

        console.log('Updated student data:', updatedStudentData);

        setStudentData(updatedStudentData);

        // Set phone state
        setPhone(`${updatedStudentData.country_code}${updatedStudentData.contact}`);

        // Add this line to update the profile picture
        onProfilePicUpdate(responseData.data.profilePic || '');

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in fetchStudentDetails:', error.message);
      setError(error.message || 'Error fetching student details. Please try logging out and back in.');
      setIsLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/countryList`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCountries(data.data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError('Failed to load countries. Please try again later.');
      setCountries([]);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/getState`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: countryId })
      });
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`No states found for country ID: ${countryId}`);
          setStates([]);
          return;
        }
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }
      const data = await response.json();
      setStates(data.data || []);
    } catch (error) {
      console.error('Error fetching states:', error);
      setError(`Failed to load states: ${error.message}`);
      setStates([]);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/getCities`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: stateId })
      });
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`No cities found for state ID: ${stateId}`);
          setCities([]);
          return;
        }
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }
      const data = await response.json();
      setCities(data.data || []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError(`Failed to load cities: ${error.message}`);
      setCities([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'gender') {
      const selectedGender = genderList.find(g => g.core_metaName === value);
      if (selectedGender) {
        setStudentData(prevData => ({
          ...prevData,
          gender: selectedGender.core_metaName
        }));
      }
    }
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
    const selectedCountry = countries.find(country => country.id === parseInt(e.target.value));
    setStudentData(prevData => ({
      ...prevData,
      country: selectedCountry ? selectedCountry.country_name : '',
      state: '',
      city: ''
    }));
    fetchStates(e.target.value);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const selectedState = states.find(state => state.id === parseInt(e.target.value));
    setStudentData(prevData => ({
      ...prevData,
      state: selectedState ? selectedState.state_name : '',
      city: ''
    }));
    fetchCities(e.target.value);
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find(city => city.id === parseInt(e.target.value));
    setStudentData(prevData => ({
      ...prevData,
      city: selectedCity ? selectedCity.city_name : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const submissionData = {
      name: studentData.username,
      country_code: studentData.country_code,
      contact_number: studentData.contact,
      email: studentData.email,
      first_name: studentData.firstName,
      last_name: studentData.lastName,
      country: countries.find(c => c.country_name === studentData.country)?.id.toString() || '',
      state: states.find(s => s.state_name === studentData.state)?.id.toString() || '',
      city: cities.find(c => c.city_name === studentData.city)?.id.toString() || '',
      postcode: studentData.postcode,
      ic: studentData.ic,
      address: studentData.address,
      gender: genderList.find(g => g.core_metaName === studentData.gender)?.id.toString() || '',
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
              <Col md={6} >
                <Form.Group className="mb-3 " controlId="username">
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
            <Row className="mb-3 px-0">
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
            <Row className="mb-3 px-0">
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
                    className="w-75 form-select"
                    name="gender"
                    value={studentData.gender || ''}
                    onChange={handleInputChange}
                  >
                    <option value="">Select gender</option>
                    {genderList.map((gender) => (
                      <option key={gender.id} value={gender.core_metaName} style={{ color: "#000000" }}>
                        {gender.core_metaName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 px-0">
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
            <Row>
              <Col md={11}  >
                <Form.Group className="mb-3 pe-4" controlId="address">
                  <Form.Label className="fw-bold small formlabel">Address <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    required
                    className="w-100"
                    name="address"
                    value={studentData.address || ''}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                  />
                </Form.Group>
                </Col>
            </Row>
          


          <Row className="mb-3 px-0">
            <Col md={6}>
              <Form.Group controlId="country">
                <Form.Label className="fw-bold small formlabel">Country <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  required
                  className="w-75"
                  name="country"
                  value={countries.find(c => c.country_name === studentData.country)?.id || ''}
                  onChange={handleCountryChange}
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.country_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="state">
                <Form.Label className="fw-bold small formlabel">State <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  required
                  className="w-75"
                  name="state"
                  value={states.find(s => s.state_name === studentData.state)?.id || ''}
                  onChange={handleStateChange}
                >
                  <option value="">Select state</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.state_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4 ">
            <Col md={6}>
              <Form.Group controlId="city">
                <Form.Label className="fw-bold small formlabel">City <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  required
                  className="w-75"
                  name="city"
                  value={cities.find(c => c.city_name === studentData.city)?.id || ''}
                  onChange={handleCityChange}
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.city_name}
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
            <div className="my-2">
              <Button variant="danger" type="submit" className="mpbtndiv m-0 fw-bold rounded-pill">
                Save
              </Button>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </div >
  );
};

export default BasicInformationWidget;