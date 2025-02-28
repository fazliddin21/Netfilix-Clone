import {
  Dispatch,
  Key,
  ReactNode,
  SetStateAction,
} from "react";
export interface ContextType {
  account: AccountProps | null;
  setAccount: Dispatch<
    SetStateAction<AccountProps | null>
  >;
  pageLoading: boolean;
  setPageLoading: Dispatch<
    SetStateAction<boolean>
  >;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  movie: MovieProps | null;
  setMovie: Dispatch<SetStateAction<MovieProps | null>>
}
export interface AccountProps {
  _id: string;
  uid: string;
  name: string;
  pin: number;
}
export interface ChildProps {
  children: ReactNode;
}
export interface AxsiosResponseT {
  success: boolean;
  messege?: string;
}
export interface AxiosType
  extends AxsiosResponseT {
  accounts(accounts: any): unknown;
  data: AccountProps[] | AccountProps;
}

export interface MenuItemType {
  id: string;
  title: string;
  path: string;
}

export interface MovieDataProps {
  id: Key | null | undefined;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  data: MovieProps[];
}

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  type: string;
  vote_average: number;
  vote_count: number;
  title: string;
  addedToFavorites: boolean;
  moveId: number;
}


export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path?: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: { results: VideoDetail[] };
  vote_average: number;
  vote_count: number;
}
export interface VideoDetail {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
