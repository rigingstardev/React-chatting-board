import axios from "axios";

export const LOGIN_URL = "/api/auth/signin";
export const REGISTER_URL = "/api/auth/signup";
export const REQUEST_PASSWORD_URL = "/api/auth/forgot-password";

export const ME_URL = "/api/auth/me";

export function login(email, password) {
  // console.log(LOGIN_URL);
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
