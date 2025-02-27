import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from './SkeletonLoader';
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import 'react-phone-input-2/lib/style.css';
import ErrorModal from "./Error";

const AdminEditStudentContent = () => {
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
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const studentId = sessionStorage.getItem('studentId');
    const fetchStudentDetails = async () => {
      const studentId = sessionStorage.getItem('studentId');
            if (!studentId) {
                setGeneralError('No student ID found in session storage.');
                setErrorModalVisible(true);
                setLoading(false);
                return;
            }
      try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/studentDetail`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': Authenticate,
              },
              body: JSON.stringify({ id: studentId })
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch student details. HTTP status: ${response.status}`);
          }

          const data = await response.json();
          const studentDetails = data.data;
          const newFieldErrors = {};
          if (studentDetails) {
              setFormData({
                  name: studentDetails.name,
                  first_name: studentDetails.first_name|| "",
                  last_name: studentDetails.last_name|| "",
                  ic: studentDetails.ic|| "",
                  email: studentDetails.email,
                  country_code: studentDetails.country_code,
                  contact_number: studentDetails.contact_number,
                  gender: studentDetails.gender_id,
                  address: studentDetails.address,
                  country: studentDetails.country,
                  state: studentDetails.state,
                  city: studentDetails.city,
                  postcode: studentDetails.postcode,
              });
              if (studentDetails.country) {
                try {
                    await fetchStates(studentDetails.country);
                } catch {
                    newFieldErrors.state = 'Error fetching states based on country.';
                }
            }
            if (studentDetails.state) {
              try {
                  await fetchCities(studentDetails.state);
              } catch {
                  newFieldErrors.city = 'Error fetching cities based on state.';
              }
          }
          setFieldErrors(newFieldErrors);
              if (Object.keys(newFieldErrors).length > 0) {
                  setErrorModalVisible(true);
              }
          } else {
            setGeneralError(data.message || 'Failed to load student details data.');
            setErrorModalVisible(true);
          }
      } catch (error) {
        setGeneralError(error.message || 'An error occurred while fetching student details.');
        setErrorModalVisible(true);
      }finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!studentId) {
        console.error("StudentID is not available in sessionStorage");
        return;
    }

    fetchStudentDetails();
}, [studentId, Authenticate]);

  const fieldLabels = {
    name:"Student Name",
    first_name:"Student Firstname",
    last_name:"Student lastname",
    gender:"Gender",
    ic:"New Identity Card No.",
    postcode:"Postcode",
    email:"Email Address",
    state: "State", 
    city:"City", 
    country:"Country", 
    address:"Full Address", 
    contact_number: "Contact Number", 
    country_code: "Country Code",
    confirm_password:"Confirm Password",
    password:"Password"
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const {
      name,
      first_name,
      last_name,
      gender,
      ic,
      postcode,
      email,
      state,
      city,
      country,
      address,
      contact_number,
      country_code,
      confirm_password,
      password,
    } = formData;
  
    if (!name || !email) {
      setError("Please fill in all required fields.");
      setErrorModalVisible(true);
      return; // Stop form submission if any required field is missing
    }
  
    // Convert strings to integers where needed
    const cityInt = city ? parseInt(city, 10) : null;
    const genderInt = gender ? parseInt(gender, 10) : null;
    const stateInt = state ? parseInt(state, 10) : null;
    const countryInt = country ? parseInt(country, 10) : null;
  
    const formPayload = new FormData();
  
    // Append non-empty fields dynamically
    const fields = {
      id: studentId,
      name,
      first_name,
      last_name,
      ic,
      postcode,
      gender: genderInt,
      email,
      country_code,
      contact_number,
      country: countryInt,
      state: stateInt,
      city: cityInt,
      address,
      password,
      confirm_password,
    };
  
    Object.entries(fields).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formPayload.append(key, value);
      }
    });
  
    try {
      const addStudentResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/admin/editStudent`,
        {
          method: "POST",
          headers: {
            Authorization: Authenticate,
          },
          body: formPayload,
        }
      );
  
      const addStudentData = await addStudentResponse.json();
  
      if (addStudentResponse.ok) {
        console.log("Student successfully registered:", addStudentData);
        navigate("/adminStudent");
      } else if (addStudentResponse.status === 422) {
        // Validation errors
        console.log("Validation Errors:", addStudentData.errors);
        setFieldErrors(addStudentData.errors); // Pass validation errors to the modal
        setGeneralError(addStudentData.message || "Validation Error");
        setErrorModalVisible(true); // Show the error modal
      } else {
        setGeneralError(addStudentData.message || "Failed to edit student details.");
        setErrorModalVisible(true);
      }
    } catch (error) {
      setGeneralError(
        error.message || "An error occurred while editing the student. Please try again later."
      );
      setErrorModalVisible(true);
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

    // console.log(`${import.meta.env.VITE_BASE_URL}api/student/countryList`);
    // Fetch country list (GET request)
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
        // console.log("Countries fetched: ", data.data);
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

// Fetch cities when state changes
useEffect(() => {
  if (formData.state) {
    fetchCities(formData.state);
  }
}, [formData.state]);

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
        // console.log(`Field ${id} updated with value: ${value}`); // Debugging line
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
        state: '',  // Reset state and city when a new country is selected
        city: ''
      });
      if (countryId) {
        fetchStates(countryId);  // Fetch states based on the selected country
      }
    };
    
    
    // Handle state change
    const handleStateChange = (e) => {
      const stateId = e.target.value;
      setFormData({
        ...formData,
        state: stateId,
        city: ''  // Reset city when a new state is selected
      });
      if (stateId) {
        fetchCities(stateId);  // Fetch cities based on the selected state
      }
    };
    
    // Handle city change
    const handleCityChange = (e) => {
      const cityId = e.target.value;
      setFormData({
        ...formData,
        city: cityId  // Just update the city when changed
      });
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
        },
        {
          id: "first_name",
          label: "Student firstname",
          type: "text",
          placeholder: "Enter firstname",
          value: formData.first_name,
          onChange: handleFieldChange,
      },
    
      
    ];
    const formGender = [
      {
          id: "gender",
          label: "Gender",
          value: formData.gender,
          onChange: handleFieldChange,
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
    },
          {
            id: "ic",
            label: "New Identity Card No.",
            type: "text",
            placeholder: "Enter New IC number",
            value: formData.ic,
            onChange: handleICChange,
        },
        {
          id: "email",
          label: "Email Address",
          type: "email",
          placeholder: "Enter email address",
          value: formData.email,
          onChange: handleFieldChange,
          autoComplete: "off"
      },
      {
        id: "postcode",
        label: "Postcode",
        type: "text",
        placeholder: "Enter postcode",
        value: formData.postcode,
        onChange: handleFieldChange,
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
        },
    ];
    

    
    const formPassword = [
      {
          id: "password",
          label: "New Password",
          type: showPassword ? "text" : "password",
          placeholder: "Enter new password",
          value: formData.password,
          onChange: handleFieldChange,
          autoComplete: "new-password",
          toggleVisibility: togglePasswordVisibility,
          showVisibility: showPassword,
          helperText: "If you wish to keep the current password, leave this field empty." // Add this line
      },
      {
          id: "confirm_password",
          label: "Confirm Password",
          type: showConfirmPassword ? "text" : "password",
          placeholder: "Enter password again",
          value: formData.confirm_password,
          onChange: handleFieldChange,
          toggleVisibility: toggleConfirmPasswordVisibility,
          showVisibility: showConfirmPassword
      }
  ];
  
  const shouldRenderPasswordCard = formPassword && formPassword.length > 0;
  const formCountry = [
    {
      id: "country",
      label: "Country",
      value: formData.country,  // Existing country value
      onChange: handleCountryChange,
      options: countryList.map(country => ({
        label: country.country_name,
        value: country.id
      })),
      placeholder: "Select Country"
    },
    {
      id: "state",
      label: "State",
      value: formData.state,  // Existing state value
      onChange: handleStateChange,
      options: stateList.map(state => ({
        label: state.state_name,
        value: state.id
      })),
      placeholder: "",
      disabled: !formData.country  // Disable state field until a country is selected
    },
    {
      id: "city",
      label: "City",
      value: formData.city,  // Existing city value
      onChange: handleCityChange,
      options: cityList.map(city => ({
        label: city.city_name,
        value: city.id
      })),
      placeholder: "",
      disabled: !formData.state  // Disable city field until a state is selected
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
                <ErrorModal
                errorModalVisible={errorModalVisible}
                setErrorModalVisible={setErrorModalVisible}
                generalError={generalError || error} // Ensure `generalError` or fallback to `error`
                fieldErrors={fieldErrors}
                fieldLabels={fieldLabels}
            />
           {loading ? (
                    <SkeletonLoader />
                ) : (
           <AdminFormComponent
           formTitle="Student Information"
           formFields={formFields}
           shouldRenderPasswordCard={shouldRenderPasswordCard}
           formPassword={formPassword}
           formCountry={formCountry}
           formAddress={formAddress}
           formGender={formGender}
           onSubmit={handleSubmit}
           formPersonInCharge={formPersonInCharge}
           error={error}
           buttons={buttons}
           handlePhoneChange={handlePhoneChange}  
           phone={formData.contact_number} 
           country_code={formData.country_code}
           handleRadioChange={handleRadioChange}
           formData={formData}
                />
          )}
            {!passwordsMatch && (
              <div className="text-danger">
                  Passwords do not match.
              </div>
            )}
      </Container>
    );
};

export default AdminEditStudentContent;
