import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { MARKET_ITEMS } from '../data/marketItems';
import { soundManager } from '../utils/audio';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Sparkles } from 'lucide-react';

interface NeedsWantsSorterGameProps {
  onBackToMain: () => void;
}

export const NeedsWantsSorterGame: React.FC<NeedsWantsSorterGameProps> = ({ onBackToMain }) => {
  // Take 10 interesting mixed items
  const [itemsList] = useState(() => {
    return [...MARKET_ITEMS].sort(() => 0.5 - Math.random()).slice(0, 8);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentItem = itemsList[currentIndex];
  const isFinished = currentIndex >= itemsList.length;

  const handleClassify = (guessedNeed: boolean) => {
    const isCorrect = currentItem.isNeedByDefault === guessedNeed;

    if (isCorrect) {
      soundManager.playSuccess();
      setScore((s) => s + 1);
      setFeedback({
        isCorrect: true,
        text: guessedNeed
          ? `Doğru! ${currentItem.name} bir İhtiyaçtır. ${currentItem.description}`
          : `Doğru! ${currentItem.name} bir İstektir. Eğlenceli ama yaşamsal olarak zorunlu değildir.`,
      });
    } else {
      soundManager.playClick();
      setFeedback({
        isCorrect: false,
        text: currentItem.isNeedByDefault
          ? `Yanıldın! ${currentItem.name} bir İhtiyaçtır; çünkü sağlıklı büyüme ve dersler için gereklidir.`
          : `Yanıldın! ${currentItem.name} bir İstektir; harçlığımız yeterse eğlence için alabileceğimiz bir üründür.`,
      });
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setFeedback(null);
    if (currentIndex + 1 >= itemsList.length) {
      confetti({ particleCount: 80, spread: 70 });
    }
    setCurrentIndex((i) => i + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-md">
          🌟
        </div>
        <h2 className="font-display font-black text-3xl text-slate-900">
          Oyun Bitti! Harika Bir Sınıflandırma Yaptın!
        </h2>
        <p className="text-slate-600 text-sm">
          Toplam <strong>{itemsList.length}</strong> üründen <strong>{score}</strong> tanesini doğru sepete yerleştirdin!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeniden Oyna</span>
          </button>
          <button
            type="button"
            onClick={onBackToMain}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-300 text-sm transition-all cursor-pointer"
          >
            Ana Menüye Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
        <div>
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            PYP TEMEL KAVRAM ETKİNLİĞİ
          </span>
          <h2 className="font-display font-black text-2xl text-slate-900">
            İhtiyaç mı, İstek mi?
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-300">
            Soru: {currentIndex + 1} / {itemsList.length}
          </span>
          <button
            type="button"
            onClick={onBackToMain}
            className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
          >
            Çıkış
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 p-8 shadow-sm text-center space-y-6">
        <div className="relative">
          <span className="text-7xl block animate-bounce duration-1000 select-none">
            {currentItem.emoji}
          </span>
          <button
            type="button"
            onClick={() => {
              soundManager.speakText(`${currentItem.name}. Sence bu bir ihtiyaç mı, yoksa istek mi?`);
            }}
            className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 mt-2 font-medium"
          >
            <Volume2 className="w-4 h-4" />
            <span>Seslendir</span>
          </button>
        </div>

        <div>
          <h3 className="font-display font-black text-2xl text-slate-900">
            {currentItem.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Fiyat: {currentItem.price} ₺ · {currentItem.unit}
          </p>
        </div>

        {/* Choice Buttons */}
        {!feedback ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <button
              type="button"
              onClick={() => handleClassify(true)}
              className="p-5 rounded-2xl border-2 border-emerald-400 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-900 font-display font-black text-lg transition-all shadow-xs flex flex-col items-center gap-1 cursor-pointer"
            >
              <span>🥦 İHTİYAÇ</span>
              <span className="text-xs font-sans font-normal text-emerald-700">
                Sağlık ve yaşam için zorunlu
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleClassify(false)}
              className="p-5 rounded-2xl border-2 border-amber-400 bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-900 font-display font-black text-lg transition-all shadow-xs flex flex-col items-center gap-1 cursor-pointer"
            >
              <span>🍭 İSTEK</span>
              <span className="text-xs font-sans font-normal text-amber-700">
                Eğlenceli ama zorunlu değil
              </span>
            </button>
          </div>
        ) : (
          /* Feedback Box */
          <div
            className={`p-5 rounded-2xl border-2 text-center space-y-3 ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2 font-display font-black text-lg">
              {feedback.isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>Harika Bildin!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-600" />
                  <span>Önemli Bir Ayrım!</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {feedback.text}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                Sonraki Ürüne Geç
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
