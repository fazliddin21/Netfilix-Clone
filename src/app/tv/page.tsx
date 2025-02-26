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

const TvShow = () => {
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
          animatoin,
          comedy,
          crime,
          documentary,
          drama,
          family,
          kids,
          mystery,
          news,
          reality,
          fantasy,
          soap,
          talk,
          war,
          western,
        ] = await Promise.all([
          getMoviesBuyGanre("tv", 10759),
          getMoviesBuyGanre("tv", 16),
          getMoviesBuyGanre("tv", 35),
          getMoviesBuyGanre("tv", 80),
          getMoviesBuyGanre("tv", 99),
          getMoviesBuyGanre("tv", 18),
          getMoviesBuyGanre("tv", 10751),
          getMoviesBuyGanre("tv", 10762),
          getMoviesBuyGanre("tv", 9648),
          getMoviesBuyGanre("tv", 10762),
          getMoviesBuyGanre("tv", 10764),
          getMoviesBuyGanre("tv", 10765),
          getMoviesBuyGanre("tv", 10766),
          getMoviesBuyGanre("tv", 10767),
          getMoviesBuyGanre("tv", 10768),
          getMoviesBuyGanre("tv", 37),
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
            title: "Kids",
            data: kids,
          },
          {
            title: "Mystery",
            data: mystery,
          },
          {
            title: "News",
            data: news,
          },
          {
            title: "Reality",
            data: reality,
          },
          {
            title: "Fantasy",
            data: fantasy,
          },
          {
            title: "Soap",
            data: soap,
          },
          {
            title: "Talk",
            data: talk,
          },
          {
            title: "War",
            data: war,
          },
          {
            title: "Western",
            data: western,
          },
        ].map((item) => ({
          ...item,
          data: item.data.map(
            (item2: MovieProps) => ({
              ...item2,
              type: "tv",
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

export default TvShow;
