"use client";
import ProfileAcaunt from "@/app/components/profile/page";
import Login from "@/components/components/auth/login";
import Loader from "@/components/components/loading";
import { useGlobalContext } from "@/context/context";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, {
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/components/navbar/navbar";
import { toast } from "@/hooks/use-toast";
import { getSearchResult } from "@/lib/tmbd-api";
import { MovieProps } from "@/types/main";
import MovieItem from "@/components/components/cart/MovieItem";

const Searchs = () => {
  const [movies, setMovies] = useState<
    MovieProps[]
  >([]);
  const { pageLoading, setPageLoading, account } =
    useGlobalContext();
  const params = useParams();

  let { data: session }: any = useSession();

  useEffect(() => {
    const getData = async () => {
      try {
        const [tv, movies] = await Promise.all([
          getSearchResult(
            "tv",
            params.query as string
          ),
          getSearchResult(
            "movie",
            params.query as string
          ),
        ]);
        const tvSHows = tv
          .filter(
            (item: MovieProps) =>
              item.backdrop_path !== null &&
              item.poster_path !== null
          )
          .map((tv: MovieProps) => ({
            ...tv,
            type: "tv",
          }));
        const moviesSHows = movies
          .filter(
            (item: MovieProps) =>
              item.backdrop_path !== null &&
              item.poster_path !== null
          )
          .map((tv: MovieProps) => ({
            ...tv,
            type: "movie",
          }));

        setMovies([...tvSHows, ...moviesSHows]);
      } catch (error) {
        return toast({
          variant: "destructive",
          title: "Error",
          description:
            "There was a problem opening the account.",
        });
      } finally {
        setPageLoading(false);
      }
    };

    getData();
  }, []);
  if (session === null) return <Login />;
  if (pageLoading) {
    return <Loader />;
  }
  if (account === null) return <ProfileAcaunt />;
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Navbar />

        <div className="mt-[100px]  scroll-py-0.5 md:space-y-2 px-4">
          <h2>
            Showing result for{" "}
            {decodeURI(params.query as string)}
          </h2>

          <div className="grid  grid-cols-4 gap-3 items-center scrollbar-hide md-p2">
            {movies?.length
              ? movies?.map((item) => {
                  return (
                    <MovieItem
                      key={item.id}
                      moviesRun={item}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Searchs;
