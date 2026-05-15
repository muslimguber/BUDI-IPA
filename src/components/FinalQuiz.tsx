import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Trophy, 
  RefreshCw, 
  ArrowRight,
  Star,
  Zap,
  Target,
  Award,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { googleFormService } from '../services/googleFormService';

interface Question {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctId: string;
}

interface FinalQuizProps {
  username: string;
  userClass: string;
  onComplete: (score: number) => void;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Istilah untuk perjalanan makanan dari awal hingga ke konsumen adalah...",
    options: [
      { id: 'A', text: "Distribusi" },
      { id: 'B', text: "Rantai pangan" },
      { id: 'C', text: "Produksi" },
      { id: 'D', text: "Konsumsi" }
    ],
    correctId: 'B'
  },
  {
    id: 2,
    question: "Rantai pangan dimulai dari...",
    options: [
      { id: 'A', text: "Konsumen" },
      { id: 'B', text: "Pedagang" },
      { id: 'C', text: "Petani" },
      { id: 'D', text: "Distributor" }
    ],
    correctId: 'C'
  },
  {
    id: 3,
    question: "Rantai pangan disebut rapuh karena...",
    options: [
      { id: 'A', text: "Mudah rusak" },
      { id: 'B', text: "Bergantung pada banyak faktor dan bisa terganggu" },
      { id: 'C', text: "Makanannya sedikit" },
      { id: 'D', text: "Harganya mahal" }
    ],
    correctId: 'B'
  },
  {
    id: 4,
    question: "Contoh gangguan rantai pangan adalah...",
    options: [
      { id: 'A', text: "Panen berhasil" },
      { id: 'B', text: "Banjir menghambat distribusi" },
      { id: 'C', text: "Harga stabil" },
      { id: 'D', text: "Pasar ramai" }
    ],
    correctId: 'B'
  },
  {
    id: 5,
    question: "Dampak utama gangguan rantai pangan adalah...",
    options: [
      { id: 'A', text: "Makanan berlebih" },
      { id: 'B', text: "Makanan sulit didapat" },
      { id: 'C', text: "Harga murah" },
      { id: 'D', text: "Distribusi cepat" }
    ],
    correctId: 'B'
  },
  {
    id: 6,
    question: "Ketahanan pangan keluarga berarti...",
    options: [
      { id: 'A', text: "Menyimpan makanan" },
      { id: 'B', text: "Membeli makanan" },
      { id: 'C', text: "Mampu memenuhi kebutuhan pangan sendiri" },
      { id: 'D', text: "Menjual makanan" }
    ],
    correctId: 'C'
  },
  {
    id: 7,
    question: "Peristiwa yang menunjukkan pentingnya ketahanan pangan adalah...",
    options: [
      { id: 'A', text: "Liburan" },
      { id: 'B', text: "Pandemi COVID-19" },
      { id: 'C', text: "Panen raya" },
      { id: 'D', text: "Diskon pasar" }
    ],
    correctId: 'B'
  },
  {
    id: 8,
    question: "Keluarga yang memiliki kebun sendiri saat krisis akan...",
    options: [
      { id: 'A', text: "Panik" },
      { id: 'B', text: "Bergantung pada bantuan" },
      { id: 'C', text: "Lebih tenang" },
      { id: 'D', text: "Tidak makan" }
    ],
    correctId: 'C'
  },
  {
    id: 9,
    question: "Menanam di rumah melatih...",
    options: [
      { id: 'A', text: "Konsumsi" },
      { id: 'B', text: "Kemandirian pangan" },
      { id: 'C', text: "Perdagangan" },
      { id: 'D', text: "Transportasi" }
    ],
    correctId: 'B'
  },
  {
    id: 10,
    question: "Dalam Islam, menanam tanaman bernilai...",
    options: [
      { id: 'A', text: "Hiburan" },
      { id: 'B', text: "Sedekah" },
      { id: 'C', text: "Kewajiban mutlak" },
      { id: 'D', text: "Permainan" }
    ],
    correctId: 'B'
  },
  {
    id: 11,
    question: "Jika tanaman dimakan makhluk lain, maka...",
    options: [
      { id: 'A', text: "Rugi" },
      { id: 'B', text: "Tidak berpengaruh" },
      { id: 'C', text: "Mendapat pahala" },
      { id: 'D', text: "Dosa" }
    ],
    correctId: 'C'
  },
  {
    id: 12,
    question: "“Hidup dari alam” dalam budaya Melayu berarti...",
    options: [
      { id: 'A', text: "Tinggal di alam" },
      { id: 'B', text: "Bergantung pada alam untuk kebutuhan hidup" },
      { id: 'C', text: "Bermain di alam" },
      { id: 'D', text: "Menghindari kota" }
    ],
    correctId: 'B'
  },
  {
    id: 13,
    question: "Menanam dua tanaman dalam satu pot disebut...",
    options: [
      { id: 'A', text: "Rotasi tanaman" },
      { id: 'B', text: "Hidroponik" },
      { id: 'C', text: "Tumpang sari" },
      { id: 'D', text: "Monokultur" }
    ],
    correctId: 'C'
  },
  {
    id: 14,
    question: "Sawi dipilih karena...",
    options: [
      { id: 'A', text: "Mahal" },
      { id: 'B', text: "Cepat panen" },
      { id: 'C', text: "Sulit dirawat" },
      { id: 'D', text: "Tidak butuh air" }
    ],
    correctId: 'B'
  },
  {
    id: 15,
    question: "Cabai dipilih karena...",
    options: [
      { id: 'A', text: "Cepat panen" },
      { id: 'B', text: "Tidak perlu dirawat" },
      { id: 'C', text: "Berbuah dalam jangka panjang" },
      { id: 'D', text: "Murah" }
    ],
    correctId: 'C'
  },
  {
    id: 16,
    question: "Dalam satu pot, posisi cabai sebaiknya di...",
    options: [
      { id: 'A', text: "Pinggir" },
      { id: 'B', text: "Tengah pot" },
      { id: 'C', text: "Luar pot" },
      { id: 'D', text: "Atas tanah" }
    ],
    correctId: 'B'
  },
  {
    id: 17,
    question: "Posisi sawi dalam pot adalah...",
    options: [
      { id: 'A', text: "Tengah" },
      { id: 'B', text: "Pinggir pot" },
      { id: 'C', text: "Di luar" },
      { id: 'D', text: "Di bawah" }
    ],
    correctId: 'B'
  },
  {
    id: 18,
    question: "Tujuan utama tumpang sari sawi dan cabai adalah...",
    options: [
      { id: 'A', text: "Menghemat pot" },
      { id: 'B', text: "Hasil cepat dan jangka panjang sekaligus" },
      { id: 'C', text: "Mengurangi air" },
      { id: 'D', text: "Memperindah pot" }
    ],
    correctId: 'B'
  },
  {
    id: 19,
    question: "Jika rantai pangan terputus, solusi paling tepat adalah...",
    options: [
      { id: 'A', text: "Menunggu bantuan" },
      { id: 'B', text: "Membeli lebih banyak" },
      { id: 'C', text: "Menanam sendiri sebagian kebutuhan pangan" },
      { id: 'D', text: "Tidak makan" }
    ],
    correctId: 'C'
  },
  {
    id: 20,
    question: "Manfaat utama dari proyek menanam ini adalah...",
    options: [
      { id: 'A', text: "Nilai sekolah" },
      { id: 'B', text: "Hiburan" },
      { id: 'C', text: "Keterampilan hidup mandiri" },
      { id: 'D', text: "Popularitas" }
    ],
    correctId: 'C'
  }
];

