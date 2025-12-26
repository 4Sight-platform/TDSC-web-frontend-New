import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { getPostBySlug, blogPosts } from '../data/blogPosts';
import AnimatedBackground from '../components/AnimatedBackground';

const PublicationDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPostBySlug(slug) : undefined;

    if (!post) {
        return <Navigate to="/publications" replace />;
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900 relative">
            <AnimatedBackground />

            {/* Hero Header */}
            <div className="relative pt-20 pb-12 px-6">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 mb-8">
                            <Link to="/" className="hover:text-coral transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link to="/publications" className="hover:text-coral transition-colors">Publications</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-slate-700 dark:text-white/80 truncate max-w-[200px]">{post.title}</span>
                        </div>

                        {/* Category Badge */}
                        <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium bg-violet/10 dark:bg-violet/20 text-violet mb-6">
                            {post.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 dark:text-white leading-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-slate-600 dark:text-white/70 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="block font-medium text-slate-800 dark:text-white">
                                        {post.author}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-white/50">
                                        {post.authorRole}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-white/50">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 ml-auto">
                                <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                    <Share2 className="w-5 h-5 text-slate-600 dark:text-white/70" />
                                </button>
                                <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                    <Bookmark className="w-5 h-5 text-slate-600 dark:text-white/70" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Featured Image */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative z-10 max-w-5xl mx-auto px-6 mb-12"
            >
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-96 object-cover"
                    />
                </div>
            </motion.div>

            {/* Article Content */}
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10 max-w-3xl mx-auto px-6 pb-16"
            >
                <div
                    className="prose prose-lg dark:prose-invert prose-slate max-w-none
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-white
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-slate-600 dark:prose-p:text-white/70 prose-p:leading-relaxed
                        prose-strong:text-slate-800 dark:prose-strong:text-white
                        prose-ul:my-4 prose-li:text-slate-600 dark:prose-li:text-white/70
                        prose-ol:my-4
                        prose-a:text-coral prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />').replace(/## /g, '</p><h2>').replace(/### /g, '</p><h3>').replace(/<h2>/g, '</p><h2>').replace(/<h3>/g, '</p><h3>').replace(/<\/h2>/g, '</h2><p>').replace(/<\/h3>/g, '</h3><p>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- /g, '• ') }}
                />
            </motion.article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10 max-w-5xl mx-auto px-6 pb-20"
                >
                    <div className="border-t border-slate-200 dark:border-white/10 pt-12">
                        <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-white mb-8">
                            Related Articles
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.id}
                                    to={`/publications/${related.slug}`}
                                    className="group glass-card glass-card-hover p-6 flex gap-4"
                                >
                                    <img
                                        src={related.image}
                                        alt={related.title}
                                        className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div>
                                        <span className="text-xs font-medium text-violet mb-1 block">
                                            {related.category}
                                        </span>
                                        <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-coral transition-colors line-clamp-2">
                                            {related.title}
                                        </h3>
                                        <span className="text-sm text-slate-500 dark:text-white/50 flex items-center gap-1 mt-2">
                                            <Clock className="w-3 h-3" />
                                            {related.readTime}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Back to Publications */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative z-10 max-w-3xl mx-auto px-6 pb-20 text-center"
            >
                <Link
                    to="/publications"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-white font-medium hover:bg-coral/90 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to All Publications
                </Link>
            </motion.div>
        </div>
    );
};

export default PublicationDetailPage;
