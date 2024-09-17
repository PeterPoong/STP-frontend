import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AcademicTranscript from "../../Components/StudentPortalComp/Transcript/AcademicTranscript";
import CoCurriculum from "../../Components/StudentPortalComp/Transcript/CoCurriculum";
import Achievements from '../../Components/StudentPortalComp/Transcript/Achievements';
import OtherCertDoc from '../../Components/StudentPortalComp/Transcript/OtherCertDoc'
import "../../css/StudentPortalStyles/StudentPortalBasicInformation.css";

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
          {openSections[section] ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
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
        {renderCollapsible("Co-Curriculum", <CoCurriculum/>, "coCurriculum")}
        {renderCollapsible("Achievements", <Achievements/>, "achievements")}
        {renderCollapsible("Other Certificates / Documents", <OtherCertDoc/>, "otherCertificates")}
      </div>
    </div>
  );
};

export default CollapsibleSections;