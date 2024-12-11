// use this to decode a token and get the user's information out of it
import { jwtDecode } from 'jwt-decode';


// create an interface for the payload of the token
interface JwtPayload {
  username: string;
  email: string;
  id: string;
}

// create an interface for the token
interface UserToken {
  name: string;
  exp: number;
  data: JwtPayload;
}

// create a new class to instantiate for a user
class AuthService {
  // get user data

  getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<UserToken>(token);
      console.log('User profile:', decoded);
      return decoded; // Now it has 'username', 'email', and 'id'
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();

    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem('id_token');
    //    console.log('Retrieved token:', token);
    return token;
    //   return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
