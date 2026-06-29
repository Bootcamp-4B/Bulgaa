"use client";
import { useState } from "react";
import { Play, X } from "lucide-react";

// ─── PROPS INTERFACE ─────────────────────────────────────────────────────────
// Props гэдэг нь "эцэг component-оос хүүхэд component-руу дамжуулах өгөгдөл"
// Detail.tsx → TrailerButton.tsx руу trailerKey дамжина
interface TrailerButtonProps {
  trailerKey: string; // YouTube video ID, жишээ: "dQw4w9WgXcQ"
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
// ({ trailerKey }) гэдэг нь props-оос trailerKey-г задлан авч байгаа хэлбэр
const TrailerButton = ({ trailerKey }: TrailerButtonProps) => {
  // showTrailer state нь энэ component-д л хамааралтай
  // Detail.tsx дотор байхгүй — бүрэн тусгаарлагдсан
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <>
      {/* ── НЭЭХ ТОВЧ ── */}
      <button
        onClick={() => setShowTrailer(true)}
        className="mt-1 flex items-center gap-2 bg-white text-black font-bold px-5 py-2.5 rounded-full text-sm w-fit hover:bg-gray-200 transition-colors"
      >
        <Play size={15} className="fill-black" />
        Watch Trailer
      </button>

      {/* ── MODAL (трейлерийн цонх) ── */}
      {/* showTrailer = true үед л дэлгэцэнд харагдана */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl mx-4 aspect-video">
            {/* Хаах товч */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
            >
              <X size={16} /> Close
            </button>

            {/* YouTube iframe */}
            {/* trailerKey prop-оор ирсэн ID-г URL дотор ашиглана */}
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerButton;
