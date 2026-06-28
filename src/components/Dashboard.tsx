import React from 'react';
import type { Experiment, StudentProgress } from '../types';
import { experiments } from '../data/experiments';
import { 
  Search, 
  BookOpen, 
  FlaskConical, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Clock
} from 'lucide-react';
import { ExperimentImage } from './ExperimentImage';

interface DashboardProps {
  progress: StudentProgress;
  setCurrentTab: (tab: string) => void;
  setSelectedSubjectFilter: (sub: string) => void;
  onSelectExperiment: (exp: Experiment) => void;
  setSearchQuery: (query: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  setCurrentTab,
  setSelectedSubjectFilter,
  onSelectExperiment,
  setSearchQuery
}) => {
  const [localSearch, setLocalSearch] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setCurrentTab('experiments');
  };

  const selectSubject = (sub: string) => {
    setSelectedSubjectFilter(sub);
    setCurrentTab('experiments');
  };

  const getSubjectCount = (sub: string) => {
    return experiments.filter(e => e.subject === sub).length;
  };

  const getSubjectCompletedCount = (sub: string) => {
    const subExps = experiments.filter(e => e.subject === sub).map(e => e.id);
    return progress.completedExperiments.filter(id => subExps.includes(id)).length;
  };

  // Find a recommended experiment (e.g. one not completed yet)
  const recommendedExperiment = experiments.find(
    e => !progress.completedExperiments.includes(e.id)
  ) || experiments[0];

  const recentCompleted = experiments.filter(e => 
    progress.completedExperiments.includes(e.id)
  ).slice(0, 2);

  const completionRate = Math.round(
    (progress.completedExperiments.length / experiments.length) * 100
  ) || 0;

  return (
    <div className="space-y-8 p-1 md:p-4">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-slate-800/80 p-6 md:p-8 glow-primary">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10 pulse-glow" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-pink-500/5 rounded-full blur-2xl -z-10 pulse-glow" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold">
              <Sparkles size={12} />
              <span>Explore the Universe in Virtual Labs</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Hello, {progress.username || 'Future Scientist'}!
            </h1>
            <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
              Step into LabSphere. Perform real-time CBSE {progress.classLevel || 'Class 10-12'} experiments, alter chemical concentrations, trace algorithms, and analyze microscopic samples.
            </p>
            
            {/* Search bar inside banner */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-md relative flex items-center">
              <input
                type="text"
                placeholder="Search experiments e.g., Ohm's Law, Titration..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-slate-900/80 text-white placeholder-slate-500 border border-slate-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all outline-none"
              />
              <Search className="absolute left-3.5 text-slate-500" size={16} />
              <button 
                type="submit"
                className="absolute right-2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition"
              >
                Find
              </button>
            </form>
          </div>

          {/* Quick Metrics Dial */}
          <div className="flex items-center space-x-4 bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 md:w-72">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500 transition-all duration-1000"
                  strokeDasharray={`${completionRate}, 100`}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{completionRate}%</span>
              </div>
            </div>
            <div>
              <h3 className="text-xs text-slate-400 font-semibold uppercase">Total Progress</h3>
              <p className="text-sm font-extrabold text-white">
                {progress.completedExperiments.length} of {experiments.length} Done
              </p>
              <button 
                onClick={() => setCurrentTab('progress')}
                className="text-indigo-400 text-xs hover:text-indigo-300 inline-flex items-center font-bold mt-1"
              >
                View breakdown <ArrowRight size={10} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Subject Cards Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <BookOpen className="text-indigo-400" size={20} />
              <span>Explore by Subject</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Physics', icon: '⚡', color: 'from-blue-600/25 to-blue-500/5 hover:border-blue-500/40 text-blue-400', count: getSubjectCount('Physics'), done: getSubjectCompletedCount('Physics') },
                { name: 'Chemistry', icon: '🧪', color: 'from-emerald-600/25 to-emerald-500/5 hover:border-emerald-500/40 text-emerald-400', count: getSubjectCount('Chemistry'), done: getSubjectCompletedCount('Chemistry') },
                { name: 'Biology', icon: '🌿', color: 'from-violet-600/25 to-violet-500/5 hover:border-violet-500/40 text-violet-400', count: getSubjectCount('Biology'), done: getSubjectCompletedCount('Biology') },
                { name: 'Computer Science', icon: '💻', color: 'from-rose-600/25 to-rose-500/5 hover:border-rose-500/40 text-rose-400', count: getSubjectCount('Computer Science'), done: getSubjectCompletedCount('Computer Science') },
              ].map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => selectSubject(sub.name)}
                  className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br ${sub.color} p-4 text-left transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="text-2xl mb-3 group-hover:scale-110 transition duration-300">{sub.icon}</div>
                  <h3 className="font-bold text-white text-sm md:text-base leading-tight mb-1">{sub.name}</h3>
                  <div className="text-[10px] text-slate-400">
                    {sub.done}/{sub.count} Experiments
                  </div>
                  {/* Subject progress indicator bar */}
                  <div className="w-full bg-slate-900/60 h-1 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full bg-current`} 
                      style={{ width: `${sub.count > 0 ? (sub.done / sub.count) * 100 : 0}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Continue Learning / Recommended Experiment */}
          {recommendedExperiment && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <FlaskConical className="text-indigo-400" size={20} />
                <span>Recommended Practical</span>
              </h2>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/60 transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start md:items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-800">
                    <ExperimentImage 
                      src={recommendedExperiment.image} 
                      subject={recommendedExperiment.subject}
                      alt={recommendedExperiment.name} 
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/25">
                        {recommendedExperiment.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">{recommendedExperiment.class}</span>
                    </div>
                    <h3 className="font-bold text-white text-base md:text-lg leading-tight">
                      {recommendedExperiment.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{recommendedExperiment.objectives[0]}</p>
                  </div>
                </div>
                <button
                  onClick={() => onSelectExperiment(recommendedExperiment)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all shrink-0 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  <span>Start Experiment</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Side Column (1/3 width on large screens) */}
        <div className="space-y-8">
          
          {/* Daily Streak & XP Cards */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-4">
            <h2 className="text-lg font-bold text-white">Daily Accomplishments</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                <Flame className="text-amber-500 mb-1" size={24} />
                <span className="text-2xl font-black text-white">{progress.streak}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Day Streak</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                <Award className="text-indigo-400 mb-1" size={24} />
                <span className="text-2xl font-black text-white">{progress.xp}</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Total XP</span>
              </div>
            </div>

            <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/80 flex items-center space-x-3 text-xs text-slate-400">
              <Clock className="text-indigo-400 shrink-0" size={16} />
              <div>
                Total time spent studying virtual labs: <strong className="text-white">{progress.timeSpent} mins</strong>
              </div>
            </div>
          </div>

          {/* Recently Performed Experiments */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="text-emerald-400" size={18} />
              <span>Recent Activity</span>
            </h2>

            {recentCompleted.length === 0 ? (
              <div className="py-8 text-center text-slate-500 border border-dashed border-slate-800/80 rounded-xl text-xs">
                No experiments performed yet. Try starting with one of the subject cards.
              </div>
            ) : (
              <div className="space-y-3">
                {recentCompleted.map((exp) => {
                  const score = progress.quizScores[exp.id];
                  return (
                    <div 
                      key={exp.id}
                      onClick={() => onSelectExperiment(exp)}
                      className="group flex items-center justify-between p-3 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/80 hover:border-slate-700/80 rounded-xl cursor-pointer transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-slate-800">
                          <ExperimentImage 
                            src={exp.image} 
                            subject={exp.subject}
                            alt={exp.name} 
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                            {exp.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-semibold">{exp.subject}</span>
                        </div>
                      </div>
                      
                      {score !== undefined && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-slate-400">Score</div>
                          <div className={`text-xs font-extrabold ${score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {score}%
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
