import { tracer } from './tracer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tdsc-web-backend.onrender.com';

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('auth_token');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-request-id': tracer.getRequestId(),
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

/**
 * Helper function to make API requests with tracing
 */
async function apiRequest<T>(
    method: string,
    endpoint: string,
    body?: any,
    context?: Record<string, any>
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const startTime = performance.now();

    try {
        tracer.logApiRequest(method, endpoint, context);

        const response = await fetch(url, {
            method,
            headers: getAuthHeaders(),
            body: body ? JSON.stringify(body) : undefined,
        });

        const duration = performance.now() - startTime;
        tracer.logApiResponse(method, endpoint, response.status, duration, context);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || `${method} ${endpoint} failed`);
        }

        return response.json();
    } catch (error) {
        const duration = performance.now() - startTime;
        if (error instanceof Error) {
            tracer.logApiError(method, endpoint, error, { ...context, duration });
        }
        throw error;
    }
}

export interface User {
    id: string;
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
        tracer.logAuthEvent('Signup Attempt', username);
        const response = await apiRequest<AuthResponse>('POST', '/auth/signup', {
            username,
            email,
            password,
        }, { username, email });
        tracer.logAuthEvent('Signup Successful', username);
        return response;
    },

    signin: async (email: string, password: string): Promise<AuthResponse> => {
        tracer.logAuthEvent('Signin Attempt', email);
        const response = await apiRequest<AuthResponse>('POST', '/auth/signin', {
            email,
            password,
        }, { email });
        tracer.logAuthEvent('Signin Successful', email);
        return response;
    },

    getMe: async (): Promise<User> => {
        return apiRequest<User>('GET', '/auth/me');
    },
};

export const engagementApi = {
    getVotes: async (slug: string): Promise<VoteResponse> => {
        return apiRequest<VoteResponse>('GET', `/posts/${slug}/votes`, undefined, { slug });
    },

    submitVote: async (slug: string, voteType: 'up' | 'down'): Promise<VoteResponse> => {
        tracer.logEngagementEvent('Vote Submission', slug, { voteType });
        const response = await apiRequest<VoteResponse>('POST', `/posts/${slug}/votes`, {
            vote_type: voteType,
        }, { slug, voteType });
        tracer.logEngagementEvent('Vote Submission Successful', slug, { voteType });
        return response;
    },

    getComments: async (slug: string): Promise<Comment[]> => {
        return apiRequest<Comment[]>('GET', `/posts/${slug}/comments`, undefined, { slug });
    },

    addComment: async (slug: string, text: string): Promise<Comment> => {
        tracer.logEngagementEvent('Comment Creation', slug);
        const response = await apiRequest<Comment>('POST', `/posts/${slug}/comments`, {
            text,
        }, { slug, textLength: text.length });
        tracer.logEngagementEvent('Comment Creation Successful', slug);
        return response;
    },

    deleteComment: async (slug: string, commentId: string): Promise<void> => {
        tracer.logEngagementEvent('Comment Deletion', slug, { commentId });
        await apiRequest('DELETE', `/posts/${slug}/comments/${commentId}`, undefined, {
            slug,
            commentId,
        });
        tracer.logEngagementEvent('Comment Deletion Successful', slug);
    },
};
