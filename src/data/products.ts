export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  description: string;
  features: string[];
  sizes: number[];
  colors: { name: string; hex: string }[];
  discount?: string;
}

export const products: Product[] = [
  {
    id: 'sprint-elite-x',
    name: "Sprint Elite X",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570",
    category: "Running",
    description: "Experience unparalleled speed and comfort with the Sprint Elite X. Engineered for serious runners, these shoes feature our latest cushioning technology and responsive design for maximum performance.",
    features: [
      "Lightweight mesh upper for breathability",
      "Responsive foam cushioning",
      "Durable rubber outsole",
      "Reinforced heel support",
      "Reflective details for visibility"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Ocean Blue", hex: "#1E3D59" },
      { name: "Volcanic Red", hex: "#FF1E1E" },
      { name: "Shadow Black", hex: "#2C2C2C" }
    ]
  },
  {
    id: 'air-comfort-pro',
    name: "Air Comfort Pro",
    price: "$159.99",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2",
    category: "Casual",
    description: "The Air Comfort Pro redefines casual footwear with its innovative air cushioning system. Perfect for all-day wear, these shoes combine style with unmatched comfort.",
    features: [
      "Premium leather upper",
      "Air cushioning technology",
      "Memory foam insole",
      "Flexible outsole design",
      "Moisture-wicking lining"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Classic White", hex: "#FFFFFF" },
      { name: "Midnight Navy", hex: "#141E30" },
      { name: "Desert Sand", hex: "#D2B48C" }
    ]
  },
  {
    id: 'trail-blazer',
    name: "Trail Blazer",
    price: "$189.99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Running",
    description: "Conquer any terrain with the Trail Blazer. Built for adventure, these shoes feature advanced grip technology and rugged construction while maintaining exceptional comfort.",
    features: [
      "Water-resistant upper",
      "Rock protection plate",
      "High-traction outsole",
      "Reinforced toe cap",
      "Quick-lace system"
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    colors: [
      { name: "Forest Green", hex: "#228B22" },
      { name: "Granite Gray", hex: "#676767" },
      { name: "Earth Brown", hex: "#8B4513" }
    ]
  }
];