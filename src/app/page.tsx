"use client";
import Navigation from "@/components/Navigation";
import FeaturedMovies from "@/components/FeaturedMovies";
import GroupMovie from "@/components/GroupMovie";
import { useEffect, useState } from "react";
import axios from "axios";

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

const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY";

const fetchMovies = (category: string) =>
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      {
        headers: { Authorization: BEARER },
      },
    )
    .then((res) => res.data.results);

export default function Home() {
  const [upcoming, setUpcoming] = useState<MovieType[]>([]);
  const [topRated, setTopRated] = useState<MovieType[]>([]);
  const [popular, setPopular] = useState<MovieType[]>([]);

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
        <GroupMovie title="Upcoming" movies={upcoming} href="/Upcoming" />
        <GroupMovie title="Top Rated" movies={topRated} href="/TopRated" />
        <GroupMovie title="Popular" movies={popular} href="/Popular" />
      </div>
    </div>
  );
}
