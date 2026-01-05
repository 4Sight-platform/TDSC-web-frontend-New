import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle,
    ChevronRight,
    Database,
    BarChart2,
    Brain,
    Shield,
    PieChart,
    RefreshCw
} from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

// --- Assessment Data Structure ---

type Option = {
    label: string;
    score: number;
};

type Question = {
    id: string;
    text: string;
    info?: string;
    options: Option[];
};

type Section = {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    questions: Question[];
};

const assessmentData: Section[] = [
    {
        id: 'A',
        title: 'Data Sources & Coverage',
        description: 'What data enters the organization, and how broad is it?',
        icon: Database,
        color: 'text-violet',
        questions: [
            {
                id: 'q1',
                text: 'What types of data does your business actively collect?',
                info: 'This checks whether your data reflects just you or the market around you.',
                options: [
                    { label: 'Only internal operations (sales, finance, ops)', score: 0 },
                    { label: 'Internal + customer interactions', score: 1 },
                    { label: 'Internal + customer + external market/competition data', score: 2 },
                    { label: 'Internal + customer + ecosystem/partner + external data', score: 3 },
                ]
            },
            {
                id: 'q2',
                text: 'How is most data collected?',
                options: [
                    { label: 'Manual entry', score: 0 },
                    { label: 'Mix of manual and automated', score: 1 },
                    { label: 'Mostly automated', score: 2 },
                    { label: 'Fully automated, system-generated', score: 3 },
                ]
            },
            {
                id: 'q3',
                text: 'How frequently is new data generated?',
                options: [
                    { label: 'Occasional', score: 0 },
                    { label: 'Daily', score: 1 },
                    { label: 'Multiple times per day', score: 2 },
                    { label: 'Continuous / real-time', score: 3 },
                ]
            },
            {
                id: 'q4',
                text: 'Who owns and controls this data?',
                options: [
                    { label: 'Mostly third-party platforms', score: 0 },
                    { label: 'Shared ownership', score: 1 },
                    { label: 'Mostly owned by us', score: 2 },
                    { label: 'Fully owned, portable, and reusable', score: 3 },
                ]
            }
        ]
    },
    {
        id: 'B',
        title: 'Data Integration & Foundations',
        description: 'Is data fragmented, or does it behave like a system?',
        icon: BarChart2,
        color: 'text-cyan',
        questions: [
            {
                id: 'q5',
                text: 'Is there a central place where business data is stored and reused?',
                info: 'This is the MDM / Data Lake capability — without naming it.',
                options: [
                    { label: 'No', score: 0 },
                    { label: 'Multiple disconnected places', score: 1 },
                    { label: 'Mostly centralized', score: 2 },
                    { label: 'Clearly centralized and structured', score: 3 },
                ]
            },
            {
                id: 'q6',
                text: 'Can data from different systems be combined easily?',
                options: [
                    { label: 'No', score: 0 },
                    { label: 'Manually', score: 1 },
                    { label: 'Semi-automated', score: 2 },
                    { label: 'Fully integrated', score: 3 },
                ]
            },
            {
                id: 'q7',
                text: 'Do teams trust the data they see?',
                options: [
                    { label: 'No', score: 0 },
                    { label: 'Low trust', score: 1 },
                    { label: 'Mostly trust', score: 2 },
                    { label: 'High trust', score: 3 },
                ]
            },
            {
                id: 'q8',
                text: 'How often do data inconsistencies affect decisions?',
                options: [
                    { label: 'Very often', score: 0 },
                    { label: 'Sometimes', score: 1 },
                    { label: 'Rarely', score: 2 },
                    { label: 'Almost never', score: 3 },
                ]
            },
            {
                id: 'q9',
                text: 'How far back does usable historical data go?',
                options: [
                    { label: 'Little or none', score: 0 },
                    { label: 'Few months', score: 1 },
                    { label: '1–2 years', score: 2 },
                    { label: 'Multiple years, well maintained', score: 3 },
                ]
            }
        ]
    },
    {
        id: 'C',
        title: 'Data Usage in Decisions',
        description: 'Does data actually change behavior?',
        icon: Brain,
        color: 'text-coral',
        questions: [
            {
                id: 'q10',
                text: 'When key decisions are made, data is:',
                options: [
                    { label: 'Not used', score: 0 },
                    { label: 'Used after decisions', score: 1 },
                    { label: 'Used alongside judgment', score: 2 },
                    { label: 'Required beforehand', score: 3 },
                ]
            },
            {
                id: 'q11',
                text: 'Are KPIs linked to clear actions?',
                options: [
                    { label: 'No', score: 0 },
                    { label: 'Weakly', score: 1 },
                    { label: 'Mostly', score: 2 },
                    { label: 'Explicitly (thresholds → actions)', score: 3 },
                ]
            },
            {
                id: 'q12',
                text: 'How often do insights lead to process or strategy changes?',
                options: [
                    { label: 'Rarely', score: 0 },
                    { label: 'Occasionally', score: 1 },
                    { label: 'Often', score: 2 },
                    { label: 'Consistently', score: 3 },
                ]
            },
            {
                id: 'q13',
                text: 'Do teams test or experiment based on data?',
                options: [
                    { label: 'Never', score: 0 },
                    { label: 'Rarely', score: 1 },
                    { label: 'Regularly', score: 2 },
                    { label: 'Core operating method', score: 3 },
                ]
            },
            {
                id: 'q14',
                text: 'Can business outcomes be traced back to data-based decisions?',
                options: [
                    { label: 'No', score: 0 },
                    { label: 'Roughly', score: 1 },
                    { label: 'Partially', score: 2 },
                    { label: 'Clearly', score: 3 },
                ]
            },
            {
                id: 'q15',
                text: 'Does data influence long-term planning and strategy?',
                options: [
                    { label: 'No', score: 0 },
                    { label: 'Slightly', score: 1 },
                    { label: 'Significantly', score: 2 },
                    { label: 'Core driver', score: 3 },
                ]
            }
        ]
    },
    {
        id: 'D',
        title: 'Governance, Learning & Scale',
        description: 'Does the system learn and improve?',
        icon: Shield,
        color: 'text-emerald',
        questions: [
            {
                id: 'q16',
                text: 'Is someone accountable for data quality and definitions?',
                options: [
                    { label: 'No one', score: 0 },
                    { label: 'IT only', score: 1 },
                    { label: 'Shared ownership', score: 2 },
                    { label: 'Clearly defined owners', score: 3 },
                ]
            },
            {
                id: 'q17',
                text: 'Are outcomes reviewed to improve future decisions?',
                options: [
                    { label: 'Never', score: 0 },
                    { label: 'Occasionally', score: 1 },
                    { label: 'Regularly', score: 2 },
                    { label: 'Systematically', score: 3 },
                ]
            },
            {
                id: 'q18',
                text: 'How critical is data to future competitiveness?',
                options: [
                    { label: 'Not critical', score: 0 },
                    { label: 'Somewhat important', score: 1 },
                    { label: 'Very important', score: 2 },
                    { label: 'Mission-critical', score: 3 },
                ]
            }
        ]
    }
];

