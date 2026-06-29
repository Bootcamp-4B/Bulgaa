"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import Navigation from "@/components/Navigation";
import axios from "axios";
import type { MovieType } from "@/app/page";
import { tmdbHeaders } from "@/lib/tmdb";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Footer } from "@/components/Footer";

type GenreType = {
  id: number;
  name: string;
};

function GenrePageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const genreId = params.id as string;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const genreNameFromQuery = searchParams.get("name");

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const genreName =
    genreNameFromQuery ??
    genres.find((genre) => String(genre.id) === genreId)?.name ??
    "Genre";

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list?language=en-US", {
        headers: tmdbHeaders,
      })
      .then((response) => {
        setGenres(response.data.genres);
      });
  }, []);

  useEffect(() => {
    if (!genreId) return;

    setLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`,
        { headers: tmdbHeaders },
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalResults(response.data.total_results);
        setTotalPages(Math.min(response.data.total_pages, 500));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [genreId, page]);

  const buildGenreUrl = (genre: GenreType, nextPage = 1) => {
    const query = new URLSearchParams({
      name: genre.name,
    });

    if (nextPage > 1) {
      query.set("page", String(nextPage));
    }

    return `/genre/${genre.id}?${query.toString()}`;
  };

  const changeGenre = (genre: GenreType) => {
    router.push(buildGenreUrl(genre));
  };

  const goToPage = (nextPage: number) => (event: React.MouseEvent) => {
    event.preventDefault();

    const clampedPage = Math.min(Math.max(1, nextPage), totalPages);
    const query = new URLSearchParams(searchParams.toString());

    if (clampedPage <= 1) {
      query.delete("page");
    } else {
      query.set("page", String(clampedPage));
    }

    router.push(`/genre/${genreId}?${query.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d14]">
      <Navigation />

      <div className="w-full flex justify-center">
        <div className="w-[1280px] px-[72px] py-10">
          <h1 className="text-[28px] font-bold mb-8 text-gray-900 dark:text-white">
            Search filter
          </h1>

          <div className="flex gap-12">
            <div className="w-[330px] shrink-0">
              <h2 className="text-[22px] font-bold mb-1 text-gray-900 dark:text-white">
                Genres
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                See lists of movies by genre
              </p>

              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => {
                  const active = String(genre.id) === genreId;

                  return (
                    <button
                      key={genre.id}
                      type="button"
                      onClick={() => changeGenre(genre)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        active
                          ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                          : "bg-white text-black border-gray-300 dark:bg-[#1c1c27] dark:text-white dark:border-gray-600"
                      }`}
                    >
                      {genre.name}
                      <span>{active ? "×" : "›"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <section className="flex-1 border-l border-gray-200 dark:border-gray-700 pl-10">
              <h2 className="text-lg font-bold mb-8 text-gray-900 dark:text-white">
                {totalResults} titles in &ldquo;{genreName}&rdquo;
              </h2>

              {loading ? (
                <p className="text-gray-500 dark:text-gray-400">Loading movies...</p>
              ) : movies.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">
                  No movies found for this genre.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination className="h-20 pb-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={page <= 1}
                className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
                onClick={goToPage(page - 1)}
              />
            </PaginationItem>

            {page > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink href="#" onClick={goToPage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>

                <PaginationEllipsis />
              </>
            )}

            {page > 1 && (
              <PaginationItem>
                <PaginationLink href="#" onClick={goToPage(page - 1)}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages && (
              <PaginationItem>
                <PaginationLink href="#" onClick={goToPage(page + 1)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {page < totalPages - 1 && (
              <>
                <PaginationEllipsis />

                <PaginationItem>
                  <PaginationLink href="#" onClick={goToPage(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={page >= totalPages}
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : undefined
                }
                onClick={goToPage(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Footer />
    </div>
  );
}

function GenrePageFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0d14]">
      <Navigation />
      <div className="flex justify-center py-20">
        <p className="text-gray-500 dark:text-gray-400">Loading genres...</p>
      </div>
      <Footer />
    </div>
  );
}

export default function GenrePage() {
  return (
    <Suspense fallback={<GenrePageFallback />}>
      <GenrePageContent />
    </Suspense>
  );
}
