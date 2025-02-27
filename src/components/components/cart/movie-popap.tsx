import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/star-rating";
import { useGlobalContext } from "@/context/context";
import {
  getMovieDetail,
  getMovieTrlailer,
} from "@/lib/tmbd-api";
import {
  MovieDetail,
  MovieProps,
} from "@/types/main";
import React, {
  useEffect,
  useState,
} from "react";
import MovieItem from "./MovieItem";
import ReactPlayer from "react-player";

const MoviePopup = () => {
  let { open, setOpen, movie } =
    useGlobalContext();

  let [detail, setDetail] =
    useState<MovieDetail | null>(null);

  let [getTrailer, setGetTrailer] = useState<
    MovieProps[]
  >([]);

  let [playMovie, setPlayMovie] =
    useState<string>("");
  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const extrackedDetail =
          await getMovieDetail(
            movie?.type,
            movie?.id
          );
        const getTrailerMovie =
          await getMovieTrlailer(
            movie?.type,
            movie?.id
          );

        const rest = getTrailerMovie.map(
          (item: MovieProps) => ({
            ...item,
            type: extrackedDetail?.type,
            addedToFavorites: false,
          })
        );
        setDetail(extrackedDetail?.data);
        setGetTrailer(rest);

        const findPlayMovie = extrackedDetail
          ?.data?.videos?.results?.length
          ? extrackedDetail.data?.videos?.results?.findIndex(
              (item: { type: string }) =>
                item.type === "Trailer"
            )
          : -1;

        const findIndexOFClip = extrackedDetail
          ?.data?.videos?.results?.length
          ? extrackedDetail.data?.videos?.results?.findIndex(
              (item: { type: string }) =>
                item.type === "Clip"
            )
          : -1;

        let key;

        if (findPlayMovie !== -1) {
          key =
            extrackedDetail?.data?.videos
              ?.results[findPlayMovie]?.key;
        } else if (findIndexOFClip !== -1) {
          key =
            extrackedDetail?.data?.videos
              ?.results[findIndexOFClip]?.key;
        } else {
          null;
        }
        setPlayMovie(key);
      } catch (error) {}
    };

    if (movie !== null) {
      getDetailMovie();
    }
  }, [movie]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh]  overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-red-600">
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${playMovie}`}
              width={"100%"}
              height={"100%"}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
              }}
              playing
              controls
            />
          </div>
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
          <div className="bg-black p-4 rounded shadow-2xl">
            <h2 className="mt-2 mb-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
              More Like This
            </h2>
            <div className="grid grid-cols-3 gap-3 items-center scrollbar-hide md:p-2">
              {getTrailer?.length &&
                getTrailer
                  .filter(
                    (item) =>
                      item.backdrop_path !==
                        null &&
                      item.poster_path !== null
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MoviePopup;
