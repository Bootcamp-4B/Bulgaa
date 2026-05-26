// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import Navigation from "@/components/Navigation";
// import { Star, Clock, Calendar, Play, X } from "lucide-react";

// interface MovieDetailType {
//   id: number;
//   title: string;
//   overview: string;
//   release_date: string;
//   runtime: number;
//   vote_average: number;
//   poster_path: string;
//   backdrop_path: string;
//   genres: { id: number; name: string }[];
//   credits: {
//     crew: { id: number; name: string; job: string; profile_path: string | null }[];
//     cast: { id: number; name: string; character: string; profile_path: string | null }[];
//   };
//   videos: {
//     results: {
//       id: string;
//       key: string;
//       name: string;
//       type: string;
//       site: string;
//     }[];
//   };
// }

// interface SimilarMovie {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
// }

// const BEARER = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWEzMGNhOGU0YjkxMjUyOTc3Y2ZmYTY3MjA0YzcxYSIsIm5iZiI6MTc3OTI2NjY0OS41ODA5OTk5LCJzdWIiOiI2YTBkNzQ1OTAwYWE5OTc3NzMwYzBjZmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._45evHDlOZguNWt82rgCjZmxqgTHpuXCQjvxXuYHpyY";

// const Detail = () => {
//   const params = useParams();
//   const [movie, setMovie] = useState<MovieDetailType | null>(null);
//   const [similar, setSimilar] = useState<SimilarMovie[]>([]);
//   const [showTrailer, setShowTrailer] = useState(false);

//   useEffect(() => {
//     if (!params.id) return;

//     axios
//       .get(
//         `https://api.themoviedb.org/3/movie/${params.id}?append_to_response=credits,videos&language=en-US`,
//         { headers: { Authorization: BEARER } }
//       )
//       .then((res) => setMovie(res.data));

//     axios
//       .get(
//         `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=1`,
//         { headers: { Authorization: BEARER } }
//       )
//       .then((res) => setSimilar(res.data.results.slice(0, 6)));
//   }, [params.id]);

//   if (!movie) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-black">
//         <p className="text-white text-xl animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   const trailer = movie.videos?.results.find(
//     (v) => v.type === "Trailer" && v.site === "YouTube"
//   );

//   const writers = movie.credits.crew
//     .filter((p) => p.job === "Screenplay" || p.job === "Writer")
//     .slice(0, 3);

//   const stars = movie.credits.cast.slice(0, 5);
//   const hours = Math.floor(movie.runtime / 60);
//   const mins = movie.runtime % 60;

//   return (
//     <div className="w-full min-h-screen bg-[#0a0a0a] text-white">
//       <Navigation />

//       {/* Trailer fullscreen modal */}
//       {showTrailer && trailer && (
//         <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
//           <button
//             onClick={() => setShowTrailer(false)}
//             className="absolute top-6 right-6 text-white hover:text-white/60 transition-colors"
//           >
//             <X size={32} />
//           </button>
//           <div className="w-full max-w-5xl aspect-video px-6">
//             <iframe
//               src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
//               className="w-full h-full rounded-xl"
//               allow="autoplay; fullscreen"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )}

//       {/* Hero — trailer thumbnail эсвэл backdrop */}
//       <div className="relative w-full h-[520px] overflow-hidden group cursor-pointer"
//         onClick={() => trailer && setShowTrailer(true)}
//       >
//         <Image
//           src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
//           alt={movie.title}
//           fill
//           className="object-cover object-top"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

//         {/* Play button */}
//         {trailer && (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
//               <Play size={32} fill="white" className="ml-1" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main content */}
//       <div className="px-16 -mt-40 relative z-10">
//         <div className="flex gap-10">
//           {/* Poster */}
//           <div className="flex-shrink-0 w-[200px] h-[300px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
//             <Image
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//               width={200}
//               height={300}
//               className="object-cover w-full h-full"
//             />
//           </div>

//           {/* Info */}
//           <div className="pt-24 flex-1">
//             <div className="flex gap-2 mb-3 flex-wrap">
//               {movie.genres.map((g) => (
//                 <span
//                   key={g.id}
//                   className="text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 text-white/60"
//                 >
//                   {g.name}
//                 </span>
//               ))}
//             </div>

//             <h1 className="text-5xl font-black tracking-tight mb-3">{movie.title}</h1>

//             <div className="flex items-center gap-5 text-sm text-white/50 mb-5">
//               <span className="flex items-center gap-1">
//                 <Calendar size={14} />
//                 {movie.release_date}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Clock size={14} />
//                 {hours}h {mins}m
//               </span>
//               <span className="flex items-center gap-1 text-yellow-400 font-semibold">
//                 <Star size={14} fill="currentColor" />
//                 {movie.vote_average.toFixed(1)}/10
//               </span>
//             </div>

//             <p className="text-white/70 leading-7 max-w-2xl mb-6">{movie.overview}</p>

//             {/* Watch Trailer button */}
//             {trailer && (
//               <button
//                 onClick={() => setShowTrailer(true)}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-colors mb-6"
//               >
//                 <Play size={16} fill="black" />
//                 Watch Trailer
//               </button>
//             )}

//             {writers.length > 0 && (
//               <div className="mb-4">
//                 <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Writers</p>
//                 <div className="flex gap-3 flex-wrap">
//                   {writers.map((w) => (
//                     <span key={w.id} className="text-sm text-white/80 font-medium">
//                       {w.name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Stars */}
//         <div className="mt-12">
//           <p className="text-xs uppercase tracking-widest text-white/30 mb-6">Stars</p>
//           <div className="flex gap-6 flex-wrap">
//             {stars.map((actor) => (
//               <div key={actor.id} className="flex flex-col items-center gap-2 w-20">
//                 <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 bg-white/5">
//                   {actor.profile_path ? (
//                     <Image
//                       src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
//                       alt={actor.name}
//                       width={64}
//                       height={64}
//                       className="object-cover w-full h-full"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-white/30 text-xl font-bold">
//                       {actor.name[0]}
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-xs text-center text-white/70 leading-tight">{actor.name}</p>
//                 <p className="text-xs text-center text-white/30 leading-tight truncate w-full">
//                   {actor.character}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* More like this */}
//         {similar.length > 0 && (
//           <div className="mt-14 mb-20">
//             <p className="text-xs uppercase tracking-widest text-white/30 mb-6">More like this</p>
//             <div className="grid grid-cols-6 gap-3">
//               {similar.map((m) => (
//                 <a key={m.id} href={`/${m.id}`} className="group cursor-pointer">
//                   <div className="rounded-lg overflow-hidden mb-2 aspect-[2/3] bg-white/5">
//                     {m.poster_path ? (
//                       <Image
//                         src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
//                         alt={m.title}
//                         width={150}
//                         height={225}
//                         className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">
//                         No Image
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-xs font-medium truncate text-white/80">{m.title}</p>
//                   <p className="text-xs text-yellow-400 flex items-center gap-1 mt-0.5">
//                     <Star size={9} fill="currentColor" />
//                     {m.vote_average.toFixed(1)}
//                   </p>
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Detail;

"use client";
import { useEffect, useState } from "react";
import { useRouter , useParams , } from "next/navigation";
import axios from "axios";
import Navigation from "@/components/Navigation";


interface MovieType {

  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;

  genres: {
    id: number;
    name: string;
  }[];

  credits: {
    crew: {
      id: number;
      name: string;
      job: string;       
    }[];
    cast: {
      id: number;
      name: string;
      character: string;
    }[];
  };
}


const Detail =()=>{
    const params=useParams();
    const [movie , setMovie]=useState<MovieType>();
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
    return(
 
            <div className="w-full h-full overflow-x-hidden">
      <Navigation />
          {movie?.genres.map((genre)=>{
            return <p key={genre.id}>{genre.name}</p>
          })}
        </div>
    )
}

export default Detail