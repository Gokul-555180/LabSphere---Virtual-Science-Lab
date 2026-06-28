import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ExperimentBrowser } from './components/ExperimentBrowser';
import { ExperimentView } from './components/ExperimentView';
import { SavedExperiments } from './components/SavedExperiments';
import { AchievementsView } from './components/AchievementsView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { SettingsView } from './components/SettingsView';
import type { Experiment, StudentProgress } from './types';
import { getInitialProgress, saveProgress, updateProgressOnCompletion } from './utils/progress';
import { experiments } from './data/experiments';
import { LandingPage } from './components/LandingPage';

function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  
  // Filtering States
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Progress States
  const [progress, setProgress] = useState<StudentProgress>(getInitialProgress());

  // Entry Check
  const [isEntered, setIsEntered] = useState<boolean>(() => {
    const stored = localStorage.getItem('labsphere_progress');
    if (stored) {
      try {
        const p = JSON.parse(stored);
        return !!p.username && p.username !== 'Guest Student';
      } catch (e) {}
    }
    return false;
  });

  const handleUpdateProfile = (name: string, classLevel: any) => {
    setProgress((prev) => {
      const updated = { ...prev, username: name, classLevel: classLevel };
      saveProgress(updated);
      return updated;
    });
  };

  // Bookmark Toggle
  const handleToggleSave = (id: string) => {
    setProgress((prev) => {
      const isSaved = prev.savedExperiments.includes(id);
      const updatedSaved = isSaved
        ? prev.savedExperiments.filter((x) => x !== id)
        : [...prev.savedExperiments, id];

      const newProgress = { ...prev, savedExperiments: updatedSaved };
      saveProgress(newProgress);
      return newProgress;
    });
  };

  // Completion triggers
  const handleCompleteExperiment = (score: number, timeSpentMin: number) => {
    if (!selectedExperiment) return;

    setProgress((prev) => {
      // Find all unique subjects completed
      const subjectsCompleted = new Set(prev.completedExperiments.map(id => {
        const exp = experiments.find(e => e.id === id);
        return exp ? exp.subject : '';
      }).filter(Boolean));
      
      // Include current selection
      subjectsCompleted.add(selectedExperiment.subject);

      return updateProgressOnCompletion(
        prev,
        selectedExperiment.id,
        score,
        timeSpentMin,
        Array.from(subjectsCompleted)
      );
    });
  };

  const handleResetProgress = () => {
    localStorage.removeItem('labsphere_progress');
    setProgress(getInitialProgress());
    setIsEntered(false);
    setCurrentTab('home');
  };

  // Switch tabs cleanly, resetting active experiment
  const handleSetTab = (tabId: string) => {
    setCurrentTab(tabId);
    setSelectedExperiment(null);
  };

  const handleSelectExperiment = (exp: Experiment) => {
    setSelectedExperiment(exp);
  };

  if (!isEntered) {
    return (
      <LandingPage
        onEnter={(name, classLevel) => {
          setProgress((prev) => {
            const updated = { ...prev, username: name, classLevel: classLevel };
            saveProgress(updated);
            return updated;
          });
          setIsEntered(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b0f19] text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={handleSetTab} 
        xp={progress.xp}
        streak={progress.streak}
      />

      {/* Main Workspace Frame */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
        
        {/* Render Experiment Sub-page View if active */}
        {selectedExperiment ? (
          <ExperimentView
            experiment={selectedExperiment}
            onBack={() => setSelectedExperiment(null)}
            onCompleteExperiment={handleCompleteQuiz => handleCompleteExperiment(handleCompleteQuiz, 10)}
          />
        ) : (
          // Standard Tab Dashboards
          <>
            {currentTab === 'home' && (
              <Dashboard
                progress={progress}
                setCurrentTab={handleSetTab}
                setSelectedSubjectFilter={setSelectedSubjectFilter}
                onSelectExperiment={handleSelectExperiment}
                setSearchQuery={setSearchQuery}
              />
            )}

            {currentTab === 'subjects' && (
              <Dashboard
                progress={progress}
                setCurrentTab={handleSetTab}
                setSelectedSubjectFilter={setSelectedSubjectFilter}
                onSelectExperiment={handleSelectExperiment}
                setSearchQuery={setSearchQuery}
              />
            )}

            {currentTab === 'experiments' && (
              <ExperimentBrowser
                onSelectExperiment={handleSelectExperiment}
                savedExperiments={progress.savedExperiments}
                onToggleSave={handleToggleSave}
                selectedSubjectFilter={selectedSubjectFilter}
                setSelectedSubjectFilter={setSelectedSubjectFilter}
                selectedClassFilter={selectedClassFilter}
                setSelectedClassFilter={setSelectedClassFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}

            {currentTab === 'saved' && (
              <SavedExperiments
                savedIds={progress.savedExperiments}
                onSelectExperiment={handleSelectExperiment}
                onRemoveSave={handleToggleSave}
                setCurrentTab={handleSetTab}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressDashboard
                progress={progress}
              />
            )}

            {currentTab === 'achievements' && (
              <AchievementsView
                achievements={progress.achievements}
                xp={progress.xp}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsView 
                progress={progress}
                onUpdateProfile={handleUpdateProfile}
                onResetProgress={handleResetProgress}
              />
            )}
          </>
        )}

      </main>

    </div>
  );
}

export default App;
