import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "bearer " + TMDB_TOKEN,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers: headers,
      params,
      withCredentials: false,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
