import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import AdminFormComponent from './AdminFormComponent';
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AdminEditSchoolContent = () => {
    const [schoolFeaturedList, setSchoolFeaturedList] = useState([]);
    const [categoryList, setCategoryList] = useState([]); 
    const [logo, setLogo] = useState(null);
    const [newLogo, setNewLogo] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact_number: "",
        country_code: "+60",
        person_in_charge_name: "",
        person_in_charge_email: "",
        person_in_charge_contact: "",
        school_website: "",
        category: "",
        password: "",
        confirm_password: "",
        school_shortDesc: "",
        school_fullDesc: "",
        school_address:"",
        location:"",
        country:"",
        logo:null
    });
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the school ID from URL
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
    const [accountList, setAccountList] = useState([]); 
    const [countryList, setCountryList]= useState ([]);
    const [stateList, setStateList]= useState ([]);
    const [cityList, setCityList]= useState ([]);
    const schoolId = sessionStorage.getItem('schoolId');
    useEffect(() => {
        const fetchSchoolDetails = async () => {
            const schoolId = sessionStorage.getItem('schoolId');
        
            if (!schoolId) {
                setError('No school ID found in session storage.');
                return;
            }
        
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id: schoolId })
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
        
                if (data.success) {
                    const schoolDetails = data.data;
        
                    // Separate media into cover photo and album
                    let coverFile = null;
                    const albumFiles = [];
        
                    schoolDetails.media.forEach(media => {
                        if (media.schoolMedia_type === 66) {
                            coverFile = {
                                name: media.schoolMedia_name,
                                location: `${import.meta.env.VITE_BASE_URL}storage/${media.schoolMedia_location}`
                            };
                        } else if (media.schoolMedia_type === 67) {
                            albumFiles.push({
                                id: media.id, // store the photo ID
                                name: media.schoolMedia_name,
                                location: `${import.meta.env.VITE_BASE_URL}storage/${media.schoolMedia_location}`
                            });
                        }
                    });

                // // Log the separated cover file and album files
                // console.log('Cover file:', coverFile);
                // console.log('Album files:', albumFiles);
        
                    setFormData({
                        name: schoolDetails.name || '',
                        email: schoolDetails.email || '',
                        contact_number: schoolDetails.contact_number || '',
                        country_code: schoolDetails.country_code || '',
                        person_in_charge_name: schoolDetails.PIC_name || '',
                        person_in_charge_email: schoolDetails.PIC_email || '',
                        person_in_charge_contact: schoolDetails.PIC_number || '',
                        school_website: schoolDetails.school_website || '',
                        school_address: schoolDetails.school_address || '',
                        category: schoolDetails.category || '',
                        account: schoolDetails.account || '',
                        password: '', 
                        confirm_password: '',
                        location: schoolDetails.location || '',
                        school_shortDesc: schoolDetails.shortDescription || '',
                        school_fullDesc: schoolDetails.fullDescription || '',
                        country: schoolDetails.country_id || '',
                        state: schoolDetails.state_id || '',
                        city: schoolDetails.city_id || '',
                        logo: schoolDetails.logo ? `${import.meta.env.VITE_BASE_URL}storage/${schoolDetails.logo}` : null
                    });
        
                    setLogo(schoolDetails.logo ? `${import.meta.env.VITE_BASE_URL}storage/${schoolDetails.logo}` : null);
                    setSelectedFeatures(schoolDetails.schoolFeatured.map(feature => feature.featured_type));
        
                    // setCoverFile(schoolDetails.coverFile || null);
                    // setAlbumFiles(schoolDetails.albumFiles || []);
                    setCoverFile(coverFile);
                    setAlbumFiles(albumFiles);
                    // Fetch states and cities after setting the country and state
                    if (schoolDetails.country_id) {
                        await fetchStates(schoolDetails.country_id); // Fetch states based on country
                    }
                    
                    if (schoolDetails.state_id) {
                        await fetchCities(schoolDetails.state_id); // Fetch cities based on state
                    }
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('An error occurred while fetching school details.');
                console.error('Error fetching school details:', error);
            }
        };
        
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

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/instituteCategoryList`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({})
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data && data.data) {
                    setCategoryList(data.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error.message);
                setError(error.message);
            }
        };

        fetchSchoolDetails();
        fetchFeatured();
        fetchCategories();
    }, [id, Authenticate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("Submitting form data:", formData); // Debugging line
    
        const schoolId = sessionStorage.getItem('schoolId'); // Retrieve schoolId from sessionStorage
        if (!schoolId) {
            console.error('School ID is not found in sessionStorage.');
            return;
        }
    
        const { name, email, category,  location, state, city, account, country, school_address, school_website, contact_number, person_in_charge_email, person_in_charge_name, person_in_charge_contact, country_code, confirm_password, school_shortDesc, school_fullDesc, password } = formData;
        
        const formPayload = new FormData();
        formPayload.append("id", schoolId); // Include the school ID
        formPayload.append("school_address", school_address);
        formPayload.append("name", name);
        formPayload.append("email", email);
        formPayload.append("country_code", country_code);
        formPayload.append("contact_number", contact_number);
        formPayload.append("person_in_charge_contact", person_in_charge_contact);
        formPayload.append("person_in_charge_name", person_in_charge_name);
        formPayload.append("person_in_charge_email", person_in_charge_email);
        formPayload.append("school_website", school_website);
        formPayload.append("location", location);
        formPayload.append("category", category);
        formPayload.append("account", account);
        formPayload.append("country", country);
        formPayload.append("state", state);
        formPayload.append("city", city);
        formPayload.append("password", password);
        formPayload.append("confirm_password", confirm_password);
        formPayload.append("school_shortDesc", school_shortDesc);
        formPayload.append("school_fullDesc", school_fullDesc);
        
        // Append each feature id individually to formPayload as featured[]
        selectedFeatures.forEach(feature => {
            formPayload.append("featured[]", feature);
        });
          // Append the icon if it exists
       // Only append the new logo if one is selected
       if (formData.logo instanceof File) {
        formPayload.append("logo", formData.logo); // New logo file
    }
    if (coverFile && coverFile.type && coverFile.type.startsWith('image/')) {
        formPayload.append('cover', coverFile);
    }
    
    if (albumFiles && albumFiles.length > 0) {
        albumFiles.forEach((file, index) => {
            if (file && file.type && file.type.startsWith('image/')) {  // Check if file exists and is an image
                formPayload.append(`album[${index}]`, file);
            }
        });
    }
    

        try {
            console.log("FormData before submission:", formPayload);
            
            const editSchoolResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/editSchool`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload, // Using FormData directly as the body
            });
        
            const editSchoolData = await editSchoolResponse.json();
        
            if (editSchoolResponse.ok) {
                console.log('School successfully updated:', editSchoolData);
                navigate('/adminSchool');
            } else {
                console.error('Validation Error:', editSchoolData.errors); // Debugging line
                throw new Error(`School Update failed: ${editSchoolData.message}`);
            }
        } catch (error) {
            setError('An error occurred during school update. Please try again later.');
            console.error('Error during school update:', error);
        }
    };
    
    
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
        //   console.log("Countries fetched: ", data.data);
  
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
                    contact_number: value.slice(country.dialCode.length),
                    country_code: `+${country.dialCode}`,
                };
            } else if (field === "person_in_charge_contact") {
                return {
                    ...prevFormData,
                    person_in_charge_contact: value,
                };
            }
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        // Set the new logo file in form data
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setNewLogo(reader.result); // This is just for preview purposes
        };
        reader.readAsDataURL(file); // Read the file as a data URL for the preview
    }
    };
    
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

    const handleEditorChange = (content) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            school_fullDesc: content,
        }));
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
// Auto-fetch cities when the state is set (either manually or programmatically)
useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state);  // Automatically fetch cities based on the existing state value
    }
  }, [formData.state]);  // This will trigger when the state changes (either via user selection or programmatically)  
      
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
            // console.log('Removing photo with id:', fileToRemove.id);
            const apiUrl = `${import.meta.env.VITE_BASE_URL}api/admin/removeSchoolPhoto`;
            // console.log('API URL:', apiUrl); // Log the full API URL
            
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
                // console.log('API response:', data);
    
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
            helperText: "If you wish to keep the current password, leave this field empty." // Add this line
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
            showVisibility: showConfirmPassword
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
          value: formData.country,  // Existing country value
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
          value: formData.state,  // Existing state value
          onChange: handleStateChange,
          required: true,
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
          required: true,
          options: cityList.map(city => ({
            label: city.city_name,
            value: city.id
          })),
          placeholder: "",
          disabled: !formData.state  // Disable city field until a state is selected
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
            {error && <div className="alert alert-danger">{error}</div>}
     
                <AdminFormComponent
                   formTitle="School Information"
                   checkboxTitle="School Advertising Feature"
                   formFields={formFields}
                   formPassword={formPassword}
                   formTextarea={formTextarea}
                   formHTML={formHTML}
                   formCountry={formCountry}
                   formCategory={formCategory}
                   formAccount={formAccount}
                   formWebsite={formWebsite}
                   formAddress={formAddress}
                   shouldRenderPasswordCard={shouldRenderPasswordCard}
                   onSubmit={handleSubmit}
                   formCheckboxes={formCheckboxes}
                   formPersonInCharge={formPersonInCharge}
                   error={error}
                   buttons={buttons}
                   logo={logo}
                   handleLogoChange={handleLogoChange}
                   newLogo={newLogo}
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
  
        </Container>
    );
};

export default AdminEditSchoolContent;
