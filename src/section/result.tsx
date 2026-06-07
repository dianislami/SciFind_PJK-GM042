import React, { useEffect, useRef, useState } from 'react';
import GlareHover from '@/components/ui/card';
import Modal from '@/components/ui/modal';

interface ResultSectionProps {
  results?: any[];
  isLoading?: boolean;
  searchMethod?: 'tfidf' | 'jaccard' | 'hybrid' | 'semantic';
  hasSearched?: boolean;
  geminiAnswer?: string | null;
  isGeminiLoading?: boolean;
}

// Function to parse markdown-like text and convert to JSX
const parseMarkdownText = (text: string) => {
  if (!text) return '';
  
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|__[^_]+__|_[^_]+_)/);
  
  return parts.map((part, index) => {
    // Bold: **text** or __text__
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      const content = part.startsWith('**') ? part.slice(2, -2) : part.slice(2, -2);
      return <strong key={index} style={{ fontWeight: 'bold' }}>{content}</strong>;
    }
    // Italic: *text* or _text_
    else if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      const content = part.slice(1, -1);
      return <em key={index} style={{ fontStyle: 'italic' }}>{content}</em>;
    }
    // Strikethrough: ~~text~~
    else if (part.startsWith('~~') && part.endsWith('~~')) {
      const content = part.slice(2, -2);
      return <del key={index} style={{ textDecoration: 'line-through' }}>{content}</del>;
    }
    // Regular text
    else {
      return part;
    }
  });
};

