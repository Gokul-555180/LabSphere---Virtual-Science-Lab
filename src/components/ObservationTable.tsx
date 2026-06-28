import React, { useState } from 'react';
import type { Experiment } from '../types';
import { 
  FileText, 
  Printer, 
  Edit3,
  CheckCircle2
} from 'lucide-react';

interface ObservationTableProps {
  experiment: Experiment;
  recordedData: any[];
  onSaveReport: (report: { calculations: string; inference: string; result: string; conclusion: string }) => void;
}

export const ObservationTable: React.FC<ObservationTableProps> = ({
  experiment,
  recordedData,
  onSaveReport
}) => {
  const [calculations, setCalculations] = useState<string>('');
  const [inference, setInference] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [conclusion, setConclusion] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('Guest Student');
  const [rollNo, setRollNo] = useState<string>('CBSE-2026-X12');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    onSaveReport({ calculations, inference, result, conclusion });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Determine observation table columns based on subject/experiment
  const getTableColumns = () => {
    if (experiment.id === 'ohms-law') {
      return ['Reading #', 'Voltage V (V)', 'Current I (A)', 'Calculated Resistance R (Ω)'];
    } else if (experiment.id === 'acid-base-titration') {
      return ['Reading #', 'Volume NaOH (mL)', 'pH Level', 'Indicator Color'];
    } else if (experiment.id === 'microscope-cells') {
      return ['Mount Slide', 'Optical Calibration', 'Magnification Lens', 'Focus Resolution'];
    } else if (experiment.id === 'bubble-sort') {
      return ['Tracer Steps', 'Memory State', 'Array Output', 'Logical Complexity'];
    }
    return ['Field', 'Value'];
  };

  const tableColumns = getTableColumns();

  return (
    <div className="space-y-6">
      
      {/* Printable Report Stylesheet for printing */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-family: 'Times New Roman', serif !important;
            font-size: 12pt !important;
            padding: 2cm !important;
          }
          .no-print {
            display: none !important;
          }
          .print-header {
            display: block !important;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .print-title {
            text-align: center;
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 20px;
            text-transform: uppercase;
          }
          .print-section {
            margin-bottom: 15px;
          }
          .print-section h4 {
            font-size: 13pt;
            font-weight: bold;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          th, td {
            border: 1px solid black !important;
            padding: 8px !important;
            text-align: left;
            font-size: 11pt;
          }
          th {
            background-color: #f2f2f2 !important;
            color: black !important;
          }
          .signature-box {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }
          .signature-line {
            width: 150px;
            border-top: 1px solid #000;
            text-align: center;
            font-size: 10pt;
            margin-top: 40px;
          }
        }
      `}</style>

      {/* Main Form controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 no-print">
        
        {/* Left Form Entry */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-panel border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Edit3 size={16} className="text-indigo-400" />
                <span>Write Journal Observations</span>
              </span>
            </div>

            {/* Calculations Editor */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold block">1. Calculations and Formulae Used</label>
              <textarea
                value={calculations}
                onChange={(e) => setCalculations(e.target.value)}
                rows={3}
                placeholder="Enter formula e.g. R = V / I. Write steps here..."
                className="w-full bg-slate-950 text-white border border-slate-850 rounded-xl p-3 focus:border-indigo-500 outline-none font-mono"
              />
            </div>

            {/* Inferences Editor */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold block">2. Observations Inference / Analysis</label>
              <textarea
                value={inference}
                onChange={(e) => setInference(e.target.value)}
                rows={3}
                placeholder="What does the recorded data show? What happens when variables are adjusted?"
                className="w-full bg-slate-950 text-white border border-slate-850 rounded-xl p-3 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Final Result */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold block">3. Final Measured Result</label>
              <input
                type="text"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="e.g., The resistance of the given wire is measured to be 15.2 Ohms."
                className="w-full bg-slate-950 text-white border border-slate-850 rounded-xl px-3 py-2.5 focus:border-indigo-500 outline-none font-semibold text-xs"
              />
            </div>

            {/* Conclusions */}
            <div className="space-y-1.5 text-xs">
              <label className="text-slate-400 font-bold block">4. Conclusion & Precautions</label>
              <textarea
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                rows={2}
                placeholder="Conclude the experiment. List 1-2 precautions taken."
                className="w-full bg-slate-950 text-white border border-slate-850 rounded-xl p-3 focus:border-indigo-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                {isSaved ? <CheckCircle2 size={14} className="text-emerald-400" /> : null}
                <span>{isSaved ? 'Progress Saved' : 'Save Draft'}</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition shadow-lg shadow-indigo-600/15"
              >
                <Printer size={14} />
                <span>Download / Print Journal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Info Details */}
        <div className="space-y-5">
          {/* Metadata Cards */}
          <div className="glass-panel border border-slate-800 rounded-3xl p-5 space-y-4">
            <span className="text-xs font-bold text-white block">Student Details (Class Record)</span>
            <div className="space-y-3 text-xs">
              <div className="space-y-1.5">
                <span className="text-slate-400">Student Full Name:</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-850 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1.5">
                <span className="text-slate-400">Roll/Register Number:</span>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-850 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Observations Summary count */}
          <div className="glass-panel border border-slate-800 rounded-3xl p-5 space-y-3">
            <span className="text-xs font-bold text-white block">Recorded Measurements</span>
            <div className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl text-center">
              <span className="text-3xl font-black text-indigo-400 font-mono">{recordedData.length}</span>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mt-1">Data Entries Captured</span>
            </div>
            {recordedData.length === 0 && (
              <p className="text-[10px] text-rose-400 leading-normal bg-rose-500/5 border border-rose-500/10 p-2 rounded-lg">
                ⚠️ Go to the 'Interactive Simulation' tab and record readings to include raw data in this table.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Structured CBSE Lab Report (Invisible on normal screens, visible in window.print()) */}
      {/* We also display a read-only preview of it on normal screens inside a nice panel */}
      <div className="glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 no-print">
          <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
            <FileText size={16} className="text-indigo-400" />
            <span>CBSE Lab Report Journal Preview</span>
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Official Layout</span>
        </div>

        {/* Paper Container */}
        <div className="bg-slate-900/10 rounded-2xl p-4 md:p-6 border border-slate-850 text-xs space-y-6 text-slate-200">
          
          {/* Header */}
          <div className="text-center space-y-1.5 border-b border-slate-800/80 pb-4">
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider">LABSPHERE ACADEMIC RECORD</h2>
            <p className="text-[10px] text-slate-400 font-medium">Virtual Science Laboratory CBSE Practical Syllabus Journal</p>
            <div className="flex justify-center gap-6 text-[10px] text-slate-400 font-mono pt-1">
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span>Subject: {experiment.subject}</span>
              <span>Class: {experiment.class}</span>
            </div>
          </div>

          {/* Student details header */}
          <div className="grid grid-cols-2 gap-4 text-[11px] bg-slate-950/40 p-3 rounded-lg border border-slate-850">
            <div>
              <span className="text-slate-400">Student Name: </span>
              <strong className="text-white">{studentName}</strong>
            </div>
            <div>
              <span className="text-slate-400">Roll Number: </span>
              <strong className="text-white">{rollNo}</strong>
            </div>
          </div>

          {/* Core Content */}
          <div className="space-y-4 font-serif leading-relaxed text-[13px] text-slate-300">
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Experiment Title:</h4>
              <p className="font-bold text-indigo-300">{experiment.name}</p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Aim / Objective:</h4>
              <ul className="list-disc pl-5 space-y-0.5">
                {experiment.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Apparatus required:</h4>
              <p>{experiment.apparatus.join(', ')}</p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Observations table:</h4>
              <div className="overflow-x-auto my-2 rounded-lg border border-slate-850">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-bold">
                      {tableColumns.map((col, i) => (
                        <th key={i} className="p-2.5">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recordedData.length === 0 ? (
                      <tr>
                        <td colSpan={tableColumns.length} className="p-4 text-center text-slate-500 italic">
                          No experimental data logged during simulation.
                        </td>
                      </tr>
                    ) : (
                      recordedData.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-850 bg-slate-950/20 text-slate-300">
                          <td className="p-2.5">#{idx + 1}</td>
                          {Object.values(row).map((val: any, j) => (
                            <td key={j} className="p-2.5">{typeof val === 'number' ? val : String(val)}</td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {calculations && (
              <div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Calculations & Formulas:</h4>
                <pre className="whitespace-pre-wrap font-mono text-xs bg-slate-950/60 p-3 border border-slate-850 rounded-lg text-emerald-400">
                  {calculations}
                </pre>
              </div>
            )}

            {inference && (
              <div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Observation Inference:</h4>
                <p className="bg-slate-950/20 p-3 border border-slate-850 rounded-lg">{inference}</p>
              </div>
            )}

            {result && (
              <div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Result:</h4>
                <p className="p-3 bg-indigo-950/25 border border-indigo-500/20 rounded-lg text-indigo-200 font-semibold">{result}</p>
              </div>
            )}

            {conclusion && (
              <div>
                <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-sans">Conclusion & Precautions:</h4>
                <p className="p-3 bg-slate-950/20 border border-slate-850 rounded-lg">{conclusion}</p>
              </div>
            )}
          </div>

          {/* Teacher Signature blank block */}
          <div className="flex justify-between items-end pt-8 border-t border-slate-800/60 text-[10px] text-slate-400 font-mono">
            <div>
              <div>Student Signature: __________________</div>
            </div>
            <div className="text-right">
              <div>Lab Supervisor Grade: ____________</div>
              <div className="mt-1">Signature & Date: __________________</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
