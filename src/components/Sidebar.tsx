import React from 'react';
import { 
  Home, 
  BookOpen, 
  FlaskConical, 
  BarChart2, 
  Bookmark, 
  Award, 
  Settings, 
  Menu, 
  X,
  Zap
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  xp: number;
  streak: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  setCurrentTab, 
  xp, 
  streak 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'subjects', name: 'Subjects', icon: BookOpen },
    { id: 'experiments', name: 'Experiments', icon: FlaskConical },
    { id: 'progress', name: 'Progress & Stats', icon: BarChart2 },
    { id: 'saved', name: 'Saved Lab', icon: Bookmark },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Safety & Settings', icon: Settings },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 glass-panel border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-extrabold text-lg">L</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent tracking-tight">LabSphere</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 md:w-64 glass-panel border-r border-slate-800/80 flex flex-col justify-between py-6 px-4
        transition-transform duration-300 transform md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:sticky md:h-screen top-0
      `}>
        {/* Top Branding */}
        <div>
          <div className="hidden md:flex items-center space-x-3 px-3 py-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 glow-primary">
              <FlaskConical className="text-white" size={20} />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent tracking-tight block">LabSphere</span>
              <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">CBSE Virtual Lab</span>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Zap className="text-indigo-400" size={16} />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">XP Points</div>
                <div className="text-xs font-bold text-white">{xp} XP</div>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="text-amber-400 text-sm">🔥</span>
              <span className="text-xs font-bold text-amber-400">{streak}d Streak</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 font-semibold' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                    }
                  `}
                >
                  <Icon 
                    size={18} 
                    className={`transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'}`} 
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="px-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 font-bold text-indigo-400 shadow-sm">
              🇮🇳
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Guest Student</div>
              <div className="text-[10px] text-slate-400">Class 10 - 12 CBSE</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
};
