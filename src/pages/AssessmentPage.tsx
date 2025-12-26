import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Database, Settings, Target, User, Send, CheckCircle } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';

const industries = [
    'Technology & Software',
    'Financial Services',
    'Healthcare',
    'Manufacturing',
    'Retail & E-commerce',
    'Professional Services',
    'Education',
    'Real Estate',
    'Media & Entertainment',
    'Other',
];

const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees',
];

const dataStorageOptions = [
    'Cloud-based',
    'On-premise',
    'Hybrid (Cloud + On-premise)',
    'Not sure',
];

const dataVolumes = [
    'Less than 1 GB',
    '1 GB - 100 GB',
    '100 GB - 1 TB',
    '1 TB - 10 TB',
    'More than 10 TB',
];

const currentTools = [
    'Excel/Spreadsheets',
    'Google Analytics',
    'CRM (Salesforce, HubSpot, etc.)',
    'ERP Systems',
    'Business Intelligence Tools',
    'Custom Databases',
    'Cloud Data Platforms',
    'None of the above',
];

const dataChallenges = [
    'Data scattered across multiple systems',
    'Poor data quality or inconsistency',
    'Lack of real-time insights',
    'Manual reporting processes',
    'Difficulty in data integration',
    'Security and compliance concerns',
    'Limited analytics capabilities',
    'Unclear data strategy',
];

const businessGoals = [
    'Improve decision-making speed',
    'Automate manual processes',
    'Better understand customer behavior',
    'Reduce operational costs',
    'Enhance data security',
    'Enable predictive analytics',
    'Streamline reporting',
    'Scale data infrastructure',
];

const timelines = [
    'Immediate (within 1 month)',
    'Short-term (1-3 months)',
    'Medium-term (3-6 months)',
    'Long-term (6+ months)',
    'Just exploring options',
];

