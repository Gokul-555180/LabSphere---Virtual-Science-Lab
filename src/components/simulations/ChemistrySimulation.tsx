import React, { useState, useEffect, useRef } from 'react';
import { 
  FlaskConical, 
  RotateCcw, 
  HelpCircle, 
  TrendingUp,
  FileSpreadsheet,
  Droplet
} from 'lucide-react';

interface TitrationPoint {
  volume: number;
  pH: number;
}

interface ChemistrySimulationProps {
  onRecordReading: (reading: { volume: number; pH: number; color: string }) => void;
}

export const ChemistrySimulation: React.FC<ChemistrySimulationProps> = ({ onRecordReading }) => {
  // Constants
  const HCl_VOLUME = 10.0; // mL
  const HCl_MOLARITY = 0.125; // Unknown to student, target concentration
  const NaOH_MOLARITY = 0.10; // Known concentration
  const TARGET_VOLUME = (HCl_MOLARITY * HCl_VOLUME) / NaOH_MOLARITY; // 12.5 mL

  // State Variables
  const [indicatorAdded, setIndicatorAdded] = useState<boolean>(false);
  const [naohVolume, setNaohVolume] = useState<number>(0.0);
  const [dripRate, setDripRate] = useState<'stop' | 'slow' | 'fast'>('stop');
  const [recordedPoints, setRecordedPoints] = useState<TitrationPoint[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [color, setColor] = useState<string>('text-slate-100'); // clear solution inside glass

  const timerRef = useRef<any>(null);

  // Calculate current pH based on volume of NaOH added
  // Acid titration curve approximation
  const calculatePH = (volume: number): number => {
    if (volume >= 25) return 13.0;
    
    if (volume < TARGET_VOLUME) {
      // Remaining moles of H+
      const initialMoles = (HCl_VOLUME / 1000) * HCl_MOLARITY;
      const reactedMoles = (volume / 1000) * NaOH_MOLARITY;
      const remainingMoles = initialMoles - reactedMoles;
      const totalVolumeL = (HCl_VOLUME + volume) / 1000;
      const concentrationH = remainingMoles / totalVolumeL;
      return Number(Math.max(1.0, -Math.log10(concentrationH)).toFixed(2));
    } else if (volume === TARGET_VOLUME) {
      return 7.0;
    } else {
      // Excess moles of OH-
      const excessVolume = volume - TARGET_VOLUME;
      const excessMolesOH = (excessVolume / 1000) * NaOH_MOLARITY;
      const totalVolumeL = (HCl_VOLUME + volume) / 1000;
      const concentrationOH = excessMolesOH / totalVolumeL;
      const pOH = -Math.log10(concentrationOH);
      return Number(Math.min(13.0, 14 - pOH).toFixed(2));
    }
  };

  const currentPH = calculatePH(naohVolume);

  // Determine solution color based on pH and whether indicator is added
  useEffect(() => {
    if (!indicatorAdded) {
      setColor('text-slate-100/60'); // default water-clear HCl
      return;
    }

    if (currentPH < 7.5) {
      setColor('text-slate-100/70'); // acid range colorless
    } else if (currentPH >= 7.5 && currentPH <= 9.0) {
      // Perfect endpoint: light pink!
      setColor('text-pink-300 bg-pink-300/10 shadow-[0_0_15px_rgba(244,143,177,0.4)]');
    } else {
      // Overshot: dark magenta/purple!
      setColor('text-fuchsia-600 bg-fuchsia-600/15 shadow-[0_0_20px_rgba(217,70,239,0.5)]');
    }
  }, [currentPH, indicatorAdded]);

  // Handle drip timer loops
  useEffect(() => {
    if (dripRate === 'stop') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = dripRate === 'slow' ? 300 : 80;
    const increment = dripRate === 'slow' ? 0.05 : 0.2;

    timerRef.current = setInterval(() => {
      setNaohVolume((prev) => {
        const next = Number((prev + increment).toFixed(2));
        if (next >= 25.0) {
          setDripRate('stop');
          return 25.0;
        }
        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dripRate]);

  const handleReset = () => {
    setIndicatorAdded(false);
    setNaohVolume(0.0);
    setDripRate('stop');
    setRecordedPoints([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleAddReading = () => {
    const newPoint: TitrationPoint = {
      volume: naohVolume,
      pH: currentPH
    };
    setRecordedPoints(prev => [...prev, newPoint].sort((a, b) => a.volume - b.volume));
    
    // Determine user color description
    let colorName = "Colorless";
    if (indicatorAdded) {
      if (currentPH >= 7.5 && currentPH <= 9.0) colorName = "Light Pink (Neutralized)";
      else if (currentPH > 9.0) colorName = "Dark Magenta (Basic)";
    }

    onRecordReading({
      volume: newPoint.volume,
      pH: newPoint.pH,
      color: colorName
    });
  };

  // Render Titration curve coordinates
  const graphWidth = 320;
  const graphHeight = 180;
  const maxVolumeLimit = 25.0;
  const maxPHLimit = 14.0;

  const points = recordedPoints.map((pt) => {
    const x = (pt.volume / maxVolumeLimit) * graphWidth;
    const y = graphHeight - (pt.pH / maxPHLimit) * graphHeight;
    return { x, y, orig: pt };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Simulation Workspace Panel (Left) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-panel border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <FlaskConical className="text-emerald-400 animate-pulse" size={18} />
              <h3 className="font-bold text-white text-sm font-sans">Volumetric Titration Bench</h3>
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

          {/* Hint view */}
          {showHint && (
            <div className="bg-indigo-500/10 border border-indigo-500/25 rounded-xl p-3 text-xs text-indigo-300 mb-4 leading-relaxed">
              <strong>Titration Procedure:</strong><br />
              1. Click <strong>"Add Phenolphthalein Indicator"</strong> to pipette 2-3 drops into the HCl flask.<br />
              2. Choose your NaOH flow rate (<strong>Drop-by-drop</strong> or <strong>Continuous Stream</strong>).<br />
              3. Watch the volume and pH values. The solution will change color once neutralized.<br />
              4. Click <strong>"Record Reading"</strong> periodically to plot the titration curve.<br />
              5. The endpoint is reached at the exact point where a <em>faint light pink</em> color persists!
            </div>
          )}

          {/* Simulation Viewport */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900 min-h-[350px] flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Visual Lab Apparatus */}
            <div className="flex-grow flex items-center justify-center p-4 bg-slate-900/10 border border-slate-800/40 rounded-xl relative w-full max-w-sm h-80">
              
              {/* Burette Graphic */}
              <div className="absolute right-1/3 top-6 bottom-32 w-4 bg-slate-800/60 border border-slate-700 rounded-full flex flex-col justify-between items-center z-10">
                {/* Drip Liquid */}
                <div 
                  className="w-full bg-sky-500/20 rounded-full transition-all duration-300"
                  style={{ height: `${((25 - naohVolume) / 25) * 100}%` }}
                />
                
                {/* Taps and nozzle */}
                <div className="absolute bottom-0 w-8 h-4 bg-slate-700 border border-slate-600 rounded flex items-center justify-center text-[8px] text-white">
                  TAP
                </div>
              </div>

              {/* Conical Flask Graphic */}
              <div className="absolute right-1/3 bottom-4 w-24 h-24 flex flex-col items-center justify-end z-10">
                <div className={`w-20 h-16 rounded-b-3xl border-2 border-slate-700/80 flex flex-col items-center justify-end p-2 transition-all duration-500 ${color}`}>
                  {/* Liquid inside flask */}
                  <div className="w-full h-8 bg-current opacity-30 rounded-b-2xl animate-pulse" />
                  <span className="absolute bottom-2 text-[9px] font-mono font-bold text-white uppercase">HCl + Ind</span>
                </div>
                <div className="w-6 h-6 border-x-2 border-slate-700/80" />
              </div>

              {/* Drip drop micro-animation */}
              {dripRate !== 'stop' && (
                <div className="absolute right-[37%] top-48 w-1 h-3 bg-sky-400 rounded-full animate-bounce shrink-0" />
              )}

              {/* Indicators / Readouts panel inside the Bench */}
              <div className="absolute left-4 top-4 bottom-4 flex flex-col justify-between w-44 space-y-4">
                
                {/* PH Dial */}
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <span className="text-[9px] font-bold text-emerald-400 block uppercase">pH Level</span>
                  <span className="text-xl font-black font-mono text-white mt-1">
                    {currentPH.toFixed(2)}
                  </span>
                  {/* color indicator bar */}
                  <div className="w-full h-1.5 rounded-full mt-2 bg-gradient-to-r from-red-500 via-green-500 to-purple-600 overflow-hidden relative">
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white border border-slate-800" 
                      style={{ left: `${(currentPH / 14) * 100}%` }}
                    />
                  </div>
                </div>

                {/* NaOH Vol Readout */}
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center">
                  <span className="text-[9px] font-bold text-sky-400 block uppercase">NaOH Added</span>
                  <span className="text-lg font-black font-mono text-white mt-1">
                    {naohVolume.toFixed(2)} <span className="text-xs text-slate-400">mL</span>
                  </span>
                  <span className="text-[8px] text-slate-500 block mt-0.5">Max capacity: 25mL</span>
                </div>

              </div>

            </div>

            {/* Direct controls column */}
            <div className="w-full md:w-52 space-y-4 text-xs">
              
              {/* Add Indicator */}
              <div className="space-y-1.5">
                <span className="text-slate-400 font-bold block">1. Add Chemicals</span>
                <button
                  disabled={indicatorAdded}
                  onClick={() => setIndicatorAdded(true)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition ${
                    indicatorAdded 
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  <Droplet size={14} className={indicatorAdded ? '' : 'animate-bounce'} />
                  <span>{indicatorAdded ? 'Indicator Added' : 'Add Phenolphthalein'}</span>
                </button>
              </div>

              {/* Drip Rate controls */}
              <div className="space-y-1.5">
                <span className="text-slate-400 font-bold block">2. Control Burette Flow</span>
                <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-1 border border-slate-800 rounded-xl">
                  {(['stop', 'slow', 'fast'] as const).map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setDripRate(rate)}
                      className={`py-1.5 rounded-lg font-bold text-[10px] capitalize transition ${
                        dripRate === rate 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                      }`}
                    >
                      {rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick instructions feedback */}
              <div className="p-3 bg-slate-900/40 border border-slate-800/80 rounded-xl space-y-1">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">Visual State</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {!indicatorAdded 
                    ? "Add the indicator first, otherwise neutralization will be invisible."
                    : currentPH < 7.5 
                      ? "Acidic: Solution remains colorless."
                      : currentPH >= 7.5 && currentPH <= 9.0
                        ? "Neutralized (Equivalence): Perfect permanent light pink!"
                        : "Basic (Overshot): Excessive base added, dark fuchsia."
                  }
                </p>
              </div>

            </div>

          </div>

          {/* Action trigger footer */}
          <div className="flex justify-between items-center bg-slate-900/40 p-4 border border-slate-800/80 rounded-xl mt-4">
            <div className="text-xs text-slate-400">
              Titrate slow when approaching the endpoint (around 12.5 mL).
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

      {/* Observation Table & Real-time Graph (Right) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Titration Curve Graph */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <TrendingUp size={14} className="text-emerald-400" />
              <span>Titration Curve (pH vs Vol)</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">HCl vs NaOH</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-3 flex flex-col items-center justify-center">
            {/* SVG Plot */}
            <svg 
              width={graphWidth} 
              height={graphHeight} 
              className="overflow-visible font-mono text-[9px] text-slate-500"
            >
              {/* Axes lines */}
              <line x1="0" y1={graphHeight} x2={graphWidth} y2={graphHeight} stroke="#334155" strokeWidth="1.5" />
              <line x1="0" y1="0" x2="0" y2={graphHeight} stroke="#334155" strokeWidth="1.5" />
              
              {/* equivalence line indicator */}
              <line 
                x1={(TARGET_VOLUME / maxVolumeLimit) * graphWidth} 
                y1="0" 
                x2={(TARGET_VOLUME / maxVolumeLimit) * graphWidth} 
                y2={graphHeight} 
                stroke="#d946ef" 
                strokeWidth="1.2"
                strokeDasharray="2" 
              />

              {/* Axes Labels */}
              <text x={graphWidth - 45} y={graphHeight - 5} fill="#94a3b8" fontWeight="bold">Vol NaOH (mL)</text>
              <text x="5" y="10" fill="#94a3b8" fontWeight="bold" transform={`rotate(90, 5, 10)`} className="origin-top-left translate-x-3 translate-y-3">
                pH Level
              </text>

              {/* Recorded points */}
              {points.map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="3" fill="#10b981" />
                  <text x={pt.x + 4} y={pt.y - 2} fill="#cbd5e1" fontSize="7">
                    ({pt.orig.volume}mL, pH {pt.orig.pH})
                  </text>
                </g>
              ))}

              {/* Connect points with paths */}
              {points.length > 1 && (
                <path
                  d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </div>
          <span className="text-[9px] text-slate-500 text-center mt-2">
            The vertical curve inflection occurs at the equivalence volume (12.5 mL).
          </span>
        </div>

        {/* Readings List */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="font-bold text-xs text-white">Acid-Base Titration Log</div>
          
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold text-[10px]">
                  <th className="p-2">Obs</th>
                  <th className="p-2 text-right">Vol NaOH</th>
                  <th className="p-2 text-right">pH</th>
                  <th className="p-2 text-right">Indicator Color</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {recordedPoints.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-500 font-sans italic text-[11px]">
                      No recorded data points.
                    </td>
                  </tr>
                ) : (
                  recordedPoints.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="p-2 text-slate-400">#{idx + 1}</td>
                      <td className="p-2 text-right text-sky-400 font-bold">{r.volume.toFixed(2)} mL</td>
                      <td className="p-2 text-right text-emerald-400 font-bold">{r.pH.toFixed(2)}</td>
                      <td className="p-2 text-right text-indigo-300 text-[10px]">
                        {indicatorAdded 
                          ? r.pH < 7.5 
                            ? 'Colorless' 
                            : r.pH <= 9.0 
                              ? 'Faint Pink' 
                              : 'Magenta'
                          : 'Colorless (No Ind)'
                        }
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
