//applu course
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Form, Button, Row, Col, Spinner, Card } from "react-bootstrap";
import {
  Trash2,
  Edit,
  Plus,
  Upload,
  Save,
  FileText,
  X,
  AlignJustify,
} from "lucide-react";
import Select from "react-select";
import WidgetPopUpRemind from "../../../Components/StudentPortalComp/Widget/WidgetPopUpRemind";
import WidgetPopUpAcademicRemind from "../../../Components/StudentPortalComp/Widget/WidgetPopUpAcademicRemind";
import WidgetPopUpUnsavedChanges from "../../../Components/StudentPortalComp/Widget/WidgetPopUpUnsavedChanges";
const AcademicTranscript = ({ data = [], onBack, onNext }) => {
  const [academicTranscripts, setAcademicTranscripts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [documentErrors, setDocumentErrors] = useState({});
  const [isAcademicRemindPopupOpen, setIsAcademicRemindPopupOpen] =
    useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUnsavedChangesPopupOpen, setIsUnsavedChangesPopupOpen] =
    useState(false);
  const [navigationDirection, setNavigationDirection] = useState(null);
  const [savingStates, setSavingStates] = useState({});
  const [usedTranscriptTypes, setUsedTranscriptTypes] = useState(new Set());
  // Add a state for tracking hovered buttons
  const [hoveredButton, setHoveredButton] = useState(null);
  // Add a ref for the new document element
  const newDocumentRef = useRef(null);
  // Keep track of the last added document
  const [lastAddedDocument, setLastAddedDocument] = useState(null);
  // Add a function to handle both hover and touch events
  const handleButtonInteraction = (buttonId, isActive) => {
    setHoveredButton(isActive ? buttonId : null);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchTranscriptData();
      setIsLoading(false);
    };
    fetchAllData();
  }, []);

  const fetchTranscriptData = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      // console.log('Token:', token ? 'Token exists' : 'Token is missing');

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/applyCourseTranscript`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //console.log('Response status:', response.status);
      //console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();
      //console.log('API response:', result);

      if (result.success) {
        processTranscriptData(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch transcript data");
      }
    } catch (error) {
      console.error("Detailed error in fetchTranscriptData:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const processTranscriptData = (data) => {
    setCategories(data.categories);

    const processedTranscripts = [
      ...processSubjects(data.transcripts, 32, "SPM"),
      ...processSubjects(data.transcripts, 85, "SPM Trial"),
      ...processHigherTranscripts(data.higherTranscripts || []),
    ];

    const filteredTranscripts = processedTranscripts.filter(
      (transcript) =>
        transcript.subjects.length > 0 ||
        transcript.documents.length > 0 ||
        transcript.cgpa
    );

    setAcademicTranscripts(filteredTranscripts);

    // Update used transcript types based on existing data
    const usedTypes = new Set(filteredTranscripts.map((t) => t.id));
    setUsedTranscriptTypes(usedTypes);
  };

  const processSubjects = (subjects, categoryId, categoryName) => {
    if (!subjects) return [];

    // For SPM and Trial categories, process differently
    if (categoryId === 32 || categoryId === 85) {
      const subjectsArray =
        categoryId === 32 ? subjects.spm.subjects : subjects.trial.subjects;
      if (!Array.isArray(subjectsArray)) return [];

      return [
        {
          id: categoryId,
          name: categoryName || (categoryId === 32 ? "SPM" : "SPM Trial"),
          subjects: subjectsArray.map((subject) => ({
            id: subject.subject_id,
            name: subject.subject_name,
            grade: subject.subject_grade || "",
            isEditing: false,
          })),
          documents: processDocuments(
            categoryId === 32 ? subjects.spm.document : subjects.trial.document
          ),
          cgpa: null,
          programName: null,
          cgpaId: null,
        },
      ];
    }

    return [];
  };
  const processHigherTranscripts = (higherTranscripts) => {
    return higherTranscripts.map((transcript) => ({
      id: transcript.id,
      name: transcript.name,
      subjects: Array.isArray(transcript.subject)
        ? transcript.subject.flat().map((subj) => ({
            id: subj.id,
            name: subj.highTranscript_name || subj.subject_name,
            grade: subj.higherTranscript_grade || subj.subject_grade || "",
            isEditing: false,
          }))
        : [],
      documents: processDocuments(transcript.document),
      cgpa: transcript.cgpa,
      programName: transcript.program_name,
      cgpaId: null,
    }));
  };

  const processDocuments = (documents) => {
    if (!documents) return [];
    // If documents is an array of arrays, flatten it
    const flatDocuments = Array.isArray(documents[0])
      ? documents.flat()
      : documents;

    return flatDocuments.map((doc) => ({
      id: doc.id,
      name: doc.studentMedia_name || doc.name || "Untitled",
      file: doc.studentMedia_location || doc.file || "",
      isEditing: false,
    }));
  };

  // Replace the existing fetchTranscriptCategories function with this:
  const fetchTranscriptCategories = async () => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/transcriptCategoryList`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transcript categories");
      }

      const result = await response.json();
      if (result.success) {
        setCategories(result.data.data);
        await fetchExistingTranscripts(result.data.data);
      } else {
        throw new Error(
          result.message || "Failed to fetch transcript categories"
        );
      }
    } catch (error) {
      console.error("Error fetching transcript categories:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  // Replace the existing fetchExistingTranscripts function with this:
  const fetchExistingTranscripts = async (categories) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");

      const transcriptPromises = categories.map(async (category) => {
        const [subjectsResult, documentsResult, cgpaResult] = await Promise.all(
          [
            fetchSubjectsForCategory(category, token),
            fetchDocumentsForCategory(category, token),
            fetchCGPAForCategory(category, token),
          ]
        );

        return {
          id: category.id,
          name: category.transcript_category,
          subjects: subjectsResult,
          documents: documentsResult,
          cgpa: cgpaResult.cgpa,
          programName: cgpaResult.programName,
          cgpaId: cgpaResult.cgpaId,
        };
      });

      const existingTranscripts = await Promise.all(transcriptPromises);
      setAcademicTranscripts(
        existingTranscripts.filter(
          (transcript) =>
            transcript.subjects.length > 0 ||
            transcript.documents.length > 0 ||
            transcript.cgpa
        )
      );
    } catch (error) {
      console.error("Error fetching existing transcripts:", error);
      setError("Failed to load existing transcripts. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add these new functions after the fetchExistingTranscripts function

  const fetchSubjectsForCategory = async (category, token) => {
    const subjectsUrl =
      category.id === 32 || category.id === 85
        ? `${import.meta.env.VITE_BASE_URL}api/student/transcriptSubjectList`
        : `${
            import.meta.env.VITE_BASE_URL
          }api/student/higherTranscriptSubjectList`;

    const method = category.id === 32 || category.id === 85 ? "GET" : "POST";
    const body =
      category.id === 32 || category.id === 85
        ? null
        : JSON.stringify({ id: category.id });

    const response = await fetch(subjectsUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(method === "POST" && { body }),
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch subjects for category ${category.transcript_category}`
      );
      return [];
    }

    const result = await response.json();

    if (result.success) {
      if (category.id === 32) {
        return result.data.spm.map((subject) => ({
          id: subject.subject_id,
          name: subject.subject_name,
          grade: subject.subject_grade || "",
        }));
      } else if (category.id === 85) {
        return result.data.trial.map((subject) => ({
          id: subject.subject_id,
          name: subject.subject_name,
          grade: subject.subject_grade || "",
        }));
      } else {
        return result.data.map((subject) => ({
          id: subject.id || subject.subject_id,
          name:
            subject.name || subject.subject_name || subject.highTranscript_name,
          grade:
            subject.grade ||
            subject.subject_grade ||
            subject.higherTranscript_grade ||
            "",
        }));
      }
    }
    return [];
  };

  const fetchDocumentsForCategory = async (category, token) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category_id: category.id }),
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch documents for category ${category.transcript_category}`
      );
      return [];
    }

    const result = await response.json();
    return result.success && result.data && result.data.data
      ? result.data.data.map((doc) => ({
          id: doc.id,
          name: doc.studentMedia_name,
          file: doc.studentMedia_location,
        }))
      : [];
  };

  const fetchCGPAForCategory = async (category, token) => {
    if (category.id === 32 || category.id === 85) {
      return { cgpa: null, programName: "", cgpaId: null };
    }

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}api/student/programCgpaList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ transcriptCategory: category.id }),
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch CGPA for category ${category.transcript_category}`
      );
      return { cgpa: null, programName: "", cgpaId: null };
    }

    const result = await response.json();
    return result.success && result.data
      ? {
          cgpa: result.data.cgpa,
          programName: result.data.program_name,
          cgpaId: result.data.id,
        }
      : { cgpa: null, programName: "", cgpaId: null };
  };

  const handleProgramNameChange = (transcriptIndex, value) => {
    const updatedTranscripts = [...academicTranscripts];
    updatedTranscripts[transcriptIndex].programName = value;
    setAcademicTranscripts(updatedTranscripts);
    setHasUnsavedChanges(true);
  };

  const handleCGPAChange = (transcriptIndex, value) => {
    const updatedTranscripts = [...academicTranscripts];
    updatedTranscripts[transcriptIndex].cgpa = value;
    setAcademicTranscripts(updatedTranscripts);
    setHasUnsavedChanges(true);
  };

  const presetSPMSubjects = () => {
    return [
      { id: 1, name: "Bahasa Melayu", grade: "", isEditing: true },
      { id: 2, name: "Bahasa Inggeris", grade: "", isEditing: true },
      { id: 3, name: "Pendidikan Moral", grade: "", isEditing: true },
      { id: 4, name: "Matematik", grade: "", isEditing: true },
      { id: 5, name: "Sains", grade: "", isEditing: true },
    ];
  };

  const fetchAvailableSubjects = useCallback(
    async (categoryId, transcriptIndex) => {
      if (categoryId !== 32 && categoryId !== 85) return;

      try {
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");

        // Get all currently selected subjects for this transcript
        const selectedSubjectIds = academicTranscripts[
          transcriptIndex
        ]?.subjects
          .filter((s) => s.id && !s.isNew) // Only consider saved subjects
          .map((s) => s.id);

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}api/student/subjectList`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              category: categoryId,
              selectedSubject: selectedSubjectIds,
            }),
          }
        );

        const data = await response.json();
        if (data.success) {
          // Don't filter out subjects here, let the Select component handle it
          setAvailableSubjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching available subjects:", error);
      }
    },
    [academicTranscripts]
  );

  const fetchSubjects = useCallback(
    async (categoryId, transcriptIndex) => {
      if ((categoryId === 32 || categoryId === 85) && isNewUser) {
        // Don't fetch for SPM if it's a new user, as we've already preset the subjects
        return;
      }

      try {
        const token =
          sessionStorage.getItem("token") || localStorage.getItem("token");
        let url, method, body;
        if (categoryId === 32 || categoryId === 85) {
          url = `${
            import.meta.env.VITE_BASE_URL
          }api/student/transcriptSubjectList`;
          method = "GET";
        } else {
          url = `${
            import.meta.env.VITE_BASE_URL
          }api/student/higherTranscriptSubjectList`;
          method = "POST";
          body = JSON.stringify({ id: categoryId });
        }

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          ...(method === "POST" && { body }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          const formattedSubjects = result.data.map((subject) => ({
            id: subject.id || subject.subject_id,
            name:
              subject.name ||
              subject.subject_name ||
              subject.highTranscript_name,
            grade:
              subject.grade ||
              subject.subject_grade ||
              subject.higherTranscript_grade,
            isEditing: false,
          }));

          setAcademicTranscripts((prevTranscripts) =>
            prevTranscripts.map((transcript, index) =>
              index === transcriptIndex
                ? { ...transcript, subjects: formattedSubjects }
                : transcript
            )
          );

          if (
            (categoryId === 32 || categoryId === 85) &&
            formattedSubjects.length > 0
          ) {
            setIsNewUser(false); // User has existing SPM subjects, so not a new user
          }
        } else {
          console.error("Failed to fetch subjects:", result);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    },
    [isNewUser]
  );

  // Helper function to get available categories for a specific transcript
  const getAvailableCategories = (currentTranscriptIndex) => {
    const selectedCategoryIds = academicTranscripts
      .filter(
        (transcript, index) => transcript.id && index !== currentTranscriptIndex
      )
      .map((transcript) => transcript.id);

    return categories
      .filter((cat) => !selectedCategoryIds.includes(cat.id))
      .map((cat) => ({ value: cat.id, label: cat.transcript_category }));
  };

  const handleAddTranscript = () => {
    const availableCategories = categories.filter(
      (category) =>
        !academicTranscripts.some((transcript) => transcript.id === category.id)
    );

    if (availableCategories.length > 0) {
      setAcademicTranscripts([
        ...academicTranscripts,
        { id: null, name: "", subjects: [], documents: [] },
      ]);
    } else {
      alert("All available exam types have been added.");
    }
  };

  const handleTranscriptChange = (index, { id, name }) => {
    //console.log('Transcript change - ID:', id, 'Name:', name);
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === index ? { ...transcript, id, name } : transcript
    );
    setAcademicTranscripts(updatedTranscripts);

    if (id) {
      const isSPMType = id === 32 || id === 85;

      // Check if this specific type (SPM or SPM Trial) already exists with subjects
      const existingTranscriptWithSubjects = academicTranscripts.some(
        (transcript) =>
          transcript.id === id &&
          transcript.subjects &&
          transcript.subjects.length > 0
      );
      //console.log('Is SPM Type:', isSPMType, 'Has existing subjects:', existingTranscriptWithSubjects);
      if (isSPMType && !existingTranscriptWithSubjects) {
        //  console.log('Setting preset subjects for:', name);
        const presetSubjects = presetSPMSubjects();
        updatedTranscripts[index].subjects = presetSubjects;
        setAcademicTranscripts(updatedTranscripts);
      } else {
        fetchSubjects(id, index);
      }

      if (isSPMType) {
        fetchAvailableSubjects(id, index);
      }
    }
  };

  const handleRemoveTranscript = async (index) => {
    const transcript = academicTranscripts[index];

    if (!transcript.id) {
      // If the transcript doesn't have an ID, it's not saved in the backend yet
      setAcademicTranscripts(academicTranscripts.filter((_, i) => i !== index));
      return;
    }

    // Confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this transcript? This will delete all associated data including subjects, documents, and CGPA information."
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const result = await resetTranscript(transcript.id);
      if (result.success) {
        // Remove the transcript from the state
        setAcademicTranscripts(
          academicTranscripts.filter((_, i) => i !== index)
        );

        // Clear any errors associated with this transcript
        setDocumentErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`${index}-`)) {
              delete newErrors[key];
            }
          });
          return newErrors;
        });

        // Optionally, show a success message
        alert(
          "Transcript successfully removed and all associated data has been deleted."
        );
      } else {
        throw new Error(result.message || "Failed to reset transcript");
      }
    } catch (error) {
      console.error("Error removing transcript:", error);
      alert(`Failed to remove transcript: ${error.message}`);
    }
  };

  const handleAddSubject = (transcriptIndex) => {
    const transcript = academicTranscripts[transcriptIndex];
    if (transcript.id === 32 || transcript.id === 85) {
      // Fetch available subjects before adding new subject
      fetchAvailableSubjects(transcript.id, transcriptIndex).then(() => {
        const updatedTranscripts = academicTranscripts.map((t, i) =>
          i === transcriptIndex
            ? {
                ...t,
                subjects: [
                  ...t.subjects,
                  { id: "", name: "", grade: "", isEditing: true, isNew: true },
                ],
              }
            : t
        );
        setAcademicTranscripts(updatedTranscripts);
      });
    } else {
      // Original logic for non-SPM transcripts
      const updatedTranscripts = academicTranscripts.map((t, i) =>
        i === transcriptIndex
          ? {
              ...t,
              subjects: [
                ...t.subjects,
                { name: "", grade: "", isEditing: true },
              ],
            }
          : t
      );
      setAcademicTranscripts(updatedTranscripts);
    }
  };

  // Unified handler for subject selection
  const handleSubjectSelectChange = (
    transcriptIndex,
    subjectIndex,
    selected
  ) => {
    const { value, label } = selected;
    setAcademicTranscripts((prevTranscripts) =>
      prevTranscripts.map((transcript, i) =>
        i === transcriptIndex
          ? {
              ...transcript,
              subjects: transcript.subjects.map((subject, j) =>
                j === subjectIndex
                  ? { ...subject, id: value, name: label }
                  : subject
              ),
            }
          : transcript
      )
    );
  };

  const handleSubjectChange = (transcriptIndex, subjectIndex, field, value) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
            ...transcript,
            subjects: transcript.subjects.map((subject, j) =>
              j === subjectIndex ? { ...subject, [field]: value } : subject
            ),
          }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);
    setHasUnsavedChanges(true);

    // If it's SPM and we're changing the subject, update available subjects
    if (updatedTranscripts[transcriptIndex].id === 32 && field === "id") {
      fetchAvailableSubjects(32 || 85, transcriptIndex);
    }
  };

  const [subjectErrors, setSubjectErrors] = useState({});

  // Replace the existing function with this enhanced version
  const handleSaveSubject = (transcriptIndex, subjectIndex) => {
    const subject = academicTranscripts[transcriptIndex].subjects[subjectIndex];
    
    // Validate that subject has a name and grade
    if (!subject.name.trim()) {
      setSubjectErrors(prev => ({
        ...prev,
        [`${transcriptIndex}-${subjectIndex}`]: "Subject name is required"
      }));
      return;
    }
    
    if (!subject.grade) {
      setSubjectErrors(prev => ({
        ...prev,
        [`${transcriptIndex}-${subjectIndex}`]: "Grade is required"
      }));
      return;
    }
    
    // Clear any existing errors
    setSubjectErrors(prev => {
      const newErrors = {...prev};
      delete newErrors[`${transcriptIndex}-${subjectIndex}`];
      return newErrors;
    });
    
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
            ...transcript,
            subjects: transcript.subjects.map((subject, j) =>
              j === subjectIndex ? { ...subject, isEditing: false } : subject
            ),
          }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);
    setHasUnsavedChanges(true);
  };

  // Add this new validation function
  const validateSubjects = (transcriptIndex) => {
    const transcript = academicTranscripts[transcriptIndex];
    let hasErrors = false;
    const newErrors = {...subjectErrors};
    
    // Check each subject in editing mode
    transcript.subjects.forEach((subject, subjectIndex) => {
      if (subject.isEditing) {
        if (!subject.name.trim()) {
          newErrors[`${transcriptIndex}-${subjectIndex}`] = "Subject name is required";
          hasErrors = true;
        } else if (!subject.grade) {
          newErrors[`${transcriptIndex}-${subjectIndex}`] = "Grade is required";
          hasErrors = true;
        } else {
          delete newErrors[`${transcriptIndex}-${subjectIndex}`];
        }
      }
    });
    
    setSubjectErrors(newErrors);
    return !hasErrors;
  };

  // Modify the edit subjects button click handler
  const handleEditSubjectsToggle = (transcriptIndex) => {
    const updatedTranscripts = [...academicTranscripts];
    const isCurrentlyEditing = updatedTranscripts[transcriptIndex].subjects.some((s) => s.isEditing);
    
    if (isCurrentlyEditing) {
      // Validate all subjects before disabling edit mode
      if (!validateSubjects(transcriptIndex)) {
        // If validation fails, keep edit mode on
        return;
      }
    }
    
    // Toggle editing state for all subjects in this transcript
    updatedTranscripts[transcriptIndex].subjects = updatedTranscripts[transcriptIndex].subjects.map((subject) => ({
      ...subject,
      isEditing: !isCurrentlyEditing,
    }));
    
    setAcademicTranscripts(updatedTranscripts);
    
    // If turning on edit mode, fetch available subjects for SPM transcripts
    if (!isCurrentlyEditing && (updatedTranscripts[transcriptIndex].id === 32 || updatedTranscripts[transcriptIndex].id === 85)) {
      fetchAvailableSubjects(updatedTranscripts[transcriptIndex].id, transcriptIndex);
    }
  };

  const handleRemoveSubject = (transcriptIndex, subjectIndex) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
            ...transcript,
            subjects: transcript.subjects.filter((_, j) => j !== subjectIndex),
          }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);
    setHasUnsavedChanges(true);

    if (updatedTranscripts[transcriptIndex].id === 32) {
      fetchAvailableSubjects(32 || 85, transcriptIndex);
    }
  };
  const handleAddDocument = (transcriptIndex) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
            ...transcript,
            documents: [
              ...transcript.documents,
              { name: "", file: null, isEditing: true },
            ],
          }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);
    
    // Set the last added document for scrolling
    const newDocIndex = updatedTranscripts[transcriptIndex].documents.length - 1;
    setLastAddedDocument({ transcriptIndex, docIndex: newDocIndex });
  };

  const handleDocumentChange = (
    transcriptIndex,
    documentIndex,
    field,
    value
  ) => {
    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
            ...transcript,
            documents: transcript.documents.map((doc, j) =>
              j === documentIndex
                ? { ...doc, [field]: value, isEditing: true }
                : doc
            ),
          }
        : transcript
    );
    setAcademicTranscripts(updatedTranscripts);

    // Clear any existing errors for this document
    setDocumentErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`${transcriptIndex}-${documentIndex}`];
      return newErrors;
    });
  };

  const fetchDocumentsForTranscript = async (transcriptIndex) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const transcript = academicTranscripts[transcriptIndex];

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/mediaListByCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ category_id: transcript.id }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      //console.log('Fetched documents:', result);

      if (result.success && result.data && result.data.data) {
        const updatedDocuments = result.data.data.map((doc) => ({
          id: doc.id,
          name: doc.studentMedia_name,
          file: doc.studentMedia_location,
          isEditing: false,
        }));

        setAcademicTranscripts((prevTranscripts) =>
          prevTranscripts.map((t, index) =>
            index === transcriptIndex
              ? { ...t, documents: updatedDocuments }
              : t
          )
        );
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Failed to fetch updated documents. Please try again later.");
    }
  };

  const handleSaveDocument = async (transcriptIndex, documentIndex) => {
    try {
      //console.log('Starting handleSaveDocument');
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const transcript = academicTranscripts[transcriptIndex];
      const document = transcript.documents[documentIndex];

      // Validate document title
      if (!document.name.trim()) {
        setDocumentErrors((prevErrors) => ({
          ...prevErrors,
          [`${transcriptIndex}-${documentIndex}`]:
            "Document title cannot be empty",
        }));
        return;
      }

      // Validate file upload
      if (!document.file) {
        setDocumentErrors((prevErrors) => ({
          ...prevErrors,
          [`${transcriptIndex}-${documentIndex}`]: "File upload is required",
        }));
        return;
      }

      const formData = new FormData();
      formData.append("studentMedia_type", transcript.id.toString());
      formData.append("studentMedia_name", document.name);
      if (document.file instanceof File) {
        formData.append("studentMedia_location", document.file);
      }

      let url;
      if (document.id) {
        url = `${import.meta.env.VITE_BASE_URL}api/student/editTranscriptFile`;
        formData.append("id", document.id.toString());
      } else {
        url = `${import.meta.env.VITE_BASE_URL}api/student/addTranscriptFile`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      //console.log('Response data:', result);

      if (result.success) {
        //console.log('Document saved successfully');
        await fetchDocumentsForTranscript(transcriptIndex);
        // Clear errors for this document
        setDocumentErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`${transcriptIndex}-${documentIndex}`];
          return newErrors;
        });
      } else {
        if (
          result.message === "Validation Error" &&
          result.error &&
          result.error.transcripts
        ) {
          setDocumentErrors((prevErrors) => ({
            ...prevErrors,
            [`${transcriptIndex}-${documentIndex}`]:
              result.error.transcripts[0],
          }));
        } else {
          throw new Error(result.message || "Failed to save document");
        }
      }
    } catch (error) {
      console.error("Error in handleSaveDocument:", error);
      setDocumentErrors((prevErrors) => ({
        ...prevErrors,
        [`${transcriptIndex}-${documentIndex}`]: error.message,
      }));
    }
  };

  const handleRemoveDocument = async (transcriptIndex, documentIndex) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const document =
        academicTranscripts[transcriptIndex].documents[documentIndex];

      if (!document.id) {
        // If the document doesn't have an ID, it's not saved in the backend yet
        const updatedTranscripts = academicTranscripts.map((transcript, i) =>
          i === transcriptIndex
            ? {
                ...transcript,
                documents: transcript.documents.filter(
                  (_, j) => j !== documentIndex
                ),
              }
            : transcript
        );
        setAcademicTranscripts(updatedTranscripts);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/deleteTranscriptFile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: document.id, type: "delete" }),
        }
      );

      const result = await response.json();
      if (result.success) {
        //console.log('Document removed successfully');
        // Fetch updated documents instead of updating state directly
        await fetchDocumentsForTranscript(transcriptIndex);
      } else {
        throw new Error(result.message || "Failed to delete document");
      }
    } catch (error) {
      console.error("Error removing document:", error);
      setError(error.message);
    }
  };

  const handleDocumentFileUpload = (transcriptIndex, docIndex, file) => {
    //console.log('handleDocumentFileUpload called');
    //console.log('transcriptIndex:', transcriptIndex);
    //console.log('docIndex:', docIndex);
    //console.log('file:', file);

    const updatedTranscripts = academicTranscripts.map((transcript, i) =>
      i === transcriptIndex
        ? {
            ...transcript,
            documents: transcript.documents.map((doc, j) =>
              j === docIndex
                ? { ...doc, file: file, mediaName: file.name, isEditing: true }
                : doc
            ),
          }
        : transcript
    );

    //console.log('Updated transcript:', updatedTranscripts[transcriptIndex]);
    setAcademicTranscripts(updatedTranscripts);
  };

  const gradeToInt = (grade) => {
    const gradeMap = {
      "A+": 17,
      A: 18,
      "A-": 19,
      "B+": 20,
      B: 21,
      "C+": 22,
      C: 23,
      D: 24,
      E: 25,
      G: 26,
      TH: 27,
    };
    return gradeMap[grade] || 0; // Return 0 if grade not found
  };

  const saveTranscript = async (transcriptIndex) => {
    setSavingStates((prev) => ({ ...prev, [transcriptIndex]: "loading" }));
    try {
      const transcript = academicTranscripts[transcriptIndex];
      
      // First validate any subjects in editing mode
      if (transcript.subjects.some(subject => subject.isEditing)) {
        if (!validateSubjects(transcriptIndex)) {
          setSavingStates((prev) => ({ ...prev, [transcriptIndex]: "failed" }));
          setTimeout(() => {
            setSavingStates((prev) => ({ ...prev, [transcriptIndex]: null }));
          }, 2000);
          return;
        }
      }
      
      // Check if the transcript is empty or if any required fields are missing
      const isTranscriptEmpty =
        transcript.subjects.length === 0 && transcript.documents.length === 0;
      const isCGPAMissing =
        transcript.id !== 32 && transcript.id !== 85 && !transcript.cgpa;
      const areSubjectsIncomplete = transcript.subjects.some(
        (subject) => !subject.name || !subject.grade
      );

      if (isTranscriptEmpty || isCGPAMissing || areSubjectsIncomplete) {
        setIsAcademicRemindPopupOpen(true);
        setSavingStates((prev) => ({ ...prev, [transcriptIndex]: null }));
        return;
      }
      
      // Proceed with saving if all checks pass
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const category = categories.find(
        (cat) => cat.transcript_category === transcript.name
      );

      if (!category) {
        throw new Error("Invalid transcript category");
      }

      let url, payload;
      if (category.id === 32 || category.id === 85) {
        // SPM
        // Fetch the correct subject IDs for new subjects
        const subjectsWithCorrectIds = await Promise.all(
          transcript.subjects.map(async (subject) => {
            if (subject.isNew || !subject.id) {
              const subjectResponse = await fetch(
                `${import.meta.env.VITE_BASE_URL}api/student/subjectList`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ category: category.id }),
                }
              );
              const subjectData = await subjectResponse.json();
              const correctSubject = subjectData.data.find(
                (s) => s.name === subject.name
              );
              return {
                ...subject,
                id: correctSubject ? correctSubject.id : subject.id,
              };
            }
            return subject;
          })
        );

        url = `${import.meta.env.VITE_BASE_URL}api/student/addEditTranscript`;
        payload = {
          category: category.id,
          data: subjectsWithCorrectIds
            .filter((subject) => subject.grade && subject.id)
            .map((subject) => ({
              subjectID: subject.id,
              grade: gradeToInt(subject.grade),
            })),
        };
      } else {
        url = `${
          import.meta.env.VITE_BASE_URL
        }api/student/addEditHigherTranscript`;
        payload = {
          category: category.id,
          data: transcript.subjects
            .filter((subject) => subject.name && subject.grade)
            .map((subject) => ({
              name: subject.name,
              grade: subject.grade,
            })),
        };

        // Add CGPA and program name to payload for non-SPM transcripts
        if (transcript.cgpa !== null) {
          // Determine whether to use addProgramCgpa or editProgramCgpa
          const cgpaUrl = transcript.cgpaId
            ? `${import.meta.env.VITE_BASE_URL}api/student/editProgramCgpa`
            : `${import.meta.env.VITE_BASE_URL}api/student/addProgramCgpa`;

          const cgpaPayload = {
            transcriptCategory: category.id,
            cgpa: transcript.cgpa,
            ...(transcript.programName && {
              programName: transcript.programName,
            }),
            ...(transcript.cgpaId && { cgpaId: transcript.cgpaId }),
          };

          const cgpaResponse = await fetch(cgpaUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cgpaPayload),
          });

          const cgpaResult = await cgpaResponse.json();

          if (!cgpaResult.success) {
            console.error("CGPA update failed:", cgpaResult);
            throw new Error(
              cgpaResult.message || "Failed to update CGPA and program name"
            );
          }

          // Update the transcript with the new CGPA ID if it was just added
          if (!transcript.cgpaId && cgpaResult.data && cgpaResult.data.id) {
            const updatedTranscripts = [...academicTranscripts];
            updatedTranscripts[transcriptIndex].cgpaId = cgpaResult.data.id;
            setAcademicTranscripts(updatedTranscripts);
          }
        }
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        setSavingStates((prev) => ({ ...prev, [transcriptIndex]: "success" }));
        setTimeout(() => {
          setSavingStates((prev) => ({ ...prev, [transcriptIndex]: null }));
        }, 2000);
        setHasUnsavedChanges(false);
        setUsedTranscriptTypes((prev) => new Set([...prev, category.id]));
        fetchSubjects(category.id, transcriptIndex);

        if (category.id !== 32 || category.id !== 85) {
          const updatedCGPAData = await fetchCGPAForCategory(category, token);
          const updatedTranscripts = [...academicTranscripts];
          updatedTranscripts[transcriptIndex] = {
            ...updatedTranscripts[transcriptIndex],
            cgpa: updatedCGPAData.cgpa,
            programName: updatedCGPAData.programName,
            cgpaId: updatedCGPAData.cgpaId,
          };
          setAcademicTranscripts(updatedTranscripts);
        }

        const updatedTranscripts = [...academicTranscripts];
        updatedTranscripts[transcriptIndex].subjects = updatedTranscripts[
          transcriptIndex
        ].subjects.map((subject) => ({
          ...subject,
          isEditing: false,
        }));
        setAcademicTranscripts(updatedTranscripts);
        // Clear any errors for this transcript
        setDocumentErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[transcriptIndex];
          return newErrors;
        });
      } else {
        console.error("Server Error Details:", {
          message: data.message,
          error: data.error,
          validationErrors: data.error?.transcripts,
        });

        if (
          data.message === "Validation Error" &&
          data.error &&
          data.error.transcripts
        ) {
          // Assign the error to the last document
          const lastDocIndex = transcript.documents.length - 1;
          setDocumentErrors((prevErrors) => ({
            ...prevErrors,
            [`${transcriptIndex}-${lastDocIndex}`]: data.error.transcripts[0],
          }));
        } else {
          throw new Error(data.message || "Server responded with an error");
        }
      }
    } catch (error) {
      console.error("Caught Exception:", {
        message: error.message,
        stack: error.stack,
        transcriptIndex,
      });
      setSavingStates((prev) => ({ ...prev, [transcriptIndex]: "failed" }));
      setDocumentErrors((prevErrors) => ({
        ...prevErrors,
        [transcriptIndex]: `Failed to save transcript: ${error.message}`,
      }));
    }
  };

  const resetTranscript = async (transcriptType) => {
    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}api/student/resetTranscript`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transcriptType }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to reset transcript");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error resetting transcript:", error);
      throw error;
    }
  };

  const getGradeColor = (grade) => {
    if (!grade) return "secondary"; // Handle undefined or null grades

    grade = grade.toString().toUpperCase(); // Convert to string and uppercase

    if (grade.includes("A")) return "success";
    if (grade.includes("B")) return "success";
    if (grade.includes("C")) return "success";
    if (grade.includes("D")) return "warning";
    if (grade.includes("E")) return "warning";
    if (grade.includes("G")) return "danger";
    if (grade.includes("TH")) return "danger";

    return "secondary";
  };

  // Add this new validation function
  const hasValidTranscripts = () => {
    // Check if there are any transcripts at all
    if (academicTranscripts.length === 0) {
      return false;
    }

    // Check if at least one transcript has been properly saved with data
    return academicTranscripts.some(transcript => {
      // Skip validation for transcripts that don't have an ID (not saved yet)
      if (!transcript.id) {
        return false;
      }

      // For SPM/Trial transcripts
      if (transcript.id === 32 || transcript.id === 85) {
        const hasValidSubjects = transcript.subjects && 
                                transcript.subjects.length > 0 && 
                                transcript.subjects.every(subject => 
                                  subject.name && 
                                  subject.grade && 
                                  !subject.isEditing  // Make sure subjects are saved
                                );
        
        return hasValidSubjects;  // For SPM, we only need valid subjects
      }
      
      // For other transcripts
      const hasValidSubjects = transcript.subjects && 
                              transcript.subjects.length > 0 && 
                              transcript.subjects.every(subject => 
                                subject.name && 
                                subject.grade && 
                                !subject.isEditing
                              );
      
      const hasValidCGPA = transcript.cgpa !== null && 
                          transcript.cgpa !== undefined;

      return hasValidSubjects && hasValidCGPA;
    });
  };

  // Modify the handleNext function
  const handleNext = () => {
    if (academicTranscripts.length === 0) {
      setIsPopupOpen(true); // Show popup for no transcripts
      return;
    }

    if (!hasValidTranscripts()) {
      setIsAcademicRemindPopupOpen(true); // Show popup for incomplete transcripts
      return;
    }

    onNext();
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Modify the handleNavigation function
  const handleNavigation = (direction) => {
    if (direction === "next") {
      if (academicTranscripts.length === 0) {
        setIsPopupOpen(true);
        return;
      }

      // First check for unsaved changes
      if (hasUnsavedChanges) {
        setNavigationDirection(direction);
        setIsUnsavedChangesPopupOpen(true);
        return;
      }

      // Then check for valid transcripts
      if (!hasValidTranscripts()) {
        setIsAcademicRemindPopupOpen(true);
        return;
      }

      onNext();
    } else {
      if (hasUnsavedChanges) {
        setNavigationDirection(direction);
        setIsUnsavedChangesPopupOpen(true);
      } else {
        onBack();
      }
    }
  };

  const handleUnsavedChangesConfirm = () => {
    setIsUnsavedChangesPopupOpen(false);
    
    if (navigationDirection === "next") {
      // Check if there's at least one valid saved transcript before proceeding
      if (!hasValidTranscripts()) {
        setIsAcademicRemindPopupOpen(true);
        return;
      }
      onNext();
    } else if (navigationDirection === "back") {
      onBack();
    }
    setNavigationDirection(null);
    setHasUnsavedChanges(false);
  };

  const handleUnsavedChangesCancel = () => {
    setIsUnsavedChangesPopupOpen(false);
    setNavigationDirection(null);
  };

  // Add this effect to scroll to new document when added
  useEffect(() => {
    if (lastAddedDocument !== null) {
      const { transcriptIndex, docIndex } = lastAddedDocument;
      const element = document.getElementById(`document-${transcriptIndex}-${docIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Reset last added document after scrolling
        setLastAddedDocument(null);
      }
    }
  }, [lastAddedDocument]);

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
    <div className="step-content-casetwo p-4 rounded">
      <h3 className="border-bottom border-2 pb-2 mb-3 fw-normal">
        Academic Transcript
      </h3>
      {academicTranscripts.map((transcript, index) => (
        <div
          key={index}
          className="academic-transcript-item mb-4 border rounded py-4"
        >
          <Row className="sac-container-casetwo justify-content-between align-items-start align-items-sm-center mb-3 px-4">
            <Col
              sm="8"
              lg="auto"
              className="d-flex align-items-center mb-2 mb-sm-0"
            >
              <AlignJustify className="me-2 align-self-center" size={20} />
              <Form.Select
                value={transcript.id || ""}
                onChange={(e) => {
                  const selectedCategory = getAvailableCategories(index).find(
                    (cat) => cat.value === parseInt(e.target.value)
                  );
                  if (selectedCategory) {
                    handleTranscriptChange(index, {
                      id: selectedCategory.value,
                      name: selectedCategory.label,
                    });
                  }
                }}
                className="fw-bold border-0 sac-at-bg sac-at-select-style w-100 bg-white py-2 rounded-pill"
              >
                <option disabled value="">
                  Choose an education
                </option>
                {getAvailableCategories(index).map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Desktop buttons - hide on mobile */}
            <Col sm="auto" lg="auto" className="d-none d-sm-block">
              {/* Mobile responsive pill style buttons */}
              <div className="bg-white bg-opacity-75 p-0 rounded-pill d-flex align-items-center transition-all">
                {/* Add Subject Button */}
                <button
                  className={`
                    border-0 rounded-pill transition-all
                    d-flex align-items-center justify-content-center overflow-hidden
                    ${
                      hoveredButton === `subject-${index}`
                        ? "bg-primary text-white px-2"
                        : "bg-transparent text-secondary hover-bg-light"
                    }
                  `}
                  style={{
                    height: "calc(28px + min(0.5vw, 4px))",
                    width:
                      hoveredButton === `subject-${index}`
                        ? "auto"
                        : "calc(28px + min(0.5vw, 4px))",
                    minWidth: "calc(28px + min(0.5vw, 4px))",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={() =>
                    handleButtonInteraction(`subject-${index}`, true)
                  }
                  onMouseLeave={() =>
                    handleButtonInteraction(`subject-${index}`, false)
                  }
                  onTouchStart={() =>
                    handleButtonInteraction(`subject-${index}`, true)
                  }
                  onTouchEnd={() =>
                    setTimeout(
                      () => handleButtonInteraction(`subject-${index}`, false),
                      1000
                    )
                  }
                  onClick={() => handleAddSubject(index)}
                  aria-label="Add Subject"
                >
                  <Plus size={14} className="flex-shrink-0" />
                  <span
                    className="ms-1 fw-medium text-nowrap transition-all"
                    style={{
                      fontSize: "min(0.75rem, 3.5vw)",
                      opacity: hoveredButton === `subject-${index}` ? 1 : 0,
                      maxWidth:
                        hoveredButton === `subject-${index}` ? "80px" : "0",
                      overflow: "hidden",
                      transition: "all 0.2s",
                    }}
                  >
                    Subject
                  </span>
                </button>

                {/* Add Document Button */}
                <button
                  className={`
                    border-0 rounded-pill mx-1 transition-all
                    d-flex align-items-center justify-content-center overflow-hidden
                    ${
                      hoveredButton === `document-${index}`
                        ? "bg-primary text-white px-2"
                        : "bg-transparent text-secondary hover-bg-light"
                    }
                  `}
                  style={{
                    height: "calc(28px + min(0.5vw, 4px))",
                    width:
                      hoveredButton === `document-${index}`
                        ? "auto"
                        : "calc(28px + min(0.5vw, 4px))",
                    minWidth: "calc(28px + min(0.5vw, 4px))",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={() =>
                    handleButtonInteraction(`document-${index}`, true)
                  }
                  onMouseLeave={() =>
                    handleButtonInteraction(`document-${index}`, false)
                  }
                  onTouchStart={() =>
                    handleButtonInteraction(`document-${index}`, true)
                  }
                  onTouchEnd={() =>
                    setTimeout(
                      () => handleButtonInteraction(`document-${index}`, false),
                      1000
                    )
                  }
                  onClick={() => handleAddDocument(index)}
                  aria-label="Add Document"
                >
                  <Upload size={14} className="flex-shrink-0" />
                  <span
                    className="ms-1 fw-medium text-nowrap transition-all"
                    style={{
                      fontSize: "min(0.75rem, 3.5vw)",
                      opacity: hoveredButton === `document-${index}` ? 1 : 0,
                      maxWidth:
                        hoveredButton === `document-${index}` ? "80px" : "0",
                      overflow: "hidden",
                      transition: "all 0.2s",
                    }}
                  >
                    Document
                  </span>
                </button>

                {/* Remove Transcript Button */}
                <button
                  className={`
                    border-0 rounded-pill transition-all
                    d-flex align-items-center justify-content-center overflow-hidden
                    ${
                      hoveredButton === `remove-${index}`
                        ? "bg-danger text-white px-2"
                        : "bg-transparent text-secondary hover-bg-light"
                    }
                  `}
                  style={{
                    height: "calc(28px + min(0.5vw, 4px))",
                    width:
                      hoveredButton === `remove-${index}`
                        ? "auto"
                        : "calc(28px + min(0.5vw, 4px))",
                    minWidth: "calc(28px + min(0.5vw, 4px))",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={() =>
                    handleButtonInteraction(`remove-${index}`, true)
                  }
                  onMouseLeave={() =>
                    handleButtonInteraction(`remove-${index}`, false)
                  }
                  onTouchStart={() =>
                    handleButtonInteraction(`remove-${index}`, true)
                  }
                  onTouchEnd={() =>
                    setTimeout(
                      () => handleButtonInteraction(`remove-${index}`, false),
                      1000
                    )
                  }
                  onClick={() => handleRemoveTranscript(index)}
                  title="Remove Transcript"
                  aria-label="Remove Transcript"
                >
                  <Trash2 size={14} className="flex-shrink-0" />
                  <span
                    className="ms-1 fw-medium text-nowrap transition-all"
                    style={{
                      fontSize: "min(0.75rem, 3.5vw)",
                      opacity: hoveredButton === `remove-${index}` ? 1 : 0,
                      maxWidth:
                        hoveredButton === `remove-${index}` ? "80px" : "0",
                      overflow: "hidden",
                      transition: "all 0.2s",
                    }}
                  >
                    Remove
                  </span>
                </button>
              </div>
            </Col>

            {/* Mobile buttons - only show on mobile screens */}
            <Col xs="12" className="d-block d-sm-none px-0 mx-0">
              <div className="d-flex justify-content-center">
                <div className="btn-group">
                  <Button
                    variant="light"
                    size="sm"
                    className="text-secondary d-flex align-items-center py-2 px-3 mx-0 rounded-start-pill"
                    onClick={() => handleAddSubject(index)}
                  >
                    <div className="align-items-center">
                      <Plus size={14} className="me-2" />
                      Subject
                    </div>
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="text-secondary d-flex align-items-center py-2 px-3 mx-0"
                    onClick={() => handleAddDocument(index)}
                  >
                    <div className="align-items-center">
                      <Upload size={14} className="me-2" />
                      Document
                    </div>
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="text-secondary d-flex align-items-center py-2 px-3 mx-0 mt-auto rounded-end-pill"
                    onClick={() => handleRemoveTranscript(index)}
                  >
                    <div className="align-items-center">
                      <Trash2 size={14} className="me-2" />
                      Remove
                    </div>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {transcript.subjects.length === 0 && (
            <div className="px-4 py-2 text-muted text-center">
              No subjects added yet. Click the "+" icon to add a subject.
            </div>
          )}
          {transcript.subjects.length > 0 ? (
            <div className="px-4">
              <div className="d-flex justify-content-between align-items-center mb-0 mb-md-2">
                <h6 className="d-flex align-self-center pt-2 ">
                  Subjects :
                </h6>
                <Button
                  variant="secondary"
                  size="sm"
                  className="d-flex align-self-center py-2 py-md-2 rounded-pill me-0 me-md-3"
                  onClick={() => handleEditSubjectsToggle(index)}
                >
                  {academicTranscripts[index].subjects.some(
                    (s) => s.isEditing
                  ) ? (
                    <div className="px-1 px-md-1">
                      <Save size={14} className="me-1" />
                      Save Edits
                    </div>
                  ) : (
                    <div className="px-1 px-md-1">
                      <Edit size={14} className="me-1" />
                      Edit Subjects
                    </div>
                  )}
                </Button>
              </div>

              {transcript.subjects.map((subject, subIndex) => (
                <div
                  key={subIndex}
                  className="mb-2 bg-white p-2 rounded-3 mx-0 d-flex flex-wrap align-items-center"
                >
                  <div className="p-1" style={{ width: "40px" }}>
                    <AlignJustify size={15} />
                  </div>

                  {subject.isEditing ? (
                    // Edit mode - show form controls
                    <>
                      {transcript.id === 32 || transcript.id === 85 ? (
                        <div className="p-1">
                          <Form.Select
                            value={subject.id || ""}
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              const selectedSubject = availableSubjects.find(
                                (s) => s.id.toString() === selectedId
                              );

                              if (selectedSubject) {
                                setAcademicTranscripts((prev) =>
                                  prev.map((t, tIdx) =>
                                    tIdx === index
                                      ? {
                                          ...t,
                                          subjects: t.subjects.map((s, sIdx) =>
                                            sIdx === subIndex
                                              ? {
                                                  ...s,
                                                  id: selectedSubject.id,
                                                  name: selectedSubject.name,
                                                }
                                              : s
                                          ),
                                        }
                                      : t
                                  )
                                );
                              }
                            }}
                            className="w-100"
                          >
                            <option value="" disabled>
                              Select Subject
                            </option>
                            {/* Include current subject in dropdown options if not found in availableSubjects */}
                            {subject.id &&
                              subject.name &&
                              !availableSubjects.some(
                                (s) => s.id.toString() === subject.id.toString()
                              ) && (
                                <option key={subject.id} value={subject.id}>
                                  {subject.name}
                                </option>
                              )}
                            {availableSubjects
                              .filter(
                                (s) =>
                                  !transcript.subjects.some(
                                    (existing, idx) =>
                                      idx !== subIndex && existing.id === s.id
                                  ) || s.id.toString() === subject.id.toString() // Always include current subject
                              )
                              .map((subjectOption) => (
                                <option
                                  key={subjectOption.id}
                                  value={subjectOption.id}
                                >
                                  {subjectOption.name}
                                </option>
                              ))}
                          </Form.Select>
                        </div>
                      ) : (
                        <div
                          className="p-1 flex-grow-1"
                          style={{ minWidth: "200px" }}
                        >
                          <Form.Control
                            type="text"
                            value={subject.name || ""}
                            onChange={(e) =>
                              handleSubjectChange(
                                index,
                                subIndex,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Enter Subject Name"
                            style={{ fontSize: "0.9rem", fontWeight: "500" }}
                            required
                            className="rounded-pill"
                          />
                        </div>
                      )}

                      <div
                        className="p-1 mt-2 mt-sm-0"
                        style={{
                          width: "calc(100% - 110px)",
                          maxWidth: "180px",
                        }}
                      >
                        {transcript.id === 32 || transcript.id === 85 ? (
                          <Form.Select
                            value={subject.grade || ""}
                            onChange={(e) =>
                              handleSubjectChange(
                                index,
                                subIndex,
                                "grade",
                                e.target.value
                              )
                            }
                            className="text-black"
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "500",
                              borderColor: "#9E9E9E",
                            }}
                            required
                          >
                            <option value="" disabled>
                              Grade
                            </option>
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="G">G</option>
                            <option value="TH">TH</option>
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type="text"
                            value={subject.grade || ""}
                            onChange={(e) =>
                              handleSubjectChange(
                                index,
                                subIndex,
                                "grade",
                                e.target.value
                              )
                            }
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "500",
                            }}
                            placeholder="Grade"
                            required
                            className="rounded-pill"
                          />
                        )}
                      </div>

                      {/* Show delete button in edit mode */}
                      <div
                        className="p-1 text-end mt-2 mt-sm-0 ms-auto"
                        style={{ width: "40px" }}
                      >
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => handleRemoveSubject(index, subIndex)}
                        >
                          <Trash2 size={15} color="grey" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    // View mode - show static text
                    <>
                      <div
                        className="p-1 text-truncate flex-grow-1"
                        style={{ maxWidth: "calc(100% - 170px)" }}
                      >
                        <span
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "500",
                          }}
                          className="text-truncate"
                          title={subject.name} // Add title for tooltip on hover
                        >
                          {subject.name}
                        </span>
                      </div>
                      <div
                        className="p-1 text-center ms-auto"
                        style={{ width: "120px" }}
                      >
                        <div className="d-flex justify-content-center">
                          <span
                            style={{ fontSize: "0.9rem", fontWeight: "500" }}
                            className={`px-3 py-1 rounded-5 text-nowrap text-white ms-md-0 ms-4 bg-${getGradeColor(
                              subject.grade
                            )}`}
                          >
                            Grade: {subject.grade}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Add error display for subjects */}
                  {subject.isEditing && subjectErrors[`${index}-${subIndex}`] && (
                    <div className="text-danger" style={{ fontSize: "0.825rem", width: "100%" }}>
                      {subjectErrors[`${index}-${subIndex}`]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null}
          {transcript.id !== 32 && transcript.id != 85 && (
            <div className="px-4 mt-3">
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="auto">
                  Program Name (Optional):
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    value={transcript.programName || ""}
                    onChange={(e) =>
                      handleProgramNameChange(index, e.target.value)
                    }
                    placeholder="Enter Program Name"
                    className="ACAT-ProgramName-CGPA-Input w-100 rounded-pill"
                  />
                </Col>
                <Form.Label column sm="auto">
                  CGPA:
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={transcript.cgpa || ""}
                    onChange={(e) => handleCGPAChange(index, e.target.value)}
                    placeholder="Enter CGPA"
                    className="ACAT-ProgramName-CGPA-Input rounded-pill"
                  />
                </Col>
              </Form.Group>
            </div>
          )}
          <div className="upload-documents mt-3 pt-0 pt-sm-3 border border-4 border-top-3 border-bottom-0 border-start-0 border-end-0">
            <div className="d-flex justify-content-between align-items-center px-4 mb-0 mb-md-4">
              <h6 className="mb-0 align-self-center">Upload Documents :</h6>
              {/* <div className="d-none d-sm-block bg-white bg-opacity-75 p-0 rounded-pill d-flex align-items-center">
                <button
                  className={`
                    border-0 rounded-pill transition-all
                    d-flex align-items-center justify-content-center overflow-hidden
                    ${
                      hoveredButton === `doc-add-${index}`
                        ? "bg-primary text-white px-2"
                        : "bg-transparent text-secondary hover-bg-light"
                    }
                  `}
                  style={{
                    height: "calc(28px + min(0.5vw, 4px))",
                    width:
                      hoveredButton === `doc-add-${index}`
                        ? "auto"
                        : "calc(28px + min(0.5vw, 4px))",
                    minWidth: "calc(28px + min(0.5vw, 4px))",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={() =>
                    handleButtonInteraction(`doc-add-${index}`, true)
                  }
                  onMouseLeave={() =>
                    handleButtonInteraction(`doc-add-${index}`, false)
                  }
                  onTouchStart={() =>
                    handleButtonInteraction(`doc-add-${index}`, true)
                  }
                  onTouchEnd={() =>
                    setTimeout(
                      () => handleButtonInteraction(`doc-add-${index}`, false),
                      1000
                    )
                  }
                  onClick={() => handleAddDocument(index)}
                  aria-label="Add Document"
                >
                  <Plus size={14} className="flex-shrink-0" />
                  <span
                    className="ms-1 fw-medium text-nowrap transition-all"
                    style={{
                      fontSize: "min(0.75rem, 3.5vw)",
                      opacity: hoveredButton === `doc-add-${index}` ? 1 : 0,
                      maxWidth:
                        hoveredButton === `doc-add-${index}` ? "80px" : "0",
                      overflow: "hidden",
                      transition: "all 0.2s",
                    }}
                  >
                    Add
                  </span>
                </button>
              </div> */}

              {/* Mobile View */}
              {/* <div className="d-block d-sm-none">
                <div className="d-flex justify-content-center bg-light rounded-pill">
                  <Button
                    variant="light"
                    size="sm"
                    className="text-secondary d-flex align-items-center rounded-pill py-1 px-2"
                    onClick={() => handleAddDocument(index)}
                  >
                    <div className="align-items-center">
                      <Plus size={14} className="me-1" />
                      Add
                    </div>
                  </Button>
                </div>
              </div> */}
            </div>

            {transcript.documents.map((doc, docIndex) => (
              <div 
                key={docIndex} 
                className="px-4"
                id={`document-${index}-${docIndex}`}
              >
                <div className="ACAT-DocumentUpload-Container rounded-3">
                  {doc.isEditing ? (
                    <>
                      <div className="ACAT-DocumentUpload-InnerContainer">
                        <div className="ACAT-DocumentUpload-EditContainer">
                          {doc.file ? (
                            <>
                              <div className="sac-file-info">
                                <FileText size={15} className="sac-file-icon" />
                                <span className="sac-file-name">
                                  {doc.mediaName || doc.file}
                                </span>
                                <Button
                                  variant="link"
                                  className="sac-remove-file-btn"
                                  onClick={() =>
                                    handleDocumentChange(
                                      index,
                                      docIndex,
                                      "file",
                                      null
                                    )
                                  }
                                >
                                  <X size={15} color="red" />
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="secondary"
                                className="sac-upload-button px-5"
                                onClick={() =>
                                  document
                                    .getElementById(
                                      `fileInput-${index}-${docIndex}`
                                    )
                                    .click()
                                }
                              >
                                <span className="button-text">Upload File</span>
                              </Button>
                              <input
                                type="file"
                                id={`fileInput-${index}-${docIndex}`}
                                className="d-none"
                                onChange={(e) =>
                                  handleDocumentFileUpload(
                                    index,
                                    docIndex,
                                    e.target.files[0]
                                  )
                                }
                              />
                            </>
                          )}
                        </div>
                        <div className="align-items-center flex-grow-1 ">
                          <Form.Control
                            type="text"
                            value={doc.name}
                            onChange={(e) =>
                              handleDocumentChange(
                                index,
                                docIndex,
                                "name",
                                e.target.value
                              )
                            }
                            className="me-2 w-100 border-0 ac-input-placeholder"
                            placeholder="Enter document title..."
                            style={{ fontSize: "0.825rem" }}
                          />
                        </div>
                      </div>
                      <div className="applycourwse-academictranscript-documentedit">
                        <Button
                          variant="link"
                          className="p-0 me-2"
                          onClick={() => handleSaveDocument(index, docIndex)}
                        >
                          <Save size={15} color="green" />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => handleRemoveDocument(index, docIndex)}
                        >
                          <Trash2 size={15} color="grey" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ACAT-DocumentUpload-DisplayContainer">
                        <div className="ACAT-DocumentUpload-DisplayContainer-InnerOne">
                          <FileText
                            size={15}
                            className="me-2 ms-2"
                            style={{ alignSelf: "center" }}
                          />
                          <span
                            className="me-2"
                            style={{
                              fontSize: "0.825rem",
                              textAlign: "left",
                              flex: 1,
                              width: "112.5px",
                              wordWrap: "break-word",
                              overflowWrap: "break-word",
                              wordBreak: "break-all",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "112.5px",
                            }}
                          >
                            {doc.name}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "0.825rem" }}>
                            {doc.mediaName || doc.file || "No file uploaded"}
                          </span>
                        </div>
                      </div>
                      <div className="ACAT-Display-DocumentButton">
                        <Button
                          variant="link"
                          className="p-0 me-2"
                          onClick={() =>
                            handleDocumentChange(
                              index,
                              docIndex,
                              "isEditing",
                              true
                            )
                          }
                        >
                          <Edit size={15} color="grey" />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => handleRemoveDocument(index, docIndex)}
                        >
                          <Trash2 size={15} color="grey" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                {documentErrors[`${index}-${docIndex}`] && (
                  <div className="text-danger" style={{ fontSize: "0.825rem" }}>
                    {documentErrors[`${index}-${docIndex}`]}
                  </div>
                )}
              </div>
            ))}
            {transcript.documents.length === 0 && (
              <div className="px-4 py-2 text-muted text-center">
                No documents added yet. Click the "<Upload size={14} className="flex-shrink-0" />" icon to add a document.
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end mt-3 px-4">
            <Button
              variant={
                savingStates[index] === "success" ? "success" : "primary"
              }
              onClick={() => saveTranscript(index)}
              className="sac-save-button px-5 rounded-pill"
            >
              {savingStates[index] === "loading" ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : savingStates[index] === "success" ? (
                "Saved!"
              ) : savingStates[index] === "failed" ? (
                "Failed!"
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      ))}
      <Button
        variant="outline-primary"
        onClick={handleAddTranscript}
        className="w-100 mt-3 sac-add-new-button mx-0"
      >
        Add New Transcript +
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
      <WidgetPopUpRemind isOpen={isPopupOpen} onClose={handleClosePopup} />
      <WidgetPopUpAcademicRemind
        isOpen={isAcademicRemindPopupOpen}
        onClose={() => setIsAcademicRemindPopupOpen(false)}
      />
      <WidgetPopUpUnsavedChanges
        isOpen={isUnsavedChangesPopupOpen}
        onConfirm={handleUnsavedChangesConfirm}
        onCancel={handleUnsavedChangesCancel}
      />
    </div>
  );
};

export default AcademicTranscript;
