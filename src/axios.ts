import axios from "axios";

export const httpClient = axios.create({
  // baseURL: 'https://api.themoviedb.org/3',
  baseURL: "https://api.themoviedb.org/",
});
