// Dashboard Authentication & Token Management

const TOKEN_KEY = 'mora_dashboard_token';
const TOKEN_EXPIRY_KEY = 'mora_dashboard_token_expiry';
const SESSION_TTL = 30 * 60 * 1000; // 30 minutes

export const dashboardAuth = {
  // Get token from localStorage
  getToken(): string | null {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!token || !expiry) return null;

    // Check if token expired
    if (Date.now() > parseInt(expiry)) {
      this.clearToken();
      return null;
    }

    return token;
  },

  // Set token with expiry
  setToken(token: string): void {
    if (typeof window === 'undefined') return;

    const expiry = Date.now() + SESSION_TTL;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
  },

  // Clear token
  clearToken(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  },

  // Check if authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  },

  // Get auth headers for fetch
  getAuthHeaders(): HeadersInit {
    const token = this.getToken();

    if (!token) {
      return {
        'Content-Type': 'application/json'
      };
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }
};

// Dashboard API base URLs
export const DASHBOARD_API = {
  BASE: 'https://voice.saimor.world/api/dashboard',
  CHAT: 'https://voice.saimor.world/mora',
  N8N: 'https://n8n.voice.saimor.world'
};

// API endpoints
export const DASHBOARD_ENDPOINTS = {
  status: '/status',
  costsToday: '/costs/today',
  overview: '/stats/overview',
  activity: '/activity',
  learningQueue: '/learning-brain/queue',
  learningReview: (id: string) => `/learning-brain/review/${id}`,
  chatMessage: '/chat/message'
};

// Fetch wrapper with auth
export async function dashboardFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${DASHBOARD_API.BASE}${endpoint}`;
  const headers = dashboardAuth.getAuthHeaders();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  if (!response.ok) {
    // If 401, clear token
    if (response.status === 401) {
      dashboardAuth.clearToken();
    }
    throw new Error(`Dashboard API error: ${response.status}`);
  }

  return response.json();
}

// Public mode check (no auth needed for website visitors)
export function isPublicMode(): boolean {
  return !dashboardAuth.isAuthenticated();
}
