import React from 'react';
import type { StudentProgress } from '../types';
import { experiments } from '../data/experiments';
import { 
  Award, 
  CheckCircle2, 
  Flame, 
  Zap, 
  Clock, 
  Lock
} from 'lucide-react';

interface ProgressDashboardProps {
  progress: StudentProgress;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ progress }) => {
  
  const getSubjectCount = (sub: string) => {
    return experiments.filter(e => e.subject === sub).length;
  };

  const getSubjectCompletedCount = (sub: string) => {
    const subExps = experiments.filter(e => e.subject === sub).map(e => e.id);
    return progress.completedExperiments.filter(id => subExps.includes(id)).length;
  };

  const quizScores = Object.values(progress.quizScores);
  const averageQuizScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  return (
    <div className="space-y-8">
      
      {/* Overview stats header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Completed Labs", value: `${progress.completedExperiments.length} / ${experiments.length}`, desc: "CBSE Practicals Done", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
          { title: "Total XP", value: `${progress.xp}`, desc: "Experience Gained", icon: Zap, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
          { title: "Active Streak", value: `${progress.streak} Days`, desc: "Daily Learning Streak", icon: Flame, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
          { title: "Avg Quiz Score", value: `${averageQuizScore}%`, desc: "Assessments Average", icon: Award, color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel border border-slate-800 rounded-2xl p-4 flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.color} shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">{stat.title}</span>
                <div className="text-lg font-black text-white leading-tight mt-0.5">{stat.value}</div>
                <span className="text-[9px] text-slate-500 font-medium">{stat.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Breakdown & Subject charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Subject completion bar chart */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-5 space-y-4 lg:col-span-2">
          <span className="text-xs font-bold text-white block uppercase tracking-wider">Subject-wise Completion Details</span>
          
          <div className="space-y-4">
            {[
              { name: 'Physics', done: getSubjectCompletedCount('Physics'), total: getSubjectCount('Physics'), color: 'bg-blue-500', text: 'text-blue-400' },
              { name: 'Chemistry', done: getSubjectCompletedCount('Chemistry'), total: getSubjectCount('Chemistry'), color: 'bg-emerald-500', text: 'text-emerald-400' },
              { name: 'Biology', done: getSubjectCompletedCount('Biology'), total: getSubjectCount('Biology'), color: 'bg-violet-500', text: 'text-violet-400' },
              { name: 'Computer Science', done: getSubjectCompletedCount('Computer Science'), total: getSubjectCount('Computer Science'), color: 'bg-rose-500', text: 'text-rose-400' },
            ].map((sub) => {
              const rate = sub.total > 0 ? Math.round((sub.done / sub.total) * 100) : 0;
              return (
                <div key={sub.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-white">{sub.name} Practical Labs</span>
                    <span className="text-slate-400">{sub.done} of {sub.total} ({rate}%)</span>
                  </div>
                  <div className="w-full bg-slate-900 border border-slate-850 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${sub.color} transition-all duration-500`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Summary / Hours Spent card */}
        <div className="glass-panel border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-white block uppercase tracking-wider">Lab Time Analytics</span>
            <p className="text-[10px] text-slate-400 mt-1">
              Time logged performing interactive simulations.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 border border-slate-900 rounded-xl my-4 text-center">
            <Clock className="text-indigo-400 mx-auto mb-1.5" size={24} />
            <span className="text-3xl font-black text-white font-mono">{progress.timeSpent}</span>
            <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5">Study Minutes Logged</span>
          </div>

          <div className="text-[10px] text-slate-500 leading-normal">
            Continuous activity increases memory retention and improves practical quiz performance. Aim for 20 minutes daily.
          </div>
        </div>

      </div>

      {/* Badges / Achievements list */}
      <div className="glass-panel border border-slate-800 rounded-2xl p-5 space-y-4">
        <span className="text-xs font-bold text-white block uppercase tracking-wider">Unlocked Achievements Badges</span>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {progress.achievements.map((ach) => {
            const isUnlocked = ach.currentProgress >= ach.maxProgress;
            return (
              <div 
                key={ach.id}
                className={`p-4 border rounded-xl flex flex-col justify-between gap-3 transition ${
                  isUnlocked 
                    ? 'bg-indigo-600/5 border-indigo-500/20 text-slate-200' 
                    : 'bg-slate-950/40 border-slate-850 opacity-60 text-slate-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{ach.icon}</span>
                  {isUnlocked ? (
                    <span className="text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2 py-0.5 rounded">
                      Unlocked
                    </span>
                  ) : (
                    <Lock size={12} className="text-slate-600" />
                  )}
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-tight mt-1">{ach.description}</p>
                </div>

                {/* Progress bar inside achievements */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>Progress</span>
                    <span>{ach.currentProgress} / {ach.maxProgress}</span>
                  </div>
                  <div className="w-full bg-slate-900 border border-slate-850 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-300"
                      style={{ width: `${(ach.currentProgress / ach.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
