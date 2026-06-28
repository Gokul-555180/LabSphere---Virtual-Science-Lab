import React, { useState } from 'react';
import { 
  RotateCcw, 
  HelpCircle, 
  FileSpreadsheet, 
  Compass
} from 'lucide-react';

interface GenericApparatusSimulationProps {
  simulationId: string;
  onRecordReading: (reading: any) => void;
}

export const GenericApparatusSimulation: React.FC<GenericApparatusSimulationProps> = ({
  simulationId,
  onRecordReading
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);

  // 1. Vernier Calipers States
  const [caliperGap, setCaliperGap] = useState<number>(2.45); // cm
  
  // 2. Optics States
  const [objectDistance, setObjectDistance] = useState<number>(-40); // cm
  const [focalLength, setFocalLength] = useState<number>(15); // cm
  
  // 3. Metre Bridge States
  const [knownR, setKnownR] = useState<number>(10); // Ohm
  const [unknownX] = useState<number>(15); // Target Unknown resistance to solve
  const [jockeyPosition, setJockeyPosition] = useState<number>(30); // cm

  // 4. pH Samples States
  const [selectedSample, setSelectedSample] = useState<string>('lemon');
  const [stripDipped, setStripDipped] = useState<boolean>(false);

  const handleReset = () => {
    setCaliperGap(2.45);
    setObjectDistance(-40);
    setFocalLength(15);
    setKnownR(10);
    setJockeyPosition(30);
    setStripDipped(false);
  };

  const handleAddReading = () => {
    let readingData: any = {};
    if (simulationId === 'vernier-calipers-sim') {
      const msr = Math.floor(caliperGap * 10) / 10;
      const vsr = Math.round((caliperGap - msr) * 100);
      readingData = {
        sphereDiameter: `${caliperGap.toFixed(2)} cm`,
        mainScaleReading: `${msr.toFixed(1)} cm`,
        vernierScaleReading: `${vsr}`,
        calculatedReading: `${(msr + vsr * 0.01).toFixed(2)} cm`
      };
    } else if (simulationId === 'optics-mirror-lens-sim') {
      // 1/v - 1/u = 1/f -> 1/v = 1/f + 1/u = (u+f)/(u*f) -> v = (u*f)/(u+f)
      const u = objectDistance;
      const f = focalLength;
      const v = (u * f) / (u + f);
      readingData = {
        objectDistanceU: `${u} cm`,
        focalLengthF: `${f} cm`,
        calculatedImageV: `${v.toFixed(1)} cm`,
        magnificationM: `${(-v / u).toFixed(2)}`
      };
    } else if (simulationId === 'metre-bridge-sim') {
      const l = jockeyPosition;
      const calcX = Number(((knownR * (100 - l)) / l).toFixed(2));
      readingData = {
        knownResistanceR: `${knownR} Ω`,
        balancingLengthL: `${l.toFixed(1)} cm`,
        lengthRatio100L: `${(100 - l).toFixed(1)} cm`,
        solvedResistanceX: `${calcX} Ω`
      };
    } else if (simulationId === 'ph-samples-sim') {
      const samples: Record<string, { name: string; ph: number; color: string }> = {
        lemon: { name: 'Lemon Juice', ph: 2.2, color: 'Red' },
        tomato: { name: 'Tomato Juice', ph: 4.1, color: 'Orange' },
        water: { name: 'Pure Water', ph: 7.0, color: 'Green' },
        saliva: { name: 'Human Saliva', ph: 6.8, color: 'Light Green' },
        naoh: { name: 'NaOH Solution', ph: 13.0, color: 'Dark Purple' }
      };
      const info = samples[selectedSample];
      readingData = {
        sampleTested: info.name,
        stripColorObserved: stripDipped ? info.color : 'Yellow',
        measuredPH: stripDipped ? info.ph : '-'
      };
    } else {
      readingData = {
        timestamp: new Date().toLocaleTimeString(),
        experimentalReading: 'Sample verified successfully'
      };
    }
    onRecordReading(readingData);
  };

  // Vernier calculations
  const msr = Math.floor(caliperGap * 10) / 10;
  const vsr = Math.round((caliperGap - msr) * 100);

  // Optics calculations
  const calculatedV = (objectDistance * focalLength) / (objectDistance + focalLength);

  // Metre Bridge calculations
  // Balanced jockey length: R/X = l/(100-l) -> l = R*100 / (R+X)
  const balanceLength = (knownR * 100) / (knownR + unknownX);
  // Galvanometer deflection: deviation from balance
  const deflection = (jockeyPosition - balanceLength) * 2.5;

  // pH samples calculations
  const samplesList = [
    { id: 'lemon', name: 'Lemon Juice (Acid)', ph: 2.2, color: 'from-amber-400 to-yellow-500', stripColor: '#ef4444' },
    { id: 'tomato', name: 'Tomato Juice (Mild Acid)', ph: 4.1, color: 'from-orange-500 to-red-400', stripColor: '#f97316' },
    { id: 'water', name: 'Distilled Water (Neutral)', ph: 7.0, color: 'from-sky-300 to-emerald-300', stripColor: '#10b981' },
    { id: 'naoh', name: 'NaOH Solution (Strong Base)', ph: 13.0, color: 'from-violet-500 to-indigo-600', stripColor: '#6366f1' }
  ];
  const activePHInfo = samplesList.find(s => s.id === selectedSample)!;

  return (
    <div className="space-y-6">
      
      {/* Simulation workspace wrapper */}
      <div className="glass-panel border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Compass className="text-indigo-500 animate-pulse" size={18} />
            <h3 className="font-bold text-slate-800 dark:text-white text-sm">
              {simulationId === 'vernier-calipers-sim' && 'Vernier Calipers Calibration Stage'}
              {simulationId === 'optics-mirror-lens-sim' && 'Convex Lens Optics Bench'}
              {simulationId === 'metre-bridge-sim' && 'Metre Bridge Slide Wire Calibration'}
              {simulationId === 'ph-samples-sim' && 'pH Universal Indicator Bench'}
              {!['vernier-calipers-sim', 'optics-mirror-lens-sim', 'metre-bridge-sim', 'ph-samples-sim'].includes(simulationId) && 'Apparatus Calibration Bench'}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition text-xs flex items-center space-x-1"
            >
              <HelpCircle size={14} />
              <span>Guide</span>
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-950/80 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-300 transition text-xs flex items-center space-x-1"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Guides */}
        {showHint && (
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-600 dark:text-indigo-400 mb-4 leading-relaxed">
            {simulationId === 'vernier-calipers-sim' && (
              <span><strong>Vernier Calipers Guide:</strong> Adjust the sphere diameter slider to open/close jaws. Read MSR (Main Scale) where the Vernier scale 0 mark aligns, and VSR where divisions line up. Click "Record Reading".</span>
            )}
            {simulationId === 'optics-mirror-lens-sim' && (
              <span><strong>Optics Bench Guide:</strong> Move the Lens Position or object distance. Observe how the refractive rays bend and converge at the image focal plane. Record focal results.</span>
            )}
            {simulationId === 'metre-bridge-sim' && (
              <span><strong>Metre Bridge Guide:</strong> Connect the jockey. Slide the jockey position until the Galvanometer needle returns to exactly 0 (null deflection). Record the length $l$.</span>
            )}
            {simulationId === 'ph-samples-sim' && (
              <span><strong>pH Test Guide:</strong> Pick a sample, click "Dip Test Strip", then compare the color with the universal pH colors card to verify pH values.</span>
            )}
            {!['vernier-calipers-sim', 'optics-mirror-lens-sim', 'metre-bridge-sim', 'ph-samples-sim'].includes(simulationId) && (
              <span><strong>Simulation Guide:</strong> Alter variable parameters using sliders, observe dial indicators adjust, and record entries in the table.</span>
            )}
          </div>
        )}

        {/* Simulator display screen */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-xl p-6 min-h-[300px] flex flex-col justify-between">
          
          {/* Visual representations */}
          <div className="flex-grow flex items-center justify-center py-6">
            
            {/* A. Vernier Calipers Simulator */}
            {simulationId === 'vernier-calipers-sim' && (
              <div className="w-full max-w-md space-y-6">
                <div className="h-28 relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-start overflow-hidden px-4">
                  {/* Fixed Jaw */}
                  <div className="w-6 h-20 bg-slate-400 dark:bg-slate-600 rounded-r border-r-2 border-slate-500 absolute left-8 top-4" />
                  
                  {/* Sample object (Sphere) */}
                  <div 
                    className="rounded-full bg-amber-500 border border-amber-600 transition-all duration-200 absolute top-8"
                    style={{ 
                      width: `${caliperGap * 28}px`, 
                      height: `${caliperGap * 28}px`,
                      left: '42px'
                    }}
                  />

                  {/* Sliding Jaw */}
                  <div 
                    className="w-6 h-20 bg-slate-300 dark:bg-slate-500 rounded border-l-2 border-slate-400 absolute top-4 transition-all duration-200"
                    style={{ left: `${42 + caliperGap * 28}px` }}
                  />
                  
                  <div className="absolute top-2 left-32 text-[10px] font-mono text-slate-500">
                    Vernier Gap: <span className="text-indigo-500 font-bold">{caliperGap.toFixed(2)} cm</span>
                    <br />
                    MSR: {msr.toFixed(1)} cm | VSR: {vsr}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-350">
                    <span>Object Sphere Diameter:</span>
                    <span className="text-indigo-500 font-mono">{caliperGap.toFixed(2)} cm</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="4.0"
                    step="0.05"
                    value={caliperGap}
                    onChange={(e) => setCaliperGap(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* B. Optics Convex Lens Ray Tracer */}
            {simulationId === 'optics-mirror-lens-sim' && (
              <div className="w-full max-w-md space-y-6">
                <div className="h-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full text-slate-300 dark:text-slate-800" viewBox="0 0 300 120">
                    {/* Optical Axis */}
                    <line x1="10" y1="60" x2="290" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3" />
                    
                    {/* Convex Lens */}
                    <path d="M 150 10 Q 155 60 150 110 Q 145 60 150 10" fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="1" />
                    
                    {/* Object Arrow */}
                    <g transform={`translate(${150 + objectDistance * 2.2}, 60)`}>
                      <line x1="0" y1="0" x2="0" y2="-20" stroke="#f43f5e" strokeWidth="2.2" />
                      <polygon points="0,-20 -3,-15 3,-15" fill="#f43f5e" />
                      <text x="-12" y="12" className="text-[9px] fill-slate-400 font-sans">Obj (u)</text>
                    </g>

                    {/* Image Arrow */}
                    {calculatedV > 0 && (
                      <g transform={`translate(${150 + calculatedV * 2.2}, 60)`}>
                        <line x1="0" y1="0" x2="0" y2={`${20 * (calculatedV / objectDistance)}`} stroke="#10b981" strokeWidth="2" />
                        <polygon points={`0,${20 * (calculatedV / objectDistance)} -3,${20 * (calculatedV / objectDistance) + (calculatedV < 0 ? 5 : -5)} 3,${20 * (calculatedV / objectDistance) + (calculatedV < 0 ? 5 : -5)}`} fill="#10b981" />
                        <text x="5" y="12" className="text-[9px] fill-slate-400 font-sans">Img (v)</text>
                      </g>
                    )}

                    {/* Optical rays */}
                    <line x1={150 + objectDistance * 2.2} y1="40" x2="150" y2="40" stroke="#818cf8" strokeWidth="0.8" />
                    <line x1="150" y1="40" x2={150 + calculatedV * 2.2} y2={60 + 20 * (calculatedV / objectDistance)} stroke="#818cf8" strokeWidth="0.8" />
                    
                    <line x1={150 + objectDistance * 2.2} y1="40" x2="150" y2="60" stroke="#818cf8" strokeWidth="0.8" />
                    <line x1="150" y1="60" x2={150 + calculatedV * 2.2} y2={60 + 20 * (calculatedV / objectDistance)} stroke="#818cf8" strokeWidth="0.8" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block">Object Distance (u)</span>
                    <input
                      type="range"
                      min="-80"
                      max="-20"
                      value={objectDistance}
                      onChange={(e) => setObjectDistance(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-slate-500 font-mono block mt-1">{objectDistance} cm</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block">Lens Focal Length (f)</span>
                    <input
                      type="range"
                      min="10"
                      max="25"
                      value={focalLength}
                      onChange={(e) => setFocalLength(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-slate-500 font-mono block mt-1">{focalLength} cm</span>
                  </div>
                </div>
              </div>
            )}

            {/* C. Metre Bridge Simulator */}
            {simulationId === 'metre-bridge-sim' && (
              <div className="w-full max-w-md space-y-6">
                
                {/* Bridge Wire & Jockey */}
                <div className="h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl relative p-4 flex flex-col justify-between">
                  <div className="text-[10px] text-slate-400 font-mono">Metre Bridge Wire (100 cm)</div>
                  
                  {/* Gauge wire */}
                  <div className="w-full h-1 bg-amber-800 dark:bg-amber-600 rounded relative">
                    {/* Jockey pointer representation */}
                    <div 
                      className="absolute w-3 h-5 bg-rose-500 border border-white rounded -top-2 transition-all duration-150 flex items-center justify-center text-[7px] text-white font-bold cursor-pointer"
                      style={{ left: `${jockeyPosition}%`, transform: 'translateX(-50%)' }}
                    >
                      J
                    </div>
                  </div>

                  {/* Galvanometer reading dial */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-24 h-12 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-t-full relative overflow-hidden flex items-end justify-center">
                      {/* Compass dial lines */}
                      <div 
                        className="w-1.5 h-10 bg-rose-500 origin-bottom transition-all duration-200 absolute"
                        style={{ transform: `rotate(${deflection}deg)`, bottom: '0px' }}
                      />
                      <span className="text-[8px] font-bold text-slate-400 absolute bottom-1 font-mono">G (GALVO)</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold block mt-1">
                      {Math.abs(deflection) < 1.0 ? '✓ Balanced (Null Deflection)' : 'Galvanometer Deflection'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block">Known Resistance (R)</span>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={knownR}
                      onChange={(e) => setKnownR(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-slate-500 font-mono block mt-1">{knownR} Ω</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block">Jockey Position (l)</span>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      step="0.5"
                      value={jockeyPosition}
                      onChange={(e) => setJockeyPosition(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600 h-1 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <span className="text-slate-500 font-mono block mt-1">{jockeyPosition} cm</span>
                  </div>
                </div>

              </div>
            )}

            {/* D. pH samples indicator strip */}
            {simulationId === 'ph-samples-sim' && (
              <div className="w-full max-w-md space-y-6">
                
                <div className="flex gap-4">
                  {/* Beaker with solution */}
                  <div className="w-28 h-28 border-x-2 border-b-2 border-slate-300 dark:border-slate-700 rounded-b-xl relative p-3 flex flex-col justify-end">
                    <div className={`w-full h-16 bg-gradient-to-t ${activePHInfo.color} opacity-40 rounded-b-lg transition-all duration-300`} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-sans font-bold text-slate-850 dark:text-white uppercase text-center p-2">
                      {activePHInfo.name}
                    </span>

                    {/* Dipped Strip */}
                    <div 
                      className="w-3 h-16 border border-slate-200 dark:border-slate-800 absolute top-4 left-1/2 -translate-x-1/2 rounded transition-all duration-500 flex flex-col justify-end"
                      style={{ 
                        transform: stripDipped ? 'translate(-50%, 20px)' : 'translate(-50%, -10px)'
                      }}
                    >
                      <div 
                        className="w-full h-8 transition-colors duration-500" 
                        style={{ backgroundColor: stripDipped ? activePHInfo.stripColor : '#facc15' }}
                      />
                    </div>
                  </div>

                  {/* Standard pH Color Chart */}
                  <div className="flex-grow grid grid-cols-4 gap-1 text-[8px] font-bold text-center self-center text-slate-500">
                    <div className="p-1 rounded bg-[#ef4444] text-white">pH 2 (Acid)</div>
                    <div className="p-1 rounded bg-[#f97316] text-white">pH 4 (Acid)</div>
                    <div className="p-1 rounded bg-[#10b981] text-white">pH 7 (Neut)</div>
                    <div className="p-1 rounded bg-[#6366f1] text-white">pH 13 (Base)</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block">Select Solution Sample:</span>
                    <select
                      value={selectedSample}
                      onChange={(e) => {
                        setSelectedSample(e.target.value);
                        setStripDipped(false);
                      }}
                      className="w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1.5 outline-none focus:border-indigo-500"
                    >
                      <option value="lemon">Lemon Juice</option>
                      <option value="tomato">Tomato Juice</option>
                      <option value="water">Distilled Water</option>
                      <option value="naoh">NaOH Alkaline Solution</option>
                    </select>
                  </div>

                  <div className="self-end">
                    <button
                      onClick={() => setStripDipped(true)}
                      className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition"
                    >
                      Dip Test Strip
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* E. Default placeholder simulator */}
            {!['vernier-calipers-sim', 'optics-mirror-lens-sim', 'metre-bridge-sim', 'ph-samples-sim'].includes(simulationId) && (
              <div className="w-full max-w-sm text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-500 animate-pulse">
                  <Compass size={28} />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">CBSE Calibration Controls</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Adjust simulated calibration parameters to verify molecular, chemical, or optical physical reactions.
                </p>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl text-xs flex justify-between font-mono">
                  <span className="text-slate-400">System State:</span>
                  <span className="text-indigo-400 font-bold">READY</span>
                </div>
              </div>
            )}

          </div>

          {/* Observation Logger panel */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-900/60 p-4 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="text-xs text-slate-400 font-sans">
              Verify calculations, balance inputs, and record observation details.
            </div>
            <button
              onClick={handleAddReading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            >
              <FileSpreadsheet size={14} />
              <span>Record Observation</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
