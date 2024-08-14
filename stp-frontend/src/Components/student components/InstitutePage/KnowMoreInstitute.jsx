import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavButtons from "../NavButtons";
import headerImage from "../../../assets/student asset/institute image/StudyPal10.png";
import "../../../css/student css/institutepage css/KnowMoreInstitute.css";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faClock,
  faCalendarAlt,
  faCalendarCheck,
  faLocationDot,
  faSchool,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

import studypal1 from "../../../assets/student asset/institute image/StudyPal1.png";
import studypal2 from "../../../assets/student asset/institute image/StudyPal2.png";
import studypal3 from "../../../assets/student asset/institute image/StudyPal3.png";
import studypal4 from "../../../assets/student asset/institute image/StudyPal4.png";
import studypal11 from "../../../assets/student asset/institute image/StudyPal11.png";
// import Footer from "../Components/student components/Footer";
import Footer from "../../../Components/student components/Footer";
import image1 from "../../../assets/student asset/institute image/image1.jpg";
import image7 from "../../../assets/student asset/institute image/image7.png";
import image5 from "../../../assets/student asset/institute image/image5.jpg";

const baseURL = import.meta.env.VITE_BASE_URL;
const KnowMoreInstitute = () => {
  const { id } = useParams();
  const location = useLocation();
  const [institutes, setInstitutes] = useState([]);
  useEffect(() => {
    console.log("Institute ID: ", id);

    if (!institutes || institutes.length === 0) {
      fetch(`http://192.168.0.69:8000/api/student/schoolList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Data: ", data);
          if (data && data.data && Array.isArray(data.data)) {
            const selectedInstitute = data.data.find(
              (item) => item.id === parseInt(id)
            );
            console.log("Selected Institute: ", selectedInstitute);
            setInstitutes(selectedInstitute ? [selectedInstitute] : []);
          } else {
            console.error("Invalid data structure: ", data);
            setInstitutes([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching institute data: ", error);
          setInstitutes([]);
        });
    }
  }, [id]);

  if (!institutes || institutes.length === 0) {
    return (
      <p>No institute selected. Please go back and choose an institute.</p>
    );
  }

  // useEffect(() => {
  //   if (!institute) {
  //     // If no institute is passed, redirect back to the previous page
  //     navigate(-1);
  //   }
  // }, [institute, navigate]);

  // if (!institute) {
  //   return (
  //     <p>No institute selected. Please go back and choose an institute.</p>
  //   );
  // }
  // const filteredPrograms = [
  //   {
  //     image: image1,
  //     title: "Degree of Business Management",
  //     university: "Swinburne University (Sarawak)",
  //     location: "Sarawak",
  //     enrollment: "Full time",
  //     duration: "30 months",
  //     intakes: ["January", "July", "September"],
  //     fee: "RM 28,000",
  //   },
  //   {
  //     image: image7,
  //     title: "Degree of Multimedia Computing",
  //     university: "Curtin University (Sarawak)",
  //     location: "Sarawak",
  //     enrollment: "Full time",
  //     duration: "30 months",
  //     intakes: ["January", "July"],
  //     fee: "RM 27,000",
  //   },
  //   {
  //     image: image5,
  //     title: "Degree of Advance Information Technology",
  //     university: "Universiti Teknikal Malaysia Melaka",
  //     location: "Melaka",
  //     enrollment: "Full time",
  //     duration: "28 months",
  //     intakes: ["January", "July", "September"],
  //     fee: "RM 27,000",
  //   },
  //   {
  //     image: image1,
  //     title: "Degree of Medicine",
  //     university: "Swinburne University (Sarawak)",
  //     location: "Sarawak",
  //     enrollment: "Full time",
  //     duration: "28 months",
  //     intakes: ["January", "July", "September"],
  //     fee: "RM 27,000",
  //   },
  //   {
  //     image: image1,
  //     title: "Degree of Computer Science",
  //     university: "Swinburne University (Sarawak)",
  //     location: "Sarawak",
  //     enrollment: "Full time",
  //     duration: "28 months",
  //     intakes: ["January", "July", "September"],
  //     fee: "RM 27,000",
  //   },
  //   {
  //     image: image1,
  //     title: "Degree of Advance Information Technology",
  //     university: "Swinburne University (Sarawak)",
  //     location: "Sarawak",
  //     enrollment: "Full time",
  //     duration: "28 months",
  //     intakes: ["January", "July", "September"],
  //     fee: "RM 27,000",
  //   },
  // ];

  const handleApplyNow = (program) => {
    navigate("/applynow", { state: { program } }); // Navigate with state
  };

  return (
    <div style={{ backgroundColor: "#F5F4F4" }}>
      <NavButtons />
      <header className="know-more-masthead">
        <img
          src={headerImage}
          alt="Header"
          className="know-more-header-image"
        />
      </header>
      {Array.isArray(institutes) &&
        institutes.map((institute) => (
          <>
            <Container key={institute.id} className="my-4 know-more-container">
              <Row className="know-more-row no-gutters">
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-center position-relative know-more-image-col"
                >
                  <img
                    src={`${baseURL}storage/${institute.logo}`}
                    alt="Institute"
                    className="img-fluid img-thumbnail know-more-program-image"
                  />
                </Col>
                <Col md={6} className="d-flex align-items-center">
                  <div style={{ paddingBottom: "25px" }}>
                    <h4>{institute.name}</h4>
                    <p>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span style={{ paddingLeft: "10px" }}>
                        {institute.city}, {institute.state}, {institute.country}
                      </span>
                      <a
                        href="https://maps.google.com"
                        style={{ paddingLeft: "15px" }}
                      >
                        Click and view on map
                      </a>
                    </p>
                  </div>
                </Col>
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button
                    style={{
                      backgroundColor: "#B71A18",
                      border: "none",
                      width: "180px",
                      height: "50px",
                      marginBottom: "20px",
                    }}
                  >
                    {institute.category}
                  </Button>
                </Col>
              </Row>

              {/* <Carousel className="random-images-carousel">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={studypal1}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={studypal2}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={studypal3}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={studypal4}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel> */}
              <div className="image-gallery">
                <img src={studypal1} className="gallery-image" alt="Slide 1" />
                <img src={studypal2} className="gallery-image" alt="Slide 2" />
                <img src={studypal3} className="gallery-image" alt="Slide 3" />
                <img src={studypal4} className="gallery-image" alt="Slide 4" />
                <img src={studypal1} className="gallery-image" alt="Slide 1" />
              </div>

              <div className="card mt-4 know-more-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">Course Overview</h5>
                      </div>
                    </Col>
                    <div>
                      <p>{institute.description}</p>
                    </div>
                    <Col className="d-flex justify-content-center">
                      <Button
                        style={{ textDecoration: "none" }}
                        variant="link"
                        href="https://www.example.com"
                      >
                        View More{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              {/* <div className="card mt-4 know-more-card">
                <div className="card-body">
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">Entry Requirement</h5>
                      </div>
                    </Col>
                    <div>
                      <ul>
                        <li>map here</li>
                      </ul>
                    </div>
                  </Row>
                </div>
              </div> */}
              <div className="card mt-4 know-more-card">
                <div className="card-body">
                  <Row>
                    <Col md={12}>
                      <div className="map-responsive">
                        {/* <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0191880404366!2d144.95373531531467!3d-37.81627987975148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727f6d1d2d6d24!2sFlinders%20St%20Station!5e0!3m2!1sen!2sau!4v1615196948834!5m2!1sen!2sau"
                          width="600"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe> */}
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15909.76315163879!2d114.0178298!3d4.5143003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x321f4826b4a6b637%3A0xe688be6fc8cd1d35!2sCurtin%20University%20Malaysia!5e0!3m2!1sen!2smy!4v1723620924688!5m2!1sen!2smy"
                          width="1250"
                          height="400"
                          style={{ border: 0 }}
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <div className="card mt-4 total-course-card">
                    <div className="card-body">
                      <Row className="justify-content-center">
                        <Col
                          md={10}
                          className="d-flex flex-column align-items-center"
                        >
                          <div>
                            <h6
                              style={{
                                color: "#514E4E",
                              }}
                              className="card-title"
                            >
                              Total Courses Offered
                            </h6>
                          </div>
                        </Col>
                        <div>
                          <FontAwesomeIcon
                            style={{ fontSize: "5rem" }}
                            icon={faGraduationCap}
                          />
                        </div>
                        <div>
                          <h5
                            style={{
                              paddingTop: "10px",
                              fontStyle: "italic",
                              color: "#514E4E",
                            }}
                          >
                            {institute.category}
                          </h5>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="card mt-4 intake-period-card">
                    <div className="card-body">
                      <Row className="justify-content-center">
                        <Col
                          md={10}
                          className="d-flex flex-column align-items-center"
                        >
                          <div>
                            <h6
                              style={{
                                color: "#514E4E",
                              }}
                              className="card-title"
                            >
                              Intake Period
                            </h6>
                          </div>
                        </Col>
                        <div>
                          <FontAwesomeIcon
                            style={{ fontSize: "5rem" }}
                            icon={faBookOpen}
                          />
                        </div>
                        <div>
                          <h5
                            style={{
                              paddingTop: "10px",
                              fontStyle: "italic",
                              color: "#514E4E",
                            }}
                          >
                            {Array.isArray(institute.intakes)
                              ? institute.intakes.join(", ")
                              : "N/A"}
                          </h5>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <img
              src={headerImage}
              alt="Header"
              className="about-institute-image"
            />
            <Container className="my-4 about-institute-container">
              <div className="card mt-4 know-more-card">
                <div className="card-body" style={{ padding: "50px" }}>
                  <Row>
                    <Col md={10} className="d-flex align-items-center">
                      <div>
                        <h5 className="card-title">
                          About {institute.university}
                        </h5>
                      </div>
                    </Col>
                    <div>
                      <p>
                        The purpose of this programme is to produce graduates
                        with in-depth knowledge of Arabic linguistics. From the
                        aspects of national aspiration and global importance,
                        this programme aims to produce graduates who demonstrate
                        those aspects.
                      </p>
                      <p>
                        Having the ability to apply their knowledge and skills
                        as well as communicate well in Arabic would further
                        enable them to contribute at the international stage and
                        realise the features of a Malaysian society as
                        envisioned in Vision 2020.
                      </p>
                      <p>
                        The purpose of this programme is to produce graduates
                        with in-depth knowledge of Arabic linguistics. From the
                        aspects of national aspiration and global importance,
                        this programme aims to produce graduates who demonstrate
                        those aspects.
                      </p>
                      <p>
                        Having the ability to apply their knowledge and skills
                        as well as communicate well in Arabic would further
                        enable them to contribute at the international stage and
                        realise the features of a Malaysian society as
                        envisioned in Vision 2020.
                      </p>
                    </div>
                    <Col className="d-flex justify-content-center">
                      <Button
                        style={{ textDecoration: "none" }}
                        variant="link"
                        href="https://www.example.com"
                      >
                        View More{" "}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  style={{
                    backgroundColor: "#FFA500",
                    border: "none",
                    width: "180px",
                    height: "50px",
                    marginTop: "20px",
                  }}
                >
                  Contact School
                </Button>
              </div>
              <img src={studypal11} alt="Header" className="adverstise-image" />
            </Container>
          </>
        ))}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default KnowMoreInstitute;
