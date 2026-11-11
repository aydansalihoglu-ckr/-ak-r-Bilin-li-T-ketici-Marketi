import { CashierPuzzle } from '../types/game';

export const CASHIER_PUZZLES: CashierPuzzle[] = [
  {
    id: 'puzzle_1',
    customerName: 'Ayşe Teyze',
    customerAvatar: '👵',
    itemsPurchased: [
      { name: 'Köy Ekmeği (15 ₺)', price: 15, quantity: 2 },
      { name: 'Süt (38 ₺)', price: 38, quantity: 1 }
    ],
    totalAmount: 68, // 30 + 38 = 68
    paidAmount: 100,
    expectedChange: 32,
    hint: '100 ₺ aldın. Toplam 68 ₺. 100 - 68 işlemini yaparak para üstünü bulabilirsin!'
  },
  {
    id: 'puzzle_2',
    customerName: 'Emre (2. Sınıf)',
    customerAvatar: '👦',
    itemsPurchased: [
      { name: 'Resim Defteri (65 ₺)', price: 65, quantity: 1 },
      { name: 'Pastel Boya (120 ₺)', price: 120, quantity: 1 }
    ],
    totalAmount: 185, // 65 + 120 = 185
    paidAmount: 200,
    expectedChange: 15,
    hint: '185 ₺ tuttu. 200 ₺ verildi. 200 - 185 = ?'
  },
  {
    id: 'puzzle_3',
    customerName: 'Öğretmen Melis Hanım',
    customerAvatar: '👩‍🏫',
    itemsPurchased: [
      { name: 'Muz (75 ₺)', price: 75, quantity: 1 },
      { name: 'Kırmızı Elma (35 ₺)', price: 35, quantity: 1 },
      { name: 'Su (15 ₺)', price: 15, quantity: 1 }
    ],
    totalAmount: 125, // 75 + 35 + 15 = 125
    paidAmount: 200,
    expectedChange: 75,
    hint: '125 ₺ tuttu. 200 ₺ uzatıldı. 200 - 125 = ?'
  },
  {
    id: 'puzzle_4',
    customerName: 'Murat Amca',
    customerAvatar: '👨‍🌾',
    itemsPurchased: [
      { name: 'Kavrulmuş Fındık (140 ₺)', price: 140, quantity: 1 },
      { name: 'Beyaz Peynir (145 ₺)', price: 145, quantity: 1 }
    ],
    totalAmount: 285, // 140 + 145 = 285
    paidAmount: 300,
    expectedChange: 15,
    hint: '300 ₺ verildi, 285 ₺ harcandı. 300 - 285 = ?'
  },
  {
    id: 'puzzle_5',
    customerName: 'Selin & Kardeşi',
    customerAvatar: '👧',
    itemsPurchased: [
      { name: 'Simit (15 ₺)', price: 15, quantity: 2 },
      { name: 'Portakal (30 ₺)', price: 30, quantity: 1 }
    ],
    totalAmount: 60, // 30 + 30 = 60
    paidAmount: 100,
    expectedChange: 40,
    hint: '100 ₺ verdiler. 60 ₺ hesap tuttu. 100 - 60 = ?'
  }
];
