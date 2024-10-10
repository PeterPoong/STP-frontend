import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { FaTrashAlt } from 'react-icons/fa';

const AdminAddStudentContent = () => {
    const [genderList, setGenderList] = useState([]); 
    const [countryList, setCountryList]= useState ([]);
    const [stateList, setStateList]= useState ([]);
    const [cityList, setCityList]= useState ([]);
    const [formData, setFormData] = useState({
        name: "",
        first_name:"",
        last_name:"",
        gender:"",
        ic:"",
        postcode:"",
        email: "",
        contact_number: "",
        country_code: "+60",
        address:"",
        country:"",
        state:"",
        city:"",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Submitting form data:", formData);
  
      const { name, first_name, last_name, gender, ic, postcode, email, state, city, country, address, contact_number, country_code, confirm_password, password } = formData;
  
      // Convert strings to integers where needed
      const icInt = parseInt(ic, 10);
      const cityInt = parseInt(city, 10);
      const genderInt = parseInt(gender, 10);
      const stateInt = parseInt(state, 10);
      const countryInt = parseInt(country, 10);
  
      if ( isNaN(cityInt) || isNaN(genderInt) || isNaN(stateInt) || isNaN(countryInt)) {
          setError("Some fields must be valid integers.");
          return;
      }
  
      const formPayload = new FormData();
      formPayload.append("address", address);
      formPayload.append("name", name);
      formPayload.append("first_name", first_name);
      formPayload.append("last_name", last_name);
      formPayload.append("ic", ic);
      formPayload.append("postcode", postcode);
      formPayload.append("gender", genderInt);
      formPayload.append("email", email);
      formPayload.append("country_code", country_code);
      formPayload.append("contact_number", contact_number);
      formPayload.append("country", countryInt);
      formPayload.append("state", stateInt);
      formPayload.append("city", cityInt);
      formPayload.append("password", password);
      formPayload.append("confirm_password", confirm_password);
  
      try {
          console.log("FormData before submission:", formPayload);
  
          const addStudentResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addStudent`, {
              method: 'POST',
              headers: {
                  'Authorization': Authenticate,
              },
              body: formPayload,
          });
  
          const addStudentData = await addStudentResponse.json();
  
          if (addStudentResponse.ok) {
              console.log('Student successfully registered:', addStudentData);
              navigate('/adminStudent');
          } else {
              console.error('Validation Error:', addStudentData.errors);
              throw new Error(`Student Registration failed: ${addStudentData.message}`);
          }
      } catch (error) {
          setError('An error occurred during student registration. Please try again later.');
          console.error('Error during student registration:', error);
      }
  };
  
    useEffect(() => {
      const fetchGenders = async () => {
          try {
              const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/genderList`, {
                  method: 'GET', // Use GET method
                  headers: {
                      'Content-Type': 'application/json',
                      
                  },
                  
              });
  
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
  
              const data = await response.json();
              if (data && data.data) {
                  setGenderList(data.data);  // Set the category list state
              }
          } catch (error) {
              console.error('Error fetching genders:', error.message);
              setError(error.message);
          }
      };
  
      fetchGenders();
  }, []);

    // Fetch country list on mount
useEffect(() => {
  fetch(`${import.meta.env.VITE_BASE_URL}api/student/countryList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setCountryList(data.data);
        console.log("Countries fetched: ", data.data);

        // Set default country to Malaysia (ID = 132) if no country is selected
        if (!formData.country) {
          setFormData(prevFormData => ({
            ...prevFormData,
            country: '132' // Set Malaysia as the default country
          }));
        }
      }
    })
    .catch(error => console.error('Error fetching countries:', error));
}, []);

// Fetch states when country changes
useEffect(() => {
  if (formData.country) {
    fetchStates(formData.country);
  }
}, [formData.country]);

// Fetch states (POST request)
const fetchStates = (countryId) => {
  fetch(`${import.meta.env.VITE_BASE_URL}api/getState`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: countryId }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setStateList(data.data);
        
        // If the first state is fetched, automatically fetch cities for it
        if (data.data.length > 0) {
          const firstStateId = data.data[0].id; // Assuming the state object has an 'id' property
          setFormData(prevFormData => ({
            ...prevFormData,
            state: firstStateId,
            city: '' // Reset city
          }));
          fetchCities(firstStateId); // Fetch cities for the first state
        }
      } else {
        setStateList([]);
      }
    })
    .catch(error => console.error('Error fetching states:', error));
};

// Fetch cities (POST request)
const fetchCities = (stateId) => {
  fetch(`${import.meta.env.VITE_BASE_URL}api/getCities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: stateId }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setCityList(data.data);
        
        // Set the first city as the default if cities are fetched
        if (data.data.length > 0) {
          setFormData(prevFormData => ({
            ...prevFormData,
            city: data.data[0].id // Assuming the city object has an 'id' property
          }));
        }
      } else {
        setCityList([]);
      }
    })
    .catch(error => console.error('Error fetching cities:', error));
};

  useEffect(() => {
    setPasswordsMatch(formData.password === formData.confirm_password);
}, [formData.password, formData.confirm_password]);

    const handleFeatureChange = (event) => {
        const featureId = parseInt(event.target.value);
        setSelectedFeatures(prevFeatures => {
            if (prevFeatures.includes(featureId)) {
                return prevFeatures.filter(id => id !== featureId);
            } else {
                return [...prevFeatures, featureId];
            }
        });
    };

    const handlePhoneChange = (value, country, field) => {
        setFormData(prevFormData => {
            if (field === "contact_number") {
                return {
                    ...prevFormData,
                    contact_number: value.slice(country.dialCode.length), // Update contact_number
                    country_code: `+${country.dialCode}`, // Update country code
                };
            } else if (field === "person_in_charge_contact") {
                return {
                    ...prevFormData,
                    person_in_charge_contact: value, // Update person_in_charge_contact
                };
            }
        });
    };
  
    const handleFieldChange = (e) => {
        const { id, value, type, files } = e.target;
        console.log(`Field ${id} updated with value: ${value}`); // Debugging line
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

    const handleICChange = (e) => {
      const value = e.target.value;
      // Check if the value contains only digits and doesn't exceed 12 characters
      if (/^\d{0,12}$/.test(value)) {
          handleFieldChange(e); // Update the form state only if valid
      }
  };
    
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);
    
    const handleCountryChange = (e) => {
        const countryId = e.target.value;
        setFormData({
          ...formData,
          country: countryId,
          state: '',
          city: ''
        });
        fetchStates(countryId); // Fetch states when country changes
      };
      
      const handleStateChange = (e) => {
        const stateId = e.target.value;
        setFormData({
          ...formData,
          state: stateId,
          city: ''
        });
        fetchCities(stateId); // Fetch cities when state changes
      };
      
    // Handle city change
    const handleCityChange = (e) => {
      setFormData({ ...formData, city: e.target.value });
    };

  // Handle radio button change
  const handleRadioChange = (radioId, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [radioId]: value,
    }));
  };
    const formFields = [
        {
            id: "name",
            label: "Student Username",
            type: "text",
            placeholder: "Enter username",
            value: formData.name,
            onChange: handleFieldChange,
            required: true
        },
        {
          id: "first_name",
          label: "Student firstname",
          type: "text",
          placeholder: "Enter firstname",
          value: formData.first_name,
          onChange: handleFieldChange,
          required: true
      },
    
      
    ];
    const formGender = [
      {
          id: "gender",
          label: "Gender",
          value: formData.gender,
          onChange: handleFieldChange,
          required: true,
          options: genderList.map(gender => ({
              label: gender.core_metaName,
              value: gender.id
          }))
      }
  ];
    const formPersonInCharge=[
      {
        id: "last_name",
        label: "Student lastname",
        type: "text",
        placeholder: "Enter lastname",
        value: formData.last_name,
        onChange: handleFieldChange,
        required: true
    },
        {
            id: "ic",
            label: "New Identity Card No.",
            type: "text",
            placeholder: "Enter New IC number",
            value: formData.ic,
            onChange: handleICChange,
            required: true
        },
        {
          id: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter email address",
          value: formData.email,
          onChange: handleFieldChange,
          required: true,
          autoComplete: "off"
      },
      {
        id: "postcode",
        label: "Postcode",
        type: "text",
        placeholder: "Enter postcode",
        value: formData.postcode,
        onChange: handleFieldChange,
        required: true,
        autoComplete: "off"
    },
    ];

    const formAddress = [
        {
            id: "address",
            label: "Full Address",
            type: "text",
            placeholder: "Enter Address",
            value: formData.address,
            onChange: handleFieldChange,
            required: true
        },
    ];
    

    
    const formPassword = [
        {
            id: "password",
            label: "Password",
            type: showPassword ? "text" : "password",
            placeholder: "Enter new password",
            value: formData.password,
            onChange: handleFieldChange,
            required: true,
            autoComplete: "new-password",
            toggleVisibility: togglePasswordVisibility,
            showVisibility: showPassword,
             helperStar:"*"
        },
        {
            id: "confirm_password",
            label: "Confirm Password",
            type: showConfirmPassword ? "text" : "password",
            placeholder: "Enter password again",
            value: formData.confirm_password,
            onChange: handleFieldChange,
            required: true,
            toggleVisibility: toggleConfirmPasswordVisibility,
            showVisibility: showConfirmPassword,
             helperStar:"*"
        }
    ];
    const shouldRenderPasswordCard = formPassword && formPassword.length > 0;
    const formCountry = [
        {
          id: "country",
          label: "Country",
          value: formData.country,
          onChange: handleCountryChange,
          required: true,
          options: countryList.map(country => ({
            label: country.country_name,
            value: country.id
          })),
          placeholder: "Select Country"
        },
        {
          id: "state",
          label: "State",
          value: formData.state,
          onChange: handleStateChange,
          required: true,
          options: stateList.map(state => ({
            label: state.state_name,
            value: state.id
          })),
          placeholder: "" // Placeholder hidden
        },
        {
          id: "city",
          label: "City",
          value: formData.city,
          onChange: handleCityChange,
          required: true,
          options: cityList.map(city => ({
            label: city.city_name,
            value: city.id
          })),
          placeholder: "" // Placeholder hidden
        }
      ];

    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        
                <Container fluid className="admin-add-student-container">
                    <AdminFormComponent
           formTitle="Student Information"
           formFields={formFields}
           formPassword={formPassword}
           formCountry={formCountry}
           formAddress={formAddress}
           formGender={formGender}
           onSubmit={handleSubmit}
           formPersonInCharge={formPersonInCharge}
           error={error}
           shouldRenderPasswordCard={shouldRenderPasswordCard}
           buttons={buttons}
           handlePhoneChange={handlePhoneChange}  
           phone={formData.contact_number} 
           country_code={formData.country_code}
           handleRadioChange={handleRadioChange}
           formData={formData}
                />
                 {!passwordsMatch && (
                <div className="text-danger">
                    Passwords do not match.
                </div>
            )}
                </Container>
    );
};

export default AdminAddStudentContent;
