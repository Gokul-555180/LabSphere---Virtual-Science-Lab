import React from 'react';
import type { Achievement } from '../types';
import { Trophy, Star } from 'lucide-react';

interface AchievementsViewProps {
  achievements: Achievement[];
  xp: number;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ achievements, xp }) => {
  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="glass-panel border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Trophy className="text-indigo-400" size={20} />
            <span>Achievements & Badges</span>
          </h2>
          <p className="text-xs text-slate-400">
            Accomplish curricular tasks in LabSphere to unlock badges and gain experience points.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 text-center shrink-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Unlocked</span>
            <span className="text-xl font-black text-white">{unlockedCount} / {achievements.length}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 text-center shrink-0">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Score</span>
            <span className="text-xl font-black text-white">{xp} XP</span>
          </div>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => {
          const isUnlocked = !!ach.unlockedAt;
          return (
            <div 
              key={ach.id}
              className={`p-5 rounded-2xl border transition flex items-start gap-4 ${
                isUnlocked 
                  ? 'bg-indigo-600/5 border-indigo-500/20 text-slate-200 shadow-md shadow-indigo-500/5' 
                  : 'bg-slate-950/40 border-slate-850 opacity-60'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border text-3xl shrink-0 ${
                isUnlocked 
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-white animate-pulse' 
                  : 'bg-slate-900 border-slate-800 text-slate-600'
              }`}>
                {ach.icon}
              </div>

              <div className="space-y-2 flex-grow">
                <div>
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <span>{ach.title}</span>
                    {isUnlocked && <Star size={12} className="text-amber-400 fill-amber-400" />}
                  </h4>
                  <p className="text-xs text-slate-400 leading-tight mt-1">{ach.description}</p>
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] font-mono text-slate-500">
                    <span>Progress</span>
                    <span>{ach.currentProgress} / {ach.maxProgress}</span>
                  </div>
                  <div className="w-full bg-slate-900 border border-slate-850 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isUnlocked ? 'bg-indigo-500' : 'bg-slate-700'}`}
                      style={{ width: `${(ach.currentProgress / ach.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>

                {isUnlocked && (
                  <span className="text-[9px] text-slate-400 font-mono block pt-1">
                    Unlocked on: {new Date(ach.unlockedAt!).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
