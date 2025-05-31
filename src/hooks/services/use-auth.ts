import Cookies from 'js-cookie';

export function useAuth() {
    const token = Cookies.get('access_token');
    return { isAuthenticated: !!token };
  }