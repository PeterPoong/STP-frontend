import React, { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import "../../../css/StudentPortalStyles/StudentStudyPath.css";
import StudyPalLogoYPNG from "../../../assets/StudentPortalAssets/studypalLogoYPNG.png"

const questions = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    question: "I feel energized when working in groups",
    options: [
        "Strongly Agree",
        "Agree",
        "Slightly Agree",
        "Slightly Disagree",
        "Disagree",
        "Strongly Disagree"
    ]
}));

const motivationalQuotes = [
    { threshold: 10, text: "You're Doing Great!" },
    { threshold: 20, text: "Halfway There! Keep Going!" },
    { threshold: 30, text: "Almost Done! You're Amazing!" },
    { threshold: 39, text: "Last One! You Can Do It!" }
];

const QuestionSection = ({onAnswer}) => {
    const listRef = useRef(null);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showQuestionList, setShowQuestionList] = useState(false);
    const [showDropdown, setShowDropdown] = useState(null);
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isNavigating, setIsNavigating] = useState(false);


    const handleSubmit = () => {
        // Check if all questions are answered
        if (answeredQuestions.size < 40) {
            alert("Please answer all questions before submitting!");
            return;
        }

        // Convert selectedOptions to the format expected by the parent component
        const formattedAnswers = Object.entries(selectedOptions).reduce((acc, [questionId, optionIndex]) => {
            acc[questionId] = {
                questionId: parseInt(questionId),
                answer: questions[parseInt(questionId) - 1].options[optionIndex]
            };
            return acc;
        }, {});

        // Call the parent component's onAnswer function with the formatted answers
        onAnswer(formattedAnswers);
    };


    const handleClick = (direction) => {
        if (listRef.current && !isNavigating) {
            setIsNavigating(true);
            const itemWidth = 800;
            const newQuestion = direction === 'previous'
                ? Math.max(1, currentQuestion - 1)
                : Math.min(40, currentQuestion + 1);

            setCurrentQuestion(newQuestion);
            listRef.current.scrollBy({
                left: direction === 'previous' ? -itemWidth : itemWidth,
                behavior: 'smooth'
            });

            // Reset navigation lock after animation completes
            setTimeout(() => {
                setIsNavigating(false);
            }, 500);
        }
    };
    const getCurrentQuote = () => {
        const quote = motivationalQuotes
            .find(q => currentQuestion <= q.threshold);
        return quote ? quote.text : "";
    };

    const handleOptionSelect = (questionId, optionIndex) => {
        setAnsweredQuestions(prev => new Set(prev).add(questionId));
        setSelectedOptions(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const jumpToQuestion = (questionNumber) => {
        // Get the first carousel item to check its actual width including margins
        const firstItem = listRef.current?.querySelector('.QS-Carousel-Item');
        const itemStyle = firstItem ? window.getComputedStyle(firstItem) : null;
        const actualItemWidth = itemStyle ?
            firstItem.offsetWidth +
            parseInt(itemStyle.marginLeft) +
            parseInt(itemStyle.marginRight) : 800;

        // Get container dimensions
        const containerWidth = listRef.current?.offsetWidth;
        const totalWidth = listRef.current?.scrollWidth;
        const totalQuestions = 40;

        // Calculate the position without offset first
        let targetPosition = (questionNumber - 1) * actualItemWidth;

        // Special handling for edge cases
        if (questionNumber === 1) {
            targetPosition = 0;  // Always start at 0 for first question
        } else if (questionNumber === totalQuestions) {
            targetPosition = totalWidth - containerWidth;  // Align to end for last question
        } else {
            // For questions 2 through 39, adjust position to center the current question
            targetPosition = targetPosition - (containerWidth - actualItemWidth) / 2;

            // Ensure we don't scroll past the bounds
            if (targetPosition < 0) {
                targetPosition = 0;
            } else if (targetPosition > totalWidth - containerWidth) {
                targetPosition = totalWidth - containerWidth;
            }
        }

        console.log('Debug info:', {
            questionNumber,
            actualItemWidth,
            containerWidth,
            totalWidth,
            rawPosition: (questionNumber - 1) * actualItemWidth,
            adjustedPosition: targetPosition,
            currentScroll: listRef.current?.scrollLeft
        });

        setCurrentQuestion(questionNumber);

        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
            listRef.current?.scrollTo({
                left: targetPosition,
                behavior: 'smooth'
            });

            // Verify final position after animation
            setTimeout(() => {
                const finalPosition = listRef.current?.scrollLeft;
                const difference = Math.abs(targetPosition - finalPosition);

                console.log('Position check:', {
                    expected: targetPosition,
                    actual: finalPosition,
                    difference,
                    questionNumber
                });

                // Only correct if significantly off
                if (difference > 50) {
                    listRef.current?.scrollTo({
                        left: targetPosition,
                        behavior: 'auto'
                    });
                }
            }, 1000);
        });

        setShowQuestionList(false);
        setShowDropdown(null);
    };
    return (
        <div className="QS-Container">
            <div className="QS-Assessment-Container">
                <div className="QS-Title-Container">
                    <h1 className="QS-Title">Career Interest Assessment</h1>
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
                        <div className="QS-Motivation-Quote">{getCurrentQuote()}</div>
                    </div>
                </div>
                <div className="QS-Carousel-List-Wrapper">
                    <ul className="QS-Carousel-List" ref={listRef}>
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
                                                    backgroundColor: selectedOptions[question.id] === optionIndex ? '#BA1718' : '#FFC9C9',
                                                    color: selectedOptions[question.id] === optionIndex ? 'white' : '#BA1718'
                                                }}
                                            >
                                                {option}
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

                    <div className="QS-Submit-Container" style={{
                        display: 'flex',
                        justifyContent: 'flexend',
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
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;