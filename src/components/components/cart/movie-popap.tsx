import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/star-rating";
import { useGlobalContext } from "@/context/context";
import { getMovieDetail } from "@/lib/tmbd-api";
import { MovieDetail } from "@/types/main";
import React, {
  useEffect,
  useState,
} from "react";

const MoviePopup = () => {
  let { open, setOpen, movie } =
    useGlobalContext();

  let [detail, setDetail] =
    useState<MovieDetail | null>(null);

  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const extrackedDetail =
          await getMovieDetail(
            movie?.type,
            movie?.id
          );
        setDetail(extrackedDetail);
      } catch (error) {}
    };
    getDetailMovie();
  }, [movie, open]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <div className="w-full h-56 bg-black"></div>
          <div className="flex items-center flex-col space-y-4">
            <h1 className="text-2xl text-green-600 md:text-4xl lg:text-4xl font-bold">
              {movie?.title ||
                movie?.name ||
                movie?.original_name}
            </h1>
            <p className=" text-shadow-md text-sm text-slate-500">
              {movie?.overview}
            </p>
            <div className="flex items-center space-x-2">
              <StarRating
                initialRating={
                  movie?.vote_average
                }
                readonly
                totalStars={10}
              />
              <p className="text-[#e5b109]">
                ({movie?.vote_count})
              </p>
              <div className="text-green-400  font-semibold flex gap-2">
                <span className="text-green-400 font-semibold">
                  {detail?.release_date
                    ? detail.release_date.split(
                        "-"
                      )[0]
                    : "2024"}
                </span>
                <div className="inline-flex text-green-400 font-semibold border-2 border-white/40  rounded px-2">
                  HD
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoviePopup;
