import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../css/StudentPortalStyles/OrbitingStarButton.css';

const OrbitingStarButton = ({ isActive }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions with extra width
    canvas.width = container.offsetWidth + 80; // Increased from 40 to 80
    canvas.height = container.offsetHeight;
    
    // Animation parameters
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Define colors
    const STAR_COLOR = '#CE181B'; // Brand red
    const TRAIL_COLOR_BASE = 'rgba(230, 80, 60, 0.5)'; // Lighter red for trail
    const SHADOW_COLOR = 'rgba(230, 80, 60, 0.7)'; // Brand red for shadow
    
    // Text dimensions (approximation)
    const textWidth = (width - 80) * 0.8; // Adjusted for the wider canvas
    const textHeight = height * 0.4;
    
    // Star properties
    const starRadius = 3;
    let angle = 0;
    let starRotation = 0; // Add rotation angle for the star itself
    const angleIncrement = 0.02;
    const starRotationSpeed = 0.03; // Control how fast the star rotates
    const orbitRadiusX = textWidth * 0.7; // Increased from 0.5 to 0.7 for wider orbit
    const orbitRadiusY = textHeight * 0.8;
    
    // Trail properties
    const trailLength = 50;
    const trailPositions = [];
    
    // Animation loop
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Calculate star position
      const x = centerX + Math.cos(angle) * orbitRadiusX;
      const y = centerY + Math.sin(angle) * orbitRadiusY;
      
      // Determine if star is in front or behind text
      const isFront = Math.sin(angle) > 0;
      
      // Update trail positions
      trailPositions.unshift({x, y, isFront});
      if (trailPositions.length > trailLength) {
        trailPositions.pop();
      }
      
      // Draw trail segments behind text
      ctx.save();
      for (let i = trailPositions.length - 1; i >= 0; i--) {
        const pos = trailPositions[i];
        if (!pos.isFront) {
          const alpha = 1 - (i / trailLength);
          ctx.fillStyle = TRAIL_COLOR_BASE + (alpha * 0.6) + ')';
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, starRadius * 0.8 * (1 - i/trailLength), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw trail segments in front of text
      for (let i = trailPositions.length - 1; i >= 0; i--) {
        const pos = trailPositions[i];
        if (pos.isFront) {
          const alpha = 1 - (i / trailLength);
          ctx.fillStyle = TRAIL_COLOR_BASE + (alpha * 0.6) + ')';
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, starRadius * 0.8 * (1 - i/trailLength), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      // Draw the star (5-pointed)
      ctx.shadowBlur = 8;
      ctx.shadowColor = SHADOW_COLOR;
      ctx.fillStyle = STAR_COLOR;
      
      // Draw a 5-pointed star instead of a circle
      const drawStar = (x, y, radius, rotation, innerRadius = radius/1.7) => {
        const points = 5;
        const outerRadius = radius;
        
        ctx.beginPath();
        
        // Calculate the first point with rotation
        ctx.moveTo(
          x + Math.sin(rotation) * outerRadius,
          y - Math.cos(rotation) * outerRadius
        );
        
        // Draw the 5 points of the star with rotation applied
        for (let i = 0; i < points * 2; i++) {
          // Alternate between inner and outer radius
          const r = (i % 2 === 0) ? innerRadius : outerRadius;
          const pointAngle = (Math.PI * (i + 1)) / points + rotation;
          
          ctx.lineTo(
            x + r * Math.sin(pointAngle),
            y - r * Math.cos(pointAngle)
          );
        }
        
        ctx.closePath();
      };
      
      // Draw the star with the calculated position and current rotation
      drawStar(x, y, starRadius * 2, starRotation);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Update angles
      angle += angleIncrement;
      starRotation += starRotationSpeed; // Update star rotation
      
      // Continue animation
      const animationId = requestAnimationFrame(animate);
      container.dataset.animationId = animationId;
    }
    
    // Start the animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = container.offsetWidth + 80; // Increased from 40 to 80
      canvas.height = container.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(parseInt(container.dataset.animationId || '0'));
    };
  }, []);
  
  // Render with tooltip
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="path-tooltip">RIASEC Career Assessment</Tooltip>}
      className="position-absolute"
    >
      <Link 
        to="/studentStudyPath" 
        className={`orbit-button-container ${isActive ? 'active' : ''}`}
      >
        <div ref={containerRef} className="container-orbit">
          <canvas ref={canvasRef}></canvas>
          <div className="text-overlay">
            <div className="text">Find Your Path</div>
          </div>
        </div>
      </Link>
    </OverlayTrigger>
  );
};

export default OrbitingStarButton; 