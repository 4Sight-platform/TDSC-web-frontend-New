import { ArrowRight, Clock, User, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const blogPosts = [
    {
        id: 1,
        category: 'AI & Automation',
        title: 'The Future of AI-Powered Business Intelligence',
        excerpt: 'Explore how artificial intelligence is revolutionizing the way businesses make data-driven decisions and gain competitive advantages.',
        author: 'Dr. Sarah Chen',
        readTime: '8 min read',
        date: 'Dec 20, 2024',
        featured: true,
        gradient: 'from-violet to-coral',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    },
    {
        id: 2,
        category: 'Data Science',
        title: 'Building Scalable Data Pipelines: Best Practices',
        excerpt: 'Learn the essential strategies for creating robust and efficient data pipelines that grow with your organization.',
        author: 'Michael Torres',
        readTime: '6 min read',
        date: 'Dec 18, 2024',
        featured: false,
        gradient: 'from-cyan to-violet',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
        id: 3,
        category: 'Digital Transformation',
        title: 'Why Companies Fail at Digital Transformation',
        excerpt: 'Understanding the common pitfalls and how to navigate the complex journey of organizational change.',
        author: 'Emma Williams',
        readTime: '5 min read',
        date: 'Dec 15, 2024',
        featured: false,
        gradient: 'from-coral to-emerald',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
    {
        id: 4,
        category: 'Machine Learning',
        title: 'Demystifying Large Language Models for Enterprise',
        excerpt: 'A practical guide to implementing LLMs in your business workflows without the technical complexity.',
        author: 'Dr. James Liu',
        readTime: '10 min read',
        date: 'Dec 12, 2024',
        featured: false,
        gradient: 'from-emerald to-cyan',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    },
];

const PublicationSection = () => {
    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <section id="publication" className="section-padding relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 transition-colors duration-300" />

            {/* Decorative elements */}
            <div className="orb orb-violet w-80 h-80 -top-20 right-[10%] opacity-10 dark:opacity-20" />
            <div className="orb orb-coral w-64 h-64 bottom-40 left-[5%] opacity-10 dark:opacity-20" />
            <div className="orb orb-cyan w-48 h-48 top-1/2 right-[5%] opacity-10 dark:opacity-15" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="accent-line mx-auto mb-6" />
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet/10 dark:bg-violet/20 mb-6">
                        <BookOpen className="w-4 h-4 text-violet" />
                        <span className="text-sm text-violet font-medium">Our Blog</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 dark:text-white mb-4">
                        Latest <span className="gradient-text">Publications</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-white/60">
                        Insights, trends, and thought leadership from our experts
                    </p>
                </motion.div>

                {/* Featured Post */}
                {featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <div className="glass-card glass-card-hover shine-effect overflow-hidden group cursor-pointer">
                            <div className="grid lg:grid-cols-2 gap-0">
                                {/* Image */}
                                <div className="relative h-64 lg:h-auto overflow-hidden">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${featuredPost.gradient}`}>
                                            Featured
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 lg:p-10 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet/10 dark:bg-violet/20 text-violet">
                                            {featuredPost.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-white/50">
                                            <TrendingUp className="w-3 h-3" />
                                            Trending
                                        </span>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-serif font-bold text-slate-800 dark:text-white mb-4 group-hover:text-coral transition-colors">
                                        {featuredPost.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-white/60 mb-6 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center">
                                                    <User className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700 dark:text-white/80">
                                                    {featuredPost.author}
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-white/50">
                                                <Clock className="w-4 h-4" />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>

                                        <button className="flex items-center gap-2 text-sm font-medium text-coral group-hover:gap-3 transition-all">
                                            Read Article
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {regularPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="glass-card glass-card-hover shine-effect overflow-hidden h-full flex flex-col">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${post.gradient} shadow-lg`}>
                                            {post.category}
                                        </span>
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

                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 group-hover:text-coral transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-sm text-slate-600 dark:text-white/60 mb-4 leading-relaxed line-clamp-3 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan to-violet flex items-center justify-center">
                                                <User className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-xs font-medium text-slate-600 dark:text-white/70">
                                                {post.author}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-400 dark:text-white/40 group-hover:text-coral group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-slate-300 dark:border-white/20 text-slate-700 dark:text-white font-medium hover:border-violet/50 hover:bg-violet/5 dark:hover:bg-white/5 transition-all group">
                        <Sparkles className="w-5 h-5 text-coral" />
                        View All Publications
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default PublicationSection;
