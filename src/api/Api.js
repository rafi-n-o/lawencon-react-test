import axios from "axios";

const Api = axios.create({
  baseURL: `https://www.omdbapi.com`,
});

export default Api;
