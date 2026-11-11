import React from 'react';
import { Volume2, VolumeX, Sparkles, Settings2 } from 'lucide-react';
import { GameMode } from '../types/game';

interface NavbarProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenTeacherModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  isMuted,
  onToggleMute,
  onOpenTeacherModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => onSelectMode('story')}
        className="cursor-pointer flex items-center gap-2 group select-none whitespace-nowrap shrink-0"
      >
        <span className="text-2xl">🛒</span>
        <span className="font-display font-extrabold text-lg sm:text-xl text-amber-900 tracking-tight group-hover:text-amber-700 transition-colors">
          ÇAKIR Bilinçli Tüketici Marketi
        </span>
      </div>

      {/* Zone 2: 4 clean single-line nav controls with active/inactive states */}
      <nav className="hidden md:flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-xl border border-amber-200/50">
        <button
          type="button"
          onClick={() => onSelectMode('story')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            currentMode === 'story'
              ? 'bg-white text-amber-950 shadow-xs'
              : 'text-amber-800 hover:text-amber-950 hover:bg-white/50'
          }`}
        >
          4 Karakter Modu
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('cashier')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            currentMode === 'cashier'
              ? 'bg-white text-amber-950 shadow-xs'
              : 'text-amber-800 hover:text-amber-950 hover:bg-white/50'
          }`}
        >
          Kasiyer Bulmacası
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('sorter')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            currentMode === 'sorter'
              ? 'bg-white text-amber-950 shadow-xs'
              : 'text-amber-800 hover:text-amber-950 hover:bg-white/50'
          }`}
        >
          İhtiyaç mı, İstek mi?
        </button>

        <button
          type="button"
          onClick={onOpenTeacherModal}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg text-amber-800 hover:text-amber-950 hover:bg-white/50 transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
        >
          <Settings2 className="w-3.5 h-3.5" />
          Öğretmen & Bütçe
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onToggleMute}
          className="p-2 rounded-lg text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
          aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline text-slate-600">Sessiz</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline text-emerald-800">Ses Açık</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onSelectMode('story')}
          className="px-3.5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 active:scale-95 rounded-lg transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Yeni Alışveriş</span>
        </button>
      </div>
    </header>
  );
};
