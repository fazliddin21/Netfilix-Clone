"use client";
import { MovieProps } from "@/types/main";
import React, { useCallback } from "react";
import MovieItem from "./MovieItem";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {
  title: string;
  data: MovieProps[];
}

const MovieCart = ({ title, data }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative space-y-2 px-4">
      <h2 className="text-sm font-semibold text-[#e5e5e5] md:text-2xl">
        {title}
      </h2>

      <div className="relative">
        {/* Oldingi rasmga o'tish tugmasi */}
        <Button
          onClick={scrollPrev}
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full flex hover:bg-black/75"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>

        {/* Carousel */}
        <div
          ref={emblaRef}
          className="overflow-hidden"
        >
          <div className="flex">
            {data
              .filter(
                (movie) =>
                  movie.backdrop_path &&
                  movie.poster_path
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_50%] md:flex-[0_0_20%] px-1"
                >
                  <MovieItem moviesRun={item} />
                </div>
              ))}
          </div>
        </div>

        {/* Keyingi rasmga o'tish tugmasi */}
        <Button
          onClick={scrollNext}
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full flex hover:bg-black/75"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default MovieCart;
