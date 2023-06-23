import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjUxOWNiZjlkYzc5YjFjZDYxYTI4M2I3YjhhOGI3ZCIsInN1YiI6IjY0OTRiM2ZjZDIzNmU2MDExZTA5ODg3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._C-U5_IOlj-OSQBtg00EShhXDwyJdgrVLFIE4IUS48M",
  },
});
