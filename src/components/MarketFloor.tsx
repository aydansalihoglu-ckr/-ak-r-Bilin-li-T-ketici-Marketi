import React, { useState } from 'react';
import { Character, CartItem, MarketItem } from '../types/game';
import { MARKET_ITEMS, MARKET_CATEGORIES } from '../data/marketItems';
import { soundManager } from '../utils/audio';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Wallet, 
  AlertTriangle,
  Volume2,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface MarketFloorProps {
  character: Character;
  plannedItemIds: string[];
  cart: CartItem[];
  onUpdateCart: (newCart: CartItem[]) => void;
  onBackToPlanner: () => void;
  onProceedToCheckout: () => void;
}

export const MarketFloor: React.FC<MarketFloorProps> = ({
  character,
  plannedItemIds,
  cart,
  onUpdateCart,
  onBackToPlanner,
  onProceedToCheckout,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = selectedCategory === 'all'
    ? MARKET_ITEMS
    : MARKET_ITEMS.filter((item) => item.category === selectedCategory);

  const getItemQuantityInCart = (itemId: string): number => {
    const found = cart.find((c) => c.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const handleAddToCart = (item: MarketItem) => {
    soundManager.playBeep();
    const existingIndex = cart.findIndex((c) => c.item.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      onUpdateCart(updated);
    } else {
      onUpdateCart([...cart, { item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    soundManager.playClick();
    const existingIndex = cart.findIndex((c) => c.item.id === itemId);
    if (existingIndex === -1) return;

    if (cart[existingIndex].quantity > 1) {
      const updated = [...cart];
      updated[existingIndex].quantity -= 1;
      onUpdateCart(updated);
    } else {
      onUpdateCart(cart.filter((c) => c.item.id !== itemId));
    }
  };

  const handleClearCart = () => {
    soundManager.playClick();
    onUpdateCart([]);
  };

  // Calculations
  const cartTotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const totalItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const remainingBudget = character.mission.budget - cartTotal;
  const isOverBudget = remainingBudget < 0;

  // Planned list progress
  const plannedItems = MARKET_ITEMS.filter((i) => plannedItemIds.includes(i.id));
  const completedPlannedItems = plannedItems.filter((i) => getItemQuantityInCart(i.id) > 0);
  const allPlannedItemsInCart = completedPlannedItems.length === plannedItems.length && plannedItems.length > 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Bar: Character & Mission Recap */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={character.avatarUrl}
            alt={character.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover border border-amber-300 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-slate-900 text-base">
                {character.name} Markette
              </span>
              <button
                type="button"
                onClick={() => {
                  soundManager.speakText(
                    `Reyonları gezerek hazırladığın alışveriş listesindeki ürünleri sepete ekle. Bütçen ${character.mission.budget} Türk Lirası. Fazla harcama yapmamaya dikkat et!`
                  );
                }}
                className="text-amber-700 hover:text-amber-900"
                title="Yönergeyi seslendir"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Görev: {character.mission.title} · Liste Hedefi: {completedPlannedItems.length}/{plannedItems.length} ürün
            </p>
          </div>
        </div>

        {/* Real-time Budget Counter Bar */}
        <div className="flex items-center gap-4 bg-amber-50/80 px-4 py-2 rounded-xl border border-amber-200 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <Wallet className="w-4 h-4 text-amber-600" />
            <span>Bütçe: {character.mission.budget} ₺</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="font-bold text-slate-700">
            <span>Sepet: </span>
            <span className={`tabular-nums ${isOverBudget ? 'text-rose-600 font-extrabold' : 'text-slate-900'}`}>
              {cartTotal} ₺
            </span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="font-bold">
            <span className="text-slate-600">Kalan: </span>
            <span className={`tabular-nums ${isOverBudget ? 'text-rose-600 font-extrabold' : 'text-emerald-700 font-extrabold'}`}>
              {remainingBudget} ₺
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout: Aisles on Left, Shopping Cart & Checklist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Reyonlar & Ürünler (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Aisle Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {MARKET_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Product Cards Shelf Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {filteredItems.map((item) => {
              const qty = getItemQuantityInCart(item.id);
              const isOnPlannedList = plannedItemIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border-2 p-3.5 flex flex-col justify-between gap-2.5 transition-all shadow-2xs hover:shadow-sm ${
                    isOnPlannedList
                      ? 'border-amber-300/80 bg-amber-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Item Badge & Icon */}
                  <div className="flex items-start justify-between">
                    <span className="text-3xl select-none">{item.emoji}</span>
                    {isOnPlannedList && (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                        Listende
                      </span>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {item.unit}
                    </p>
                  </div>

                  {/* Price Tag & Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="font-display font-extrabold text-base text-slate-900 tabular-nums">
                      {item.price} ₺
                    </span>

                    {/* Quantity Control Buttons */}
                    {qty > 0 ? (
                      <div className="flex items-center gap-1.5 bg-amber-100/70 p-0.5 rounded-lg border border-amber-200">
                        <button
                          type="button"
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="w-6 h-6 rounded-md bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 flex items-center justify-center font-bold text-xs shadow-2xs cursor-pointer"
                          title="1 Adet Çıkar"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-display font-black text-xs text-amber-950 w-4 text-center tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          className="w-6 h-6 rounded-md bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center font-bold text-xs shadow-2xs cursor-pointer"
                          title="1 Adet Ekle"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold rounded-lg transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Sepete At</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sepetim & Alışveriş Listesi (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* 1. Alışveriş Listesi Takibi (Shopping Checklist) */}
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-amber-100 pb-2">
              <h3 className="font-display font-black text-sm text-slate-900 flex items-center gap-1.5">
                <span>📋</span>
                <span>{character.name}'in Hazırladığı Liste</span>
              </h3>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                {completedPlannedItems.length} / {plannedItems.length}
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {plannedItems.map((item) => {
                const inCart = getItemQuantityInCart(item.id) > 0;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                      inCart
                        ? 'bg-emerald-50 text-emerald-900 font-medium'
                        : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {inCart ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className={inCart ? 'line-through text-slate-500' : 'font-medium'}>
                        {item.name}
                      </span>
                    </div>
                    <span className="font-mono font-bold tabular-nums">
                      {item.price} ₺
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Sepetim (Shopping Cart Summary) */}
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-amber-600" />
                <h3 className="font-display font-black text-base text-slate-900">
                  Sepetim
                </h3>
                <span className="text-xs font-bold text-slate-500">
                  ({totalItemCount} adet)
                </span>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer"
                  title="Sepeti Boşalt"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Temizle</span>
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-40 text-amber-500" />
                <p className="text-xs font-medium">Sepetin henüz boş.</p>
                <p className="text-[11px] text-slate-500">Reyonlardan ürün seçip sepete ekleyebilirsin.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cartItem.item.emoji}</span>
                      <div>
                        <div className="font-bold text-slate-900">{cartItem.item.name}</div>
                        <div className="text-[10px] text-slate-500 tabular-nums">
                          {cartItem.item.price} ₺ × {cartItem.quantity} adet
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-slate-900 tabular-nums">
                        {cartItem.item.price * cartItem.quantity} ₺
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(cartItem.item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-200 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Başlangıç Bütçesi:</span>
                <span className="font-bold tabular-nums">{character.mission.budget} ₺</span>
              </div>
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Sepet Toplamı:</span>
                <span className={`text-base font-display tabular-nums ${isOverBudget ? 'text-rose-600' : 'text-slate-900'}`}>
                  {cartTotal} ₺
                </span>
              </div>
              <div className="flex items-center justify-between font-bold text-slate-900 pt-1 border-t border-dashed border-slate-200">
                <span className="text-emerald-800">Kalan Bütçe:</span>
                <span className={`font-display text-sm tabular-nums ${isOverBudget ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {remainingBudget} ₺
                </span>
              </div>
            </div>

            {/* Budget Exceeded Alert */}
            {isOverBudget && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2 text-rose-800 text-[11px]">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Bütçe Aşıldı!</strong> Sepetindeki ürünlerin tutarı bütçenden fazla. Bazı ürünleri sepetten çıkarmalısın.
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={cart.length === 0 || isOverBudget}
                onClick={() => {
                  soundManager.playCashRegister();
                  onProceedToCheckout();
                }}
                className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  cart.length === 0 || isOverBudget
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white cursor-pointer hover:shadow-lg'
                }`}
              >
                <span>Kasaya Git & Öde ({cartTotal} ₺)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBackToPlanner}
                className="w-full py-2 text-slate-600 hover:text-slate-900 text-xs font-bold text-center cursor-pointer flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Listeyi Yeniden Düzenle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
