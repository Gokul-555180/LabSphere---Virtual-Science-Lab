import React, { useState } from 'react';
import { 
  RotateCcw, 
  Plus, 
  HelpCircle, 
  FileSpreadsheet, 
  Zap,
  TrendingUp
} from 'lucide-react';

interface Reading {
  id: string;
  voltage: number;
  current: number;
  resistance: number;
}

interface PhysicsSimulationProps {
  onRecordReading: (reading: { voltage: number; current: number; resistance: number }) => void;
}

export const PhysicsSimulation: React.FC<PhysicsSimulationProps> = ({ onRecordReading }) => {
  // Simulator States
  const [voltage, setVoltage] = useState<number>(3.0); // battery voltage
  const [resistance, setResistance] = useState<number>(15.0); // load resistance (Ohm)
  const [rheostat, setRheostat] = useState<number>(5.0); // rheostat resistance (Ohm)
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [circuitConnected, setCircuitConnected] = useState<boolean>(false);
  const [connectingStep, setConnectingStep] = useState<number>(0); // helper connection flow
  const [recordedReadings, setRecordedReadings] = useState<Reading[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Calculations
  const totalR = resistance + (switchOn ? rheostat : 0);
  const current = switchOn && circuitConnected ? Number((voltage / totalR).toFixed(3)) : 0;
  const measuredV = switchOn && circuitConnected ? Number((current * resistance).toFixed(2)) : 0;

  // connection wires
  const connectionSteps = [
    "Connect Battery (+) to Ammeter (+)",
    "Connect Ammeter (-) to Resistor",
    "Connect Resistor to Rheostat",
    "Connect Rheostat to Switch",
    "Connect Switch to Battery (-)",
    "Connect Voltmeter in parallel across Resistor"
  ];

  const handleNextConnection = () => {
    if (connectingStep < connectionSteps.length) {
      setConnectingStep(prev => prev + 1);
      if (connectingStep + 1 === connectionSteps.length) {
        setCircuitConnected(true);
      }
    }
  };

  const handleReset = () => {
    setVoltage(3.0);
    setResistance(15.0);
    setRheostat(5.0);
    setSwitchOn(false);
    setCircuitConnected(false);
    setConnectingStep(0);
    setRecordedReadings([]);
  };

  const handleAddReading = () => {
    if (!switchOn || !circuitConnected) return;
    
    const newReading: Reading = {
      id: Date.now().toString(),
      voltage: measuredV,
      current: current,
      resistance: Number((measuredV / current).toFixed(1))
    };

    setRecordedReadings(prev => [...prev, newReading]);
    onRecordReading({
      voltage: newReading.voltage,
      current: newReading.current,
      resistance: newReading.resistance
    });
  };

  // Auto-connect for quick start
  const handleAutoConnect = () => {
    setConnectingStep(connectionSteps.length);
    setCircuitConnected(true);
  };

  // Render V-I Plot
  const maxV = 10;
  const maxI = 1.0;
  const graphWidth = 320;
  const graphHeight = 180;

  const points = recordedReadings.map(r => {
    const x = (r.current / maxI) * graphWidth;
    const y = graphHeight - (r.voltage / maxV) * graphHeight;
    return { x, y, orig: r };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Simulation Workspace Panel (Left) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-panel border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="text-indigo-400" size={18} />
              <h3 className="font-bold text-white text-sm">Ohm's Law Circuit Sandbox</h3>
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
              <strong>Step-by-step Circuit Guide:</strong><br />
              1. Connect the circuit components by clicking <strong>"Connect Next Wire"</strong>.<br />
              2. Adjust the resistance and rheostat sliders.<br />
              3. Click the <strong>Switch (Key)</strong> to close the circuit and allow current to flow.<br />
              4. Move the Battery slider to change voltage and observe ammeter/voltmeter readings.<br />
              5. Click <strong>"Record Reading"</strong> to populate your observation graph.
            </div>
          )}

          {/* Simulated Lab Bench Container */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-900 min-h-[300px] flex flex-col justify-between relative">
            
            {/* Visual Circuit Schematic / Diagram */}
            <div className="flex-grow flex flex-col items-center justify-center py-4 relative">
              
              {/* Connection Status overlay */}
              {!circuitConnected && (
                <div className="absolute inset-0 bg-slate-950/80 flex flex-col items-center justify-center p-6 text-center z-10 rounded-xl">
                  <p className="text-slate-300 text-xs font-semibold mb-3">
                    Circuit is incomplete! Assemble wires to start measurements.
                  </p>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 mb-4 w-full max-w-sm text-left">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Next Step:</span>
                    <span className="text-sm font-semibold text-indigo-400">{connectionSteps[connectingStep]}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleNextConnection}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1.5"
                    >
                      <Plus size={14} />
                      <span>Connect Next Wire ({connectingStep}/{connectionSteps.length})</span>
                    </button>
                    <button
                      onClick={handleAutoConnect}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition"
                    >
                      Auto-Connect
                    </button>
                  </div>
                </div>
              )}

              {/* Graphic Circuit Representation */}
              <div className="w-full max-w-md border border-slate-800/80 bg-slate-900/20 rounded-xl p-4 flex flex-col space-y-4">
                
                {/* Instruments row */}
                <div className="flex justify-around items-center gap-4">
                  {/* Ammeter */}
                  <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900 border border-slate-800/80 w-28 text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-blue-500" />
                    <span className="text-[10px] font-bold text-blue-400 block uppercase">Ammeter (I)</span>
                    <span className="text-lg font-black text-white font-mono mt-1">
                      {current.toFixed(3)} <span className="text-xs text-slate-400">A</span>
                    </span>
                    <span className="text-[9px] text-slate-500 mt-0.5">Series Connection</span>
                  </div>

                  {/* Voltmeter */}
                  <div className="flex flex-col items-center p-3 rounded-xl bg-slate-900 border border-slate-800/80 w-28 text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-400 block uppercase">Voltmeter (V)</span>
                    <span className="text-lg font-black text-white font-mono mt-1">
                      {measuredV.toFixed(2)} <span className="text-xs text-slate-400">V</span>
                    </span>
                    <span className="text-[9px] text-slate-500 mt-0.5">Parallel across R</span>
                  </div>
                </div>

                {/* Circuit Connections schematic */}
                <div className="h-28 border border-slate-800/60 rounded-xl relative flex items-center justify-center p-2 bg-slate-950/40">
                  <div className="absolute inset-x-8 top-1/2 h-0.5 bg-slate-700 -translate-y-1/2" />
                  
                  {/* Battery representation */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 px-2 py-1 rounded flex flex-col items-center">
                    <span className="text-[9px] text-slate-400 font-bold font-mono">BATTERY</span>
                    <span className="text-[10px] text-white font-extrabold font-mono">{voltage.toFixed(1)}V</span>
                  </div>

                  {/* Switch representation */}
                  <button
                    disabled={!circuitConnected}
                    onClick={() => setSwitchOn(!switchOn)}
                    className={`absolute right-6 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg border font-bold text-[10px] transition ${
                      switchOn 
                        ? 'bg-emerald-600/25 border-emerald-500 text-emerald-400' 
                        : 'bg-slate-900/60 border-slate-700 text-slate-400'
                    }`}
                  >
                    {switchOn ? 'SWITCH: ON' : 'SWITCH: OFF'}
                  </button>

                  {/* Load Resistor */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 border border-indigo-500/40 rounded flex flex-col items-center z-10">
                    <span className="text-[9px] text-indigo-400 font-bold">RESISTOR</span>
                    <span className="text-[10px] text-white font-bold font-mono">{resistance} Ω</span>
                  </div>

                  {/* Rheostat */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-slate-900 border border-slate-700 rounded flex flex-col items-center">
                    <span className="text-[8px] text-slate-400 font-bold">RHEOSTAT (VAR R)</span>
                    <span className="text-[9px] text-slate-200 font-bold font-mono">+{rheostat} Ω</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Circuit controls panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-900 pt-4 text-xs">
              
              {/* Battery Voltage Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>Battery (V)</span>
                  <span className="text-indigo-400 font-mono">{voltage.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="12.0"
                  step="0.5"
                  value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  disabled={!circuitConnected}
                  className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Resistor Value Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>Load Resistor (R)</span>
                  <span className="text-indigo-400 font-mono">{resistance} Ω</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={resistance}
                  onChange={(e) => setResistance(parseInt(e.target.value))}
                  disabled={!circuitConnected}
                  className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Rheostat Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-300">
                  <span>Rheostat Slider</span>
                  <span className="text-indigo-400 font-mono">{rheostat} Ω</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={rheostat}
                  onChange={(e) => setRheostat(parseInt(e.target.value))}
                  disabled={!circuitConnected}
                  className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

            </div>

          </div>

          {/* Action Trigger */}
          <div className="flex justify-between items-center bg-slate-900/40 p-4 border border-slate-800/80 rounded-xl mt-4">
            <div className="text-xs text-slate-400">
              Set voltage and resistance values, then record current/voltage results in the observations table.
            </div>
            <button
              onClick={handleAddReading}
              disabled={!switchOn || !circuitConnected}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                switchOn && circuitConnected
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                  : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
              }`}
            >
              <FileSpreadsheet size={14} />
              <span>Record Reading</span>
            </button>
          </div>

        </div>
      </div>

      {/* Observation Table & Real-time Graph (Right) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Real-time V-I Graph */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <TrendingUp size={14} className="text-indigo-400" />
              <span>V-I Characteristic Graph</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">V = I * R</span>
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
              
              {/* Grid Lines */}
              <line x1={graphWidth / 2} y1="0" x2={graphWidth / 2} y2={graphHeight} stroke="#1e293b" strokeDasharray="3" />
              <line x1="0" y1={graphHeight / 2} x2={graphWidth} y2={graphHeight / 2} stroke="#1e293b" strokeDasharray="3" />

              {/* Axes Labels */}
              <text x={graphWidth - 30} y={graphHeight - 5} fill="#94a3b8" fontWeight="bold">Current I (A)</text>
              <text x="5" y="10" fill="#94a3b8" fontWeight="bold" transform={`rotate(90, 5, 10)`} className="origin-top-left translate-x-3 translate-y-3">
                Volts V (V)
              </text>

              {/* Recorded points */}
              {points.map((pt) => (
                <g key={pt.orig.id}>
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="4" 
                    fill="#6366f1" 
                    className="animate-ping opacity-60" 
                  />
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r="3.5" 
                    fill="#818cf8" 
                    stroke="#ffffff" 
                    strokeWidth="1" 
                  />
                  <text 
                    x={pt.x + 5} 
                    y={pt.y - 5} 
                    fill="#cbd5e1" 
                    fontSize="8"
                  >
                    ({pt.orig.current}A, {pt.orig.voltage}V)
                  </text>
                </g>
              ))}

              {/* Draw average regression line if points > 1 */}
              {points.length > 1 && (
                <line
                  x1="0"
                  y1={graphHeight}
                  x2={points[points.length - 1].x}
                  y2={points[points.length - 1].y}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="2"
                />
              )}
            </svg>
          </div>
          <span className="text-[10px] text-slate-500 text-center mt-2">
            The slope represents resistance R. If the line is straight, V ∝ I is verified.
          </span>
        </div>

        {/* Readings List */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="font-bold text-xs text-white">Temporary Observation Log</div>
          
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold text-[10px]">
                  <th className="p-2">Obs</th>
                  <th className="p-2 text-right">Volts (V)</th>
                  <th className="p-2 text-right">Amps (I)</th>
                  <th className="p-2 text-right">R (V/I)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {recordedReadings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-slate-500 font-sans italic text-[11px]">
                      No recorded data points.
                    </td>
                  </tr>
                ) : (
                  recordedReadings.map((r, idx) => (
                    <tr key={r.id} className="hover:bg-slate-900/40">
                      <td className="p-2 text-slate-400">#{idx + 1}</td>
                      <td className="p-2 text-right text-emerald-400 font-bold">{r.voltage.toFixed(2)} V</td>
                      <td className="p-2 text-right text-blue-400 font-bold">{r.current.toFixed(3)} A</td>
                      <td className="p-2 text-right text-indigo-400 font-bold">{r.resistance} Ω</td>
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
