import React from 'react';
import "../../css/StudentPortalStyles/WidgetBackground.css";

const WidgetBackground = ({ children, className = '' }) => {
    return (
        <div className={`mesh-gradient-container ${className}`}>
          <svg className="mesh-gradient" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BA1718">
                  <animate attributeName="stop-color" 
                    values="#BA1718; #ffffff; #000000; #BA1718" 
                    dur="20s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#ffffff">
                  <animate attributeName="stop-color" 
                    values="#ffffff; #000000; #BA1718; #ffffff" 
                    dur="20s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000000">
                  <animate attributeName="stop-color" 
                    values="#000000; #BA1718; #ffffff; #000000" 
                    dur="20s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#BA1718">
                  <animate attributeName="stop-color" 
                    values="#BA1718; #ffffff; #000000; #BA1718" 
                    dur="20s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              </filter>
            </defs>
            <g filter="url(#goo)">
              <circle cx="50" cy="50" r="20" fill="url(#gradient1)">
                <animateMotion 
                  path="M0 0 C-30 -30 30 -30 0 0 C30 30 -30 30 0 0 Z" 
                  dur="25s" 
                  repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="50" r="15" fill="url(#gradient2)">
                <animateMotion 
                  path="M0 0 C30 -30 30 30 0 0 C-30 30 -30 -30 0 0 Z" 
                  dur="20s" 
                  repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="50" r="18" fill="url(#gradient1)">
                <animateMotion 
                  path="M0 0 C-20 20 20 -20 0 0 C20 20 -20 -20 0 0 Z" 
                  dur="22s" 
                  repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="50" r="22" fill="url(#gradient2)">
                <animateMotion 
                  path="M0 0 C40 0 0 40 0 0 C-40 0 0 -40 0 0 Z" 
                  dur="28s" 
                  repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="50" r="17" fill="url(#gradient1)">
                <animateMotion 
                  path="M0 0 C0 -40 40 0 0 0 C0 40 -40 0 0 0 Z" 
                  dur="23s" 
                  repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
          <svg className="noise-overlay">
            <filter id="noiseFilter">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.65" 
                numOctaves="3" 
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
          <div className="content-container">
            {children}
          </div>
        </div>
    );
};

export default WidgetBackground;