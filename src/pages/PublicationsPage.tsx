import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User, BookOpen, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { blogPosts } from '../data/blogPosts';
import AnimatedBackground from '../components/AnimatedBackground';

const categories = ['All', 'AI & Automation', 'Data Science', 'Digital Transformation', 'Machine Learning', 'Data Governance', 'Analytics'];

const PublicationsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 py-20 px-6 relative">
            <AnimatedBackground />

            <div className="relative z-10 max-w-6xl mx-auto">
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
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-violet/10 dark:bg-violet/20 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-violet" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 dark:text-white">
                            All <span className="gradient-text">Publications</span>
                        </h1>
                    </div>
                    <p className="text-lg text-slate-600 dark:text-white/70 max-w-2xl">
                        Insights, trends, and thought leadership from our experts. Explore our latest articles on AI, data science, and digital transformation.
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 mb-10"
                >
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search publications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-12"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 flex-wrap">
                            <Filter className="w-5 h-5 text-slate-500 dark:text-white/50" />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-coral text-white'
                                            : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/20'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Results count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-500 dark:text-white/50 mb-6"
                >
                    Showing {filteredPosts.length} publication{filteredPosts.length !== 1 ? 's' : ''}
                </motion.p>

                {/* Publications Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <Link
                                to={`/publications/${post.slug}`}
                                className="group block h-full"
                            >
                                <div className="glass-card glass-card-hover shine-effect overflow-hidden h-full flex flex-col">
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-violet shadow-lg">
                                                {post.category}
                                            </span>
                                            {post.featured && (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-coral shadow-lg">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/50 mb-3">
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-3 group-hover:text-coral transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-sm text-slate-600 dark:text-white/60 mb-4 leading-relaxed flex-grow line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-slate-700 dark:text-white/80 block">
                                                        {post.author}
                                                    </span>
                                                    <span className="text-xs text-slate-500 dark:text-white/50">
                                                        {post.authorRole}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm font-medium text-coral">
                                                Read
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* No results */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <BookOpen className="w-16 h-16 mx-auto text-slate-300 dark:text-white/20 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-white mb-2">No publications found</h3>
                        <p className="text-slate-500 dark:text-white/50">Try adjusting your search or filter criteria</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PublicationsPage;
