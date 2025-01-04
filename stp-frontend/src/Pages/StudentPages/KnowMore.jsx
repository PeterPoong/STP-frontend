import React, { useEffect } from "react";
import KnowMoreInstitute from "../../Components/StudentComp/InstitutePage/KnowMoreInstitute";

const KnowMore = () => {
  const id = sessionStorage.getItem("schoolId"); // Retrieve the id from session storage

  useEffect(() => {
    // Set the page title
    document.title = "StudyPal- University detail for student";

    // Set meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "The details of the course and university for the future student at studypal.my.";
    document.head.appendChild(metaDescription);

    // Clean up by removing the meta tag and schoolId when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
      sessionStorage.removeItem("schoolId"); // Clear schoolId from session storage
    };
  }, []);

  return (
    <div>
      <KnowMoreInstitute/>
    </div>
  );
};

export default KnowMore;
