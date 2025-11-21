import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Heart, Calendar, MapPin, Gift, ChevronDown } from 'lucide-react';

export default function Elegant02({ data, guestName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [activeSection, setActiveSection] = useState('cover');
  const audioRef = useRef(null);

  // Extract data from props with fallbacks
  const brideNickname = data?.brideNickname || 'Jasmine';
  const brideFull = data?.brideFull || 'Fauziah Jasmine';
  const brideParents = data?.brideParents || 'Bapak (Alm) Yoyo Sucahyo & Ibu Lina Raeny';
  const brideParentInfo = data?.brideParentInfo || 'Putri Pertama dari';
  
  const groomNickname = data?.groomNickname || 'Bayu';
  const groomFull = data?.groomFull || 'Bayu Tri Astanto';
  const groomParents = data?.groomParents || 'Bapak (Alm) H. Mulyadi & Ibu Nonoy Suryati';
  const groomParentInfo = data?.groomParentInfo || 'Putra Ketiga dari';
  
  const weddingDate = data?.date || '12.11.26';
  const akadDate = data?.akadDate || 'Saturday, October 25, 2025';
  const akadTime = data?.akadTime || '10:00 WIB';
  const akadLocation = data?.akadLocation || 'Kediaman Mempelai Wanita';
  const akadAddress = data?.akadAddress || 'Jl. Mayor Dasuki, Desa Penganjang Rt 07/Rw 03\nKecamatan Sindang, Kabupaten Indramayu';
  
  const receptionDate = data?.receptionDate || 'Saturday, October 25, 2025';
  const receptionTime = data?.receptionTime || '11:00 WIB - Selesai';
  const receptionLocation = data?.receptionLocation || 'Kediaman Mempelai Wanita';
  const receptionAddress = data?.receptionAddress || 'Jl. Mayor Dasuki, Desa Penganjang Rt 07/Rw 03\nKecamatan Sindang, Kabupaten Indramayu';
  
  const musicUrl = data?.musicUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const bankName = data?.bankName || 'Bank BCA';
  const bankAccount = data?.bankAccount || '1234567890';
  const bankAccountName = data?.bankAccountName || `${brideNickname} & ${groomNickname}`;
  const hashtag = data?.hashtag || `#${brideNickname}${groomNickname}Wedding`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    // Auto-play music when component mounts
    setIsPlaying(true);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 font-serif">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      {/* Music Control */}
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="text-amber-900 hover:text-amber-700 transition">
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-amber-900"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-2">
        <button 
          onClick={() => scrollToSection('cover')}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-amber-900 hover:bg-amber-100 transition text-xs"
        >
          Top
        </button>
        <button 
          onClick={() => scrollToSection('couple')}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-amber-900 hover:bg-amber-100 transition text-xs"
        >
          ♥
        </button>
        <button 
          onClick={() => scrollToSection('story')}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-amber-900 hover:bg-amber-100 transition text-xs"
        >
          Read
        </button>
      </div>

      {/* Main Invitation Content */}
      <div className="max-w-2xl mx-auto">
        {/* Cover Section */}
        <div id="cover" className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 text-amber-900/10 text-6xl">❀</div>
          <div className="absolute bottom-10 right-10 text-amber-900/10 text-6xl">❀</div>
          
          <div className="text-center max-w-2xl relative">
            {/* Lace Border Frame */}
            <div className="relative bg-gradient-to-br from-rose-900 to-rose-950 p-8 rounded-3xl shadow-2xl">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
              
              <div className="relative bg-amber-50 p-12 rounded-2xl border-8 border-white/80 shadow-inner">
                {/* Decorative lace border effect */}
                <div className="absolute -inset-4 border-4 border-white/60 rounded-3xl" 
                     style={{ 
                       borderStyle: 'dashed',
                       filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))'
                     }}>
                </div>
                
                {/* Chandelier Icon */}
                <div className="mb-6">
                  <svg className="w-16 h-16 mx-auto text-amber-900" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="20" r="3" />
                    <line x1="50" y1="23" x2="50" y2="35" stroke="currentColor" strokeWidth="1" />
                    <circle cx="30" cy="45" r="4" />
                    <circle cx="50" cy="45" r="4" />
                    <circle cx="70" cy="45" r="4" />
                    <line x1="50" y1="35" x2="30" y2="45" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="35" x2="70" y2="45" stroke="currentColor" strokeWidth="1" />
                    <path d="M 30 48 Q 32 55 30 60" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M 50 48 Q 52 55 50 60" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M 70 48 Q 72 55 70 60" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>

                <p className="text-amber-900/70 text-sm tracking-widest mb-6 italic">
                  Your Presence is Requested<br />To Celebrate
                </p>

                <p className="text-amber-900/60 text-xs tracking-widest mb-2">THE WEDDING OF</p>

                <h1 className="text-6xl mb-2 text-amber-900" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  {brideNickname}
                </h1>
                <p className="text-3xl text-amber-900/80 mb-2">&</p>
                <h1 className="text-6xl mb-6 text-amber-900" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  {groomNickname}
                </h1>

                <div className="text-amber-900/70 text-sm mb-8 tracking-wider">
                  {weddingDate}
                </div>

                {guestName && (
                  <div className="mt-4">
                    <p className="text-amber-900/70 text-sm">Dear</p>
                    <p className="text-amber-900 text-lg font-semibold">{guestName}</p>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-center gap-2 text-amber-900/50">
                  <ChevronDown size={20} className="animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Married Section */}
        <section id="couple" className="min-h-screen flex items-center justify-center p-4 relative">
          <div className="w-full">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl relative">
              {/* Floral Background */}
              <div className="absolute inset-0 opacity-20 bg-cover bg-center rounded-3xl"
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518908336710-4e1edeec0959?w=800)' }}>
              </div>
              
              <div className="relative">
                <h2 className="text-5xl text-center mb-6 text-amber-900" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  We are<br />Getting<br />Married
                </h2>

                {/* Decorative table illustration */}
                <div className="my-8">
                  <svg className="w-32 h-24 mx-auto text-amber-900" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <ellipse cx="60" cy="40" rx="35" ry="8" />
                    <circle cx="40" cy="35" r="5" />
                    <circle cx="60" cy="35" r="5" />
                    <circle cx="80" cy="35" r="5" />
                    <rect x="50" y="40" width="8" height="3" />
                    <rect x="70" y="40" width="12" height="8" />
                  </svg>
                </div>

                {/* Couple Photos */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="bg-white p-3 shadow-lg transform -rotate-3 hover:rotate-0 transition">
                    <div className="w-32 h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      Bride Photo
                    </div>
                  </div>
                  <div className="bg-white p-3 shadow-lg transform rotate-3 hover:rotate-0 transition">
                    <div className="w-32 h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      Groom Photo
                    </div>
                  </div>
                </div>

                <p className="text-center text-amber-900" style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.5rem' }}>
                  {brideNickname} & {groomNickname}
                </p>
                <p className="text-center text-amber-900/70 text-sm">{weddingDate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bride & Groom Details */}
        <section className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full">
            <div className="bg-amber-50 p-8 rounded-3xl shadow-xl">
              <div className="text-center mb-8">
                <svg className="w-12 h-12 mx-auto mb-4 text-amber-900" viewBox="0 0 100 100">
                  <path d="M 30 35 Q 30 25 40 25 Q 45 25 45 30 Q 45 25 50 25 Q 55 25 55 30 Q 55 25 60 25 Q 70 25 70 35 Q 70 50 50 65 Q 30 50 30 35" fill="currentColor" />
                </svg>
                <p className="text-amber-900/70 italic text-sm mb-6">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-amber-900 mb-4 italic">
                  We invite you to join our wedding
                </p>
              </div>

              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-4xl text-amber-900 mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                    {brideFull}
                  </h3>
                  <p className="text-sm text-amber-900/70">
                    {brideParentInfo} {brideParents}
                  </p>
                </div>

                <div className="text-center text-2xl text-amber-900">&</div>

                <div className="text-center">
                  <h3 className="text-4xl text-amber-900 mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                    {groomFull}
                  </h3>
                  <p className="text-sm text-amber-900/70">
                    {groomParentInfo} {groomParents}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <Calendar className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="text-xl font-semibold text-amber-900 mb-2">Akad Nikah</h4>
                  <p className="text-amber-900/70 mb-1">{akadDate}</p>
                  <p className="text-amber-900/70 mb-3">{akadTime}</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="text-amber-900 mt-1 flex-shrink-0" size={16} />
                    <p className="text-sm text-amber-900/70">
                      {akadLocation}<br />
                      {akadAddress.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < akadAddress.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-start gap-4">
                <Calendar className="text-amber-900 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="text-xl font-semibold text-amber-900 mb-2">Resepsi</h4>
                  <p className="text-amber-900/70 mb-1">{receptionDate}</p>
                  <p className="text-amber-900/70 mb-3">{receptionTime}</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="text-amber-900 mt-1 flex-shrink-0" size={16} />
                    <p className="text-sm text-amber-900/70">
                      {receptionLocation}<br />
                      {receptionAddress.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < receptionAddress.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section id="story" className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full">
            <div className="bg-gradient-to-br from-rose-900 to-rose-950 p-8 rounded-3xl shadow-xl">
              {/* Polaroid style photos */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-3 shadow-lg transform -rotate-2">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    Photo 1
                  </div>
                </div>
                <div className="bg-white p-3 shadow-lg transform rotate-2">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    Photo 2
                  </div>
                </div>
                <div className="bg-white p-3 shadow-lg transform rotate-1">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    Photo 3
                  </div>
                </div>
                <div className="bg-white p-3 shadow-lg transform -rotate-1">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    Photo 4
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl">
                <p className="text-amber-900 italic text-sm leading-relaxed" style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.1rem' }}>
                  "This chapter feels so right. With every passing day, our love deeper and our bond stronger. We keep finding new ways to laugh, love, and grow together. Thank you for being my favorite place to be."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Section */}
        <section className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              <Gift className="w-12 h-12 mx-auto mb-4 text-amber-900" />
              <h3 className="text-2xl text-amber-900 mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Wedding Gift
              </h3>
              <p className="text-amber-900/70 mb-6 text-sm">
                Jika memberi adalah tanda kasih anda,<br />
                anda dapat memberikan hadiah secara cashless ke rekening mempelai
              </p>
              <div className="bg-amber-50 p-6 rounded-2xl inline-block">
                <p className="text-amber-900 font-semibold mb-2">{bankName}</p>
                <p className="text-2xl text-amber-900 font-mono mb-2">{bankAccount}</p>
                <p className="text-amber-900/70 text-sm">a.n. {bankAccountName}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full text-center">
            <div className="bg-gradient-to-br from-amber-50 to-white p-12 rounded-3xl shadow-xl">
              <Heart className="w-16 h-16 mx-auto mb-6 text-rose-900" />
              <h3 className="text-5xl mb-6 text-amber-900" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Thank You
              </h3>
              <p className="text-amber-900/70 mb-8 leading-relaxed max-w-md mx-auto">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
              </p>
              <div className="text-2xl text-amber-900 mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {brideNickname} & {groomNickname}
              </div>
              <p className="text-amber-900/50 text-sm">{hashtag}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
      `}</style>
    </div>
  );
}
