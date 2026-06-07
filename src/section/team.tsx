import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Particles } from "@/components/ui/particles";
import { TextGenerateEffect } from "@/components/ui/text_generate_effect";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  skills: string[];
}

const Team: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState<boolean>(true);
  const teamSectionRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Tinsari Rauhana',
      role: 'AI/ML Engineer',
      bio: 'Bertanggung jawab dalam implementasi model sentence embedding, membangun sistem Content-Based Filtering, melakukan training dan evaluasi model AI, serta menyusun laporan evaluasi komparatif untuk mengukur performa sistem rekomendasi dan semantic search.',
      image: '/images/tinsari.png',
      social: {
        github: 'https://github.com/tinsarirauhana',
        linkedin: ' https://www.linkedin.com/in/tinsari-rauhana/',
        email: 'tinsarirauhanaa@gmail.com',
      },
      skills: [
        'Machine Learning',
        'Sentence Embedding',
        'Content-Based Filtering',
        'Model Evaluation',
        'Python'
      ]
    },
    {
      id: 2,
      name: 'Dian Islami',
      role: 'Frontend & Integration Engineer',
      bio: 'Bertanggung jawab dalam pengembangan dan peningkatan antarmuka pengguna SciFind, termasuk fitur rekomendasi dan semantic search, integrasi frontend dengan backend, deployment aplikasi menggunakan Vercel, serta pembuatan video presentasi proyek.',
      image: '/images/dian.png',
      social: {
        github: 'https://github.com/dianislami',
        linkedin: 'https://www.linkedin.com/in/dian-islami-257a263b2/',
        email: 'dianislami553@gmail.com',
      },
      skills: [
        'React',
        'Next.js',
        'Frontend Development',
        'API Integration',
        'Vercel Deployment',
        'UI/UX'
      ]
    },
    {
      id: 3,
      name: 'Firah Maulida',
      role: 'Data Engineer & Backend Developer',
      bio: 'Bertanggung jawab dalam pembaruan dan ekspansi korpus data melalui proses crawling, preprocessing data untuk pipeline embedding, pengelolaan dataset dan vector store, serta pengembangan REST API untuk semantic search dan sistem rekomendasi.',
      image: '/images/firah.png',
      social: {
        github: 'https://github.com/firahmaulida',
        linkedin: 'https://www.linkedin.com/in/firah-maulida-29257b377/',
        email: 'firahmaulida.05@gmail.com',
      },
      skills: [
        'Data Engineering',
        'Web Crawling',
        'Data Preprocessing',
        'Vector Database',
        'REST API',
        'Backend Development'
      ]
    },
    {
      id: 4,
      name: 'Cut Renatha Fadhillah',
      role: 'QA & Documentation Specialist',
      bio: 'Bertanggung jawab dalam pengujian dan validasi sistem secara end-to-end, penyusunan Project Brief, pembuatan slide presentasi dan panduan penggunaan produk, serta koordinasi pelaksanaan checkpoint tim selama pengembangan proyek.',
      image: '/images/renatha.png',
      social: {
        github: 'https://github.com/Cutrenatha',
        linkedin: 'https://www.linkedin.com/in/cut-renatha-fadhilah-655033258/',
        email: 'cutrenathaf@gmail.com',
      },
      skills: [
        'Quality Assurance',
        'System Testing',
        'Documentation',
        'Project Coordination',
        'Technical Writing'
      ]
    }
  ];


  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000); // 15 seconds
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, teamMembers.length]);

  // Scroll animation observer
  React.useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      observerOptions
    );

    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Reset auto-play timer when user manually changes
  const handleManualChange = (index: number): void => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 15 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const currentMember: TeamMember = teamMembers[currentIndex];

  return (
    <div 
      ref={teamSectionRef}
      className="min-h-screen relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
      }}
    >
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-[#331574]/30 via-[#4A9DE3]/80 to-[#331574]/30 m-0 mb-12"></div>

      {/* Interactive particles background */}
      <Particles
        className="absolute inset-0 -z-30"
        quantity={100}
        ease={30}
        staticity={20}
        color="#4A9DE3"
        size={3}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12" >
        {/* Header Section */}
        <div className="text-center mb-12" style={{ fontFamily: "'Michroma', monospace" }}>
          <TextGenerateEffect 
            words="Meet Our"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            duration={1}
            initialDelay={0}
          />
          <TextGenerateEffect 
            words="Amazing Team"
            className="text-4xl sm:text-5xl lg:text-6xl text-transparent font-bold bg-gradient-to-r from-[#4A9DE3] to-[#7751c9] bg-clip-text pb-2"
            duration={1}
            initialDelay={0.6}
          />

          {/* Animated Glow Effects */}
          <div aria-hidden="true" className="absolute inset-x-0 -z-20 transform-gpu" style={{ bottom: '650px' }}>
            <div className="relative left-1/2 -translate-x-1/2 w-full h-250 flex items-end justify-center">
              {/* Inner glow - diagonal movement 45deg */}
              <div className="absolute bottom-5 lg:bottom-10 w-25 h-35 lg:w-90 lg:h-70 rounded-full bg-[#4A9DE3] opacity-20 blur-2xl lg:blur-3xl animate-diagonal-drift"></div>
              {/* Middle glow - circular orbit */}
              <div className="absolute bottom-0 w-[100px] h-30 lg:w-[1200px] lg:h-50 rounded-full bg-[#331574] opacity-30 blur-2xl lg:blur-3xl animate-orbit"></div>
              {/* Outer glow - rotate and scale combined */}
              <div className="absolute bottom-0 w-[500px] h-30 lg:w-[1000px] lg:h-30 rounded-full bg-gradient-to-r from-[#4A9DE3] to-[#331574] opacity-25 blur-3xl animate-rotate-scale"></div>
              {/* Outer glow right - rotate opposite direction */}
              <div className="absolute bottom-0 w-[500px] h-30 lg:w-[1000px] lg:h-50 rounded-full bg-gradient-to-r from-[#7751c9] to-[#331574] opacity-25 blur-2xl lg:blur-3xl animate-rotate-scale-right"></div>
            </div>
          </div>
        </div>

        {/* Main Content - Photo Left, Info Right */}
        <div className="relative rounded-3xl bg-white/5 backdrop-blur overflow-hidden lg:mx-0 sm:mx-5 mb-10 border-2 border-[#4A9DE3]/50 animate-border-glow">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[600px]">
            {/* Left Side - Full Photo with slide animation */}
            <div className="relative h-[200px] lg:h-[400px] lg:h-auto overflow-hidden">
              <div 
                key={currentMember.id}
                className="absolute inset-0 flex items-start lg:items-center justify-center animate-[slideInFromLeft_0.8s_ease-out]"
              >
                <div className="w-auto h-60 lg:h-150 p-1">
                  <img 
                    src={currentMember.image} 
                    alt={currentMember.name}
                    className="py-4 lg:py-18 w-full h-full object-cover object-top lg:object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-white text-6xl font-bold" style={{display: 'none'}}>
                    {currentMember.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Info with fade animation */}
            <div className="pt-2 px-8 pb-8 lg:p-8 lg:p-12 flex flex-col justify-center relative">
              <div 
                key={`info-${currentMember.id}`}
                className="w-full"
              >
                <div className="mb-0 lg:mb-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white">
                    {currentMember.name}
                  </h2>
                </div>
                <div className="mb-3 lg:mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: '0.35s' }}>
                  <p className="lg:text-2xl text-md text-[#4A9DE3] font-semibold">
                    {currentMember.role}
                  </p>
                </div>
                <p className="lg:text-lg text-sm text-slate-300 leading-relaxed mb-6 lg:mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: '0.5s' }}>
                  {currentMember.bio}
                </p>

                {/* Skills */}
                <div className="mb-4 lg:mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: '0.65s' }}>
                  <div className="flex flex-wrap gap-2 lg:gap-4">
                    {currentMember.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 lg:px-6 py-1 lg:py-2 lg:text-sm text-xs border border-[#4A9DE3]/30 rounded-full bg-[#4A9DE3]/20 text-[#4A9DE3] hover:text-white hover:bg-[#4A9DE3]/30 hover:scale-110 transition-all duration-300 hover:cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]" style={{ animationDelay: '0.8s' }}>
                  {currentMember.social.github && (
                    <a
                      href={currentMember.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[#4A9DE3]/20 text-[#4A9DE3] border border-[#4A9DE3]/30 hover:text-white hover:bg-[#4A9DE3]/30 hover:scale-110 transition-all duration-300"
                    >
                      <Github className="w-3 h-3 lg:w-5 lg:h-5" />
                    </a>
                  )}
                  {currentMember.social.linkedin && (
                    <a
                      href={currentMember.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-[#4A9DE3]/20 text-[#4A9DE3] border border-[#4A9DE3]/30 hover:text-white hover:bg-[#4A9DE3]/30 hover:scale-110 transition-all duration-300"
                    >
                      <Linkedin className="w-3 h-3 lg:w-5 lg:h-5" />
                    </a>
                  )}
                  {currentMember.social.email && (
                  <a
                    href={`mailto:${currentMember.social.email}`}
                    aria-label={`Send email to ${currentMember.name}`}
                    className="p-3 rounded-full bg-[#4A9DE3]/20 text-[#4A9DE3] border border-[#4A9DE3]/30 hover:text-white hover:bg-[#4A9DE3]/30 hover:scale-110 transition-all duration-300"
                  >
                    <Mail className="w-3 h-3 lg:w-5 lg:h-5" />
                  </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Thumbnails */}
        <div className="flex justify-center items-center gap-4">
          {teamMembers.map((member, index) => (
            <button
              key={member.id}
              onClick={() => handleManualChange(index)}
              className={`relative transition-all ${
                index === currentIndex ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="w-12 lg:w-16 h-auto rounded-full">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-white text-sm font-bold" style={{display: 'none'}}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              {index === currentIndex && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#4A9DE3] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(30deg);
          }
          50% {
            transform: translateY(-20px) rotate(30deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes breathe {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes wave {
          0%, 100% {
            opacity: 0.25;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.35;
            transform: scaleX(1.1);
          }
        }

        @keyframes diagonal-drift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(20px, -15px) scale(1.05);
            opacity: 0.3;
          }
        }

        @keyframes orbit {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(15px, -10px) scale(1.03);
            opacity: 0.35;
          }
        }

        @keyframes rotate-scale {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: rotate(20deg) scale(1.08);
            opacity: 0.3;
          }
        }

        @keyframes rotate-scale-right {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.25;
          }
          70% {
            transform: rotate(-20deg) scale(1.08);
            opacity: 0.3;
          }
        }

        @keyframes pendulum {
          0%, 100% {
            transform: translateX(-8px) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: translateX(8px) scale(1.05);
            opacity: 0.3;
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes border-glow {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(74, 157, 227, 0.3),
              0 0 25px #694da66f,
              inset 0 0 20px rgba(74, 157, 227, 0.1);
          }
          50% {
            box-shadow: 
              0 0 40px rgba(74, 157, 227, 0.3),
              0 0 45px rgba(74, 157, 227, 0.2),
              inset 0 0 20px rgba(74, 157, 227, 0.1);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-diagonal-drift {
          animation: diagonal-drift 4s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 5s ease-in-out infinite;
        }

        .animate-rotate-scale {
          animation: rotate-scale 6s ease-in-out infinite;
        }

        .animate-rotate-scale-right {
          animation: rotate-scale-right 6s ease-in-out infinite;
        }

        .animate-pendulum {
          animation: pendulum 4.5s ease-in-out infinite;
        }

        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Team;