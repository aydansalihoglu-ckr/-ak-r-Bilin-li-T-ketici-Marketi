import React from 'react';
import { Character } from '../types/game';
import { CHARACTERS } from '../data/characters';
import { Volume2, ArrowRight, Wallet, Target, Sparkles, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';
import marketBanner from '../assets/images/market_banner_1794420099735.jpg';

interface CharacterSelectProps {
  onSelectCharacter: (character: Character) => void;
  onOpenTeacherModal: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  onSelectCharacter,
  onOpenTeacherModal,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Welcome Banner */}
      <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-white p-6 sm:p-8 lg:p-10 shadow-lg border border-amber-500/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide bg-amber-900/30 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30">
              <span>🎓 PYP 2. Sınıf Matematik & Yaşam Becerisi</span>
              <span>·</span>
              <span>Kendimizi Düzenleme Biçimimiz</span>
            </div>
            
            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white leading-tight">
              Market Macerasına Hazır mısın?
            </h1>
            
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed max-w-xl">
              4 arkadaşımızın her birinin çözmesi gereken özel bir görevi ve harçlık bütçesi var. 
              Önce ihtiyaçlarını belirleyip akıllı bir alışveriş listesi yapacaksın, sonra markette bütçeni aşmadan sepetini doldurup kasada para üstünü hesaplayacaksın!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.speakText("Lütfen oynamak istediğin arkadaşını seç. Görevini ve bütçesini incele!");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer backdrop-blur-xs border border-white/25"
              >
                <Volume2 className="w-4 h-4" />
                <span>Yönergeyi Sesli Dinle</span>
              </button>

              <button
                type="button"
                onClick={onOpenTeacherModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-900/40 hover:bg-amber-900/60 text-amber-100 text-xs font-bold transition-all cursor-pointer border border-amber-400/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Öğretmen / Özel Bütçe Tanımla</span>
              </button>
            </div>
          </div>

          {/* Market Illustration - Separate column, zero overlap */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-4 justify-center md:justify-end">
            <img
              src={marketBanner}
              alt="Market Dükkanı"
              referrerPolicy="no-referrer"
              className="w-full max-w-xs lg:max-w-sm h-44 lg:h-48 object-cover rounded-xl border-2 border-white/40 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Step Indicator Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-amber-700 uppercase">1. ADIM</span>
          <h2 className="font-display font-extrabold text-2xl text-slate-900">
            Karakterini ve Görevini Seç
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md">
          Her karakter farklı bir bütçeye ve farklı ihtiyaçlara sahiptir. Seçtiğin karaktere rehberlik edeceksin.
        </p>
      </div>

      {/* 4 Character Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CHARACTERS.map((char) => {
          return (
            <div
              key={char.id}
              className="group bg-white rounded-2xl border-2 border-amber-200/70 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Image & Header */}
              <div>
                <div className="relative aspect-square overflow-hidden bg-amber-100/40">
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-amber-900 border border-amber-200 shadow-xs flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-amber-600" />
                    <span>{char.mission.budget} ₺</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-black text-xl text-slate-900">
                        {char.name}
                      </h3>
                      <p className="text-xs font-semibold text-amber-700">
                        {char.tagline}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        soundManager.speakText(`${char.name}. ${char.mission.title}. ${char.mission.scenario}. Bütçesi ${char.mission.budget} Türk Lirası.`);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                      title={`${char.name}'in görevini seslendir`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-600 bg-amber-50/70 p-3 rounded-xl border border-amber-200/50 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                      <Target className="w-3.5 h-3.5 text-amber-600" />
                      <span>{char.mission.title}</span>
                    </div>
                    <p className="line-clamp-3 text-slate-600 leading-relaxed text-[11px]">
                      {char.mission.scenario}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{char.grade}</span>
                    </span>
                    <span className="font-bold text-slate-800">
                      Bütçe: {char.mission.budget} ₺
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSelectCharacter(char);
                  }}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group-hover:bg-amber-600"
                >
                  <span>{char.name} ile Başla</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
