import axios from 'axios';
const backendurl = process.env.REACT_APP_BACKEND_URL;
const GETALLUSER = `${backendurl}user/`;

export function GetAllUsers(){
    return axios.get(GETALLUSER);
}