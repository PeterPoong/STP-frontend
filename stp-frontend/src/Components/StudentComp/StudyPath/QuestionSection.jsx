import React, { useRef, useState } from 'react';
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
const questions = [
    // Realistic Questions (7)
    {
        id: 1,
        type: 'Realistic',
        question: "I enjoy working with tools and machines",
        options: Object.values(OPTIONS)
    },
    {
        id: 2,
        type: 'Realistic',
        question: "I like to build or fix things with my hands",
        options: Object.values(OPTIONS)
    },
    {
        id: 3,
        type: 'Realistic',
        question: "I prefer hands-on activities over theoretical discussions",
        options: Object.values(OPTIONS)
    },
    {
        id: 4,
        type: 'Realistic',
        question: "I enjoy working outdoors",
        options: Object.values(OPTIONS)
    },
    {
        id: 5,
        type: 'Realistic',
        question: "I like to solve mechanical problems",
        options: Object.values(OPTIONS)
    },
    {
        id: 6,
        type: 'Realistic',
        question: "I enjoy working with physical materials (wood, metal, etc.)",
        options: Object.values(OPTIONS)
    },
    {
        id: 7,
        type: 'Realistic',
        question: "I prefer practical, concrete solutions to problems",
        options: Object.values(OPTIONS)
    },

    // Investigative Questions (7)
    {
        id: 8,
        type: 'Investigative',
        question: "I enjoy solving complex problems",
        options: Object.values(OPTIONS)
    },
    {
        id: 9,
        type: 'Investigative',
        question: "I like to analyze data and information",
        options: Object.values(OPTIONS)
    },
    {
        id: 10,
        type: 'Investigative',
        question: "I enjoy conducting research",
        options: Object.values(OPTIONS)
    },
    {
        id: 11,
        type: 'Investigative',
        question: "I like to explore scientific theories",
        options: Object.values(OPTIONS)
    },
    {
        id: 12,
        type: 'Investigative',
        question: "I enjoy learning about new scientific discoveries",
        options: Object.values(OPTIONS)
    },
    {
        id: 13,
        type: 'Investigative',
        question: "I like to perform experiments and tests",
        options: Object.values(OPTIONS)
    },
    {
        id: 14,
        type: 'Investigative',
        question: "I enjoy solving mathematical problems",
        options: Object.values(OPTIONS)
    },

    // Artistic Questions (7)
    {
        id: 15,
        type: 'Artistic',
        question: "I enjoy expressing myself creatively",
        options: Object.values(OPTIONS)
    },
    {
        id: 16,
        type: 'Artistic',
        question: "I like to think of new ways to do things",
        options: Object.values(OPTIONS)
    },
    {
        id: 17,
        type: 'Artistic',
        question: "I enjoy artistic activities (drawing, music, etc.)",
        options: Object.values(OPTIONS)
    },
    {
        id: 18,
        type: 'Artistic',
        question: "I like to work in unstructured situations",
        options: Object.values(OPTIONS)
    },
    {
        id: 19,
        type: 'Artistic',
        question: "I enjoy designing things",
        options: Object.values(OPTIONS)
    },
    {
        id: 20,
        type: 'Artistic',
        question: "I like to express myself through writing",
        options: Object.values(OPTIONS)
    },
    {
        id: 21,
        type: 'Artistic',
        question: "I enjoy creating original works",
        options: Object.values(OPTIONS)
    },

    // Social Questions (7)
    {
        id: 22,
        type: 'Social',
        question: "I enjoy helping others learn new things",
        options: Object.values(OPTIONS)
    },
    {
        id: 23,
        type: 'Social',
        question: "I like to work in group settings",
        options: Object.values(OPTIONS)
    },
    {
        id: 24,
        type: 'Social',
        question: "I enjoy counseling or advising others",
        options: Object.values(OPTIONS)
    },
    {
        id: 25,
        type: 'Social',
        question: "I like to teach or train people",
        options: Object.values(OPTIONS)
    },
    {
        id: 26,
        type: 'Social',
        question: "I enjoy participating in group discussions",
        options: Object.values(OPTIONS)
    },
    {
        id: 27,
        type: 'Social',
        question: "I like to help people solve their problems",
        options: Object.values(OPTIONS)
    },
    {
        id: 28,
        type: 'Social',
        question: "I enjoy working with diverse groups of people",
        options: Object.values(OPTIONS)
    },

    // Enterprising Questions (6)
    {
        id: 29,
        type: 'Enterprising',
        question: "I enjoy leading and directing others",
        options: Object.values(OPTIONS)
    },
    {
        id: 30,
        type: 'Enterprising',
        question: "I like to persuade or influence others",
        options: Object.values(OPTIONS)
    },
    {
        id: 31,
        type: 'Enterprising',
        question: "I enjoy selling things or promoting ideas",
        options: Object.values(OPTIONS)
    },
    {
        id: 32,
        type: 'Enterprising',
        question: "I like to start and carry out projects",
        options: Object.values(OPTIONS)
    },
    {
        id: 33,
        type: 'Enterprising',
        question: "I enjoy making business decisions",
        options: Object.values(OPTIONS)
    },
    {
        id: 34,
        type: 'Enterprising',
        question: "I like to take risks in business ventures",
        options: Object.values(OPTIONS)
    },

    // Conventional Questions (6)
    {
        id: 35,
        type: 'Conventional',
        question: "I enjoy organizing and managing information",
        options: Object.values(OPTIONS)
    },
    {
        id: 36,
        type: 'Conventional',
        question: "I like to follow clearly defined procedures",
        options: Object.values(OPTIONS)
    },
    {
        id: 37,
        type: 'Conventional',
        question: "I enjoy working with numbers and records",
        options: Object.values(OPTIONS)
    },
    {
        id: 38,
        type: 'Conventional',
        question: "I like to pay attention to detail",
        options: Object.values(OPTIONS)
    },
    {
        id: 39,
        type: 'Conventional',
        question: "I enjoy creating and maintaining orderly systems",
        options: Object.values(OPTIONS)
    },
    {
        id: 40,
        type: 'Conventional',
        question: "I like to follow established rules and policies",
        options: Object.values(OPTIONS)
    }
];

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


    const handleSubmit = () => {
        // Check if all questions are answered
        if (answeredQuestions.size < 40) {
            alert("Please answer all questions before submitting!");
            return;
        }

       // console.log("--- RIASEC Test Results ---");
       // console.log("Raw Answers:", selectedOptions);

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

       // console.log("\nDetailed Scores by Type:", typeScores);

        // Calculate percentages for each type
        const finalScores = Object.entries(typeScores).reduce((acc, [type, scores]) => {
            const maxPossibleScore = scores.count * 6; // 6 is max score per question
            const percentage = (scores.total / maxPossibleScore) * 100;
            acc[type] = Math.round(percentage);
            return acc;
        }, {});

        //console.log("\nFinal RIASEC Percentages:", finalScores);

        // Calculate average scores per type
        const averageScores = Object.entries(typeScores).reduce((acc, [type, scores]) => {
            acc[type] = {
                average: (scores.total / scores.count).toFixed(2),
                total: scores.total,
                maxPossible: scores.count * 6,
                numberOfQuestions: scores.count
            };
            return acc;
        }, {});

      // console.log("\nDetailed Analysis per Type:");
        Object.entries(averageScores).forEach(([type, data]) => {
          //  console.log(`${type}:`);
           // console.log(`  - Average Score per Question: ${data.average} out of 6`);
           // console.log(`  - Total Score: ${data.total} out of ${data.maxPossible}`);
            //console.log(`  - Number of Questions: ${data.numberOfQuestions}`);
        });

        // Sort types by percentage to get ranking
        const typeRanking = Object.entries(finalScores)
            .sort(([, a], [, b]) => b - a)
            .reduce((acc, [type, score], index) => {
                acc[index + 1] = { type, score };
                return acc;
            }, {});

        //console.log("\nRIASEC Type Ranking:");
       // Object.entries(typeRanking).forEach(([rank, data]) => {
       //     console.log(`${rank}. ${data.type}: ${data.score}%`);
      //  });

        // Format answers with both individual responses and calculated scores
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
            ranking: typeRanking
        };

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

        //console.log('Debug info:', {
        //    questionNumber,
        //    actualItemWidth,
        //    containerWidth,
        //    totalWidth,
        //   rawPosition: (questionNumber - 1) * actualItemWidth,
        //    adjustedPosition: targetPosition,
        //    currentScroll: listRef.current?.scrollLeft
        //});

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

                //console.log('Position check:', {
                //    expected: targetPosition,
                //    actual: finalPosition,
                //    difference,
                //   questionNumber
                //});

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
                        {getCurrentQuote() && (
                            <div key={currentQuestion} className="QS-Motivation-Quote">
                                {getCurrentQuote()}
                            </div>
                        )}
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
            </div>
        </div>
    );
};

export default QuestionSection;