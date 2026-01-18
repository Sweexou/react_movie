export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

const LS_TOKEN_KEY = "auth_token";

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem(LS_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function notifyUnauthorized() {
  window.dispatchEvent(new Event("auth:unauthorized"));
}


async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    // gestion globale centralisée
    notifyUnauthorized();
  }

  if (!res.ok) {
    let details: unknown = undefined;
    try {
      details = await res.json();
    } catch {
      // pas de JSON
    }
    throw { status: res.status, message: `HTTP ${res.status}`, details } as ApiError;
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}


export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: {
      Accept: "application/json",
      ...getAuthHeader(),
    },
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeader(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(res);
}






// ---- Endpoints de ton projet (movies) ----
export const api = {
  // movies (déjà existant)
  getMovies: (params?: { page?: number; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.set("page", String(params.page));
    if (params?.search) q.set("search", params.search);
    const suffix = q.toString() ? `?${q.toString()}` : "";
    return apiGet<any>(`/movies${suffix}`);
  },
  getMovieById: (id: string) => apiGet<any>(`/movies/${id}`),

  // auth (nouveau)
  register: (data: { username: string; email: string; password: string }) =>
    apiPost<{ id: string; username: string; email: string }>(`/auth/register`, data),

  login: (data: { email: string; password: string }) =>
    apiPost<{ token: string; user: { id: string; username: string; email: string } }>(
      `/auth/login`,
      data
    ),

  logout: () => apiPost<void>("/auth/logout"),

  favoritesGet: () => apiGet<{ favorites: string[] }>("/favorites"),

favoriteAdd: (movieId: string) =>
  apiPost<{ favorites: string[] }>(`/favorites/${movieId}`),

favoriteRemove: (movieId: string) =>
  fetch(`/api/favorites/${movieId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  }).then(async (res) => {
    // reuse handleResponse-like behavior
    if (!res.ok) {
      if (res.status === 401) window.dispatchEvent(new Event("auth:unauthorized"));
      throw { status: res.status, message: `HTTP ${res.status}` };
    }
    return (await res.json()) as { favorites: string[] };
  }),

  getReviewsByMovie: (movieId: string) =>
  apiGet<{ reviews: any[] }>(`/reviews?movieId=${encodeURIComponent(movieId)}`),

createReview: (data: { movieId: string; title: string; content: string; rating?: number }) =>
  apiPost<{ review: any }>(`/reviews`, data),

updateReview: (id: string, data: { title?: string; content?: string; rating?: number }) =>
  fetch(`/api/reviews/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.status === 401) window.dispatchEvent(new Event("auth:unauthorized"));
    if (!res.ok) throw { status: res.status, message: `HTTP ${res.status}` };
    return (await res.json()) as { review: any };
  }),

deleteReview: (id: string) =>
  fetch(`/api/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("auth_token"),
    },
  }).then(async (res) => {
    if (res.status === 401) window.dispatchEvent(new Event("auth:unauthorized"));
    if (res.status === 204) return;
    if (!res.ok) throw { status: res.status, message: `HTTP ${res.status}` };
    return;
  }),

getUserPublic: (username: string) =>
  apiGet<{ user: { id: string; username: string }; reviews: any[] }>(
    `/users/${encodeURIComponent(username)}`
  ),

};

