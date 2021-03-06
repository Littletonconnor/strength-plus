export const http = {
  async post(endpoint: string, data: unknown, token?: string) {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Basic ${token}` }),
      },
    });

    const json = await response.json();
    return json;
  },
  async get(endpoint: string, token?: string) {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        ...(token && { Authorization: `Basis ${token}` }),
      },
    });

    const json = await response.json();
    return json;
  },
};

export default http;