const ResultSection: React.FC<ResultSectionProps> = ({ results = [], isLoading = false, searchMethod = 'hybrid', hasSearched = false, geminiAnswer = null, isGeminiLoading = false }) => {
    const defaultMessageRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [isLoadingRecs, setIsLoadingRecs] = useState(false);

    const openModal = async (movie: any) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
        setRecommendations([]);
        setIsLoadingRecs(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
            const API_URL = import.meta.env.PROD
                ? `${backendUrl.replace(/\/$/, '')}/api/recommend`
                : '/api/recommend';
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: movie.title || movie.judul, top_n: 6 }),
            });
            const data = await res.json();
            setRecommendations(data.recommendations || []);
        } catch {
            setRecommendations([]);
        } finally {
            setIsLoadingRecs(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
        setRecommendations([]);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -10% 0px'
            }
        );

        if (defaultMessageRef.current) {
            observer.observe(defaultMessageRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Use search results if available, otherwise show nothing
    let displayData = results;
    
    // Sort by score based on selected method (highest first)
    if (results.length > 0) {
        displayData = [...displayData].sort((a, b) => {
            let scoreA = 0;
            let scoreB = 0;
            
            // Use appropriate score based on search method
            if (searchMethod === 'tfidf') {
                scoreA = a.tfidf_score || 0;
                scoreB = b.tfidf_score || 0;
            } else if (searchMethod === 'jaccard') {
                scoreA = a.jaccard_score || 0;
                scoreB = b.jaccard_score || 0;
            } else if (searchMethod === 'semantic') {
                scoreA = a.semantic_score || 0;
                scoreB = b.semantic_score || 0;
            } else {
            // hybrid
                scoreA = a.score || 0;
                scoreB = b.score || 0;
            } 
            
            return scoreB - scoreA;
        });
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-20">
                <div 
                    className="text-white/50 text-xl font-michroma"
                    style={{
                        animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                >
                    Mencari...
                </div>
            </div>
        );
    }

    // Show default message if no search has been performed
    if (!hasSearched) {
        return (
            <div 
                ref={defaultMessageRef}
                className="flex justify-center items-center my-20"
            >
                <div 
                    className="text-white/50 text-xl font-michroma"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    }}
                >
                    Hasil akan muncul disini
                </div>
            </div>
        );
    }

    // Show no results message if search returned empty
    if (displayData.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Tetap tampilkan Gemini answer meski hasil kosong */}
                {(isGeminiLoading || geminiAnswer) && (
                    <div className="mb-10 bg-white/5 backdrop-blur-md border border-[#4A9DE3]/30 rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8f5bff] to-[#4A9DE3] flex items-center justify-center text-white text-sm font-bold">AI</div>
                            <h2 className="text-white font-semibold text-base lg:text-lg" style={{ fontFamily: "'Michroma', monospace" }}>
                                SciFind AI
                            </h2>
                        </div>
                        {isGeminiLoading ? (
                            <div className="flex items-center gap-2 text-white/50 text-sm">
                                <div className="w-2 h-2 rounded-full bg-[#4A9DE3] animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-[#4A9DE3] animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-[#4A9DE3] animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        ) : (
                            <div className="text-white/90 text-sm lg:text-base leading-relaxed space-y-3">
                                {geminiAnswer!.split(/\n\n+/).filter(p => p.trim()).map((para, i) => (
                                    <p key={i}>{parseMarkdownText(para.trim())}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className="flex justify-center items-center my-20">
                    <div className="text-white/50 text-xl font-michroma">
                        Tidak ada hasil ditemukan
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Gemini AI Answer */}
            {(isGeminiLoading || geminiAnswer) && (
                <div className="mb-10 bg-white/5 backdrop-blur-md border border-[#4A9DE3]/30 rounded-2xl p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8f5bff] to-[#4A9DE3] flex items-center justify-center text-white text-sm font-bold">AI</div>
                        <h2 className="text-white font-semibold text-base lg:text-lg" style={{ fontFamily: "'Michroma', monospace" }}>
                            SciFind AI
                        </h2>
                    </div>
                    {isGeminiLoading ? (
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                            <div className="w-2 h-2 rounded-full bg-[#4A9DE3] animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-[#4A9DE3] animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-[#4A9DE3] animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    ) : (
                        <div className="text-white/90 text-sm lg:text-base leading-relaxed space-y-2">
                            {geminiAnswer!.split('\n').filter(line => line.trim()).map((line, i) => {
                                const trimmed = line.trim();
                                // Deteksi baris numbered list: "1.", "2.", dst
                                const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
                                if (numberedMatch) {
                                    return (
                                        <div key={i} className="flex gap-3">
                                            <span className="text-[#4A9DE3] font-bold min-w-[1.5rem]">{numberedMatch[1]}.</span>
                                            <span>{parseMarkdownText(numberedMatch[2])}</span>
                                        </div>
                                    );
                                }
                                // Deteksi bullet: "- " atau "* "
                                const bulletMatch = trimmed.match(/^[-*]\s+(.+)/);
                                if (bulletMatch) {
                                    return (
                                        <div key={i} className="flex gap-3">
                                            <span className="text-[#4A9DE3] font-bold min-w-[1rem]">•</span>
                                            <span>{parseMarkdownText(bulletMatch[1])}</span>
                                        </div>
                                    );
                                }
                                // Paragraph biasa
                                return <p key={i}>{parseMarkdownText(trimmed)}</p>;
                            })}
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-15 lg:mb-25 z-30">
                {displayData.map((item, index) => (
                    <div key={index} className={`flex justify-center ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`} style={{ position: 'relative' }}>
                        <div className="relative">
                            {/* Score Badge - Top Right */}
                            {(item.tfidf_score !== undefined || item.jaccard_score !== undefined || item.score !== undefined || item.semantic_score !== undefined) && (
                                <div className="absolute top-2 right-2 lg:top-6 lg:right-6 z-[110] flex gap-2">
                                    {/* Show scores based on selected method */}
                                    {searchMethod === 'hybrid' && (
                                        <>
                                            {item.tfidf_score !== undefined && (
                                                <div className="bg-black/50 backdrop-blur-md px-3 py-0 lg:px-5 lg:py-2 rounded-lg border border-[#4A9DE3]/50">
                                                    <span className="text-[#4A9DE3] text-xs lg:text-base font-semibold">TF-IDF: </span>
                                                    <span className="text-white text-xs lg:text-base font-bold">{(item.tfidf_score * 100).toFixed(1)}%</span>
                                                </div>
                                            )}
                                            {item.jaccard_score !== undefined && (
                                                <div className="bg-black/50 backdrop-blur-md px-3 py-0 lg:px-5 lg:py-2 rounded-lg border border-[#8f5bff]/50">
                                                    <span className="text-[#8f5bff] text-xs lg:text-base font-semibold">Jaccard: </span>
                                                    <span className="text-white text-xs lg:text-base font-bold">{item.jaccard_score.toFixed(4)}</span>
                                                </div>
                                            )}
                                            {item.score !== undefined && (
                                                <div className="bg-gradient-to-r from-[#8f5bff]/40 to-[#4A9DE3]/40 backdrop-blur-md px-3 py-0 lg:px-5 lg:py-2 rounded-lg border border-white/50">
                                                    <span className="text-white text-xs lg:text-base font-semibold">Hybrid: </span>
                                                    <span className="text-white text-xs lg:text-base font-bold">{(item.score * 100).toFixed(1)}%</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    
                                    {searchMethod === 'tfidf' && item.tfidf_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-[#4A9DE3]/50">
                                            <span className="text-[#4A9DE3] text-xs lg:text-base font-semibold">TF-IDF: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{(item.tfidf_score * 100).toFixed(1)}%</span>
                                        </div>
                                    )}
                                    
                                    {searchMethod === 'jaccard' && item.jaccard_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-[#8f5bff]/50">
                                            <span className="text-[#8f5bff] text-xs lg:text-base font-semibold">Jaccard: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{item.jaccard_score.toFixed(4)}</span>
                                        </div>
                                    )}

                                    {searchMethod === 'semantic' && item.semantic_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-2 rounded-lg border border-emerald-400/50">
                                            <span className="text-emerald-400 text-xs lg:text-base font-semibold">Semantic: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{(item.semantic_score * 100).toFixed(1)}%</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Text overlay */}
                            <div className="absolute inset-0 flex flex-col justify-center mt-7 mx-6 md:m-8 lg:mx-12 lg:mt-18 text-left z-100">
                                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl" style={{
                                    fontWeight: '900',
                                    color: '#ffffff',
                                    margin: '0 0px 12px 0',
                                    fontFamily: "'Michroma', monospace",
                                    textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
                                    }}>
                                    {item.title || item.judul}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl" style={{
                                    color: '#ffffff',
                                    marginRight: '12rem',
                                    lineHeight: 1.4,
                                    opacity: 0.9,
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical'
                                    }}>
                                    {parseMarkdownText(item.description || item.isi || item.content || '')}
                                </p>

                                <button 
                                    onClick={() => openModal(item)}
                                    className="mt-2 md:mt-6 px-6 sm:px-8 md:px-10 py-1 bg-gradient-to-r from-[#8f5bff] to-[#4A9DE3] border border-white/50 text-white rounded-lg font-medium w-fit hover:cursor-pointer hover:bg-[#4A9DE3] hover:scale-110 transition-all duration-300 text-xs sm:text-sm md:text-base"
                                >
                                    Selengkapnya
                                </button>
                            </div>
                            <GlareHover
                                glareColor="#ffffff"
                                glareOpacity={0.3}
                                glareAngle={-30}
                                glareSize={300}
                                transitionDuration={800}
                                playOnce={false}
                            >
                                {item.poster ? (
                                    <img 
                                        src={item.poster} 
                                        alt={item.title || item.judul}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                ) : (
                                    <div 
                                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0a0a14]"
                                        style={{
                                            width: '100%',
                                            aspectRatio: '3/2',
                                        }}
                                    >
                                        <div className="text-center p-8">
                                            <div className="text-6xl mb-4">🎬</div>
                                            <p className="text-white/50 text-lg font-michroma">No Image</p>
                                        </div>
                                    </div>
                                )}

                            {/* Dark overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/90 to-transparent hover:cursor-pointer"></div>

                            </GlareHover>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for movie details */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedMovie && (
                    <div className="p-6 lg:p-12">
                        {/* Header with Grid: Poster left, Title right */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8">
                            {/* Poster */}
                            <div className="flex justify-center md:justify-start">
                                {selectedMovie.poster ? (
                                    <img 
                                        src={selectedMovie.poster} 
                                        alt={selectedMovie.title || selectedMovie.judul}
                                        className="rounded-lg shadow-2xl w-full max-w-sm object-cover border border-[#4A9DE3]/50"
                                        style={{ maxHeight: '500px' }}
                                    />
                                ) : (
                                    <div 
                                        className="rounded-lg shadow-2xl w-full max-w-sm border border-[#4A9DE3]/50 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0a0a14]"
                                        style={{ height: '500px' }}
                                    >
                                        <div className="text-center p-8">
                                            <div className="text-8xl mb-4">🎬</div>
                                            <p className="text-white/50 text-xl font-michroma">No Image Available</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Title and Scores */}
                            <div className="flex flex-col justify-center">
                                <h2 
                                    className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-8"
                                    style={{ fontFamily: "'Michroma', monospace" }}
                                >
                                    {selectedMovie.title || selectedMovie.judul}
                                </h2>

                                {/* Score Badges */}
                                <div className="flex flex-wrap gap-3 mb-0">
                                    {selectedMovie.tfidf_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-3 rounded-lg border border-[#4A9DE3]/50">
                                            <span className="text-[#4A9DE3] text-xs lg:text-base font-semibold">TF-IDF: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{(selectedMovie.tfidf_score * 100).toFixed(1)}%</span>
                                        </div>
                                    )}
                                    {selectedMovie.jaccard_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-3 rounded-lg border border-[#8f5bff]/50">
                                            <span className="text-[#8f5bff] text-xs lg:text-base font-semibold">Jaccard: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{selectedMovie.jaccard_score.toFixed(4)}</span>
                                        </div>
                                    )}
                                    {selectedMovie.semantic_score !== undefined && (
                                        <div className="bg-black/50 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-3 rounded-lg border border-emerald-400/50">
                                            <span className="text-emerald-400 text-xs lg:text-base font-semibold">Semantic: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{(selectedMovie.semantic_score * 100).toFixed(1)}%</span>
                                        </div>
                                    )}
                                    {selectedMovie.score !== undefined && (
                                        <div className="bg-gradient-to-r from-[#8f5bff]/40 to-[#4A9DE3]/40 backdrop-blur-md px-3 py-1 lg:px-5 lg:py-3 rounded-lg border border-white/50">
                                            <span className="text-white text-xs lg:text-base font-semibold">Hybrid: </span>
                                            <span className="text-white text-xs lg:text-base font-bold">{(selectedMovie.score * 100).toFixed(1)}%</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Full Description */}
                        <div className="border-t border-[#4A9DE3]/50 pt-6">
                            <h3 
                                className="text-xl lg:text-2xl font-bold text-white mb-4"
                                style={{ fontFamily: "'Michroma', monospace" }}
                            >
                                Deskripsi
                            </h3>
                            <div className="text-white/90 text-base lg:text-lg text-justify leading-relaxed space-y-4">
                                {(() => {
                                    const description = selectedMovie.description || selectedMovie.isi || selectedMovie.content || '';
                                    if (!description) return <p className="text-white/60 italic">Tidak ada deskripsi tersedia.</p>;
                                    
                                    // Split description by double newlines (paragraphs)
                                    const paragraphs = description.split(/\n\n+/).filter((p: string) => p.trim().length > 0);
                                    if (paragraphs.length === 0) return <p className="text-white/60 italic">Tidak ada deskripsi tersedia.</p>;
                                    
                                    return paragraphs.map((paragraph: string, index: number) => (
                                        <p key={index} className="indent-8">
                                            {parseMarkdownText(paragraph.trim())}
                                        </p>
                                    ));
                                })()}
                            </div>
                        </div>

                        {/* Film Serupa */}
                        <div className="border-t border-[#4A9DE3]/50 pt-6 mt-6">
                            <h3
                                className="text-xl lg:text-2xl font-bold text-white mb-4"
                                style={{ fontFamily: "'Michroma', monospace" }}
                            >
                                Film Serupa
                            </h3>
                            {isLoadingRecs ? (
                                <p className="text-white/50 italic text-sm">Memuat rekomendasi...</p>
                            ) : recommendations.length === 0 ? (
                                <p className="text-white/50 italic text-sm">Tidak ada rekomendasi tersedia.</p>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {recommendations.map((rec, i) => (
                                        <div
                                            key={i}
                                            className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden cursor-pointer hover:border-[#4A9DE3]/60 transition-all duration-300 hover:scale-[1.02]"
                                            onClick={() => openModal(rec)}
                                        >
                                            {rec.poster ? (
                                                <img
                                                    src={rec.poster}
                                                    alt={rec.title}
                                                    className="w-full object-cover"
                                                    style={{ height: '140px' }}
                                                />
                                            ) : (
                                                <div className="w-full flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0a0a14]" style={{ height: '140px' }}>
                                                    <span className="text-4xl">🎬</span>
                                                </div>
                                            )}
                                            <div className="p-3">
                                                <p className="text-white text-xs font-semibold line-clamp-2 mb-1" style={{ fontFamily: "'Michroma', monospace" }}>{rec.title}</p>
                                                <p className="text-emerald-400 text-xs">{(rec.similarity_score * 100).toFixed(1)}% mirip</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default ResultSection;