export async function getAll() {
  const response = await fetch(`/api/loan/all`, {
    method: 'get',
    next: {
      tags: ['loan', 'all'],
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
