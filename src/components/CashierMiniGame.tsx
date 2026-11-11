import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CASHIER_PUZZLES } from '../data/cashierPuzzles';
import { soundManager } from '../utils/audio';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles,
  Volume2,
  AlertCircle
} from 'lucide-react';

interface CashierMiniGameProps {
  onBackToMain: () => void;
}

export const CashierMiniGame: React.FC<CashierMiniGameProps> = ({ onBackToMain }) => {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  const puzzle = CASHIER_PUZZLES[currentPuzzleIndex];
  const isFinished = currentPuzzleIndex >= CASHIER_PUZZLES.length;

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(userGuess.trim(), 10);
    if (isNaN(val)) return;

    if (val === puzzle.expectedChange) {
      soundManager.playSuccess();
      setIsCorrect(true);
      setIsAnswerChecked(true);
      setScore((s) => s + 1);
      confetti({ particleCount: 60, spread: 60 });
    } else {
      soundManager.playClick();
      setIsCorrect(false);
      setIsAnswerChecked(true);
      setShowHint(true);
    }
  };

  const handleNextPuzzle = () => {
    soundManager.playClick();
    setUserGuess('');
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setShowHint(false);
    setCurrentPuzzleIndex((idx) => idx + 1);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentPuzzleIndex(0);
    setUserGuess('');
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setScore(0);
    setShowHint(false);
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-amber-500 text-white rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-md">
          🏆
        </div>
        <h2 className="font-display font-black text-3xl text-slate-900">
          Tebrikler! Kasiyerlik Eğitimini Tamamladın!
        </h2>
        <p className="text-slate-600 text-sm">
          Tüm müşterilere doğru para üstü verdin. Skorun: <strong>{score} / {CASHIER_PUZZLES.length}</strong>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={handleRestart}
            className="w-full sm:w-auto px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeniden Başla</span>
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
    <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
        <div>
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            2. SINIF MATEMATİK ATÖLYESİ
          </span>
          <h2 className="font-display font-black text-2xl text-slate-900 flex items-center gap-2">
            <span>🏪 Sen Kasiyersin: Para Üstü Bulmacası</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-300">
            Müşteri: {currentPuzzleIndex + 1} / {CASHIER_PUZZLES.length}
          </span>
          <button
            type="button"
            onClick={onBackToMain}
            className="text-xs text-slate-500 hover:text-slate-800 font-bold px-2 py-1 cursor-pointer"
          >
            Çıkış
          </button>
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Customer Header */}
        <div className="flex items-center justify-between bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{puzzle.customerAvatar}</span>
            <div>
              <h3 className="font-display font-extrabold text-lg text-slate-900">
                {puzzle.customerName}
              </h3>
              <p className="text-xs text-slate-500">
                Alışverişini yaptı ve kasana geldi.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.speakText(
                `${puzzle.customerName} kasana geldi. Toplam tutar ${puzzle.totalAmount} lira tuttu. Sana ${puzzle.paidAmount} lira verdi. Para üstü kaç lira olmalı?`
              );
            }}
            className="p-2 text-amber-700 hover:text-amber-900 rounded-lg"
            title="Soruyu seslendir"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt and Calculation split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Purchased Items */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-800 border-b border-slate-200 pb-1.5">
              Alınan Ürünler:
            </div>
            {puzzle.itemsPurchased.map((it, idx) => (
              <div key={idx} className="flex justify-between text-slate-600">
                <span>{it.name}</span>
                <span className="font-mono font-bold tabular-nums">
                  {it.price * it.quantity} ₺
                </span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
              <span>Toplam Hesap:</span>
              <span className="tabular-nums font-display">{puzzle.totalAmount} ₺</span>
            </div>
          </div>

          {/* Payment given */}
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex flex-col justify-between">
            <div className="text-xs space-y-1">
              <span className="font-bold text-amber-900 block">Müşterinin Uzattığı Para:</span>
              <div className="font-display font-black text-3xl text-amber-950 tabular-nums">
                {puzzle.paidAmount} ₺
              </div>
            </div>
            <div className="text-[11px] text-slate-600 pt-2 border-t border-amber-200/50">
              İşlem: {puzzle.paidAmount} ₺ − {puzzle.totalAmount} ₺ = ? ₺
            </div>
          </div>
        </div>

        {/* Question & Input */}
        {!isCorrect ? (
          <form onSubmit={handleCheckAnswer} className="space-y-4 pt-2">
            <div>
              <label htmlFor="customerChangeGuess" className="block text-xs font-bold text-slate-700 mb-1.5">
                Kasiyer Olarak Geri Vereceğin Para Üstü:
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="customerChangeGuess"
                  type="number"
                  min="0"
                  max="500"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder="Örn: 22"
                  className="w-full px-4 py-3 text-lg font-display font-bold border-2 border-slate-300 rounded-xl focus:border-amber-600 focus:outline-hidden tabular-nums"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!userGuess.trim()}
                  className={`px-6 py-3 rounded-xl font-display font-bold text-sm text-white shadow-xs transition-all ${
                    userGuess.trim()
                      ? 'bg-amber-600 hover:bg-amber-700 active:scale-95 cursor-pointer'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  Kontrol Et
                </button>
              </div>
            </div>

            {isAnswerChecked && !isCorrect && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Yanlış hesaplama oldu, tekrar dene!</span>
                </div>
                <p>{puzzle.hint}</p>
              </div>
            )}
          </form>
        ) : (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-display font-black text-xl text-emerald-900">
              Harika! Tam {puzzle.expectedChange} ₺ Para Üstü! 🎉
            </h4>
            <p className="text-xs text-emerald-800">
              {puzzle.paidAmount} ₺ − {puzzle.totalAmount} ₺ = {puzzle.expectedChange} ₺
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNextPuzzle}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs flex items-center gap-2 mx-auto cursor-pointer"
              >
                <span>Sıradaki Müşteriye Geç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
