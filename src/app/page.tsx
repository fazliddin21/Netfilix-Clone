"use client";
import { useSession } from "next-auth/react";
import Login from "@/components/components/auth/login";
import { useGlobalContext } from "@/context/context";
import ProfileAcaunt from "@/app/components/profile/page";
import Loader from "@/components/components/loading";
import { useEffect, useState } from "react";
import Common from "@/components/components/navbar/commond";
import {
  getDateMovies,
  getPopulerMovies,
  getTopMovies,
} from "@/lib/tmbd-api";
import {
  MovieDataProps,
  MovieProps,
} from "@/types/main";

const Home = () => {
  let [moviesData, setMoviesData] = useState<
    MovieDataProps[]
  >([]);

  const { account, pageLoading, setPageLoading } =
    useGlobalContext();
  const { data: session, status } = useSession();

  useEffect(() => {
    const getAllMovoies = async () => {
      try {
        const [
          trendTv,
          topTv,
          populerTv,
          trendMovie,
          topMovie,
          populetMovie,
        ] = await Promise.all([
          getDateMovies("tv"),
          getTopMovies("tv"),
          getPopulerMovies("tv"),
          getDateMovies("movie"),
          getTopMovies("movie"),
          getPopulerMovies("movie"),
        ]);
        const tvSHows: MovieDataProps[] = [
          {
            title: "Trend Tv Shows",
            data: trendTv,
          },
          {
            title: "Top Tv Shows",
            data: topTv,
          },
          {
            title: "Popular Tv Shows",
            data: populerTv,
          },
        ].map((item) => ({
          ...item,
          data: item.data.map(
            (movie: MovieProps) => ({
              ...movie,
              type: "tv",
              addedToFavorites: false,
            })
          ),
        }));

        const MovieSHows: MovieDataProps[] = [
          {
            title: "Trend Movies Shows",
            data: trendMovie,
          },
          {
            title: "Top Movies Shows",
            data: topMovie,
          },
          {
            title: "Popular Movies Shows",
            data: topMovie,
          },
        ].map((item) => ({
          ...item,
          data: item.data.map(
            (movie: MovieProps) => ({
              ...movie,
              type: "movie",
              addedToFavorites: false,
            })
          ),
        }));

        const AllMovies = [
          ...tvSHows,
          ...MovieSHows,
        ];
        setMoviesData(AllMovies);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    getAllMovoies();
  }, []);
  if (session === null) return <Login />;
  if (pageLoading) {
    return <Loader />;
  }
  if (account === null) return <ProfileAcaunt />;
  return (
    <>
      <Common moviesData={moviesData} />
    </>
  );
};
export default Home;
