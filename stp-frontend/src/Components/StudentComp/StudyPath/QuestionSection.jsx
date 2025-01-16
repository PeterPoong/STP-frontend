import React, { useRef, useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import "../../../css/StudentPortalStyles/StudentStudyPath.css";
import StudyPalLogoYPNG from "../../../assets/StudentPortalAssets/studypalLogoYPNG.png"

// Options and their score values
const OPTIONS = {
    STRONGLY_AGREE: { text: "Strongly Agree", score: 6 },
    AGREE: { text: "Agree", score: 5 },
    SLIGHTLY_AGREE: { text: "Slightly Agree", score: 4 },
    SLIGHTLY_DISAGREE: { text: "Slightly Disagree", score: 3 },
    DISAGREE: { text: "Disagree", score: 2 },
    STRONGLY_DISAGREE: { text: "Strongly Disagree", score: 1 }
};

// Questions organized by RIASEC type


const motivationalQuotes = [
    { threshold: 10, text: "You're Doing Great!" },
    { threshold: 20, text: "Halfway There! Keep Going!" },
    { threshold: 30, text: "Almost Done! You're Amazing!" },
    { threshold: 39, text: "Last One! You Can Do It!" }
];

const QuestionSection = ({ onAnswer }) => {
    const listRef = useRef(null);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showQuestionList, setShowQuestionList] = useState(false);
    const [showDropdown, setShowDropdown] = useState(null);
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [showTieBreaker, setShowTieBreaker] = useState(false);
    const [tiedTypes, setTiedTypes] = useState([]);
    const [tieBreakAnswers, setTieBreakAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = sessionStorage.getItem('token') || localStorage.getItem('token');
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/personalityQuestionList`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }

                const data = await response.json();
                if (data.success && data.data) {
                    // Transform the questions data to match our format
                    const formattedQuestions = data.data.map((q, index) => ({
                        id: index + 1,
                        type: q.riasec_type.type_name,
                        question: q.question,
                        options: Object.values(OPTIONS)
                    }));
                    setQuestions(formattedQuestions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);


    // Add these helper functions
    const getPriorityText = (type) => {
        const activities = {
            Realistic: "Working with tools and machinery",
            Investigative: "Analyzing data and solving complex problems",
            Artistic: "Creating and designing original works",
            Social: "Teaching and helping others develop",
            Enterprising: "Leading teams and making business decisions",
            Conventional: "Organizing information and maintaining systems"
        };
        return activities[type];
    };

    const getEnvironmentText = (type) => {
        const environments = {
            Realistic: "Workshop or construction site",
            Investigative: "Research laboratory or technical facility",
            Artistic: "Design studio or creative space",
            Social: "Educational or counseling environment",
            Enterprising: "Business office or entrepreneurial setting",
            Conventional: "Structured office or administrative environment"
        };
        return environments[type];
    };

    const checkForTies = (typeRanking) => {
        const firstScore = typeRanking[1].score;
        const tiedTypes = Object.entries(typeRanking)
            .filter(([, data]) => data.score === firstScore)
            .map(([, data]) => data.type);

        return tiedTypes.length > 1 ? tiedTypes : null;
    };

    // Modify your existing handleSubmit to include tie-break check
    const handleSubmit = async () => {
        if (answeredQuestions.size < 40) {
            alert("Please answer all questions before submitting!");
            return;
        }

        // Calculate scores for each RIASEC type
        const typeScores = Object.entries(selectedOptions).reduce((acc, [questionId, answer]) => {
            const type = answer.type;
            if (!acc[type]) {
                acc[type] = {
                    total: 0,
                    count: 0
                };
            }
            acc[type].total += answer.score;
            acc[type].count += 1;
            return acc;
        }, {});

        // Calculate final scores as percentages
        const finalScores = {};
        Object.entries(typeScores).forEach(([type, scores]) => {
            const maxPossibleScore = scores.count * 6; // Maximum score per question is 6
            finalScores[type.toLowerCase()] = Math.round((scores.total / maxPossibleScore) * 100);
        });

        // Create ranking before API call to check for ties
        const typeRanking = Object.entries(finalScores)
            .sort(([, a], [, b]) => b - a)
            .reduce((acc, [type, score], index) => {
                acc[index + 1] = { 
                    type: type.charAt(0).toUpperCase() + type.slice(1), 
                    score 
                };
                return acc;
            }, {});

        // Check for ties
        const ties = checkForTies(typeRanking);
        if (ties) {
            setTiedTypes(ties);
            setShowTieBreaker(true);
            return; // Stop here and show tie breaker questions
        }

        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const userId = sessionStorage.getItem('id') || localStorage.getItem('id');

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}api/student/submitTestResult`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    scores: finalScores
                })
            });

            const data = await response.json();
            if (data.success) {
                // Format answers for parent component
                const formattedAnswers = {
                    responses: Object.entries(selectedOptions).reduce((acc, [questionId, answer]) => {
                        acc[questionId] = {
                            questionId: parseInt(questionId),
                            type: answer.type,
                            answer: questions[parseInt(questionId) - 1].options[answer.optionIndex].text,
                            score: answer.score
                        };
                        return acc;
                    }, {}),
                    scores: finalScores,
                    ranking: Object.entries(finalScores)
                        .sort(([, a], [, b]) => b - a)
                        .reduce((acc, [type, score], index) => {
                            acc[index + 1] = { type: type.charAt(0).toUpperCase() + type.slice(1), score };
                            return acc;
                        }, {})
                };

                onAnswer(formattedAnswers);
            } else {
                throw new Error('Failed to submit test results');
            }
        } catch (error) {
            console.error('Error submitting results:', error);
            alert('Failed to submit test results. Please try again.');
        }
    };
    // Add tie-break handling functions
    const handleTieBreakAnswer = (questionIndex, selectedType) => {
        setTieBreakAnswers(prev => ({
            ...prev,
            [questionIndex]: selectedType
        }));
    };

    const handleTieBreakSubmit = () => {
        if (Object.keys(tieBreakAnswers).length < 2) {
            alert("Please answer both tie-break questions!");
            return;
        }

        // First calculate original scores
        const typeScores = Object.entries(selectedOptions).reduce((acc, [questionId, answer]) => {
            const type = answer.type;
            if (!acc[type]) {
                acc[type] = {
                    total: 0,
                    count: 0,
                    maxPossible: 0
                };
            }
            acc[type].total += answer.score;
            acc[type].count += 1;
            acc[type].maxPossible += 6; // Max score per question
            return acc;
        }, {});

        // Count tie-break selections for each type
        const tieBreakPoints = {};
        tiedTypes.forEach(type => {
            tieBreakPoints[type] = 0;
        });

        // Add 1 point for each tie-break selection
        Object.values(tieBreakAnswers).forEach(type => {
            tieBreakPoints[type]++;
        });

        // Calculate final scores including tie-break points
        const finalScores = {};
        Object.entries(typeScores).reduce((acc, [type, scores]) => {
            if (tiedTypes.includes(type)) {
                // For tied types, include tie-break points in calculation
                const totalPoints = scores.total + tieBreakPoints[type];
                const maxPossible = scores.maxPossible + 2; // Original max + 2 tie-break questions
                finalScores[type] = Math.round((totalPoints / maxPossible) * 100);
            } else {
                // For non-tied types, calculate normally
                finalScores[type] = Math.round((scores.total / scores.maxPossible) * 100);
            }
            return acc;
        }, {});

        // Create final formatted answers with adjusted scores
        const formattedAnswers = {
            responses: Object.entries(selectedOptions).reduce((acc, [questionId, answer]) => {
                acc[questionId] = {
                    questionId: parseInt(questionId),
                    type: answer.type,
                    answer: questions[parseInt(questionId) - 1].options[answer.optionIndex].text,
                    score: answer.score
                };
                return acc;
            }, {}),
            scores: finalScores,
            ranking: Object.entries(finalScores)
                .sort(([, a], [, b]) => b - a)
                .reduce((acc, [type, score], index) => {
                    acc[index + 1] = { type, score };
                    return acc;
                }, {})
        };

        onAnswer(formattedAnswers);
    };

    const renderTieBreaker = () => {
        if (!showTieBreaker) return null;

        const tieBreakQuestions = [
            {
                question: "From these activities, which do you enjoy the most?",
                options: tiedTypes.map(type => ({
                    text: getPriorityText(type),
                    type: type
                }))
            },
            {
                question: "Which work environment would you prefer?",
                options: tiedTypes.map(type => ({
                    text: getEnvironmentText(type),
                    type: type
                }))
            }
        ];

        return (
            <div className="QS-TieBreaker-Container">
                <h2 className="QS-Title">Additional Questions</h2>
                <p className="QS-Subtitle">Please help us understand your preferences better:</p>
                {tieBreakQuestions.map((q, index) => (
                    <div key={index} className="QS-TieBreaker-Question">
                        <p className="QS-Carousel-Question">{q.question}</p>
                        <div className="QS-Carousel-Options">
                            {q.options.map((option, optIndex) => (
                                <button
                                    key={optIndex}
                                    className="QS-Carousel-Options-Button"
                                    onClick={() => handleTieBreakAnswer(index, option.type)}
                                    style={{
                                        backgroundColor: tieBreakAnswers[index] === option.type ? '#BA1718' : '#FFC9C9',
                                        color: tieBreakAnswers[index] === option.type ? 'white' : '#BA1718'
                                    }}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="w-100 text-end">
                    <button
                        className="SSP-Start-Button"
                        onClick={handleTieBreakSubmit}
                        disabled={Object.keys(tieBreakAnswers).length < 2}
                    >
                        Submit Final Results
                    </button>
                </div>
            </div>
        );
    };

    const handleClick = (direction) => {
        if (listRef.current && !isNavigating) {
            setIsNavigating(true);

            // Get the container and all items
            const container = listRef.current;
            const items = container.querySelectorAll('.QS-Carousel-Item');

            // Calculate the precise item width based on the container
            const totalWidth = container.scrollWidth;
            const itemWidth = totalWidth / items.length;

            const newQuestion = direction === 'previous'
                ? Math.max(1, currentQuestion - 1)
                : Math.min(40, currentQuestion + 1);

            // Calculate the exact target position
            const containerWidth = container.offsetWidth;
            let targetPosition = (newQuestion - 1) * itemWidth;

            // Adjust for centering if container is wider than item
            if (containerWidth > itemWidth) {
                const centerOffset = (containerWidth - itemWidth) / 2;
                targetPosition = Math.max(0, targetPosition - centerOffset);
            }

            // Ensure we don't scroll past the maximum
            const maxScroll = totalWidth - containerWidth;
            targetPosition = Math.min(targetPosition, maxScroll);

            setCurrentQuestion(newQuestion);

            // Use requestAnimationFrame for smoother scrolling
            requestAnimationFrame(() => {
                container.scrollTo({
                    left: targetPosition,
                    behavior: 'smooth'
                });

                // Verify position after animation
                const checkPosition = () => {
                    const currentPosition = container.scrollLeft;
                    const expectedPosition = targetPosition;

                    if (Math.abs(currentPosition - expectedPosition) > 5) {
                        container.scrollTo({
                            left: expectedPosition,
                            behavior: 'auto'
                        });
                    }
                    setIsNavigating(false);
                };

                // Wait for scroll animation to complete
                setTimeout(checkPosition, 500);
            });
        }
    };

    const getCurrentQuote = () => {
        const answeredCount = answeredQuestions.size;
        const specificQuotes = {
            10: "You're Doing Great!",
            20: "Halfway There! Keep Going!",
            30: "Almost Done! You're Amazing!",
            39: "Last One! You Can Do It!"
        };

        return specificQuotes[answeredCount] || null;
    };

    const handleOptionSelect = (questionId, optionIndex) => {
        setAnsweredQuestions(prev => new Set(prev).add(questionId));
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: {
                optionIndex,
                score: questions[questionId - 1].options[optionIndex].score,
                type: questions[questionId - 1].type
            }
        }));
    };

    const jumpToQuestion = (questionNumber) => {
        const firstItem = listRef.current?.querySelector('.QS-Carousel-Item');
        if (!firstItem || !listRef.current) return;

        // Get accurate fixed width - since we know we have 40 questions
        const totalItems = 40;
        const totalWidth = listRef.current.scrollWidth;
        const itemWidth = totalWidth / totalItems; // This ensures exact width per item

        // Calculate the exact position without any adjustments first
        let targetPosition = (questionNumber - 1) * itemWidth;

        // Get container width for centering calculation
        const containerWidth = listRef.current.offsetWidth;

        // Only apply centering if we have space
        if (containerWidth > itemWidth) {
            const centerOffset = (containerWidth - itemWidth) / 2;
            targetPosition = Math.max(0, targetPosition - centerOffset);
        }

        // Ensure we don't scroll past the maximum possible scroll position
        const maxScroll = totalWidth - containerWidth;
        targetPosition = Math.max(0, Math.min(targetPosition, maxScroll));

        // Update current question first
        setCurrentQuestion(questionNumber);

        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
            // Scroll to position
            listRef.current?.scrollTo({
                left: targetPosition,
                behavior: 'smooth'
            });

            // Add a verification check after scrolling
            setTimeout(() => {
                const actualQuestion = Math.round(listRef.current.scrollLeft / itemWidth) + 1;
                if (actualQuestion !== questionNumber) {
                    // If we ended up at the wrong question, force correct position
                    listRef.current?.scrollTo({
                        left: targetPosition,
                        behavior: 'auto'
                    });
                }
            }, 500); // Check after scroll animation should be complete
        });
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024); // Tablet and below
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Add this function to handle scroll events
    const handleScroll = () => {
        if (!listRef.current || isScrolling) return;

        // Only handle scroll events on mobile
        if (!isMobile) return;

        setIsScrolling(true);

        requestAnimationFrame(() => {
            const container = listRef.current;
            const containerWidth = container.offsetWidth;
            const scrollPosition = container.scrollLeft;

            const items = container.querySelectorAll('.QS-Carousel-Item');
            let minDistance = Infinity;
            let centerQuestion = currentQuestion;

            items.forEach((item, index) => {
                const itemLeft = item.offsetLeft - container.offsetLeft;
                const itemCenter = itemLeft + (item.offsetWidth / 2);
                const distanceToCenter = Math.abs(scrollPosition + (containerWidth / 2) - itemCenter);

                if (distanceToCenter < minDistance) {
                    minDistance = distanceToCenter;
                    centerQuestion = index + 1;
                }
            });

            if (centerQuestion !== currentQuestion) {
                setCurrentQuestion(centerQuestion);
            }

            setTimeout(() => setIsScrolling(false), 150);
        });
    };


    return (
        <div className="QS-Container">
            <div className="QS-Assessment-Container">
                {!showTieBreaker ? (
                    <>
                        <div className="QS-Title-Container">
                            <h1 className="QS-Title">RIASEC Career Assessment</h1>
                            <p className="QS-Subtitle">"Rate how well each statement describes you"</p>
                        </div>
                        <div className="QS-Header-Container">
                            <div className="QS-Header">
                                <div className="QS-Question-Progress">
                                    <div className="QS-Current-Question-Container">
                                        <div className="d-flex me-3">
                                            <span
                                                className="QS-Current-Question"
                                                onMouseEnter={() => setShowDropdown('counter')}
                                                onMouseLeave={() => {
                                                    if (!isDropdownClicked) {
                                                        setShowDropdown(null);
                                                    }
                                                }}
                                                onClick={() => {
                                                    setIsDropdownClicked(!isDropdownClicked);
                                                    setShowDropdown('counter');
                                                    if (!isDropdownClicked) {
                                                        // Set timeout to close dropdown after 3 seconds
                                                        setTimeout(() => {
                                                            setIsDropdownClicked(false);
                                                            setShowDropdown(null);
                                                        }, 3000);
                                                    }
                                                }}
                                            >
                                                Question {currentQuestion}/40

                                            </span>
                                            <span>
                                                {answeredQuestions.has(currentQuestion) && (
                                                    <Check size={20} className="QS-Check-Icon" />
                                                )}
                                            </span>
                                        </div>
                                        {showDropdown === 'counter' && (
                                            <div
                                                className="QS-Question-Dropdown"
                                                onMouseEnter={() => setShowDropdown('counter')}
                                                onMouseLeave={() => {
                                                    if (!isDropdownClicked) {
                                                        setShowDropdown(null);
                                                    }
                                                }}
                                            >
                                                <div className="QS-Question-Grid">
                                                    {Array.from({ length: 40 }, (_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`QS-Question-Number ${i + 1 === currentQuestion ? 'current' : ''
                                                                } ${answeredQuestions.has(i + 1) ? 'answered' : ''
                                                                }`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault(); // Prevent any default handling
                                                                jumpToQuestion(i + 1);
                                                                setIsDropdownClicked(false);
                                                                setShowDropdown(null);
                                                            }}
                                                        >
                                                            {i + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="QS-Progress-Indicator">
                                        {Array.from({ length: 40 }, (_, i) => (
                                            <div
                                                key={i}
                                                className={`QS-Progress-Dot ${i + 1 === currentQuestion ? 'active' : ''} 
                                        ${answeredQuestions.has(i + 1) ? 'answered' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {getCurrentQuote() && (
                                    <div key={currentQuestion} className="QS-Motivation-Quote">
                                        {getCurrentQuote()}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="QS-Carousel-List-Wrapper">
                            <ul className="QS-Carousel-List" ref={listRef} onScroll={isMobile ? handleScroll : undefined} >
                                {questions.map((question) => (
                                    <li key={question.id} className="QS-Carousel-Item">
                                        <div className="QS-Carousel-Content">
                                            <h2 className="QS-Carousel-Title">
                                                Question {question.id}
                                            </h2>
                                            <span className="QS-Logo-Text-Wrapper">
                                                <img src={StudyPalLogoYPNG} style={{ width: "15px", height: "30px" }} />
                                                <p className="QS-Carousel-Question">{question.question}</p>
                                            </span>
                                            <div className="QS-Carousel-Options">
                                                {question.options.map((option, optionIndex) => (
                                                    <button
                                                        key={optionIndex}
                                                        className="QS-Carousel-Options-Button"
                                                        onClick={() => handleOptionSelect(question.id, optionIndex)}
                                                        style={{
                                                            backgroundColor: selectedOptions[question.id]?.optionIndex === optionIndex ? '#BA1718' : '#FFC9C9',
                                                            color: selectedOptions[question.id]?.optionIndex === optionIndex ? 'white' : '#BA1718'
                                                        }}
                                                    >
                                                        {option.text}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="QS-Carousel-Button QS-Carousel-Button--previous"
                                onClick={() => handleClick('previous')}
                                disabled={isNavigating || currentQuestion === 1}
                            >
                                <ChevronLeft size={30} />
                            </button>
                            <button
                                className="QS-Carousel-Button QS-Carousel-Button--next"
                                onClick={() => handleClick('next')}
                                disabled={isNavigating || currentQuestion === 40}
                            >
                                <ChevronRight size={30} />
                            </button>

                        </div>

                        <div className="QS-Submit-Container" style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}>
                            <button
                                className="SSP-Start-Button"
                                onClick={handleSubmit}

                            >
                                Submit Answers
                            </button>
                        </div>
                    </>
                ) : (
                    renderTieBreaker()
                )}
            </div>
        </div>
    );
};

export default QuestionSection;