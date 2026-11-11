import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { X, Sparkles, Check, BookOpen, Sliders } from 'lucide-react';

interface TeacherSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customBudgetMultiplier: number;
  onUpdateMultiplier: (multiplier: number) => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  isOpen,
  onClose,
  customBudgetMultiplier,
  onUpdateMultiplier,
}) => {
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(customBudgetMultiplier);

  if (!isOpen) return null;

  const handleSave = () => {
    soundManager.playClick();
    onUpdateMultiplier(selectedMultiplier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-black text-lg text-slate-900">
                Öğretmen & Bütçe Ayarları
              </h3>
              <p className="text-xs text-slate-500">
                2. Sınıf PYP Matematik Dersi Uyarlaması
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pedagogical notes for the teacher */}
        <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 space-y-2 text-xs text-slate-700">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Kazanımlar & PYP Odakları:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
            <li><strong>Matematik:</strong> 3 basamaklı sayılar ve Türk Lirası paralarımızı tanıma, zihinden toplama ve çıkarma, para üstü hesaplama.</li>
            <li><strong>Sosyal Bilgiler & PYP:</strong> İhtiyaçlar ve istekler arasındaki farkı ayırt etme, bilinçli tüketici davranışları geliştirme.</li>
            <li><strong>Öğrenen Profili:</strong> Düşünen, Dengeli ve Duyarlı birey olma.</li>
          </ul>
        </div>

        {/* Difficulty / Budget Tuning */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-800">
            Karakter Bütçesi Seviyesi:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Standart / Gerçekçi', mult: 1, desc: '240₺ - 360₺' },
              { label: 'Geniş Bütçe', mult: 1.25, desc: '300₺ - 450₺' },
              { label: 'Ekonomik / Zor', mult: 0.8, desc: '190₺ - 290₺' },
            ].map((opt) => (
              <button
                key={opt.mult}
                type="button"
                onClick={() => setSelectedMultiplier(opt.mult)}
                className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  selectedMultiplier === opt.mult
                    ? 'border-amber-600 bg-amber-50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-xs text-slate-900">{opt.label}</div>
                <div className="text-[10px] text-slate-500">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            Ayarları Uygula
          </button>
        </div>
      </div>
    </div>
  );
};
