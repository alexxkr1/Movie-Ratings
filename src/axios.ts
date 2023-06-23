import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/",
  headers: {
    Authorization: `Bearer ${import.meta.env.moviesApiKey}`,
  },
});
