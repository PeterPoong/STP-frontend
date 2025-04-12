import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Pages/student pages/Home";
import KnowMore from "./Pages/student pages/KnowMore";
import ApplyNow from "./Pages/student pages/ApplyNow";
import NavButtons from "./Components/NavButtons";
import "bootstrap/dist/css/bootstrap.min.css";
// import VideoSlide from "../Components/VideoSlide";
import VideoSlide from "./Components/student components/VideoSlide";
import Footer from "./css/student css/Footer.css";
import Courses from "./Pages/student pages/CoursesPage";
import ApplyForm from "./Pages/student pages/ApplyForm";
import courseDetails from "./Pages/student pages/courseDetails";
import NavigationBar from "./Components/StudentPortalComp/NavButtonsSP";
// Import Admin Pages
import AdminSignup from "./Pages/AdminSignup";
import AdminLogin from "./Pages/AdminLogin";
import AdminAddSchoolContent from "./Pages/AdminAddSchoolContent";
import AdminEditSchool from './path/to/AdminEditSchool';

import { TranslationProvider } from './Context/TranslationContext';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  const style = {
    backgroundColor: "#f0f0f0", // For solid color
    // background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // For gradient
    // backgroundImage: 'url(path/to/your/image.jpg)', // For background image
    height: "100vh", // Ensures it covers the full viewport height
    margin: 0,
  };

  return (
    <SidebarProvider>
      <TranslationProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <NavigationBar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/knowMoreInstitute/:id" element={<KnowMore />} />
                <Route path="/applynow" element={<ApplyNow />} />
                <Route path="/courseDetails/:id" element={<courseDetails />} />
                <Route path="/course/:school_name/:course_name" element={<CourseDetailsPage />} />
                <Route path="/login" element={<div>Login Page</div>} />
                <Route path="/school" element={<div>School Page</div>} />
                <Route path="/student" element={<div>Student Page</div>} />
                <Route path="/register" element={<div>Register Page</div>} />
                <Route path="/videoslide" element={<VideoSlide />} />
                <Route path="/courses" element={<div>CoursesPage</div>} />
                <Route path="/institute" element={<div>InstitutePage</div>} />
                <Route path="/applycourse" element={<div>ApplyForm </div>} />
                <Route
                  path="/personaldetails"
                  element={<div>PersonalDetails </div>}
                />

                {/* Add Admin Routes */}
                <Route path="/adminSignup" element={<AdminSignup />} />
                <Route path="/adminLogin" element={<AdminLogin />} />
                <Route path="/adminAddSchool" element={<AdminAddSchoolContent />} />
                <Route path="/adminEditSchool/:id" element={<AdminEditSchool />} />
              </Routes>
            </main>
            <Footer /> {/* Add the Footer component */}
          </div>
        </Router>
      </TranslationProvider>
    </SidebarProvider>
  );
}

export default App;
