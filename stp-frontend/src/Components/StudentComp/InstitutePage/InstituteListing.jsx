import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Accordion,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import "../../../css/StudentCss/institutepage css/Institute.css";
import StudyPal from "../../../assets/StudentAssets/institute image/StudyPal.png";

import { useNavigate } from "react-router-dom";
import emptyStateImage from "../../../assets/StudentAssets/emptyStateImage/emptystate.png";
//import { set } from "react-datepicker/dist/date_utils";

const baseURL = import.meta.env.VITE_BASE_URL;
const apiURL = `${baseURL}api/student/schoolList`;
const locationAPIURL = `${baseURL}api/student/locationFilterList`;
const studylevelAPIURL = `${baseURL}api/student/qualificationFilterList`;
const studyModeAPIURL = `${baseURL}api/student/studyModeFilterlist`;
const tuitionFeeAPIURL = `${baseURL}api/student/tuitionFeeFilterRange`;
const categoryAPIURL = `${baseURL}api/student/categoryFilterList`;
const intakeAPIURL = `${baseURL}api/student/intakeFilterList`;
const schoolListAPI = `${baseURL}api/student/schoolList`;
const listingFilterList = `${baseURL}api/student/listingFilterList`;

const InstituteListing = ({
  searchResults,
  countryID,
  selectedInstitute,
  resetTrigger,
}) => {
  const [locationFilters, setLocationFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [studyLevelFilters, setStudyLevelFilters] = useState([]);
  const [intakeFilters, setIntakeFilters] = useState([]);
  const [intakeData, setIntakeData] = useState({ data: [] });
  const [modeFilters, setModeFilters] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tuitionFee, setTuitionFee] = useState(0);
  const [minTuitionFee, setMinTuitionFee] = useState(0);
  const [maxTuitionFee, setMaxTuitionFee] = useState(100000);
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [studyLevels, setStudyLevels] = useState([]);
  const [studyModes, setStudyModes] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(countryID);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [school, setSchool] = useState([]);
  const [selectedLocationFilters, setSelectedLocationFilters] = useState([]);
  const [states, setStates] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstitutes = filteredPrograms.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // End of Function for Pagination

  const location = useLocation();
  const { searchQuery = "" } = location.state || {};
  const { selectedCategory } = location.state || {};

  /* Reset filter is here */
  const resetFilters = () => {
    setSelectedLocationFilters([]);
    setCategoryFilters([]);
    setStudyLevelFilters([]);
    setIntakeFilters([]);
    setModeFilters([]);
    setTuitionFee([]);
  };
  // Watch for changes in resetTrigger and reset the filters accordingly
  useEffect(() => {
    resetFilters();
  }, [resetTrigger]);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchInstitutes = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(schoolListAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: selectedCategory }), // Sending selectedCategory in the request body
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();
        setSchool(result.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, [selectedCategory]);

  const fetchFilters = useCallback(async () => {
    //if (!countryID) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(listingFilterList, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryID }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setLocationFilters(data.data.state || []);
        //setCategoryFilters(data.data.categoryList || []);
        //setStudyLevelFilters(data.data.qualificationList);
        //setModeFilters(data.data.studyModeListing || []);
        setIntakeFilters(data.data.intakeList || []);

        // Set tuition fee based on API data
        setMinTuitionFee(data.data.minAmount || 0); // Set minimum tuition fee
        setMaxTuitionFee(data.data.maxAmount || 100000); // Set maximum tuition fee
        setTuitionFee(data.data.maxAmount || 100000); // Default the current tuition fee to the maximum available
      }
    } catch (error) {
      setError("Failed to fetch filters. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [countryID]);

  useEffect(() => {
    if (countryID) {
      fetchFilters();
    }
  }, [countryID, fetchFilters]);

  useEffect(() => {
    filterPrograms();
  }, [
    categoryFilters,
    selectedLocationFilters,
    intakeFilters,
    modeFilters,
    tuitionFee,
    institutes,
    searchResults,
    searchQuery,
  ]);

  /*------- End of Reset filter --------*/

  /* ----------------------University Dropdown--------------------------- */

  useEffect(() => {
    if (selectedInstitute) {
      fetchCoursesForInstitute(selectedInstitute);
    }
  }, [selectedInstitute]);

  const fetchCoursesForInstitute = async (institute) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(schoolListAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const courses = result.data;
      setInstitutes(courses);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setError("Failed to fetch institutes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (institutes.length > 0) {
      // console.log("Insitutes before filtering:", institutes);
      const filtered = institutes.filter((institute) => {
        // console.log(
        //   `Institute Name: ${institute.name}, Institute Category: ${institute.category}`
        // );
        return institute.category === selectedInstitute;
      });
      // console.log("Filtered Institutes", filtered);
      setFilteredPrograms(filtered);
    } else {
      console.log("No institutes available to filter.");
    }
  }, [institutes, selectedInstitute]);

  /* --------------------End of University Dropdown------------------------ */

  // Location filter
  useEffect(() => {
    // console.log("Country ID changed:", countryID);
    const fetchLocationFilters = async () => {
      if (!countryID) {
        setLocationFilters([]);
        setFilteredPrograms(institutes);
        return;
      }

      try {
        console.log("Country ID received in InstituteListing:", countryID);
        const response = await fetch(
          `${baseURL}api/student/locationFilterList`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ countryID: countryID }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const locationData = await response.json();
        // console.log("Fetched Location Filters:", locationData);

        if (Array.isArray(locationData.data) && locationData.data.length > 0) {
          setLocationFilters(locationData.data);
        } else {
          setLocationFilters([]);
        }

        filterPrograms();
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocationFilters([]);
      }
    };

    setTimeout(() => {
      fetchLocationFilters();
    }, 100);
  }, [countryID]);

  // Category filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(categoryAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const categoriesData = await response.json();
        setCategoriesData(categoriesData.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchInstitutesByCategory = async (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredPrograms(institutes); // Show all institutes if no categories
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseCategory: selectedCategories.map((category) => category.id),
        }),
      });

      const data = await response.json();
      const institutes = Array.isArray(data.data) ? data.data : [];

      // Filter institutes with courses
      const filteredInstitutes = institutes.filter((institute) => {
        if (
          !institute.courses ||
          (Array.isArray(institute.courses) && institute.courses.length === 0)
        ) {
          console.log("No courses available for this institute.");
          return false;
        }
        return true;
      });

      console.log("Filtered Institutes for Category:", filteredInstitutes);

      setFilteredPrograms(filteredInstitutes);
    } catch (error) {
      console.error("Error fetching institutes:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryFilters.length > 0) {
      fetchInstitutesByCategory(categoryFilters); // Fetch data when category filters change
    }
  }, [categoryFilters]);

  // Study level filter
  useEffect(() => {
    const fetchStudyLevels = async () => {
      try {
        const response = await fetch(studylevelAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const studyLevelsData = await response.json();
        setStudyLevels(studyLevelsData.data);
      } catch (error) {
        console.error("Error fetching study levels:", error);
      }
    };

    fetchStudyLevels();
  }, []);

  // fetch school using study level
  const fetchInstitutesByStudyLevel = async (selectedStudyLevel) => {
    setLoading(true);
    setError(null);

    if (!selectedStudyLevel || selectedStudyLevel.length === 0) {
      console.error("No study levels selected or data is undefined.");
      setLoading(false);
      return;
    }

    try {
      const studyLevelIds = selectedStudyLevel.map((level) => level.id);
      console.log("Study Level IDs:", studyLevelIds); // Log study level IDs

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studyLevel: studyLevelIds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full API Response:", data);
      const institutes = Array.isArray(data.data) ? data.data : [];
      console.log("Institutes received:", institutes);

      const filteredInstitutes = institutes.filter((institute) => {
        if (
          !institute.courses ||
          (Array.isArray(institute.courses) && institute.courses.length === 0)
        ) {
          console.log("No courses available for this institute. ");
          return false;
        }
        return true;
      });

      console.log("Filtered Institutes by Study Level:", filteredInstitutes);
      setFilteredPrograms(filteredInstitutes);
    } catch (error) {
      console.error("Error fetching institutes by study level:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to trigger fetching when study level filters change
  useEffect(() => {
    if (studyLevelFilters.length > 0) {
      fetchInstitutesByStudyLevel(studyLevelFilters); // Fetch data when study level filters change
    }
  }, [studyLevelFilters]);

  // Calling all filter
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const maxRetries = 5;
      let attempt = 0;
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      while (attempt < maxRetries) {
        try {
          const response = await fetch(apiURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              locationFilters: locationFilters,
              categoryFilters: categoryFilters,
              intakeFilters: intakeFilters,
              modeFilters: modeFilters,
              tuitionFee: tuitionFee,
              studyLevelFilters: studyLevelFilters,
            }),
          });

          if (response.status === 429) {
            attempt++;
            const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
            await delay(waitTime);
            continue; // Retry request
          }

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Response is not JSON");
          }

          const result = await response.json();
          setInstitutes(result.data);
          filterPrograms();
          break; // Exit while loop if successful
        } catch (error) {
          setError(error.message);
          console.error("Error fetching course data:", error);
          break; // Exit while loop if an error occurs
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [
    locationFilters,
    categoryFilters,
    intakeFilters,
    modeFilters,
    tuitionFee,
    studyLevelFilters,
    searchResults,
    searchQuery,
    selectedCountry,
  ]);

  // Intakes filter
  useEffect(() => {
    const fetchIntakes = async () => {
      try {
        const response = await fetch(intakeAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const intakeData = await response.json();
        setIntakeData(intakeData.data);
        console.log("Intakes: ", intakeData.data);
      } catch (error) {
        console.error("Error fetching intakes:", error);
      }
    };

    fetchIntakes();
  }, []);

  // Study Mode Filter
  useEffect(() => {
    const fetchStudyModes = async () => {
      try {
        const response = await fetch(studyModeAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const studyModesData = await response.json();
        setStudyModes(studyModesData.data);
      } catch (error) {
        console.error("Error fetching study modes:", error);
      }
    };

    fetchStudyModes();
  }, []);

  // fetch school using study mode filter
  const fetchInstitutesByStudyMode = async (selectedStudyMode) => {
    setLoading(true);
    setError(null);

    if (!selectedStudyMode || selectedStudyMode.length === 0) {
      console.error("no study mode selected");
      setLoading(false);
      return;
    }

    try {
      const studyModeIDs = selectedStudyMode.map((mode) => mode.id);
      console.log("Study mode IDS: ", studyModeIDs);

      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studyMode: studyModeIDs }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full API Response for Study Mode:", data);
      const institutes = Array.isArray(data.data) ? data.data : [];
      console.log("Institutes received by Study Mode:", institutes);

      const filteredInstitutes = institutes.filter((institute) => {
        if (
          !institute.courses ||
          (Array.isArray(institute.courses) && institute.courses.length === 0)
        ) {
          console.log("No courses available for this institute. ");
          return false;
        }
        return true;
      });

      console.log("Filtered Institutes by Study Mode:", filteredInstitutes);
      setFilteredPrograms(filteredInstitutes);
    } catch (error) {
      console.error("Error fetching institutes by study level:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (modeFilters.length > 0) {
      fetchInstitutesByStudyMode(modeFilters); // Fetch institutes based on selected study modes
    }
  }, [modeFilters]); // Trigger re-fetch when modeFilters state changes

  // Tuition fee filter
  useEffect(() => {
    const fetchTuitionFeeRange = async () => {
      try {
        const response = await fetch(tuitionFeeAPIURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const tuitionFeeData = await response.json();
        console.log("FEE:", tuitionFeeData.data);
        setTuitionFee(tuitionFeeData.data);
        if (tuitionFeeData.success) {
          setMinTuitionFee(0);
          setMaxTuitionFee(tuitionFeeData.data);
        }
      } catch (error) {
        console.error("Error fetching tuition fee range:", error);
      }
    };

    fetchTuitionFeeRange();
  }, []);

  const handleTuitionFeeChange = (e) => {
    const { value } = e.target;
    setTuitionFee(value);
  };
  // Location Filter
  const handleLocationChange = (location) => {
    const locationName = location.state_name.trim();
    let updatedFilters;

    if (selectedLocationFilters.includes(locationName)) {
      updatedFilters = selectedLocationFilters.filter(
        (item) => item !== locationName && item !== ""
      );
    } else {
      updatedFilters = [...selectedLocationFilters, locationName];
    }

    setSelectedLocationFilters(updatedFilters);
    console.log("Updated Location Filters:", updatedFilters);
    filterPrograms(
      updatedFilters,
      categoryFilters,
      intakeFilters,
      modeFilters,
      tuitionFee,
      institutes
    );
  };

  const filterPrograms = () => {
    console.log("Institutes before filtering:", institutes); // Log institutes before filtering
    console.log("Selected Study Levels:", studyLevelFilters); // Log selected study levels

    let results = institutes;

    // Filter by selected country
    if (selectedCountry) {
      results = results.filter(
        (institute) => institute.countryID === selectedCountry.country_id
      );
    }

    // Apply Category Filter
    if (categoryFilters.length > 0) {
      results = results.filter((institute) => {
        if (Array.isArray(institute.courses)) {
          return institute.courses.some(
            (course) =>
              course.courseCategory &&
              course.courseCategory.some((catId) =>
                categoryFilters.some((cat) => cat.id === catId)
              )
          );
        }
        return false;
      });
    }

    // Filter by selected Study Level
    if (studyLevelFilters.length > 0) {
      results = results.filter((institute) => {
        if (Array.isArray(institute.courses)) {
          return institute.courses.some((course) => {
            return (
              course.studyLevel && // Check if studyLevel exists
              studyLevelFilters.includes(course.studyLevel)
            );
          });
        }
        return false;
      });
    }

    // Filter by selected Study Mode
    if (modeFilters.length > 0) {
      results = results.filter((institute) => {
        if (Array.isArray(institute.courses)) {
          return institute.courses.some((course) => {
            return course.studyMode && modeFilters.includes(course.studyMode);
          });
        }
        return false;
      });
    }

    // Prepare search result IDs for filtering
    const searchResultIDs =
      searchResults && Array.isArray(searchResults)
        ? searchResults.map((result) => result.id)
        : [];

    // Apply various filters
    const filtered = results.filter((institute) => {
      // Add this for study level filtering

      const matchesSearchResults =
        searchResultIDs.length === 0 || searchResultIDs.includes(institute.id);

      const matchesCountry =
        selectedCountry && selectedCountry.country_id
          ? institute.countryID === selectedCountry.country_id
          : true;

      const matchesLocation =
        locationFilters.length === 0 ||
        selectedLocationFilters.length === 0 ||
        selectedLocationFilters.includes(institute.state);

      // Match category filter
      const matchesCategory = categoryFilters.length
        ? institute.courses.some((course) =>
            course.courseCategory.some((catId) =>
              categoryFilters.some((cat) => cat.id === catId)
            )
          )
        : true; // Show all if no category filters are applied

      const matchesIntake =
        intakeFilters.length === 0 ||
        (Array.isArray(institute.intake) &&
          institute.intake.some((intake) => intakeFilters.includes(intake)));

      const matchesStudyLevel =
        studyLevelFilters.length === 0 ||
        institute.courses.some((course) =>
          studyLevelFilters.includes(course.studyLevel)
        );

      const matchesMode =
        modeFilters.length === 0 ||
        institute.courses.some((course) =>
          modeFilters.includes(course.studyMode)
        );

      const matchesInstitute =
        !selectedInstitute || institute.category === selectedInstitute;

      const trimmedSearchQuery = searchQuery?.trim().toLowerCase() || "";

      const matchesInstituteName =
        !trimmedSearchQuery ||
        institute.name.toLowerCase().includes(trimmedSearchQuery);

      const matchesCountryName =
        !trimmedSearchQuery ||
        (institute.country &&
          institute.country.toLowerCase().includes(trimmedSearchQuery));

      return (
        matchesStudyLevel &&
        matchesCountry &&
        matchesLocation &&
        matchesCategory &&
        matchesIntake &&
        matchesMode &&
        matchesInstitute &&
        matchesSearchResults &&
        (matchesInstituteName || matchesCountryName)
      );
    });

    console.log("Filtered Institutes:", filtered);

    // Update state with the filtered results
    setFilteredPrograms(filtered, results);
    fetchInstitutesByCategory;
    fetchInstitutesByStudyLevel;
    fetchInstitutesByStudyMode;
  };

  // useEffect(() => {
  //   filterPrograms();
  // }, [institutes, searchQuery]);

  useEffect(() => {
    console.log("Institutes:", institutes);
    console.log("Filtered Programs:", filteredPrograms);
    console.log("Search Results:", searchResults);
  }, [institutes, filteredPrograms, searchResults]);

  useEffect(() => {
    filterPrograms();
    fetchInstitutesByCategory;
    fetchInstitutesByStudyLevel;
    fetchInstitutesByStudyMode;
  }, [
    institutes,
    selectedLocationFilters,
    categoryFilters,
    intakeFilters,
    modeFilters,
    studyLevelFilters,
    tuitionFee,
    searchResults,
    searchQuery, // Ensure this is included for filtering
  ]);

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);
    if (country && country.country_id) {
      const response = await fetch(locationAPIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryID: country.country_id }),
      });

      if (response.ok) {
        const locationData = await response.json();
        setLocationFilters(locationData.data);
      } else {
        setLocationFilters([]);
      }
    } else {
      setLocationFilters([]);
    }
  };

  const debounce = (func, delay, immediate) => {
    let timeoutId;
    return (...args) => {
      const callNow = immediate && !timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (!immediate) func(...args);
      }, delay);
      if (callNow) func(...args);
    };
  };

  // Category Filter
  const handleCategoryChange = debounce((selectedCategory) => {
    const updatedFilters = categoryFilters.some(
      (category) => category.id === selectedCategory.id
    )
      ? categoryFilters.filter(
          (category) => category.id !== selectedCategory.id
        )
      : [...categoryFilters, selectedCategory];

    setCategoryFilters(updatedFilters);

    // Delay fetching institutes until after filters are updated
    setTimeout(() => {
      fetchInstitutesByCategory(updatedFilters);
    }, 300); // Delay ensures state is updated before the fetch
  }, 300);

  // Study Level Filter
  const handleStudyLevelChange = debounce((selectedLevel) => {
    // First update the filters
    const updatedFilters = studyLevelFilters.some(
      (level) => level.id === selectedLevel.id
    )
      ? studyLevelFilters.filter((level) => level.id !== selectedLevel.id)
      : [...studyLevelFilters, selectedLevel];

    setStudyLevelFilters(updatedFilters);

    // Then fetch institutes after the filters are updated
    setTimeout(() => {
      fetchInstitutesByStudyLevel(updatedFilters);
    }, 300); // Delay the fetch slightly to ensure the state is updated
  }, 300);

  // Study Mode Filter
  const handleModeChange = debounce((selectedMode) => {
    console.log("Selected Mode: ", selectedMode); // Log the selected mode
    const updatedFilters = modeFilters.some(
      (mode) => mode.id === selectedMode.id
    )
      ? modeFilters.filter((mode) => mode.id !== selectedMode.id)
      : [...modeFilters, selectedMode];

    setModeFilters(updatedFilters);

    // Delay fetching institutes until after filters are updated
    setTimeout(() => {
      fetchInstitutesByStudyMode(updatedFilters);
    }, 300); // Delay ensures state is updated before the fetch
  }, 300);

  // Intakes Filter
  const handleIntakeChange = (intake) => {
    if (intakeFilters.includes(intake.month)) {
      0;
      setIntakeFilters(intakeFilters.filter((i) => i !== intake.month));
    } else {
      setIntakeFilters([...intakeFilters, intake.month]);
    }
  };

  const handleKnowMoreInstitute = (institute) => {
    // Navigate to the know more page and store the institute in state
    sessionStorage.setItem('schoolId', institute.id); // Store school ID
    navigate(`/university-detail/${institute.name.replace(/\s+/g, '-').toLowerCase()}`, { // Navigate to university detail
      state: { institute: institute }, // Correctly pass the state object
    }); 
  };

  // if (!institutes || institutes.length === 0) {
  //   return (
  //     <div className="spinner-container">
  //       <div className="custom-spinner"></div>
  //     </div>
  //   );
  // }

  const mappedInstitutes = currentInstitutes.map((institute, index) => (
    <>
      <div
        key={institute.id} // Use a unique key for each item
        className="card mb-4 institute-card"
        style={{ position: "relative", height: "auto" }}
      >
        {institute.featured && <div className="featured-badge">Featured</div>}
        <div className="card-body d-flex flex-column flex-md-row align-items-start">
          <Row>
            <Col md={6} lg={6}>
              <div className="card-image mb-3 mb-md-0">
                <div
                  className="d-flex"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  <div style={{ paddingLeft: "10px" }}>
                    <Link 
                      to={`/university-detail/${institute.name.replace(/\s+/g, '-').toLowerCase()}`} 
                      onClick={() => sessionStorage.setItem('schoolId', institute.id)}
                    >
                      <img
                        src={`${baseURL}storage/${institute.logo}`}
                        alt={institute.name}
                        width="120"
                        style={{ cursor: "pointer" }} // Optional: add a pointer cursor to indicate it's clickable
                      />
                    </Link>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <Link
                      to={`/university-detail/${institute.name.replace(/\s+/g, '-').toLowerCase()}`} 
                      onClick={() => sessionStorage.setItem('schoolId', institute.id)}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <h5 className="card-text" style={{ cursor: "pointer" }}>
                        {institute.name || "N/A"}
                      </h5>
                    </Link>{" "}
                    <i
                      className="bi bi-geo-alt"
                      style={{ marginRight: "10px", color: "#AAAAAA" }}
                    ></i>
                    <span>
                      {institute.state || "N/A"}
                      <span style={{ margin: "0 5px" }}>,</span>
                      {institute.country || "N/A"}
                    </span>
                    <a
                      href="#"
                      className="map-link"
                      style={{
                        paddingLeft: "10px",
                        fontWeight: "lighter",
                        color: "#1745BA",
                        visibility: "hidden", // Hides the element but keeps the space occupied
                      }}
                    >
                      click and view on map
                    </a>
                    <div>
                      <p
                        className="card-text mt-2"
                        style={{ paddingLeft: "5px" }}
                      >
                        {institute.description || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} lg={6}>
              <div className="d-flex flex-grow-1 justify-content-between">
                <div className="details-div-institute" style={{ width: "70%" }}>
                  <div className="d-flex align-items-center flex-wrap">
                    <Col>
                      <div>
                        <Row style={{ paddingTop: "10px" }}>
                          <div>
                            <i
                              className="bi bi-building"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <span
                              style={{
                                paddingLeft: "20px",
                                minWidth: "100px",
                                display: "inline-block",
                              }}
                            >
                              {institute.category || "N/A"}
                            </span>
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <i
                              className="bi bi-mortarboard"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <span
                              style={{
                                paddingLeft: "20px",
                                minWidth: "100px",
                                display: "inline-block",
                              }}
                            >
                              {/* Add a log to check the structure of courses */}
                              {console.log("Courses data:", institute.courses)}

                              {/* Adjust based on actual data structure */}
                              {Array.isArray(institute.courses)
                                ? `${institute.courses.length} Courses offered`
                                : typeof institute.courses === "number"
                                ? `${institute.courses} Courses offered`
                                : "N/A"}
                            </span>
                          </div>

                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              // alignItems: "center",
                            }}
                          >
                            <i
                              className="bi bi-calendar2-week"
                              style={{ marginRight: "10px" }}
                            ></i>
                            <span
                              style={{
                                paddingLeft: "20px",
                              }}
                            >
                              {institute.intake && institute.intake.length > 0
                                ? institute.intake.join(", ")
                                : "N/A"}
                            </span>
                          </div>
                        </Row>
                      </div>
                    </Col>
                  </div>
                </div>
                <Col>
                  <div className="fee-apply">
                    <div className="knowmore-button">
                      <button
                        className="featured-institute-button"
                        onClick={() => handleKnowMoreInstitute(institute)}
                        style={{
                          marginTop: "90px",
                          width: "150px",
                          marginLeft: "50px",
                        }}
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {index === 2 && (
        <div key="ad" className="ad-container">
          <img
            src={StudyPal}
            alt="Study Pal"
            className="studypal-image"
            style={{ height: "100px" }}
          />
        </div>
      )}
    </>
  ));

  return (
    <Container className="my-5">
      <Row>
        <Col
          md={4}
          className="location-container"
          style={{ backgroundColor: "white", padding: "20px" }}
        >
          {/* Filters always visible on larger screens */}
          <div className="filters-container">
            {/* Location Filter */}
            <div className="filter-group">
              <h5 style={{ marginTop: "10px" }}>Location</h5>
              <Form.Group>
                {locationFilters.length > 0 ? (
                  locationFilters.map(
                    (location, index) =>
                      location.state_name &&
                      location.state_name.trim() !== "" && (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={location.state_name}
                          checked={selectedLocationFilters.includes(
                            location.state_name
                          )}
                          onChange={() => handleLocationChange(location)}
                        />
                      )
                  )
                ) : (
                  <p>No location available</p>
                )}
              </Form.Group>
            </div>
            {/* Category Filter */}
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Category</h5>
              <Form.Group>
                {categoriesData.map((category, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={category.category_name}
                    checked={categoryFilters.some((c) => c.id === category.id)}
                    onChange={() => handleCategoryChange(category)}
                  />
                ))}
              </Form.Group>
            </div>
            {/* Study Level Filter */}
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Study Level</h5>
              <Form.Group>
                {studyLevels.map((level, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={level.qualification_name}
                    checked={studyLevelFilters.some((l) => l.id === level.id)}
                    onChange={() => handleStudyLevelChange(level)}
                  />
                ))}
              </Form.Group>
            </div>

            {/* Study Mode Filter */}
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Study Mode</h5>
              <Form.Group>
                {studyModes.map((mode, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    label={mode.studyMode_name}
                    checked={modeFilters.some((m) => m.id === mode.id)}
                    onChange={() => handleModeChange(mode)} // Update filters when changed
                  />
                ))}
              </Form.Group>
            </div>
            {/* Intakes Filter */}
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Intakes</h5>
              <Form.Group>
                {intakeData.length > 0 ? (
                  intakeData.map((intake) => (
                    <Form.Check
                      key={intake.id} // Use a unique key if available, `intake.id` is preferred
                      type="checkbox"
                      label={intake.month}
                      checked={intakeFilters.includes(intake.month)}
                      onChange={() => handleIntakeChange(intake)}
                    />
                  ))
                ) : (
                  <p>No intakes available</p> // Display a message if no data is available
                )}
              </Form.Group>
            </div>
            {/* Tuition Fee Filter */}
            <div className="filter-group">
              <h5 style={{ marginTop: "25px" }}>Tuition Fee</h5>
              <Form.Group id="customRange1">
                <Form.Label className="custom-range-label">{`RM${tuitionFee}`}</Form.Label>
                <Form.Control
                  className="custom-range-input"
                  type="range"
                  min={minTuitionFee}
                  max={maxTuitionFee}
                  step="500"
                  value={tuitionFee}
                  onChange={handleTuitionFeeChange}
                />
              </Form.Group>
            </div>
          </div>

          {/* Accordion visible on smaller screens */}
          <Accordion defaultActiveKey="0" className="custom-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="custom-accordion-header">
                Location
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {locationFilters.length > 0 ? (
                    locationFilters.map(
                      (location, index) =>
                        location.state_name &&
                        location.state_name.trim() !== "" && (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            label={location.state_name}
                            checked={selectedLocationFilters.includes(
                              location.state_name
                            )}
                            onChange={() => handleLocationChange(location)}
                          />
                        )
                    )
                  ) : (
                    <p>No location available</p>
                  )}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header className="custom-accordion-header">
                Category
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {categoriesData.map((category, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={category.category_name}
                      checked={categoryFilters.some(
                        (c) => c.id === category.id
                      )}
                      onChange={() => handleCategoryChange(category)}
                    />
                  ))}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header className="custom-accordion-header">
                Study Level
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {studyLevels.map((level, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={level.qualification_name}
                      checked={studyLevelFilters.some((l) => l.id === level.id)}
                      onChange={() => handleStudyLevelChange(level)}
                    />
                  ))}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className="custom-accordion-header">
                Study Mode
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {studyModes.map((mode, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      label={mode.studyMode_name}
                      checked={modeFilters.some((m) => m.id === mode.id)}
                      onChange={() => handleModeChange(mode)} // Update filters when changed
                    />
                  ))}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header className="custom-accordion-header">
                Intakes
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group>
                  {intakeData.length > 0 ? (
                    intakeData.map((intake) => (
                      <Form.Check
                        key={intake.id} // Use a unique key if available, `intake.id` is preferred
                        type="checkbox"
                        label={intake.month}
                        checked={intakeFilters.includes(intake.month)}
                        onChange={() => handleIntakeChange(intake)}
                      />
                    ))
                  ) : (
                    <p>No intakes available</p> // Display a message if no data is available
                  )}
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header className="custom-accordion-header">
                Tuition Fee
              </Accordion.Header>
              <Accordion.Body className="custom-accordion-body">
                <Form.Group id="customRange1">
                  <Form.Label className="custom-range-label">{`RM${tuitionFee}`}</Form.Label>
                  <Form.Control
                    className="custom-range-input"
                    type="range"
                    min={minTuitionFee}
                    max={maxTuitionFee}
                    step="500"
                    value={tuitionFee}
                    onChange={handleTuitionFeeChange}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col xs={12} md={8} className="degreeinstitutes-division">
          <div>
            <img
              src={StudyPal}
              alt="Study Pal"
              className="studypal-image"
              style={{ height: "175px" }}
            />
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <>
              {filteredPrograms && filteredPrograms.length > 0 ? (
                <>
                  {console.log(
                    "Filtered institutes available:",
                    filteredPrograms
                  )}
                  {mappedInstitutes}
                </>
              ) : (
                <>
                  {console.log(
                    "No filtered institutes available, showing empty state"
                  )}
                  <div
                    className="blankslate-institutes"
                    style={{ marginLeft: "100px" }}
                  >
                    <img
                      className="blankslate-institutes-top-img"
                      src={emptyStateImage}
                      alt="Empty State"
                    />
                    <div className="blankslate-institutes-body">
                      <h4>No institutes found ☹️</h4>
                      <p>
                        There are no institutes that match your selected
                        filters. Please try adjusting your filters and search
                        criteria.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </Col>

        {/* Pagination*/}
        <Col xs={12} className="d-flex justify-content-end">
          <Pagination className="pagination">
            <Pagination.Prev
              aria-label="Previous"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              aria-label="Next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default InstituteListing;
