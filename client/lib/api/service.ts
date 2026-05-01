const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || 'Something went wrong');
    }

    return res.json();
  }

  // Auth
  async login(credentials: any) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(data: any) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Deals
  async getDeals() {
    return this.request('/deals');
  }

  async createDeal(deal: any) {
    return this.request('/deals', {
      method: 'POST',
      body: JSON.stringify(deal),
    });
  }

  // Analytics
  async getAnalytics() {
    return this.request('/analytics');
  }
}

export const api = new ApiService();
export default api;