// --- Maturity Bands ---

type MaturityLevel = {
    label: string;
    range: [number, number];
    description: string;
    inference: string;
    color: string;
};

const maturityLevels: MaturityLevel[] = [
    {
        label: 'Fragmented',
        range: [0, 15],
        description: 'Data is siloed, decisions are intuition-based, no clear data strategy.',
        inference: 'Your organization is in the early stages of data maturity. Data exists but is often trapped in silos, manually collected, or unreliable. Decisions are largely reactive and intuition-based. To move forward, focus on identifying key data sources, automating basic collection, and establishing a single source of truth for critical business metrics.',
        color: 'text-slate-500' // Grey
    },
    {
        label: 'Operational',
        range: [16, 26],
        description: 'Basic data collection exists, but integration is limited.',
        inference: 'You have established basic data operations. While you collect important data, integrating it into a cohesive view remains a challenge. Reporting is likely manual or retrospective. The next step is to break down silos, automate reporting, and start using data to answer "why" things happened, not just "what" happened.',
        color: 'text-cyan-500' // Cyan
    },
    {
        label: 'Analytical',
        range: [27, 38],
        description: 'Data informs decisions, some automation exists, gaps in governance.',
        inference: 'your organization effectively uses data to understand performance. You have decent integration and trust in your numbers, but predictive capabilities and automated actions may be lacking. To scale, focus on data governance, advanced analytics, and embedding insights directly into operational workflows to drive real-time action.',
        color: 'text-coral' // Coral/Orange
    },
    {
        label: 'Data-Driven',
        range: [39, 48],
        description: 'Strong data foundation, decisions are consistently data-backed.',
        inference: 'Data is a strategic asset for your business. You have strong governance, automated pipelines, and a culture that relies on evidence over intuition. The frontier for you is "Data Native" status—moving from sporadic insights to continuous, AI-driven optimization where the system itself suggests or takes actions to improve outcomes.',
        color: 'text-violet' // Violet
    },
    {
        label: 'Data-Native',
        range: [49, 54],
        description: 'Data is a core competitive advantage, fully integrated, real-time insights.',
        inference: 'Congratulations, you are operating at the peak of data maturity. Data is not just a report you read; it is the nervous system of your enterprise. Your systems learn, adapt, and optimize in real-time. Your focus now should be on maintaining this edge, exploring experimental AI applications, and reshaping your industry through data innovation.',
        color: 'text-emerald-500' // Emerald
    }
];

