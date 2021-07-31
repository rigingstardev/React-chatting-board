import axios from "axios";

const BACKEND_URL = "http://118.222.122.161:5000/api/";
export const CHANNELADDGET_URL = BACKEND_URL + "channel";
export const MESSAGEGET_URL = BACKEND_URL + "messages";

// CREATE =>  POST: add a new customer to the server
export function CreateChannel(name) {
    return axios.post(CHANNELADDGET_URL, { name });
}

export function GetChannel() {
    return axios.get(CHANNELADDGET_URL);
}

export function GetMessage(channelId) {
    return axios.get(MESSAGEGET_URL + "/" + channelId);
}