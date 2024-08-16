import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { ChevronDown } from 'lucide-react';
import AcademicTranscript from "../../Components/StudentPortalComp/AcademicTranscript";

const CollapsibleSections = () => {
  const [openSections, setOpenSections] = useState({
    academic: false,
    coCurriculum: false,
    achievements: false,
    otherCertificates: false
  });

  const handleTriggerClick = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderCollapsible = (title, content, section) => (
    <Collapsible 
      trigger={
        <div className="d-flex justify-content-between align-items-center p-3">
          <span>{title}</span>
          <ChevronDown 
            size={20} 
            className={`transition-transform duration-300 ${openSections[section] ? 'rotate-180' : ''}`}
          />
        </div>
      } 
      className="mb-0 bg-white border"
      openedClassName="mb-3 bg-white border"
      triggerClassName="w-100 text-start"
      triggerOpenedClassName="w-100 text-start"
      onOpening={() => handleTriggerClick(section)}
      onClosing={() => handleTriggerClick(section)}
    >
      <div className="p-0">
        {content}
      </div>
    </Collapsible>
  );

  return (
    <div>
      <h4 className="mb-3 title-widget" >Transcript</h4>
      <div className="collapsible-sections">
        {renderCollapsible("Academic Transcript", <AcademicTranscript />, "academic")}
        {renderCollapsible("Co-Curriculum", <p>Co-Curriculum content goes here</p>, "coCurriculum")}
        {renderCollapsible("Achievements", <p>Achievements content goes here</p>, "achievements")}
        {renderCollapsible("Other Certificates / Documents", <p>Other Certificates / Documents content goes here</p>, "otherCertificates")}
      </div>
    </div>
  );
};

export default CollapsibleSections;