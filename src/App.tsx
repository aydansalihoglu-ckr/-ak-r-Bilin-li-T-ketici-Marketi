import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CharacterSelect } from './components/CharacterSelect';
import { NeedVsWantPlanner } from './components/NeedVsWantPlanner';
import { MarketFloor } from './components/MarketFloor';
import { CheckoutRegister } from './components/CheckoutRegister';
import { ReflectionReport } from './components/ReflectionReport';
import { CashierMiniGame } from './components/CashierMiniGame';
import { NeedsWantsSorterGame } from './components/NeedsWantsSorterGame';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';
import { Character, CartItem, GameMode, GameStage } from './types/game';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('story');
  const [stage, setStage] = useState<GameStage>('character_select');
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [plannedItemIds, setPlannedItemIds] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cakir_is_muted');
      if (saved !== null) {
        const val = saved === 'true';
        soundManager.setMuted(val);
        return val;
      }
    }
    return soundManager.getMuted();
  });
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [budgetMultiplier, setBudgetMultiplier] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cakir_budget_multiplier');
      if (saved) {
        const num = parseFloat(saved);
        if (!isNaN(num) && num > 0) return num;
      }
    }
    return 1;
  });
  const [checkoutSummary, setCheckoutSummary] = useState<{
    totalPaid: number;
    cartTotal: number;
    changeGiven: number;
    savedMoney: number;
  }>({
    totalPaid: 0,
    cartTotal: 0,
    changeGiven: 0,
    savedMoney: 0,
  });

  const handleToggleMute = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cakir_is_muted', String(newMuted));
    }
  };

  const handleUpdateMultiplier = (mult: number) => {
    setBudgetMultiplier(mult);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cakir_budget_multiplier', String(mult));
    }
  };

  const handleSelectCharacter = (character: Character) => {
    // Apply budget multiplier if customized
    const adjustedCharacter = {
      ...character,
      mission: {
        ...character.mission,
        budget: Math.round(character.mission.budget * budgetMultiplier),
      },
    };
    setActiveCharacter(adjustedCharacter);
    setCart([]);
    setPlannedItemIds([]);
    setStage('planning_list');
  };

  const handleConfirmShoppingList = (itemIds: string[]) => {
    setPlannedItemIds(itemIds);
    setStage('shopping');
  };

  const handleProceedToCheckout = () => {
    setStage('checkout');
  };

  const handleFinishCheckout = (summary: {
    totalPaid: number;
    cartTotal: number;
    changeGiven: number;
    savedMoney: number;
  }) => {
    setCheckoutSummary(summary);
    setStage('reflection');
  };

  const handleRestartStory = () => {
    setActiveCharacter(null);
    setPlannedItemIds([]);
    setCart([]);
    setStage('character_select');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          soundManager.playClick();
          setCurrentMode(mode);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
      />

      <main className="flex-1 pb-16">
        {/* Mode 1: Main Story Game */}
        {currentMode === 'story' && (
          <>
            {stage === 'character_select' && (
              <CharacterSelect
                onSelectCharacter={handleSelectCharacter}
                onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
              />
            )}

            {stage === 'planning_list' && activeCharacter && (
              <NeedVsWantPlanner
                character={activeCharacter}
                onBackToCharacters={handleRestartStory}
                onConfirmShoppingList={handleConfirmShoppingList}
              />
            )}

            {stage === 'shopping' && activeCharacter && (
              <MarketFloor
                character={activeCharacter}
                plannedItemIds={plannedItemIds}
                cart={cart}
                onUpdateCart={setCart}
                onBackToPlanner={() => setStage('planning_list')}
                onProceedToCheckout={handleProceedToCheckout}
              />
            )}

            {stage === 'checkout' && activeCharacter && (
              <CheckoutRegister
                character={activeCharacter}
                cart={cart}
                onBackToMarket={() => setStage('shopping')}
                onFinishCheckout={handleFinishCheckout}
              />
            )}

            {stage === 'reflection' && activeCharacter && (
              <ReflectionReport
                character={activeCharacter}
                cart={cart}
                plannedItemIds={plannedItemIds}
                checkoutSummary={checkoutSummary}
                onRestartGame={handleRestartStory}
              />
            )}
          </>
        )}

        {/* Mode 2: Cashier Practice Mini-Game */}
        {currentMode === 'cashier' && (
          <CashierMiniGame onBackToMain={() => setCurrentMode('story')} />
        )}

        {/* Mode 3: Needs vs Wants Classification Mini-Game */}
        {currentMode === 'sorter' && (
          <NeedsWantsSorterGame onBackToMain={() => setCurrentMode('story')} />
        )}
      </main>

      {/* Teacher / Custom Budget Modal */}
      <TeacherSettingsModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        customBudgetMultiplier={budgetMultiplier}
        onUpdateMultiplier={handleUpdateMultiplier}
      />

      {/* Quiet educational footer */}
      <footer className="no-print border-t border-amber-200/60 py-6 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">
          PYP 2. Sınıf Matematik Dersi · Kendimizi Düzenleme Biçimimiz
        </p>
        <p className="text-[11px] text-slate-400">
          Kazanımlar: Paralarımız, Bütçe Yönetimi, İhtiyaç ve İstek Ayrımı, Zihinden Çıkarma & Para Üstü
        </p>
      </footer>
    </div>
  );
}
