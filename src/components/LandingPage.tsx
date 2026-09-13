import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  ChevronRight, 
  Award, 
  FileText, 
  Sliders,
  GraduationCap,
  Users,
  Microscope,
  Lightbulb,
  Atom
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
    <div className="labsphere-landing min-h-screen flex flex-col justify-between py-6 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background ambient glowing circles */}
      <div className="landing-grid" />
      <div className="landing-orb landing-orb-one" />
      <div className="landing-orb landing-orb-two" />

      {/* Top logo branding */}
      <header className="landing-nav max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
        <div className="brand-mark">
          <FlaskConical className="text-white" size={20} />
        </div>
        <div>
          <span className="text-xl font-black tracking-tight block text-slate-950">Lab<span className="text-violet-600">Sphere</span></span>
          <span className="text-[10px] text-violet-600 font-bold tracking-wider uppercase font-mono">CBSE Virtual Science Lab</span>
        </div>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-500">
          <span className="text-violet-700 border-b-2 border-violet-600 pb-2">Home</span>
          <span>Subjects</span>
          <span>Experiments</span>
          <span>Community</span>
          <a href="#join-lab" className="landing-cta">Enter Lab <ChevronRight size={14} /></a>
        </nav>
      </header>

      {/* Main hero & registration grid */}
      <main className="landing-hero max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-8 z-10">
        
        {/* Left Column: Premium Feature Listing */}
        <div className="landing-hero-copy lg:col-span-7 space-y-8">
          
          {/* Main Slogan */}
          <div className="space-y-4">
            <div className="landing-kicker">
              <Sparkles size={12} />
              <span>Learn · Build · Discover</span>
            </div>
            
            <h1 className="landing-title">
              A brighter <span>scientific</span><br />tomorrow, together.
            </h1>
            
            <p className="landing-copy">
              LabSphere is a welcoming virtual lab for curious learners—perform CBSE practicals, explore cause and effect, and build confidence before you step into the real laboratory.
            </p>
            <a href="#join-lab" className="landing-primary-button">Start exploring <ChevronRight size={17} /></a>
          </div>

          <div className="people-lab-scene" aria-label="Students collaborating around a virtual laboratory">
            <div className="scene-note note-one">Learn together ✦</div>
            <div className="scene-note note-two">Build ideas ✦</div>
            <div className="scene-orbit" />
            <div className="scene-person person-one"><span>🧑🏽‍🔬</span><b>Physics</b></div>
            <div className="scene-person person-two"><span>👩🏽‍🔬</span><b>Chemistry</b></div>
            <div className="scene-person person-three"><span>🧑🏻‍💻</span><b>Computer science</b></div>
            <div className="scene-device"><Microscope size={30} /><small>virtual bench</small></div>
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
                <div key={i} className="landing-feature">
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

          <div className="landing-value-strip">
            <div><Lightbulb /><b>Learn</b><span>Understand beyond the textbook</span></div>
            <div><Atom /><b>Experiment</b><span>Change variables safely</span></div>
            <div><Users /><b>Collaborate</b><span>Grow with your lab community</span></div>
            <div><Award /><b>Create impact</b><span>Build practical confidence</span></div>
          </div>

        </div>

        {/* Right Column: Name Input Registration Form */}
        <div id="join-lab" className="lg:col-span-5 flex justify-center">
          <div className="landing-form w-full max-w-sm p-6 md:p-8 space-y-6">
            
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.16em] text-violet-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.12)]" />
                Lab access is open
              </div>
              <h3 className="text-lg font-black text-slate-950">Open your lab notebook</h3>
              <p className="text-xs text-slate-500">
                Register your name and class level to start conducting virtual labs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-slate-600 font-bold block">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="landing-input"
                />
              </div>

              {/* Class Selection */}
              <div className="space-y-1.5">
                <label className="text-slate-600 font-bold block">Your class level</label>
                <div className="landing-class-picker">
                  {(['Class 10', 'Class 11', 'Class 12'] as const).map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setClassLevel(cls)}
                      className={`py-2 rounded-lg font-bold text-[10px] transition ${
                        classLevel === cls
                          ? 'bg-violet-600 text-white shadow-md'
                          : 'text-slate-500 hover:text-violet-700 hover:bg-violet-50'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <p className="text-[10px] text-rose-600 bg-rose-500/5 border border-rose-500/10 p-2.5 rounded-lg leading-normal">
                  ⚠️ {error}
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                className="landing-submit"
              >
                <span>Enter Laboratory</span>
                <ChevronRight size={14} />
              </button>

            </form>
          </div>
        </div>

      </main>

      {/* Footer copyright */}
      <footer className="max-w-6xl mx-auto w-full text-center text-[10px] text-slate-500 font-mono z-10 pt-8 border-t border-slate-200">
        &copy; {new Date().getFullYear()} LabSphere CBSE Virtual Lab. Designed for Secondary and Senior Secondary Education.
      </footer>

    </div>
  );
};
