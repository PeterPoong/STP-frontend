// Mock RIASEC test results data
const mockRiasecResults = {
    username: "John Doe",
    results: {
        // Top 3 types with their scores
        topTypes: [
            {
                type: "Investigative",
                percentage: 85,
                score: 85
            },
            {
                type: "Artistic",
                percentage: 75,
                score: 75
            },
            {
                type: "Social",
                percentage: 70,
                score: 70
            }
        ],
        // Raw scores for all types
        scores: {
            Realistic: 65,
            Investigative: 85,
            Artistic: 75,
            Social: 70,
            Enterprising: 60,
            Conventional: 55
        },
        // Strengths for the dominant type (Investigative)
        strengths: [
            "Analytics Thinking",
            "Scientific Mindset",
            "Research Abilities",
            "Problem-solving Skills"
        ],
        // Strength description for the dominant type
        strengthsDesc: "Your curious and analytical mind drives you to understand how and why things work. You excel at solving complex problems and uncovering new insights.",
        // Unique description for the dominant type
        unique: "Your dedication to finding answers and understanding complex systems makes you an excellent researcher and problem solver.",
        // Recommended courses based on the dominant type
        recommendedCourses: [
            {
                name: "Computing & IT",
                id: 10
            },
            {
                name: "Mathematics & Statistics",
                id: 24
            },
            {
                name: "Science",
                id: 31
            },
            {
                name: "Environmental Protection",
                id: 16
            },
            {
                name: "Medicine & Healthcare",
                id: 26
            },
            {
                name: "Pharmacy",
                id: 28
            },
            {
                name: "Dentistry",
                id: 12
            }
        ],
        // Sample recommended universities (empty array as it's fetched separately)
        universities: []
    },
    // Raw answers to individual questions
    answers: {
        responses: {
            // Example responses for first few questions
            1: {
                questionId: 1,
                type: "Realistic",
                answer: "Agree",
                score: 5
            },
            2: {
                questionId: 2,
                type: "Realistic",
                answer: "Slightly Agree",
                score: 4
            }
            // ... more responses
        },
        // Final calculated scores
        scores: {
            Realistic: 65,
            Investigative: 85,
            Artistic: 75,
            Social: 70,
            Enterprising: 60,
            Conventional: 55
        },
        // Final ranking of types
        ranking: {
            1: { type: "Investigative", score: 85 },
            2: { type: "Artistic", score: 75 },
            3: { type: "Social", score: 70 },
            4: { type: "Realistic", score: 65 },
            5: { type: "Enterprising", score: 60 },
            6: { type: "Conventional", score: 55 }
        }
    }
};
