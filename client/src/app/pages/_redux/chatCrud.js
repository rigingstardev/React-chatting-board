import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const CHANNELADDGET_URL = BACKEND_URL + "channel";
export const MESSAGEGET_URL = BACKEND_URL + "messages/";
export const GETALLUSER_URL = BACKEND_URL + "user/";

// CREATE =>  POST: add a new customer to the server
export function CreateChannel(name, users) {
  return axios.post(CHANNELADDGET_URL, { name, users });
}

export function GetChannel() {
  return axios.get(CHANNELADDGET_URL);
}

export function GetMessage(id, type = "private") {
  let url = MESSAGEGET_URL;
  if (type === "private") {
    url += type + "/";
  }
  return axios.get(url + id);
}

export function ReadDirectMessage(id) {
  let url = MESSAGEGET_URL + "/read/private/";
  return axios.patch(url + id);
}

export function GetAllUsers() {
  return axios.get(GETALLUSER_URL);
}