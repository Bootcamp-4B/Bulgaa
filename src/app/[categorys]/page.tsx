"use client";
import MovieCard from "@/components/MovieCard";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PopularMovies from "@/components/PopularMovies";

export default function Home() {
  const [page, setPage] = useState(1);
  const totalPages = 10; // MovieCard-аас totalPages props болгон авч болно

  return (
    <div className="w-full h-full overflow-x-hidden">
      <Navigation />
      <div className="w-full px-16 mt-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-1">
              What's next
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight">
              Upcoming Movies
            </h2>
          </div>
        </div>
        < PopularMovies page={page} />

        {/* Pagination */}
        <div className="flex justify-end mt-10 mb-16">
          <Pagination className="flex justify-end px-16">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-30" : "cursor-pointer"}
                />
              </PaginationItem>

              {[...Array(3)].map((_, i) => {
                const pageNum = Math.max(1, page - 1) + i;
                if (pageNum > totalPages) return null;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setPage(pageNum)}
                      isActive={page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className={page === totalPages ? "pointer-events-none opacity-30" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}