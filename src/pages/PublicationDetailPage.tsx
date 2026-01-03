import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, ChevronRight, ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { getPostBySlug, blogPosts } from '../data/blogPosts';
import AnimatedBackground from '../components/AnimatedBackground';

// Proper markdown to HTML parser
const parseMarkdown = (content: string): string => {
    let html = content;

    // Escape HTML first
    html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Headers (must process in order: h3 before h2 before h1)
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Bold text
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic text
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Unordered list items
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');

    // Ordered list items
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> items in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        return '<ul>' + match + '</ul>';
    });

    // Paragraphs - wrap lines that aren't already wrapped
    const lines = html.split('\n');
    const processedLines = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('</')) {
            return line;
        }
        return `<p>${trimmed}</p>`;
    });

    html = processedLines.join('\n');

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>\s*<\/p>/g, '');

    return html;
};

const PublicationDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPostBySlug(slug) : undefined;

    // Engagement state
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<{ id: number; author: string; text: string; time: string }[]>([]);

    if (!post) {
        return <Navigate to="/publications" replace />;
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    const handleUpvote = () => {
        if (userVote === 'up') {
            setUpvotes(prev => prev - 1);
            setUserVote(null);
        } else {
            if (userVote === 'down') {
                setDownvotes(prev => prev - 1);
            }
            setUpvotes(prev => prev + 1);
            setUserVote('up');
        }
    };

    const handleDownvote = () => {
        if (userVote === 'down') {
            setDownvotes(prev => prev - 1);
            setUserVote(null);
        } else {
            if (userVote === 'up') {
                setUpvotes(prev => prev - 1);
            }
            setDownvotes(prev => prev + 1);
            setUserVote('down');
        }
    };

    const handleAddComment = () => {
        if (comment.trim()) {
            setComments(prev => [
                { id: Date.now(), author: 'You', text: comment, time: 'Just now' },
                ...prev
            ]);
            setComment('');
        }
    };

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
                className="relative z-10 max-w-3xl mx-auto px-6 pb-12"
            >
                <div
                    className="prose prose-lg dark:prose-invert prose-slate max-w-none
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-white
                        prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-slate-600 dark:prose-p:text-white/70 prose-p:leading-relaxed prose-p:my-4
                        prose-strong:text-slate-800 dark:prose-strong:text-white
                        prose-ul:my-4 prose-ul:pl-6 prose-li:text-slate-600 dark:prose-li:text-white/70 prose-li:my-1
                        prose-ol:my-4 prose-ol:pl-6
                        prose-a:text-coral prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
                />
            </motion.article>

            {/* Engagement Section - Upvote/Downvote & Comments */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="relative z-10 max-w-3xl mx-auto px-6 pb-16"
            >
                <div className="border-t border-slate-200 dark:border-white/10 pt-8">
                    {/* Voting Buttons */}
                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-lg font-medium text-slate-800 dark:text-white">Was this helpful?</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleUpvote}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${userVote === 'up'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-green-100 dark:hover:bg-green-500/20'
                                    }`}
                            >
                                <ThumbsUp className="w-5 h-5" />
                                <span className="font-medium">{upvotes}</span>
                            </button>
                            <button
                                onClick={handleDownvote}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${userVote === 'down'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-red-100 dark:hover:bg-red-500/20'
                                    }`}
                            >
                                <ThumbsDown className="w-5 h-5" />
                                <span className="font-medium">{downvotes}</span>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-slate-600 dark:text-white/70" />
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                                Comments ({comments.length})
                            </h3>
                        </div>

                        {/* Add Comment */}
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center flex-shrink-0">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Share your thoughts..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet/50 resize-none"
                                />
                                <button
                                    onClick={handleAddComment}
                                    className="mt-2 px-5 py-2 rounded-full bg-coral text-white font-medium flex items-center gap-2 hover:bg-coral/90 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                    Post Comment
                                </button>
                            </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4 mt-6">
                            {comments.map((c) => (
                                <div key={c.id} className="flex gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <User className="w-5 h-5 text-slate-500 dark:text-white/50" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-slate-800 dark:text-white">{c.author}</span>
                                            <span className="text-sm text-slate-500 dark:text-white/50">• {c.time}</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-white/70">{c.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

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

