import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const BasicInformation = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        icNumber: '',
        gender: '',
        contactNumber: '',
        country_code: '',
        emailAddress: '',
        address: '',
        country: '',
        state: '',
        city: '',
        postcode: '',
    });
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
        if (formData.country) {
            const countryId = countries.find(c => c.country_name === formData.country)?.id;
            if (countryId) fetchStates(countryId);
        }
    }, [formData.country, countries]);

    useEffect(() => {
        if (formData.state) {
            const stateId = states.find(s => s.state_name === formData.state)?.id;
            if (stateId) fetchCities(stateId);
        }
    }, [formData.state, states]);

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
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/studentDetail`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch student details. Status: ${response.status}`);
            }
            const result = await response.json();
            if (result.success && result.data) {
                setFormData({
                    username: result.data.username || '',
                    firstName: result.data.firstName || '',
                    lastName: result.data.lastName || '',
                    icNumber: result.data.ic || '',
                    gender: result.data.gender || '',
                    contactNumber: result.data.contact || '',
                    country_code: result.data.country_code || '',
                    emailAddress: result.data.email || '',
                    address: result.data.address || '',
                    country: result.data.country || '',
                    state: result.data.state || '',
                    city: result.data.city || '',
                    postcode: result.data.postcode || '',
                });
                
            }
        } catch (error) {
            console.error('Error fetching student details:', error);
            setError('Failed to load student details. Please try again later.');
        } finally {
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setStates(data.data || []);
        } catch (error) {
            console.error('Error fetching states:', error);
            setError('Failed to load states. Please try again later.');
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCities(data.data || []);
        } catch (error) {
            console.error('Error fetching cities:', error);
            setError('Failed to load cities. Please try again later.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePhoneChange = (value, country, e, formattedValue) => {
        setFormData(prevData => ({
            ...prevData,
            contactNumber: value.slice(country.dialCode.length),
            country_code: `+${country.dialCode}`
        }));
    };

    const handleCountryChange = (e) => {
        const selectedCountry = countries.find(country => country.id === parseInt(e.target.value));
        setFormData(prevData => ({
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
        setFormData(prevData => ({
            ...prevData,
            state: selectedState ? selectedState.state_name : '',
            city: ''
        }));
        fetchCities(e.target.value);
    };

    const handleCityChange = (e) => {
        const selectedCity = cities.find(city => city.id === parseInt(e.target.value));
        setFormData(prevData => ({
            ...prevData,
            city: selectedCity ? selectedCity.city_name : ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        onSubmit(formData);
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/editStudentDetail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: formData.username,
                    country_code: formData.country_code,
                    contact_number: formData.contactNumber,
                    email: formData.emailAddress,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    country: countries.find(c => c.country_name === formData.country)?.id.toString(),
                    state: states.find(s => s.state_name === formData.state)?.id.toString(),
                    city: cities.find(c => c.city_name === formData.city)?.id.toString(),
                    postcode: formData.postcode,
                    ic: formData.icNumber,
                    address: formData.address,
                    gender: genderList.find(g => g.core_metaName === formData.gender)?.id.toString(),
                }),
            });
            const responseData = await response.json();
            if (responseData.success) {
                setSuccess('Student details updated successfully!');
                
            } else {
                setError(responseData.message || 'Failed to update student details');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setError(`Error updating student details: ${error.message}`);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="step-content-caseone p-4 rounded">
            <h3 className="border-bottom pb-2 fw-normal">Basic Information</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <div className="sap-content-caseone w-100 d-flex justify-content-center">
                <div className="sap-content-caseone w-100 py-5 px-5">
                    <div>
                        <Row className="mb-5">
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="username" className="me-2">Username<span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Enter username"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="firstName" className="me-2">First Name<span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Enter first name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="lastName" className="me-2">Last Name<span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Enter last name"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="icNumber" className="me-2">IC Number<span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="icNumber"
                                        name="icNumber"
                                        value={formData.icNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter IC number"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="gender" className="me-2">Gender<span className="text-danger">*</span></Form.Label>
                                    <Form.Select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select gender</option>
                                        {genderList.map((gender) => (
                                            <option key={gender.id} value={gender.core_metaName}>
                                                {gender.core_metaName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="contactNumber" className="me-2">Contact Number<span className="text-danger">*</span></Form.Label>
                                    <PhoneInput
                                        country={'my'}
                                        value={`${formData.country_code}${formData.contactNumber}`}
                                        onChange={handlePhoneChange}
                                        inputProps={{
                                            name: 'contactNumber',
                                            required: true,
                                            placeholder: 'Enter phone number'
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="emailAddress" className="me-2">Email Address<span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="emailAddress"
                                        name="emailAddress"
                                        value={formData.emailAddress}
                                        onChange={handleInputChange}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={12}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="address" className="me-2">Address<span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter address"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="country" className="me-2">Country<span className="text-danger">*</span></Form.Label>
                                    <Form.Select
                                        id="country"
                                        name="country"
                                        value={countries.find(c => c.country_name === formData.country)?.id || ''}
                                        onChange={handleCountryChange}
                                        required
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
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="state" className="me-2">State<span className="text-danger">*</span></Form.Label>
                                    <Form.Select
                                        id="state"
                                        name="state"
                                        value={states.find(s => s.state_name === formData.state)?.id || ''}
                                        onChange={handleStateChange}
                                        required
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
                        <Row className="mb-5">
                            <Col md={6}>
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="city" className="me-2">City<span className="text-danger">*</span></Form.Label>
                                    <Form.Select
                                        id="city"
                                        name="city"
                                        value={cities.find(c => c.city_name === formData.city)?.id || ''}
                                        onChange={handleCityChange}
                                        required
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
                                <Form.Group className="sac-form-group d-flex align-items-center">
                                    <Form.Label htmlFor="postcode" className="me-2">Postcode<span className="text-danger">*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="postcode"
                                        name="postcode"
                                        value={formData.postcode}
                                        onChange={handleInputChange}
                                        placeholder="Enter postcode"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end mt-3">
                            <button onClick={handleSubmit}  className="button-table px-5 py-1">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInformation;