"use client";
import { MovieProps } from "@/types/main";
import React from "react";
import MovieItem from "./MovieItem";

interface Props {
  title: string;
  data: MovieProps[];
}
const MovieCart = ({ title, data }: Props) => {
  return (
    <div className="h-40 space-y-0.5 md:space-y-2 px-4">
      <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl ">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <div className="flex items-center  scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
          {data &&
            data
              .filter(
                (movie) =>
                  movie.backdrop_path !== null &&
                  movie.poster_path !== null
              )
              .map((item) => {
                return (
                  <MovieItem
                    key={item.id}
                    moviesRun={item}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default MovieCart;
