import React from 'react';
import type { Experiment, Subject } from '../types';
import { experiments } from '../data/experiments';
import { 
  Bookmark, 
  Play, 
  Trash2,
  Clock,
  Sparkles
} from 'lucide-react';
import { ExperimentImage } from './ExperimentImage';

interface SavedExperimentsProps {
  savedIds: string[];
  onSelectExperiment: (exp: Experiment) => void;
  onRemoveSave: (id: string) => void;
  setCurrentTab: (tab: string) => void;
}

export const SavedExperiments: React.FC<SavedExperimentsProps> = ({
  savedIds,
  onSelectExperiment,
  onRemoveSave,
  setCurrentTab
}) => {
  const bookmarked = experiments.filter((e) => savedIds.includes(e.id));

  const getSubjectColor = (sub: Subject) => {
    switch (sub) {
      case 'Physics': return 'bg-blue-500/10 text-blue-400 border-blue-500/25';
      case 'Chemistry': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
      case 'Biology': return 'bg-violet-500/10 text-violet-400 border-violet-500/25';
      case 'Computer Science': return 'bg-rose-500/10 text-rose-400 border-rose-500/25';
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel border border-slate-800 rounded-3xl p-5">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Bookmark className="text-indigo-400" size={20} />
          <span>My Saved Laboratories</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Quickly launch your bookmarked CBSE experiments. Bookmark them inside the Experiment Browser.
        </p>
      </div>

      {bookmarked.length === 0 ? (
        <div className="glass-panel rounded-2xl border border-slate-800/80 py-16 text-center max-w-lg mx-auto">
          <Bookmark className="mx-auto text-slate-700 mb-4" size={44} />
          <h3 className="text-base font-bold text-white mb-1">Your saved folder is empty</h3>
          <p className="text-slate-400 text-xs max-w-xs mx-auto mb-6">
            Explore the available practicals and bookmark the ones you'd like to prepare for assessments.
          </p>
          <button
            onClick={() => setCurrentTab('experiments')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 mx-auto transition"
          >
            <Sparkles size={14} />
            <span>Browse Lab Syllabus</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarked.map((exp) => (
            <div 
              key={exp.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 glass-card transition-all"
            >
              {/* Image & Badges */}
              <div className="relative h-40 overflow-hidden border-b border-slate-800/60">
                <ExperimentImage
                  src={exp.image}
                  subject={exp.subject}
                  alt={exp.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Badges */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getSubjectColor(exp.subject)}`}>
                    {exp.subject}
                  </span>
                  <span className="text-[10px] font-bold text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
                    {exp.class}
                  </span>
                </div>
              </div>

              {/* Title & info */}
              <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                <h3 className="font-extrabold text-white text-sm leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {exp.name}
                </h3>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} className="text-indigo-400" />
                    {exp.duration}
                  </span>
                  
                  <button
                    onClick={() => onRemoveSave(exp.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                    title="Remove Bookmark"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Run */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => onSelectExperiment(exp)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <span>Enter Lab</span>
                  <Play size={10} className="fill-current" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
