import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";

interface SearchResult {
  id: number;
  title?: string; // movie
  name?: string; // tv/person
  poster_path?: string;
  media_type: string;
  vote_average?: number;
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    // Query хоосон бол хайхгүй
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY",
            },
          },
        )
        .then((response) => {
          setResults(response.data.results);
        });
    }, 100);

    return () => clearTimeout(delayDebounce); // cleanup
  }, [query]); // query өөрчлөгдөх бүрт ажиллана

  return (
    <div className="relative">
      {/* Search input */}
      <div className="flex items-center border border-gray-300 rounded-md min-w-[380px] px-3 gap-2">
        <Search className="text-gray-400" size={18} />
        <input
          className="rounded-md w-full py-2 focus:outline-none focus:border-transparent [&::-webkit-search-cancel-button]:appearance-none bg-transparent"
          type="search"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50 max-h-[400px] overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-8 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-8 h-12 bg-gray-200 rounded" />
              )}
              <div>
                <p className="font-medium text-sm">{item.title || item.name}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {item.media_type}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
