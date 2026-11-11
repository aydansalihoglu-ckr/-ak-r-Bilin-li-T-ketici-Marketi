import React from 'react';

interface BanknoteProps {
  denomination: 5 | 10 | 20 | 50 | 100 | 200;
  count?: number;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface CoinProps {
  value: 1;
  count?: number;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Banknote: React.FC<BanknoteProps> = ({
  denomination,
  count,
  onClick,
  disabled = false,
  size = 'md',
}) => {
  const colorMap = {
    5: {
      bg: 'bg-violet-700',
      border: 'border-violet-800',
      text: 'text-violet-100',
      accent: 'border-violet-500/50',
      label: '5 TÜRK LİRASI',
    },
    10: {
      bg: 'bg-rose-700',
      border: 'border-rose-800',
      text: 'text-rose-100',
      accent: 'border-rose-500/50',
      label: '10 TÜRK LİRASI',
    },
    20: {
      bg: 'bg-emerald-700',
      border: 'border-emerald-800',
      text: 'text-emerald-100',
      accent: 'border-emerald-500/50',
      label: '20 TÜRK LİRASI',
    },
    50: {
      bg: 'bg-amber-600',
      border: 'border-amber-700',
      text: 'text-amber-100',
      accent: 'border-amber-400/50',
      label: '50 TÜRK LİRASI',
    },
    100: {
      bg: 'bg-sky-700',
      border: 'border-sky-800',
      text: 'text-sky-100',
      accent: 'border-sky-400/50',
      label: '100 TÜRK LİRASI',
    },
    200: {
      bg: 'bg-fuchsia-800',
      border: 'border-fuchsia-900',
      text: 'text-fuchsia-100',
      accent: 'border-fuchsia-400/50',
      label: '200 TÜRK LİRASI',
    },
  };

  const style = colorMap[denomination];
  const sizeClasses = {
    sm: 'w-24 h-12 text-xs px-2',
    md: 'w-36 h-18 text-sm px-3',
    lg: 'w-44 h-22 text-base px-4',
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-between rounded-md border-2 shadow-sm font-sans font-semibold transition-all select-none
        ${style.bg} ${style.border} ${style.text} ${sizeClasses}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer hover:shadow-md'}
      `}
      title={`${denomination} ₺ Banknot`}
    >
      {/* Decorative Guilloche Border Inner */}
      <div className={`absolute inset-1 border border-dashed rounded ${style.accent} pointer-events-none`} />

      <div className="flex flex-col items-start z-10 leading-tight">
        <span className="font-display font-black text-xl tracking-tighter">₺{denomination}</span>
        <span className="text-[9px] opacity-90 font-medium tracking-wide">TÜRKİYE</span>
      </div>

      <div className="text-right z-10">
        <span className="text-[8px] uppercase tracking-wider block opacity-75 font-mono">Banknot</span>
        <span className="font-display font-extrabold text-base">₺{denomination}</span>
      </div>

      {typeof count === 'number' && (
        <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow">
          {count}
        </span>
      )}
    </button>
  );
};

export const Coin: React.FC<CoinProps> = ({
  count,
  onClick,
  disabled = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-18 h-18 text-base',
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center rounded-full border-2 border-amber-600 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 shadow-sm font-display font-extrabold text-amber-950 transition-all select-none
        ${sizeClasses}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer hover:shadow-md'}
      `}
      title="1 ₺ Madeni Para"
    >
      {/* Inner silver circle */}
      <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-white border border-amber-500/50 flex flex-col items-center justify-center shadow-inner">
        <span className="leading-none text-slate-800 font-black">₺1</span>
        <span className="text-[7px] text-slate-600 font-sans font-bold">LİRA</span>
      </div>

      {typeof count === 'number' && (
        <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow">
          {count}
        </span>
      )}
    </button>
  );
};
