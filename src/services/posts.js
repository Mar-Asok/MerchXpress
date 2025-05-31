import api from './api';

export const postsApi = {
  // Get all posts
  getAll: async () => {
    const response = await api.get('/v1/posts');
    return response.data;
  },

  // Get single post
  getById: async (id) => {
    const response = await api.get(`/v1/posts/${id}`);
    return response.data;
  },

  // Create post
  create: async (postData) => {
    const response = await api.post('/v1/posts', postData);
    return response.data;
  },

  // Update post
  update: async (id, postData) => {
    const response = await api.put(`/v1/posts/${id}`, postData);
    return response.data;
  },

  // Delete post
  delete: async (id) => {
    const response = await api.delete(`/v1/posts/${id}`);
    return response.data;
  },

  // Test connection
  test: async () => {
    const response = await api.get('/test');
    return response.data;
  }
};  