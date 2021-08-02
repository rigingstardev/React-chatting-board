import axios from "axios";
const backendurl = "http://10.10.10.164:5000"
export const LOGIN_URL = `${backendurl}/api/user/login`;
export const REGISTER_URL = `${backendurl}/api/user/signup`;
export const REQUEST_PASSWORD_URL = "/api/user/forgot-password";

export const ME_URL = `${backendurl}/api/user/me`;

export function login(email, password) {
    // console.log(LOGIN_URL);
    return axios.post(LOGIN_URL, { email, password });
}

export function register(formData) {
    return axios.post(REGISTER_URL, formData);
}

export function requestPassword(email) {
    return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
    // Authorization head should be fulfilled in interceptor.
    return axios.get(ME_URL);
}