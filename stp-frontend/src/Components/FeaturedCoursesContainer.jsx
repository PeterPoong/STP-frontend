import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.jpg";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import "../Unicard.css";
import umslogo from "../assets/umslogo.png";
import usmlogo from "../assets/usmlogo.jpeg";

const FeaturedCoursesContainer = () => {
  const courseData = [
    {
      image: image1,
      university: "Swinburne University of Technology",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: image2,
      university: "University of Malaysia, Sarawak",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: umslogo,
      university: "Universiti Malaysia Sabah",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: image4,
      university: "University of Malaysia, Sarawak",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: image5,
      university: "Swinburne University of Technology",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: usmlogo,
      university: "University Sains Malaysia",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: image7,
      university: "Swinburne University of Technology",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: image8,
      university: "University of Malaysia, Sarawak",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
    {
      image: image1,
      university: "University of Malaysia, Sarawak",
      program: "Bachelor of Computer Science",
      knowMoreText: "Know More",
      applyNowText: "Apply Now",
    },
  ];

  // Group courses into chunks of 3
  const chunkedCourses = [];
  for (let i = 0; i < courseData.length; i += 3) {
    chunkedCourses.push(courseData.slice(i, i + 3));
  }

  return (
    <div>
      <div>
        <h4 style={{ textAlign: "left" }}>Featured Courses</h4>
      </div>
      <div>
        <Container className="">
          <Carousel controls={true}>
            {chunkedCourses.map((chunk, index) => (
              <Carousel.Item key={index} className="carousel-item">
                <div className="d-flex justify-content-center flex-wrap">
                  {chunk.map((course, idx) => (
                    <div key={idx} className="featured-course-card">
                      <div style={{ height: "240px" }}>
                        <img
                          src={course.image}
                          alt={course.university}
                          className="section-image"
                        />
                      </div>
                      <div>
                        <h4>{course.university}</h4>
                        <p>{course.program}</p>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button className="btn btn-danger me-2">
                          {course.knowMoreText}
                        </button>
                        <button className="btn btn-danger">
                          {course.applyNowText}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>
    </div>
  );
};

export default FeaturedCoursesContainer;
