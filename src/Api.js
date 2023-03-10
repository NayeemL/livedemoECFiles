import axios from "axios";

const API_URL = "https://ecfiles-backend.onrender.com/";

const Api = axios.create({
  baseURL: API_URL,
});

export default Api;