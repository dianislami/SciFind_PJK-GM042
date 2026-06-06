import React, { useState, useEffect } from 'react';

const HeroSection: React.FC = () => {
  const [typedText1, setTypedText1] = useState<string>('');
  const [typedText2, setTypedText2] = useState<string>('');
  const [typedText3, setTypedText3] = useState<string>('');
  const [showCursor1, setShowCursor1] = useState<boolean>(true);
  const [showCursor2, setShowCursor2] = useState<boolean>(false);
  const [showCursor3, setShowCursor3] = useState<boolean>(false);
  
  const text1: string = 'Temukan Review Film ';
  const text2: string = 'Sci-Fi';
  const text3: string = ' Favoritmu Di Sini';
  
  useEffect(() => {
    const startTypingAnimation = () => {
      // Reset states
      setTypedText1('');
      setTypedText2('');
      setTypedText3('');
      setShowCursor1(true);
      setShowCursor2(false);
      setShowCursor3(false);

      // Type first text: "Temukan Film "
      let i = 0;
      const timer1 = setInterval(() => {
        if (i < text1.length) {
          setTypedText1(text1.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer1);
          setShowCursor1(false);
          setShowCursor2(true);
          
          // Type second text: "Sci-Fi" (with gradient)
          setTimeout(() => {
            let j = 0;
            const timer2 = setInterval(() => {
              if (j < text2.length) {
                setTypedText2(text2.slice(0, j + 1));
                j++;
              } else {
                clearInterval(timer2);
                setShowCursor2(false);
                setShowCursor3(true);
                
                // Type third text: " yang Tepat Untukmu"
                setTimeout(() => {
                  let k = 0;
                  const timer3 = setInterval(() => {
                    if (k < text3.length) {
                      setTypedText3(text3.slice(0, k + 1));
                      k++;
                    } else {
                      clearInterval(timer3);
                      setShowCursor3(false);
                      
                      // Wait 2 seconds then start deleting and restart
                      setTimeout(() => {
                        // Delete all texts in reverse order
                        let l = text3.length;
                        const deleteTimer3 = setInterval(() => {
                          if (l > 0) {
                            setTypedText3(text3.slice(0, l - 1));
                            l--;
                          } else {
                            clearInterval(deleteTimer3);
                            
                            let m = text2.length;
                            const deleteTimer2 = setInterval(() => {
                              if (m > 0) {
                                setTypedText2(text2.slice(0, m - 1));
                                m--;
                              } else {
                                clearInterval(deleteTimer2);
                                
                                let n = text1.length;
                                const deleteTimer1 = setInterval(() => {
                                  if (n > 0) {
                                    setTypedText1(text1.slice(0, n - 1));
                                    n--;
                                  } else {
                                    clearInterval(deleteTimer1);
                                    
                                    // Restart animation after delay
                                    setTimeout(() => {
                                      startTypingAnimation();
                                    }, 500);
                                  }
                                }, 50);
                              }
                            }, 50);
                          }
                        }, 50);
                      }, 2000);
                    }
                  }, 80);
                }, 200);
              }
            }, 80);
          }, 100);
        }
      }, 100);
    };

    startTypingAnimation();
  }, []);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>): void => {
    console.error('Video failed to load:', e);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/images/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="relative px-6 lg:px-8 w-full z-20">
        <div className="mx-auto max-w-7xl py-20 sm:py-24 lg:py-32">
          {/* Main Hero Content */}
          <div className="text-center">
            <h1 
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 leading-tight"
              style={{ fontFamily: "'Michroma', monospace" }}
            >
              <span className="text-white">
                {typedText1}
                {showCursor1 && <span className="animate-pulse">|</span>}
              </span>
              <span className="bg-gradient-to-r from-[#4A9DE3] to-[#331574] bg-clip-text text-transparent">
                {typedText2}
                {showCursor2 && <span className="animate-pulse text-[#4A9DE3]">|</span>}
              </span>
              <span className="block text-white">
                {typedText3}
                {showCursor3 && <span className="animate-pulse">|</span>}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;