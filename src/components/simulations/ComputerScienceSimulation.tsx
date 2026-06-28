import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  RotateCcw, 
  HelpCircle,
  Cpu,
  Variable,
  Layers,
  GitFork
} from 'lucide-react';

interface SimulationState {
  step: number;
  line: number;
  arr: number[];
  i: number | string;
  j: number | string;
  compareIndex1: number | null;
  compareIndex2: number | null;
  swapped: boolean;
  message: string;
  flowNode: string;
}

interface ComputerScienceSimulationProps {
  onRecordReading: (reading: { stepsTraced: number; sortedResult: string }) => void;
}

export const ComputerScienceSimulation: React.FC<ComputerScienceSimulationProps> = ({ onRecordReading }) => {
  // Pre-compiled Trace Steps for arr = [5, 1, 4, 2]
  const traceSteps: SimulationState[] = [
    { step: 0, line: 1, arr: [5, 1, 4, 2], i: '-', j: '-', compareIndex1: null, compareIndex2: null, swapped: false, message: "Initialize array arr = [5, 1, 4, 2]. Length n = 4.", flowNode: 'init' },
    { step: 1, line: 3, arr: [5, 1, 4, 2], i: 0, j: '-', compareIndex1: null, compareIndex2: null, swapped: false, message: "Outer loop starts: i = 0. We will carry out the first pass.", flowNode: 'outer' },
    { step: 2, line: 4, arr: [5, 1, 4, 2], i: 0, j: 0, compareIndex1: null, compareIndex2: null, swapped: false, message: "Inner loop starts: j = 0. Compare arr[0] and arr[1].", flowNode: 'inner' },
    { step: 3, line: 5, arr: [5, 1, 4, 2], i: 0, j: 0, compareIndex1: 0, compareIndex2: 1, swapped: false, message: "Compare: is arr[0] (5) > arr[1] (1)? Yes, it is.", flowNode: 'compare' },
    { step: 4, line: 6, arr: [1, 5, 4, 2], i: 0, j: 0, compareIndex1: 0, compareIndex2: 1, swapped: true, message: "Condition True. Swap arr[0] and arr[1]. Array becomes [1, 5, 4, 2].", flowNode: 'swap' },
    
    { step: 5, line: 4, arr: [1, 5, 4, 2], i: 0, j: 1, compareIndex1: null, compareIndex2: null, swapped: false, message: "Inner loop increments: j = 1. Compare arr[1] and arr[2].", flowNode: 'inner' },
    { step: 6, line: 5, arr: [1, 5, 4, 2], i: 0, j: 1, compareIndex1: 1, compareIndex2: 2, swapped: false, message: "Compare: is arr[1] (5) > arr[2] (4)? Yes, it is.", flowNode: 'compare' },
    { step: 7, line: 6, arr: [1, 4, 5, 2], i: 0, j: 1, compareIndex1: 1, compareIndex2: 2, swapped: true, message: "Condition True. Swap arr[1] and arr[2]. Array becomes [1, 4, 5, 2].", flowNode: 'swap' },
    
    { step: 8, line: 4, arr: [1, 4, 5, 2], i: 0, j: 2, compareIndex1: null, compareIndex2: null, swapped: false, message: "Inner loop increments: j = 2. Compare arr[2] and arr[3].", flowNode: 'inner' },
    { step: 9, line: 5, arr: [1, 4, 5, 2], i: 0, j: 2, compareIndex1: 2, compareIndex2: 3, swapped: false, message: "Compare: is arr[2] (5) > arr[3] (2)? Yes, it is.", flowNode: 'compare' },
    { step: 10, line: 6, arr: [1, 4, 2, 5], i: 0, j: 2, compareIndex1: 2, compareIndex2: 3, swapped: true, message: "Condition True. Swap arr[2] and arr[3]. Array becomes [1, 4, 2, 5].", flowNode: 'swap' },
    
    { step: 11, line: 3, arr: [1, 4, 2, 5], i: 1, j: '-', compareIndex1: null, compareIndex2: null, swapped: false, message: "First pass complete (i = 0). The largest element (5) has bubbled to the end.", flowNode: 'outer' },
    { step: 12, line: 4, arr: [1, 4, 2, 5], i: 1, j: 0, compareIndex1: null, compareIndex2: null, swapped: false, message: "Outer loop i = 1. Inner loop resets: j = 0. Compare arr[0] and arr[1].", flowNode: 'inner' },
    { step: 13, line: 5, arr: [1, 4, 2, 5], i: 1, j: 0, compareIndex1: 0, compareIndex2: 1, swapped: false, message: "Compare: is arr[0] (1) > arr[1] (4)? No, it is not.", flowNode: 'compare' },
    { step: 14, line: 4, arr: [1, 4, 2, 5], i: 1, j: 1, compareIndex1: null, compareIndex2: null, swapped: false, message: "No swap needed. Inner loop increments: j = 1. Compare arr[1] and arr[2].", flowNode: 'inner' },
    { step: 15, line: 5, arr: [1, 4, 2, 5], i: 1, j: 1, compareIndex1: 1, compareIndex2: 2, swapped: false, message: "Compare: is arr[1] (4) > arr[2] (2)? Yes, it is.", flowNode: 'compare' },
    { step: 16, line: 6, arr: [1, 2, 4, 5], i: 1, j: 1, compareIndex1: 1, compareIndex2: 2, swapped: true, message: "Condition True. Swap arr[1] and arr[2]. Array becomes [1, 2, 4, 5].", flowNode: 'swap' },
    
    { step: 17, line: 3, arr: [1, 2, 4, 5], i: 2, j: '-', compareIndex1: null, compareIndex2: null, swapped: false, message: "Second pass complete (i = 1). Element (4) is now in its sorted position.", flowNode: 'outer' },
    { step: 18, line: 4, arr: [1, 2, 4, 5], i: 2, j: 0, compareIndex1: null, compareIndex2: null, swapped: false, message: "Outer loop i = 2. Inner loop resets: j = 0. Compare arr[0] and arr[1].", flowNode: 'inner' },
    { step: 19, line: 5, arr: [1, 2, 4, 5], i: 2, j: 0, compareIndex1: 0, compareIndex2: 1, swapped: false, message: "Compare: is arr[0] (1) > arr[1] (2)? No, it is not.", flowNode: 'compare' },
    { step: 20, line: 7, arr: [1, 2, 4, 5], i: '-', j: '-', compareIndex1: null, compareIndex2: null, swapped: false, message: "Bubble Sort Completed successfully! Array is fully sorted.", flowNode: 'end' }
  ];

  // States
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const codeTemplate = `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`;

  const currentState = traceSteps[currentStepIdx];

  // Handle auto playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= traceSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Dispatch progress on sort completion
  useEffect(() => {
    if (currentStepIdx === traceSteps.length - 1) {
      onRecordReading({
        stepsTraced: traceSteps.length,
        sortedResult: JSON.stringify(currentState.arr)
      });
    }
  }, [currentStepIdx]);

  const handleNextStep = () => {
    if (currentStepIdx < traceSteps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  const codeLines = codeTemplate.split('\n');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Simulation Workspace Panel (Left) */}
      <div className="lg:col-span-8 space-y-6">
        <div className="glass-panel border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
            <div className="flex items-center space-x-2">
              <Cpu className="text-rose-400 animate-pulse" size={18} />
              <h3 className="font-bold text-white text-sm">Interactive Python Execution Tracer</h3>
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

          {/* Guide panel */}
          {showHint && (
            <div className="bg-indigo-500/10 border border-indigo-500/25 rounded-xl p-3 text-xs text-indigo-300 mb-4 leading-relaxed">
              <strong>CS Debugger Guide:</strong><br />
              1. This panel displays the Python implementation of the <strong>Bubble Sort Algorithm</strong>.<br />
              2. Use the controls to trace the script execution <strong>step-by-step</strong> or press <strong>Auto-Play</strong>.<br />
              3. The code editor highlights the active line being executed in real-time.<br />
              4. Watch the <strong>Variable Watch List</strong> and the <strong>Array Memory Visualizer</strong> to see the numbers bubble and swap!
            </div>
          )}

          {/* Tracer Viewport (IDE Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Python Code Editor */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs flex flex-col justify-between h-72">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-slate-400 font-sans text-[10px] font-bold uppercase">
                <span>bubble_sort.py</span>
                <span className="text-emerald-500">Python 3.10</span>
              </div>
              <div className="p-3 flex-grow overflow-y-auto space-y-1">
                {codeLines.map((lineText, idx) => {
                  const lineNum = idx + 1;
                  const isHighlighted = currentState.line === lineNum;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start py-0.5 px-2 rounded ${
                        isHighlighted 
                          ? 'bg-rose-500/10 border-l-2 border-rose-500 text-white font-bold glow-violet' 
                          : 'text-slate-400'
                      }`}
                    >
                      <span className="w-6 text-slate-600 text-right select-none pr-2 font-mono">{lineNum}</span>
                      <pre className="whitespace-pre-wrap">{lineText}</pre>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Variable Watch List & Status Console */}
            <div className="flex flex-col justify-between gap-4 h-72">
              {/* Watch List */}
              <div className="glass-panel border border-slate-800 rounded-xl p-4 flex-grow flex flex-col justify-between">
                <div className="flex items-center space-x-1.5 border-b border-slate-850 pb-2 mb-2">
                  <Variable size={14} className="text-indigo-400" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">Variable Watch List</span>
                </div>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded border border-slate-900">
                    <span className="text-slate-400 font-bold">i (outer loop)</span>
                    <span className="text-indigo-400 font-extrabold">{currentState.i}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded border border-slate-900">
                    <span className="text-slate-400 font-bold">j (inner loop)</span>
                    <span className="text-indigo-400 font-extrabold">{currentState.j}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded border border-slate-900">
                    <span className="text-slate-400 font-bold">arr[j] &gt; arr[j+1]</span>
                    <span className={`font-bold ${currentState.compareIndex1 !== null ? 'text-rose-400' : 'text-slate-500'}`}>
                      {currentState.compareIndex1 !== null 
                        ? `${currentState.arr[currentState.compareIndex1]} > ${currentState.arr[currentState.compareIndex2!]} (${currentState.arr[currentState.compareIndex1]} > ${currentState.arr[currentState.compareIndex2!]} ?)`
                        : '-'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Step Explanations Console */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 h-20 overflow-y-auto flex items-start space-x-2 text-xs text-slate-300">
                <ChevronRight className="text-rose-400 shrink-0 mt-0.5" size={14} />
                <p className="leading-relaxed font-sans font-semibold">
                  {currentState.message}
                </p>
              </div>
            </div>

          </div>

          {/* Stepper controls */}
          <div className="flex justify-between items-center bg-slate-900/40 p-4 border border-slate-800/80 rounded-xl mt-4">
            <div className="flex items-center space-x-3 text-xs text-slate-400 font-sans">
              <span className="bg-slate-950 border border-slate-850 px-2 py-1 rounded font-bold font-mono">
                Step {currentState.step} / {traceSteps.length - 1}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                disabled={currentStepIdx === 0}
                onClick={handlePrevStep}
                className="p-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Back
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  isPlaying 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-current" />}
                <span>{isPlaying ? 'Pause Trace' : 'Auto-Play'}</span>
              </button>
              
              <button
                disabled={currentStepIdx === traceSteps.length - 1}
                onClick={handleNextStep}
                className="p-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Step Forward
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Memory Array Block and Flowchart (Right) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Array Memory Visualizer */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center space-x-1.5 border-b border-slate-800/80 pb-2">
            <Layers size={14} className="text-rose-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Memory Allocation Blocks</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 py-6 flex justify-around items-center">
            {currentState.arr.map((val, idx) => {
              const isComparing = idx === currentState.compareIndex1 || idx === currentState.compareIndex2;
              const isSwapped = currentState.swapped && isComparing;
              
              return (
                <div 
                  key={idx}
                  className={`relative w-12 h-12 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 font-mono ${
                    isSwapped
                      ? 'bg-emerald-500/10 border-emerald-400 scale-105 text-emerald-300 font-black'
                      : isComparing
                        ? 'bg-rose-500/15 border-rose-500 scale-105 text-rose-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-white'
                  }`}
                >
                  <span className="text-base font-bold">{val}</span>
                  <span className="absolute -bottom-5 text-[8px] text-slate-500">arr[{idx}]</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
            Highlighted blocks indicate elements currently loaded into CPU registers for logical comparison.
          </p>
        </div>

        {/* Dynamic Execution Flowchart */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center space-x-1.5 border-b border-slate-800/80 pb-2">
            <GitFork size={14} className="text-indigo-400" />
            <span className="text-xs font-bold text-white uppercase">Control Flowchart</span>
          </div>

          <div className="space-y-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
            {[
              { id: 'init', name: '1. Load Unsorted Array' },
              { id: 'outer', name: '2. Outer Pass i in range(n-1)' },
              { id: 'inner', name: '3. Inner Index j in range(n-i-1)' },
              { id: 'compare', name: '4. Logical Compare arr[j] > arr[j+1]' },
              { id: 'swap', name: '5. Swap registers' },
              { id: 'end', name: '6. Output Sorted Array' }
            ].map((node) => {
              const isActive = currentState.flowNode === node.id;
              return (
                <div 
                  key={node.id}
                  className={`p-2.5 rounded-lg border transition-all duration-200 ${
                    isActive 
                      ? 'bg-rose-500/15 border-rose-500 text-rose-300 font-bold translate-x-2' 
                      : 'bg-slate-950/60 border-slate-900 text-slate-500'
                  }`}
                >
                  {node.name}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
