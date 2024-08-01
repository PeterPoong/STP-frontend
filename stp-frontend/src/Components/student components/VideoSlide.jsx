import "../VideoCarousel.css";
import React from "react";
import { Carousel } from "react-bootstrap";
// import Vid1 from "../Videos/student asset/vid1.mp4";
// import Vid2 from "../Videos/student asset/vid2.mp4";

import Vid1 from "../assets/student asset/Videos/vid1.mp4";
import Vid2 from "../assets/student asset/Videos/vid2.mp4";
import "bootstrap/dist/css/bootstrap.css";

const VideoSlide = () => {
  const videoProperties = [
    {
      id: 1,
      title: "EXPLORE MORE CAMPUS LIFE",
      src: Vid1,
      credit: "Find Out More",
    },
    {
      id: 2,
      title: "EXPLORE MORE CAMPUS LIFE",
      src: Vid2,
      credit: "Find Out More",
    },
  ];

  return (
    <div className="video-carousel">
      <Carousel>
        {videoProperties.map((videoObj) => (
          <Carousel.Item key={videoObj.id} className="video-carousel-item">
            <video
              className="video-element"
              src={videoObj.src}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="video-carousel-caption">
              <h3>{videoObj.title}</h3>
              <button className="btn btn-outline-danger btn-lg video-carousel-button">
                {videoObj.credit}
              </button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoSlide;
