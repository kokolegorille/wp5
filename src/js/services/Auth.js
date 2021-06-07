import { TOKEN_KEY } from '../config/';

const Auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: token => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
}

export default Auth;