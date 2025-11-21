import dynamic from "next/dynamic";
import React, { Suspense, useState, useEffect } from "react";
import Classic01 from "../templates/Classic01";
import ElegantFloral from "../templates/ElegantFloral";
import Wedding01 from "../templates/Wedding01";
import RomanticFloral from "../templates/RomanticFloral";
import LuxuryGold from "../templates/LuxuryGold";

// New component for the cover screen with customizable hero section
function InvitationCover({ onOpen, guestName, data, heroConfig }) {
  const config = heroConfig || {
    background: "gradient",
    gradientColors: "from-rose-50 via-white to-rose-100",
    decorativeElements: [
      {
        icon: "❀",
        position: "top-10 left-10",
        size: "text-6xl",
        color: "text-rose-200",
        delay: "0s",
      },
      {
        icon: "✿",
        position: "top-20 right-16",
        size: "text-5xl",
        color: "text-rose-200",
        delay: "0.5s",
      },
      {
        icon: "❁",
        position: "bottom-16 left-20",
        size: "text-7xl",
        color: "text-rose-200",
        delay: "1s",
      },
      {
        icon: "❀",
        position: "bottom-24 right-10",
        size: "text-6xl",
        color: "text-rose-200",
        delay: "1.5s",
      },
    ],
    topIcon: "❁",
    topIconColor: "text-rose-400",
    title: "THE WEDDING OF",
    titleColor: "text-rose-900",
    nameColor: "text-rose-600",
    dividerColor: "bg-rose-300",
    dividerIcon: "❀",
    dividerIconColor: "text-rose-400",
    invitationText: "Dengan penuh sukacita, kami mengundang Anda",
    invitationSubtext: "untuk berbagi kebahagiaan di hari istimewa kami",
    invitationTextColor: "text-gray-600",
    invitationSubtextColor: "text-gray-500",
    buttonColor: "bg-rose-500 hover:bg-rose-600",
    buttonGradient: "from-rose-600 to-pink-600",
    guestCardBg: "bg-white/60",
    guestCardBorder: "border-rose-200",
    guestCardTextColor: "text-rose-800",
    guestLabelColor: "text-rose-700",
    bottomIcon: "❁",
    bottomIconColor: "text-rose-400",
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 text-center bg-gradient-to-br ${config.gradientColors}`}
    >
      {/* Decorative Elements */}
      {config.decorativeElements.map((elem, idx) => (
        <div
          key={idx}
          className={`absolute ${elem.position} ${elem.size} ${elem.color} opacity-50 animate-pulse`}
          style={{ animationDelay: elem.delay }}
        >
          {elem.icon}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Top Decoration */}
        <div className={`text-6xl ${config.topIconColor} mb-6 animate-fade-in`}>
          {config.topIcon}
        </div>

        {/* Title */}
        <h1
          className={`text-3xl sm:text-4xl font-serif ${config.titleColor} mb-3 tracking-wide animate-fade-in`}
          style={{ animationDelay: "0.2s" }}
        >
          {config.title}
        </h1>

        {/* Names if available */}
        {data?.brideNickname && data?.groomNickname && (
          <div
            className="mb-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h2
              className={`text-5xl sm:text-6xl md:text-7xl font-script ${config.nameColor} mb-2`}
            >
              {data.brideNickname}
            </h2>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className={`w-16 h-px ${config.dividerColor}`}></div>
              <span className={`text-3xl ${config.dividerIconColor}`}>
                {config.dividerIcon}
              </span>
              <div className={`w-16 h-px ${config.dividerColor}`}></div>
            </div>
            <h2
              className={`text-5xl sm:text-6xl md:text-7xl font-script ${config.nameColor}`}
            >
              {data.groomNickname}
            </h2>
          </div>
        )}

        {/* Guest Name */}
        {guestName && (
          <div
            className={`mb-8 mt-12 p-6 ${config.guestCardBg} backdrop-blur-sm rounded-2xl border-2 ${config.guestCardBorder} shadow-lg animate-fade-in`}
            style={{ animationDelay: "0.6s" }}
          >
            <p
              className={`text-sm ${config.guestLabelColor} tracking-widest uppercase mb-2`}
            >
              Kepada Yth.
            </p>
            <p
              className={`text-2xl sm:text-3xl font-script ${config.guestCardTextColor}`}
            >
              {guestName}
            </p>
          </div>
        )}

        {/* Invitation Text */}
        <p
          className={`text-base sm:text-lg ${config.invitationTextColor} mb-2 italic animate-fade-in`}
          style={{ animationDelay: "0.8s" }}
        >
          {config.invitationText}
        </p>
        <p
          className={`text-sm sm:text-base ${config.invitationSubtextColor} mb-10 animate-fade-in`}
          style={{ animationDelay: "0.9s" }}
        >
          {config.invitationSubtext}
        </p>

        {/* Open Button */}
        <button
          onClick={onOpen}
          className={`group relative px-10 py-4 ${config.buttonColor} text-white rounded-full text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 animate-fade-in overflow-hidden`}
          style={{ animationDelay: "1s" }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
              />
            </svg>
            Buka Undangan
          </span>
          <div
            className={`absolute inset-0 bg-gradient-to-r ${config.buttonGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}
          ></div>
        </button>

        {/* Bottom Decoration */}
        <div
          className={`text-6xl ${config.bottomIconColor} mt-10 animate-fade-in`}
          style={{ animationDelay: "1.2s" }}
        >
          {config.bottomIcon}
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
  } else if (
    template_code === "elegant-floral" ||
    template_code === "elegant-02"
  ) {
    TemplateComponent = ElegantFloral;
  } else if (template_code === "romantic-floral") {
    TemplateComponent = RomanticFloral;
  } else if (template_code === "luxury-gold") {
    TemplateComponent = LuxuryGold;
  }

  if (!TemplateComponent) {
    return <div>Template not found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {showCover ? (
        <InvitationCover
          onOpen={handleOpenInvitation}
          guestName={guestName}
          data={data}
          heroConfig={TemplateComponent.heroSection}
        />
      ) : (
        <TemplateComponent data={data} guestName={guestName} />
      )}
    </Suspense>
  );
}
