"use client";
import { MovieProps } from "@/types/main";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  ChevronDown,
  PlusIcon,
} from "lucide-react";
import { useGlobalContext } from "@/context/context";
import { cn } from "@/lib/utils";
import CustumImg from "../custum-img";

interface Props {
  moviesRun: MovieProps;
}
const MovieItem = ({ moviesRun }: Props) => {
  let { setMovie, setOpen } = useGlobalContext();
  let [isloading, setIsLoading] =
    useState<boolean>(false);
  const onOpenPopup = () => {
    setMovie(moviesRun);
    setOpen(true);
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
        {/* <Image
          src={}
          alt="movie"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "",
            isloading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() =>
            setIsLoading(false)
          }
          onClick={onOpenPopup}
        /> */}
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
          <Button className="cursor-pointer border flex w-{50px} items-center gap-x-2 rounded-full  text-sm font-semibold transition hover: border-white bg-black opacity-75 text-black">
            {moviesRun.addedToFavorites ? (
              <CheckIcon
                color="#fff"
                className="h-7 w-7"
              />
            ) : (
              <PlusIcon
                color="#fff"
                className="h-7 w-7 "
              />
            )}
          </Button>
          <Button
            onClick={onOpenPopup}
            className="cursor-pointer w-{50px}  border flex items-center gap-x-2 rounded-full  text-sm font-semibold transition hover:opacity-90  border-white  bg-black opacity-75 "
          >
            <ChevronDown
              color="#fff "
              className="h-7 w-7"
            />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieItem;
