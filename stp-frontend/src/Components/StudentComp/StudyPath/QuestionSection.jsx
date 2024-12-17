import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import "../../../css/StudentPortalStyles/StudentStudyPath.css"

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

const QuestionSection = () => {
    const listRef = useRef(null);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [showQuestionList, setShowQuestionList] = useState(false);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

    const handleClick = (direction) => {
        if (listRef.current) {
            const itemWidth = 800;
            const newQuestion = direction === 'previous'
                ? Math.max(1, currentQuestion - 1)
                : Math.min(40, currentQuestion + 1);

            setCurrentQuestion(newQuestion);
            listRef.current.scrollBy({
                left: direction === 'previous' ? -itemWidth : itemWidth,
                behavior: 'smooth'
            });
        }
    };

    const getCurrentQuote = () => {
        const quote = motivationalQuotes
            .find(q => currentQuestion <= q.threshold);
        return quote ? quote.text : "";
    };

    const handleOptionSelect = (questionId) => {
        setAnsweredQuestions(prev => new Set(prev).add(questionId));
    };

    const jumpToQuestion = (questionNumber) => {
        const itemWidth = 800;
        const diff = questionNumber - currentQuestion;

        setCurrentQuestion(questionNumber);
        listRef.current.scrollBy({
            left: itemWidth * diff,
            behavior: 'smooth'
        });
        setShowQuestionList(false);
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
                            <span className="QS-Current-Question">
                                Question {currentQuestion}/40
                                {answeredQuestions.has(currentQuestion) && (
                                    <Check size={18} className="QS-Check-Icon" />
                                )}
                            </span>
                            <div
                                className="QS-Progress-Indicator"
                                onClick={() => setShowQuestionList(!showQuestionList)}
                            >
                                {Array.from({ length: 40 }, (_, i) => (
                                    <div
                                        key={i}
                                        className={`QS-Progress-Dot ${i + 1 === currentQuestion ? 'active' : ''} 
                    ${answeredQuestions.has(i + 1) ? 'answered' : ''}`}
                                    />
                                ))}
                                {showQuestionList && (
                                    <div className="QS-Question-List">
                                        {Array.from({ length: 40 }, (_, i) => (
                                            <div
                                                key={i}
                                                className={`QS-Question-Item ${i + 1 === currentQuestion ? 'current' : ''}`}
                                                onClick={() => jumpToQuestion(i + 1)}
                                            >
                                                Question {i + 1}
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                                    <h2 className="QS-Carousel-Title">Question {question.id}</h2>
                                    <p className="QS-Carousel-Question">{question.question}</p>
                                    <div className="QS-Carousel-Options">
                                        {question.options.map((option, optionIndex) => (
                                            <button key={optionIndex} className="QS-Carousel-Options-Button">
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
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        className="QS-Carousel-Button QS-Carousel-Button--next"
                        onClick={() => handleClick('next')}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;