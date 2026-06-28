export type Subject = 'Physics' | 'Chemistry' | 'Biology' | 'Computer Science';
export type ClassLevel = 'Class 10' | 'Class 11' | 'Class 12';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true-false' | 'assertion-reason';
  question: string;
  options?: string[];
  correctAnswer: string | boolean;
  explanation: string;
}

export interface Experiment {
  id: string;
  name: string;
  subject: Subject;
  class: ClassLevel;
  duration: string;
  difficulty: Difficulty;
  image: string;
  objectives: string[];
  theory: string;
  apparatus: string[];
  materialsRequired: string[];
  safetyInstructions: string[];
  procedure: string[];
  realLifeApplications: string[];
  commonMistakes: string[];
  quiz: QuizQuestion[];
  simulationId: string;
}

export interface ObservationRow {
  id: string;
  [key: string]: string | number;
}

export interface StudentProgress {
  username?: string;
  classLevel?: ClassLevel;
  completedExperiments: string[]; // Experiment IDs
  savedExperiments: string[]; // Experiment IDs
  timeSpent: number; // in minutes
  quizScores: Record<string, number>; // Experiment ID -> Score percentage
  streak: number;
  lastActive: string; // ISO date
  xp: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  maxProgress: number;
  currentProgress: number;
}
