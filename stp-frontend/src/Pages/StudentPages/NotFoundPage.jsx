//library
import React from 'react';
import { Link } from "react-router-dom";

//componenet
import NavButtonsSP from "../../Components/StudentPortalComp/NavButtonsSP";
import SpcFooter from "../../Components/StudentPortalComp/SpcFooter";

//asset
import StudyPalLogo from "../../assets/StudentPortalAssets/StudyPalLogo.svg";

export default function NotFoundPage() {
  return (
    <div>
      <NavButtonsSP />
      <div className="flex flex-col text-center justify-center px-4 align-content-center w-100 h-100">
        <div className="text-center">
          {/*} <img
            src={StudyPalLogo}
            alt="StudyPal Logo"
            className="mx-auto mb-8 h-20"
          />*/}
          <h3
            className="text-9xl font-bold text-gray-900 mb-1"
            style={{ fontSize: "10rem" }}>
            404
          </h3>
          <h1 className="text-3xl font-semibold text-gray-800 mb-1 " style={{ color: "#B71A18" }}>
            Page Not Found
          </h1>

          <p >
            Oops! Looks like the page you are looking for doesn't exist.
            Don't worry, let's get you back on track!
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <button>
              Back to Home
            </button>

          </Link>
        </div>
      </div>
      <SpcFooter />
    </div>
  );
}