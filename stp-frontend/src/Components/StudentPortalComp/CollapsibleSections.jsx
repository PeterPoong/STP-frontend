import React, { useState, useMemo } from 'react';
import Collapsible from 'react-collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../../Context/TranslationContext';

import AcademicTranscript from "../../Components/StudentPortalComp/Transcript/AcademicTranscript";
import CoCurriculum from "../../Components/StudentPortalComp/Transcript/CoCurriculum";
import Achievements from '../../Components/StudentPortalComp/Transcript/Achievements';
import OtherCertDoc from '../../Components/StudentPortalComp/Transcript/OtherCertDoc';
import "../../css/StudentPortalStyles/StudentPortalBasicInformation.css";

const CollapsibleSections = () => {
  const [openSections, setOpenSections] = useState({
    academic: false,
    coCurriculum: false,
    achievements: false,
    otherCertificates: false
  });

  const [loadedSections, setLoadedSections] = useState({
    academic: false,
    coCurriculum: false,
    achievements: false,
    otherCertificates: false
  });

  const { currentLanguage } = useTranslation();

  const handleTriggerClick = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    // Mark the section as loaded when it's opened for the first time
    if (!loadedSections[section]) {
      setLoadedSections(prev => ({ ...prev, [section]: true }));
    }
  };

  // Memoize content to prevent unnecessary re-renders
  const sectionContents = useMemo(() => ({
    academic: loadedSections.academic ? <AcademicTranscript key={`academic-${currentLanguage}`} /> : null,
    coCurriculum: loadedSections.coCurriculum ? <CoCurriculum key={`cocurriculum-${currentLanguage}`} /> : null,
    achievements: loadedSections.achievements ? <Achievements key={`achievements-${currentLanguage}`} /> : null,
    otherCertificates: loadedSections.otherCertificates ? <OtherCertDoc key={`othercert-${currentLanguage}`} /> : null
  }), [currentLanguage, loadedSections]);

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
      <h4 className="mb-3 title-widget">Transcript</h4>
      <div className="collapsible-sections">
        {renderCollapsible("Academic Transcript", sectionContents.academic, "academic")}
        {renderCollapsible("Co-Curriculum", sectionContents.coCurriculum, "coCurriculum")}
        {renderCollapsible("Achievements", sectionContents.achievements, "achievements")}
        {renderCollapsible("Other Certificates / Documents", sectionContents.otherCertificates, "otherCertificates")}
      </div>
    </div>
  );
};

export default CollapsibleSections;