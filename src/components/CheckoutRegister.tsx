import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Character, CartItem } from '../types/game';
import { Banknote, Coin } from './MoneyVisual';
import { soundManager } from '../utils/audio';
import { 
  Receipt, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

interface CheckoutRegisterProps {
  character: Character;
  cart: CartItem[];
  onBackToMarket: () => void;
  onFinishCheckout: (summary: {
    totalPaid: number;
    cartTotal: number;
    changeGiven: number;
    savedMoney: number;
  }) => void;
}

export const CheckoutRegister: React.FC<CheckoutRegisterProps> = ({
  character,
  cart,
  onBackToMarket,
  onFinishCheckout,
}) => {
  const cartTotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  // Suggested payment denominations based on cart total up to 3 digits
  const defaultPaymentOption = (() => {
    const candidateAmounts = [50, 100, 200, 250, 300, 400, 500];
    const found = candidateAmounts.find((amt) => amt >= cartTotal);
    return found || Math.ceil(cartTotal / 100) * 100;
  })();

  const [paidAmount, setPaidAmount] = useState<number>(defaultPaymentOption);
  const [studentChangeGuess, setStudentChangeGuess] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Exact math
  const actualChange = paidAmount - cartTotal;
  const savedMoney = character.mission.budget - cartTotal;

  const handleSelectPaidAmount = (amt: number) => {
    soundManager.playCoin();
    setPaidAmount(amt);
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  const handleVerifyChange = (e: React.FormEvent) => {
    e.preventDefault();
    const guessNumber = parseInt(studentChangeGuess.trim(), 10);

    if (isNaN(guessNumber)) {
      soundManager.playClick();
      return;
    }

    if (guessNumber === actualChange) {
      soundManager.playSuccess();
      setIsCorrect(true);
      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      soundManager.playClick();
      setIsCorrect(false);
      setIsSubmitted(true);
      setShowHint(true);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border-2 border-amber-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-display font-black text-2xl shadow-xs">
            🧾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                Market Kasası & Para Üstü Hesaplama
              </h2>
              <button
                type="button"
                onClick={() => {
                  soundManager.speakText(
                    `Market kasasına geldik! Toplam alışveriş tutarın ${cartTotal} Türk Lirası. Kasiyere ödeme yapıp doğru para üstünü hesapla!`
                  );
                }}
                className="text-amber-700 hover:text-amber-900"
                title="Yönergeyi seslendir"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Karakter: <strong className="text-amber-800">{character.name}</strong> · Toplam Bütçe: {character.mission.budget} ₺
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBackToMarket}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Sepete Geri Dön</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Alışveriş Fişi (Receipt) (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-2xl border-2 border-slate-300 p-6 shadow-md relative font-mono text-xs text-slate-800 space-y-4">
          {/* Receipt Top Zigzag */}
          <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-slate-300">
            <div className="font-display font-black text-base text-slate-900">
              🏪 PYP DOĞAL MARKET
            </div>
            <div className="text-[10px] text-slate-500">
              2. Sınıf Matematik Alışveriş Fişi
            </div>
            <div className="text-[10px] text-slate-400">
              Tarih: {new Date().toLocaleDateString('tr-TR')} · Müşteri: {character.name}
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-2 py-2 max-h-60 overflow-y-auto">
            {cart.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className="flex items-center justify-between text-slate-700"
              >
                <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                  <span>{cartItem.item.emoji}</span>
                  <span className="truncate">{cartItem.item.name}</span>
                </div>
                <div className="text-right whitespace-nowrap tabular-nums">
                  {cartItem.quantity}x {cartItem.item.price} = {cartItem.item.price * cartItem.quantity} ₺
                </div>
              </div>
            ))}
          </div>

          {/* Totals Section */}
          <div className="border-t-2 border-dashed border-slate-300 pt-3 space-y-2">
            <div className="flex items-center justify-between text-slate-600">
              <span>ARA TOPLAM:</span>
              <span className="tabular-nums">{cartTotal} ₺</span>
            </div>
            <div className="flex items-center justify-between font-black text-sm text-slate-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
              <span>ÖDENECEK TUTAR:</span>
              <span className="font-display text-lg text-amber-900 tabular-nums">
                {cartTotal} ₺
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>KASAYA VERİLEN:</span>
              <span className="font-bold tabular-nums text-slate-900">{paidAmount} ₺</span>
            </div>
            <div className="flex items-center justify-between font-bold text-emerald-800 pt-1 border-t border-slate-200">
              <span>PARA ÜSTÜ:</span>
              <span className="font-display text-base tabular-nums">
                {actualChange} ₺
              </span>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-200">
            * Bizi tercih ettiğiniz için teşekkür ederiz! *
          </div>
        </div>

        {/* Right Column: Kasiyer İşlem & Para Üstü Çözümü (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          {/* Step A: Kasaya Para Verme */}
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-base text-slate-900 flex items-center gap-2">
                <span>1. Adım:</span>
                <span>Kasiyere Hangi Parayı Uzatacaksın?</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Borç: {cartTotal} ₺
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Toplam tutarı ({cartTotal} ₺) karşılayacak bir banknot seç:
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              {[100, 200, 250, 300, 350, 400, 500].map((amt) => {
                const canAfford = amt >= cartTotal;
                const isSelected = paidAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    disabled={!canAfford}
                    onClick={() => handleSelectPaidAmount(amt)}
                    className={`relative p-3 rounded-xl border-2 font-display font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-400'
                        : canAfford
                        ? 'border-slate-300 bg-white hover:border-amber-400'
                        : 'border-slate-200 bg-slate-100 text-slate-400 opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <span>₺{amt} Öde</span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step B: 2. Sınıf Matematik Para Üstü Bulmacası */}
          <div className="bg-white rounded-2xl border-2 border-emerald-300 p-6 shadow-sm space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <span>🧮 2. Sınıf Matematik Problemi</span>
              </div>
              <h3 className="font-display font-black text-lg text-slate-900 mt-1">
                Kasiyer sana kaç ₺ para üstü vermelidir?
              </h3>
            </div>

            {/* Visual Formula Box */}
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
              <div className="bg-white px-3 py-2 rounded-lg border border-emerald-300 shadow-2xs">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Verilen Para</span>
                <span className="font-display font-black text-xl text-slate-900 tabular-nums">{paidAmount} ₺</span>
              </div>

              <span className="text-2xl font-black text-emerald-700">−</span>

              <div className="bg-white px-3 py-2 rounded-lg border border-emerald-300 shadow-2xs">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Sepet Tutarı</span>
                <span className="font-display font-black text-xl text-slate-900 tabular-nums">{cartTotal} ₺</span>
              </div>

              <span className="text-2xl font-black text-emerald-700">=</span>

              <div className="bg-amber-100 px-4 py-2 rounded-lg border-2 border-amber-400 shadow-xs">
                <span className="text-[10px] text-amber-900 block uppercase font-extrabold">Para Üstü (?)</span>
                <span className="font-display font-black text-2xl text-amber-900 tabular-nums">
                  {isCorrect ? `${actualChange} ₺` : '? ₺'}
                </span>
              </div>
            </div>

            {/* Answer Input Form */}
            {!isCorrect ? (
              <form onSubmit={handleVerifyChange} className="space-y-4">
                <div>
                  <label htmlFor="changeInput" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Para Üstü Cevabın (Türk Lirası):
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        id="changeInput"
                        type="number"
                        min="0"
                        max="500"
                        value={studentChangeGuess}
                        onChange={(e) => setStudentChangeGuess(e.target.value)}
                        placeholder="Örn: 12"
                        className="w-full px-4 py-3 text-lg font-display font-bold border-2 border-slate-300 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 tabular-nums"
                        autoFocus
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                        ₺
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!studentChangeGuess.trim()}
                      className={`px-6 py-3 rounded-xl font-display font-bold text-sm text-white transition-all shadow-xs cursor-pointer ${
                        studentChangeGuess.trim()
                          ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
                          : 'bg-slate-300 cursor-not-allowed'
                      }`}
                    >
                      Cevabımı Kontrol Et
                    </button>
                  </div>
                </div>

                {/* Incorrect feedback & Hint */}
                {isSubmitted && !isCorrect && (
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-800 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-rose-900">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Tekrar deneyelim! Bir çıkarma hatası oldu.</span>
                    </div>
                    <p className="text-slate-700">
                      <strong>İpucu:</strong> {cartTotal}'den başlayıp {paidAmount}'ye kadar ileriye doğru sayabilir veya {paidAmount} sayısından {cartTotal} sayısını çıkarabilirsin.
                    </p>
                  </div>
                )}

                {/* Optional Hint Button */}
                {!showHint && (
                  <button
                    type="button"
                    onClick={() => setShowHint(true)}
                    className="text-xs text-slate-500 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Çözüm İpucu Göster</span>
                  </button>
                )}

                {showHint && (
                  <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-sky-900 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <span>💡 2. Sınıf Zihinden Çıkarma Yolu:</span>
                    </div>
                    <p>
                      Önce {cartTotal}'i en yakın onluğa tamamla: {cartTotal} + {(Math.ceil(cartTotal / 10) * 10) - cartTotal} = {Math.ceil(cartTotal / 10) * 10}.
                      Sonra {paidAmount}'ye ulaşana kadar ekle! Toplam fark: <strong>{actualChange} ₺</strong> olacaktır.
                    </p>
                  </div>
                )}
              </form>
            ) : (
              /* Success State */
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-5 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display font-black text-xl text-emerald-900">
                  Tebrikler! Doğru Hesapladın! 🎉
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  {paidAmount} ₺ verdin, {cartTotal} ₺ harcadın. Kasiyer sana tam olarak <strong>{actualChange} ₺</strong> para üstü verdi!
                </p>

                {/* Visual Coins & Bills of the Change */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-xs font-bold text-slate-600">Verilen Para Üstü:</span>
                  <span className="font-display font-black text-lg text-emerald-700 tabular-nums">
                    {actualChange} ₺
                  </span>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playCashRegister();
                      onFinishCheckout({
                        totalPaid: paidAmount,
                        cartTotal,
                        changeGiven: actualChange,
                        savedMoney,
                      });
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-display font-black rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                  >
                    <span>Öz Değerlendirme & Sertifikamı Gör</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
