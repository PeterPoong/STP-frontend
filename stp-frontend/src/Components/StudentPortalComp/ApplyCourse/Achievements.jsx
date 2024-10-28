import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Trash2, Edit, Save, Clock, Trophy, Building, FileText, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import WidgetPopUpUnsavedChanges from '../../../Components/StudentPortalComp/Widget/WidgetPopUpUnsavedChanges';

const Achievements = ({ onBack, onNext }) => {
  const [achievements, setAchievements] = useState([]);
  const [achievementTypes, setAchievementTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Existing error state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUnsavedChangesPopupOpen, setIsUnsavedChangesPopupOpen] = useState(false);
  const [navigationDirection, setNavigationDirection] = useState(null);

  useEffect(() => {
    fetchAchievementTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  useEffect(() => {
    if (achievementTypes.length > 0) {
      fetchAchievements();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievementTypes]); // Run when achievementTypes change

  // Fetch Achievement Types
  const fetchAchievementTypes = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/achievementTypeList`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch achievement types. Status: ${response.status}`);
      }

      const result = await response.json();
      //console.log('Achievement Types Fetch Result:', result); // Debugging

      if (result.success) {
        setAchievementTypes(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to fetch achievement types');
      }
    } catch (error) {
      console.error('Error fetching achievement types:', error);
      setError('Failed to load achievement types. Please try again later.');
      setIsLoading(false); // Stop loading if achievement types fail to load
    }
  };

  // Fetch Achievements
  const fetchAchievements = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      let allAchievements = [];
      let currentPage = 1;
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/achievementsList?page=${currentPage}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log('API response for page', currentPage, ':', result); // For debugging

        if (result.success && result.data && Array.isArray(result.data.data)) {
          const pageAchievements = result.data.data.map((achievement) => {
            const matchedTitle = achievementTypes.find(
              (type) => type.core_metaName === achievement.title_obtained
            );
            return {
              ...achievement,
              title: matchedTitle ? matchedTitle.id.toString() : '',
              isEditing: false,
            };
          });

          allAchievements = [...allAchievements, ...pageAchievements];

          if (result.data.next_page_url) {
            currentPage++;
          } else {
            hasMoreData = false;
          }
        } else {
          hasMoreData = false;
        }
      }

      // console.log('Total achievements fetched:', allAchievements.length); // For debugging
      setAchievements(allAchievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add New Achievement
  const handleAddAchievement = () => {
    const newAchievement = {
      id: null, // No ID yet since it's a new achievement
      achievement_name: '',
      date: new Date(),
      title: '', // Initialize with empty title ID
      title_obtained: '', // Initialize with empty title name
      awarded_by: '',
      achievement_media: null,
      isEditing: true,
      fileRemoved: false,
    };

    setAchievements((prev) => [...prev, newAchievement]);
    setHasUnsavedChanges(true);
  };

  // Handle Changes in Achievement Fields
  const handleAchievementChange = (index, field, value) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement, i) =>
        i === index ? { ...achievement, [field]: value } : achievement
      )
    );

    // If 'title' field changes, update 'title_obtained'
    if (field === 'title') {
      const matchedTitle = achievementTypes.find((type) => type.id.toString() === value);
      setAchievements((prevAchievements) =>
        prevAchievements.map((achievement, i) =>
          i === index
            ? { ...achievement, title_obtained: matchedTitle ? matchedTitle.core_metaName : '' }
            : achievement
        )
      );
    }

    setHasUnsavedChanges(true);
  };

  // Save Achievement
  const handleSaveAchievement = async (index) => {
    const achievement = achievements[index];

    // Validate required fields using alert
    if (
      !achievement.achievement_name.trim() ||
      !achievement.title.trim() ||
      !achievement.achievement_media ||
      !achievement.awarded_by.trim() ||
      !achievement.date
    ) {
      alert('Please fill in all required fields before saving.');
      return;
    }

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const dateToSave =
        achievement.date instanceof Date ? achievement.date : new Date(achievement.date);

      const formData = new FormData();

      // Include 'id' only if it's an edit operation
      if (achievement.id) {
        formData.append('id', achievement.id);
      }

      formData.append('achievement_name', achievement.achievement_name);
      formData.append('date', formatDate(achievement.date));
      formData.append('title', achievement.title); // Send title ID
      formData.append('awarded_by', achievement.awarded_by);

      if (achievement.achievement_media instanceof File) {
        formData.append('achievement_media', achievement.achievement_media);
      } else if (achievement.fileRemoved) {
        formData.append('remove_media', 'true');
      }

      // Set the correct URL without the 'id' in the query parameter
      const url = achievement.id
        ? `${import.meta.env.VITE_BASE_URL}api/student/editAchievement`
        : `${import.meta.env.VITE_BASE_URL}api/student/addAchievement`;

      const response = await fetch(url, {
        method: 'POST', // Both add and edit use POST
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set 'Content-Type' when sending FormData
        },
        body: formData,
      });

      const result = await response.json();
      //console.log('Save Achievement Result:', result); // Debugging line

      if (result.success) {
        // Clear any existing errors
        setError(null);

        // Update the achievement with the returned ID if it's a new achievement
        const updatedAchievements = achievements.map((a, i) =>
          i === index
            ? {
              ...a,
              id: result.data.id || a.id, // Update ID if returned from backend
              isEditing: false,
              fileRemoved: false,
              title_obtained:
                achievementTypes.find((type) => type.id.toString() === a.title)?.core_metaName ||
                '',
            }
            : a
        );
        setAchievements(updatedAchievements);
        setHasUnsavedChanges(false);
        await fetchAchievements(); // Refresh the list to ensure consistency
      } else {
        // Handle Validation Errors from Backend
        if (result.error) {
          const backendErrors = [];
          for (const key in result.error) {
            if (Array.isArray(result.error[key])) {
              backendErrors.push(...result.error[key]);
            } else if (typeof result.error[key] === 'string') {
              backendErrors.push(result.error[key]);
            }
          }
          const errorMessage = backendErrors.join(' ');
          alert(errorMessage); // Use browser alert instead of setting error state
        } else {
          alert(result.message || 'Failed to save achievement.');
        }
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      setError(error.message || 'An unexpected error occurred.');
    }
  };

  // Delete Achievement
  const handleDeleteAchievement = async (index) => {
    try {
      const achievement = achievements[index];
      setHasUnsavedChanges(false);

      if (!achievement.id) {
        // If the achievement doesn't have an ID, it's not saved in the backend yet
        setAchievements((prev) => prev.filter((_, i) => i !== index));
        return;
      }

      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/deleteAchievement`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: achievement.id, type: 'delete' }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete achievement');
      }

      const result = await response.json();
      //console.log('Delete Achievement Result:', result); // Debugging line

      if (result.success) {
        setAchievements((prev) => prev.filter((_, i) => i !== index));
        setHasUnsavedChanges(true);
        await fetchAchievements();
      } else {
        throw new Error(result.message || 'Failed to delete achievement');
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
      setError(error.message);
    }
  };

  // Handle File Upload
  const handleFileUpload = (index, file) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement, i) =>
        i === index ? { ...achievement, achievement_media: file } : achievement
      )
    );
    setHasUnsavedChanges(true);
  };

  // Handle File Removal
  const handleRemoveFile = (index) => {
    setAchievements((prevAchievements) =>
      prevAchievements.map((achievement, i) =>
        i === index ? { ...achievement, achievement_media: null, fileRemoved: true } : achievement
      )
    );
    setHasUnsavedChanges(true);
  };

  // Format Date for Display
  const formatDate = (date) => {
    if (!date) return '';
    if (date instanceof Date) {
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return date;
  };

  // Navigation Handlers
  const handleNavigation = (direction) => {
    if (hasUnsavedChanges) {
      setNavigationDirection(direction);
      setIsUnsavedChangesPopupOpen(true);
    } else {
      direction === 'next' ? onNext() : onBack();
    }
  };

  const handleUnsavedChangesConfirm = () => {
    setIsUnsavedChangesPopupOpen(false);
    if (navigationDirection === 'next') {
      onNext();
    } else if (navigationDirection === 'back') {
      onBack();
    }
    setNavigationDirection(null);
  };

  const handleUnsavedChangesCancel = () => {
    setIsUnsavedChangesPopupOpen(false);
  };

  // Loading and Error States
  if (isLoading) return <div>
    <div>
      <div className="d-flex justify-content-center align-items-center m-5 " >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  </div>;
  if (error && !achievements.length) return <div>Error: {error}</div>; // Show error if no achievements loaded

  return (
    <div className="step-content p-4 rounded">
      <h3 className="border-bottom pb-2 fw-normal">Achievements</h3>
      <div className="achievement-list">
        {achievements.map((achievement, index) => (
          <div key={achievement.id || index} className="achievement-item row mb-4 border rounded p-4 mx-0">
            {achievement.isEditing ? (
              <>
                <Form.Control
                  type="text"
                  placeholder="Name of Achievement..."
                  value={achievement.achievement_name}
                  onChange={(e) => handleAchievementChange(index, 'achievement_name', e.target.value)}
                  className="mb-2 ps-2 border p-0 fw-bold applycourse-cocurriculum-clubname-input ac-input-placeholder"
                  style={{ fontSize: '1.1rem' }}
                />
                <div className="d-flex justify-content-between ps-0">
                  <div className="d-flex flex-grow-1  px-0">
                    <div className="d-flex align-items-center me-3 flex-shrink-0">
                      <Clock size={18} className="me-2 applycourse-cocurriculum-icon" />
                      <DatePicker
                        selected={
                          achievement.date instanceof Date ? achievement.date : new Date(achievement.date)
                        }
                        onChange={(date) => handleAchievementChange(index, 'date', date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control py-0 px-2 date-picker-short ac-input-placeholder"
                        placeholderText="Select date"
                      />
                    </div>
                    <div className="d-flex align-items-center me-3 flex-shrink-0">
                      <Trophy size={18} className="me-2 applycourse-cocurriculum-icon" />
                      <Form.Control
                        as="select"
                        value={achievement.title}
                        onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                        className="py-0 px-2 input-short ac-input-placeholder"
                      >

                        {achievementTypes.map((type) => (
                          <option key={type.id} value={type.id.toString()}>
                            {type.core_metaName}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                    <div className="d-flex align-items-center me-3 flex-shrink-0">
                      <Building size={18} className="me-2 applycourse-cocurriculum-icon" />
                      <Form.Control
                        type="text"
                        placeholder="Awarded By"
                        value={achievement.awarded_by}
                        onChange={(e) => handleAchievementChange(index, 'awarded_by', e.target.value)}
                        className="py-0 px-2 input-short ac-input-placeholder"
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      {achievement.achievement_media ? (
                        <div className="d-flex align-items-center">
                          <FileText size={18} className="me-2 applycourse-cocurriculum-icon" />
                          <span className="mx-0 text-decoration-underline text-truncate file-name applycourse-alignself-center">
                            {achievement.achievement_media instanceof File
                              ? achievement.achievement_media.name
                              : typeof achievement.achievement_media === 'string'
                                ? achievement.achievement_media
                                : 'File uploaded'}
                          </span>
                          <Button
                            variant="link"
                            className="p-0 me-5 text-danger applycourse-alignself-center"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center ms-2">
                          <FileText size={18} className="me-2 applycourse-alignself-center" />
                          <Button
                            variant="secondary"
                            className="d-flex align-items-center py-1 px-4 rounded-2 applycourse-alignself-center"
                            onClick={() =>
                              document.getElementById(`achievementFileInput-${index}`).click()
                            }
                          >
                            Upload File
                          </Button>
                          <input
                            id={`achievementFileInput-${index}`}
                            type="file"
                            className="d-none "
                            onChange={(e) => handleFileUpload(index, e.target.files[0])}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="applycourse-cocurriculum-content">
                    <Button
                      variant="link"
                      onClick={() => handleSaveAchievement(index)}
                      className="me-2"
                    >
                      <Save size={18} color="green" />
                    </Button>
                    <Button variant="link" onClick={() => handleDeleteAchievement(index)}>
                      <Trash2 size={18} color="red" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="fw-bold mb-2 applycourse-cocurriculum-content" style={{
                  fontSize: '1.1rem',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-all',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '500px' // You can adjust this width as needed
                }}>
                  {achievement.achievement_name}
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-grow-1 align-items-center applycourse-cocurriculum-content">
                    <div className="me-3">
                      <Clock size={18} className="me-2" />
                      <span className="border-end border-2 border-dark pe-2 me-2">Date</span>
                      <a className="mx-2 text-dark fw-normal">{formatDate(achievement.date)}</a>
                    </div>
                    <div className="me-3" style={{ width: '230px' }}>
                      <Trophy size={18} className="me-2" />
                      <span className="border-end border-2 border-dark pe-2 me-2">Title</span>
                      <a className="mx-2 text-dark fw-normal">{achievement.title_obtained}</a>
                    </div>
                    <div className="me-3" style={{
                      width: '300px',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      wordBreak: 'break-all',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '300px'
                    }}>
                      <Building size={18} className="me-2" />
                      <span className="border-end border-2 border-dark pe-2 me-2">Awarded by</span>
                      <a className="mx-2 text-dark fw-normal">{achievement.awarded_by}</a>
                    </div>

                    {achievement.achievement_media && (
                      <div className="d-flex align-items-center text-decoration-underline ">
                        <FileText size={18} className="me-2 applycourse-alignself-center" />
                        <span
                        className="applycourse-alignself-center"
                          style={{
                            width: '225px',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            wordBreak: 'break-all',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '225px'
                          }}>
                          {achievement.achievement_media instanceof File
                            ? achievement.achievement_media.name
                            : typeof achievement.achievement_media === 'string'
                              ? achievement.achievement_media
                              : 'File uploaded'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="applycourse-cocurriculum-content">
                    <Button
                      variant="link"
                      onClick={() => {
                        // Map title_obtained back to title ID
                        const matchedTitle = achievementTypes.find(
                          (type) => type.core_metaName === achievement.title_obtained
                        );
                        handleAchievementChange(
                          index,
                          'title',
                          matchedTitle ? matchedTitle.id.toString() : ''
                        );
                        // Enable editing
                        setAchievements((prevAchievements) =>
                          prevAchievements.map((a, i) =>
                            i === index ? { ...a, isEditing: true } : a
                          )
                        );
                      }}
                      className="me-2 "
                    >
                      <Edit size={18} color="black" />
                    </Button>
                    <Button variant="link" onClick={() => handleDeleteAchievement(index)}>
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
        onClick={handleAddAchievement}
        className="w-100 mt-3 sac-add-new-button mx-0"
      >
        Add New Achievement +
      </Button>
      <div className="d-flex justify-content-between mt-4">
        <Button
          onClick={() => handleNavigation('back')}
          className="me-2 rounded-pill px-5 sac-previous-button"
        >
          Previous
        </Button>
        <Button onClick={() => handleNavigation('next')} className="sac-next-button rounded-pill px-5">
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

export default Achievements;
