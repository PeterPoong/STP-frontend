import React from 'react';
import { motion } from 'framer-motion';

const LoadingWidget2 = ({
    width = 200,
    height = 200,
    lines = 3,
    id = 1,
    baseColors = {},
    baseColor = "", // New baseColor prop
    highlightColor = 'rgba(255, 255, 255, 0.5)', // Ensure a default value
    borderRadius = '1rem',
    speed = 2,
    customLayout = null,
    pulseEffect = false,
    rounded = false,
    animation = 'shimmer', // Parent animation
    childrenAnimation = 'shimmer', // Children animation
    animatedChildClasses = [], // New prop for specifying which children to animate
    svgOverlay = null,
    svgFilter = null,
    imageHeight = '40%',
    lineWidths = [60, 80, 40],
    lineHeight = '0.75rem',
    imageBorderRadius = '0.25rem',
    lineBorderRadius = '0.25rem',
    imageMarginBottom = '1rem',
    lineSpacing = '0.5rem',
    children
}) => {
    const defaultBaseColors = {
        1: '#4000FFFF',
        2: '#C41C1CFF',
        3: '#B300FFFF',
        4: '#00FF00FF',
        5: '#FF00A6FF'
    };

    const getBaseColor = () => {
        if (baseColor) return baseColor;
        return baseColors[id] || defaultBaseColors[id] || defaultBaseColors[1];
    };

    const getLayout = () => {
        if (customLayout) return customLayout(getBaseColor());

        switch (id) {
            case 1:
                return (
                    <>
                        <motion.div
                            className="skeleton-image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{ height: imageHeight, marginBottom: imageMarginBottom, borderRadius: imageBorderRadius }}
                        />
                        <div className="skeleton-lines" style={{ height: `calc(100% - ${imageHeight} - ${imageMarginBottom})` }}>
                            {[...Array(lines)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    className={`skeleton-line skeleton-line-${index + 1}`}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    style={{
                                        width: `${lineWidths[index % lineWidths.length]}%`,
                                        height: lineHeight,
                                        borderRadius: lineBorderRadius,
                                        marginBottom: index < lines - 1 ? lineSpacing : 0
                                    }}
                                />
                            ))}
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="skeleton-circle"></div>
                        <div className="skeleton-lines">
                            {[...Array(lines)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`skeleton-line skeleton-line-${index + 1}`}
                                ></div>
                            ))}
                        </div>
                    </>
                );
            case 3:
                return (
                    <div className="skeleton-grid">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="skeleton-grid-item">
                                <div className="skeleton-image"></div>
                                <div className="skeleton-line"></div>
                            </div>
                        ))}
                    </div>
                );
            case 4:
                return (
                    <div className="skeleton-card">
                        <div className="skeleton-card-image"></div>
                        <div className="skeleton-card-content">
                            <div className="skeleton-card-title"></div>
                            <div className="skeleton-card-text"></div>
                            <div className="skeleton-card-text"></div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="skeleton-profile">
                        <div className="skeleton-avatar"></div>
                        <div className="skeleton-profile-info">
                            <div className="skeleton-profile-name"></div>
                            <div className="skeleton-profile-bio"></div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const getAnimationClass = () => {
        switch (animation) {
            case 'shimmer':
                return 'shimmer';
            case 'pulse':
                return 'pulse';
            case 'wave':
                return 'wave';
            case 'blink':
                return 'blink';
            default:
                return 'none'; // Default to 'none' if an invalid option is provided
        }
    };

    const getChildrenAnimationClass = () => {
        switch (childrenAnimation) {
            case 'shimmer':
                return 'shimmer';
            case 'pulse':
                return 'pulse';
            case 'wave':
                return 'wave';
            case 'blink':
                return 'blink';
            default:
                return 'none'; // Default to 'none' if an invalid option is provided
        }
    };

    const getAnimationProps = () => {
        switch (animation) {
            case 'pulse':
                return {
                    animate: { opacity: [1, 0.5, 1] },
                    transition: { duration: 1.5, repeat: Infinity }
                };
            case 'wave':
                return {
                    animate: { x: ['0%', '100%', '0%'] },
                    transition: { duration: 1.5, repeat: Infinity }
                };
            case 'blink':
                return {
                    animate: { opacity: [1, 0, 1] },
                    transition: { duration: 1, repeat: Infinity }
                };
            case 'shimmer':
                return {}; // Shimmer is handled via CSS
            default:
                return {}; // Shimmer is handled via CSS
        }
    };

    const renderChildren = () => {
        return React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                const childClassName = child.props.className || '';

                // Determine if the child should be animated
                const shouldAnimate = animatedChildClasses.some(animatedClass => childClassName.includes(animatedClass));

                if (shouldAnimate) {
                    // Apply animation classes and props
                    return React.cloneElement(child, {
                        className: `${childClassName} skeleton-child-element ${getChildrenAnimationClass()}`,
                        as: motion.div,
                        ...getAnimationProps(),
                    });
                } else {
                    // Do not apply animation; just add the skeleton-child-element class
                    return React.cloneElement(child, {
                        className: `${childClassName} skeleton-child-element`,
                    });
                }
            }
            return child;
        });
    };

    return (
        <motion.div
            className="skeleton-wrapper"
            style={{ width, height }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className={`skeleton-block ${getAnimationClass()} ${rounded ? 'rounded' : ''}`}
                initial={{ backgroundColor: getBaseColor() }}
                animate={{ backgroundColor: getBaseColor() }}
                transition={{ duration: 0.5 }}
            >
                {children ? renderChildren() : getLayout()}
                {svgOverlay && (
                    <div className="svg-overlay" dangerouslySetInnerHTML={{ __html: svgOverlay }} />
                )}
                {svgFilter && (
                    <svg width="0" height="0">
                        <defs dangerouslySetInnerHTML={{ __html: svgFilter }} />
                    </svg>
                )}
            </motion.div>
            <style jsx>{`
                .skeleton-wrapper {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  padding: 1rem;
                }

                .skeleton-block {
                  width: 100%;
                  height: 100%;
                  position: relative;
                  overflow: hidden;
                  border-radius: ${borderRadius};
                  background-color: ${getBaseColor()};
                  padding: 1rem;
                  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                  filter: url(#${svgFilter ? svgFilter.match(/id="([^"]*)/)[1] : ''});
                }

                /* Shimmer effect for predefined skeleton elements and children */
                .shimmer .skeleton-image::before, 
                .shimmer .skeleton-line::before, 
                .shimmer .skeleton-circle::before,
                .shimmer .skeleton-card-image::before,
                .shimmer .skeleton-card-title::before,
                .shimmer .skeleton-card-text::before,
                .shimmer .skeleton-avatar::before,
                .shimmer .skeleton-profile-name::before,
                .shimmer .skeleton-profile-bio::before,
                .shimmer .skeleton-child-element.shimmer::before { /* Updated selector */
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 200%;
                    height: 100%;
                    background: linear-gradient(to right, transparent, ${highlightColor}, transparent);
                    transform: skewX(-15deg);
                    animation: shimmer ${speed}s infinite;
                }

                @keyframes shimmer {
                  100% {
                    transform: translateX(100%) skewX(-15deg);
                  }
                }

                /* Pulse Animation */
                .pulse {
                  animation: pulse 1.5s ease-in-out 0.5s infinite;
                }

                @keyframes pulse {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.5;
                  }
                }

                /* Wave Animation */
                .wave {
                  position: relative;
                  overflow: hidden;
                }

                .wave::after {
                  content: "";
                  position: absolute;
                  top: -50%;
                  left: -50%;
                  width: 200%;
                  height: 200%;
                  background: radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
                  animation: wave 3s linear infinite;
                }

                @keyframes wave {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }

                /* Blink Animation */
                .blink {
                  animation: blink 1s step-end infinite;
                }

                @keyframes blink {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.5;
                  }
                }

                /* Rounded Corners */
                .rounded .skeleton-image,
                .rounded .skeleton-line,
                .rounded .skeleton-circle,
                .rounded .skeleton-card-image,
                .rounded .skeleton-card-title,
                .rounded .skeleton-card-text,
                .rounded .skeleton-avatar,
                .rounded .skeleton-profile-name,
                .rounded .skeleton-profile-bio {
                  border-radius: 9999px;
                }

                /* Base Styles for Skeleton Elements */
                .skeleton-image, 
                .skeleton-line, 
                .skeleton-circle, 
                .skeleton-card-image, 
                .skeleton-card-title, 
                .skeleton-card-text, 
                .skeleton-avatar, 
                .skeleton-profile-name, 
                .skeleton-profile-bio, 
                .skeleton-child-element {
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 0.25rem;
                    overflow: hidden;
                    position: relative;
                }

                /* SVG Overlay Styles */
                .svg-overlay {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  pointer-events: none;
                }

                /* Specific Skeleton Element Styles */
                .skeleton-circle {
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  margin-bottom: 1rem;
                }

                .skeleton-lines {
                  height: 60%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                }

                .skeleton-line {
                  height: ${lineHeight};
                }

                .skeleton-line-1 { width: 60%; }
                .skeleton-line-2 { width: 80%; }
                .skeleton-line-3 { width: 40%; }

                .skeleton-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 1rem;
                }

                .skeleton-grid-item {
                  display: flex;
                  flex-direction: column;
                }

                .skeleton-grid-item .skeleton-image {
                  height: 60px;
                  margin-bottom: 0.5rem;
                }

                .skeleton-grid-item .skeleton-line {
                  height: 0.5rem;
                  width: 100%;
                }

                .skeleton-card {
                  display: flex;
                  flex-direction: column;
                  height: 100%;
                }

                .skeleton-card-image {
                  height: 60%;
                  margin-bottom: 1rem;
                }

                .skeleton-card-content {
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                }

                .skeleton-card-title {
                  height: 1rem;
                  width: 80%;
                  margin-bottom: 0.5rem;
                }

                .skeleton-card-text {
                  height: 0.75rem;
                  margin-bottom: 0.5rem;
                }

                .skeleton-profile {
                  display: flex;
                  align-items: center;
                }

                .skeleton-avatar {
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  margin-right: 1rem;
                }

                .skeleton-profile-info {
                  flex: 1;
                }

                .skeleton-profile-name {
                  height: 1rem;
                  width: 60%;
                  margin-bottom: 0.5rem;
                }

                .skeleton-profile-bio {
                  height: 0.75rem;
                  width: 80%;
                }
           `}</style>
        </motion.div>
    );
};

export default LoadingWidget2;
