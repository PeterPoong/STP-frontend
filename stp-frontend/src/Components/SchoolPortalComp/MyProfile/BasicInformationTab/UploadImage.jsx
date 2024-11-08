import React, { useEffect, useState } from "react";
import { FaRegImage, FaTrash } from "react-icons/fa";
import { Form } from "react-bootstrap";
import "../../../../css/SchoolPortalStyle/MyProfile/UploadImage.css";
import { Image, Trash3 } from "react-bootstrap-icons";
import styles from "../../../../css/SchoolPortalStyle/UploadImage.module.css";
import Lock from "../../../../assets/StudentPortalAssets/lock.svg";

function UploadBox() {
  const schoolName = sessionStorage.getItem("name");
  const token = sessionStorage.getItem("token");

  const [accountType, setAccountType] = useState("");
  const [highlight, setHighlight] = useState(false);
  const [uploadFiles, setUploadFiles] = useState("");
  const [uploadPhoto, setUploadPhoto] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [photo, setPhoto] = useState("");

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    const files = e.dataTransfer.files;
    //console.log("Files uploaded:", files);
  };

  // Prevent default behavior when dragging over
  const handleDragOver = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  // Reset highlight when drag leaves
  const handleDragLeave = () => {
    setHighlight(false);
  };

  // Handle cover photo input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    setUploadFiles(files);
    //console.log("Cover photo uploaded:", files);
  };

  // Handle photo album input change
  const handleUploadPhoto = (e) => {
    const files = e.target.files;
    setUploadPhoto(files);
    //console.log("Photo album files uploaded:", files);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  // Fetch cover photo
  const getCoverPhoto = async () => {
    try {
      const updateCover = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/getSchoolCover`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!updateCover.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await updateCover.json();
      setCoverPhoto(data.data);
    } catch (error) {
      console.error("Error fetching cover photo:", error);
    }
  };

  const getPhoto = async () => {
    try {
      const getPhoto = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/school/getSchoolPhoto`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!getPhoto.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await getPhoto.json();
      setPhoto(data.data);
    } catch (error) {
      console.error("Error fetching cover photo:", error);
    }
  };

  useEffect(() => {
    getCoverPhoto();
    getPhoto();
    const storedAccountType =
      sessionStorage.getItem("account_type") ||
      localStorage.getItem("account_type");
    setAccountType(parseInt(storedAccountType, 10));
  }, []);

  // Handle cover photo upload
  useEffect(() => {
    if (uploadFiles && uploadFiles.length > 0) {
      const uploadCover = async () => {
        try {
          const formData = new FormData();
          formData.append("cover", uploadFiles[0]);
          formData.append("coverName", uploadFiles[0].name + " cover");

          const updateCover = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/school/updateSchoolCover`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );
          const data = await updateCover.json();
          getCoverPhoto();
         // console.log("Cover photo updated:", data);
        } catch (error) {
          console.error("Error updating cover photo:", error);
        }
      };
      uploadCover();
    }
  }, [uploadFiles]);

  // Handle cover photo removal
  const handleRemoveCover = (e) => {
    e.preventDefault();
    const removeBanner = async () => {
      try {
        const disableCover = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/disableSchoolCover`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!disableCover.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error removing cover photo:", error);
      }
    };
    removeBanner();
    getCoverPhoto();
  };

  const handleRemovePhoto = (item) => {
    const removePhoto = async () => {
      try {
        const removePhoto = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/school/deleteSchoolPhoto`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: item.id }),
          }
        );
        if (!removePhoto.ok) {
          throw new Error("Something wrong when making request");
        }
      } catch (error) {
        console.error("Error removing photo:", error);
      }
    };
    removePhoto();
    getPhoto();
  };

  useEffect(() => {
    if (uploadPhoto && uploadPhoto.length > 0) {
      const uploadSchoolPhoto = async () => {
        try {
          const formData = new FormData();
          formData.append("photo", uploadPhoto[0]);
          formData.append("photo_Name", uploadPhoto[0].name + " cover");
          const uploadSchoolPhoto = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/school/uploadSchoolPhoto`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );
          const data = await uploadSchoolPhoto.json();
          //getPhoto
          getPhoto();
          //console.log("photo uploaded", data);
        } catch (error) {
          console.error("Error uploading school photo:", error);
        }
      };
      uploadSchoolPhoto();
    }
  }, [uploadPhoto]);

  return (
    <div className="upload-main-container">
      <Form onSubmit={handleSubmit}>
        <h4 className="mb-2">Upload Image</h4>
        <hr className="divider-line" />
        <p style={{ fontSize: "20px", paddingLeft: "20px" }}>Cover Photo</p>

        {accountType === 65 ? (
          <>
            <div
              className={`upload-box ${highlight ? "highlight" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                id="coverFileUpload"
                multiple
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
                style={{ display: "none" }}
              />
              <label htmlFor="coverFileUpload" className="upload-box-label">
                <FaRegImage className="upload-icon" />
                <p>
                  <span className="upload-text">
                    Click to upload cover photo
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="upload-instructions">
                  JPG, JPEG, PNG less than 1MB
                </p>
              </label>
            </div>

            {/* Display uploaded files */}
            {coverPhoto && (
              <div className="uploaded-files-container">
                <div className="uploaded-files">
                  <div className="uploaded-file-box">
                    <div className="text-with-link">
                      <div className="text-container">
                        <p className="image-with-text">
                          <Image />
                          {coverPhoto.schoolMedia_name}
                        </p>
                        <a
                          href={`${import.meta.env.VITE_BASE_URL}storage/${
                            coverPhoto.schoolMedia_location
                          }`}
                          className="click-here-text"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click to view
                        </a>
                      </div>
                      <Trash3
                        className="delete-icon"
                        onClick={handleRemoveCover}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={`lockUploadCover ${highlight ? "highlight" : ""}`}>
            <img src={Lock} alt="My Image" />
            <p className="text-center text-white  px-5">
              This feature is locked and available only with a premium account.
            </p>
            {/* <div className="sdv-div-plan-button rounded-pill ">
      <button className="plan-button rounded-pill">Upgrade Now</button>
    </div> */}
          </div>
        )}

        {/* <div
          className={`upload-box ${highlight ? "highlight" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {accountType === 65 ? (
            <>
              <input
                type="file"
                id="coverFileUpload"
                multiple
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
                style={{ display: "none" }}
              />
              <label htmlFor="coverFileUpload" className="upload-box-label">
                <FaRegImage className="upload-icon" />
                <p>
                  <span className="upload-text">
                    Click to upload cover photo
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="upload-instructions">
                  JPG, JPEG, PNG less than 1MB
                </p>
              </label>
            </>
          ) : (
            <>
              <div className="sdv-cocurriculum m-3 shadow-lg p-4 rounded-5 d-flex align-items-center justify-content-center flex-column ">
                <img src={Lock} alt="My Image" />
                <p className="text-center text-white mt-3 px-5">
                  This feature is locked and available only with a premium
                  account.
                </p>
                <div className="sdv-div-plan-button rounded-pill mt-3">
                  <button className="plan-button rounded-pill">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </>
          )}
        </div> */}

        {/* Display uploaded files */}
        {/* {coverPhoto && (
          <div className="uploaded-files-container">
            <div className="uploaded-files">
              <div className="uploaded-file-box">
                <div className="text-with-link">
                  <div className="text-container">
                    <p className="image-with-text">
                      <Image />
                      {coverPhoto.schoolMedia_name}
                    </p>
                    <a
                      href={`${import.meta.env.VITE_BASE_URL}storage/${
                        coverPhoto.schoolMedia_location
                      }`}
                      className="click-here-text"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click to view
                    </a>
                  </div>
                  <Trash3 className="delete-icon" onClick={handleRemoveCover} />
                </div>
              </div>
            </div>
          </div>
        )} */}

        <hr className="divider-line" />
        <p style={{ fontSize: "20px", paddingLeft: "20px" }}>Photo Album</p>
        <div
          className={`upload-box ${highlight ? "highlight" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id="photoAlbumUpload" /* Unique ID for photo album */
            multiple
            onChange={handleUploadPhoto}
            accept=".jpg, .jpeg, .png"
            style={{ display: "none" }}
          />
          <label htmlFor="photoAlbumUpload" className="upload-box-label">
            <FaRegImage className="upload-icon" />
            <p>
              <span className="upload-text">Click to upload photo</span> or drag
              and drop
            </p>
            <p className="upload-instructions">JPG, JPEG, PNG less than 1MB</p>
          </label>
        </div>

        {photo && Array.isArray(photo) && photo.length > 0 && (
          <div className="uploaded-files-container">
            <div className="uploaded-files">
              {photo.map((item, index) => (
                <div className="uploaded-file-box" key={index}>
                  <div className="text-with-link">
                    <div className="text-container">
                      <p className="image-with-text">
                        <Image />
                        {item.schoolMedia_name}
                      </p>
                      <a
                        href={`${import.meta.env.VITE_BASE_URL}storage/${
                          item.schoolMedia_location
                        }`}
                        className="click-here-text"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click to view
                      </a>
                    </div>
                    <Trash3
                      className="delete-icon"
                      onClick={() => handleRemovePhoto(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

export default UploadBox;
