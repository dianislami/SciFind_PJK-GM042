import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="team pb-8 bg-gradient-to-br from-[#0a0614] via-[#331574]/20 to-[#0d1f2d]">
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-[#331574]/30 via-[#4A9DE3]/80 to-[#331574]/30 m-0 mb-12"></div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Desktop: 2 columns, Mobile: center stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-7">
          {/* Logo & Description - Takes full width on mobile, half on desktop */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4A9DE3] to-[#331574] bg-clip-text text-transparent tracking-wide mb-3">
              SciFind
            </h3>
            <p className="text-sm text-slate-300 text-md leading-relaxed mb-5 max-w-md mx-auto lg:mx-0">
              SciFind adalah platform pencarian dan rekomendasi film Sci-Fi 
              berbahasa Indonesia berbasis Artificial Intelligence. 
              Sistem ini menggabungkan metode TF-IDF, Jaccard Similarity, 
              dan Semantic Search untuk rekomendasi film yang kontekstual.
            </p>
          </div>

          {/* Fitur Column - Equal size, centered on mobile */}
          <div className="text-sm text-center lg:text-right">
            <h3 className="text-[#4A9DE3] mb-3 text-lg font-semibold">Fitur</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-slate-300 hover:text-[#4A9DE3] transition-colors duration-300">Rekomendasi Film & Review Sci-Fi</a></li>
              <li><a href="#" className="text-slate-300 hover:text-[#4A9DE3] transition-colors duration-300">TF-IDF & Jaccard Similarity</a></li>
              <li><a href="#" className="text-slate-300 hover:text-[#4A9DE3] transition-colors duration-300">Semantic Search berbasis AI</a></li>
              <li><a href="#" className="text-slate-300 hover:text-[#4A9DE3] transition-colors duration-300">Rekomendasi Film Serupa (Content-Based)</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-[#331574]/30 via-[#4A9DE3]/80 to-[#331574]/30 m-0 mb-4"></div>
        <p className="text-sm text-slate-400 text-center">&copy; 2026 SciFind - Capstone Project - PJK-GM-042. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;