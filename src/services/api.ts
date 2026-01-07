const API_BASE_URL = 'http://localhost:8001';

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
};

export interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface VoteResponse {
    upvotes: number;
    downvotes: number;
    user_vote: 'up' | 'down' | null;
}

export interface Comment {
    id: string;
    username: string;
    text: string;
    created_at: string;
    is_own: boolean;
}

export const authApi = {
    signup: async (username: string, email: string, password: string): Promise<AuthResponse> => {
        const res = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || 'Signup failed');
        }
        return res.json();
    },

    signin: async (email: string, password: string): Promise<AuthResponse> => {
        const res = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.detail || 'Sign in failed');
        }
        return res.json();
    },

    getMe: async (): Promise<User> => {
        const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
    },
};

export const engagementApi = {
    getVotes: async (slug: string): Promise<VoteResponse> => {
        const res = await fetch(`${API_BASE_URL}/posts/${slug}/votes`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('Failed to get votes');
        return res.json();
    },

    submitVote: async (slug: string, voteType: 'up' | 'down'): Promise<VoteResponse> => {
        const res = await fetch(`${API_BASE_URL}/posts/${slug}/votes`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ vote_type: voteType }),
        });
        if (!res.ok) throw new Error('Failed to submit vote');
        return res.json();
    },

    getComments: async (slug: string): Promise<Comment[]> => {
        const res = await fetch(`${API_BASE_URL}/posts/${slug}/comments`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('Failed to get comments');
        return res.json();
    },

    addComment: async (slug: string, text: string): Promise<Comment> => {
        const res = await fetch(`${API_BASE_URL}/posts/${slug}/comments`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error('Failed to add comment');
        return res.json();
    },

    deleteComment: async (slug: string, commentId: string): Promise<void> => {
        const res = await fetch(`${API_BASE_URL}/posts/${slug}/comments/${commentId}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error('Failed to delete comment');
    },
};
