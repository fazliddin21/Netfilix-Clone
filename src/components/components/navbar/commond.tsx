"use client";
import React from "react";
import Navbar from "./navbar";
import { MovieDataProps } from "@/types/main";
import Banner from "../banner/banner";
import MovieCart from "../cart/MovieCart";
interface Props {
  moviesData: MovieDataProps[];
}
const Common = ({ moviesData }: Props) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="relative pl-4 pb-24 lg:space-y-24">
        <Banner
          movies={
            moviesData && moviesData[0]?.data
          }
        />

        <section className="md:space-y-16">
          {moviesData &&
            moviesData.map((item) => {
              return (
                <MovieCart
                  key={item.title}
                  title={item.title}
                  data={item.data}
                />
              );
            })}
        </section>
      </div>
    </main>
  );
};

export default Common;
