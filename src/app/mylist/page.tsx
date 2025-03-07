"use client";

import Login from "@/components/components/auth/login";
import Loader from "@/components/components/loading";
import { useGlobalContext } from "@/context/context";
import { toast } from "@/hooks/use-toast";
import { getMyList } from "@/lib/tmbd-api";
import {
  Favoritetype,
  MovieProps,
} from "@/types/main";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileAcaunt from "../components/profile/page";
import MovieItem from "@/components/components/cart/MovieItem";
import Navbar from "@/components/components/navbar/navbar";

const Mylist = () => {
  const [favorite, setFavorite] = useState<
    Favoritetype[]
  >([]);
  const { data: session }: any = useSession();
  const { account, pageLoading, setPageLoading } =
    useGlobalContext();

  useEffect(() => {
    const getMylistFavorite = async () => {
      try {
        const { data } = await getMyList(
          session?.user?.uid,
          account?._id
        );
        setFavorite(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "There was a problem opening the account.",
        });
      } finally {
        setPageLoading(false);
      }
    };
    getMylistFavorite();
  }, [session, account]);

  if (session === null) return <Login />;
  if (pageLoading) return <Loader />;
  if (account === null) return <ProfileAcaunt />;

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      {favorite && favorite.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-lg text-gray-400">
            Sizning roʻyxatingiz bo‘sh.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Sevimli filmlaringizni saqlash uchun
            ularni qoʻshing.
          </p>
        </div>
      ) : (
        <div className="space-y-4 px-4 mt-[12vh]">
          <h2 className="text-sm font-semibold text-[#e5e5e5] mt-6 md:text-2xl">
            My list
          </h2>

          {/* Grid layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorite
              ?.map(
                (item: Favoritetype, index) => (
                  <MovieItem
                    key={index}
                    moviesRun={
                      {
                        backdrop_path:
                          item.backdrop_path,
                        poster_path:
                          item.poster_path,
                        id: +item.movieId,
                        type: item.type,
                        title: item.title,
                        overview: item.overview,
                      } as MovieProps
                    }
                    mylist={item?._id}
                    setFavorite={setFavorite}
                  />
                )
              )
              .reverse()}
          </div>
        </div>
      )}
    </main>
  );
};

export default Mylist;
