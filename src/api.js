export const API_URL = `http://localhost:8089`;
// Função para pegar os posts por página
export function getPostsByPage(page = 1) {
  return {
    url: `${API_URL}/posts?page=${page}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
}

export function userLogin(email, password) {
  return {
    url: `${API_URL}/users/login`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  };
}

export function userRegister(name, email, password) {
  return {
    url: `${API_URL}/users/register`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    },
  };
}

export const autoLogin = (token) => {
  return {
    url: `${API_URL}/users/auth`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
};
