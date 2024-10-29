import React, { useEffect } from "react";
import KnowMoreInstitute from "../../Components/StudentComp/InstitutePage/KnowMoreInstitute";

const KnowMore = () => {
  useEffect(() => {
    // Set the page title
    document.title = "StudyPal- University detail for student";

    // Set meta description
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "The details of the course and university for the future student at studypal.my.";
    document.head.appendChild(metaDescription);

    // Clean up by removing the meta tag when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);
  return (
    <div>
      <KnowMoreInstitute />
    </div>
  );
};

export default KnowMore;
