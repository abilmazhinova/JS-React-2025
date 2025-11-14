const baseUrl = 'https://dummyjson.com/products';

export async function getAll(query = '') {
  const url = query ? `${baseUrl}/search?q=${query}` : baseUrl;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function getById(id) {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error('Item not found');
  return res.json();
}
