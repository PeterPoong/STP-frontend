import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Trash2, Edit, Save, Clock, Trophy, Building, FileText, X } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Achievements = ({ onBack, onNext }) => {
  const [achievements, setAchievements] = useState([]);
  const [achievementTypes, setAchievementTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAchievements();
    fetchAchievementTypes();
  }, []);

  const fetchAchievements = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/achievementsList`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }

      const result = await response.json();
      if (result.success) {
        setAchievements(result.data.data);
        
      } else {
        throw new Error(result.message || 'Failed to fetch achievements');
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        throw new Error('Failed to fetch achievement types');
      }

      const result = await response.json();
      if (result.success) {
        setAchievementTypes(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch achievement types');
      }
    } catch (error) {
      console.error('Error fetching achievement types:', error);
      setError(error.message);
    }
  };

  const handleAddAchievement = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const newAchievement = {
        achievement_name: '',
        date: new Date(),
        title: '',
        awarded_by: '',
        achievement_media: null,
        isEditing: true
      };

      setAchievements([...achievements, newAchievement]);
    } catch (error) {
      console.error('Error adding achievement:', error);
      setError(error.message);
    }
  };

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    setAchievements(updatedAchievements);
  };

  const handleSaveAchievement = async (index) => {
    const achievement = achievements[index];

    // Validate required fields
    if (!achievement.achievement_name || !achievement.title || !achievement.awarded_by || !achievement.date || !achievement.achievement_media) {
      alert('Please fill in all fields before saving.'); // Notify user
      return; // Exit the function if validation fails
    }

    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const dateToSave = achievement.date instanceof Date ? achievement.date : new Date(achievement.date);

      const formData = new FormData();
      formData.append('achievement_name', achievement.achievement_name);
      formData.append('date', dateToSave.toISOString().split('T')[0]);
      formData.append('title', achievement.title);
      formData.append('awarded_by', achievement.awarded_by);

      if (achievement.achievement_media instanceof File) {
        formData.append('achievement_media', achievement.achievement_media);
      } else if (achievement.fileRemoved) {
        formData.append('remove_media', 'true');
      }

      const url = achievement.id
        ? `${import.meta.env.VITE_BASE_URL}api/student/editAchievement?id=${achievement.id}`
        : `${import.meta.env.VITE_BASE_URL}api/student/addAchievement`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save achievement');
      }

      const result = await response.json();
      if (result.success) {
        const updatedAchievements = achievements.map((a, i) =>
          i === index ? { ...a, id: result.data.id, isEditing: false, fileRemoved: false } : a
        );
        setAchievements(updatedAchievements);
       
        await fetchAchievements();
      } else {
        throw new Error(result.message || 'Failed to save achievement');
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      setError(error.message);
    }
  };

  const handleDeleteAchievement = async (index) => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');
      const achievementId = achievements[index].id;

      if (!achievementId) {
        // If the achievement doesn't have an ID, it's not saved in the backend yet
        const updatedAchievements = achievements.filter((_, i) => i !== index);
        setAchievements(updatedAchievements);
        
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/deleteAchievement`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: achievementId, type: 'delete' }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete achievement');
      }

      const result = await response.json();
      if (result.success) {
        const updatedAchievements = achievements.filter((_, i) => i !== index);
        setAchievements(updatedAchievements);
        
        await fetchAchievements();
      } else {
        throw new Error(result.message || 'Failed to delete achievement');
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
      setError(error.message);
    }
  };

  const handleFileUpload = (index, file) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, achievement_media: file } : achievement
    );
    setAchievements(updatedAchievements);
  };

  const handleRemoveFile = (index) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, achievement_media: null, fileRemoved: true } : achievement
    );
    setAchievements(updatedAchievements);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="step-content p-4 rounded">
      <h3 className="border-bottom pb-2 fw-normal">Achievements</h3>
      <div className="achievement-list">
        {achievements.map((achievement, index) => (
          <div key={index} className="achievement-item row mb-4 border rounded p-4">
            {achievement.isEditing ? (
              <>
                <Form.Control
                  type="text"
                  placeholder="Name of Achievement..."
                  value={achievement.achievement_name}
                  onChange={(e) => handleAchievementChange(index, 'achievement_name', e.target.value)}
                  className="mb-2  ps-2 border p-0 fw-bold w-25"
                  style={{ fontSize: '1.1rem' }}
                />
                <div className="d-flex justify-content-between ps-0">
                  <div className="d-flex flex-grow-1 px-0">
                    <div className="d-flex align-items-center me-3 flex-shrink-0">
                      <Clock size={18} className="me-2" />
                      <DatePicker
                        selected={achievement.date instanceof Date ? achievement.date : new Date(achievement.date)}
                        onChange={(date) => handleAchievementChange(index, 'date', date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control py-0 px-2 date-picker-short"
                        placeholderText="Select date"
                      />
                    </div>
                    <div className="d-flex align-items-center me-3 flex-shrink-0">
                      <Trophy size={18} className="me-2" />
                      <Form.Control
                        as="select"
                        value={achievement.title} 
                        onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                        className="py-0 px-2 input-short"
                      >
                        <option value="">Select Title</option>
                        {achievementTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.core_metaName}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                    <div className="d-flex align-items-center me-3 flex-shrink-0">
                      <Building size={18} className="me-2" />
                      <Form.Control
                        type="text"
                        placeholder="Awarded By"
                        value={achievement.awarded_by}
                        onChange={(e) => handleAchievementChange(index, 'awarded_by', e.target.value)}
                        className="py-0 px-2 input-short"
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      {achievement.achievement_media ? (
                        <div className="d-flex align-items-center">
                          <FileText size={18} className="me-2" />
                          <span className="mx-0 text-decoration-underline text-truncate file-name">
                            {achievement.achievement_media instanceof File
                              ? achievement.achievement_media.name
                              : typeof achievement.achievement_media === 'string'
                                ? achievement.achievement_media
                                : 'File uploaded'}
                          </span>
                          <Button
                            variant="link"
                            className="p-0 me-5 text-danger"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <X size={18} />
                          </Button>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center ms-2">
                          <FileText size={18} className="me-2" />
                          <Button
                            variant="secondary"
                            className="d-flex align-items-center py-1 px-4 rounded-2"
                            onClick={() => document.getElementById(`achievementFileInput-${index}`).click()}
                          >
                            Upload File
                          </Button>
                          <input
                            id={`achievementFileInput-${index}`}
                            type="file"
                            className="d-none"
                            onChange={(e) => handleFileUpload(index, e.target.files[0])}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="link" onClick={() => handleSaveAchievement(index)} className="me-2">
                      <Save size={18} color="black" />
                    </Button>
                    <Button variant="link" onClick={() => handleDeleteAchievement(index)}>
                      <Trash2 size={18} color="red" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="fw-bold mb-2" style={{ fontSize: '1.1rem' }}>{achievement.achievement_name}</div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-grow-1 align-items-center">
                    <div className="me-3">
                      <Clock size={18} className="me-2" />
                      {formatDate(achievement.date)}
                    </div>
                    <div className="me-3"><Trophy size={18} className="me-2" />{achievement.title_obtained}</div>
                    <div className="me-3"><Building size={18} className="me-2" />{achievement.awarded_by}</div>
                    {achievement.achievement_media && (
                      <div className="d-flex align-items-center text-decoration-underline">
                        <FileText size={18} className="me-2" />
                        <span>
                          {achievement.achievement_media instanceof File
                            ? achievement.achievement_media.name
                            : typeof achievement.achievement_media === 'string'
                              ? achievement.achievement_media
                              : 'File uploaded'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="link" onClick={() => handleAchievementChange(index, 'isEditing', true)} className="me-2">
                      <Edit size={18} color="black" />
                    </Button>
                    <Button variant="link" onClick={() => handleDeleteAchievement(index)} className="">
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
        className="w-100 mt-3 sac-add-new-button"
      >
        Add New Achievement +
      </Button>
      <div className="d-flex justify-content-between mt-4">
        <Button onClick={onBack} className="me-2 rounded-pill px-5 sac-previous-button">
          Previous
        </Button>
        <Button onClick={onNext} className="sac-next-button rounded-pill px-5">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Achievements;