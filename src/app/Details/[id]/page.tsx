"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { Star } from "lucide-react";

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface MovieType {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  softcore: boolean;
  spoken_languages: SpokenLanguage[];
  status: string; // "Released", "Post Production" гм
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieType>();
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY",
        },
      })
      .then((response) => {
        setMovie(response.data);
      });
  }, [params.id]);
  console.log(movie);
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navigation />
      <div className="flex justify-between">
        <div>
          <h1>{movie?.original_title}</h1>
          <p>{movie?.release_date}</p>
          <span>{movie?.runtime} mins</span>
        </div>
        <div className="flex items-center">
          <Star className="fill-yellow-300 text-yellow-300 w-[24] h-[23]" />{" "}
          <p>{movie?.vote_average}</p>
        </div>
      </div>
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.original_title || "movie"}
          width={250}
          height={340}
          className="rounded-t-md object-cover"
        />
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.original_title || "movie"}
          width={730}
          height={430}
          priority
          className=" h-107.5
    object-cover
    rounded-2xl
    shadow-2xl
    shadow-black/40"
        />
        <div>
          <div>
            {movie?.genres.map((genre) => {
              return <p key={genre.id}>{genre.name}</p>;
            })}
            <h2>{movie?.overview}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
