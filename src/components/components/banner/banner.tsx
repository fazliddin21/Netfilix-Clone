"use client";
import { MovieProps } from "@/types/main";

import {
  MoreHorizontalIcon,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
interface Prpos {
  movies: MovieProps[];
}
const Banner = ({ movies }: Prpos) => {
  let [randomMovie, setRandomMovie] =
    React.useState<MovieProps | null>(null);
  useEffect(() => {
    const movie =
      movies[
        Math.floor(Math.random() * movies.length)
      ];
    setRandomMovie(movie);
  }, []);

  return (
    <div className="flex flex-col  space-y-2 py-16 md:space-y-4 lg:justify-end lg:h-[65vh] lg:pb-12 lg:pl-24">
      <div className="absolute top-0 left-0 h-[95vh]  w-full -z-10">
        <Image
          src={`${
            process.env.NEXT_PUBLIC_TMDB_IMAGE_URL
          }/${
            randomMovie?.backdrop_path ||
            randomMovie?.poster_path
          }`}
          alt="Banner"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute w-full h-56 bg-gradient-to-t from-white to-transparent bottom-0 z-20 "></div>
        <div className="absolute w-full h-full bg-gradient-to-r from-slate-800 to-transparent bottom-0 z-20 "></div>
      </div>
      <h1 className="text-2xl text-green-600 md:text-4xl lg:text-7xl font-bold">
        {randomMovie?.title ||
          randomMovie?.name ||
          randomMovie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5 ">
        {randomMovie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-white text-black">
          <PlayCircle className="h-4 w-4 text-black md:h-7 md:w-7 cursor-pointer" />
          Play
        </button>
        <button className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70">
          <MoreHorizontalIcon className="h-5 w-5  md:h-8 md:w-8 cursor-pointer" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
