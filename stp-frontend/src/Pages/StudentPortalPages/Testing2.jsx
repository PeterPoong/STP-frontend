// Testing2.jsx
import React, { useState } from 'react';
import '../../css/StudentPortalStyles/Testing2.css';
import Testing from "../../assets/StudentPortalAssets/Testing.png"
import CheckCircle from "../../assets/StudentPortalAssets/checkCircle.svg"
const Testing2 = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [phoneContent, setPhoneContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const noteContents = [
    {
      id: 1,
      name: "John Doe",
      phone: "555-0123",
      notes: "Remember to follow up about the project proposal"
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "555-4567",
      notes: "Schedule team meeting for next Tuesday"
    },
    {
      id: 3,
      name: "Mike Johnson",
      phone: "555-8901",
      notes: "Review quarterly report draft"
    }
  ];

  const features = [
    "Access to school portal",
    "Editable school details",
    "Access student basic information",
    "Able to view SPM, STPM exam results",
    "Access & Accept application details",
    "Managing courses details"
  ];

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', JSON.stringify(noteContents[currentPage]));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    setPhoneContent(`${data.name}\n${data.phone}\n${data.notes}`);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNextPage = (e) => {
    e.stopPropagation();
    if (currentPage < noteContents.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = (e) => {
    e.stopPropagation();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="Testing-Container-Overall">
        <div className="Testing-Container-One">
          <h1 className="">MORE PACKAGE</h1>
          <h5>HOW TO GET STARTED:</h5>
          <ol>
            <li>SELECT YOUR PACKAGE</li>
            <li>ADD PREMIUM FEATURE</li>
            <li>REVIEW SUMMARY</li>
            <li>CONTACT OUR TEAM</li>
          </ol>
        </div>
        <div className="Testing-Container-Two">
          <div className="Testing-Container-Card" >
            <p className="Testing-Container-Package-Title">Bacic Package</p>
            <p>RM250.00 <span>/month</span></p>
            <p className="Testing-Container-Features-Title">Features</p>
            <div className="Testing-Container-Card-Features-Container">
              {features.map((feature, index) => (
                <div key={index} className="Testing-Container-Card-Features">
                  <i className="bi bi-check-circle-fill text-[#BA1718]"></i>
                  <p className="m-0">{feature}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
    /* <div id="all">
       <div
         id="page-flip"
         onClick={() => setIsHovered(true)}
 
         //onMouseEnter={() => setIsHovered(true)}
         //onMouseLeave={() => setIsHovered(false)}
         className={isHovered ? 'hovered' : ''}
       >
         <div id="r1">
           <div id="p1">
             <div>
               <div></div>
             </div>
           </div>
         </div>
         <div id="p2">
         <div>
 
         </div>
         </div>
         <div id="r3">
           <div id="p3">
             <div>
             </div>
           </div>
         </div>
         <div className="s">
           <div id="s3">
             <div id="sp3"></div>
           </div>
         </div>
         <div className="s" id="s4">
           <div id="s2">
             <div id="sp2"></div>
           </div>
         </div>
 
         <div 
           className={`phone-container ${isDragging ? 'drag-over' : ''}`}
           onDrop={handleDrop}
           onDragOver={handleDragOver}
         >
           <div className="phone-screen">
             {phoneContent ? (
               <div className="phone-content">
                 <h4>Contact Info:</h4>
                 <pre>{phoneContent}</pre>
               </div>
             ) : (
               <div className="phone-placeholder">
                 <p>Drop note here to see contact details</p>
               </div>
             )}
           </div>
         </div>
       </div>
     </div>*/
  );
};

export default Testing2;