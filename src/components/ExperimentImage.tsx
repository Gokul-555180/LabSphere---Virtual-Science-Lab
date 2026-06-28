import React, { useState } from 'react';
import { Zap, FlaskConical, Eye, Cpu } from 'lucide-react';
import type { Subject } from '../types';

interface ExperimentImageProps {
  src: string;
  subject: Subject;
  alt: string;
  className?: string;
}

export const ExperimentImage: React.FC<ExperimentImageProps> = ({
  src,
  subject,
  alt,
  className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
}) => {
  const [hasError, setHasError] = useState(false);

  const getFallbackIcon = () => {
    switch (subject) {
      case 'Physics':
        return (
          <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-blue-400 p-4 min-h-[160px]">
            <Zap size={36} className="animate-pulse mb-1.5 text-blue-400" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-400/80 font-mono">Physics Practical</span>
          </div>
        );
      case 'Chemistry':
        return (
          <div className="w-full h-full bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-emerald-400 p-4 min-h-[160px]">
            <FlaskConical size={36} className="animate-pulse mb-1.5 text-emerald-400" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-400/80 font-mono">Chemistry Practical</span>
          </div>
        );
      case 'Biology':
        return (
          <div className="w-full h-full bg-gradient-to-br from-violet-900/40 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-violet-400 p-4 min-h-[160px]">
            <Eye size={36} className="animate-pulse mb-1.5 text-violet-400" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-violet-400/80 font-mono">Biology Practical</span>
          </div>
        );
      case 'Computer Science':
        return (
          <div className="w-full h-full bg-gradient-to-br from-rose-900/40 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-rose-400 p-4 min-h-[160px]">
            <Cpu size={36} className="animate-pulse mb-1.5 text-rose-400" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-rose-400/80 font-mono">Computer Science</span>
          </div>
        );
    }
  };

  if (hasError || !src) {
    return getFallbackIcon();
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
