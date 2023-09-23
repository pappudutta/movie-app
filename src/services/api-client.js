import axios from "axios";

//todo  apikey: 3dc91e9a22e2d1520b40e9732d06de16

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TOKEN_TMDB;

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

// create anonymous function
const getDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default getDataFromApi;
// export default getDataFromApi;

// export const getDataFromApi = async (url, params) => {
//   try {
//     const { data, status } = await axios.get(BASE_URL + url, {
//       headers,
//       params,
//     });
//     console.log(status);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// export const getDataFromApi = async (url, params) => {
//   try {
//     const response = await fetch(BASE_URL + url, {
//       headers,
//       params,
//       // method: "GET",
//     });

//     // const data = await response.json();
//     // return data;
//     return response.json();
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };
