"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
interface MovieCardProps {
  page?: number;
}


const TopRatedMovies = ({page}:MovieCardProps) => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY",
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, [page]);

  return (
    <div className="grid grid-cols-5 gap-6 px-16 mt-10">
      {movies.map((movie) => (
        <Card key={movie.id} className="border-none px-0 py-0 bg-[#F4F4F5]">
          <CardContent className="px-0 py-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={250}
              height={340}
              className="w-full rounded-t-md object-cover"
            />
            <div className="mt-2 p-2">
              <p className="flex items-center gap-1">
                <Star fill="yellow" stroke="yellow" size={16} />
                <span className="ml-1 text-sm font-medium">
                  {movie.vote_average.toFixed(1)}
                </span>
                /10
              </p>
              <p className="font-bold text-lg truncate">{movie.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopRatedMovies;
