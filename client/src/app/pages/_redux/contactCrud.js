import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const CONTACT_URL = BACKEND_URL + "user/contact";

export function contact(data) {
  return axios.post(CONTACT_URL, {data});
}