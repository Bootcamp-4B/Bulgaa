"use client";
import Navigation from "@/components/Navigation";
import FeaturedMovies from "@/components/FeaturedMovies";
import GroupMovie from "@/components/GroupMovie";
import { useEffect, useState } from "react";
import axios from "axios";
import { tmdbHeaders } from "@/lib/tmdb";

export interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const fetchMovies = (category: string) =>
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      {
        headers: tmdbHeaders,
      },
    )
    .then((res) => res.data.results);

export default function Home() {
  const [upcoming, setUpcoming] = useState<MovieType[]>([]);
  const [topRated, setTopRated] = useState<MovieType[]>([]);
  const [popular, setPopular] = useState<MovieType[]>([]);
  const [nowPlaying, setNowPlaying] = useState<MovieType[]>([]); // ✅ нэмэгдсэн

  useEffect(() => {
    fetchMovies("upcoming").then(setUpcoming);
    fetchMovies("top_rated").then(setTopRated);
    fetchMovies("popular").then(setPopular);
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navigation />
      <FeaturedMovies />
      <div className="w-full px-16 mt-12">
        <GroupMovie title="Popular" movies={popular} href="/movies/popular" />
        <GroupMovie
          title="Top Rated"
          movies={topRated}
          href="/movies/top-rated"
        />
        <GroupMovie
          title="Upcoming"
          movies={upcoming}
          href="/movies/upcoming"
        />
      </div>
    </div>
  );
}
