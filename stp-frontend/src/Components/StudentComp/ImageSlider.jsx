import React, { useState, useCallback, useRef, useEffect } from 'react';

const ImageSlider = ({ selectedPhotos = [], enlargedImageIndex = 0, baseURL = '', onClose = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState(enlargedImageIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);
  
  if (!Array.isArray(selectedPhotos) || selectedPhotos.length === 0) {
    return null;
  }

  // Touch Events
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragX(0);
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragX(diff);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse Events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragX(0);
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragX(diff);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Common drag end logic
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.3s ease-out';
    }

    const threshold = window.innerWidth * 0.2;
    if (Math.abs(dragX) > threshold) {
      if (dragX > 0) {
        setCurrentIndex(prev => 
          prev === 0 ? selectedPhotos.length - 1 : prev - 1
        );
      } else {
        setCurrentIndex(prev => 
          prev === selectedPhotos.length - 1 ? 0 : prev + 1
        );
      }
    }
    setDragX(0);
  };

  const getTransform = () => {
    const baseTransform = -(currentIndex * 100);
    const dragPercent = (dragX / window.innerWidth) * 100;
    return `translateX(${baseTransform + dragPercent}%)`;
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => 
          prev === 0 ? selectedPhotos.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => 
          prev === selectedPhotos.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotos.length, onClose]);

  return (
    <div
      className="enlarged-image-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.9)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {/* Carousel Container */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          overflow: 'hidden',
        }}
      >
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            height: '100%',
            transform: getTransform(),
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {selectedPhotos.map((photo, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 100%',
                padding: '0 40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0.3,
                transition: 'opacity 0.3s ease',
              }}
            >
              <img
                src={`${baseURL}storage/${photo}`}
                alt={`School Photo ${index + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          padding: '20px',
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {selectedPhotos.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#B71A18' : '#ffffff',
              opacity: index === currentIndex ? 1 : 0.5,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Close Button */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'white',
          fontSize: '20px',
        }}
      >
        ×
      </div>
    </div>
  );
};

export default ImageSlider;