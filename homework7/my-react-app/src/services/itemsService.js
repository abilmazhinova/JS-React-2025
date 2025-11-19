// src/services/itemsService.js
const baseUrl = 'https://dummyjson.com/products';

// Добавляем CORS прокси
const corsProxy = 'https://cors-anywhere.herokuapp.com/';
// Или: const corsProxy = 'https://api.allorigins.win/raw?url=';

export async function getAll(query = '') {
  let url = query ? `${baseUrl}/search?q=${query}` : baseUrl;
  
  // Пробуем разные прокси если основной не работает
  try {
    // Попробуем без прокси сначала
    const res = await fetch(url);
    if (res.ok) return res.json();
  } catch (error) {
    console.log('Direct request failed, trying with proxy...');
  }

  // Используем прокси
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch items: ' + error.message);
  }
}

export async function getById(id) {
  const url = `${baseUrl}/${id}`;
  
  try {
    const res = await fetch(url);
    if (res.ok) return res.json();
  } catch (error) {
    console.log('Direct request failed, trying with proxy...');
  }

  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error('Item not found');
    return res.json();
  } catch (error) {
    throw new Error('Item not found: ' + error.message);
  }
}