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
      <header className="md:hidden flex items-center justify-between px-5 py-4 glass-panel border-b sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="brand-mark w-9 h-9 rounded-xl flex items-center justify-center">
            <FlaskConical className="text-white" size={17} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-950">Lab<span className="text-violet-600">Sphere</span></span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-500 hover:text-violet-700 rounded-lg hover:bg-violet-50 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 md:w-64 glass-panel border-r flex flex-col justify-between py-6 px-4
        transition-transform duration-300 transform md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:sticky md:h-screen top-0
      `}>
        {/* Top Branding */}
        <div>
          <div className="hidden md:flex items-center space-x-3 px-3 py-2 mb-8">
            <div className="brand-mark w-10 h-10 rounded-xl flex items-center justify-center glow-primary">
              <FlaskConical className="text-white" size={20} />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight block text-slate-950">Lab<span className="text-violet-600">Sphere</span></span>
              <span className="text-[10px] text-violet-600 font-bold tracking-wider uppercase">CBSE Virtual Lab</span>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="sidebar-stat rounded-2xl p-3 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
                <Zap className="text-violet-600" size={16} />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">XP Points</div>
                <div className="text-xs font-extrabold text-slate-900">{xp} XP</div>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full">
              <span className="text-amber-400 text-sm">🔥</span>
              <span className="text-xs font-bold text-amber-700">{streak}d Streak</span>
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
                      ? 'sidebar-nav-active font-semibold' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-violet-50 border border-transparent'
                    }
                  `}
                >
                  <Icon 
                    size={18} 
                    className={`transition-colors duration-200 ${isActive ? 'text-violet-600' : 'text-slate-400 group-hover:text-violet-600'}`} 
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="px-3 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center border border-violet-200 font-bold text-violet-700 shadow-sm">
              🇮🇳
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Guest Student</div>
              <div className="text-[10px] text-slate-500">Class 10 - 12 CBSE</div>
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
