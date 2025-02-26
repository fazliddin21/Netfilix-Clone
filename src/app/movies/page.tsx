"use client";
import Login from "@/components/components/auth/login";
import Loader from "@/components/components/loading";
import { useGlobalContext } from "@/context/context";
import {
  MovieDataProps,
  MovieProps,
} from "@/types/main";
import React, {
  useEffect,
  useState,
} from "react";
import ProfileAcaunt from "../components/profile/page";
import { useSession } from "next-auth/react";
import { getMoviesBuyGanre } from "@/lib/tmbd-api";
import Common from "@/components/components/navbar/commond";

const MoviesShow = () => {
  let [moviesData, setMoviesData] = useState<
    MovieDataProps[]
  >([]);

  const { account, pageLoading, setPageLoading } =
    useGlobalContext();
  const { data: session, status } = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [
          action,
          adventure,
          animatoin,
          comedy,
          crime,
          documentary,
          drama,
          family,
          fantasy,
          history,
          horror,
          music,
          mystery,
          romance,
          science,
          tv_movie,
          thriller,
          war,
          western,
        ] = await Promise.all([
          getMoviesBuyGanre("movie", 28),
          getMoviesBuyGanre("movie", 12),
          getMoviesBuyGanre("movie", 16),
          getMoviesBuyGanre("movie", 35),
          getMoviesBuyGanre("movie", 80),
          getMoviesBuyGanre("movie", 99),
          getMoviesBuyGanre("movie", 18),
          getMoviesBuyGanre("movie", 10751),
          getMoviesBuyGanre("movie", 14),
          getMoviesBuyGanre("movie", 36),
          getMoviesBuyGanre("movie", 27),
          getMoviesBuyGanre("movie", 10402),
          getMoviesBuyGanre("movie", 9648),
          getMoviesBuyGanre("movie", 10749),
          getMoviesBuyGanre("movie", 878),
          getMoviesBuyGanre("movie", 10770),
          getMoviesBuyGanre("movie", 53),
          getMoviesBuyGanre("movie", 10752),
          getMoviesBuyGanre("movie", 37),
        ]);

        const allRest: MovieDataProps[] = [
          {
            title: "Action",
            data: action,
          },
          {
            title: "Animation",
            data: animatoin,
          },
          {
            title: "Comedy",
            data: comedy,
          },
          {
            title: "Crime",
            data: crime,
          },
          {
            title: "Documentary",
            data: documentary,
          },
          {
            title: "Drama",
            data: drama,
          },
          {
            title: "Family",
            data: family,
          },

          {
            title: "Mystery",
            data: mystery,
          },

          {
            title: "Fantasy",
            data: fantasy,
          },

          {
            title: "War",
            data: war,
          },
          {
            title: "Western",
            data: western,
          },
          {
            title: "History",
            data: history,
          },
          {
            title: "Horror",
            data: horror,
          },
          {
            title: "Music",
            data: music,
          },
          {
            title: "Romance",
            data: romance,
          },
          {
            title: "Science Fiction",
            data: science,
          },
          {
            title: "Thriller",
            data: thriller,
          },
          {
            title: "TV Movie",
            data: tv_movie,
          },
          {
            title: "Adventure",
            data: adventure,
          },
        ].map((item) => ({
          ...item,
          data: item.data.map(
            (item2: MovieProps) => ({
              ...item2,
              type: "movie",
              addedToFovorite: false,
            })
          ),
        }));
        setMoviesData(allRest);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoading(false);
      }
    };

    getAllMovies();
  }, []);
  // [ -------------------------  If Else -----------------------------------------------]
  if (session === null) return <Login />;
  if (pageLoading) {
    return <Loader />;
  }
  if (account === null) return <ProfileAcaunt />;
  // [-------------------------------Contetn qismi--------------------------------------------------------]
  return (
    <>
      <Common moviesData={moviesData} />
    </>
  );
};

export default MoviesShow;
