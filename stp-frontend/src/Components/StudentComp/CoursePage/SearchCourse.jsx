import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../../../css/StudentCss/course page css/SearchCourse.css";
import {
  ButtonGroup,
  Container,
  Dropdown,
  InputGroup,
  Form,
  Pagination,
  Row,
  Col,
  Accordion,
  Alert,
  Placeholder,
} from "react-bootstrap";
import CountryFlag from "react-country-flag";
import debounce from "lodash.debounce";
import StudyPal from "../../../assets/StudentAssets/coursepage image/StudyPal.webp";
import emptyStateImage from "../../../assets/StudentAssets/emptyStateImage/emptystate.png";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { Navigation, Autoplay } from "swiper/modules";
import { requestUserCountry } from "../../../utils/locationRequest";
import currency from "currency.js";
import { FixedSizeList as List } from "react-window";
import { dotWave, dotPulse } from "ldrs";

// Register the ldrs loader
dotWave.register();
dotPulse.register();

export const baseURL = import.meta.env.VITE_BASE_URL;
const countriesURL = `${baseURL}api/student/countryList`;
const filterURL = `${baseURL}api/student/listingFilterList`;
const courseListURL = `${baseURL}api/student/courseList`;
const adsAURL = `${baseURL}api/student/advertisementList`;

// Lazy load Swiper components which are only needed when ads are available
const LazySwiper = lazy(() =>
  import("swiper/react").then((module) => ({ default: module.Swiper }))
);
const LazySwiperSlide = lazy(() =>
  import("swiper/react").then((module) => ({ default: module.SwiperSlide }))
);

const SearchCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Country States
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryFilter, setCountryFilter] = useState("");

  //search state
  const [tempSearch, setTempSearch] = useState("");

  // Filter States
  const [filterData, setFilterData] = useState({
    categoryList: [],
    qualificationList: [],
    studyModeListing: [],
    intakeList: [],
    maxAmount: 0,
    institueList: [],
    state: [],
  });
  const countryCurrencyMap = {
    // Asia
    MY: { currency_code: "MYR", currency_symbol: "RM" }, // Malaysia
    SG: { currency_code: "SGD", currency_symbol: "S$" }, // Singapore
    ID: { currency_code: "IDR", currency_symbol: "Rp" }, // Indonesia
    TH: { currency_code: "THB", currency_symbol: "฿" }, // Thailand
    VN: { currency_code: "VND", currency_symbol: "₫" }, // Vietnam
    PH: { currency_code: "PHP", currency_symbol: "₱" }, // Philippines
    IN: { currency_code: "INR", currency_symbol: "₹" }, // India
    CN: { currency_code: "CNY", currency_symbol: "¥" }, // China (Renminbi)
    JP: { currency_code: "JPY", currency_symbol: "¥" }, // Japan
    KR: { currency_code: "KRW", currency_symbol: "₩" }, // South Korea
    HK: { currency_code: "HKD", currency_symbol: "HK$" }, // Hong Kong
    TW: { currency_code: "TWD", currency_symbol: "NT$" }, // Taiwan

    // Europe
    GB: { currency_code: "GBP", currency_symbol: "£" }, // United Kingdom
    DE: { currency_code: "EUR", currency_symbol: "€" }, // Germany
    FR: { currency_code: "EUR", currency_symbol: "€" }, // France
    IT: { currency_code: "EUR", currency_symbol: "€" }, // Italy
    ES: { currency_code: "EUR", currency_symbol: "€" }, // Spain
    NL: { currency_code: "EUR", currency_symbol: "€" }, // Netherlands
    CH: { currency_code: "CHF", currency_symbol: "CHF" }, // Switzerland
    SE: { currency_code: "SEK", currency_symbol: "kr" }, // Sweden
    NO: { currency_code: "NOK", currency_symbol: "kr" }, // Norway
    DK: { currency_code: "DKK", currency_symbol: "kr" }, // Denmark

    // North America
    US: { currency_code: "USD", currency_symbol: "$" }, // United States
    CA: { currency_code: "CAD", currency_symbol: "C$" }, // Canada
    MX: { currency_code: "MXN", currency_symbol: "Mex$" }, // Mexico

    // South America
    BR: { currency_code: "BRL", currency_symbol: "R$" }, // Brazil
    AR: { currency_code: "ARS", currency_symbol: "ARS$" }, // Argentina
    CL: { currency_code: "CLP", currency_symbol: "CLP$" }, // Chile
    CO: { currency_code: "COP", currency_symbol: "COP$" }, // Colombia
    PE: { currency_code: "PEN", currency_symbol: "S/" }, // Peru

    // Middle East
    AE: { currency_code: "AED", currency_symbol: "د.إ" }, // United Arab Emirates
    SA: { currency_code: "SAR", currency_symbol: "﷼" }, // Saudi Arabia
    TR: { currency_code: "TRY", currency_symbol: "₺" }, // Turkey
    QA: { currency_code: "QAR", currency_symbol: "﷼" }, // Qatar
    EG: { currency_code: "EGP", currency_symbol: "E£" }, // Egypt
    IL: { currency_code: "ILS", currency_symbol: "₪" }, // Israel
    BD: { currency_code: "BDT", currency_symbol: "৳" }, // Bangladesh

    // Africa
    ZA: { currency_code: "ZAR", currency_symbol: "R" }, // South Africa
    NG: { currency_code: "NGN", currency_symbol: "₦" }, // Nigeria
    KE: { currency_code: "KES", currency_symbol: "KSh" }, // Kenya
    GH: { currency_code: "GHS", currency_symbol: "₵" }, // Ghana

    // Oceania
    AU: { currency_code: "AUD", currency_symbol: "A$" }, // Australia
    NZ: { currency_code: "NZD", currency_symbol: "NZ$" }, // New Zealand
  };

  // Selected Filter States
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    locations: [],
    categories: [],
    intakes: [],
    studyModes: [],
    tuitionFee: 0,
  });

  // Course States
  const [programs, setPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //ads image
  const [adsImageA, setAdsImageA] = useState(null);
  const [adsImageB, setAdsImageB] = useState([]);
  const [showSwiperModal, setShowSwiperModal] = useState(false);

  // Add this to your state declarations at the top of the component
  const [resultCount, setResultCount] = useState(0);

  // Add new state for interests
  const [courseInterests, setCourseInterests] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const topRef = useRef(null);
  const scrollToTop = () => {
    // Method 2: Using scrollIntoView
    topRef.current?.scrollIntoView({ behavior: "smooth" });

    const scrollStep = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 0) {
        window.requestAnimationFrame(scrollStep);
        window.scrollTo(0, currentPosition - currentPosition / 8);
      }
    };
    window.requestAnimationFrame(scrollStep);
  };

  const [exchangeRates, setExchangeRates] = useState({});
  const [fetchedCountry, setFetchedCountry] = useState(null);

  const [selectedCurrency, setSelectedCurrency] = useState({});

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Add new state for filter loading and search
  const [filterLoading, setFilterLoading] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({});
  const [filterSearch, setFilterSearch] = useState("");

  // Add this new state for tracking initialization
  const [isInitializing, setIsInitializing] = useState(true);

  // Move fetchFilters definition here - before any references to it
  // Optimize filter fetching with caching
  const fetchFilters = useCallback(async (countryID) => {
    setFilterLoading(true);
    try {
      // Check cache first
      const cacheKey = `filters_${countryID}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setFilterData(parsedData);
        setFilterLoading(false);
        return;
      }

      const response = await fetch(filterURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countryID }),
      });
      const result = await response.json();

      if (result.success) {
        // Cache results for future visits
        sessionStorage.setItem(cacheKey, JSON.stringify(result.data));
        setFilterData(result.data);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    } finally {
      setFilterLoading(false);
    }
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=MYR`
      );
      const data = await response.json();

      // Log the fetched data to the console
      // console.log("Fetched exchange rates:", data);

      if (data && data.rates) {
        setExchangeRates(data.rates);
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };
  useEffect(() => {
    const fetchCurrencyOnChange = async () => {
      const currencyCode = sessionStorage.getItem("userCurrencyCode") || "MYR";
      const currencySymbol =
        sessionStorage.getItem("userCurrencySymbol") || "RM";

      // Fetch exchange rates based on the selected currency
      await fetchExchangeRates(currencyCode);

      setSelectedCurrency({
        currency_code: currencyCode,
        currency_symbol: currencySymbol,
      });
    };
    fetchCurrencyOnChange(); // Fetch the currency rates immediately on component mount or currency change
  }, [sessionStorage.getItem("userCurrencyCode")]); // Trigger on currency code change in session storage
  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrencyCode =
        sessionStorage.getItem("userCurrencyCode") || "MYR";

      if (newCurrencyCode !== selectedCurrency.currency_code) {
        setSelectedCurrency({
          currency_code: newCurrencyCode,
          currency_symbol: sessionStorage.getItem("userCurrencySymbol") || "RM",
        });

        console.log(
          "Detected currency change in sessionStorage:",
          newCurrencyCode
        );

        fetchExchangeRates(newCurrencyCode);
        fetchCourses();
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [selectedCurrency]);

  const convertToFetchedCurrency = (amount) => {
    const currencyCode = sessionStorage.getItem("userCurrencyCode") || "MYR"; // Use sessionStorage value
    const currencySymbol = sessionStorage.getItem("userCurrencySymbol") || "RM";

    if (!exchangeRates || !Object.keys(exchangeRates).length) {
      return `${currencySymbol} ${amount}`; // Return original cost if no rates available
    }

    const rate = exchangeRates[currencyCode] || 1;
    return `${currencySymbol} ${currency(amount).multiply(rate).format()}`; // Convert MYR to the correct currency
  };

  const fetchCountry = async () => {
    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();

      if (data && data.country) {
        let country = data.country; // Get the real country code

        // Override country for testing
        // country = 'CN'; // Change this to 'SG' temporarily

        const currencyInfo = countryCurrencyMap[country] || {
          currency_code: "MYR",
          currency_symbol: "RM",
        };

        sessionStorage.setItem("userCountry", country);
        sessionStorage.setItem("userCurrencyCode", currencyInfo.currency_code);
        sessionStorage.setItem(
          "userCurrencySymbol",
          currencyInfo.currency_symbol
        );

        // console.log("Fetched country:", country);
        // console.log("Currency Code:", currencyInfo.currency_code);
        // console.log("Currency Symbol:", currencyInfo.currency_symbol);

        setFetchedCountry(country);
        setSelectedCurrency(currencyInfo); // Store currency info in state

        return country;
      } else {
        throw new Error("Unable to fetch location data");
      }
    } catch (error) {
      console.error("Error fetching country:", error);
      return null;
    }
  };

  useEffect(() => {
    // Completely revamped initialization process
    const initializeData = async () => {
      setLoading(true);
      setIsInitializing(true);
      try {
        // Step 1: Fetch countries and user's location in parallel
        const [countriesResult, userCountry] = await Promise.all([
          fetch(countriesURL).then(res => res.json()),
          fetchCountry(),
        ]);

        // Step 2: Set countries and determine selected country
        if (countriesResult.data) {
          setCountries(countriesResult.data);
          
          // Determine which country to select (from URL params, user location, or default to Malaysia)
          let countryToSelect;
          
          if (location.state?.initialCountry) {
            countryToSelect = countriesResult.data.find(
              c => c.country_name === location.state.initialCountry
            );
          }
          
          if (!countryToSelect && userCountry) {
            countryToSelect = countriesResult.data.find(
              c => c.country_code === userCountry
            );
          }
          
          if (!countryToSelect) {
            countryToSelect = countriesResult.data.find(
              c => c.country_name === "Malaysia"
            );
          }
          
          // Step 3: Set selected country without triggering course fetch
          if (countryToSelect) {
            setSelectedCountry(countryToSelect);
            
            // Step 4: Fetch filters and exchange rates in parallel
            await Promise.all([
              fetchFilters(countryToSelect.id),
              fetchExchangeRates(),
              fetchAddsImageA(),
              fetchAddsImageB()
            ]);
          }
        }
      } catch (error) {
        console.error("Error during initialization:", error);
        setError("Failed to initialize. Please try again.");
      } finally {
        // Step 5: Mark initialization as complete
        setIsInitializing(false);
        // Note: We don't set loading=false here as fetchCourses will do that
      }
    };

    initializeData();
    // Empty dependency array - only run once on mount
  }, []);

  // This effect will run only after initialization is complete
  useEffect(() => {
    if (!isInitializing && selectedCountry) {
      fetchCourses();
    }
  }, [
    isInitializing,
    selectedCountry,
    selectedInstitute,
    selectedQualification,
    selectedFilters,
    searchQuery,
    currentPage,
  ]);

  // Modify the country selection effect to respect the initialization flow
  useEffect(() => {
    if (selectedCountry && !isInitializing) {
      fetchFilters(selectedCountry.id);
    }
  }, [selectedCountry, isInitializing, fetchFilters]);

  useEffect(() => {
    if (currentPage) {
      scrollToTop();
    }
  }, [currentPage]);

  // Step 1: Fetch Countries
  const fetchCountries = async () => {
    try {
      const response = await fetch(countriesURL);
      const result = await response.json();

      if (result.data) {
        setCountries(result.data);

        // Set Malaysia as default if exists
        const malaysia = result.data.find(
          (country) => country.country_name === "Malaysia"
        );
        if (malaysia) {
          setSelectedCountry(malaysia);
        }
      }
    } catch (error) {
      //console.error("Error fetching countries:", error);
    }
  };

  // Step 3: Fetch Courses
  const fetchCourses = useCallback(async () => {
    console.log("fetchCourses called");
    if (!selectedCountry) {
      console.log("No country selected, returning early");
      return;
    }
    setLoading(true);
    try {
      const requestBody = {
        countryID: selectedCountry.id,
        page: currentPage,
      };
      if (selectedInstitute) {
        requestBody.institute = selectedInstitute.id;
      }
      if (selectedQualification) {
        requestBody.qualification = selectedQualification.id;
      }
      if (selectedFilters.locations && selectedFilters.locations.length > 0) {
        requestBody.location = selectedFilters.locations;
      }
      if (selectedFilters.categories && selectedFilters.categories.length > 0) {
        requestBody.category = selectedFilters.categories;
      }
      if (selectedFilters.intakes && selectedFilters.intakes.length > 0) {
        requestBody.intake = selectedFilters.intakes;
      }
      if (selectedFilters.studyModes && selectedFilters.studyModes.length > 0) {
        requestBody.studyMode = selectedFilters.studyModes;
      }
      if (selectedFilters.tuitionFee) {
        requestBody.tuitionFee = selectedFilters.tuitionFee;
      }
      if (searchQuery) {
        requestBody.search = searchQuery;
      }
      if (currentPage) {
        requestBody.page = currentPage;
      }
      const response = await fetch(courseListURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      // console.log("Response status:", response.status);
      const rawResponse = await response.text();
      // console.log("Raw response:", rawResponse);
      const result = JSON.parse(rawResponse);
      //console.log(result);
      if (!result.data) {
        throw new Error("Invalid response structure");
      }
      if (result.data.length === 0) {
        console.warn("No courses found with current filters:", {
          filters: requestBody,
          total: result.total,
        });
      } else {
        console.log("fetch data");
      }
      setResultCount(result.total || 0);
      setPrograms(result.data || []);
      setTotalPages(result.last_page);
    } catch (error) {
      setError(`Failed to fetch courses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [
    selectedCountry,
    currentPage,
    selectedInstitute,
    selectedQualification,
    selectedFilters,
    searchQuery,
  ]);

  const fetchAddsImageA = async () => {
    try {
      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 69 }),
      });
      const result = await response.json();
      //console.log(result);
      if (result.success) {
        setAdsImageA(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };
  const openSwiperModal = (index) => {
    setActivePhotoIndex(index);
    setShowSwiperModal(true);
  };

  const handleCloseSwiperModal = () => {
    setShowSwiperModal(false);
  };

  const fetchAddsImageB = async () => {
    try {
      const response = await fetch(adsAURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertisement_type: 70 }),
      });
      const result = await response.json();
      // console.log(result);
      if (result.success) {
        setAdsImageB(result.data);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (location.state?.initialSearchQuery) {
      setTempSearch(location.state.initialSearchQuery);
      setSearchQuery(location.state.initialSearchQuery);
    }
  }, [location.state?.initialSearchQuery, location.state?.searchTrigger]);

  useEffect(() => {
    if (location.state?.initialSearchQuery) {
      const query = location.state.initialSearchQuery;
      setTempSearch(query); // Set the displayed search term
      setSearchQuery(query); // Set the search query for API
    }
  }, []);

  // In SearchCourse component:
  useEffect(() => {
    if (location.state?.initialCategory) {
      setSelectedFilters((prev) => ({
        ...prev,
        categories: [location.state.initialCategory],
      }));
      setCurrentPage(1);
    }
  }, [location.state?.initialCategory, location.state?.categoryTrigger]);

  // Handle qualification and country filters from FeaturedUni
  useEffect(() => {
    if (location.state?.initialQualification) {
      const qualification = filterData.qualificationList.find(
        (q) => q.qualification_name === location.state.initialQualification
      );
      if (qualification) {
        setSelectedQualification(qualification);
      }
    }

    if (location.state?.initialCountry) {
      const country = countries.find(
        (c) => c.country_name === location.state.initialCountry
      );
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [
    location.state?.initialQualification,
    location.state?.initialCountry,
    location.state?.filterTrigger,
    filterData.qualificationList,
    countries,
  ]);

  // Handle category filter from CoursesContainer
  useEffect(() => {
    if (location.state?.initialCategory && filterData.categoryList) {
      const category = filterData.categoryList.find(
        (c) => c.category_name === location.state.initialCategory
      );
      if (category) {
        setSelectedFilters((prev) => ({
          ...prev,
          categories: [category.id],
        }));
      }
    }
  }, [
    location.state?.initialCategory,
    location.state?.categoryTrigger,
    filterData.categoryList,
  ]);

  // Handler Functions
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCurrentPage(1);
    //resetFilters();
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (Array.isArray(newFilters[filterType])) {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(
            (v) => v !== value
          );
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else {
        newFilters[filterType] = value;
      }
      return newFilters;
    });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedInstitute(null);
    setSelectedQualification(null);
    setSelectedFilters({
      locations: [],
      categories: [],
      intakes: [],
      studyModes: [],
      tuitionFee: 0,
    });
    setSearchQuery("");
    setTempSearch(""); // Clear the search input field as well
    setCurrentPage(1);
  };

  const handleApplyNow = (program) => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      navigate("/studentPortalLogin");
    } else {
      navigate(`/studentApplyCourses/${program.id}`, {
        state: {
          programId: program.id,
          schoolLogoUrl: `${baseURL}storage/${program.logo}`,
          schoolName: program.school_name,
          courseName: program.name,
        },
      });
    }
  };

  const handleInterestClick = async (courseId) => {
    if (!isAuthenticated) {
      navigate("/studentPortalLogin");
      return;
    }

    try {
      const token =
        sessionStorage.getItem("token") || localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (!courseInterests[courseId]) {
        // Add interest
        const requestBody = { course_id: courseId };
        console.log("Adding interest - Request:", {
          url: `${baseURL}api/student/addInterestedCourse`,
          headers,
          body: requestBody,
        });

        const response = await fetch(
          `${baseURL}api/student/addInterestedCourse`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        console.log("Adding interest - Response:", data);

        if (data.success) {
          setCourseInterests((prev) => ({
            ...prev,
            [courseId]: {
              id: data.data.id,
              status: 1,
            },
          }));
        }
      } else {
        // Toggle interest status using course_id instead of id
        const requestBody = {
          course_id: courseId, // Changed from id to course_id
          type: courseInterests[courseId].status === 1 ? "disable" : "enable",
        };
        console.log("Toggling interest - Request:", {
          url: `${baseURL}api/student/removeInterestedCourse`,
          headers,
          body: requestBody,
        });

        const response = await fetch(
          `${baseURL}api/student/removeInterestedCourse`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();
        console.log("Toggling interest - Response:", data);

        if (data.success) {
          setCourseInterests((prev) => ({
            ...prev,
            [courseId]: {
              ...prev[courseId],
              status: prev[courseId].status === 1 ? 0 : 1,
            },
          }));
        }
      }
    } catch (error) {
      console.error("Error handling interest:", error);
      if (error.response) {
        console.log("Error response:", await error.response.text());
      }
    }
  };

  const renderAdImages = (adsImages, defaultImage) => {
    if (Array.isArray(adsImages) && adsImages.length > 0) {
      return (
        <Suspense
          fallback={
            <div className="mb-4">
              <Placeholder
                as="div"
                animation="wave"
                className="w-100"
                style={{ height: "175px" }}
              >
                <Placeholder xs={12} style={{ height: "100%" }} />
              </Placeholder>
            </div>
          }
        >
          <LazySwiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[Navigation, Autoplay]}
            style={{ padding: "0px 0" }}
          >
            {adsImages.map((ad, index) => (
              <LazySwiperSlide key={ad.id} className="advertisement-item">
                <a
                  href={
                    ad.banner_url.startsWith("http")
                      ? ad.banner_url
                      : `https://${ad.banner_url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    loading="lazy"
                    src={`${baseURL}storage/${ad.banner_file}`}
                    alt={`Advertisement ${ad.banner_name}`}
                    className="studypal-image rounded-3"
                    style={{
                      height: adsImages === adsImageB ? "100px" : "175px",
                      objectFit: "fill",
                      width: "100%",
                      marginBottom: index < adsImages.length - 1 ? "20px" : "0",
                    }}
                  />
                </a>
              </LazySwiperSlide>
            ))}
          </LazySwiper>
        </Suspense>
      );
    }
    return (
      <img
        loading="lazy"
        src={defaultImage}
        alt="Default Image"
        className="studypal-image"
        style={{ height: "175px" }}
      />
    );
  };

  // 3. Implement debounced search with useCallback
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  // 4. Memoize rendered programs to prevent recalculation
  const renderedPrograms = useMemo(() => {
    return programs.map((program, index) => (
      <React.Fragment key={program.id}>
        <div
          className="card mb-4 degree-card"
          style={{ position: "relative", height: "auto" }}
        >
          {program.featured && <div className="featured-badge">Featured</div>}
          {/* Program card content - same as your original design */}
          <div className="card-body d-flex flex-column flex-md-row align-items-start">
            <Row className="coursepage-row">
              <Col md={6} lg={6} className="course-card-ipad">
                <div className="card-image mb-3 mb-md-0">
                  <h5 className="card-title">
                    <Link
                      rel="preload"
                      to={`/course-details/${program.school_name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${program.name
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                      style={{ color: "black" }}
                      onClick={() =>
                        sessionStorage.setItem("courseId", program.id)
                      }
                    >
                      {program.name}
                    </Link>
                  </h5>

                  <div className="coursepage-searchcourse-courselist-first">
                    <div
                      className="coursepage-img"
                      style={{
                        paddingLeft: "0", // Remove left padding
                        display: "flex",
                        justifyContent: "center", // Center the logo
                        alignItems: "center", // Center vertically if needed
                        flexDirection: "column", // Stack items vertically
                      }}
                    >
                      <Link
                        rel="preload"
                        to={`/university-details/${program.school_name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        style={{ color: "black" }}
                        onClick={() =>
                          sessionStorage.setItem("schoolId", program.school_id)
                        }
                      >
                        <div className="image-container">
                          <img
                            loading="lazy"
                            src={`${baseURL}storage/${program.logo}`}
                            alt={program.school_name}
                            width="100"
                            className="coursepage-img-size"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="searchcourse-coursename-schoolname">
                      <div>
                        <Link
                          rel="preload"
                          to={`/university-details/${program.school_name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          style={{ color: "black" }}
                          onClick={() =>
                            sessionStorage.setItem(
                              "schoolId",
                              program.school_id
                            )
                          }
                        >
                          <h5 className="card-text">{program.school_name}</h5>
                        </Link>

                        <i
                          className="bi bi-geo-alt"
                          style={{ marginRight: "10px", color: "#AAAAAA" }}
                        ></i>
                        <span>
                          {program.state || "N/A"}, {program.country || "N/A"}
                        </span>
                      </div>
                      <div>
                        <a
                          href={program.school_location}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Click and view on map
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={6} className="course-card-fee-ipad">
                <div className="d-flex flex-grow-1 coursepage-searchcourse-courselist-second">
                  <div className="details-div">
                    <div className="flex-wrap coursepage-info-one">
                      <Col>
                        <div>
                          <div>
                            {" "}
                            {/* Align to bottom on iPad */}
                            <Row>
                              <div className="searchcourse-dflex-center">
                                <i
                                  className="bi bi-mortarboard"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                <p style={{ paddingLeft: "20px" }}>
                                  {program.qualification}
                                </p>
                              </div>
                              <div
                                style={{ marginTop: "10px" }}
                                className="searchcourse-dflex-center"
                              >
                                <i
                                  className="bi bi-calendar-check"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                <p style={{ paddingLeft: "20px" }}>
                                  {program.mode}
                                </p>
                              </div>
                              <div
                                style={{ marginTop: "10px" }}
                                className="searchcourse-dflex-center"
                              >
                                <i
                                  className="bi bi-clock"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                <p style={{ paddingLeft: "20px" }}>
                                  {program.period}
                                </p>
                              </div>
                              <div
                                style={{ marginTop: "5px" }} // Reduced margin
                                className="searchcourse-dflex-center"
                              >
                                <i
                                  className="bi bi-calendar2-week"
                                  style={{ marginRight: "5px" }} // Reduced margin
                                ></i>
                                <p
                                  style={{
                                    paddingLeft: "10px", // Reduced padding
                                    margin: 0,
                                    whiteSpace: "normal",
                                    wordBreak: "keep-all",
                                    overflowWrap: "break-word",
                                    display: "inline-block",
                                    width: "calc(100% - 30px)", // Adjusted width
                                  }}
                                >
                                  {Array.isArray(program.intake)
                                    ? program.intake
                                        .map((intake) => intake.trim())
                                        .join(", ")
                                    : "N/A"}
                                </p>
                              </div>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </div>
                  <div className="fee-apply">
                    <div
                      className="fee-info text-right"
                      style={{ marginTop: "25px" }}
                    >
                      <p
                        style={{ fontSize: "14px" }}
                        className="coursepage-estimatefee"
                      >
                        estimate fee
                        <p style={{ fontSize: "16px" }}>
                          {program.international_cost &&
                          program.country_code !== fetchedCountry ? (
                            program.international_cost === "0" ? (
                              program.cost === "0" || program.cost === "RM0" ? (
                                "N/A"
                              ) : (
                                <>
                                  <strong>
                                    {sessionStorage.getItem(
                                      "userCurrencySymbol"
                                    ) || "RM"}
                                  </strong>
                                  {convertToFetchedCurrency(
                                    program.cost
                                  ).replace(/^.*?(\d+.*)/, "$1")}
                                </>
                              )
                            ) : (
                              <>
                                <strong>
                                  {sessionStorage.getItem(
                                    "userCurrencySymbol"
                                  ) || "RM"}
                                </strong>
                                {convertToFetchedCurrency(
                                  program.international_cost
                                ).replace(/^.*?(\d+.*)/, "$1")}
                              </>
                            )
                          ) : program.cost === "0" || program.cost === "RM0" ? (
                            "N/A"
                          ) : (
                            <>
                              <strong>
                                {sessionStorage.getItem("userCurrencySymbol") ||
                                  "RM"}
                              </strong>
                              {convertToFetchedCurrency(program.cost).replace(
                                /^.*?(\d+.*)/,
                                "$1"
                              )}
                            </>
                          )}
                        </p>
                      </p>
                    </div>
                    <div className="d-flex interest-division">
                      <div className="interest">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleInterestClick(program.id);
                          }}
                          className="interest-button"
                          aria-label={
                            courseInterests[program.id]?.status === 1
                              ? "Remove from interests"
                              : "Add to interests"
                          }
                        >
                          <span style={{ fontSize: "16px" }}>
                            {courseInterests[program.id]?.status === 1
                              ? "Favourite"
                              : "Favourite"}
                          </span>
                          <i
                            className={
                              courseInterests[program.id]?.status === 1
                                ? "bi bi-heart-fill"
                                : "bi bi-heart"
                            }
                          ></i>
                        </button>
                      </div>
                      <div className="apply-button">
                        {program.institute_category === "Local University" ? (
                          <button
                            onClick={() =>
                              (window.location.href = `mailto:${program.email}`)
                            }
                            className="featured coursepage-applybutton">
                            Contact Now
                          </button>
                        ) : (
                          <button
                            className="featured coursepage-applybutton"
                            onClick={() => handleApplyNow(program)}
                          >
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    ));
  }, [
    programs,
    selectedCurrency,
    fetchedCountry,
    courseInterests,
    handleInterestClick,
    handleApplyNow,
  ]);

  // 5. Optimize initial data loading
  useEffect(() => {
    // Completely revamped initialization process
    const initializeData = async () => {
      setLoading(true);
      setIsInitializing(true);
      try {
        // Step 1: Fetch countries and user's location in parallel
        const [countriesResult, userCountry] = await Promise.all([
          fetch(countriesURL).then(res => res.json()),
          fetchCountry(),
        ]);

        // Step 2: Set countries and determine selected country
        if (countriesResult.data) {
          setCountries(countriesResult.data);
          
          // Determine which country to select (from URL params, user location, or default to Malaysia)
          let countryToSelect;
          
          if (location.state?.initialCountry) {
            countryToSelect = countriesResult.data.find(
              c => c.country_name === location.state.initialCountry
            );
          }
          
          if (!countryToSelect && userCountry) {
            countryToSelect = countriesResult.data.find(
              c => c.country_code === userCountry
            );
          }
          
          if (!countryToSelect) {
            countryToSelect = countriesResult.data.find(
              c => c.country_name === "Malaysia"
            );
          }
          
          // Step 3: Set selected country without triggering course fetch
          if (countryToSelect) {
            setSelectedCountry(countryToSelect);
            
            // Step 4: Fetch filters and exchange rates in parallel
            await Promise.all([
              fetchFilters(countryToSelect.id),
              fetchExchangeRates(),
              fetchAddsImageA(),
              fetchAddsImageB()
            ]);
          }
        }
      } catch (error) {
        console.error("Error during initialization:", error);
        setError("Failed to initialize. Please try again.");
      } finally {
        // Step 5: Mark initialization as complete
        setIsInitializing(false);
        // Note: We don't set loading=false here as fetchCourses will do that
      }
    };

    initializeData();
    // Empty dependency array - only run once on mount
  }, []);

  // This effect will run only after initialization is complete
  useEffect(() => {
    if (!isInitializing && selectedCountry) {
      fetchCourses();
    }
  }, [
    isInitializing,
    selectedCountry,
    selectedInstitute,
    selectedQualification,
    selectedFilters,
    searchQuery,
    currentPage,
  ]);

  // 6. Handle search form changes more efficiently
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setTempSearch(value);
    debouncedSearch(value);
  };

  const generateCourseStructuredData = (programs) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: programs.map((program, index) => ({
        "@type": "Course",
        position: index + 1,
        name: program.course_name,
        description: program.description,
        provider: {
          "@type": "EducationalOrganization",
          name: program.school_name,
          address: {
            "@type": "PostalAddress",
            addressRegion: program.state,
            addressCountry: program.country,
          },
        },
        educationalLevel: program.qualification,
        timeRequired: program.period,
        startDate: program.intake?.join(", "),
        educationalProgramMode: program.study_mode,
        offers: {
          "@type": "Offer",
          price: program.cost,
          priceCurrency: "MYR",
        },
      })),
    };
  };

  // Add SEO-friendly headings and meta descriptions
  const generateSEOMetadata = () => {
    const locationText =
      selectedFilters.locations.length > 0
        ? filterData.state
            .filter((loc) => selectedFilters.locations.includes(loc.id))
            .map((loc) => loc.state_name)
            .reduce((text, location, index, array) => {
              if (index === 0) return location;
              if (index === array.length - 1) return `${text} and ${location}`;
              return `${text}, ${location}`;
            }, "")
        : selectedCountry?.country_name || "Malaysia";

    const qualificationText = selectedQualification
      ? `${selectedQualification.qualification_name} `
      : "";

    const title = `Top ${resultCount} ${qualificationText}Courses in ${locationText} | StudyPal Malaysia`;
    const description = `Find and compare ${resultCount} ${qualificationText}courses in ${locationText}. Get information about fees, intake dates, and apply online.`;

    return (
      <Helmet className="notranslate">
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={`courses, ${qualificationText.toLowerCase()}, study in ${locationText.toLowerCase()}`}
        />
        <script type="application/ld+json">
          {JSON.stringify(generateCourseStructuredData(programs))}
        </script>
      </Helmet>
    );
  };

  const generateSEOHeading = () => {
    const locationText =
      selectedFilters.locations.length > 0
        ? filterData.state
            .filter((loc) => selectedFilters.locations.includes(loc.id))
            .map((loc) => loc.state_name)
            .reduce((text, location, index, array) => {
              if (index === 0) return location;
              if (index === array.length - 1) return `${text} and ${location}`;
              return `${text}, ${location}`;
            }, "")
        : selectedCountry?.country_name || "Malaysia";

    const searchTerms = searchQuery ? `"${searchQuery}" ` : "";
    const qualificationText = selectedQualification
      ? `${selectedQualification.qualification_name} `
      : "";

    return (
      <div className="seo-heading mt-4 mb-4 notranslate">
        <h1 style={{ fontSize: "1.5rem", color: "#333", marginBottom: "0" }}>
          {resultCount > 0 ? `${resultCount} ` : ""}
          {qualificationText}Courses {searchTerms}
          in {locationText}
        </h1>
        {searchQuery && (
          <p className="text-muted">
            Showing results for "{searchQuery}" in {locationText}
          </p>
        )}
      </div>
    );
  };

  // Add useEffect to check authentication
  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Function to convert cost based on the user's country
  const convertCost = (cost, currencyCode) => {
    if (!exchangeRates || !Object.keys(exchangeRates).length) return cost; // Return original cost if no rates available
    const rate = exchangeRates[currencyCode] || 1; // Get the exchange rate for the selected currency
    return currency(cost).multiply(rate).format(); // Convert and format the cost
  };

  // Add this function to count selected filters
  const countSelectedFilters = () => {
    let count = 0;
    if (selectedInstitute) count++;
    if (selectedQualification) count++;
    count += selectedFilters.locations.length;
    count += selectedFilters.categories.length;
    count += selectedFilters.intakes.length;
    count += selectedFilters.studyModes.length;
    if (selectedFilters.tuitionFee > 0) count++;
    return count;
  };

  // Add a virtualized list component for large filter sets
  const VirtualizedFilterList = ({
    items,
    selectedItems,
    onItemSelect,
    height = 200,
  }) => {
    // Filter displayed items if there's a search term
    const filteredItems = useMemo(() => {
      if (!filterSearch) return items;
      return items.filter((item) => {
        const label = item.category_name || item.state_name || item.month || "";
        return label.toLowerCase().includes(filterSearch.toLowerCase());
      });
    }, [items, filterSearch]);

    const Row = ({ index, style }) => {
      const item = filteredItems[index];
      return (
        <div style={style}>
          <Form.Check
            type="checkbox"
            id={`filter-${item.id}`}
            label={item.category_name || item.state_name || item.month}
            checked={selectedItems.includes(item.id)}
            onChange={() => onItemSelect(item.id)}
          />
        </div>
      );
    };

    return (
      <>
        {items.length > 15 && (
          <Form.Control
            size="sm"
            placeholder="Search filters..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            className="mb-2"
          />
        )}
        <List
          height={Math.min(height, filteredItems.length * 35)}
          itemCount={filteredItems.length}
          itemSize={35}
          width="100%"
          className="custom-filter-list"
        >
          {Row}
        </List>
      </>
    );
  };

  // Function to toggle expanded state of a filter section
  const toggleFilterExpand = (filterType) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // Render a filter section with proper loading state and optimization
  const renderFilterSection = (
    title,
    filterType,
    items,
    selectedItems,
    onItemSelect
  ) => {
    const isExpanded = expandedFilters[filterType];
    const itemCount = items.length;
    const showVirtualized = itemCount > 15;
    const displayLimit = 8;

    return (
      <div className="filter-group">
        <h5 style={{ marginTop: "25px" }}>
          {title}
          {itemCount > displayLimit && (
            <small
              className="ms-2 cursor-pointer"
              onClick={() => toggleFilterExpand(filterType)}
              style={{ 
                color: "#B71A18", 
                fontSize: "0.8rem",
                cursor: "pointer",
              }}
            >
              {isExpanded ? "Show less" : `Show all (${itemCount})`}
            </small>
          )}
        </h5>

        {filterLoading ? (
          <div className="d-flex justify-content-center my-3">
            <l-dot-pulse size="30" speed="1.5" color="#b71a18"></l-dot-pulse>
          </div>
        ) : showVirtualized && isExpanded ? (
          <VirtualizedFilterList
            items={items}
            selectedItems={selectedItems}
            onItemSelect={onItemSelect}
          />
        ) : (
          <Form.Group>
            {(isExpanded ? items : items.slice(0, displayLimit)).map(
              (item, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={
                    item.category_name ||
                    item.state_name ||
                    item.month ||
                    item.studyMode_name
                  }
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onItemSelect(item.id)}
                />
              )
            )}
          </Form.Group>
        )}
      </div>
    );
  };

  return (
    <Container
      fluid
      className="px-0"
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        "@media (min-width: 768px)": {
          maxWidth: "1440px",
          padding: "0 1rem",
        },
      }}
    >
      {generateSEOMetadata()}
      <div ref={topRef}>
        <Container>
          {generateSEOHeading()}
          {/* <h3 style={{ textAlign: "left", paddingTop: "15px" }}>
            {selectedQualification
              ? `Courses in ${selectedQualification.qualification_name}`
              : "Courses in Degree"}
          </h3> */}

          {/* Top Row - Country, University, Qualification Dropdowns */}
          <Row
            className="align-items-center mb-2 mb-md-0 saerchcourse-display-none"
            style={{ marginTop: "10px" }}
          >
            {/* Country Dropdown */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <ButtonGroup className="w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Dropdown.Toggle
                    className="country-dropdown-course w-100"
                    style={{
                      backgroundColor: selectedCountry ? "white" : "",
                      color: selectedCountry ? "#000" : "",
                      border: selectedCountry ? "1px solid #B71A18" : "",
                    }}
                  >
                    {selectedCountry ? (
                      <>
                        <CountryFlag
                          countryCode={selectedCountry.country_code}
                          svg
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                          }}
                        />
                        {selectedCountry.country_name}
                      </>
                    ) : (
                      "Country"
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="scrollable-dropdown">
                    {/* Country filter input */}
                    <InputGroup className="mb-2 ps-3 pe-3">
                      <Form.Control
                        placeholder="Filter countries"
                        onChange={(e) =>
                          setCountryFilter(e.target.value.toLowerCase())
                        }
                        value={countryFilter}
                        className="ps-1 countryinput"
                      />
                    </InputGroup>
                    {/* Country list */}
                    {countries
                      .filter((country) =>
                        country.country_name
                          .toLowerCase()
                          .includes(countryFilter)
                      )
                      .map((country, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => handleCountryChange(country)}
                        >
                          <CountryFlag
                            countryCode={country.country_code}
                            svg
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "10px",
                            }}
                          />
                          {country.country_name}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>

            {/* University Dropdown */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <ButtonGroup className="w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Dropdown.Toggle
                    className="university-dropdown-course w-100"
                    style={{
                      backgroundColor: selectedInstitute ? "white" : "",
                      color: selectedInstitute ? "#000" : "",
                      border: selectedInstitute ? "1px solid #B71A18" : "",
                    }}
                  >
                    {selectedInstitute
                      ? selectedInstitute.institute_name || selectedInstitute.core_metaName || selectedInstitute.name
                      : "University"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterData.institueList.map((institute, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedInstitute(institute)}
                      >
                        {institute.institute_name || institute.core_metaName || institute.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>

            {/* Qualification Dropdown */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <ButtonGroup className="w-100">
                <Dropdown as={ButtonGroup} className="w-100">
                  <Dropdown.Toggle
                    className="qualification-dropdown-course w-100"
                    style={{
                      backgroundColor: selectedQualification ? "white" : "",
                      color: selectedQualification ? "#000" : "",
                      border: selectedQualification ? "1px solid #B71A18" : "",
                    }}
                  >
                    {selectedQualification
                      ? selectedQualification.qualification_name
                      : "Qualification"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterData.qualificationList.map(
                      (qualification, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() =>
                            setSelectedQualification(qualification)
                          }
                        >
                          {qualification.qualification_name}
                        </Dropdown.Item>
                      )
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </Col>

            {/* Reset Filter Button */}
            <Col xs={12} sm={4} md={3} lg={2} className="mb-2 mb-sm-0">
              <button
                onClick={resetFilters}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#B71A18",
                  fontWeight: "lighter",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-funnel" style={{ marginRight: "5px" }} />
                Reset Filters
              </button>
            </Col>
          </Row>

          {/* Search Bar */}
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              fetchCourses();
            }}
          >
            <Form.Control
              className="custom-placeholder searchinputborder saerchcourse-display-none"
              style={{ height: "45px", marginTop: "9px" }}
              placeholder="Search for Courses, Institutions"
              value={tempSearch}
              onChange={handleSearchChange}
            />
          </Form>
          <div className="coursepage-reset-display-search">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                fetchCourses();
              }}
            >
              <Form.Control
                className="custom-placeholder searchinputborder"
                style={{ height: "45px", marginTop: "9px" }}
                placeholder="Search for Courses, Institutions"
                value={tempSearch}
                onChange={handleSearchChange}
              />
            </Form>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="mobile-filter-button d-flex mt-3"
            >
              <i
                className={`bi bi-funnel${
                  countSelectedFilters() > 0 ? "-fill" : ""
                }`}
              ></i>
              <span>Filter</span>
              {countSelectedFilters() > 0 && (
                <span className="ms-1">({countSelectedFilters()})</span>
              )}
            </button>
          </div>
        </Container>
        {/* Mobile Filters */}
        <div
          className={`mobile-filters-container ${
            showMobileFilters ? "show" : ""
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => setShowMobileFilters(false)}
            className="mobile-close-button"
            style={{
              position: "absolute",
              marginLeft: "-50px",
              marginTop: "-50px",
              background: "none",
              border: "none",
              fontSize: "2rem",
              color: "#495057",
              zIndex: 1,
            }}
          >
            &times;
          </button>

          <div className="accordion-scroll-container">
            <Accordion className="custom-accordion">
              {/* Country Filter */}
              <Accordion.Item eventKey="0">
                <Accordion.Header className="custom-accordion-header">
                  {selectedCountry ? (
                    <>
                      <CountryFlag
                        countryCode={selectedCountry.country_code}
                        svg
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                      />
                      {selectedCountry.country_name}
                    </>
                  ) : (
                    "Select Country"
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  <InputGroup className="mb-2 ps-3 pe-3">
                    <Form.Control
                      placeholder="Filter countries"
                      onChange={(e) =>
                        setCountryFilter(e.target.value.toLowerCase())
                      }
                      value={countryFilter}
                      className="ps-1 countryinput"
                    />
                  </InputGroup>
                  <div className="country-list">
                    {countries
                      .filter((country) =>
                        country.country_name
                          .toLowerCase()
                          .includes(countryFilter)
                      )
                      .map((country, index) => (
                        <Form.Check
                          key={index}
                          type="radio"
                          name="country"
                          id={`country-${country.id}`}
                          label={
                            <div
                              className="d-flex align-items-center"
                              style={{
                                marginRight: "10px",
                                paddingTop: "0",
                                paddingBottom: "0",
                              }}
                            >
                              <CountryFlag
                                countryCode={country.country_code}
                                svg
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "10px",
                                  paddingTop: "0",
                                  paddingBottom: "0",
                                }}
                              />
                              {country.country_name}
                            </div>
                          }
                          checked={selectedCountry?.id === country.id}
                          onChange={() => handleCountryChange(country)}
                          className="mb-2"
                        />
                      ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              {/* University Filter */}
              <Accordion.Item eventKey="1">
                <Accordion.Header className="custom-accordion-header">
                  {selectedInstitute
                    ? selectedInstitute.institute_name || selectedInstitute.core_metaName || selectedInstitute.name
                    : "Select University"}
                </Accordion.Header>
                <Accordion.Body>
                  {filterData.institueList.map((institute, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      name="university"
                      id={`institute-${institute.id}`}
                      label={institute.institute_name || institute.core_metaName || institute.name}
                      checked={selectedInstitute?.id === institute.id}
                      onChange={() => setSelectedInstitute(institute)}
                      className="mb-2"
                    />
                  ))}
                </Accordion.Body>
              </Accordion.Item>

              {/* Qualification Accordion Item */}
              <Accordion.Item eventKey="2">
                <Accordion.Header className="custom-accordion-header">
                  {selectedQualification
                    ? selectedQualification.qualification_name
                    : "Qualification"}
                </Accordion.Header>
                <Accordion.Body className="custom-accordion-body">
                  <Form.Group>
                    {filterData.qualificationList.map(
                      (qualification, index) => (
                        <Form.Check
                          key={index}
                          type="radio"
                          name="qualification"
                          id={`qualification-${qualification.id}`}
                          label={qualification.qualification_name}
                          checked={
                            selectedQualification?.id === qualification.id
                          }
                          onChange={() =>
                            setSelectedQualification(qualification)
                          }
                          className="mb-2"
                        />
                      )
                    )}
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
              {/* Location Filter */}
              <Accordion.Item eventKey="3">
                <Accordion.Header
                  className="custom-accordion-header"
                  onClick={() => toggleFilterExpand("mobileLocations")}
                >
                  Location
                </Accordion.Header>
                <Accordion.Body className="custom-accordion-body">
                  {filterLoading ? (
                    <div className="text-center py-2">
                      <l-dot-pulse
                        size="30"
                        speed="1.5"
                        color="#b71a18"
                      ></l-dot-pulse>
                    </div>
                  ) : (
                    <Form.Group>
                      {expandedFilters.mobileLocations &&
                      filterData.state &&
                      filterData.state.length > 15 ? (
                        <VirtualizedFilterList
                          items={filterData.state}
                          selectedItems={selectedFilters.locations}
                          onItemSelect={(id) =>
                            handleFilterChange("locations", id)
                          }
                        />
                      ) : (
                        filterData.state &&
                        filterData.state.map((location, index) => (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            label={location.state_name}
                            checked={selectedFilters.locations.includes(
                              location.id
                            )}
                            onChange={() =>
                              handleFilterChange("locations", location.id)
                            }
                          />
                        ))
                      )}
                    </Form.Group>
                  )}
                </Accordion.Body>
              </Accordion.Item>

              {/* Course Category Filter */}
              <Accordion.Item eventKey="4">
                <Accordion.Header
                  className="custom-accordion-header"
                  onClick={() => toggleFilterExpand("mobileCategories")}
                >
                  Category
                </Accordion.Header>
                <Accordion.Body className="custom-accordion-body">
                  {filterLoading ? (
                    <div className="text-center py-2">
                      <l-dot-pulse
                        size="30"
                        speed="1.5"
                        color="#b71a18"
                      ></l-dot-pulse>
                    </div>
                  ) : (
                    <Form.Group>
                      {expandedFilters.mobileCategories &&
                      filterData.categoryList &&
                      filterData.categoryList.length > 15 ? (
                        <VirtualizedFilterList
                          items={filterData.categoryList}
                          selectedItems={selectedFilters.categories}
                          onItemSelect={(id) =>
                            handleFilterChange("categories", id)
                          }
                        />
                      ) : (
                        filterData.categoryList &&
                        filterData.categoryList.map((category, index) => (
                          <Form.Check
                            key={index}
                            type="checkbox"
                            label={category.category_name}
                            checked={selectedFilters.categories.includes(
                              category.id
                            )}
                            onChange={() =>
                              handleFilterChange("categories", category.id)
                            }
                          />
                        ))
                      )}
                    </Form.Group>
                  )}
                </Accordion.Body>
              </Accordion.Item>

              {/* Study Mode Filter */}
              <Accordion.Item eventKey="6">
                <Accordion.Header className="custom-accordion-header">
                  Study Mode
                </Accordion.Header>
                <Accordion.Body className="custom-accordion-body">
                  <Form.Group>
                    {filterData.studyModeListing &&
                    filterData.studyModeListing.length > 0 ? (
                      filterData.studyModeListing.map((mode, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={mode.studyMode_name}
                          checked={selectedFilters.studyModes.includes(mode.id)}
                          onChange={() =>
                            handleFilterChange("studyModes", mode.id)
                          }
                        />
                      ))
                    ) : (
                      <p className="text-muted">No study modes available</p>
                    )}
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              {/* Intake Filter */}
              <Accordion.Item eventKey="7">
                <Accordion.Header className="custom-accordion-header">
                  Intakes
                </Accordion.Header>
                <Accordion.Body className="custom-accordion-body">
                  <Form.Group>
                    {filterData.intakeList &&
                    filterData.intakeList.length > 0 ? (
                      filterData.intakeList.map((intake, index) => (
                        <Form.Check
                          key={index}
                          type="checkbox"
                          label={intake.month}
                          checked={selectedFilters.intakes.includes(
                            intake.month
                          )}
                          onChange={() =>
                            handleFilterChange("intakes", intake.month)
                          }
                        />
                      ))
                    ) : (
                      <p className="text-muted">No intakes available</p>
                    )}
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>

              {/* Tuition Fee Filter */}
              <Accordion.Item eventKey="8">
                <Accordion.Header className="custom-accordion-header">
                  Tuition Fee
                </Accordion.Header>
                <Accordion.Body className="custom-accordion-body">
                  <Form.Group>
                    <Form.Label className="mb-3">
                      Range: RM{selectedFilters.tuitionFee || 0}
                    </Form.Label>
                    <Form.Control
                      type="range"
                      className="custom-range"
                      min={0}
                      max={filterData.maxAmount || 100000}
                      step={500}
                      value={selectedFilters.tuitionFee || 0}
                      onChange={(e) =>
                        handleFilterChange("tuitionFee", Number(e.target.value))
                      }
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <small>RM0</small>
                      <small>RM{filterData.maxAmount || 100000}</small>
                    </div>
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="mobile-filter-buttons">
            <button
              onClick={() => {
                resetFilters();
                setShowMobileFilters(false);
              }}
              className="mobile-reset-button"
            >
              Reset Filters
            </button>
            <button
              onClick={() => {
                fetchCourses();
                setShowMobileFilters(false);
              }}
              className="mobile-apply-button"
            >
              Apply Filters
            </button>
          </div>
        </div>
        {/* Main Content */}
        <Container className="my-5">
          <Row>
            {/* Left Sidebar - Filters */}
            <Col
              md={3}
              className="location-container d-none d-md-block"
              style={{ backgroundColor: "white", padding: "10px" }}
            >
              {/* Desktop Filters */}
              <div className="filters-container">
                {/* Replace existing filter sections with optimized versions */}
                {renderFilterSection(
                  "Location",
                  "locations",
                  filterData.state || [],
                  selectedFilters.locations,
                  (id) => handleFilterChange("locations", id)
                )}

                {renderFilterSection(
                  "Category",
                  "categories",
                  filterData.categoryList || [],
                  selectedFilters.categories,
                  (id) => handleFilterChange("categories", id)
                )}

                {renderFilterSection(
                  "Intakes",
                  "intakes",
                  filterData.intakeList || [],
                  selectedFilters.intakes,
                  (month) => handleFilterChange("intakes", month)
                )}

                {renderFilterSection(
                  "Study Mode",
                  "studyModes",
                  filterData.studyModeListing || [],
                  selectedFilters.studyModes,
                  (id) => handleFilterChange("studyModes", id)
                )}

                {/* Tuition Fee Filter - Keep as is */}
                <div className="filter-group">
                  <h5 style={{ marginTop: "25px" }}>Tuition Fee</h5>
                  <Form.Group id="customRange1">
                    <Form.Label className="custom-range-label d-flex justify-content-between">
                      <span>Current: RM{selectedFilters.tuitionFee}</span>
                    </Form.Label>
                    <Form.Control
                      className="custom-range-input"
                      type="range"
                      min={0}
                      max={filterData.maxAmount || 100000}
                      step="500"
                      value={selectedFilters.tuitionFee}
                      onChange={(e) =>
                        handleFilterChange("tuitionFee", Number(e.target.value))
                      }
                    />
                    <div className="d-flex justify-content-between mt-2">
                      <small>RM0</small>
                      <small>RM{filterData.maxAmount || 100000}</small>
                    </div>
                  </Form.Group>
                </div>
              </div>
            </Col>

            {/* Right Content - Course Listings */}
            <Col xs={12} md={9} className="degreeprograms-division">
              <div className="mb-5">{renderAdImages(adsImageA, StudyPal)}</div>

              {loading ? (
                <div>
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="card mb-4 degree-card py-4">
                      <div className="card-body d-flex flex-column flex-md-row align-items-start">
                        <Row className="coursepage-row w-100">
                          <Col md={6} lg={6} className="course-card-ipad">
                            <div className="card-image mb-3 mb-md-0">
                              <Placeholder as="h5" animation="glow">
                                <Placeholder xs={10} />
                              </Placeholder>

                              <div className="coursepage-searchcourse-courselist-first">
                                <div className="coursepage-img">
                                  <Placeholder animation="glow">
                                    <Placeholder
                                      xs={12}
                                      style={{
                                        height: "100px",
                                        width: "100px",
                                      }}
                                    />
                                  </Placeholder>
                                </div>
                                <div className="searchcourse-coursename-schoolname">
                                  <div>
                                    <Placeholder as="h5" animation="glow">
                                      <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder animation="glow">
                                      <Placeholder xs={6} />
                                    </Placeholder>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={6} lg={6} className="course-card-fee-ipad">
                            <div className="d-flex flex-grow-1 coursepage-searchcourse-courselist-second">
                              <div className="details-div">
                                <div className="flex-wrap coursepage-info-one">
                                  <Col>
                                    <div>
                                      <Row>
                                        <Placeholder animation="glow">
                                          <Placeholder
                                            xs={8}
                                            className="mb-2"
                                          />
                                          <Placeholder
                                            xs={7}
                                            className="mb-2"
                                          />
                                          <Placeholder
                                            xs={6}
                                            className="mb-2"
                                          />
                                          <Placeholder
                                            xs={9}
                                            className="mb-2"
                                          />
                                        </Placeholder>
                                      </Row>
                                    </div>
                                  </Col>
                                </div>
                              </div>
                              <div className="fee-apply">
                                <div
                                  className="fee-info text-right"
                                  style={{ marginTop: "25px" }}
                                >
                                  <Placeholder animation="glow">
                                    <Placeholder xs={6} />
                                    <Placeholder xs={4} />
                                  </Placeholder>
                                </div>
                                <div className="d-flex interest-division">
                                  <div className="apply-button w-50">
                                    <button
                                      className="btn btn-danger featured coursepage-applybutton p-3"
                                      disabled
                                      style={{
                                        opacity: 0.65,
                                        cursor: "not-allowed",
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #B71A18",
                                      }}
                                    ></button>
                                  </div>
                                  <div className="apply-button w-50">
                                    <button
                                      className="btn btn-danger featured coursepage-applybutton p-3"
                                      disabled
                                      style={{
                                        opacity: 0.65,
                                        cursor: "not-allowed",
                                        backgroundColor: "#B71A18",
                                        borderColor: "#B71A18",
                                      }}
                                    ></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-danger">
                  <p>Error: {error}</p>
                </div>
              ) : programs.length === 0 ? (
                <div className="blankslate-courses text-center mx-auto col-11 col-md-8 col-lg-6">
                  <img
                    loading="lazy"
                    className="blankslate-courses-top-img"
                    src={emptyStateImage}
                    alt="Empty State"
                  />
                  <div className="blankslate-courses-body text-md-left mt-3 mt-md-0 ml-md-0">
                    <h4 className="h5 h4-md">No programs found</h4>
                    <p className="mb-0 d-none d-md-block">
                      There are no programs that match your selected filters. Please try
                      adjusting your filters and search criteria.
                    </p>
                    <p className="mb-0 d-block d-md-none">
                      No results match your filters. Try adjusting your search criteria.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* First 3 programs */}
                  {programs.slice(0, 3).map((program, index) => (
                    <React.Fragment key={program.id}>
                      <div
                        className="card mb-4 degree-card"
                        style={{ position: "relative", height: "auto" }}
                      >
                        {program.featured && <div className="featured-badge">Featured</div>}
                        <div className="card-body d-flex flex-column flex-md-row align-items-start">
                          <Row className="coursepage-row">
                            <Col md={6} lg={6} className="course-card-ipad">
                              <div className="card-image mb-3 mb-md-0">
                                <h5 className="card-title">
                                  <Link
                                    rel="preload"
                                    to={`/course-details/${program.school_name
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}/${program.name
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}`}
                                    style={{ color: "black" }}
                                    onClick={() =>
                                      sessionStorage.setItem("courseId", program.id)
                                    }
                                  >
                                    {program.name}
                                  </Link>
                                </h5>

                                <div className="coursepage-searchcourse-courselist-first">
                                  <div
                                    className="coursepage-img"
                                    style={{
                                      paddingLeft: "0", // Remove left padding
                                      display: "flex",
                                      justifyContent: "center", // Center the logo
                                      alignItems: "center", // Center vertically if needed
                                      flexDirection: "column", // Stack items vertically
                                    }}
                                  >
                                    <Link
                                      rel="preload"
                                      to={`/university-details/${program.school_name
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}`}
                                      style={{ color: "black" }}
                                      onClick={() =>
                                        sessionStorage.setItem("schoolId", program.school_id)
                                      }
                                    >
                                      <div className="image-container">
                                        <img
                                          loading="lazy"
                                          src={`${baseURL}storage/${program.logo}`}
                                          alt={program.school_name}
                                          width="100"
                                          className="coursepage-img-size"
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="searchcourse-coursename-schoolname">
                                    <div>
                                      <Link
                                        rel="preload"
                                        to={`/university-details/${program.school_name
                                          .replace(/\s+/g, "-")
                                          .toLowerCase()}`}
                                        style={{ color: "black" }}
                                        onClick={() =>
                                          sessionStorage.setItem(
                                            "schoolId",
                                            program.school_id
                                          )
                                        }
                                      >
                                        <h5 className="card-text">{program.school_name}</h5>
                                      </Link>

                                      <i
                                        className="bi bi-geo-alt"
                                        style={{ marginRight: "10px", color: "#AAAAAA" }}
                                      ></i>
                                      <span>
                                        {program.state || "N/A"}, {program.country || "N/A"}
                                      </span>
                                    </div>
                                    <div>
                                      <a
                                        href={program.school_location}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Click and view on map
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md={6} lg={6} className="course-card-fee-ipad">
                              <div className="d-flex flex-grow-1 coursepage-searchcourse-courselist-second">
                                <div className="details-div">
                                  <div className="flex-wrap coursepage-info-one">
                                    <Col>
                                      <div>
                                        <div>
                                          {" "}
                                          {/* Align to bottom on iPad */}
                                          <Row>
                                            <div className="searchcourse-dflex-center">
                                              <i
                                                className="bi bi-mortarboard"
                                                style={{ marginRight: "10px" }}
                                              ></i>
                                              <p style={{ paddingLeft: "20px" }}>
                                                {program.qualification}
                                              </p>
                                            </div>
                                            <div
                                              style={{ marginTop: "10px" }}
                                              className="searchcourse-dflex-center"
                                            >
                                              <i
                                                className="bi bi-calendar-check"
                                                style={{ marginRight: "10px" }}
                                              ></i>
                                              <p style={{ paddingLeft: "20px" }}>
                                                {program.mode}
                                              </p>
                                            </div>
                                            <div
                                              style={{ marginTop: "10px" }}
                                              className="searchcourse-dflex-center"
                                            >
                                              <i
                                                className="bi bi-clock"
                                                style={{ marginRight: "10px" }}
                                              ></i>
                                              <p style={{ paddingLeft: "20px" }}>
                                                {program.period}
                                              </p>
                                            </div>
                                            <div
                                              style={{ marginTop: "5px" }} // Reduced margin
                                              className="searchcourse-dflex-center"
                                            >
                                              <i
                                                className="bi bi-calendar2-week"
                                                style={{ marginRight: "5px" }} // Reduced margin
                                              ></i>
                                              <p
                                                style={{
                                                  paddingLeft: "10px", // Reduced padding
                                                  margin: 0,
                                                  whiteSpace: "normal",
                                                  wordBreak: "keep-all",
                                                  overflowWrap: "break-word",
                                                  display: "inline-block",
                                                  width: "calc(100% - 30px)", // Adjusted width
                                                }}
                                              >
                                                {Array.isArray(program.intake)
                                                  ? program.intake
                                                      .map((intake) => intake.trim())
                                                      .join(", ")
                                                  : "N/A"}
                                              </p>
                                            </div>
                                          </Row>
                                        </div>
                                      </div>
                                    </Col>
                                  </div>
                                </div>
                                <div className="fee-apply">
                                  <div
                                    className="fee-info text-right"
                                    style={{ marginTop: "25px" }}
                                  >
                                    <p
                                      style={{ fontSize: "14px" }}
                                      className="coursepage-estimatefee"
                                    >
                                      estimate fee
                                      <p style={{ fontSize: "16px" }}>
                                        {program.international_cost &&
                                        program.country_code !== fetchedCountry ? (
                                          program.international_cost === "0" ? (
                                            program.cost === "0" || program.cost === "RM0" ? (
                                              "N/A"
                                            ) : (
                                              <>
                                                <strong>
                                                  {sessionStorage.getItem(
                                                    "userCurrencySymbol"
                                                  ) || "RM"}
                                                </strong>
                                                {convertToFetchedCurrency(
                                                  program.cost
                                                ).replace(/^.*?(\d+.*)/, "$1")}
                                              </>
                                            )
                                          ) : (
                                            <>
                                              <strong>
                                                {sessionStorage.getItem(
                                                  "userCurrencySymbol"
                                                ) || "RM"}
                                              </strong>
                                              {convertToFetchedCurrency(
                                                program.international_cost
                                              ).replace(/^.*?(\d+.*)/, "$1")}
                                            </>
                                          )
                                        ) : program.cost === "0" || program.cost === "RM0" ? (
                                          "N/A"
                                        ) : (
                                          <>
                                            <strong>
                                              {sessionStorage.getItem("userCurrencySymbol") ||
                                                "RM"}
                                            </strong>
                                            {convertToFetchedCurrency(program.cost).replace(
                                              /^.*?(\d+.*)/,
                                              "$1"
                                            )}
                                          </>
                                        )}
                                      </p>
                                    </p>
                                  </div>
                                  <div className="d-flex interest-division">
                                    <div className="interest">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleInterestClick(program.id);
                                        }}
                                        className="interest-button"
                                        aria-label={
                                          courseInterests[program.id]?.status === 1
                                            ? "Remove from interests"
                                            : "Add to interests"
                                        }
                                      >
                                        <span style={{ fontSize: "16px" }}>
                                          {courseInterests[program.id]?.status === 1
                                            ? "Favourite"
                                            : "Favourite"}
                                        </span>
                                        <i
                                          className={
                                            courseInterests[program.id]?.status === 1
                                              ? "bi bi-heart-fill"
                                              : "bi bi-heart"
                                          }
                                        ></i>
                                      </button>
                                    </div>
                                    <div className="apply-button">
                                      {program.institute_category === "Local University" ? (
                                        <button
                                          onClick={() =>
                                            (window.location.href = `mailto:${program.email}`)
                                          }
                                          className="featured coursepage-applybutton">
                                          Contact Now
                                        </button>
                                      ) : (
                                        <button
                                          className="featured coursepage-applybutton"
                                          onClick={() => handleApplyNow(program)}
                                        >
                                          Apply Now
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  
                  {/* Advertisement after first 3 programs */}
                  {programs.length > 3 && (
                    <div className="my-5">
                      {renderAdImages(adsImageB, StudyPal)}
                    </div>
                  )}
                  
                  {/* Remaining programs */}
                  {programs.slice(3).map((program, index) => (
                    <React.Fragment key={program.id}>
                      <div
                        className="card mb-4 degree-card"
                        style={{ position: "relative", height: "auto" }}
                      >
                        {program.featured && <div className="featured-badge">Featured</div>}
                        <div className="card-body d-flex flex-column flex-md-row align-items-start">
                          <Row className="coursepage-row">
                            <Col md={6} lg={6} className="course-card-ipad">
                              <div className="card-image mb-3 mb-md-0">
                                <h5 className="card-title">
                                  <Link
                                    rel="preload"
                                    to={`/course-details/${program.school_name
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}/${program.name
                                      .replace(/\s+/g, "-")
                                      .toLowerCase()}`}
                                    style={{ color: "black" }}
                                    onClick={() =>
                                      sessionStorage.setItem("courseId", program.id)
                                    }
                                  >
                                    {program.name}
                                  </Link>
                                </h5>

                                <div className="coursepage-searchcourse-courselist-first">
                                  <div
                                    className="coursepage-img"
                                    style={{
                                      paddingLeft: "0", // Remove left padding
                                      display: "flex",
                                      justifyContent: "center", // Center the logo
                                      alignItems: "center", // Center vertically if needed
                                      flexDirection: "column", // Stack items vertically
                                    }}
                                  >
                                    <Link
                                      rel="preload"
                                      to={`/university-details/${program.school_name
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}`}
                                      style={{ color: "black" }}
                                      onClick={() =>
                                        sessionStorage.setItem("schoolId", program.school_id)
                                      }
                                    >
                                      <div className="image-container">
                                        <img
                                          loading="lazy"
                                          src={`${baseURL}storage/${program.logo}`}
                                          alt={program.school_name}
                                          width="100"
                                          className="coursepage-img-size"
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="searchcourse-coursename-schoolname">
                                    <div>
                                      <Link
                                        rel="preload"
                                        to={`/university-details/${program.school_name
                                          .replace(/\s+/g, "-")
                                          .toLowerCase()}`}
                                        style={{ color: "black" }}
                                        onClick={() =>
                                          sessionStorage.setItem(
                                            "schoolId",
                                            program.school_id
                                          )
                                        }
                                      >
                                        <h5 className="card-text">{program.school_name}</h5>
                                      </Link>

                                      <i
                                        className="bi bi-geo-alt"
                                        style={{ marginRight: "10px", color: "#AAAAAA" }}
                                      ></i>
                                      <span>
                                        {program.state || "N/A"}, {program.country || "N/A"}
                                      </span>
                                    </div>
                                    <div>
                                      <a
                                        href={program.school_location}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Click and view on map
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md={6} lg={6} className="course-card-fee-ipad">
                              <div className="d-flex flex-grow-1 coursepage-searchcourse-courselist-second">
                                <div className="details-div">
                                  <div className="flex-wrap coursepage-info-one">
                                    <Col>
                                      <div>
                                        <div>
                                          {" "}
                                          {/* Align to bottom on iPad */}
                                          <Row>
                                            <div className="searchcourse-dflex-center">
                                              <i
                                                className="bi bi-mortarboard"
                                                style={{ marginRight: "10px" }}
                                              ></i>
                                              <p style={{ paddingLeft: "20px" }}>
                                                {program.qualification}
                                              </p>
                                            </div>
                                            <div
                                              style={{ marginTop: "10px" }}
                                              className="searchcourse-dflex-center"
                                            >
                                              <i
                                                className="bi bi-calendar-check"
                                                style={{ marginRight: "10px" }}
                                              ></i>
                                              <p style={{ paddingLeft: "20px" }}>
                                                {program.mode}
                                              </p>
                                            </div>
                                            <div
                                              style={{ marginTop: "10px" }}
                                              className="searchcourse-dflex-center"
                                            >
                                              <i
                                                className="bi bi-clock"
                                                style={{ marginRight: "10px" }}
                                              ></i>
                                              <p style={{ paddingLeft: "20px" }}>
                                                {program.period}
                                              </p>
                                            </div>
                                            <div
                                              style={{ marginTop: "5px" }} // Reduced margin
                                              className="searchcourse-dflex-center"
                                            >
                                              <i
                                                className="bi bi-calendar2-week"
                                                style={{ marginRight: "5px" }} // Reduced margin
                                              ></i>
                                              <p
                                                style={{
                                                  paddingLeft: "10px", // Reduced padding
                                                  margin: 0,
                                                  whiteSpace: "normal",
                                                  wordBreak: "keep-all",
                                                  overflowWrap: "break-word",
                                                  display: "inline-block",
                                                  width: "calc(100% - 30px)", // Adjusted width
                                                }}
                                              >
                                                {Array.isArray(program.intake)
                                                  ? program.intake
                                                      .map((intake) => intake.trim())
                                                      .join(", ")
                                                  : "N/A"}
                                              </p>
                                            </div>
                                          </Row>
                                        </div>
                                      </div>
                                    </Col>
                                  </div>
                                </div>
                                <div className="fee-apply">
                                  <div
                                    className="fee-info text-right"
                                    style={{ marginTop: "25px" }}
                                  >
                                    <p
                                      style={{ fontSize: "14px" }}
                                      className="coursepage-estimatefee"
                                    >
                                      estimate fee
                                      <p style={{ fontSize: "16px" }}>
                                        {program.international_cost &&
                                        program.country_code !== fetchedCountry ? (
                                          program.international_cost === "0" ? (
                                            program.cost === "0" || program.cost === "RM0" ? (
                                              "N/A"
                                            ) : (
                                              <>
                                                <strong>
                                                  {sessionStorage.getItem(
                                                    "userCurrencySymbol"
                                                  ) || "RM"}
                                                </strong>
                                                {convertToFetchedCurrency(
                                                  program.cost
                                                ).replace(/^.*?(\d+.*)/, "$1")}
                                              </>
                                            )
                                          ) : (
                                            <>
                                              <strong>
                                                {sessionStorage.getItem(
                                                  "userCurrencySymbol"
                                                ) || "RM"}
                                              </strong>
                                              {convertToFetchedCurrency(
                                                program.international_cost
                                              ).replace(/^.*?(\d+.*)/, "$1")}
                                            </>
                                          )
                                        ) : program.cost === "0" || program.cost === "RM0" ? (
                                          "N/A"
                                        ) : (
                                          <>
                                            <strong>
                                              {sessionStorage.getItem("userCurrencySymbol") ||
                                                "RM"}
                                            </strong>
                                            {convertToFetchedCurrency(program.cost).replace(
                                              /^.*?(\d+.*)/,
                                              "$1"
                                            )}
                                          </>
                                        )}
                                      </p>
                                    </p>
                                  </div>
                                  <div className="d-flex interest-division">
                                    <div className="interest">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleInterestClick(program.id);
                                        }}
                                        className="interest-button"
                                        aria-label={
                                          courseInterests[program.id]?.status === 1
                                            ? "Remove from interests"
                                            : "Add to interests"
                                        }
                                      >
                                        <span style={{ fontSize: "16px" }}>
                                          {courseInterests[program.id]?.status === 1
                                            ? "Favourite"
                                            : "Favourite"}
                                        </span>
                                        <i
                                          className={
                                            courseInterests[program.id]?.status === 1
                                              ? "bi bi-heart-fill"
                                              : "bi bi-heart"
                                          }
                                        ></i>
                                      </button>
                                    </div>
                                    <div className="apply-button">
                                      {program.institute_category === "Local University" ? (
                                        <button
                                          onClick={() =>
                                            (window.location.href = `mailto:${program.email}`)
                                          }
                                          className="featured coursepage-applybutton">
                                          Contact Now
                                        </button>
                                      ) : (
                                        <button
                                          className="featured coursepage-applybutton"
                                          onClick={() => handleApplyNow(program)}
                                        >
                                          Apply Now
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </>
              )}
            </Col>
            {/* Pagination */}
            {programs.length > 0 && (
              <Pagination className="pagination-custom">
                <Pagination.Prev
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  <span aria-hidden="true">&laquo;</span>
                </Pagination.Prev>
                {/* First page */}
                <Pagination.Item
                  active={1 === currentPage}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </Pagination.Item>
                {/* Show dots if current page is more than 3 */}
                {currentPage > 3 && <Pagination.Ellipsis />}
                {/* Pages around current page */}
                {[...Array(totalPages)]
                  .map((_, index) => {
                    const pageNumber = index + 1;
                    // Only show pages around current page
                    if (
                      pageNumber !== 1 && // Skip first page as it's already shown
                      pageNumber !== totalPages && // Skip last page as it will be shown separately
                      pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1
                    ) {
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    }
                    return null;
                  })
                  .filter(Boolean)}{" "}
                {/* Remove null values */}
                {/* Show dots if there are more pages */}
                {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                {/* Last page */}
                {totalPages > 1 && (
                  <Pagination.Item
                    active={totalPages === currentPage}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Pagination.Item>
                )}
                <Pagination.Next
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                >
                  <span aria-hidden="true">&raquo;</span>
                </Pagination.Next>
              </Pagination>
            )}
          </Row>
        </Container>
      </div>
      {/* Add this backdrop component */}
      {showMobileFilters && (
        <div
          className="mobile-filters-backdrop show"
          onClick={() => setShowMobileFilters(false)}
        ></div>
      )}
    </Container>
  );
};

export default React.memo(SearchCourse);
