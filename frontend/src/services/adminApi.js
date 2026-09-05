import { API_BASE_URL } from '../config';

const BASE = `${API_BASE_URL}/api/admin`;

const getHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleRes = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const adminLogin = (email, password) =>
  fetch(`${BASE}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }).then(handleRes);

export const verifyToken = () =>
  fetch(`${BASE}/me`, { headers: getHeaders() }).then(handleRes);

export const fetchDashboard = () =>
  fetch(`${BASE}/dashboard`, { headers: getHeaders() }).then(handleRes);

export const fetchSalesChart = (period = '7days') =>
  fetch(`${BASE}/sales-chart?period=${period}`, { headers: getHeaders() }).then(handleRes);

export const fetchAdminOrders = (status) =>
  fetch(`${BASE}/orders${status ? `?status=${status}` : ''}`, { headers: getHeaders() }).then(handleRes);

export const updateOrderStatus = (id, status) =>
  fetch(`${BASE}/orders/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ status }) }).then(handleRes);

export const fetchAdminProducts = () =>
  fetch(`${BASE}/products`, { headers: getHeaders() }).then(handleRes);

export const createAdminProduct = (data) =>
  fetch(`${API_BASE_URL}/api/products`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleRes);

export const updateAdminProduct = (id, data) =>
  fetch(`${BASE}/products/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(data) }).then(handleRes);

export const deleteAdminProduct = (id) =>
  fetch(`${BASE}/products/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleRes);

export const updateProductStock = (id, stockCount) =>
  fetch(`${BASE}/products/${id}/stock`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ stockCount }) }).then(handleRes);

export const fetchInventory = () =>
  fetch(`${BASE}/inventory`, { headers: getHeaders() }).then(handleRes);

export const fetchCustomers = (search = '') =>
  fetch(`${BASE}/customers?search=${search}`, { headers: getHeaders() }).then(handleRes);

export const fetchCategories = () =>
  fetch(`${BASE}/categories`, { headers: getHeaders() }).then(handleRes);

export const createCategory = (data) =>
  fetch(`${BASE}/categories`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(data) }).then(handleRes);

export const updateCategory = (id, data) =>
  fetch(`${BASE}/categories/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(data) }).then(handleRes);

export const deleteCategory = (id) =>
  fetch(`${BASE}/categories/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleRes);

export const fetchReviews = () =>
  fetch(`${BASE}/reviews`, { headers: getHeaders() }).then(handleRes);

export const updateReview = (id, data) =>
  fetch(`${BASE}/reviews/${id}`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify(data) }).then(handleRes);

export const deleteReview = (id) =>
  fetch(`${BASE}/reviews/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleRes);
