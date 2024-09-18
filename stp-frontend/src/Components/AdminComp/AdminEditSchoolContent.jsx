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
        logo: null
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
    useEffect(() => {
        const fetchSchoolData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/schoolDetail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Authenticate,
                    },
                    body: JSON.stringify({ id }) // Send the ID in the request body
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setFormData({
                        ...formData,
                        name: data.data.name,
                        email: data.data.email,
                        contact_number: data.data.contactNumber,
                        country_code: data.data.countryCode,
                        person_in_charge_name: data.data.person_in_charge_name,
                        person_in_charge_email: data.data.person_in_charge_email,
                        person_in_charge_contact: data.data.person_in_charge_contact,
                        school_website: data.data.website,
                        category: data.data.category,
                        password: '',
                        confirm_password: '',
                        school_shortDesc: data.data.shortDescription,
                        school_fullDesc: data.data.fullDescription,
                        logo: data.data.logo ? new File([data.data.logo], 'logo.jpg') : null
                    });
                    setSelectedFeatures(data.data.schoolFeatured.map(feature => feature.featured_type)); // Assuming 'featured_type' is the ID
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('An error occurred while fetching school details.');
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

        fetchSchoolData();
        fetchFeatured();
        fetchCategories();
    }, [id, Authenticate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { name, email, category, school_website, contact_number, person_in_charge_email, person_in_charge_name, person_in_charge_contact, country_code, confirm_password, school_shortDesc, school_fullDesc, password } = formData;
        
        const formPayload = new FormData();
        formPayload.append("name", name);
        formPayload.append("email", email);
        formPayload.append("country_code", country_code);
        formPayload.append("contact_number", contact_number);
        formPayload.append("person_in_charge_contact", person_in_charge_contact);
        formPayload.append("person_in_charge_name", person_in_charge_name);
        formPayload.append("person_in_charge_email", person_in_charge_email);
        formPayload.append("school_website", school_website);
        formPayload.append("category", category);
        formPayload.append("password", password);
        formPayload.append("confirm_password", confirm_password);
        formPayload.append("school_shortDesc", school_shortDesc);
        formPayload.append("school_fullDesc", school_fullDesc);
    
        selectedFeatures.forEach(feature => {
            formPayload.append("featured[]", feature);
        });
    
        try {
            const updateSchoolResponse = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/updateSchool/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': Authenticate,
                },
                body: formPayload,
            });
    
            const updateSchoolData = await updateSchoolResponse.json();
    
            if (updateSchoolResponse.ok) {
                navigate('/adminSchool');
            } else {
                throw new Error(`School Update failed: ${updateSchoolData.message}`);
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
        setFormData(prev => ({
            ...prev,
            logo: file
        }));
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

    const handleRemoveAlbum = (fileToRemove) => {
        setAlbumFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
    };

    const handleShowPreview = (file) => {
        setPreviewFile(file);
        setShowPreview(true);
    };

    const handleShowCoverPreview = (file) => {
        setPreviewFile(file);
        setShowCoverPreview(true);
    };

    const handleClosePreview = () => setShowPreview(false);
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
            showVisibility: showPassword
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
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                   showPreview={showPreview}
                   previewFile={previewFile}
                />
            </form>
        </Container>
    );
};

export default AdminEditSchoolContent;
