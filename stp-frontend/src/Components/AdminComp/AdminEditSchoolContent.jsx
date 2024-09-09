import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
        person_in_charge_name:"",
        person_in_charge_email:"",
        person_in_charge_contact:"",
        school_website:"",
        category:"",
        password: "",
        confirm_password: "",
        school_shortDesc: "",
        school_fullDesc: "",
        logo: null
    });
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { name, email, category, school_website, contact_number,person_in_charge_email,person_in_charge_name,person_in_charge_contact, country_code, confirm_password, school_shortDesc, school_fullDesc, password } = formData;
        
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
    
        // Append each feature id individually to formPayload as featured[]
        selectedFeatures.forEach(feature => {
            formPayload.append("featured[]", feature);
        });
    
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
                throw new Error(`School Registration failed: ${addSchoolData.message}`);
            }
        } catch (error) {
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
                formCategory={formCategory}
                formWebsite={formWebsite}
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
            />

        </Container>
    );
};

export default AdminEditSchoolContent;
