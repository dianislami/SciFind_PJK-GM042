import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const navbar = document.querySelector('nav');
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.pointerEvents = 'none';
      }
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
      if (navbar) {
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (navbar) {
        navbar.style.opacity = '1';
        navbar.style.pointerEvents = 'auto';
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 250); // Match animation duration
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={handleClose}
      style={{
        animation: isClosing ? 'fadeOut 0.25s ease-in' : 'fadeIn 0.3s ease-out',
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        style={{
          animation: isClosing ? 'fadeOut 0.25s ease-in' : 'fadeIn 0.3s ease-out',
        }}
      />
      
      {/* Modal Content */}
      <div 
        className="relative bg-gradient-to-br from-[#0a0a14]/70 to-[#1a1a2e]/70 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#4A9DE3]/50"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing ? 'scaleOut 0.25s ease-in' : 'scaleIn 0.3s ease-out',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 lg:top-4 lg:right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          <X className="w-3 h-3 lg:w-6 lg:h-6 text-white" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
