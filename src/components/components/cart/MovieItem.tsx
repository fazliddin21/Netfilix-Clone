"use client";
import { MovieProps } from "@/types/main";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronDown,
  PlusIcon,
} from "lucide-react";
import { useGlobalContext } from "@/context/context";
import CustumImg from "../custum-img";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props {
  moviesRun: MovieProps;
}
const MovieItem = ({ moviesRun }: Props) => {
  let { setMovie, setOpen, account } =
    useGlobalContext();
  const { data: session }: any = useSession();
  const onOpenPopup = () => {
    setMovie(moviesRun);
    setOpen(true);
  };

  const onAdd = async () => {
    console.log("start");

    try {
      const { data } = await axios.post(
        "/api/favorite",
        {
          uid: session?.user?.uid,
          accountId: account?._id,
          backdrop_path: moviesRun?.backdrop_path,
          poster_path: moviesRun?.poster_path,
          movieId: moviesRun.id,
          type: moviesRun.type,
        }
      );
      console.log("API response:", data);
    } catch (error) {
      return toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong, try again later",
      });
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
            {moviesRun.addedToFavorites ? (
              <Button className="cursor-pointer border flex w-{50px} items-center gap-x-2 rounded-full  text-sm font-semibold transition hover: border-white bg-black opacity-75 text-black">
                <CheckIcon
                  color="red"
                  className="h-7 w-7"
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
