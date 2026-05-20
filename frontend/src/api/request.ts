export const API_URL = "http://localhost:5000";

const authHeader = (): Record<string, string> => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// general request handler
export const request = async <T>(
  path: string,
  options: RequestInit,
): Promise<T> => {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...authHeader(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Request failed");
  }

  if (res.status === 204) return null as T;

  return res.json();
};

///////////////////////////////////////////////////////////////////////////////

// Wrapper for GET request
export const get = <T>(
  path: string,
  headers: Record<string, string> = {},
): Promise<T> => {
  return request<T>(path, {
    method: "GET",
    headers,
  });
};

// Wrapper for POST request
export const post = <T>(
  path: string,
  body?: unknown,
  headers: Record<string, string> = {},
): Promise<T> => {
  return request<T>(path, {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
};

// Wrapper for PUT request
export const put = <T>(
  path: string,
  body?: unknown,
  headers: Record<string, string> = {},
): Promise<T> => {
  return request<T>(path, {
    method: "PUT",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
};

// Wrapper for DELETE request
export const del = <T>(
  path: string,
  headers: Record<string, string> = {},
): Promise<T> => {
  return request<T>(path, {
    method: "DELETE",
    headers,
  });
};
