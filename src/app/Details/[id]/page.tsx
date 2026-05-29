"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { ChevronRight, Star } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface MovieType {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: Genre[];
}

const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY";

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: { Authorization: BEARER },
      })
      .then((response) => {
        setMovie(response.data);
      });
  }, [params.id]);

  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navigation />
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div>
            <h1>{movie?.original_title}</h1>
            <p>{movie?.release_date}</p>
            <span>{movie?.runtime} mins</span>
          </div>
          <div className="flex items-center">
            <Star className="fill-yellow-300 text-yellow-300 w-[24] h-[23]" />
            <p>{movie?.vote_average}</p>
          </div>
        </div>
        <div className="flex gap-[32]">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie?.original_title || "movie"}
            width={250}
            height={340}
            className="rounded-t-md object-cover min-h-[250px] "
          />
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.original_title || "movie"}
            width={730}
            height={430}
            priority
            className="rounded-t-md h-107.5 object-cover rounded-2xl shadow-2xl shadow-black/40"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-[12] ">
            {movie?.genres.map((genre) => (
              <p
                className="border rounded-[12] w-[100] flex items-center justify-center"
                key={genre.id}
              >
                {genre.name}
              </p>
            ))}
          </div>
          <h2>{movie?.overview}</h2>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black  tracking-tight">
            More this Like
          </h2>
          <button className="flex items-center gap-1 text-sm uppercase tracking-widest text-gray-400 hover:text-gray-200 transition-colors">
            See more <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
