import React from 'react';
import { motion } from 'framer-motion';

const LoadingWidget3 = ({ children, baseColor = '#898989FF', highlightColor = '#FF1C1CFF', duration = 2 }) => {
  return (
    <div className="shimmer-wrapper">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: `${child.props.className || ''} shimmer-element`,
          });
        }
        return child;
      })}
      <style jsx>{`
        .shimmer-wrapper {
          position: relative;
          overflow: hidden;
        }
        .shimmer-element {
          background-color: ${baseColor} !important;
          color: transparent !important;
          position: relative;
          overflow: hidden;
        }
        .shimmer-element::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 200%;
          height: 100%;
          background: linear-gradient(to right, ${baseColor}, ${highlightColor}, ${baseColor});
          animation: shimmer ${duration}s infinite linear;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingWidget3 ;