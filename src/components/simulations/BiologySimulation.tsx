import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  RotateCcw, 
  HelpCircle, 
  Sliders,
  CheckCircle2,
  Info
} from 'lucide-react';

interface BiologySimulationProps {
  onRecordReading: (reading: { slide: string; focused: boolean; magnification: string }) => void;
}

export const BiologySimulation: React.FC<BiologySimulationProps> = ({ onRecordReading }) => {
  // Configs
  const slides = [
    { id: 'onion-peel', name: 'Onion Epidermis Peel (Plant)', icon: '🧅' },
    { id: 'cheek-cells', name: 'Human Cheek Smear (Animal)', icon: '👤' }
  ];

  // Simulator States
  const [selectedSlide, setSelectedSlide] = useState<string>('onion-peel');
  const [coarseFocus, setCoarseFocus] = useState<number>(30); // 0 is sharp, max is 50
  const [fineFocus, setFineFocus] = useState<number>(15); // 0 is sharp, max is 20
  const [posX, setPosX] = useState<number>(35); // 50 is centered
  const [posY, setPosY] = useState<number>(65); // 50 is centered
  const [light, setLight] = useState<number>(50); // 100 is ideal, 0 is dark
  const [magnification, setMagnification] = useState<'10x' | '40x'>('10x');
  
  const [activeOrganelle, setActiveOrganelle] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Check focus state
  const isCoarseAligned = Math.abs(coarseFocus - 15) <= 3; // focused sweet spot around 15
  const isFineAligned = Math.abs(fineFocus - 8) <= 1.5; // focused sweet spot around 8
  const isCentered = Math.abs(posX - 50) <= 6 && Math.abs(posY - 50) <= 6;
  const isLightSufficient = light >= 70 && light <= 95; // sweet spot

  const isFullyFocused = isCoarseAligned && isFineAligned && isCentered && isLightSufficient;

  // Calculate blur values based on focus alignments
  const getBlurPixels = () => {
    if (isFullyFocused) return 0;
    
    // Sum of offsets
    const coarseOffset = Math.abs(coarseFocus - 15);
    const fineOffset = Math.abs(fineFocus - 8);
    const centerOffset = (Math.abs(posX - 50) + Math.abs(posY - 50)) / 2;
    
    return Math.min(18, (coarseOffset * 0.4) + (fineOffset * 0.3) + (centerOffset * 0.15));
  };

  const getOpacityVal = () => {
    // Light limits visibility
    return Math.min(1.0, light / 80);
  };

  const handleReset = () => {
    setCoarseFocus(30);
    setFineFocus(15);
    setPosX(35);
    setPosY(65);
    setLight(50);
    setMagnification('10x');
    setActiveOrganelle(null);
  };

  // Dispatch progress update when focused
  useEffect(() => {
    if (isFullyFocused) {
      onRecordReading({
        slide: selectedSlide === 'onion-peel' ? 'Onion Peel' : 'Cheek Cells',
        focused: true,
        magnification: magnification
      });
    }
  }, [isFullyFocused, selectedSlide, magnification]);

  const organelles: Record<string, Record<string, { title: string; desc: string; x: number; y: number }>> = {
    'onion-peel': {
      'cell-wall': { title: 'Cell Wall', desc: 'Rigid outer layer composed of cellulose. Provides structural support and protection to plant cells.', x: 35, y: 30 },
      'nucleus': { title: 'Nucleus', desc: 'Dark, spherical organelle positioned near the cell periphery. Holds genetic material (DNA) and controls cellular activities.', x: 55, y: 40 },
      'vacuole': { title: 'Large Central Vacuole', desc: 'Occupies most of the plant cell volume. Stores cell sap, maintains turgor pressure, and keeps the cell rigid.', x: 48, y: 60 },
      'cytoplasm': { title: 'Cytoplasm', desc: 'Jelly-like fluid containing water, salts, and proteins. Site of metabolic chemical reactions.', x: 25, y: 70 }
    },
    'cheek-cells': {
      'membrane': { title: 'Cell Membrane', desc: 'Thin, flexible outer boundary. Semi-permeable layer controlling entry/exit of substances.', x: 30, y: 40 },
      'nucleus': { title: 'Central Nucleus', desc: 'Pronounced dark blue spherical body located in the center of the cell. Houses chromatin material.', x: 50, y: 50 },
      'cytoplasm': { title: 'Granular Cytoplasm', desc: 'Fluid substance enclosed within the membrane. Lacks large vacuoles or cell walls.', x: 65, y: 55 }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Simulation Workspace Panel (Left) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-panel border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <Eye className="text-violet-400 animate-pulse" size={18} />
              <h3 className="font-bold text-white text-sm">Compound Light Microscope Viewer</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition text-xs flex items-center space-x-1"
              >
                <HelpCircle size={14} />
                <span>Guide</span>
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-950/80 border border-rose-500/20 text-rose-300 transition text-xs flex items-center space-x-1"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Guide banner */}
          {showHint && (
            <div className="bg-indigo-500/10 border border-indigo-500/25 rounded-xl p-3 text-xs text-indigo-300 mb-4 leading-relaxed">
              <strong>Microscope Tuning Instructions:</strong><br />
              1. Choose a specimen slide: <strong>Onion Peel</strong> or <strong>Cheek Cells</strong>.<br />
              2. Align the slide X and Y position sliders to the <strong>center (around 50%)</strong>.<br />
              3. Adjust <strong>Light Intensity</strong> until the view window illuminates (70% - 95%).<br />
              4. Slide the <strong>Coarse Focus</strong> (target: ~15) and then <strong>Fine Focus</strong> (target: ~8) to sharpen the cell image.<br />
              5. Once focused, click the <strong>blinking hotspot circles</strong> on the specimen image to label the organelles!
            </div>
          )}

          {/* Interactive Lab Microscope stage */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 min-h-[360px]">
            
            {/* Circular Viewport (Eyepiece lens) */}
            <div className="relative w-64 h-64 rounded-full border-4 border-slate-800 bg-slate-950 overflow-hidden flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] flex-shrink-0 glow-violet">
              
              {/* Microscope illumination backing */}
              <div 
                className="absolute inset-0 bg-amber-100 transition-opacity duration-300"
                style={{ 
                  opacity: getOpacityVal() * 0.9,
                  filter: `brightness(${light}%)`
                }}
              />

              {/* Specimen Slide Contents */}
              <div 
                className="w-full h-full relative transition-all duration-300"
                style={{
                  filter: `blur(${getBlurPixels()}px)`,
                  transform: `scale(${magnification === '40x' ? 1.8 : 1.0}) translate(${(posX - 50) * 0.6}px, ${(posY - 50) * 0.6}px)`,
                  opacity: light > 10 ? 1 : 0
                }}
              >
                {/* SVG Graphics for Onion Cells */}
                {selectedSlide === 'onion-peel' ? (
                  <svg viewBox="0 0 100 100" className="w-full h-full text-rose-800/80 fill-rose-100/30">
                    {/* Onion peel cells network */}
                    <path d="M5,10 C15,8 25,12 35,10 L35,30 C25,32 15,28 5,30 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M35,10 C45,8 55,12 65,10 L65,30 C55,32 45,28 35,30 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M65,10 C75,8 85,12 95,10 L95,30 C85,32 75,28 65,30 Z" stroke="currentColor" strokeWidth="0.8" />
                    
                    <path d="M5,30 C18,29 28,32 40,30 L40,55 C28,57 18,54 5,55 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M40,30 C53,29 63,32 75,30 L75,55 C63,57 53,54 40,55 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M75,30 C88,29 93,32 98,30 L98,55 C93,57 88,54 75,55 Z" stroke="currentColor" strokeWidth="0.8" />
                    
                    <path d="M5,55 C12,53 22,57 32,55 L32,80 C22,82 12,78 5,80 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M32,55 C48,53 58,57 68,55 L68,80 C58,82 48,78 32,80 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M68,55 C78,53 88,57 95,55 L95,80 C88,82 78,78 68,80 Z" stroke="currentColor" strokeWidth="0.8" />

                    {/* Nuclei */}
                    <circle cx="28" cy="22" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                    <circle cx="58" cy="24" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                    <circle cx="85" cy="23" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                    
                    <circle cx="20" cy="42" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                    <circle cx="55" cy="40" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                    <circle cx="88" cy="43" r="2.2" fill="rgba(156, 39, 176, 0.7)" />

                    <circle cx="22" cy="68" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                    <circle cx="51" cy="70" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                    <circle cx="82" cy="67" r="2.2" fill="rgba(156, 39, 176, 0.7)" />
                  </svg>
                ) : (
                  // Cheek Cells Graphic representation
                  <svg viewBox="0 0 100 100" className="w-full h-full text-blue-700/60 fill-blue-500/10">
                    {/* Cheek cells irregular squiggly shapes */}
                    <path d="M15,20 Q25,12 35,22 T45,35 Q30,45 20,38 T15,20 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M55,30 Q65,15 75,25 T80,48 Q60,55 52,42 T55,30 Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M25,55 Q35,48 45,62 T38,82 Q20,78 18,65 T25,55 Z" stroke="currentColor" strokeWidth="0.8" />
                    
                    {/* Nuclei */}
                    <circle cx="28" cy="29" r="2.5" fill="rgba(30, 58, 138, 0.8)" />
                    <circle cx="65" cy="38" r="2.5" fill="rgba(30, 58, 138, 0.8)" />
                    <circle cx="33" cy="66" r="2.5" fill="rgba(30, 58, 138, 0.8)" />
                  </svg>
                )}

                {/* Hotspot Markers overlays, visible ONLY when focused */}
                {isFullyFocused && (
                  Object.entries(organelles[selectedSlide]).map(([id, item]) => (
                    <button
                      key={id}
                      onClick={() => setActiveOrganelle(id)}
                      className="absolute w-5 h-5 bg-indigo-500/35 border-2 border-indigo-400 rounded-full flex items-center justify-center animate-pulse text-[10px] text-white hover:scale-125 transition-transform"
                      style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <Info size={10} />
                    </button>
                  ))
                )}

              </div>

              {/* Scope pointer overlay */}
              <div className="absolute inset-0 border-[24px] border-slate-950 pointer-events-none rounded-full" />
              
              {/* Blur indicator overlay */}
              {!isFullyFocused && (
                <div className="absolute bottom-4 bg-slate-900/90 text-[10px] px-3 py-1 rounded-full text-slate-400 font-semibold border border-slate-800">
                  {!isLightSufficient 
                    ? 'Adjust light intensity' 
                    : !isCentered 
                      ? 'Slide specimen into center' 
                      : 'Adjust coarse/fine focus knobs'
                  }
                </div>
              )}
            </div>

            {/* Specimen Slide Selector & Magnification Toggle */}
            <div className="w-full space-y-4 text-xs">
              
              {/* Slide Selection */}
              <div className="space-y-1.5">
                <span className="text-slate-400 font-bold block">1. Select Specimen Slide</span>
                <div className="space-y-2">
                  {slides.map((slide) => (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setSelectedSlide(slide.id);
                        handleReset();
                      }}
                      className={`w-full py-2 px-3 rounded-xl border text-left font-bold flex items-center space-x-2.5 transition ${
                        selectedSlide === slide.id
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-lg">{slide.icon}</span>
                      <span>{slide.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Magnification */}
              <div className="space-y-1.5">
                <span className="text-slate-400 font-bold block">2. Objective Lens Power</span>
                <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 border border-slate-800 rounded-xl">
                  {['10x', '40x'].map((mag) => (
                    <button
                      key={mag}
                      onClick={() => setMagnification(mag as any)}
                      className={`py-1.5 rounded-lg font-bold text-[10px] transition ${
                        magnification === mag
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {mag === '10x' ? '10x Low Power' : '40x High Power'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alignment Status indicator badge */}
              <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl space-y-2">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">Calibration Checklist</span>
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Position X/Y:</span>
                    <span className={isCentered ? 'text-emerald-400' : 'text-rose-400'}>
                      {isCentered ? 'Aligned' : 'Off-center'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Illumination:</span>
                    <span className={isLightSufficient ? 'text-emerald-400' : 'text-rose-400'}>
                      {isLightSufficient ? 'Optimal' : light < 70 ? 'Too Dark' : 'Too Bright'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Image Resolution:</span>
                    <span className={isFullyFocused ? 'text-emerald-400' : 'text-rose-400'}>
                      {isFullyFocused ? 'Sharp' : 'Blurry'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Micro Sliders controls */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-slate-900 pt-4 text-xs">
            
            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Coarse Focus</span>
              <input
                type="range"
                min="0"
                max="50"
                value={coarseFocus}
                onChange={(e) => setCoarseFocus(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Fine Focus</span>
              <input
                type="range"
                min="0"
                max="20"
                value={fineFocus}
                onChange={(e) => setFineFocus(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Slide Mount X</span>
              <input
                type="range"
                min="20"
                max="80"
                value={posX}
                onChange={(e) => setPosX(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-bold block">Slide Mount Y</span>
              <input
                type="range"
                min="20"
                max="80"
                value={posY}
                onChange={(e) => setPosY(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1 col-span-2 md:col-span-1">
              <span className="text-slate-400 font-bold block">Light Intensity</span>
              <input
                type="range"
                min="10"
                max="120"
                value={light}
                onChange={(e) => setLight(parseInt(e.target.value))}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Info Card / Organelle Details Panel (Right) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Focusing Status display */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 text-center">
          <div className="font-bold text-xs text-white mb-2">Microscope Calibration</div>
          {isFullyFocused ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex flex-col items-center justify-center">
              <CheckCircle2 className="text-emerald-400 mb-1" size={24} />
              <span className="text-xs font-bold text-emerald-400">Specimen Focused!</span>
              <span className="text-[10px] text-slate-400 mt-1">
                You can now examine labels and details inside the cell slide.
              </span>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center">
              <Sliders className="text-slate-500 mb-2 animate-bounce" size={24} />
              <span className="text-xs text-slate-400 font-semibold">Tuning required</span>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                Adjust coarse focus to ~15, fine focus to ~8, light intensity to ~80%, and positions to ~50% to align.
              </p>
            </div>
          )}
        </div>

        {/* Hotspot details info display */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="font-bold text-xs text-white border-b border-slate-800/80 pb-2">
            Organelle Detailed Anatomy
          </div>

          {!activeOrganelle ? (
            <div className="py-12 text-center text-slate-500 text-[11px] italic">
              {isFullyFocused 
                ? "Click on any blinking label markers inside the eyepiece to view organelle details."
                : "Focus the microscope to unlock structural labeling details."
              }
            </div>
          ) : (
            <div className="space-y-3 bg-slate-950/40 p-4 border border-slate-800/80 rounded-xl">
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Structure Found
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                {organelles[selectedSlide][activeOrganelle].title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {organelles[selectedSlide][activeOrganelle].desc}
              </p>
              <button 
                onClick={() => setActiveOrganelle(null)}
                className="text-[10px] text-slate-400 font-bold hover:text-white mt-2 block"
              >
                Close label details
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
