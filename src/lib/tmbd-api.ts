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

export const getMoviesBuyGanre = async (
  type: string,
  id: number
) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`
    );
    return data && data.results;
  } catch (error) {
    console.log(error);
  }
};


export const getMovieDetail = async (type?: string, id?: number) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`)
    return { data, type }
  } catch (error) {

  }
}


export const getMovieTrlailer = async (type?: string, id?: number) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`)
    return data && data.results
  } catch (error) {

  }
}


export const getFavorites = async (uid?: string, accountId?: string) => {
  try {
    const { data } = await axios.get(`/api/favorite?uid=${uid}&accountId=${accountId}`)
    return data && data.data
  } catch (error) {

  }
}


export const getMyList = async (uid?: string, accountId?: string) => {
  try {


    const { data } = await axios.get(`/api/favorite?uid=${uid}&accountId=${accountId}`);
    return data;
  } catch (error) {
    console.error("API so‘rov xatosi:", error);
    return null;
  }
};


export const getSearchResult = async (type: string, query: string) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&query=${query}`
    );
    return data?.results;
  } catch (error) {
    console.log(error);
  }
};
