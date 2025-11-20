import dynamic from "next/dynamic";
import React, { Suspense, useState } from "react";
import Classic01 from "../templates/Classic01";
import ElegantFloral from "../templates/ElegantFloral";

const Wedding01 = dynamic(() => import("../templates/Wedding01"), {
  ssr: false,
});

// New component for the cover screen
function InvitationCover({ onOpen, guestName, data }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 text-center bg-gradient-to-br from-rose-50 via-white to-rose-100">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-6xl text-rose-200 opacity-50 animate-pulse">❀</div>
      <div className="absolute top-20 right-16 text-5xl text-rose-200 opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}>✿</div>
      <div className="absolute bottom-16 left-20 text-7xl text-rose-200 opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>❁</div>
      <div className="absolute bottom-24 right-10 text-6xl text-rose-200 opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }}>❀</div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Top Decoration */}
        <div className="text-6xl text-rose-400 mb-6 animate-fade-in">
          ❁
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-serif text-rose-900 mb-3 tracking-wide animate-fade-in" style={{ animationDelay: '0.2s' }}>
          THE WEDDING OF
        </h1>
        
        {/* Names if available */}
        {data?.brideNickname && data?.groomNickname && (
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-script text-rose-600 mb-2">
              {data.brideNickname}
            </h2>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="w-16 h-px bg-rose-300"></div>
              <span className="text-3xl text-rose-400">❀</span>
              <div className="w-16 h-px bg-rose-300"></div>
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-script text-rose-600">
              {data.groomNickname}
            </h2>
          </div>
        )}

        {/* Guest Name */}
        {guestName && (
          <div className="mb-8 mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-rose-200 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-rose-700 tracking-widest uppercase mb-2">Kepada Yth.</p>
            <p className="text-2xl sm:text-3xl font-script text-rose-800">{guestName}</p>
          </div>
        )}

        {/* Invitation Text */}
        <p className="text-base sm:text-lg text-gray-600 mb-2 italic animate-fade-in" style={{ animationDelay: '0.8s' }}>
          Dengan penuh sukacita, kami mengundang Anda
        </p>
        <p className="text-sm sm:text-base text-gray-500 mb-10 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          untuk berbagi kebahagiaan di hari istimewa kami
        </p>

        {/* Open Button */}
        <button
          onClick={onOpen}
          className="group relative px-10 py-4 bg-rose-500 text-white rounded-full text-lg font-semibold hover:bg-rose-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 animate-fade-in overflow-hidden"
          style={{ animationDelay: '1s' }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
            Buka Undangan
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </button>

        {/* Bottom Decoration */}
        <div className="text-6xl text-rose-400 mt-10 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          ❁
        </div>
      </div>

      {/* Subtle Animation Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}

export default function TemplateRenderer({ template_code, data, guestName }) {
  const [showCover, setShowCover] = useState(true);

  const handleOpenInvitation = () => {
    setShowCover(false);
  };

  let TemplateComponent = null;

  if (template_code === "classic-01") {
    TemplateComponent = Classic01;
  } else if (template_code === "wedding-01") {
    TemplateComponent = Wedding01;
  } else if (template_code === "elegant-floral") { // Template baru
    TemplateComponent = ElegantFloral;
  }

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {showCover ? (
        <InvitationCover onOpen={handleOpenInvitation} guestName={guestName} data={data} />
      ) : (
        <TemplateComponent data={data} guestName={guestName} />
      )}
    </Suspense>
  );
}
