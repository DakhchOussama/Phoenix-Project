// api.ts
const apiUrl = 'http://localhost:3000/users'; // Replace with your backend URL

interface ApiResponse {
  data: string; // Adjust this according to your actual response structure
}

export const fetchData = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        // Add any other required headers here
        'Authorization': 'Bearer YOUR_TOKEN' // Example for token-based auth
      }
    });
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return { data: '' }; // Handle error case appropriately
  }
};
