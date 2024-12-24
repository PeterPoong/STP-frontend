import React, { useState, useRef, useEffect } from 'react';
import "../../css/SchoolPortalStyle/SchoolPackage.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
const PackageRotate = ({ items, selectedPackageId }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [momentum, setMomentum] = useState(0);
    const carouselRef = useRef(null);
    const lastX = useRef(0);
    const lastTime = useRef(Date.now());
    const degreesPerItem = 360 / items.length;

    useEffect(() => {
        let animationFrame;
        const updateMomentum = () => {
            if (!isDragging && Math.abs(momentum) > 0.01) {
                setRotation(prev => prev + momentum);
                setMomentum(prev => prev * 0.98);
                animationFrame = requestAnimationFrame(updateMomentum);
            }
        };
        if (momentum !== 0) {
            animationFrame = requestAnimationFrame(updateMomentum);
        }
        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [momentum, isDragging]);


    useEffect(() => {
        if (selectedPackageId) {
            const selectedIndex = items.findIndex(item => item.id === selectedPackageId);
            if (selectedIndex !== -1) {
                const newRotation = -(selectedIndex * degreesPerItem);
                setRotation(newRotation);
                setMomentum(0);
            }
        }
    }, [selectedPackageId, items, degreesPerItem]);

    const handleNext = () => {
        setRotation(prev => prev - degreesPerItem);
        setMomentum(0);
    };

    const handlePrev = () => {
        setRotation(prev => prev + degreesPerItem);
        setMomentum(0);
    };

    const handleMouseDown = (e) => {
        if (e.target.closest('.SP-Container-Quantity-Controls') ||
            e.target.closest('.SP-Container-Features-Button')) {
            return;
        }
        setIsDragging(true);
        setStartX(e.pageX);
        setScrollLeft(rotation);
        setMomentum(0);
        lastX.current = e.pageX;
        lastTime.current = Date.now();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        if (e.target.closest('.SP-Container-Quantity-Controls') ||
            e.target.closest('.SP-Container-Features-Button')) {
            return;
        }
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastTime.current;
        const x = e.pageX;
        const deltaX = x - lastX.current;
        if (timeElapsed > 0) {
            const speed = deltaX / timeElapsed * 0.15;
            setMomentum(speed);
        }

        const walk = (x - startX) * 0.3;
        const newRotation = scrollLeft + walk;
        setRotation(newRotation);
        lastX.current = x;
        lastTime.current = currentTime;
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX);
        setScrollLeft(rotation);
        setMomentum(0);
        lastX.current = e.touches[0].pageX;
        lastTime.current = Date.now();
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastTime.current;
        const x = e.touches[0].pageX;
        const deltaX = x - lastX.current;
        if (timeElapsed > 0) {
            const speed = deltaX / timeElapsed * 0.15;
            setMomentum(speed);
        }
        const walk = (x - startX) * 0.3;
        const newRotation = scrollLeft + walk;
        setRotation(newRotation);
        lastX.current = x;
        lastTime.current = currentTime;
    };

    return (
        <div className="sp-container">
            <style>{`
        .sp-container {
          width: 100%;
          background-color: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .scene {
          perspective: 1000px;
          transform-style: preserve-3d;
          position: relative;
          width: 35rem;
          height: 31rem;
          user-select: none;
          touch-action: none;
        }

        .sp-carousel-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) rotateY(var(--rotation));
          --total: 8;
          --a: calc((360 / var(--total)) * 1deg);
          --item-width: 15rem;
          --item-height: 20rem;
          --r: calc((var(--item-width) * 1) / sin(var(--a)) * -1);
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: grab;
          will-change: transform;
        }

        .sp-carousel-wrapper:active {
          cursor: grabbing;
          transition: none;
        }

        .sp-carousel-item {
          position: absolute;
          width: var(--item-width);
          height: var(--item-height);
          left: calc(var(--item-width) / -2);
          top: calc(var(--item-height) / -2);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          border-radius: 0.5rem;
          
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sp-carousel-item:nth-child(1) { --index: 0; }
        .sp-carousel-item:nth-child(2) { --index: 1; }
        .sp-carousel-item:nth-child(3) { --index: 2; }
        .sp-carousel-item:nth-child(4) { --index: 3; }
        .sp-carousel-item:nth-child(5) { --index: 4; }
        .sp-carousel-item:nth-child(6) { --index: 5; }
        .sp-carousel-item:nth-child(7) { --index: 6; }
        .sp-carousel-item:nth-child(8) { --index: 7; }

        .sp-carousel-item {
          transform: rotateY(calc(var(--a) * var(--index))) 
                     translateZ(calc(var(--r) * -1));
        }

        .sp-carousel-item:hover {
          transform: rotateY(calc(var(--a) * var(--index))) 
                     translateZ(calc(var(--r) * -1))
                     scale(1.05);
        }

        .item-number {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }

         .arrow-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(186, 23, 24, 0.8);  /* Changed to match your theme color */
        border: none;
        padding:0;
        border-radius: 0%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 100;  /* Increased z-index */
        transition: all 0.3s ease;
        color: white;  /* Added white color for the icons */
    }

    .arrow-button:hover {
        background: rgba(186, 23, 24, 1);  /* Changed hover state */
        transform: translateY(-50%) scale(1.1);  /* Added scale effect */
    }

    .arrow-button.prev {
        left: 0;  /* Adjusted position */
    }

    .arrow-button.next {
        right: 0;  /* Adjusted position */
    }

    /* Added to ensure the container properly shows the buttons */
    .sp-container {
        position: relative;
        width: 100%;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: visible;  /* Changed from hidden to visible */
        padding: 0 50px;  /* Added padding for the buttons */
    }
      `}</style>
            <button
                className="arrow-button prev"
                onClick={handlePrev}
                aria-label="Previous item"
            >
                <ChevronLeft size={24} color={"#ffffff"} />
            </button>
            <div
                ref={carouselRef}
                className="scene"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleMouseUp}
                onTouchMove={handleTouchMove}
            > <div
                className="sp-carousel-wrapper"
                style={{
                    '--rotation': `${rotation}deg`
                }}
            >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="sp-carousel-item"
                            style={{ backgroundColor: item.color }}
                        >
                            <div className="SP-Container-Two">
                                <div className="SP-Container-Card">
                                    {item.package_type === 'package' ? (
                                        <>
                                            <p className="SP-Container-Current">Current Plan</p>
                                            <p className="SP-Container-Package-Title">{item.title}</p>
                                            <p className="SP-Container-Price-Title">
                                                RM{item.price}<span>/month</span>
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="SP-Container-Current-AddOns">Add Ons</p>
                                            <p className="SP-Container-Package-Title">{item.title}</p>
                                            <p className="SP-Container-Price-Title">
                                                RM{item.price}<span>/slot</span>
                                            </p>

                                        </>
                                    )}
                                    <p className="SP-Container-Features-Title">Features</p>
                                    <div className={item.package_type === 'package' ?
                                        "SP-Container-Card-Features-Container" :
                                        "SP-Container-Card-Features-AddOns"}>
                                        {item.features.map((feature, index) => (
                                            <div key={index} className="SP-Container-Card-Features">
                                                <i className="bi bi-check-circle-fill" style={{ color: "#BA1718" }}></i>
                                                <p className="m-0">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="arrow-button next"
                onClick={handleNext}
                aria-label="Next item"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default PackageRotate;