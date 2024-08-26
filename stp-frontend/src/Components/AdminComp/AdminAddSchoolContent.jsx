import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import 'typeface-ubuntu';
import "../../css/AdminStyles/AdminFormStyle.css";

const AdminAddSchoolContent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [countryCode, setCountryCode] = useState("MY");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [schoolLogo, setSchoolLogo] = useState(null);
    const [schoolFeature, setSchoolFeature] = useState([]);
    const [courseFeature, setCourseFeature] = useState([]);
    const [featureCourseId, setFeatureCourseId] = useState(null);
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [schoolFeaturedList, setSchoolFeaturedList] = useState([]);
    const [courseFeaturedList, setCourseFeaturedList] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const Authenticate = `Bearer ${token}`;

    // Function to fetch course list based on search query
    const fetchCourses = async (query) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/courseList`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Authenticate,
                },
                body: JSON.stringify({ searchQuery: query }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.data) {
                const names = data.data.map(course => course.name);
                setCourseList(names);
            } else {
                setCourseList([]);
            }
        } catch (error) {
            console.error('Error fetching course list:', error.message);
            setError(error.message);
        }
    };

    // Handle search query change
    useEffect(() => {
        fetchCourses(searchQuery);
    }, [searchQuery]);

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
        const fetchCourseFeatured = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/admin/courseFeaturedList`, {
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
                    setCourseFeaturedList(data.data);
                } else {
                    setCourseFeaturedList([]);
                }
            } catch (error) {
                console.error('Error fetching course featured list:', error.message);
                setError(error.message);
            }
        };

        fetchCourseFeatured();
    }, [Authenticate]);

    // Handle submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            name,
            email,
            contact: `${countryCode} ${contact}`,
            password,
            shortDescription,
            longDescription,

        };

        fetch(`${import.meta.env.VITE_BASE_URL}api/admin/addSchool`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authenticate,
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('School successfully registered:', data);
                    navigate('/adminSchool'); // Redirect to school page
                } else {
                    setError(`School Registration failed: ${data.message}`);
                    console.error('School Registration failed:', data);
                }
            })
            .catch(error => {
                setError('An error occurred during school registration. Please try again later.');
                console.error('Error during school registration:', error);
            });
    };

    const handleSchoolLogoChange = (e) => {
        if (e.target.files.length > 0) {
            setSchoolLogo(URL.createObjectURL(e.target.files[0]));
        }
    };


    const handleFeatureChange = (event) => {
        const featureId = parseInt(event.target.value);
        setSchoolFeature(prevFeatures => {
            if (prevFeatures.includes(featureId)) {
                return prevFeatures.filter(id => id !== featureId);
            } else {
                return [...prevFeatures, featureId];
            }
        });
    };
    const handleFeatureCourseChange = (event) => {
        const featureCourseId = parseInt(event.target.value);
        setCourseFeature(prevFeatures => {
            if (prevFeatures.includes(featureCourseId)) {
                return prevFeatures.filter(id => id !== featureCourseId);
            } else {
                return [...prevFeatures, featureCourseId];
            }
        });
    };

    // Handle "Select All" checkbox change
  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    setSelectAll(checked);
    setCourseFeature(checked ? courseFeaturedList.map((course) => course.id) : []);
  };

  const updateCourseNames = () => {
    const courseDiv = document.querySelector('.course');
    courseDiv.innerHTML = selectedCourses.join(', ');
  };

    const handleCourseChange = (e) => {
        const { value, checked } = e.target;
        setFeaturedCourses(prev =>
            checked ? [...prev, value] : prev.filter(c => c !== value)
        );
    };

    // Filter the courses based on the search query
    const filteredCourses = courseList.filter(course =>
        course.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedCourseIds = courseFeature;
        const data = {
        featureCourseId,
        selectedCourseIds,
        };

    return (
        <Container fluid className="admin-add-school-container">
            <Form onSubmit={handleSubmit}>
                <h3 className="fw-light text-left mt-4 mb-4">School Information</h3>
                {error && <p className="text-danger">{error}</p>}
                <hr></hr>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>School Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter school name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formLogo">
                            <Form.Label>School Logo</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleSchoolLogoChange}
                                required
                            />
                            {schoolLogo && (
                                <Image
                                    src={schoolLogo}
                                    alt="School Logo"
                                    thumbnail
                                    className="mt-2"
                                />
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formContact">
                            <Form.Label>Contact No.</Form.Label>
                            <Row>
                                <Col md={4}>
                                    <Form.Select
                                        value={countryCode}
                                        onChange={(e) => setCountryCode(e.target.value)}
                                    >
                                        <option value="MY">MY</option>
                                        <option value="UK">UK</option>
                                        <option value="US">US</option>
                                        <option value="IN">India</option>
                                        {/* Add more country options as needed */}
                                    </Form.Select>
                                </Col>
                                <Col md={8}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter contact number"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repeat password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formShortDescription">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Enter short description"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLongDescription">
                    <Form.Label>Long Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter long description"
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                    />
                </Form.Group>
                
                <hr />

                <Form.Group className="mb-3" controlId="formSchoolFeature">
                    <Form.Label>School Advertising Feature</Form.Label>
                    {schoolFeaturedList.map(feature => (
                        <Form.Check
                            key={feature.id}
                            type="checkbox"
                            label={feature.name}
                            value={feature.id}
                            checked={schoolFeature.includes(feature.id)}
                            onChange={handleFeatureChange}
                        />
                    ))}
                </Form.Group>

                <hr />

                <Form.Group className="mb-3" controlId="formCourses">
                    <Form.Label>Featured Courses</Form.Label>
                    <div className="featured">
                        <div className="search-input-wrapper">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </div>
                        <div className="button-container">
                        {filteredCourses.map((course, index) => (
                <Button
                    key={index}
                    variant="outline-primary"
                    className="mb-3"
                    onClick={() => {
                    handleCourseChange({ target: { value: course, checked: !selectedCourses.includes(course) } });
                    updateCourseNames();
                    }}
                >
                    {course}
                </Button>
                ))}
                        </div>
                    </div>
                </Form.Group>
                <hr></hr>
                <Form.Group className="mb-3" controlId="formFeaturedCourses">
                    <div className="course"></div> 
                    <div>7777</div>
                    <Form.Check
                        type="checkbox"
                        label="Select All"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    />
                   
                    {courseFeaturedList.map((featureCourse) => (
                        <Form.Check
                        key={featureCourse.id}
                        type="checkbox"
                        label={featureCourse.name}
                        value={featureCourse.id}
                        checked={courseFeature.includes(featureCourse.id)}
                        onChange={handleFeatureCourseChange}
                        />
                    ))}
                    </Form.Group>
                <div className="d-flex justify-content-center">
                <Button className="save mb-4" variant="danger" type="submit">
                    SAVE
                </Button>
                </div>
            </Form>
        </Container>
    );
};

export default AdminAddSchoolContent;
