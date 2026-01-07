import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, ThumbsUp, ThumbsDown, MessageSquare, Send, Trash2, LogIn } from 'lucide-react';
import { getPostBySlug, blogPosts } from '../data/blogPosts';
import { useAuth } from '../context/AuthContext';
import { engagementApi, VoteResponse, Comment } from '../services/api';
import AnimatedBackground from '../components/AnimatedBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
};

const PublicationDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPostBySlug(slug) : undefined;
    const { isAuthenticated } = useAuth();

    const [votes, setVotes] = useState<VoteResponse>({ upvotes: 0, downvotes: 0, user_vote: null });
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState('');
    const [isLoadingVotes, setIsLoadingVotes] = useState(true);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [isSubmittingVote, setIsSubmittingVote] = useState(false);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!slug) return;
        const fetchData = async () => {
            try {
                const [votesData, commentsData] = await Promise.all([
                    engagementApi.getVotes(slug),
                    engagementApi.getComments(slug),
                ]);
                setVotes(votesData);
                setComments(commentsData);
            } catch (err) {
                console.error('Failed to fetch engagement data:', err);
            } finally {
                setIsLoadingVotes(false);
                setIsLoadingComments(false);
            }
        };
        fetchData();
    }, [slug]);

    useEffect(() => {
        if (!slug) return;
        const fetchVotes = async () => {
            try {
                const votesData = await engagementApi.getVotes(slug);
                setVotes(votesData);
            } catch (err) {
                console.error('Failed to fetch votes:', err);
            }
        };
        fetchVotes();
    }, [slug, isAuthenticated]);

    if (!post) return <Navigate to="/publications" replace />;

    const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2);

    const handleVote = async (voteType: 'up' | 'down') => {
        if (!isAuthenticated) { setError('Please sign in to vote'); return; }
        if (isSubmittingVote) return;
        setIsSubmittingVote(true);
        setError('');
        try {
            const response = await engagementApi.submitVote(slug!, voteType);
            setVotes(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit vote');
        } finally {
            setIsSubmittingVote(false);
        }
    };

    const handleAddComment = async () => {
        if (!isAuthenticated) { setError('Please sign in to comment'); return; }
        if (!comment.trim() || isSubmittingComment) return;
        setIsSubmittingComment(true);
        setError('');
        try {
            const newComment = await engagementApi.addComment(slug!, comment.trim());
            setComments(prev => [newComment, ...prev]);
            setComment('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add comment');
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await engagementApi.deleteComment(slug!, commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete comment');
        }
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] dark:bg-dark-900">
            <Navbar />
            <AnimatedBackground />
            <div className="relative pt-28 pb-12 px-6">
                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link to="/publications" className="inline-flex items-center gap-2 text-slate-500 hover:text-coral mb-6">
                            <ArrowLeft className="w-4 h-4" /> Back to Publications
                        </Link>
                        <span className="inline-flex px-4 py-1.5 rounded-full text-sm font-medium bg-violet/10 text-violet mb-4">{post.category}</span>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 dark:text-white leading-tight mb-4">{post.title}</h1>
                        <p className="text-lg text-slate-600 dark:text-white/70 mb-6">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-white/50 mb-8">
                            <span className="flex items-center gap-1"><User className="w-4 h-4" />{post.author}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 mb-12">
                <img src={post.image} alt={post.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl" />
            </div>

            <article className="relative z-10 max-w-3xl mx-auto px-6 pb-12">
                <div className="prose prose-lg dark:prose-invert prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
            </article>

            <section className="relative z-10 max-w-3xl mx-auto px-6 pb-16">
                <div className="border-t border-slate-200 dark:border-white/10 pt-8">
                    {error && <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 text-sm flex items-center gap-2">{error}
                        {!isAuthenticated && <Link to="/signin" className="ml-auto text-coral hover:underline flex items-center gap-1"><LogIn className="w-4 h-4" />Sign In</Link>}
                    </div>}
                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-lg font-medium text-slate-800 dark:text-white">Was this helpful?</span>
                        <div className="flex items-center gap-3">
                            <button onClick={() => handleVote('up')} disabled={isSubmittingVote || isLoadingVotes}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all disabled:opacity-50 ${votes.user_vote === 'up' ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-green-100'}`}>
                                <ThumbsUp className="w-5 h-5" /><span className="font-medium">{votes.upvotes}</span>
                            </button>
                            <button onClick={() => handleVote('down')} disabled={isSubmittingVote || isLoadingVotes}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all disabled:opacity-50 ${votes.user_vote === 'down' ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white/70 hover:bg-red-100'}`}>
                                <ThumbsDown className="w-5 h-5" /><span className="font-medium">{votes.downvotes}</span>
                            </button>
                        </div>
                        {!isAuthenticated && <Link to="/signin" className="ml-auto text-sm text-slate-500 hover:text-coral flex items-center gap-1"><LogIn className="w-4 h-4" />Sign in to vote</Link>}
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-slate-600 dark:text-white/70" />
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Comments ({comments.length})</h3>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet to-coral flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-white" /></div>
                            <div className="flex-1">
                                {isAuthenticated ? (
                                    <>
                                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts..." rows={3}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet/50 resize-none" />
                                        <button onClick={handleAddComment} disabled={!comment.trim() || isSubmittingComment}
                                            className="mt-2 px-5 py-2 rounded-full bg-coral text-white font-medium flex items-center gap-2 hover:bg-coral/90 disabled:opacity-50">
                                            {isSubmittingComment ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />} Post Comment
                                        </button>
                                    </>
                                ) : (
                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                                        <p className="text-slate-600 dark:text-white/70 mb-3">Sign in to join the conversation</p>
                                        <Link to="/signin" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90"><LogIn className="w-4 h-4" />Sign In</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4 mt-6">
                            {isLoadingComments ? <div className="flex items-center justify-center py-8"><div className="w-6 h-6 border-2 border-coral/30 border-t-coral rounded-full animate-spin" /></div>
                                : comments.length === 0 ? <p className="text-center text-slate-500 py-8">No comments yet. Be the first to share your thoughts!</p>
                                    : comments.map((c) => (
                                        <div key={c.id} className="flex gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0"><User className="w-5 h-5 text-slate-500" /></div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-slate-800 dark:text-white">{c.username}</span>
                                                    <span className="text-sm text-slate-500">• {formatRelativeTime(c.created_at)}</span>
                                                    {c.is_own && <button onClick={() => handleDeleteComment(c.id)} className="ml-auto p-1 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
                                                </div>
                                                <p className="text-slate-600 dark:text-white/70 break-words">{c.text}</p>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
            </section>

            {relatedPosts.length > 0 && (
                <section className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-white mb-6">Related Articles</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedPosts.map((related) => (
                            <Link key={related.id} to={`/publications/${related.slug}`} className="group p-6 bg-white dark:bg-dark-800 rounded-2xl border border-slate-200 dark:border-white/10 hover:shadow-lg transition-all flex gap-4">
                                <img src={related.image} alt={related.title} className="w-24 h-24 rounded-xl object-cover" />
                                <div>
                                    <span className="text-xs font-medium text-violet mb-1 block">{related.category}</span>
                                    <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-coral line-clamp-2">{related.title}</h3>
                                    <span className="text-sm text-slate-500 flex items-center gap-1 mt-2"><Clock className="w-3 h-3" />{related.readTime}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
            <Footer />
        </div>
    );
};

export default PublicationDetailPage;
