import { API_BASE_URL } from '../config';

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE_URL}/api/products?${query}`);
  return await res.json();
};

export const fetchRecipes = async () => {
  const res = await fetch(`${API_BASE_URL}/api/products/recipes`);
  return await res.json();
};

export const calculateCombo = async (selectedProductIds) => {
  const res = await fetch(`${API_BASE_URL}/api/combos/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selectedProductIds })
  });
  return await res.json();
};

export const submitOrder = async (orderPayload) => {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  });
  return await res.json();
};

export const fetchAnalytics = async () => {
  const res = await fetch(`${API_BASE_URL}/api/orders/analytics`);
  return await res.json();
};
