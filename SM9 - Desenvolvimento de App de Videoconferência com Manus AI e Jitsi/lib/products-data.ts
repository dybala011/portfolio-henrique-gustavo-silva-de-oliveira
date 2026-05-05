export interface Product {
  id: string;
  name: string;
  price: string;
  category: "Smartphone" | "Acessório" | "Computador" | "Tablet";
  description: string;
  specs: string[];
  badge?: string;
  emoji: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: "R$ 8.999",
    category: "Smartphone",
    description:
      "O iPhone 15 Pro traz o chip A17 Pro com desempenho revolucionário, câmera de 48MP com zoom óptico 5x e design em titânio ultrarresistente.",
    specs: ["Chip A17 Pro", "Câmera 48MP", "Tela 6.1\" Super Retina XDR", "Titânio"],
    badge: "Novo",
    emoji: "📱",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: "R$ 7.499",
    category: "Smartphone",
    description:
      "Galaxy S24 Ultra com S Pen integrada, câmera de 200MP e processador Snapdragon 8 Gen 3 para máxima performance.",
    specs: ["Snapdragon 8 Gen 3", "Câmera 200MP", "S Pen integrada", "Tela 6.8\" Dynamic AMOLED"],
    badge: "Top Vendas",
    emoji: "📲",
  },
  {
    id: "3",
    name: "Xiaomi 14 Ultra",
    price: "R$ 5.999",
    category: "Smartphone",
    description:
      "Câmera Leica profissional com lente variável, bateria de 5000mAh e carregamento turbo de 90W.",
    specs: ["Snapdragon 8 Gen 3", "Câmera Leica 50MP", "Bateria 5000mAh", "Carregamento 90W"],
    emoji: "📸",
  },
  {
    id: "4",
    name: "Fone AirPods Pro 2",
    price: "R$ 1.899",
    category: "Acessório",
    description:
      "Cancelamento ativo de ruído de última geração, áudio espacial personalizado e resistência à água IPX4.",
    specs: ["Cancelamento de ruído ANC", "Áudio Espacial", "IPX4", "Até 30h com estojo"],
    badge: "Mais Vendido",
    emoji: "🎧",
  },
  {
    id: "5",
    name: "Samsung Galaxy Buds3 Pro",
    price: "R$ 1.299",
    category: "Acessório",
    description:
      "Fone premium com design ergonômico, ANC inteligente e integração perfeita com dispositivos Galaxy.",
    specs: ["ANC Inteligente", "Hi-Fi Audio", "Design ergonômico", "Até 30h total"],
    emoji: "🎵",
  },
  {
    id: "6",
    name: "MacBook Air M3",
    price: "R$ 12.999",
    category: "Computador",
    description:
      "Ultrafino e silencioso com chip M3, até 18h de bateria e tela Liquid Retina de 15 polegadas.",
    specs: ["Chip Apple M3", "RAM 8GB", "SSD 256GB", "Tela 15\" Liquid Retina"],
    badge: "Premium",
    emoji: "💻",
  },
  {
    id: "7",
    name: "iPad Pro M4",
    price: "R$ 9.499",
    category: "Tablet",
    description:
      "O iPad mais fino já criado com tela OLED Ultra Retina XDR, chip M4 e suporte ao Apple Pencil Pro.",
    specs: ["Chip Apple M4", "Tela OLED 11\"", "Apple Pencil Pro", "Wi-Fi 6E"],
    badge: "Novo",
    emoji: "📋",
  },
  {
    id: "8",
    name: "Carregador MagSafe 15W",
    price: "R$ 349",
    category: "Acessório",
    description:
      "Carregamento magnético rápido de 15W para iPhone 12 e posteriores, com alinhamento automático.",
    specs: ["15W MagSafe", "Compatível iPhone 12+", "Cabo USB-C 1m", "Alinhamento magnético"],
    emoji: "🔋",
  },
  {
    id: "9",
    name: "Apple Watch Series 9",
    price: "R$ 3.499",
    category: "Acessório",
    description:
      "Monitoramento avançado de saúde com sensor de temperatura, ECG e oxímetro de pulso.",
    specs: ["Chip S9 SiP", "Tela Always-On", "ECG + SpO2", "GPS + Celular"],
    badge: "Destaque",
    emoji: "⌚",
  },
  {
    id: "10",
    name: "Samsung Galaxy Tab S9",
    price: "R$ 5.299",
    category: "Tablet",
    description:
      "Tablet premium com tela AMOLED 120Hz, S Pen incluída e processador Snapdragon 8 Gen 2.",
    specs: ["Snapdragon 8 Gen 2", "Tela 11\" AMOLED 120Hz", "S Pen incluída", "IP68"],
    emoji: "📱",
  },
];

export const CATEGORIES = ["Todos", "Smartphone", "Acessório", "Computador", "Tablet"] as const;
export type CategoryFilter = (typeof CATEGORIES)[number];