export const FinalQuiz: React.FC<FinalQuizProps> = ({ username, userClass, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success?: boolean, message?: string} | null>(null);

  // --- Persistence ---
  useEffect(() => {
    const savedIndex = localStorage.getItem('ipa_quiz_current_index');
    const savedAnswers = localStorage.getItem('ipa_quiz_answers');
    const savedShuffled = localStorage.getItem('ipa_quiz_shuffled_questions');
    const savedShowResult = localStorage.getItem('ipa_quiz_show_result');

    if (savedIndex) setCurrentIndex(parseInt(savedIndex, 10));
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to parse saved answers", e);
      }
    }
    if (savedShowResult) setShowResult(savedShowResult === 'true');
    
    if (savedShuffled) {
      try {
        setShuffledQuestions(JSON.parse(savedShuffled));
      } catch (e) {
        const shuffled = QUESTIONS.map(q => ({
          ...q,
          options: [...q.options].sort(() => Math.random() - 0.5)
        }));
        setShuffledQuestions(shuffled);
      }
    } else {
      const shuffled = QUESTIONS.map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));
      setShuffledQuestions(shuffled);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ipa_quiz_current_index', currentIndex.toString());
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem('ipa_quiz_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (shuffledQuestions.length > 0) {
      localStorage.setItem('ipa_quiz_shuffled_questions', JSON.stringify(shuffledQuestions));
    }
  }, [shuffledQuestions]);

  useEffect(() => {
    localStorage.setItem('ipa_quiz_show_result', showResult.toString());
  }, [showResult]);

  // Shuffle options on mount or restart - ONLY if not loaded from persistence
  useEffect(() => {
    if (showResult === false && Object.keys(answers).length === 0 && shuffledQuestions.length === 0) {
      const shuffled = QUESTIONS.map(q => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5)
      }));
      setShuffledQuestions(shuffled);
    }
  }, [showResult, answers]);

  if (shuffledQuestions.length === 0) return null;

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    shuffledQuestions.forEach(q => {
      if (answers[q.id] === q.correctId) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinish = async () => {
    const score = calculateScore();
    setShowResult(true);
    
    if (score === totalQuestions) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#3B82F6']
      });
    }
  };

  const handleSendToSheet = async () => {
    if (isSubmitting || submitStatus?.success) return;
    
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    setIsSubmitting(true);

    // Kirim ke Google Form
    const result = await googleFormService.submitQuizResult(
      username,
      userClass,
      "Kuis Pentingnya Berkebun (Final)",
      percentage
    );
    
    setSubmitStatus(result);
    setIsSubmitting(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
    setDirection(0);
    
    // Re-shuffle on restart
    const shuffled = QUESTIONS.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));
    setShuffledQuestions(shuffled);
    
    // Clear persistence for new start
    localStorage.removeItem('ipa_quiz_current_index');
    localStorage.removeItem('ipa_quiz_answers');
    localStorage.removeItem('ipa_quiz_shuffled_questions');
    localStorage.removeItem('ipa_quiz_show_result');
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  const getMotivationalContent = () => {
    if (percentage === 100) return {
      title: "Sempurna!",
      message: "Luar biasa! Kamu benar-benar memahami pentingnya berkebun dan ketahanan pangan. Kamu siap menjadi pahlawan pangan!",
      color: "text-emerald-500"
    };
    if (percentage >= 80) return {
      title: "Luar Biasa Bagus!",
      message: "Hebat sekali! Pemahamanmu sudah sangat matang. Sedikit lagi menuju sempurna!",
      color: "text-blue-500"
    };
    if (percentage >= 60) return {
      title: "Bagus!",
      message: "Kerja bagus! Kamu sudah paham dasar-dasarnya, tapi masih ada beberapa hal yang perlu dipelajari lagi.",
      color: "text-amber-500"
    };
    return {
      title: "Terus Semangat!",
      message: "Jangan menyerah! Mari baca kembali materinya dan coba lagi. Kamu pasti bisa!",
      color: "text-rose-500"
    };
  };

  const motivation = getMotivationalContent();

  if (showResult) {
    return (
      <div className="w-full py-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-white/50"
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-10 text-center text-white space-y-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Trophy size={80} className="mx-auto mb-4 drop-shadow-lg" />
              <h2 className="text-4xl font-black tracking-tight">Hasil Kuis</h2>
              <p className="text-white/80 font-bold uppercase tracking-widest text-sm">{username} - {userClass}</p>
            </motion.div>
          </div>

          <div className="p-10 text-center space-y-8">
            <div className="space-y-2">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.4 }}
                className={`text-8xl font-black ${motivation.color}`}
              >
                {percentage}%
              </motion.div>
              <p className="text-slate-400 font-bold text-xl">Skor: {score} dari {totalQuestions}</p>
            </div>

            <div className="space-y-4 bg-slate-50 p-8 rounded-3xl border-2 border-slate-100">
              <h3 className={`text-2xl font-black ${motivation.color}`}>{motivation.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {motivation.message}
              </p>
              
              {/* Status Pengiriman */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                {!submitStatus && !isSubmitting ? (
                  <button
                    onClick={handleSendToSheet}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} />
                    <span>Kirim Nilai ke Sheet</span>
                  </button>
                ) : isSubmitting ? (
                  <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold animate-pulse">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Mengirim nilai ke rekap...</span>
                  </div>
                ) : submitStatus ? (
                  <div className={`flex items-center justify-center gap-2 font-bold ${submitStatus.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                    <CheckCircle2 size={18} />
                    <span>{submitStatus.message}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button 
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black transition-all active:scale-95"
              >
                <RefreshCw size={20} />
                <span>Mulai Ulang</span>
              </button>
              <button 
                onClick={() => onComplete(score)}
                className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <span>Selesai</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2 py-0.5">
      <div className="w-full max-w-2xl mx-auto space-y-2">
        {/* Header Stats */}
        <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-xl border-2 border-white/60 shadow-sm flex justify-between items-center px-4">
          <h2 className="text-sm md:text-base font-black text-slate-800 flex items-center gap-2 whitespace-nowrap">
            <Zap className="text-yellow-500 fill-yellow-500 shrink-0" size={16} />
            🌱 Kuis Pentingnya Berkebun 🌱
          </h2>
          <div className="text-right">
            <div className="text-lg font-black text-indigo-600">
              {currentIndex + 1}<span className="text-slate-300 text-sm">/{totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-50 p-0.5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-sm"
          />
        </div>

        {/* Question Card */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ x: direction * 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 50, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border-2 border-slate-100 space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-base md:text-lg font-bold text-slate-800 leading-snug">
                  {currentQuestion.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(option.id)}
                      className={`group relative w-full p-4 rounded-xl border-2 text-left transition-all overflow-hidden ${
                        isSelected 
                          ? 'border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/20' 
                          : 'border-slate-50 bg-white hover:border-blue-100'
                      }`}
                    >
                      {isSelected && (
                        <motion.div 
                          layoutId="glow"
                          className="absolute inset-0 bg-white/10 blur-md"
                        />
                      )}
                      <div className="flex items-center gap-3 relative z-10">
                        <span className={`font-semibold text-xs md:text-sm leading-tight ${
                          isSelected ? 'text-white' : 'text-slate-600'
                        }`}>
                          {option.text}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-2 pt-1">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black transition-all text-xs ${
              currentIndex === 0 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95'
            }`}
          >
            <ChevronLeft size={18} />
            <span className="hidden md:inline">Sebelumnya</span>
          </button>

          {currentIndex === totalQuestions - 1 ? (
            <button
              onClick={handleFinish}
              disabled={answeredCount < totalQuestions}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-base shadow-md transition-all ${
                answeredCount < totalQuestions
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-[1.02] active:scale-95 shadow-emerald-500/20'
              }`}
            >
              <CheckCircle2 size={18} />
              <span>Selesai</span>
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl font-black shadow-md hover:scale-[1.02] active:scale-95 transition-all text-base"
            >
              <span>Selanjutnya</span>
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Question Navigation Grid */}
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/60 shadow-sm space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigasi Soal</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-bold text-slate-500">Sudah</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[9px] font-bold text-slate-500">Belum</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
            {shuffledQuestions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = currentIndex === idx;
              
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-9 rounded-xl font-black text-xs transition-all flex items-center justify-center border-2 ${
                    isCurrent 
                      ? 'border-indigo-500 scale-110 z-10 shadow-md ring-4 ring-indigo-500/10' 
                      : 'border-transparent'
                  } ${
                    isAnswered 
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20' 
                      : 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
