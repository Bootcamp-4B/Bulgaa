"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import { ChevronRight, Star, Clock, Calendar } from "lucide-react";
import TrailerButton from "@/components/TrailerButton";
import MovieCard from "@/components/MovieCard";
import { tmdbHeaders } from "@/lib/tmdb";

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
  backdrop_path: string;
  genres: Genre[];
}

interface SimilarMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
  vote_count: number;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

const Detail = () => {
  const params = useParams();

  const [movie, setMovie] = useState<MovieType>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [directors, setDirectors] = useState<CrewMember[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: tmdbHeaders,
      })
      .then((response) => setMovie(response.data));
  }, [params.id]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers: tmdbHeaders,
      })
      .then((response) => {
        const data = response.data;
        setCast(data.cast.slice(0, 8));
        setDirectors(data.crew.filter((p: CrewMember) => p.job === "Director"));
      });
  }, [params.id]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/videos`, {
        headers: tmdbHeaders,
      })
      .then((response) => {
        const videos: Video[] = response.data.results;
        const found =
          videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
          videos.find((v) => v.site === "YouTube");
        setTrailerKey(found ? found.key : null);
      });
  }, [params.id]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=1`,
        { headers: tmdbHeaders },
      )
      .then((response) => setSimilarMovies(response.data.results.slice(0, 5)));
  }, [params.id]);

  return (
    <div className="min-h-screen w-full bg-[#0d0d14] text-white overflow-x-hidden">
      {/* BACKDROP HERO */}
      <div className="relative w-full h-screen">
        {movie?.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.original_title || "backdrop"}
            fill
            priority
            className="object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0d0d14]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14]/70 via-transparent to-transparent" />

        <div className="absolute top-0 left-0 right-0 z-20">
          <Navigation />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-10">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {movie?.poster_path && (
              <div className="flex-shrink-0 hidden md:block">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title || "poster"}
                  width={180}
                  height={270}
                  className="rounded-xl shadow-2xl shadow-black/80 ring-1 ring-white/10 object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-3 pb-2">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-lg">
                {movie?.original_title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-gray-400" />
                  {movie?.release_date?.slice(0, 4)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gray-400" />
                  {movie?.runtime} mins
                </span>
                <span className="flex items-center gap-1.5 bg-yellow-400/15 text-yellow-300 px-2.5 py-0.5 rounded-full font-semibold text-xs">
                  <Star size={12} className="fill-yellow-300 text-yellow-300" />
                  {movie?.vote_average?.toFixed(1)}
                </span>
                {directors.length > 0 && (
                  <span className="text-gray-400 text-xs">
                    Director:{" "}
                    <span className="text-white font-medium">
                      {directors.map((d) => d.name).join(", ")}
                    </span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {movie?.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full border border-white/20 bg-white/10 text-gray-200 backdrop-blur-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed max-w-2xl text-sm md:text-[15px] line-clamp-3">
                {movie?.overview}
              </p>

              {trailerKey && <TrailerButton trailerKey={trailerKey} />}
            </div>
          </div>
        </div>
      </div>

      {/* ДООД ХЭСЭГ */}
      <div className="px-6 md:px-12 lg:px-20 pb-16 pt-12 space-y-14">
        {/* ЖҮЖИГЧИД */}
        {cast.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight">Actors</h2>
              <button className="flex items-center gap-1 text-xs uppercase tracking-widest text-gray-500 hover:text-gray-200 transition-colors">
                See more <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {cast.map((actor) => (
                <div
                  key={actor.id}
                  className="flex flex-col items-center gap-2 text-center group"
                >
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/30">
                        {actor.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-tight">
                      {actor.name}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5 line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MORE LIKE THIS */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-tight">More Like This</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {similarMovies.length > 0
              ? similarMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={{
                      ...movie,
                      backdrop_path: movie.backdrop_path ?? "",
                      poster_path: movie.poster_path ?? "",
                    }}
                  />
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-gray-100 aspect-[2/3] animate-pulse"
                  />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Detail;
