type ProductType = "skincare" | "haircare" | "both";

export interface GarnierProduct {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  description: string;
  concerns: string[];
  suitableFor: {
    skinTypes: string[];
    hairTypes: string[];
  };
  imageUrl: string;
  price: number;
  weight: number;
}

export const GARNIER_PRODUCTS: GarnierProduct[] = [
  {
    id: "light-complete-serum-cream-uv",
    name: "Light Complete Serum Cream UV",
    type: "skincare" as ProductType,
    category: "serum",
    description: "Light Complete Serum Cream UV",
    concerns: ["pigmentation", "dark-circles"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    imageUrl:
      "https://www.garnier.in/-/media/project/loreal/brand-sites/garnier/apac/in/products/light-complete/light-complete-serum-cream-uv/light-complete-serum-cream-23g/8901526005161-0.jpg?w=500&rev=e9e2532d0f7a49e9bfc0b0c44d5341a7&hash=E4EAB2C7D3563B3FAF2244A0AC7E1D34",
    price: 109,
    weight: 23,
  },
  {
    id: "acno-fight-pimple-clearing-whitening-cream",
    name: "Acno Fight Pimple Clearing Whitening Cream",
    type: "skincare" as ProductType,
    category: "cream",
    description: "Acno Fight Pimple Clearing Whitening Cream",
    concerns: ["pimples", "whitening"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    imageUrl:
      "https://www.garnier.in/-/media/project/loreal/brand-sites/garnier/apac/in/products/garnier-men/acno-fight/acno-fight-pimple-clearing-whitening-cream/spotlight-pimple-clearing-01.png?w=150&rev=c7e706a01fa4445e8c2b655b7bef0ed3&hash=A5DB354B2CE9A4B958CF7B20DEB5537E",
    price: 109,
    weight: 20,
  },
  {
    id: "anti-pimple-face-wash",
    name: "Anti Pimple Face Wash",
    type: "skincare" as ProductType,
    category: "face-wash",
    description: "Anti Pimple Face Wash",
    concerns: ["pimples"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    imageUrl:
      "https://www.garnier.in/-/media/project/loreal/brand-sites/garnier/apac/in/products/garnier-men/acno-fight/anti-pimple-face-wash/spotlight-acnofight-01.png?w=150&rev=dbbb890e5b0541c3bd0225a583695946&hash=2003D940B0ACF87C41B2FB979612C82D",
    price: 109,
    weight: 20,
  },
  {
    id: "anti-pollution-double-action-face-wash",
    name: "Anti Pollution Double Action Face Wash",
    type: "skincare" as ProductType,
    category: "face-wash",
    description: "Anti Pollution Double Action Face Wash",
    concerns: ["pollution"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    imageUrl:
      "https://www.garnier.in/-/media/project/loreal/brand-sites/garnier/apac/in/products/garnier-men/power-white/anti-pollution-double-action-face-wash/spotlight-turbobright-01.png?w=150&rev=967cad42fcb04ac297571564174b940e&hash=5B04424701D216C495E916F77F09B624",
    price: 109,
    weight: 20,
  },
  {
    id: "oil-clear-clay-d-tox",
    name: "Oil Clear Clay D-Tox",
    type: "skincare" as ProductType,
    category: "face-wash",
    description: "Oil Clear Clay D-Tox",
    concerns: ["oiliness"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    imageUrl:
      "https://www.garnier.in/about-our-brands/garnier-men/oil-clear/oil-clear-clay-d-tox",
    price: 150,
    weight: 379,
  },
  {
    id: "anti-pollution-brightening-moisturiser",
    name: "Anti Pollution Brightening Moisturiser",
    type: "skincare" as ProductType,
    category: "moisturiser",
    description: "Anti Pollution Brightening Moisturiser",
    concerns: ["pollution"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    imageUrl:
      "https://www.garnier.in/-/media/project/loreal/brand-sites/garnier/apac/in/products/garnier-men/power-white/anti---pollution-brightening-moisturiser/anti---pollution-brightening-moisturiser-50g/8901526538713-001.jpg?rev=5b90ced8e91a4af2a3c2ae6db19757f6?as=1&w=600&hash=2ECCF961D4315A1B8D72C3DD04217592",
    price: 99,
    weight: 20,
  },
  {
    id: "turbo-bright-super-serum-gel",
    name: "Turbo Bright Super Serum Gel",
    type: "skincare" as ProductType,
    category: "serum",
    description: "Turbo Bright Super Serum Gel",
    concerns: ["pollution"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    imageUrl:
      "https://www.garnier.in/about-our-brands/garnier-men/turbo-bright/turbo-bright-super-serum-gel",
    price: 599,
    weight: 30,
  },
];
