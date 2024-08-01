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

function App() {
  const style = {
    backgroundColor: "#f0f0f0", // For solid color
    // background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // For gradient
    // backgroundImage: 'url(path/to/your/image.jpg)', // For background image
    height: "100vh", // Ensures it covers the full viewport height
    margin: 0,
  };
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/knowmore" element={<KnowMore />} />
            <Route path="/applynow" element={<ApplyNow />} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/school" element={<div>School Page</div>} />
            <Route path="/student" element={<div>Student Page</div>} />
            <Route path="/register" element={<div>Register Page</div>} />
            <Route path="/videoslide" element={<VideoSlide />} />
            <Route path="/courses" element={<div>CoursesPage</div>} />
            <Route path="/institute" element={<div>InstitutePage</div>} />
            <Route
              path="/knowmoreinstitute"
              element={<div>KnowMoreInstitute</div>}
            />
            <Route path="/applycourse" element={<div>ApplyForm </div>} />
            <Route
              path="/personaldetails"
              element={<div>PersonalDetails </div>}
            />
          </Routes>
        </main>
        <Footer /> {/* Add the Footer component */}
      </div>
    </Router>
  );
}

export default App;
<Route path="/videoslide" element={<VideoSlide />} />;
