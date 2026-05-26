// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axios from "axios";
// import Navigation from "@/components/Navigation";

// // 1. Туслах интерфэйсүүд (Sub-interfaces)
// interface Genre {
//   id: number;
//   name: string;
// }

// interface ProductionCompany {
//   id: number;
//   logo_path: string | null;
//   name: string;
//   origin_country: string;
// }

// interface ProductionCountry {
//   iso_3166_1: string;
//   name: string;
// }

// interface SpokenLanguage {
//   english_name: string;
//   iso_639_1: string;
//   name: string;
// }

// interface MovieType {
//   adult: boolean;
//   backdrop_path: string | null;
//   belongs_to_collection: any | null;
//   budget: number;
//   genres: Genre[];
//   homepage: string;
//   id: number;
//   imdb_id: string;
//   origin_country: string[];
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string | null;
//   production_companies: ProductionCompany[];
//   production_countries: ProductionCountry[];
//   release_date: string;
//   revenue: number;
//   runtime: number;
//   softcore: boolean;
//   spoken_languages: SpokenLanguage[];
//   status: string; // "Released", "Post Production" гм
//   tagline: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

// const Detail = () => {
//   const params = useParams();
//   const [movie, setMovie] = useState<MovieType>();
//   useEffect(() => {
//     axios
//       .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY",
//         },
//       })
//       .then((response) => {
//         setMovie(response.data);
//       });
//   }, [params.id]);
//   console.log(movie);
//   return (
//     <div className="w-full h-full overflow-x-hidden">
//       <Navigation />
//       <div>
//         <h1>{movie?.original_title}</h1>
//         <p>{movie?.release_date}</p>
//         <p>{movie?.runtime} mins</p>
//         <p>{movie?.vote_average}</p>
//       </div>
//       <div>
//         <Image
//           src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//           alt={movie?.original_title}
//           width={250}
//           height={340}
//           className="w-full rounded-t-md object-cover"
//         />
//         <div>
//           <div>
//             {movie?.genres.map((genre) => {
//               return <p key={genre.id}>{genre.name}</p>;
//             })}
//             <h2>{movie?.overview}</h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Detail;
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Navigation from "@/components/Navigation";

// ─── Interfaces ───────────────────────────────────────────────────────────────

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
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
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
  department: string;
  profile_path: string | null;
}

interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatMoney = (n: number) =>
  n > 0 ? "$" + (n / 1_000_000).toFixed(0) + "M" : "N/A";

const formatRuntime = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
};

const StarRating = ({ score }: { score: number }) => {
  const filled = Math.round(score / 2);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < filled ? "text-amber-400" : "text-zinc-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-zinc-400 text-sm ml-1">{score.toFixed(1)}/10</span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const headers = { Authorization: BEARER };

    Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${params.id}`, { headers }),
      axios.get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers,
      }),
    ]).then(([movieRes, creditsRes]) => {
      setMovie(movieRes.data);
      setCredits(creditsRes.data);
      setLoading(false);
    });
  }, [params.id]);

  const directors = credits?.crew.filter((c) => c.job === "Director") ?? [];
  const topCast = credits?.cast.slice(0, 8) ?? [];

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      <Navigation />

      {/* ── Backdrop ── */}
      <div className="relative w-full h-screen min-h-[600px]">
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority
            className="object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex gap-6 md:gap-8 items-end max-w-6xl mx-auto">
          {/* Poster */}
          {movie.poster_path && (
            <div className="hidden sm:block shrink-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 relative w-[160px] h-[240px] md:w-[200px] md:h-[300px] lg:w-[220px] lg:h-[330px]">
              <Image
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex-1 pb-2">
            {movie.tagline && (
              <p className="text-amber-400/80 text-sm italic mb-2 tracking-wide">
                "{movie.tagline}"
              </p>
            )}

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-1">
              {movie.title}
            </h1>

            {movie.original_title !== movie.title && (
              <p className="text-zinc-400 text-sm mb-3">
                {movie.original_title}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400 mb-4">
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span className="text-zinc-700">·</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span className="text-zinc-700">·</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  movie.status === "Released"
                    ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800"
                    : "bg-amber-900/50 text-amber-400 border border-amber-800"
                }`}>
                {movie.status}
              </span>
            </div>

            <StarRating score={movie.vote_average} />

            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 rounded-full text-xs border border-zinc-700 text-zinc-300 bg-zinc-800/60 backdrop-blur-sm">
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Overview + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              Overview
            </h2>
            <p className="text-zinc-300 leading-relaxed text-[15px]">
              {movie.overview}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              Details
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Budget", value: formatMoney(movie.budget) },
                { label: "Revenue", value: formatMoney(movie.revenue) },
                { label: "Votes", value: movie.vote_count.toLocaleString() },
                {
                  label: "Language",
                  value: movie.original_language.toUpperCase(),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                  <p className="text-[11px] text-zinc-500 mb-1 uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-zinc-100">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Directors */}
        {directors.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              {directors.length === 1 ? "Director" : "Directors"}
            </h2>
            <div className="flex flex-wrap gap-4">
              {directors.map((d) => (
                <div key={d.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 relative shrink-0">
                    {d.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${d.profile_path}`}
                        alt={d.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm">
                        {d.name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-100">
                      {d.name}
                    </p>
                    <p className="text-xs text-zinc-500">Director</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cast */}
        {topCast.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {topCast.map((actor) => (
                <div key={actor.id} className="group text-center">
                  <div className="w-full aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700/50 relative mb-2">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-2xl">
                        {actor.name[0]}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-medium text-zinc-200 truncate">
                    {actor.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Production Companies */}
        {movie.production_companies.length > 0 && (
          <div className="space-y-4 border-t border-zinc-800 pt-8">
            <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              Production
            </h2>
            <div className="flex flex-wrap gap-3">
              {movie.production_companies.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
                  {c.logo_path ? (
                    <div className="relative w-10 h-6">
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${c.logo_path}`}
                        alt={c.name}
                        fill
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                  ) : null}
                  <span className="text-xs text-zinc-400">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
