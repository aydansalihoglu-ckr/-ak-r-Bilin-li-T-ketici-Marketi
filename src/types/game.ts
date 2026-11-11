export type ItemCategory = 
  | 'meyve_sebze' 
  | 'sut_kahvalti' 
  | 'firin_ekmek' 
  | 'kuru_gida' 
  | 'okul_temizlik' 
  | 'istek_atistirmalik';

export interface MarketItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number; // in Turkish Lira (₺)
  emoji: string;
  unit: string;
  isNeedByDefault: boolean; // Pedagogical label: İhtiyaç vs İstek
  description: string;
}

export interface CharacterMission {
  title: string;
  scenario: string;
  pypTheme: string; // e.g. "Kendimizi Düzenleme Biçimimiz - Bilinçli Tüketici"
  budget: number; // in ₺
  requiredItemIds: string[]; // essential needs for the mission
  optionalItemIds: string[]; // tempting wants
}

export interface Character {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatarUrl: string;
  tagline: string;
  personality: string;
  mission: CharacterMission;
}

export interface CartItem {
  item: MarketItem;
  quantity: number;
}

export type GameStage = 
  | 'character_select' 
  | 'planning_list' 
  | 'shopping' 
  | 'checkout' 
  | 'reflection';

export type GameMode = 
  | 'story' // Main 4-character story mode
  | 'cashier' // Practice change calculation
  | 'sorter' // Needs vs Wants mini-game
  | 'custom'; // Teacher or custom budget mode

export interface CashierPuzzle {
  id: string;
  customerName: string;
  customerAvatar: string;
  itemsPurchased: { name: string; price: number; quantity: number }[];
  totalAmount: number;
  paidAmount: number;
  expectedChange: number;
  hint: string;
}
