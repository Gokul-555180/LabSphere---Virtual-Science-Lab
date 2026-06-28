import React, { useState } from 'react';
import type { Experiment } from '../types';
import { 
  ArrowLeft, 
  Target, 
  BookOpen, 
  Hammer, 
  HelpCircle,
  Play,
  FileSpreadsheet,
  Award,
  AlertTriangle
} from 'lucide-react';
import { PhysicsSimulation } from './simulations/PhysicsSimulation';
import { ChemistrySimulation } from './simulations/ChemistrySimulation';
import { BiologySimulation } from './simulations/BiologySimulation';
import { ComputerScienceSimulation } from './simulations/ComputerScienceSimulation';
import { GenericApparatusSimulation } from './simulations/GenericApparatusSimulation';
import { ObservationTable } from './ObservationTable';
import { QuizView } from './QuizView';

interface ExperimentViewProps {
  experiment: Experiment;
  onBack: () => void;
  onCompleteExperiment: (score: number, timeSpent: number) => void;
}

export const ExperimentView: React.FC<ExperimentViewProps> = ({
  experiment,
  onBack,
  onCompleteExperiment
}) => {
  const [activeTab, setActiveTab] = useState<'objective' | 'theory' | 'procedure' | 'simulation' | 'observation' | 'quiz'>('objective');
  const [recordedData, setRecordedData] = useState<any[]>([]);

  const tabs = [
    { id: 'objective', name: 'Objective', icon: Target },
    { id: 'theory', name: 'Theory', icon: BookOpen },
    { id: 'procedure', name: 'Procedure', icon: HelpCircle },
    { id: 'simulation', name: 'Interactive Simulation', icon: Play },
    { id: 'observation', name: 'Observation Log', icon: FileSpreadsheet },
    { id: 'quiz', name: 'Concept Quiz', icon: Award },
  ] as const;

  // Callback to capture readings from child simulators
  const handleRecordReading = (reading: any) => {
    setRecordedData(prev => [...prev, reading]);
  };

  const handleCompleteQuiz = (percentage: number) => {
    // Complete the entire experiment: assume 10 minutes spent on average
    onCompleteExperiment(percentage, 10);
  };

  const handleSaveReport = (report: any) => {
    console.log("Saving report data", report);
  };

  const renderSimulation = () => {
    switch (experiment.simulationId) {
      case 'ohms-law-sim':
        return <PhysicsSimulation onRecordReading={handleRecordReading} />;
      case 'acid-base-titration-sim':
        return <ChemistrySimulation onRecordReading={handleRecordReading} />;
      case 'microscope-cells-sim':
        return <BiologySimulation onRecordReading={handleRecordReading} />;
      case 'bubble-sort-sim':
        return <ComputerScienceSimulation onRecordReading={handleRecordReading} />;
      default:
        return <GenericApparatusSimulation simulationId={experiment.simulationId} onRecordReading={handleRecordReading} />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Navigation breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 no-print">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Experiment Browser</span>
        </button>
        <div className="flex gap-2">
          <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-md">
            {experiment.subject}
          </span>
          <span className="text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
            {experiment.class}
          </span>
        </div>
      </div>

      {/* Experiment Title Card */}
      <div className="glass-panel border border-slate-800/80 rounded-3xl p-6 no-print">
        <h1 className="text-xl md:text-2xl font-black text-white leading-tight">
          {experiment.name}
        </h1>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-2xl">
          {experiment.objectives[0]} Read through the objectives and procedural steps first, launch the simulation, record your observations, and answer the concept quiz.
        </p>
      </div>

      {/* Tabs navigation list */}
      <div className="flex overflow-x-auto bg-slate-950/60 p-1 border border-slate-900 rounded-2xl no-print">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }
              `}
            >
              <Icon size={14} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Body Panel */}
      <div className="bg-slate-900/10 border border-slate-800/60 rounded-3xl p-1 md:p-4 min-h-[400px]">
        
        {/* Objective Tab */}
        {activeTab === 'objective' && (
          <div className="space-y-6 max-w-3xl no-print">
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Target className="text-indigo-400" size={18} />
                <span>Learning Objectives</span>
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-xs text-slate-300 leading-relaxed">
                {experiment.objectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Hammer className="text-indigo-400" size={18} />
                <span>Apparatus & Materials Required</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Required Hardware / Equipment:</span>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 leading-normal">
                    {experiment.apparatus.map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chemicals / Accessories:</span>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 leading-normal">
                    {experiment.materialsRequired.map((mat, idx) => (
                      <li key={idx}>{mat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theory Tab */}
        {activeTab === 'theory' && (
          <div className="space-y-6 max-w-3xl no-print">
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <BookOpen className="text-indigo-400" size={18} />
                <span>Underlying Scientific Concepts</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed text-justify whitespace-pre-wrap">
                {experiment.theory}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Real-life Applications:</span>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                  {experiment.realLifeApplications.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Common Student Mistakes:</span>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                  {experiment.commonMistakes.map((mis, idx) => (
                    <li key={idx}>{mis}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Procedure & Safety Tab */}
        {activeTab === 'procedure' && (
          <div className="space-y-6 max-w-3xl no-print">
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <HelpCircle className="text-indigo-400" size={18} />
                <span>Laboratory Procedure Steps</span>
              </h3>
              <ol className="list-decimal pl-6 space-y-3.5 text-xs text-slate-300 leading-relaxed">
                {experiment.procedure.map((step, idx) => (
                  <li key={idx} className="pl-1">{step}</li>
                ))}
              </ol>
            </div>

            {/* Safety Alerts */}
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4 flex items-start space-x-3 text-xs mt-6">
              <AlertTriangle className="text-rose-400 shrink-0 mt-0.5" size={18} />
              <div className="space-y-1 text-slate-300">
                <span className="font-extrabold text-rose-400">Important Safety Guidelines:</span>
                <ul className="list-disc pl-4 space-y-1 leading-normal mt-1">
                  {experiment.safetyInstructions.map((safe, idx) => (
                    <li key={idx}>{safe}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Simulation Tab */}
        {activeTab === 'simulation' && (
          <div className="no-print animate-fade-in">
            {renderSimulation()}
          </div>
        )}

        {/* Observation Table Tab */}
        {activeTab === 'observation' && (
          <div className="animate-fade-in">
            <ObservationTable
              experiment={experiment}
              recordedData={recordedData}
              onSaveReport={handleSaveReport}
            />
          </div>
        )}

        {/* Concept Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="no-print animate-fade-in">
            <QuizView 
              quizQuestions={experiment.quiz} 
              onCompleteQuiz={handleCompleteQuiz} 
            />
          </div>
        )}

      </div>

    </div>
  );
};
