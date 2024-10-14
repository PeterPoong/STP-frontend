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

const AdminAddSchoolContent = () => {
    const [schoolFeaturedList, setSchoolFeaturedList] = useState([]);
    const [categoryList, setCategoryList] = useState([]); 
    const [accountList, setAccountList] = useState([]); 
    const [countryList, setCountryList]= useState ([]);
    const [stateList, setStateList]= useState ([]);
    const [cityList, setCityList]= useState ([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact_number: "",
        country_code: "+60",
        person_in_charge_name:"",
        person_in_charge_email:"",
        person_in_charge_contact:"",
        school_website:"",
        school_address:"",
        category:"",
        account:"",
        country:"",
        state:"",
        city:"",
        password: "",
        confirm_password: "",
        school_shortDesc: "",
        school_fullDesc: "",
        location:"",
        logo: null
    });
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;
    const [coverFile, setCoverFile] = useState(null);
    const [albumFiles, setAlbumFiles] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [showCoverPreview, setShowCoverPreview] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting form data:", formData); // Debugging line
        const { name, email, logo, location, category, state, city, account, country, school_address, school_website, contact_number, person_in_charge_email, person_in_charge_name, person_in_charge_contact, country_code, confirm_password, school_shortDesc, school_fullDesc, password } = formData;
    
        console.log("Form Data being sent:", formData);
        Object.keys(formData).forEach(key => {
            console.log(`${key}: ${formData[key]}`);
        });
    
        const formPayload = new FormData();
        formPayload.append("school_address", formData.school_address);
        formPayload.append("name", name);
        formPayload.append("email", email);
        formPayload.append("country_code", country_code);
        formPayload.append("contact_number", contact_number);
        formPayload.append("person_in_charge_contact", person_in_charge_contact);
        formPayload.append("person_in_charge_name", person_in_charge_name);
        formPayload.append("person_in_charge_email", person_in_charge_email);
        formPayload.append("school_website", school_website);
        formPayload.append("school_address", school_address);
        formPayload.append("category", category);
        formPayload.append("account", account);
        formPayload.append("country", country);
        formPayload.append("state", state);
        formPayload.append("city", city);
        formPayload.append("password", password);
        formPayload.append("location", location);
        formPayload.append("confirm_password", confirm_password);
        formPayload.append("school_shortDesc", school_shortDesc);
        formPayload.append("school_fullDesc", school_fullDesc);
        console.log("Selected Features:", selectedFeatures);
    
        // Append each feature id individually to formPayload as featured[]
        selectedFeatures.forEach(feature => {
            formPayload.append("featured[]", feature);
        });
    
        if (logo) {
            formPayload.append('logo', logo);
        }
    
        // Append cover photo if available
        if (coverFile) {
            formPayload.append('cover', coverFile);
        }
    
        // Append album files if available
        albumFiles.forEach((file, index) => {
            formPayload.append(`album[${index}]`, file);
        });
    
        for (let pair of formPayload.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        try {
            console.log("FormData before submission:", formPayload);
    
            const addSchoolResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addSchool`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload, // Using FormData directly as the body
            });
    
            const addSchoolData = await addSchoolResponse.json();
    
            if (addSchoolResponse.ok) {
                console.log('School successfully registered:', addSchoolData);
                navigate('/adminSchool');
            } else {
                console.error('Validation Error:', addSchoolData.errors); // Debugging line
                throw new Error(`School Registration failed: ${addSchoolData.message}`);
            }
        } catch (error) {
            // Remove the reference to `addSchoolData` here
            setError('An error occurred during school registration. Please try again later.');
            console.error('Error during school registration:', error);
        }
    };
    
    
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/universityFeaturedList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.data) {
                    setSchoolFeaturedList(data.data);
                } else {
                    setSchoolFeaturedList([]);
                }
            } catch (error) {
                console.error('Error fetching school featured list:', error.message);
                setError(error.message);
            }
        };

        fetchFeatured();
    }, [Authenticate]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/instituteCategoryList`, {
                    method: 'POST', // Change to POST if required
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({}) // Add any necessary body data
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                if (data && data.data) {
                    setCategoryList(data.data);  // Set the category list state
                }
            } catch (error) {
                console.error('Error fetching categories:', error.message);
                setError(error.message);
            }
        };
    
        fetchCategories();
    }, [Authenticate]);
    
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/accountTypeList`, {
                    method: 'POST', // Change to POST if required
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({}) // Add any necessary body data
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                if (data && data.data) {
                    setAccountList(data.data);  // Set the category list state
                }
            } catch (error) {
                console.error('Error fetching accounts:', error.message);
                setError(error.message);
            }
        };
    
        fetchAccounts();
    }, [Authenticate]);

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
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
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
    
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);
    
    const handleEditorChange = (content) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            school_fullDesc: content,
        }));
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

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => setCoverFile(acceptedFiles[0])
    });

    const { getRootProps: getAlbumRootProps, getInputProps: getAlbumInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => setAlbumFiles(prevFiles => [...prevFiles, ...acceptedFiles])
    });

    const handleRemoveCover = () => setCoverFile(null);

    const handleRemoveAlbum = async (fileToRemove) => {
        if (fileToRemove.id) {
            console.log('Removing photo with id:', fileToRemove.id);
            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/admin/removeSchoolPhoto`;
            console.log('API URL:', apiUrl); // Log the full API URL
            
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id: fileToRemove.id })
                });
    
                console.log('Response status:', response.status); // Log response status
    
                // Check if response is HTML
                const contentType = response.headers.get('content-type');
                console.log('Response content type:', contentType);
                
                if (!response.ok) {
                    if (contentType && contentType.includes('text/html')) {
                        const htmlText = await response.text();
                        console.error('HTML error response:', htmlText);
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('API response:', data);
    
                if (data.success) {
                    setAlbumFiles(prevFiles => prevFiles.filter(file => file.id !== fileToRemove.id));
                    alert('Photo deleted successfully');
                } else {
                    alert('Failed to delete photo');
                }
            } catch (error) {
                console.error('Error removing photo:', error);
            }
        } else {
            // Newly uploaded file, just remove it locally
            setAlbumFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
        }
    };
    const handleShowPreview = (file) => {
        setPreviewFile(file.location || URL.createObjectURL(file));
        setShowPreview(true);
      };
      

      const handleShowCoverPreview = () => {
        if (coverFile) {
          setPreviewFile(coverFile.location || URL.createObjectURL(coverFile));
          setShowCoverPreview(true);
        }
      };
      
      const handleClosePreview = () => setShowPreview(false);
      const handleCloseCoverPreview = () => {
          setShowCoverPreview(false);
        };
    const formFields = [
        {
            id: "name",
            label: "School Name",
            type: "text",
            placeholder: "Enter school name",
            value: formData.name,
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

    const formPersonInCharge=[
        {
            id: "person_in_charge_name",
            label: "Person in Charge's Name",
            type: "text",
            placeholder: "Enter name",
            value: formData.person_in_charge_name,
            onChange: handleFieldChange,
            required: true
        },
        {
            id: "person_in_charge_email",
            label: "Person in Charge's Email Address",
            type: "email",
            placeholder: "Enter email address",
            value: formData.person_in_charge_email,
            onChange: handleFieldChange,
            required: true,
            autoComplete: "off"
        },
    ];

    const formWebsite=[
        {
            id: "school_website",
            label: "Official Website",
            type: "text",
            placeholder: "Enter Website URL",
            value: formData.school_website,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formAddress = [
        {
            id: "location",
            label: "School Location (Google Map URL)",
            type: "text",
            placeholder: "Enter School Location",
            value: formData.location,
            onChange: handleFieldChange,
            required: true
        },
        {
            id: "school_address",
            label: "School Full Address",
            type: "text",
            placeholder: "Enter School Address",
            value: formData.school_address,
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

    const formTextarea = [
        {
            id: "school_shortDesc",
            label: "Short Description",
            as: "textarea",
            rows: 3,
            placeholder: "Enter short description",
            value: formData.school_shortDesc,
            onChange: handleFieldChange,
            required: true
        },
    ];

    const formCategory = [
        {
            id: "category",
            label: "Institute Category",
            value: formData.category,
            onChange: handleFieldChange,
            required: true,
            options: categoryList.map(category => ({
                label: category.name,
                value: category.id
            }))
        }
    ];

    const formAccount = [
        {
            id: "account",
            label: "School Account Type",
            value: formData.account,
            onChange: handleFieldChange,
            required: true,
            options: accountList.map(account => ({
                label: account.name,
                value: account.id
            }))
        }
    ];
    
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
      

    const formHTML = [
        {
            id: "school_fullDesc",
            label: "Full Description",
            value: formData.school_fullDesc,
            onChange: handleEditorChange,
            required: true
        }
    ];

    const formCheckboxes = schoolFeaturedList.map((feature) => ({
        id: `feature-${feature.id}`,
        label: feature.name,
        value: feature.id,
        checked: selectedFeatures.includes(feature.id),
        onChange: handleFeatureChange,
    }));

    const buttons = [
        {
            label: "SAVE",
            type: "submit"
        }
    ];

    return (
        
                <Container fluid className="admin-add-school-container">
                    <AdminFormComponent
           formTitle="School Information"
           checkboxTitle="School Advertising Feature"
           formFields={formFields}
           formPassword={formPassword}
           formTextarea={formTextarea}
           formHTML={formHTML}
           formCountry={formCountry}
           shouldRenderPasswordCard={shouldRenderPasswordCard}
           formCategory={formCategory}
           formAccount={formAccount}
           formWebsite={formWebsite}
           formAddress={formAddress}
           onSubmit={handleSubmit}
           formCheckboxes={formCheckboxes}
           formPersonInCharge={formPersonInCharge}
           error={error}
           buttons={buttons}
           logo={formData.logo ? URL.createObjectURL(formData.logo) : null}
           handleLogoChange={handleLogoChange}
           handlePhoneChange={handlePhoneChange}  
           phone={formData.contact_number} 
           personPhone={formData.person_in_charge_contact}  
           country_code={formData.country_code}

           handleShowCoverPreview={handleShowCoverPreview}
        showUploadFeature={true}
        coverUploadProps={getCoverRootProps()}
        coverInputProps={getCoverInputProps()}
        coverFile={coverFile}
        handleRemoveCover={handleRemoveCover}
        albumUploadProps={getAlbumRootProps()}
        albumInputProps={getAlbumInputProps()}
        albumFiles={albumFiles}
        handleRemoveAlbum={handleRemoveAlbum}
        handleShowPreview={handleShowPreview}
        handleClosePreview={handleClosePreview}
        handleCloseCoverPreview={handleCloseCoverPreview}
        showPreview={showPreview}
        showCoverPreview={showCoverPreview}
        previewFile={previewFile}
        setCoverFile={setCoverFile}
        setAlbumFiles={setAlbumFiles}
                />
                 {!passwordsMatch && (
                <div className="text-danger">
                    Passwords do not match.
                </div>
            )}
                </Container>
    );
};

export default AdminAddSchoolContent;
