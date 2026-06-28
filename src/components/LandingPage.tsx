import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  ChevronRight, 
  Award, 
  FileText, 
  Sliders,
  GraduationCap
} from 'lucide-react';
import type { ClassLevel } from '../types';

interface LandingPageProps {
  onEnter: (name: string, classLevel: ClassLevel) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [name, setName] = useState<string>('');
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class 11');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name to authenticate.");
      return;
    }
    setError('');
    onEnter(name.trim(), classLevel);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between py-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background ambient glowing circles */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pulse-glow" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pulse-glow" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl pulse-glow" />

      {/* Top logo branding */}
      <header className="max-w-6xl mx-auto w-full flex items-center space-x-3 z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 glow-primary">
          <FlaskConical className="text-white" size={20} />
        </div>
        <div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent tracking-tight block">LabSphere</span>
          <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase font-mono">CBSE Virtual Science Lab</span>
        </div>
      </header>

      {/* Main hero & registration grid */}
      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8 z-10">
        
        {/* Left Column: Premium Feature Listing */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Slogan */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
              <Sparkles size={12} className="animate-spin" />
              <span>Syllabus Aligned with CBSE Board Practical Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif journal-title">
              Unleash the <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Scientist</span> Within
            </h1>
            
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
              Conduct high-fidelity laboratory practicals digitally. Calibrate microscopes, connect battery loops, perform volumetric titrations, and trace variables on a premium workspace.
            </p>
          </div>

          {/* Top Features Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "96 Syllabus Practicals", desc: "Covers all physics, chemistry, biology, and CS experiments for Classes 10, 11, and 12.", icon: GraduationCap, color: "text-blue-400 bg-blue-500/10 border-blue-500/25" },
              { title: "Interactive Simulators", desc: "Visual caliper controls, lens ray configurations, meter-bridge null balancing, and code debuggers.", icon: Sliders, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
              { title: "Academic Journal Reports", desc: "Auto-logs measurements during simulation. Enter inferences and print custom school-ready PDF reports.", icon: FileText, color: "text-violet-400 bg-violet-500/10 border-violet-500/25" },
              { title: "Concept Quizzes & Badges", desc: "Verify theories with Assertion-Reason items. Maintain streaks to unlock milestone badge accomplishments.", icon: Award, color: "text-rose-400 bg-rose-500/10 border-rose-500/25" },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex items-start space-x-3.5 hover:border-slate-700 transition">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${feature.color}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-normal">{feature.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Name Input Registration Form */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 glow-primary">
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">Join LabSphere</h3>
              <p className="text-xs text-slate-400">
                Register your name and class level to start conducting virtual labs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-slate-350 font-bold block">Enter Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-950 text-white placeholder-slate-650 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-3 outline-none transition font-semibold"
                />
              </div>

              {/* Class Selection */}
              <div className="space-y-1.5">
                <label className="text-slate-355 font-bold block">Select CBSE Class</label>
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 border border-slate-800 rounded-xl">
                  {(['Class 10', 'Class 11', 'Class 12'] as const).map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setClassLevel(cls)}
                      className={`py-2 rounded-lg font-bold text-[10px] transition ${
                        classLevel === cls
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-[10px] text-rose-400 bg-rose-500/5 border border-rose-500/10 p-2.5 rounded-lg leading-normal">
                  ⚠️ {error}
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black transition flex items-center justify-center space-x-1.5 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
              >
                <span>Enter Laboratory</span>
                <ChevronRight size={14} />
              </button>

            </form>
          </div>
        </div>

      </main>

      {/* Footer copyright */}
      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-slate-500 font-mono z-10 pt-8 border-t border-slate-900">
        &copy; {new Date().getFullYear()} LabSphere CBSE Virtual Lab. Designed for Secondary and Senior Secondary Education.
      </footer>

    </div>
  );
};
