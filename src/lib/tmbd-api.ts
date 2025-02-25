import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_URL;

export let getDateMovies = async (
  type: string
) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};

export let getTopMovies = async (
  type: string
) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};
export let getPopulerMovies = async (
  type: string
) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};
