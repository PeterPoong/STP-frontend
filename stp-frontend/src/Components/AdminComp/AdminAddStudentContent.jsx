import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal } from "react-bootstrap";
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
        category:"",
        country:"",
        state:"",
        city:"",
        password: "",
        confirm_password: "",
    });
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting form data:", formData); // Debugging line
        const { name, first_name, last_name, gender, ic, postcode, email, state, city, country, contact_number,  country_code, confirm_password, password } = formData;
        
        const formPayload = new FormData();
        formPayload.append("name", name);
        formPayload.append("first_name", first_name);
        formPayload.append("last_name", last_name);
        formPayload.append("gender", gender);
        formPayload.append("ic", ic);
        formPayload.append("postcode", postcode);
        formPayload.append("email", email);
        formPayload.append("country_code", country_code);
        formPayload.append("contact_number", contact_number);
        formPayload.append("country", country);
        formPayload.append("state", state);
        formPayload.append("city", city);
        formPayload.append("password", password);
        formPayload.append("confirm_password", confirm_password);

        try {
            console.log("FormData before submission:", formPayload);
            
            const addStudentResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addStudent`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload, // Using FormData directly as the body
            });
    
            const addStudentData = await addStudentResponse.json();
    
            if (addStudentResponse.ok) {
                console.log('Student successfully registered:', addStudentData);
                navigate('/adminStudent');
            } else {
                console.error('Validation Error:', addStudentData.errors); // Debugging line
                throw new Error(`Student Registration failed: ${addStudentData.message}`);
            }
        } catch (error) {
            setError('An error occurred during Student registration. Please try again later.');
            console.error('Error during Student registration:', error);
        }
    };
    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/genderList`, {
                    method: 'GET',  // Use GET method
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data && data.data) {
                    setGenderList(data.data.map(gender => ({
                        label: gender.core_metaName,  // Adjust based on your API response structure
                        value: gender.id
                    })));
                }
            } catch (error) {
                console.error('Error fetching genders:', error.message);
                setError(error.message);
            }
        };

        fetchGenders();
    }, [Authenticate]);

    

    console.log(`${import.meta.env.VITE_BASE_URL}api/student/countryList`);
    // Fetch country list (GET request)
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
          }
        })
        .catch(error => console.error('Error fetching countries:', error));
    }, []);
  
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
        } else {
          setCityList([]);
        }
      })
      .catch(error => console.error('Error fetching cities:', error));
  };

    const handlePhoneChange = (value, country, field) => {
        setFormData(prevFormData => {
            if (field === "contact_number") {
                return {
                    ...prevFormData,
                    contact_number: value.slice(country.dialCode.length), // Update contact_number
                    country_code: `+${country.dialCode}`, // Update country code
                };
            }
        });
    };
  
    const handleFieldChange = (e) => {
        const { id, value, type, files } = e.target;
        console.log('Field changed:', { id, value, type, files }); // Debugging line
    
        if (type === "file") {
            setFormData(prev => ({
                ...prev,
                [id]: files[0]
            }));
        } else if (type === "radio") {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };
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
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);
    const formFields = [
        {
            id: "name",
            label: "Username",
            type: "text",
            placeholder: "Enter student username",
            value: formData.name,
            onChange: handleFieldChange,
            required: true
        },
        {
            id: "first_name",
            label: "First Name",
            type: "text",
            placeholder: "Enter student first name",
            value: formData.first_name,
            onChange: handleFieldChange,
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
    ];

    const formRadio = [
        {
            id: "gender",
            label: "Gender",
            type: "radio",
            options: genderList,  // Ensure genderList contains objects with label and value
            value: formData.gender,
            onChange: handleFieldChange,
            required: true
        },
    ];
    const formName = [
        {
            id: "last_name",
            label: "Last Name",
            type: "text",
            placeholder: "Enter student last name",
            value: formData.last_name,
            onChange: handleFieldChange,
            required: true
        },
        {
            id: "postcode",
            label: "Postcode",  // Updated label to match the field
            type: "text",
            placeholder: "Enter postcode",
            value: formData.postcode,
            onChange: handleFieldChange,
            required: true
        }
    ];
    
    const formPassword = [
        {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter new password",
            value: formData.password,
            onChange: handleFieldChange,
            required: true,
            autoComplete: "new-password"
        },
        {
            id: "confirm_password",
            label: "Confirm Password",
            type: "password",
            placeholder: "Enter password again",
            value: formData.confirm_password,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formStudentCountry = [
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
                formRadio={formRadio}
                formName={formName}
                formPassword={formPassword}
                formStudentCountry={formStudentCountry}
                onSubmit={handleSubmit}
                error={error}
                buttons={buttons}
                handleFieldChange={handleFieldChange}
                handlePhoneChange={handlePhoneChange}  
                phone={formData.contact_number} 
                country_code={formData.country_code}
                />
                </Container>
    );
};

export default AdminAddStudentContent;
