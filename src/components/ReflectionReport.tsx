import React, { useState } from 'react';
import { Character, CartItem } from '../types/game';
import { soundManager } from '../utils/audio';
import { 
  Award, 
  PiggyBank, 
  Printer, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Lightbulb, 
  Compass,
  Volume2
} from 'lucide-react';

interface ReflectionReportProps {
  character: Character;
  cart: CartItem[];
  plannedItemIds: string[];
  checkoutSummary: {
    totalPaid: number;
    cartTotal: number;
    changeGiven: number;
    savedMoney: number;
  };
  onRestartGame: () => void;
}

export const ReflectionReport: React.FC<ReflectionReportProps> = ({
  character,
  cart,
  plannedItemIds,
  checkoutSummary,
  onRestartGame,
}) => {
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cakir_student_name');
      if (saved && saved.trim()) return saved.trim();
    }
    return 'Bilinçli Öğrenci';
  });
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const handleSaveStudentName = () => {
    setIsEditingName(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cakir_student_name', studentName.trim() || 'Bilinçli Öğrenci');
    }
  };

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const initialBudget = character.mission.budget;
  const spentAmount = checkoutSummary.cartTotal;
  const piggySavings = initialBudget - spentAmount;

  // Evaluation of wants vs needs in final cart
  const needItemsCount = cart.filter((c) => c.item.isNeedByDefault).length;
  const wantItemsCount = cart.filter((c) => !c.item.isNeedByDefault).length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner Celebration */}
      <div className="no-print bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-6 sm:p-8 shadow-lg text-center space-y-3">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto text-3xl backdrop-blur-xs border border-white/30 shadow-xs">
          ⭐
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
          Harika Bir Alışveriş Yaptın, {character.name}!
        </h2>
        <p className="text-emerald-100 text-xs sm:text-sm max-w-lg mx-auto">
          Tüm ihtiyaçlarını bütçeni aşmadan tamamladın ve matematiksel işlemlerini başarıyla uyguladın. Şimdi PYP öğrenen profili öz değerlendirmene göz atalım!
        </p>
        <button
          type="button"
          onClick={() => {
            soundManager.speakText(
              `Tebrikler! ${character.name} ile görevi başarıyla bitirdin. Başlangıç bütçen ${initialBudget} liraydı. ${spentAmount} lira harcadın ve kumbarana tam ${piggySavings} lira kaldı!`
            );
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer border border-white/20"
        >
          <Volume2 className="w-4 h-4" />
          <span>Değerlendirmeyi Seslendir</span>
        </button>
      </div>

      {/* Piggy Bank & Financial Summary Card */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: Piggy Bank Visual */}
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 text-center space-y-2">
          <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <PiggyBank className="w-10 h-10" />
          </div>
          <h4 className="font-display font-black text-slate-900 text-base">
            Kumbaraya Kalan
          </h4>
          <div className="font-display font-black text-3xl text-emerald-700 tabular-nums">
            +{piggySavings} ₺
          </div>
          <p className="text-[11px] text-slate-500">
            Tasarruf edilen harçlık gelecekteki hedefler için birikti!
          </p>
        </div>

        {/* Center: Math Breakdown */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-display font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>🧮 2. Sınıf Matematik Özeti</span>
          </h4>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Başlangıç Harçlığı:</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{initialBudget} ₺</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Markette Harcanan Tutar:</span>
              <span className="font-mono font-bold text-rose-700 tabular-nums">− {spentAmount} ₺</span>
            </div>
            <div className="flex items-center justify-between text-slate-900 font-extrabold pt-2 border-t border-slate-200 text-sm">
              <span className="text-emerald-800">Tasarruf (Kalan Para):</span>
              <span className="font-display text-emerald-700 font-black tabular-nums">{piggySavings} ₺</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span>🛒 Sepet Dağılımı:</span>
            <span className="text-emerald-700 font-bold">{needItemsCount} İhtiyaç Ürünü</span>
            <span>·</span>
            <span className="text-amber-700 font-bold">{wantItemsCount} İstek Ürünü</span>
          </div>
        </div>
      </div>

      {/* PYP Learner Profile Reflection Section */}
      <div className="bg-white rounded-2xl border-2 border-amber-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-amber-100 pb-3">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
            IB PRIMARY YEARS PROGRAMME (PYP)
          </span>
          <h3 className="font-display font-black text-xl text-slate-900">
            Öğrenen Profili Öz Değerlendirmesi
          </h3>
          <p className="text-xs text-slate-600">
            Bu alışveriş sırasında sergilediğin tutum ve beceriler:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Düşünen (Thinker)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alışverişe çıkmadan önce ihtiyaç listesi hazırladın, fiyatları karşılaştırdın ve para üstünü hatasız hesapladın.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs sm:text-sm">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Dengeli (Balanced)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              İsteklerin yerine öncelikle temel ihtiyaçlarına odaklandın. Bütçeni tüketmeyip birikim yaptın.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/70 space-y-1.5">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-xs sm:text-sm">
              <Heart className="w-4 h-4 text-sky-600" />
              <span>Duyarlı (Caring)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gereksiz harcama ve israftan kaçınarak aile bütçesine ve çevreye karşı sorumluluk gösterdin.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200/70 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs sm:text-sm">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Dönüşümlü Düşünen (Reflective)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hangi ürünlerin hayatın için vazgeçilmez, hangilerinin ise sadece geçici istek olduğunu fark ettin.
            </p>
          </div>
        </div>
      </div>

      {/* NEW: Kazanılan Dijital Başarı Rozetleri (Digital Badges) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/15 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wider bg-amber-200/80 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>ÖZEL ÖDÜLLER</span>
            </div>
            <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
              Kazanılan Dijital Rozetler
            </h3>
            <p className="text-xs text-slate-600">
              Bütçeni akıllıca yönetme ve alışveriş performansına göre hak ettiğin unvanlar:
            </p>
          </div>

          <div className="text-right">
            <span className="font-display font-black text-xs text-amber-950 bg-white px-3 py-1.5 rounded-xl border border-amber-300 shadow-2xs">
              Toplam Rozet: {
                [
                  piggySavings >= Math.round(initialBudget * 0.15),
                  spentAmount <= initialBudget,
                  plannedItemIds.every((id) => cart.some((c) => c.item.id === id)),
                  needItemsCount >= wantItemsCount,
                ].filter(Boolean).length
              } / 4
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Badge 1: Tasarruf Kahramanı */}
          {(() => {
            const isEarned = piggySavings >= Math.round(initialBudget * 0.15);
            return (
              <div
                onClick={() => {
                  soundManager.playClick();
                  soundManager.speakText("Tasarruf Kahramanı Rozeti. Bütçeni tüketmeyip kumbarana para biriktirdiğin için bu rozeti kazandın!");
                }}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between gap-3 transition-all cursor-pointer ${
                  isEarned
                    ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-200 hover:scale-102'
                    : 'bg-slate-50/80 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                  isEarned ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  🦸‍♂️
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-slate-900">
                    Tasarruf Kahramanı
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Kumbarana {piggySavings} ₺ tasarruf aktararak bütçeni korudun.
                  </p>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  isEarned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isEarned ? '★ KAZANILDI' : 'Kilitli'}
                </span>
              </div>
            );
          })()}

          {/* Badge 2: Bütçe Uzmanı */}
          {(() => {
            const isEarned = spentAmount <= initialBudget;
            return (
              <div
                onClick={() => {
                  soundManager.playClick();
                  soundManager.speakText("Bütçe Uzmanı Rozeti. Alışverişini bütçeni tek bir lira bile aşmadan tamamladığın için bu rozeti kazandın!");
                }}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between gap-3 transition-all cursor-pointer ${
                  isEarned
                    ? 'bg-white border-sky-400 shadow-md ring-2 ring-sky-200 hover:scale-102'
                    : 'bg-slate-50/80 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                  isEarned ? 'bg-gradient-to-tr from-sky-500 to-indigo-500 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  🎯
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-slate-900">
                    Bütçe Uzmanı
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Harcamalarını tam dengede tutarak bütçeni aşmadın.
                  </p>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  isEarned ? 'bg-sky-100 text-sky-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isEarned ? '★ KAZANILDI' : 'Kilitli'}
                </span>
              </div>
            );
          })()}

          {/* Badge 3: Planlama Ustası */}
          {(() => {
            const isEarned = plannedItemIds.every((id) => cart.some((c) => c.item.id === id));
            return (
              <div
                onClick={() => {
                  soundManager.playClick();
                  soundManager.speakText("Planlama Ustası Rozeti. Hazırladığın listeye sadık kalarak tüm ihtiyaçları sepete eklediğin için bu rozeti kazandın!");
                }}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between gap-3 transition-all cursor-pointer ${
                  isEarned
                    ? 'bg-white border-amber-400 shadow-md ring-2 ring-amber-200 hover:scale-102'
                    : 'bg-slate-50/80 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                  isEarned ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  📋
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-slate-900">
                    Planlama Ustası
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Listene sadık kaldın ve hiçbir temel ihtiyacı unutmadın.
                  </p>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  isEarned ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isEarned ? '★ KAZANILDI' : 'Kilitli'}
                </span>
              </div>
            );
          })()}

          {/* Badge 4: Bilinçli Tüketici */}
          {(() => {
            const isEarned = needItemsCount >= wantItemsCount;
            return (
              <div
                onClick={() => {
                  soundManager.playClick();
                  soundManager.speakText("Bilinçli Tüketici Rozeti. İhtiyaçlarını isteklerinin önünde tutarak doğru kararlar verdin!");
                }}
                className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between gap-3 transition-all cursor-pointer ${
                  isEarned
                    ? 'bg-white border-purple-400 shadow-md ring-2 ring-purple-200 hover:scale-102'
                    : 'bg-slate-50/80 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs ${
                  isEarned ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  🛡️
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-slate-900">
                    Bilinçli Tüketici
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    İhtiyaçlarını önceliklendirip israf ve gereksiz harcamadan kaçındın.
                  </p>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  isEarned ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isEarned ? '★ KAZANILDI' : 'Kilitli'}
                </span>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Printable Certificate (Bilinçli Tüketici Sertifikası) */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-400 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6 relative overflow-hidden">
        {/* Certificate Watermark / Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-600 text-white rounded-full text-xs font-black tracking-wider uppercase shadow-xs">
          <Award className="w-4 h-4" />
          <span>BAŞARI BELGESİ</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-amber-950 tracking-tight">
            PYP Bilinçli Tüketici & Matematik Ustası
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Bu belge, bütçe yönetimi ve para üstü işlemlerini başarıyla tamamlayan öğrencimize verilmiştir.
          </p>
        </div>

        {/* Student Name */}
        <div className="py-2">
          {isEditingName ? (
            <div className="inline-flex items-center gap-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="px-4 py-2 border-2 border-amber-500 rounded-xl font-display font-black text-xl text-center text-amber-900 bg-white"
                autoFocus
              />
              <button
                type="button"
                onClick={handleSaveStudentName}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
              >
                Kaydet
              </button>
            </div>
          ) : (
            <div className="inline-block group cursor-pointer" onClick={() => setIsEditingName(true)}>
              <span className="font-display font-black text-2xl sm:text-3xl text-amber-900 border-b-2 border-dashed border-amber-600 pb-1">
                {studentName}
              </span>
              <span className="block text-[10px] text-amber-700 mt-1 opacity-75 group-hover:opacity-100">
                (İsmini değiştirmek için tıkla ✏️)
              </span>
            </div>
          )}
        </div>

        {/* Earned Badges Stamps on Certificate */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {piggySavings >= Math.round(initialBudget * 0.15) && (
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
              <span>🦸‍♂️</span>
              <span>Tasarruf Kahramanı</span>
            </span>
          )}
          {spentAmount <= initialBudget && (
            <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-900 border border-sky-300 px-3 py-1 rounded-full text-xs font-bold">
              <span>🎯</span>
              <span>Bütçe Uzmanı</span>
            </span>
          )}
          {plannedItemIds.every((id) => cart.some((c) => c.item.id === id)) && (
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold">
              <span>📋</span>
              <span>Planlama Ustası</span>
            </span>
          )}
          {needItemsCount >= wantItemsCount && (
            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 border border-purple-300 px-3 py-1 rounded-full text-xs font-bold">
              <span>🛡️</span>
              <span>Bilinçli Tüketici</span>
            </span>
          )}
        </div>

        {/* Character & Stats Footnote */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto pt-3 border-t border-amber-300/80 text-xs text-slate-700">
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">Karakter</span>
            <span className="font-bold">{character.name}</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">Harcanan</span>
            <span className="font-bold tabular-nums">{spentAmount} ₺</span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-semibold">Biriktirilen</span>
            <span className="font-bold text-emerald-700 tabular-nums">{piggySavings} ₺</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400">
          Tarih: {new Date().toLocaleDateString('tr-TR')} · PYP 2. Sınıf Matematik Etkinliği
        </div>
      </div>

      {/* Action Controls */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-300 shadow-xs flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Sertifikayı Yazdır / PDF İndir</span>
        </button>

        <button
          type="button"
          onClick={onRestartGame}
          className="w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-display font-black rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Başka Bir Karakterle Oyna</span>
        </button>
      </div>
    </div>
  );
};
