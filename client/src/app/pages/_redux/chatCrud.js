import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const CHANNELADDGET_URL = BACKEND_URL + "channel";
export const CHANNELAVATARGET_URL = BACKEND_URL + "channel/avatar";
export const MESSAGEGET_URL = BACKEND_URL + "messages/";
export const GETALLUSER_URL = BACKEND_URL + "user/";
export const CHANNELUPDATE_URL = BACKEND_URL + "channel/update";

// CREATE =>  POST: add a new customer to the server
export function CreateChannel(name, users, avatar) {
  return axios.post(CHANNELADDGET_URL, { name, users, avatar});
}

export function GetChannel() {
  return axios.get(CHANNELADDGET_URL);
}

export function UpdateChannel(type, data){
  return axios.post(CHANNELUPDATE_URL, {type, data});
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

export function GetAllAvatar() {
  return axios.get(CHANNELAVATARGET_URL);
}