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
              Sistem Information Retrieval tentang review film sci-fi
              menggunakan algoritma VSM TF-IDF dan Jaccard Similarity.
              Proyek UAS mata kuliah Penelusuran Informasi.
            </p>
          </div>

          {/* Fitur Column - Equal size, centered on mobile */}
          <div className="text-sm text-center lg:text-right">
            <h3 className="text-[#4A9DE3] mb-3 text-lg font-semibold">Fitur</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-slate-300 hover:text-[#4A9DE3] transition-colors duration-300">Pencarian Artikel & Review Film</a></li>
              <li><a href="#" className="text-slate-300 hover:text-[#4A9DE3] transition-colors duration-300">Algoritma VSM TF-IDF</a></li>
              <li><a href="#" className="text-slate-300 hover:text-[#4A9DE3] transition-colors duration-300">Algoritma Jaccard Similarity</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-[#331574]/30 via-[#4A9DE3]/80 to-[#331574]/30 m-0 mb-4"></div>
        <p className="text-sm text-slate-400 text-center">&copy; 2025 SciFind - Team 1. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;