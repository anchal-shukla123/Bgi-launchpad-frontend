// API Service - Complete implementation for BGI Launchpad
// src/api/apiService.js

const API_BASE_URL ='https://bgi-launchpad-backend-1dnk.onrender.com/api';

console.log('🚀 API Base URL:', API_BASE_URL);

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log('📡 API Request:', url);
    
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(options.auth !== false),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      console.log('📥 API Response:', response.status, response.statusText);
      
      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return { success: true };
      }

      // Handle responses with content
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = text ? { message: text } : { success: response.ok };
      }

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || `Request failed: ${response.statusText}`,
          errors: data.fieldErrors || {},
        };
      }

      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      
      // Network error (backend not running)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw {
          status: 0,
          message: 'Cannot connect to server. Make sure backend is running on https://bgi-launchpad-backend-1dnk.onrender.com/',
        };
      }
      
      if (error.status === 401) {
        this.removeToken();
        // Don't redirect here, let AuthContext handle it
      }
      
      throw error;
    }
  }

  // ==================== AUTH ENDPOINTS ====================
  
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      this.setToken(data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  }

  async register(userData) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      auth: false,
      body: JSON.stringify(userData),
    });
    
    if (data.token) {
      this.setToken(data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  }

  async logout() {
    this.removeToken();
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const data = await this.request(`/auth/refresh?refreshToken=${refreshToken}`, {
      method: 'POST',
      auth: false,
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  // ==================== ANNOUNCEMENT ENDPOINTS ====================
  
  async getAnnouncements(params = {}) {
    // Backend returns List, not Page - adapt to match frontend expectations
    const announcements = await this.request('/announcements');
    
    // Convert to Page format
    return {
      content: announcements || [],
      totalPages: 1,
      totalElements: announcements?.length || 0,
      last: true,
      first: true,
      number: 0
    };
  }

  async getAnnouncementsByDepartment(departmentId, params = {}) {
    const announcements = await this.request(`/announcements/department/${departmentId}`);
    
    return {
      content: announcements || [],
      totalPages: 1,
      totalElements: announcements?.length || 0,
      last: true,
      first: true,
      number: 0
    };
  }

  async getAnnouncementById(id) {
    return this.request(`/announcements/${id}`);
  }

  async createAnnouncement(announcementData) {
    return this.request('/announcements', {
      method: 'POST',
      body: JSON.stringify(announcementData),
    });
  }

  async deleteAnnouncement(id) {
    return this.request(`/announcements/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== EVENT ENDPOINTS ====================
  
  async getEvents(params = {}) {
    const events = await this.request('/events');
    
    return {
      content: events || [],
      totalPages: 1,
      totalElements: events?.length || 0,
      last: true,
      first: true,
      number: 0
    };
  }

  async getEventById(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async registerForEvent(eventId) {
    return this.request(`/events/${eventId}/register`, {
      method: 'POST',
    });
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== LOST & FOUND ENDPOINTS ====================
  
  async getLostFoundItems(params = {}) {
    const items = await this.request('/lost-found');
    
    return {
      content: items || [],
      totalPages: 1,
      totalElements: items?.length || 0,
      last: true,
      first: true,
      number: 0
    };
  }

  async getLostFoundById(id) {
    return this.request(`/lost-found/${id}`);
  }

  async createLostFoundItem(itemData) {
    return this.request('/lost-found', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async markAsClaimed(id) {
    return this.request(`/lost-found/${id}/claim`, {
      method: 'PATCH',
    });
  }

  async deleteLostFoundItem(id) {
    return this.request(`/lost-found/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();