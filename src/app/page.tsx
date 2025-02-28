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
  getFavorites,
  getPopulerMovies,
  getTopMovies,
} from "@/lib/tmbd-api";
import {
  Favoritetype,
  MovieDataProps,
  MovieProps,
} from "@/types/main";

const Home = () => {
  let [moviesData, setMoviesData] = useState<
    MovieDataProps[]
  >([]);

  const { account, pageLoading, setPageLoading } =
    useGlobalContext();
  const { data: session }: any = useSession();

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
          favorites,
        ] = await Promise.all([
          getDateMovies("tv"),
          getTopMovies("tv"),
          getPopulerMovies("tv"),
          getDateMovies("movie"),
          getTopMovies("movie"),
          getPopulerMovies("movie"),
          getFavorites(
            session?.user?.uid,
            account?._id
          ),
        ]);
        console.log(favorites);

        const tvShows: MovieDataProps[] = [
          {
            title: "Trend Tv Shows",
            data: trendTv,
          },
          { title: "Top Tv Shows", data: topTv },
          {
            title: "Popular Tv Shows",
            data: populerTv,
          },
        ].map((item, index) => ({
          id: index.toString(),
          title: item.title,
          poster_path:
            item.data.length > 0
              ? item.data[0].poster_path
              : null,
          backdrop_path:
            item.data.length > 0
              ? item.data[0].backdrop_path
              : null,
          data: item.data.map(
            (movie: MovieProps) => ({
              ...movie,
              type: "tv",
              addedToFavorites: favorites.length
                ? favorites
                    .map(
                      (item: Favoritetype) =>
                        item.movieId
                    )
                    .indexOf(movie.id)
                : false,
            })
          ),
        }));

        const movieShows: MovieDataProps[] = [
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
            data: populetMovie,
          }, // To'g'ri versiya
        ].map((item, index) => ({
          id: (index + tvShows.length).toString(), // Id sifatida string ishlatildi
          title: item.title,
          poster_path:
            item.data.length > 0
              ? item.data[0].poster_path
              : null,
          backdrop_path:
            item.data.length > 0
              ? item.data[0].backdrop_path
              : null,
          data: item.data.map(
            (movie: MovieProps) => ({
              ...movie,
              type: "movie",
              addedToFavorites: favorites.length
                ? favorites
                    .map(
                      (item: Favoritetype) =>
                        item.movieId
                    )
                    .indexOf(movie.id)
                : false,
            })
          ),
        }));

        const AllMovies = [
          ...tvShows,
          ...movieShows,
        ];
        setMoviesData(AllMovies);
      } catch (error) {
      } finally {
        setPageLoading(false);
      }
    };

    getAllMovoies();
  }, [session]);
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
