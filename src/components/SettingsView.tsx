import React, { useState } from 'react';
import { 
  Settings, 
  ShieldAlert, 
  BookOpen, 
  RefreshCw, 
  User, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

import type { StudentProgress, ClassLevel } from '../types';

interface SettingsViewProps {
  progress: StudentProgress;
  onUpdateProfile: (name: string, classLevel: ClassLevel) => void;
  onResetProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  progress, 
  onUpdateProfile, 
  onResetProgress 
}) => {
  const [resetConfirm, setResetConfirm] = useState(false);
  const [savedName, setSavedName] = useState(progress.username || 'Guest Student');
  const [classLevel, setClassLevel] = useState<ClassLevel>(progress.classLevel || 'Class 11');
  const [profileSaved, setProfileSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(savedName, classLevel);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const triggerReset = () => {
    onResetProgress();
    setResetConfirm(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview header */}
      <div className="glass-panel border border-slate-800 rounded-3xl p-5">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <Settings className="text-indigo-400" size={20} />
          <span>Safety & Laboratory Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review lab safety rules, manage your student profile settings, and calibrate laboratory equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Settings Form (Left) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel border border-slate-800 rounded-3xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2 border-b border-slate-850 pb-2">
              <User size={16} className="text-indigo-400" />
              <span>Student Profile Details</span>
            </h3>
            
            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold block">First Name / Nickname</label>
                  <input
                    type="text"
                    value={savedName}
                    onChange={(e) => setSavedName(e.target.value)}
                    className="w-full bg-slate-950 text-white border border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold block">Current CBSE Academic Class</label>
                  <select
                    className="w-full bg-slate-950 text-white border border-slate-850 focus:border-indigo-500 rounded-xl px-3 py-2 outline-none animate-none"
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
                >
                  {profileSaved ? <CheckCircle2 size={12} /> : null}
                  <span>{profileSaved ? 'Profile Saved' : 'Save Details'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Academic links card */}
          <div className="glass-panel border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-850 pb-2 flex items-center space-x-2">
              <BookOpen size={16} className="text-indigo-400" />
              <span>Official CBSE practical syllabus references</span>
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                LabSphere virtual simulations follow curriculum frameworks outlined by the Central Board of Secondary Education (CBSE) for Class 10, 11, and 12 practical sciences.
              </p>
              
              <div className="space-y-2 pt-2">
                {[
                  { name: "CBSE Class 10 Science Practical Handbook", url: "https://cbseacademic.nic.in" },
                  { name: "CBSE Class 11 Physics Laboratory Handbook", url: "https://cbseacademic.nic.in" },
                  { name: "CBSE Class 12 Chemistry volumetric Analysis Syllabus", url: "https://cbseacademic.nic.in" },
                  { name: "CBSE Computer Science practical list of projects", url: "https://cbseacademic.nic.in" }
                ].map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between items-center p-3 bg-slate-950/40 border border-slate-900 rounded-xl hover:border-slate-800 hover:text-indigo-400 transition"
                  >
                    <span>{link.name}</span>
                    <ExternalLink size={12} className="text-slate-500 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Safety Guidelines Column (Right) */}
        <div className="space-y-6">
          
          {/* General Lab Safety Rules */}
          <div className="glass-panel border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-850 pb-2 flex items-center space-x-2">
              <ShieldAlert size={16} className="text-rose-400" />
              <span>Universal Lab Safety code</span>
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed">
              <div className="space-y-1">
                <strong className="text-rose-400 block font-bold">1. Eye & Body Protection</strong>
                <p>Always wear safety spectacles and full-length protective coats. Tie back long hair before lighting Bunsen burners.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-rose-400 block font-bold">2. Chemical Management</strong>
                <p>Always pour acids slowly into water; never pour water directly into strong concentrated acids to avoid explosive splattering.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-rose-400 block font-bold">3. Electrical Circuity</strong>
                <p>Ensure power source is switched OFF when mounting circuits. Do not touch components with damp hands.</p>
              </div>
            </div>
          </div>

          {/* Reset profile progress */}
          <div className="glass-panel border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-850 pb-2 flex items-center space-x-2">
              <RefreshCw size={16} className="text-rose-400" />
              <span>Reset Application Data</span>
            </h3>
            
            <p className="text-xs text-slate-400 leading-normal">
              This action will reset your XP score, clear completed labs list, clear recorded tables, and reset achievements.
            </p>

            {resetConfirm ? (
              <div className="flex gap-2">
                <button
                  onClick={triggerReset}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setResetConfirm(true)}
                className="w-full py-2 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-500/25 text-rose-300 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <span>Reset Progress</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