const AssessmentPage = () => {
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleOptionSelect = (questionId: string, score: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: score }));
    };

    const calculateTotalScore = () => {
        return Object.values(answers).reduce((acc, curr) => acc + curr, 0);
    };

    const getMaturityResult = (score: number) => {
        return maturityLevels.find(level => score >= level.range[0] && score <= level.range[1]) || maturityLevels[0];
    };

    const isComplete = () => {
        let totalQuestions = 0;
        assessmentData.forEach(section => totalQuestions += section.questions.length);
        return Object.keys(answers).length === totalQuestions;
    };

    const handleSubmit = () => {
        if (isComplete()) {
            setIsSubmitted(true);
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const resetAssessment = () => {
        setAnswers({});
        setIsSubmitted(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isSubmitted) {
        const totalScore = calculateTotalScore();
        const result = getMaturityResult(totalScore);

        return (
            <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 py-20 px-6 relative overflow-hidden">
                <AnimatedBackground />

                <div ref={resultRef} className="relative z-10 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 md:p-12 text-center"
                    >
                        <div className="mb-8 flex justify-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-white/5 dark:to-white/10 flex items-center justify-center relative">
                                <PieChart className={`w-12 h-12 ${result.color}`} />
                                <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-slate-200 dark:text-white/10"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 60}
                                        strokeDashoffset={2 * Math.PI * 60 * (1 - totalScore / 54)}
                                        className={`${result.color} transition-all duration-1000 ease-out`}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center pt-2">
                                    <span className={`text-2xl font-bold ${result.color}`}>{totalScore}</span>
                                    <span className="text-xs text-slate-400 absolute mt-6">/ 54</span>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-white/60 mb-2">
                            Your Data Maturity Level
                        </h2>
                        <h1 className={`text-4xl md:text-5xl font-serif font-bold mb-6 ${result.color}`}>
                            {result.label}
                        </h1>

                        <p className="text-xl text-slate-700 dark:text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {result.description}
                        </p>

                        <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 md:p-8 text-left mb-10">
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-violet" />
                                Our Assessment
                            </h3>
                            <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                                {result.inference}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="px-8 py-3 rounded-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-medium hover:bg-slate-700 dark:hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                            <button
                                onClick={resetAssessment}
                                className="px-8 py-3 rounded-full border-2 border-slate-200 dark:border-white/20 text-slate-600 dark:text-white font-medium hover:border-violet/50 hover:bg-violet/5 transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Retake Assessment
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 py-20 px-6 relative">
            <AnimatedBackground />

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-coral transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="accent-line mb-6" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 dark:text-white mb-4">
                        Data Maturity <span className="gradient-text">Evaluator</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-white/70 max-w-2xl">
                        Assess where you stand on the journey to becoming a data-native organization.
                        Answer 18 questions across 4 key dimensions to get your personalized maturity score and insights.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {assessmentData.map((section, sectionIndex) => (
                        <motion.section
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            className="glass-card p-8"
                        >
                            <div className="flex items-start gap-4 mb-8">
                                <div className={`p-3 rounded-2xl bg-${section.color.split('-')[1]}/10 mt-1`}>
                                    <section.icon className={`w-6 h-6 ${section.color}`} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-3">
                                        Section {section.id} — {section.title}
                                        <span className="text-xs font-normal px-2 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-white/50">
                                            {section.questions.length} Questions
                                        </span>
                                    </h2>
                                    <p className="text-slate-500 dark:text-white/60 mt-1">
                                        {section.description}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8 pl-0 md:pl-16">
                                {section.questions.map((question, qIndex) => (
                                    <div key={question.id} className="relative">
                                        <div className="flex items-baseline gap-3 mb-3">
                                            <span className="text-sm font-medium text-slate-400 dark:text-white/40 font-mono">
                                                Q{parseInt(question.id.substring(1))}.
                                            </span>
                                            <div>
                                                <h3 className="text-lg font-medium text-slate-800 dark:text-white">
                                                    {question.text}
                                                </h3>
                                                {question.info && (
                                                    <p className="text-sm text-slate-500 dark:text-white/50 mt-1 italic flex items-center gap-1">
                                                        <span className="inline-block w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center not-italic font-bold">i</span>
                                                        {question.info}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-3 mt-4">
                                            {question.options.map((option) => (
                                                <label
                                                    key={option.label}
                                                    className={`
                                                        relative flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200
                                                        ${answers[question.id] === option.score
                                                            ? 'bg-white shadow-md border-violet/30 dark:bg-white/10 dark:border-white/20'
                                                            : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/10'}
                                                    `}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={question.id}
                                                        value={option.score}
                                                        checked={answers[question.id] === option.score}
                                                        onChange={() => handleOptionSelect(question.id, option.score)}
                                                        className="sr-only"
                                                    />
                                                    <div className={`
                                                        w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors
                                                        ${answers[question.id] === option.score
                                                            ? 'border-violet bg-violet'
                                                            : 'border-slate-300 dark:border-white/30'}
                                                    `}>
                                                        {answers[question.id] === option.score && (
                                                            <div className="w-2 h-2 rounded-full bg-white" />
                                                        )}
                                                    </div>
                                                    <span className={`text-sm ${answers[question.id] === option.score ? 'text-slate-800 dark:text-white font-medium' : 'text-slate-600 dark:text-white/70'}`}>
                                                        {option.label}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="sticky bottom-0 z-20 py-6 mt-8 pointer-events-none"
                >
                    <div className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex items-center justify-between pointer-events-auto max-w-2xl mx-auto">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 dark:text-white/50 uppercase tracking-widest font-semibold mb-1">Progress</span>
                            <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-slate-800 dark:text-white">
                                    {Object.keys(answers).length}
                                </span>
                                <span className="text-sm text-slate-500 dark:text-white/50 mb-1">
                                    / 18 Answered
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!isComplete()}
                            className={`
                                px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all
                                ${isComplete()
                                    ? 'bg-coral text-white hover:bg-coral/90 hover:-translate-y-1 shadow-lg shadow-coral/20 cursor-pointer'
                                    : 'bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-white/30 cursor-not-allowed'}
                            `}
                        >
                            See Results
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AssessmentPage;
