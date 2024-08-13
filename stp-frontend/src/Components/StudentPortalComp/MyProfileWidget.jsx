import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, ListGroup, Collapse } from 'react-bootstrap';
import { PlusCircle, MinusCircle } from 'react-feather';
import sampleprofile from "../../assets/StudentPortalAssets/sampleprofile.png";
import "../../css/StudentPortalCss/StudentPortalBasicInformation.css";

const MyProfileWidget = () => {
    const [isProfileExpanded, setIsProfileExpanded] = useState(false);
    const [isCoursesExpanded, setIsCoursesExpanded] = useState(false);
  
    return (
      <Card className="boxshadow">
        <Card.Body className="text-center p-4">
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: '#8a7be8', 
            margin: '0 auto 15px',
            position: 'relative'
          }}>
            <img 
              src={sampleprofile}
              alt="Profile" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'red',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '14px'
            }}>
              +
            </div>
          </div>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item 
            className="d-flex justify-content-between align-items-center"
            onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            style={{ cursor: 'pointer' }}
          >
            My Profile
            {isProfileExpanded ? 
              <MinusCircle size={16} color="red" /> : 
              <PlusCircle size={16} color="red" />
            }
          </ListGroup.Item>
          <Collapse in={isProfileExpanded}>
            <div>
              <ListGroup.Item className="ps-4">Basic Information</ListGroup.Item>
              <ListGroup.Item className="ps-4">Manage Password</ListGroup.Item>
            </div>
          </Collapse>
          
          <ListGroup.Item>Transcript</ListGroup.Item>
          
          <ListGroup.Item 
            className="d-flex justify-content-between align-items-center"
            onClick={() => setIsCoursesExpanded(!isCoursesExpanded)}
            style={{ cursor: 'pointer' }}
          >
            Applied Courses
            {isCoursesExpanded ? 
              <MinusCircle size={16} color="red" /> : 
              <PlusCircle size={16} color="red" />
            }
          </ListGroup.Item>
          <Collapse in={isCoursesExpanded}>
            <div>
              <ListGroup.Item className="ps-4">Pending</ListGroup.Item>
              <ListGroup.Item className="ps-4">History</ListGroup.Item>
            </div>
          </Collapse>
        </ListGroup>
      </Card>
    );
  };
  

export default MyProfileWidget;