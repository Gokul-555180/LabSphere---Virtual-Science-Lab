import React, { useState } from 'react';
import type { QuizQuestion } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  quizQuestions: QuizQuestion[];
  onCompleteQuiz: (percentageScore: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ quizQuestions, onCompleteQuiz }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const activeQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (opt: string | boolean) => {
    if (isAnswered) return;
    setSelectedAnswer(opt);
  };

  const handleVerify = () => {
    if (selectedAnswer === null || isAnswered) return;
    
    setIsAnswered(true);
    const isCorrect = selectedAnswer === activeQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Finished
      const percentage = Math.round((score / quizQuestions.length) * 100);
      setQuizFinished(true);
      if (percentage === 100) {
        // Trigger confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      onCompleteQuiz(percentage);
    }
  };

  if (quizFinished) {
    const finalScore = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 text-center max-w-lg mx-auto space-y-6 animate-fade-in glow-primary">
        <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto text-3xl">
          🏆
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-white">Quiz Analysis Completed!</h3>
          <p className="text-xs text-slate-400">
            You have answered all CBSE curriculum concept verification questions.
          </p>
        </div>

        <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 inline-block w-full">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Performance</div>
          <div className="text-4xl font-black text-white mt-1">{finalScore}%</div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Correct Answers: {score} of {quizQuestions.length}
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed px-4">
          {finalScore === 100 
            ? "Excellent! You have demonstrated absolute conceptual mastery over the practical and theoretical nuances of this experiment."
            : finalScore >= 60 
              ? "Good effort! Go through the theory and procedure tabs once more to secure a perfect score."
              : "Review the apparatus and simulation controls, perform the lab exercises again and retake the quiz to improve your results."
          }
        </p>
      </div>
    );
  }

  const isCorrect = selectedAnswer === activeQuestion.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Quiz Progress header */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-400 font-medium">Question {currentIdx + 1} of {quizQuestions.length}</span>
        <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-indigo-400 font-bold">
          Score: {score}
        </span>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel border border-slate-800 rounded-3xl p-6 space-y-5">
        
        {/* Question tag */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded">
            {activeQuestion.type === 'assertion-reason' ? 'Assertion Reason' : activeQuestion.type === 'true-false' ? 'True / False' : 'Multiple Choice'}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-base font-extrabold text-white leading-relaxed">
          {activeQuestion.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3 pt-2">
          
          {/* Multiple choice options */}
          {activeQuestion.type === 'mcq' && activeQuestion.options?.map((opt) => {
            const isSelected = selectedAnswer === opt;
            let optClass = "border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-850 hover:text-white";
            
            if (isAnswered) {
              if (opt === activeQuestion.correctAnswer) {
                optClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold";
              } else if (isSelected) {
                optClass = "border-rose-500 bg-rose-500/10 text-rose-400 font-bold";
              } else {
                optClass = "border-slate-900 bg-slate-950/20 text-slate-500 opacity-60";
              }
            } else if (isSelected) {
              optClass = "border-indigo-500 bg-indigo-500/10 text-indigo-300 font-bold";
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs leading-snug transition-all duration-200 ${optClass}`}
              >
                {opt}
              </button>
            );
          })}

          {/* True / False Options */}
          {activeQuestion.type === 'true-false' && (
            <div className="grid grid-cols-2 gap-4">
              {[true, false].map((val) => {
                const isSelected = selectedAnswer === val;
                let optClass = "border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-850 hover:text-white";
                
                if (isAnswered) {
                  if (val === activeQuestion.correctAnswer) {
                    optClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold";
                  } else if (isSelected) {
                    optClass = "border-rose-500 bg-rose-500/10 text-rose-400 font-bold";
                  } else {
                    optClass = "border-slate-900 bg-slate-950/20 text-slate-500 opacity-60";
                  }
                } else if (isSelected) {
                  optClass = "border-indigo-500 bg-indigo-500/10 text-indigo-300 font-bold";
                }

                return (
                  <button
                    key={val ? 'true' : 'false'}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(val)}
                    className={`p-4 rounded-xl border text-xs font-bold text-center capitalize transition ${optClass}`}
                  >
                    {val ? 'True' : 'False'}
                  </button>
                );
              })}
            </div>
          )}

          {/* Assertion-Reason Options */}
          {activeQuestion.type === 'assertion-reason' && activeQuestion.options?.map((opt) => {
            const isSelected = selectedAnswer === opt;
            let optClass = "border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-850 hover:text-white";
            
            if (isAnswered) {
              if (opt === activeQuestion.correctAnswer) {
                optClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold";
              } else if (isSelected) {
                optClass = "border-rose-500 bg-rose-500/10 text-rose-400 font-bold";
              } else {
                optClass = "border-slate-900 bg-slate-950/20 text-slate-500 opacity-60";
              }
            } else if (isSelected) {
              optClass = "border-indigo-500 bg-indigo-500/10 text-indigo-300 font-bold";
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all duration-200 ${optClass}`}
              >
                {opt}
              </button>
            );
          })}

        </div>

        {/* Verification Result details */}
        {isAnswered && (
          <div className={`p-4 rounded-xl border space-y-2 animate-fade-in ${
            isCorrect 
              ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/5 border-rose-500/20 text-rose-400'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-bold">
              {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>{isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}</span>
            </div>
            
            <div className="text-[11px] text-slate-300 leading-relaxed font-sans mt-1">
              <span className="font-bold text-white block mb-0.5">Explanation:</span>
              {activeQuestion.explanation}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Navigation controls */}
      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleVerify}
            disabled={selectedAnswer === null}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition ${
              selectedAnswer !== null 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
            }`}
          >
            <span>Verify Answer</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition shadow-lg shadow-indigo-600/10"
          >
            <span>{currentIdx < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

    </div>
  );
};
