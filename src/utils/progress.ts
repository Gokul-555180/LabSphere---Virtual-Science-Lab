import type { StudentProgress, Achievement } from '../types';

const PROGRESS_KEY = 'labsphere_progress';

const initialAchievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first virtual science experiment.',
    icon: '🔬',
    maxProgress: 1,
    currentProgress: 0,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on any experiment quiz.',
    icon: '🏆',
    maxProgress: 1,
    currentProgress: 0,
  },
  {
    id: 'streak-3',
    title: 'Dedicated Learner',
    description: 'Maintain a 3-day active learning streak.',
    icon: '🔥',
    maxProgress: 3,
    currentProgress: 0,
  },
  {
    id: 'polymath',
    title: 'Polymath',
    description: 'Perform at least one experiment in all 4 subjects.',
    icon: '🧠',
    maxProgress: 4,
    currentProgress: 0,
  }
];

export const getInitialProgress = (): StudentProgress => {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing progress", e);
    }
  }
  
  return {
    username: 'Guest Student',
    classLevel: 'Class 11',
    completedExperiments: [],
    savedExperiments: [],
    timeSpent: 0,
    quizScores: {},
    streak: 1,
    lastActive: new Date().toISOString(),
    xp: 0,
    achievements: initialAchievements
  };
};

export const saveProgress = (progress: StudentProgress): void => {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const updateProgressOnCompletion = (
  current: StudentProgress,
  experimentId: string,
  quizScore: number,
  timeSpentMin: number,
  subjectsCompleted: string[]
): StudentProgress => {
  const updatedCompleted = current.completedExperiments.includes(experimentId)
    ? current.completedExperiments
    : [...current.completedExperiments, experimentId];
    
  const updatedQuizScores = { ...current.quizScores };
  const existingScore = updatedQuizScores[experimentId] || 0;
  updatedQuizScores[experimentId] = Math.max(existingScore, quizScore);
  
  let xpGain = 0;
  if (!current.completedExperiments.includes(experimentId)) {
    xpGain += 100; // First-time completion
  }
  // Quiz score bonus XP
  xpGain += Math.round(quizScore * 0.5); 
  // Time spent XP
  xpGain += timeSpentMin * 2;

  // Streak update
  const today = new Date().toDateString();
  const lastActiveDate = new Date(current.lastActive).toDateString();
  let newStreak = current.streak;
  
  if (lastActiveDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastActiveDate === yesterday.toDateString()) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  // Achievements evaluation
  const updatedAchievements = current.achievements.map(ach => {
    let currentProg = ach.currentProgress;
    
    if (ach.id === 'first-step') {
      currentProg = updatedCompleted.length >= 1 ? 1 : 0;
    } else if (ach.id === 'quiz-master') {
      currentProg = Object.values(updatedQuizScores).some(s => s === 100) ? 1 : 0;
    } else if (ach.id === 'streak-3') {
      currentProg = Math.min(3, newStreak);
    } else if (ach.id === 'polymath') {
      currentProg = subjectsCompleted.length;
    }
    
    const unlockedAt = (currentProg >= ach.maxProgress && !ach.unlockedAt) 
      ? new Date().toISOString() 
      : ach.unlockedAt;
      
    return {
      ...ach,
      currentProgress: currentProg,
      unlockedAt
    };
  });

  const updatedProgress: StudentProgress = {
    ...current,
    completedExperiments: updatedCompleted,
    quizScores: updatedQuizScores,
    timeSpent: current.timeSpent + timeSpentMin,
    xp: current.xp + xpGain,
    streak: newStreak,
    lastActive: new Date().toISOString(),
    achievements: updatedAchievements
  };
  
  saveProgress(updatedProgress);
  return updatedProgress;
};
