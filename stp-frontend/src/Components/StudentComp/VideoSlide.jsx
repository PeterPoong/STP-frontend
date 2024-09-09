import "../../css/StudentCss/homePageStudent/VideoCarousel.css";
import React from "react";
import { Carousel } from "react-bootstrap";
import Vid1 from "../../assets/StudentAssets/Videos/vid1.mp4";
import Vid2 from "../../assets/StudentAssets/Videos/vid2.mp4";
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
            <div className="video-overlay-container">
              <video
                className="video-element"
                src={videoObj.src}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="overlay"></div>
              <div className="video-carousel-caption">
                <p style={{ fontWeight: "bolder" }}>{videoObj.title}</p>
                <button className="btn-lg video-carousel-button">
                  {videoObj.credit}
                </button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default VideoSlide;