const AssessmentPage = () => {
    const [formData, setFormData] = useState({
        // Company Info
        companyName: '',
        industry: '',
        companySize: '',
        website: '',
        // Data Infrastructure
        dataStorage: '',
        dataVolume: '',
        dataSources: '',
        currentTools: [] as string[],
        // Business Maturity
        automationLevel: 3,
        dataDecisionMaking: 3,
        reportingFrequency: '',
        kpiTracking: '',
        // Pain Points & Goals
        challenges: [] as string[],
        goals: [] as string[],
        timeline: '',
        // Contact
        contactName: '',
        email: '',
        phone: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (field: 'currentTools' | 'challenges' | 'goals', value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter((item) => item !== value)
                : [...prev[field], value],
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Frontend only - just show success state
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 flex items-center justify-center px-6">
                <AnimatedBackground />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center max-w-md"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald/10 flex items-center justify-center"
                    >
                        <CheckCircle className="w-12 h-12 text-emerald" />
                    </motion.div>
                    <h1 className="text-3xl font-serif font-bold text-slate-800 dark:text-white mb-4">
                        Assessment Submitted!
                    </h1>
                    <p className="text-slate-600 dark:text-white/70 mb-8">
                        Thank you for completing the business assessment. Our team will analyze your responses and reach out within 24-48 hours with personalized insights.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-white font-medium hover:bg-coral/90 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 py-20 px-6 relative">
            <AnimatedBackground />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
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
                        Business Data <span className="gradient-text">Assessment</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-white/70 max-w-2xl">
                        Help us understand your current data landscape and business processes. This assessment will help us provide tailored recommendations for your digital transformation journey.
                    </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Section 1: Company Information */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="icon-container !w-12 !h-12">
                                <Building2 className="w-6 h-6 text-violet" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Company Information</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                    placeholder="Enter your company name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Industry *
                                </label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                >
                                    <option value="">Select your industry</option>
                                    {industries.map((ind) => (
                                        <option key={ind} value={ind}>{ind}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Company Size *
                                </label>
                                <select
                                    name="companySize"
                                    value={formData.companySize}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                >
                                    <option value="">Select company size</option>
                                    {companySizes.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleInputChange}
                                    className="input-field"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 2: Data Infrastructure */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="icon-container !w-12 !h-12">
                                <Database className="w-6 h-6 text-cyan" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Current Data Infrastructure</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                        Primary Data Storage *
                                    </label>
                                    <select
                                        name="dataStorage"
                                        value={formData.dataStorage}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">Select storage type</option>
                                        {dataStorageOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                        Estimated Data Volume
                                    </label>
                                    <select
                                        name="dataVolume"
                                        value={formData.dataVolume}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    >
                                        <option value="">Select data volume</option>
                                        {dataVolumes.map((vol) => (
                                            <option key={vol} value={vol}>{vol}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-3">
                                    Current Tools & Platforms (Select all that apply)
                                </label>
                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                                    {currentTools.map((tool) => (
                                        <label
                                            key={tool}
                                            className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.currentTools.includes(tool)
                                                    ? 'bg-violet/10 border-violet/30 dark:bg-violet/20'
                                                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-violet/30'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.currentTools.includes(tool)}
                                                onChange={() => handleCheckboxChange('currentTools', tool)}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${formData.currentTools.includes(tool)
                                                    ? 'bg-violet border-violet'
                                                    : 'border-slate-300 dark:border-white/30'
                                                }`}>
                                                {formData.currentTools.includes(tool) && (
                                                    <CheckCircle className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                            <span className="text-sm text-slate-700 dark:text-white/80">{tool}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 3: Business Process Maturity */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="icon-container !w-12 !h-12">
                                <Settings className="w-6 h-6 text-coral" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Business Process Maturity</h2>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-4">
                                    Process Automation Level: <span className="text-coral font-bold">{formData.automationLevel}/5</span>
                                </label>
                                <input
                                    type="range"
                                    name="automationLevel"
                                    min="1"
                                    max="5"
                                    value={formData.automationLevel}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-coral"
                                />
                                <div className="flex justify-between text-xs text-slate-500 dark:text-white/50 mt-2">
                                    <span>Mostly Manual</span>
                                    <span>Fully Automated</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-4">
                                    Data-Driven Decision Making: <span className="text-violet font-bold">{formData.dataDecisionMaking}/5</span>
                                </label>
                                <input
                                    type="range"
                                    name="dataDecisionMaking"
                                    min="1"
                                    max="5"
                                    value={formData.dataDecisionMaking}
                                    onChange={handleInputChange}
                                    className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet"
                                />
                                <div className="flex justify-between text-xs text-slate-500 dark:text-white/50 mt-2">
                                    <span>Intuition-based</span>
                                    <span>Fully Data-driven</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                        Reporting Frequency
                                    </label>
                                    <select
                                        name="reportingFrequency"
                                        value={formData.reportingFrequency}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    >
                                        <option value="">Select frequency</option>
                                        <option value="real-time">Real-time</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                        KPI Tracking Maturity
                                    </label>
                                    <select
                                        name="kpiTracking"
                                        value={formData.kpiTracking}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    >
                                        <option value="">Select maturity level</option>
                                        <option value="none">No formal KPIs</option>
                                        <option value="basic">Basic KPIs defined</option>
                                        <option value="advanced">Advanced dashboards</option>
                                        <option value="predictive">Predictive analytics</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 4: Pain Points & Goals */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="icon-container !w-12 !h-12">
                                <Target className="w-6 h-6 text-emerald" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Pain Points & Goals</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-3">
                                    Biggest Data Challenges (Select all that apply)
                                </label>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {dataChallenges.map((challenge) => (
                                        <label
                                            key={challenge}
                                            className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.challenges.includes(challenge)
                                                    ? 'bg-coral/10 border-coral/30 dark:bg-coral/20'
                                                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-coral/30'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.challenges.includes(challenge)}
                                                onChange={() => handleCheckboxChange('challenges', challenge)}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${formData.challenges.includes(challenge)
                                                    ? 'bg-coral border-coral'
                                                    : 'border-slate-300 dark:border-white/30'
                                                }`}>
                                                {formData.challenges.includes(challenge) && (
                                                    <CheckCircle className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                            <span className="text-sm text-slate-700 dark:text-white/80">{challenge}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-3">
                                    Primary Goals (Select all that apply)
                                </label>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {businessGoals.map((goal) => (
                                        <label
                                            key={goal}
                                            className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.goals.includes(goal)
                                                    ? 'bg-emerald/10 border-emerald/30 dark:bg-emerald/20'
                                                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-emerald/30'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.goals.includes(goal)}
                                                onChange={() => handleCheckboxChange('goals', goal)}
                                                className="sr-only"
                                            />
                                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${formData.goals.includes(goal)
                                                    ? 'bg-emerald border-emerald'
                                                    : 'border-slate-300 dark:border-white/30'
                                                }`}>
                                                {formData.goals.includes(goal) && (
                                                    <CheckCircle className="w-3 h-3 text-white" />
                                                )}
                                            </div>
                                            <span className="text-sm text-slate-700 dark:text-white/80">{goal}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Timeline for Improvement
                                </label>
                                <select
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleInputChange}
                                    className="input-field max-w-md"
                                >
                                    <option value="">Select timeline</option>
                                    {timelines.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.section>

                    {/* Section 5: Contact Information */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="icon-container !w-12 !h-12">
                                <User className="w-6 h-6 text-violet" />
                            </div>
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Contact Information</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="contactName"
                                    value={formData.contactName}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                    placeholder="john@company.com"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 dark:text-white/80 mb-2">
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="input-field max-w-md"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>
                    </motion.section>

                    {/* Submit Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex justify-center"
                    >
                        <button
                            type="submit"
                            className="px-10 py-4 rounded-full bg-coral text-white font-semibold text-lg flex items-center gap-3 hover:bg-coral/90 hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <Send className="w-5 h-5" />
                            Submit Assessment
                        </button>
                    </motion.div>
                </form>
            </div>
        </div>
    );
};

export default AssessmentPage;
