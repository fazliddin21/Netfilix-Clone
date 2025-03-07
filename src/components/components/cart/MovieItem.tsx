"use client";
import {
  Favoritetype,
  MovieProps,
} from "@/types/main";
import React, {
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Loader2,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useGlobalContext } from "@/context/context";
import CustumImg from "../custum-img";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props {
  moviesRun: MovieProps;
  mylist?: string;
  setFavorite?: Dispatch<
    SetStateAction<Favoritetype[]>
  >;
}
const MovieItem = ({
  moviesRun,
  mylist = "",
  setFavorite,
}: Props) => {
  let { setMovie, setOpen, account } =
    useGlobalContext();
  const { data: session }: any = useSession();
  const onOpenPopup = () => {
    setMovie(moviesRun);
    setOpen(true);
  };

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const onAdd = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "/api/favorite",
        {
          uid: session?.user?.uid,
          accountId: account?._id,
          backdrop_path: moviesRun?.backdrop_path,
          poster_path: moviesRun?.poster_path,
          movieId: moviesRun.id,
          type: moviesRun.type,
          title: moviesRun.title,
          overview: moviesRun.overview,
        }
      );
      if (data?.success) {
        return toast({
          title: "Success",
          description: "Movie added to favorites",
        });
      } else {
        return toast({
          variant: "destructive",
          title: "Error",
          description: data?.message,
        });
      }
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong, try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const OnRemove = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(
        `/api/favorite?id=${mylist}`
      );
      if (data?.success) {
        if (setFavorite) {
          setFavorite((prev: Favoritetype[]) =>
            prev.filter(
              (item: Favoritetype) =>
                item._id !== mylist
            )
          );
        }
        return toast({
          title: "Success",
          description:
            "Movie removed from favorites",
        });
      } else {
        return toast({
          variant: "destructive",
          title: "Error",
          description: data?.message,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="cardWrapper relative h-[200px] min-w-[180px] cursor-pointer md:min-w-[260px] tranform transition duration-500 hover:scale-110 hover:z-[999]">
        <CustumImg
          onClick={onOpenPopup}
          image={`${
            process.env.NEXT_PUBLIC_TMDB_IMAGE_URL
          }/${
            moviesRun.backdrop_path ||
            moviesRun.poster_path
          }`}
          alt="movie"
          className="rounded sm object-cover md:rounded hover:rounded-sm"
        />
        <div className="buttunWraper space-x-3 hidden absolute p-2 bottom-[20px]">
          <div className="cursor-pointer border flex w-{50px} items-center gap-x-2 rounded-full  text-sm font-semibold transition hover: border-white bg-black opacity-75 text-black">
            {isLoading ? (
              <Loader2
                className="h-7 w-7 animate-spin"
                color="#fff"
              />
            ) : mylist?.length ? (
              <Button
                className="cursor-pointer border flex w-{50px} items-center gap-x-2 rounded-full  text-sm font-semibold transition hover: border-white bg-black opacity-75 text-black"
                onClick={OnRemove}
              >
                <MinusIcon
                  color="red"
                  className="h-7 w-7 "
                />
              </Button>
            ) : (
              <Button
                className="cursor-pointer border flex w-{50px} items-center gap-x-2 rounded-full  text-sm font-semibold transition hover: border-white bg-black opacity-75 text-black"
                onClick={onAdd}
              >
                <PlusIcon
                  color="red"
                  className="h-7 w-7 "
                />
              </Button>
            )}
          </div>
          <Button
            onClick={onOpenPopup}
            className="cursor-pointer w-{50px}  border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 "
          >
            <ChevronDown
              color="red"
              className="h-7 w-7"
            />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieItem;
