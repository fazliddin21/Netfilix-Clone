"use client";
import { MovieProps } from "@/types/main";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronDown,
  PlusIcon,
} from "lucide-react";

interface Props {
  moviesRun: MovieProps;
}
const MovieItem = ({ moviesRun }: Props) => {
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
      <div className="cardWrapper relative h-28 min-w-[180px] cursor-pointer md:min-w-[260px] tranform transition duration-500 hover:scale-110 hover:z-[999]">
        <Image
          src={`${
            process.env.NEXT_PUBLIC_TMDB_IMAGE_URL
          }/${
            moviesRun.backdrop_path ||
            moviesRun.poster_path
          }`}
          alt="movie"
          fill
          className="rounded sm object-cover md:rounded hover:rounded-sm "
        />
        <div className="buttunWraper space-x-3 hidden absolute p-2 bottom-0">
          <Button className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black">
            {moviesRun.addedToFavorites ? (
              <CheckIcon
                color="#fff"
                className="h-7 w-7"
              />
            ) : (
              <PlusIcon
                color="#fff"
                className="h-7 w-7"
              />
            )}
          </Button>
          <Button className="cursor-pointer p-2 border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 ">
            <ChevronDown
              color="#fff"
              className="h-7 w-7"
            />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieItem;
