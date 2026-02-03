// Custom Hooks for API calls - FIXED VERSION (No Infinite Loop)
// src/hooks/useApi.js

import { useState, useEffect, useCallback, useRef } from 'react';
import apiService from '../api/apiService';

// Generic API hook - FIXED to prevent infinite loops
export const useApi = (apiFunction, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  const execute = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...params);
        
        if (isMountedRef.current) {
          setData(result);
        }
        return { success: true, data: result };
      } catch (err) {
        if (isMountedRef.current) {
          setError(err);
        }
        return { success: false, error: err };
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [apiFunction]
  );

  useEffect(() => {
    isMountedRef.current = true;
    
    if (immediate) {
      execute();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [immediate]); // REMOVED execute from dependencies!

  return { data, loading, error, execute, refetch: execute };
};

// FIXED Announcements hooks
export const useAnnouncements = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getAnnouncements(params);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [params.page, params.size]); // Only depend on actual params

  useEffect(() => {
    refetch();
  }, [params.page, params.size]); // Only depend on params, not refetch

  return { data, loading, error, refetch };
};

export const useAnnouncementsByDepartment = (departmentId, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!departmentId);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    if (!departmentId) return;
    
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getAnnouncementsByDepartment(departmentId, params);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [departmentId, params.page, params.size]);

  useEffect(() => {
    if (departmentId) {
      refetch();
    }
  }, [departmentId, params.page, params.size]); // Only depend on params

  return { data, loading, error, refetch };
};

export const useCreateAnnouncement = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAnnouncement = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.createAnnouncement(data);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { createAnnouncement, loading, error };
};

// Hook for deleting announcements
export const useDeleteAnnouncement = () => {
  const [loading, setLoading] = useState(false);

  const deleteAnnouncement = async (announcementId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/announcements/${announcementId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'Failed to delete announcement'
        }));
        
        return {
          success: false,
          error: errorData,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error deleting announcement:', error);
      return {
        success: false,
        error: {
          message: error.message || 'Failed to delete announcement',
        },
      };
    } finally {
      setLoading(false);
    }
  };

  return { deleteAnnouncement, loading };
};


// FIXED Events hooks
export const useEvents = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getEvents(params);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [params.page, params.size]);

  useEffect(() => {
    refetch();
  }, [params.page, params.size]);

  return { data, loading, error, refetch };
};

export const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEvent = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.createEvent(data);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading, error };
};

export const useRegisterForEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (eventId) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.registerForEvent(eventId);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

// Hook for deleting events
export const useDeleteEvent = () => {
  const [loading, setLoading] = useState(false);

  const deleteEvent = async (eventId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: 'Failed to delete event'
        }));
        
        return {
          success: false,
          error: errorData,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error deleting event:', error);
      return {
        success: false,
        error: {
          message: error.message || 'Failed to delete event',
        },
      };
    } finally {
      setLoading(false);
    }
  };

  return { deleteEvent, loading };
};

// Hook for incrementing view count
export const useIncrementViewCount = () => {
  const [loading, setLoading] = useState(false);

  const incrementView = async (announcementId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/announcements/${announcementId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return { success: false };
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error incrementing view count:', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { incrementView, loading };
};

// Hook for incrementing comment count
export const useIncrementCommentCount = () => {
  const [loading, setLoading] = useState(false);

  const incrementComment = async (announcementId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/announcements/${announcementId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return { success: false };
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error incrementing comment count:', error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { incrementComment, loading };
};


// FIXED Lost & Found hooks
export const useLostFound = (params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getLostFoundItems(params);
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [params.page, params.size]);

  useEffect(() => {
    refetch();
  }, [params.page, params.size]);

  return { data, loading, error, refetch };
};

export const useCreateLostFound = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createItem = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.createLostFoundItem(data);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { createItem, loading, error };
};

// Pagination hook
export const usePagination = (initialPage = 0, initialSize = 20) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const goToPage = (pageNum) => setPage(pageNum);
  const changeSize = (newSize) => {
    setSize(newSize);
    setPage(0);
  };

  return {
    page,
    size,
    nextPage,
    prevPage,
    goToPage,
    changeSize,
  };
};