import axios from "axios";
import { log } from "console";

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


export const  getMovieDetail = async (type?:string, id?:number)=>{
  try {
    const {data} = await axios.get(
      `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`)
      return data 
  } catch (error) {
    
  }
}