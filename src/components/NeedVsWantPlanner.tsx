import React, { useState } from 'react';
import { Character, MarketItem } from '../types/game';
import { MARKET_ITEMS } from '../data/marketItems';
import { soundManager } from '../utils/audio';
import { 
  Check, 
  Plus, 
  Minus, 
  Wallet, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Volume2, 
  AlertCircle,
  PiggyBank
} from 'lucide-react';

interface NeedVsWantPlannerProps {
  character: Character;
  onBackToCharacters: () => void;
  onConfirmShoppingList: (selectedItemIds: string[]) => void;
}

export const NeedVsWantPlanner: React.FC<NeedVsWantPlannerProps> = ({
  character,
  onBackToCharacters,
  onConfirmShoppingList,
}) => {
  // Pre-seed with the character's mission required items
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    character.mission.requiredItemIds
  );

  // Filter items relevant for planning
  const missionRequiredItems = MARKET_ITEMS.filter((i) =>
    character.mission.requiredItemIds.includes(i.id)
  );

  const missionOptionalItems = MARKET_ITEMS.filter((i) =>
    character.mission.optionalItemIds.includes(i.id)
  );

  const otherItems = MARKET_ITEMS.filter(
    (i) =>
      !character.mission.requiredItemIds.includes(i.id) &&
      !character.mission.optionalItemIds.includes(i.id)
  ).slice(0, 8); // Extra options to test student judgment

  const toggleItem = (item: MarketItem) => {
    soundManager.playClick();
    if (selectedItemIds.includes(item.id)) {
      setSelectedItemIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      setSelectedItemIds((prev) => [...prev, item.id]);
    }
  };

  const selectedItems = MARKET_ITEMS.filter((i) => selectedItemIds.includes(i.id));
  const estimatedTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const remainingBudget = character.mission.budget - estimatedTotal;
  const isOverBudget = remainingBudget < 0;

  // Check if all essential mission requirements are included
  const missingRequired = character.mission.requiredItemIds.filter(
    (reqId) => !selectedItemIds.includes(reqId)
  );
  const allNeedsMet = missingRequired.length === 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border-2 border-amber-200/80 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={character.avatarUrl}
            alt={character.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                {character.name}'in Alışveriş Listesi
              </h2>
              <button
                type="button"
                onClick={() => {
                  soundManager.speakText(
                    `Sevgili ${character.name}, toplam bütçen ${character.mission.budget} Türk Lirası. Görevin: ${character.mission.scenario}. Önce temel ihtiyaçlarını seçmelisin!`
                  );
                }}
                className="text-amber-700 hover:text-amber-900 p-1 rounded-md"
                title="Yönergeyi seslendir"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Görev: <span className="text-amber-800 font-bold">{character.mission.title}</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {character.mission.scenario}
            </p>
          </div>
        </div>

        {/* Live Budget Gauge */}
        <div className="w-full md:w-72 bg-amber-50/80 rounded-xl p-4 border border-amber-200 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-amber-600" />
              Bütçe:
            </span>
            <span className="text-base text-slate-900 font-display font-extrabold tabular-nums">
              {character.mission.budget} ₺
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-slate-600">
            <span>Tahmini Tutar:</span>
            <span className={`font-bold tabular-nums ${isOverBudget ? 'text-rose-600' : 'text-slate-900'}`}>
              {estimatedTotal} ₺
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-amber-200/60">
            <span className="flex items-center gap-1">
              <PiggyBank className="w-4 h-4 text-emerald-600" />
              Kalan Para:
            </span>
            <span className={`font-display font-extrabold text-sm tabular-nums ${isOverBudget ? 'text-rose-600' : 'text-emerald-700'}`}>
              {remainingBudget} ₺
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isOverBudget ? 'bg-rose-500' : 'bg-amber-500'
              }`}
              style={{
                width: `${Math.min(100, (estimatedTotal / character.mission.budget) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* PYP Concept Box: İhtiyaç ve İstek Nedir? */}
      <div className="bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl p-5 border border-sky-200/80 flex flex-col sm:flex-row items-start gap-4">
        <div className="p-2.5 bg-sky-500 text-white rounded-xl shadow-xs shrink-0">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <h3 className="font-display font-bold text-slate-900 text-base">
            PYP Bilinçli Tüketici Rehberi: İhtiyaç mı, İstek mi?
          </h3>
          <p className="text-slate-600 leading-relaxed">
            <strong className="text-emerald-800">İhtiyaçlarımız (Needs):</strong> Sağlıklı yaşamak, beslenmek ve okulda başarılı olmak için zorunlu olan temel ürünlerdir (Süt, yumurta, ekmek, defter, sabun).
          </p>
          <p className="text-slate-600 leading-relaxed">
            <strong className="text-amber-800">İsteklerimiz (Wants):</strong> Sevdiğimiz fakat hayatımız için zorunlu olmayan ekstralardır (Çikolata, şeker, oyuncak kart, parti balonu). Bütçemiz artarsa alabiliriz!
          </p>
        </div>
      </div>

      {/* Section 1: Mission Needs (Temel İhtiyaçlar) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <h3 className="font-display font-extrabold text-lg text-slate-900">
              {character.name}'in Görevi İçin Temel İhtiyaçlar
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
            Öncelikli Seçim
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {missionRequiredItems.map((item) => {
            const isSelected = selectedItemIds.includes(item.id);
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleItem(item)}
                className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{item.emoji}</span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'border-2 border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">{item.unit}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-emerald-700 font-semibold">Temel İhtiyaç</span>
                  <span className="font-display font-black text-slate-900 tabular-nums">
                    {item.price} ₺
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2: Tempting Wants (İstekler & Ekstralar) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <h3 className="font-display font-extrabold text-lg text-slate-900">
              Eğlenceli İstekler (Bütçen Yetiyorsa Ekleyebilirsin)
            </h3>
          </div>
          <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg">
            Opsiyonel / İstek
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...missionOptionalItems, ...otherItems.slice(0, 2)].map((item) => {
            const isSelected = selectedItemIds.includes(item.id);
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleItem(item)}
                className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{item.emoji}</span>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-amber-600 text-white'
                        : 'border-2 border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">{item.unit}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-amber-700 font-semibold">İstek Ürünü</span>
                  <span className="font-display font-black text-slate-900 tabular-nums">
                    {item.price} ₺
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Warnings & Feedback */}
      {isOverBudget && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3 text-rose-800 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>
            <strong>Dikkat:</strong> Listenin tutarı ({estimatedTotal} ₺), bütçeni ({character.mission.budget} ₺) aşıyor! Fazladan seçtiğin istek ürünlerini çıkararak bütçeni dengelemelisin.
          </span>
        </div>
      )}

      {!allNeedsMet && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-amber-900 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
          <span>
            <strong>İpucu:</strong> {character.name}'in görevi için gerekli bazı temel ihtiyaçları henüz seçmedin. Lütfen yeşil alandaki temel ürünleri kontrol et!
          </span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onBackToCharacters}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Karakter Değiştir</span>
        </button>

        <button
          type="button"
          disabled={isOverBudget || selectedItemIds.length === 0}
          onClick={() => {
            soundManager.playCashRegister();
            onConfirmShoppingList(selectedItemIds);
          }}
          className={`w-full sm:w-auto px-8 py-3 rounded-xl font-display font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
            isOverBudget || selectedItemIds.length === 0
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-700 active:scale-98 text-white cursor-pointer hover:shadow-lg'
          }`}
        >
          <span>Listemi Onayla & Markete Git</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
