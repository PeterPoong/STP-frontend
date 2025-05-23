import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Trash2, Edit, Save, Clock, User, Building } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WidgetPopUpUnsavedChanges from "../../../Components/StudentPortalComp/Widget/WidgetPopUpUnsavedChanges"; // New import
import "../../../css/StudentPortalStyles/studentApplyCourseCocuriculum.css";

const CoCurriculum = ({ onNext, onBack }) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUnsavedChangesPopupOpen, setIsUnsavedChangesPopupOpen] =
    useState(false);
  const [navigationDirection, setNavigationDirection] = useState(null);
  useEffect(() => {
    fetchCoCurriculum();
  }, []);

  const fetchCoCurriculum = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/co-curriculumList`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch co-curriculum activities");
      }

      const result = await response.json();
      //console.log(result);
      if (result.success) {
        // Normalize the fetched data to match the expected structure
        const normalizedData = result.data.map((item) => ({
          id: item.id,
          club_name: item.club_name || "",
          student_position: item.student_position || item.position || "", // Keep as student_position for state
          location: item.location || item.institute_name || "", // Keep as location for state
          year: item.year || "",
        }));
        setActivities(normalizedData);
      } else {
        throw new Error(
          result.message || "Failed to fetch co-curriculum activities"
        );
      }
    } catch (error) {
      console.error("Error fetching co-curriculum activities:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddActivity = () => {
    // Initialize an empty activity for user input
    setActivities([
      ...activities,
      {
        club_name: "",
        position: "",
        institute_name: "",
        year: new Date().getFullYear(),
        isEditing: true,
      },
    ]);
    setHasUnsavedChanges(true);
  };

  const handleSaveActivity = async (index) => {
    const activity = activities[index];

    // Validate required fields
    if (
      !activity.club_name ||
      !activity.student_position ||
      !activity.location ||
      !activity.year
    ) {
      alert("Please fill in all fields before saving."); // Notify user
      return; // Exit the function if validation fails
    }

    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");

      let response;
      if (activity.id) {
        // Check if it's an existing activity
        // Call edit API
        response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/student/editCocurriculum`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: activity.id,
              club_name: activity.club_name,
              position: activity.student_position,
              institute_name: activity.location,
              year: activity.year,
            }),
          }
        );
      } else {
        // Call add API
        response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/student/addCocurriculumList`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              club_name: activity.club_name,
              position: activity.student_position,
              institute_name: activity.location,
              year: activity.year,
            }),
          }
        );
      }

      if (!response.ok) {
        throw new Error("Failed to save co-curriculum activity");
      }

      const result = await response.json();
      if (result.success) {
        const updatedActivities = activities.map((a, i) =>
          i === index ? { ...a, id: result.data.id, isEditing: false } : a
        );
        setActivities(updatedActivities);
        setHasUnsavedChanges(false);
        await fetchCoCurriculum();
      } else {
        throw new Error(
          result.message || "Failed to save co-curriculum activity"
        );
      }
    } catch (error) {
      console.error("Error saving co-curriculum activity:", error);
      setError(error.message);
    }
  };

  const handleActivityChange = (index, field, value) => {
    //console.log('Before update:', activities[index]); // Log before update
    const updatedActivities = activities.map((activity, i) =>
      i === index ? { ...activity, [field]: value } : activity
    );
    setActivities(updatedActivities);
    setHasUnsavedChanges(true); // Set unsaved changes flag
    //console.log('After update:', updatedActivities[index]); // Log after update
  };

  const handleDeleteActivity = async (index) => {
    try {
      setHasUnsavedChanges(false);
      const activity = activities[index];

      // Check if the activity is new (no ID)
      if (!activity.id) {
        // Remove the new activity directly
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
        return; // Exit the function
      }
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const activityId = activities[index].id; // Ensure this ID is valid

      // Log the ID being sent to the server for deletion
      //console.log('Deleting activity with ID:', activityId);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/disableCocurriculum`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: activityId }), // Ensure this ID is correct
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete co-curriculum activity");
      }

      const result = await response.json();
      //console.log('Response from deleting activity:', result); // Log the response

      if (result.success) {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
      } else {
        throw new Error(
          result.message || "Failed to delete co-curriculum activity"
        );
      }
    } catch (error) {
      console.error("Error deleting co-curriculum activity:", error);
      setError(error.message);
    }
  };

  const handleNext = () => {
    if (hasUnsavedChanges) {
      setIsUnsavedChangesPopupOpen(true);
    } else {
      onNext();
    }
  };

  const handleNavigation = (direction) => {
    if (hasUnsavedChanges) {
      setNavigationDirection(direction);
      setIsUnsavedChangesPopupOpen(true);
    } else {
      direction === "next" ? onNext() : onBack();
    }
  };

  const handleUnsavedChangesConfirm = () => {
    setIsUnsavedChangesPopupOpen(false);
    if (navigationDirection === "next") {
      onNext();
    } else if (navigationDirection === "back") {
      onBack();
    }
    setNavigationDirection(null);
  };

  const handleUnsavedChangesCancel = () => {
    setIsUnsavedChangesPopupOpen(false);
    setNavigationDirection(null);
  };

  if (isLoading)
    return (
      <div>
        <div>
          <div className="d-flex justify-content-center align-items-center m-5 ">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="step-content p-4 rounded">
      <h3 className="border-bottom pb-2 fw-normal">Co-Curriculum</h3>
      <div className="co-curriculum-list">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="co-curriculum-item mb-4 border rounded p-4"
          >
            {activity.isEditing ? (
              <>
                <Form.Control
                  type="text"
                  placeholder="Name of Co-curriculum..."
                  value={activity.club_name || ""} // Ensure it's always a string
                  onChange={(e) =>
                    handleActivityChange(index, "club_name", e.target.value)
                  }
                  className="mb-2 border p-0 fw-bold ps-2 ac-input-placeholder applycourse-cocurriculum-clubname-input"
                  style={{ fontSize: "1.1rem" }}
                />
                <div className="d-flex justify-content-between ps-0">
                  <div className="d-flex flex-grow-1 px-0 ">
                    {/* date */}
                    <div
                      // className="d-flex align-items-center me-3 flex-shrink-0"
                      className="cocuriculum-icon-container"
                    >
                      <Clock
                        size={18}
                        // className="me-2 applycourse-cocurriculum-icon"
                        className="cocuriculum-icon"
                        style={{ flexShrink: 0 }}
                      />
                      <DatePicker
                        selected={new Date(activity.year, 0)}
                        onChange={(date) =>
                          handleActivityChange(
                            index,
                            "year",
                            date.getFullYear()
                          )
                        }
                        showYearPicker
                        dateFormat="yyyy"
                        yearItemNumber={9}
                        // className="form-control py-0 px-2 date-picker-short"
                        className="form-control py-0 px-2 cocuriculum-icon-input"
                        placeholderText="Select year"
                        // style={{
                        //   flexGrow: 1, // Allow the DatePicker input to take up remaining space
                        //   fontSize: "1rem", // Adjust font size for consistency
                        //   padding: "0.25rem", // Adjust padding for better alignment
                        // }}
                      />
                    </div>

                    {/* position */}
                    {/* <div className="d-flex align-items-center me-3 flex-shrink-0"> */}
                    <div className="cocuriculum-icon-container">
                      <User
                        size={18}
                        // className="me-2 applycourse-cocurriculum-icon"
                        className="cocuriculum-icon"
                      />
                      <Form.Control
                        type="text"
                        placeholder="Position"
                        value={activity.student_position} // Updated to match naming
                        onChange={(e) =>
                          handleActivityChange(
                            index,
                            "student_position",
                            e.target.value
                          )
                        } // Updated to match naming
                        // className="py-0 px-2 input-short ac-input-placeholder"
                        className="py-0 px-2  cocuriculum-icon-input"
                      />
                    </div>

                    {/* school */}
                    {/* <div className="d-flex align-items-center flex-shrink-0"> */}
                    <div className="cocuriculum-icon-container">
                      <Building
                        size={18}
                        // className="me-2 applycourse-cocurriculum-icon"
                        className="cocuriculum-icon"
                      />
                      <Form.Control
                        type="text"
                        placeholder="Institution"
                        value={activity.location} // Updated to match naming
                        onChange={(e) =>
                          handleActivityChange(
                            index,
                            "location",
                            e.target.value
                          )
                        } // Updated to match naming
                        // className="py-0 px-2 input-short ac-input-placeholder"
                        className="py-0 px-2  cocuriculum-icon-input"
                      />
                    </div>
                  </div>
                  <div className="applycourse-cocurriculum-content applycourse-cocurriculum-content-flexend">
                    <Button
                      variant="link"
                      onClick={() => handleSaveActivity(index)}
                      className="me-2"
                    >
                      <Save size={18} color="green" />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDeleteActivity(index)}
                    >
                      <Trash2 size={18} color="red" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="fw-bold mb-2 applycourse-cocurriculum-content-clubname "
                  style={{
                    fontSize: "1.1rem",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-all",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "500px",
                  }}
                >
                  {activity.club_name}
                </div>
                <div className="d-flex justify-content-between align-items-center applycourse-cocurriculum-content-card">
                  <div className="d-flex flex-grow-1 applycourse-cocurriculum-content">
                    <div className="me-3 " style={{ width: "200px" }}>
                      <Clock size={18} className="me-2" />
                      <span className="border-end border-2 border-dark pe-2 me-2">
                        Year
                      </span>
                      <a className="mx-2 text-dark fw-normal">
                        {activity.year}
                      </a>
                    </div>
                    <div className="me-3 applycourse-cocurriculum-wordbreak">
                      <User size={18} className="me-2" />
                      <span className="border-end  border-2 border-dark pe-2 me-2">
                        Position
                      </span>
                      <a className="mx-2 text-dark fw-normal name-restrict">
                        {activity.student_position}
                      </a>
                    </div>
                    <div className="me-3 applycourse-cocurriculum-wordbreak">
                      <Building size={18} className="me-2" />
                      <span className="border-end border-2 border-dark pe-2 me-2">
                        Institute
                      </span>
                      <a className="mx-2 text-dark fw-normal">
                        {activity.location}
                      </a>
                    </div>
                  </div>
                  <div className="applycourse-cocurriculum-content-button">
                    {/* <div className="cocurriculum-apply-button"> */}
                    <Button
                      variant="link"
                      onClick={() => {
                        handleActivityChange(index, "isEditing", true); // Set isEditing to true
                        // No need to set id again, it should already be present
                      }}
                      className="me-2"
                    >
                      <Edit size={18} color="black" />
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDeleteActivity(index)}
                      className=""
                    >
                      <Trash2 size={18} color="red" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Button
        variant="outline-primary"
        onClick={handleAddActivity}
        className="w-100 mt-3 sac-add-new-button mx-0"
      >
        Add New +
      </Button>
      <div className="d-flex justify-content-between mt-4">
        <Button
          onClick={() => handleNavigation("back")}
          className="me-2 rounded-pill px-5 sac-previous-button"
        >
          Previous
        </Button>
        <Button
          onClick={() => handleNavigation("next")}
          className="sac-next-button rounded-pill px-5"
        >
          Next
        </Button>
      </div>
      <WidgetPopUpUnsavedChanges
        isOpen={isUnsavedChangesPopupOpen}
        onConfirm={handleUnsavedChangesConfirm}
        onCancel={handleUnsavedChangesCancel}
      />
    </div>
  );
};

export default CoCurriculum;
