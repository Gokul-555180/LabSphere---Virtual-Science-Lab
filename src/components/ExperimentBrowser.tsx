import React from 'react';
import type { Experiment, Subject, Difficulty } from '../types';
import { experiments } from '../data/experiments';
import { 
  Search, 
  Clock, 
  Brain, 
  Bookmark, 
  Play, 
  BookmarkCheck,
  FlaskConical
} from 'lucide-react';
import { ExperimentImage } from './ExperimentImage';

interface ExperimentBrowserProps {
  onSelectExperiment: (exp: Experiment) => void;
  savedExperiments: string[];
  onToggleSave: (id: string) => void;
  selectedSubjectFilter: string;
  setSelectedSubjectFilter: (sub: string) => void;
  selectedClassFilter: string;
  setSelectedClassFilter: (cls: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ExperimentBrowser: React.FC<ExperimentBrowserProps> = ({
  onSelectExperiment,
  savedExperiments,
  onToggleSave,
  selectedSubjectFilter,
  setSelectedSubjectFilter,
  selectedClassFilter,
  setSelectedClassFilter,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('All');

  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch = exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.objectives.some(o => o.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exp.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject = selectedSubjectFilter === 'All' || exp.subject === selectedSubjectFilter;
    const matchesClass = selectedClassFilter === 'All' || exp.class === selectedClassFilter;
    const matchesDifficulty = selectedDifficulty === 'All' || exp.difficulty === selectedDifficulty;

    return matchesSearch && matchesSubject && matchesClass && matchesDifficulty;
  });

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
      case 'Hard': return 'bg-rose-500/10 text-rose-400 border-rose-500/25';
    }
  };

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
      
      {/* Search and Filters Header */}
      <div className="glass-panel border border-slate-800/80 rounded-2xl p-5 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search experiments by name, objectives or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/60 text-white placeholder-slate-500 border border-slate-800/80 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition"
          />
          <Search className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
        </div>

        {/* Filter selectors */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          
          {/* Class Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-medium">Class:</span>
            <div className="flex bg-slate-950/60 p-0.5 rounded-lg border border-slate-800/80">
              {['All', 'Class 10', 'Class 11', 'Class 12'].map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClassFilter(cls)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition ${
                    selectedClassFilter === cls 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-medium">Subject:</span>
            <div className="flex bg-slate-950/60 p-0.5 rounded-lg border border-slate-800/80">
              {['All', 'Physics', 'Chemistry', 'Biology', 'Computer Science'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubjectFilter(sub)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition ${
                    selectedSubjectFilter === sub 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sub === 'Computer Science' ? 'Comp Sci' : sub}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-slate-400 font-medium">Difficulty:</span>
            <div className="flex bg-slate-950/60 p-0.5 rounded-lg border border-slate-800/80">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-md font-semibold transition ${
                    selectedDifficulty === diff 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Grid count display */}
      <div className="flex justify-between items-center text-xs text-slate-400 px-1">
        <div>Showing <span className="text-white font-bold">{filteredExperiments.length}</span> experiments</div>
        {searchQuery || selectedSubjectFilter !== 'All' || selectedClassFilter !== 'All' || selectedDifficulty !== 'All' ? (
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedSubjectFilter('All');
              setSelectedClassFilter('All');
              setSelectedDifficulty('All');
            }}
            className="text-indigo-400 font-bold hover:text-indigo-300 transition"
          >
            Clear Filters
          </button>
        ) : null}
      </div>

      {/* Experiments Grid */}
      {filteredExperiments.length === 0 ? (
        <div className="glass-panel rounded-2xl border border-slate-800/80 py-16 text-center">
          <FlaskConical className="mx-auto text-slate-600 mb-4 animate-pulse" size={48} />
          <h3 className="text-base font-bold text-white mb-1">No experiments matched your search</h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            Try adjusting your search queries or selecting different subject and class parameters to find the experiments.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiments.map((exp) => {
            const isSaved = savedExperiments.includes(exp.id);
            return (
              <div 
                key={exp.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/30 glass-card transition-all duration-300"
              >
                {/* Top Image & Saved Button */}
                <div className="relative h-44 overflow-hidden border-b border-slate-800/60">
                  <ExperimentImage
                    src={exp.image}
                    subject={exp.subject}
                    alt={exp.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(exp.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-xl glass-panel border border-slate-700/50 text-slate-300 hover:text-white transition duration-200"
                  >
                    {isSaved ? (
                      <BookmarkCheck size={16} className="text-indigo-400 fill-indigo-400/20" />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </button>

                  {/* Subject and Class Badges */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getSubjectColor(exp.subject)}`}>
                      {exp.subject}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
                      {exp.class}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-white text-base leading-tight group-hover:text-indigo-400 transition-colors">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {exp.objectives[0]}
                    </p>
                  </div>

                  {/* Specifications and stats */}
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-indigo-400" />
                      {exp.duration}
                    </span>
                    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded border ${getDifficultyColor(exp.difficulty)}`}>
                      <Brain size={11} />
                      {exp.difficulty}
                    </span>
                  </div>
                </div>

                {/* Launch Button footer */}
                <div className="px-5 pb-5 pt-1">
                  <button
                    onClick={() => onSelectExperiment(exp)}
                    className="w-full py-2.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/25 hover:border-indigo-600 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-indigo-500/10"
                  >
                    <span>Launch Lab</span>
                    <Play size={12} className="fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
