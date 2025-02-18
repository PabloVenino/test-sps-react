import axios from "axios";

let BASE_URL_DEV = "http://localhost:3001"
let VERSION = "v1"

const base_url = `${BASE_URL_DEV}/api/${VERSION}`;

const api = axios.create({
  baseURL: base_url
});

api.interceptors.request.use(async (config) => {
    const token = await localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  });
  
export default api;

const login = `${base_url}/auth`;

export const auth_endpoints = {
  login
}

const create_user = `${base_url}/user`;
const update_user = (id) => `${base_url}/user/${id}`;
const get_user = (id) => `${base_url}/user`;
const get_users = `${base_url}/user`;
const delete_user = (id) => `${base_url}/user/${id}`;

export const user_endpoints = {
    create_user,
    update_user,
    get_user,
    get_users,
    delete_user
}