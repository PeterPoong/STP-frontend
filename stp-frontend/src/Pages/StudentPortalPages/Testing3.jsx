import React, { useState, useRef, useEffect } from 'react';
import "../../css/StudentPortalStyles/Testing2.css"
const Testing3 = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [momentum, setMomentum] = useState(0);
    const carouselRef = useRef(null);
    const lastX = useRef(0);
    const lastTime = useRef(Date.now());

    useEffect(() => {
        let animationFrame;

        const updateMomentum = () => {
            if (!isDragging && Math.abs(momentum) > 0.01) {
                setRotation(prev => prev + momentum);
                setMomentum(prev => prev * 0.98); // Momentum decay factor
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

    const items = [
        {
            
            title: 'Basic Package',
            price: '250.00',
            features: [
                "Access to school portal",
                "Editable school details",
                "Access student basic information",
                "Able to view SPM, STPM exam results",
                "Access & Accept application details",
                "Managing courses details"
            ]
        },
        {
          
            title: 'Standard Package',
            price: '500.00',
            features: [
                "All Basic Package features",
                "Advanced analytics dashboard",
                "Bulk student management",
                "Custom report generation",
                "Email notification system",
                "Priority support"
            ]
        },
        {
            title: 'Premium Package',
            price: '750.00',
            features: [
                "All Standard Package features",
                "API access",
                "White-label solution",
                "24/7 dedicated support",
                "Custom integration options",
                "Advanced security features"
            ]
        },
        {
            title: 'Enterprise Package',
            price: '1000.00',
            features: [
                "All Premium Package features",
                "Multiple school management",
                "Custom development options",
                "Dedicated account manager",
                "On-site training",
                "SLA guarantees"
            ]
        },
        {
            title: 'Starter Package',
            price: '150.00',
            features: [
                "Basic school portal access",
                "Limited student records",
                "Basic reporting",
                "Email support",
                "Standard security",
                "Community forum access"
            ]
        },
        {
            title: 'Advanced Package',
            price: '600.00',
            features: [
                "Enhanced analytics",
                "Advanced reporting",
                "Custom workflows",
                "Priority support",
                "API integration",
                "Advanced security"
            ]
        },
        {
            title: 'Professional Package',
            price: '850.00',
            features: [
                "Full feature access",
                "Unlimited records",
                "Custom development",
                "24/7 support",
                "White labeling",
                "Premium integrations"
            ]
        },
        {
            title: 'Ultimate Package',
            price: '1200.00',
            features: [
                "Complete solution",
                "Enterprise support",
                "Custom development",
                "Dedicated hosting",
                "Advanced security",
                "Priority updates"
            ]
        }
    ];

    const handleMouseDown = (e) => {
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

        const currentTime = Date.now();
        const timeElapsed = currentTime - lastTime.current;
        const x = e.pageX;
        const deltaX = x - lastX.current;

        if (timeElapsed > 0) {
            const speed = deltaX / timeElapsed * 0.15; // Adjusted momentum sensitivity
            setMomentum(speed);
        }

        const walk = (x - startX) * 0.3; // Reduced direct movement sensitivity
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
        <div className="testing-container">
            <style>{`
        .testing-container {
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

        .testing-carousel-wrapper {
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

        .testing-carousel-wrapper:active {
          cursor: grabbing;
          transition: none;
        }

        .testing-carousel-item {
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

        .testing-carousel-item:nth-child(1) { --index: 0; }
        .testing-carousel-item:nth-child(2) { --index: 1; }
        .testing-carousel-item:nth-child(3) { --index: 2; }
        .testing-carousel-item:nth-child(4) { --index: 3; }
        .testing-carousel-item:nth-child(5) { --index: 4; }
        .testing-carousel-item:nth-child(6) { --index: 5; }
        .testing-carousel-item:nth-child(7) { --index: 6; }
        .testing-carousel-item:nth-child(8) { --index: 7; }

        .testing-carousel-item {
          transform: rotateY(calc(var(--a) * var(--index))) 
                     translateZ(calc(var(--r) * -1));
        }

        .testing-carousel-item:hover {
          transform: rotateY(calc(var(--a) * var(--index))) 
                     translateZ(calc(var(--r) * -1))
                     scale(1.05);
        }

        .item-number {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>

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
            >
                <div
                    className="testing-carousel-wrapper"
                    style={{
                        '--rotation': `${rotation}deg`
                    }}
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="testing-carousel-item"
                            style={{ backgroundColor: item.color }}
                        >
                            <div className="item-number">{item.id}</div>

                            <div className="Testing-Container-Two">
                                <div className="Testing-Container-Card" >
                                    <p className="Testing-Container-Current">Current Plan</p>
                                    <p className="Testing-Container-Package-Title">Bacic Package</p>
                                    <p className="Testing-Container-Price-Title">RM250.00 <span>/month</span></p>
                                    <p className="Testing-Container-Features-Title">Features</p>
                                    <div className="Testing-Container-Card-Features-Container">
                                        {item.features.map((feature, index) => (
                                            <div key={index} className="Testing-Container-Card-Features">
                                                <i className="bi bi-check-circle-fill" style={{ color: "#BA1718"}}></i>
                                                <p>{feature}</p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>






                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testing3;