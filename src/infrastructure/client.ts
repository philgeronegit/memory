import axios from "axios";

// const BASE_URL = "https://gerhardt.needemand.com/memory";
const BASE_URL = "http://localhost/memory";

export const apiClient = axios.create({ baseURL: BASE_URL });
