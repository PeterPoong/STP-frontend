import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Home from './Pages/StudentPages/Home';
import KnowMore from './Pages/StudentPages/KnowMore';
import ApplyNow from './Pages/StudentPages/ApplyNow';
import NavButtons from './Components/StudentComp/NavButtons';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoSlide from './Components/StudentComp/VideoSlide';
import Footer from './Components/StudentComp/Footer'; // Update to correct path
import Courses from './Pages/StudentPages/CoursesPage';
import StudentPortalLogin from './Pages/StudentPortalPages/StudentPortalLogin'
// Import Admin Pages
import AdminSignup from './Pages/AdminPages/AdminSignup';
import AdminLogin from './Pages/AdminPages/AdminLogin';
import AdminAddSchoolContent from './Pages/AdminPages/AdminAddSchool';
import AdminEditSchool from './Pages/AdminPages/AdminEditSchool'; // Update to correct path

function App() {
  const style = {
    backgroundColor: '#f0f0f0',
    height: '100vh',
    margin: 0,
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/knowMoreInstitute/:id" element={<KnowMore />} />
            <Route path="/applynow" element={<ApplyNow />} />
            <Route path="/courseDetailsPage/:id" element={<CourseDetailsPage />} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/school" element={<div>School Page</div>} />
            <Route path="/student" element={<div>Student Page</div>} />
            <Route path="/register" element={<div>Register Page</div>} />
            <Route path="/videoslide" element={<VideoSlide />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/institute" element={<div>InstitutePage</div>} />
            <Route path="/applycourse" element={<ApplyForm />} />
            <Route path="/personaldetails" element={<div>PersonalDetails</div>} />
            <Route path="/StudentPortallogin" element={<StudentPortalLogin />} />
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
  );
}

export default App;
