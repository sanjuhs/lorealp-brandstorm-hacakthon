type ProductType = "skincare" | "haircare" | "both";
type Concern =
  // Skin concerns
  | "aging"
  | "acne"
  | "pigmentation"
  | "dryness"
  | "oiliness"
  | "sensitivity"
  | "dullness"
  | "pores"
  | "dark-circles"
  // Hair concerns
  | "hair-loss"
  | "dandruff"
  | "frizz"
  | "split-ends"
  | "color-damage"
  | "scalp-issues"
  | "thinning"
  | "breakage"
  | "damage"
  | "dryness";

type SkinType = "oily" | "dry" | "combination" | "normal" | "sensitive";
type HairType = "straight" | "wavy" | "curly" | "coily";

export const LOREAL_PRODUCTS: LorealProduct[] = [
  {
    id: "revitalift-filler",
    name: "Revitalift Filler",
    type: "skincare" as ProductType,
    category: "serum",
    description: "Hyaluronic Acid Anti-Wrinkle Serum",
    concerns: ["aging", "dryness"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    keyIngredients: ["hyaluronic-acid", "vitamin-c"],
    benefits: ["Reduces fine lines", "Plumps skin", "Improves hydration"],
    matchingRules: ["aging-signs", "hydration-level"],
    imageUrl: "/images/loreal/revitalift-filler.jpg",
    price: 29.99,
  },
  {
    id: "hyaluron-expert",
    name: "Hyaluron Expert Pure Hyaluronic Acid Serum",
    type: "skincare" as ProductType,
    category: "serum",
    description: "Pure Hyaluronic Acid for Deep Hydration",
    concerns: ["dryness", "dullness"],
    suitableFor: {
      skinTypes: ["all"],
      hairTypes: [],
    },
    keyIngredients: ["hyaluronic-acid"],
    benefits: ["Deep hydration", "Plumping effect", "Improves skin texture"],
    matchingRules: ["hydration-level", "skin-tone"],
    imageUrl: "/images/loreal/hyaluron-expert.jpg",
    price: 32.99,
  },
  {
    id: "elvive-bond-repair",
    name: "Elvive Bond Repair Treatment",
    type: "haircare" as ProductType,
    category: "treatment",
    description: "Pre-Shampoo Bond Strengthening Treatment",
    concerns: ["breakage", "damage", "split-ends"],
    suitableFor: {
      skinTypes: [],
      hairTypes: ["all"],
    },
    keyIngredients: ["citric-acid", "protein-complex"],
    benefits: ["Strengthens hair bonds", "Reduces breakage", "Repairs damage"],
    matchingRules: ["damage-assessment", "breakage-patterns"],
    imageUrl: "/images/loreal/elvive-bond-repair.jpg",
    price: 24.99,
  },
  {
    id: "serie-expert-scalp",
    name: "Serie Expert Scalp Advanced",
    type: "haircare" as ProductType,
    category: "treatment",
    description: "Advanced Scalp Care Treatment",
    concerns: ["scalp-issues", "dandruff", "oiliness"],
    suitableFor: {
      skinTypes: [],
      hairTypes: ["all"],
    },
    keyIngredients: ["zinc-pyrithione", "salicylic-acid"],
    benefits: ["Balances scalp", "Reduces dandruff", "Soothes irritation"],
    matchingRules: ["scalp-condition", "scalp-circulation"],
    imageUrl: "/images/loreal/serie-expert-scalp.jpg",
    price: 27.99,
  },
]; /* remove as const */

// Type definitions for better type safety and autocompletion
export interface LorealProduct {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  description: string;
  concerns: Concern[];
  suitableFor: {
    skinTypes: (SkinType | "all")[];
    hairTypes: (HairType | "all")[];
  };
  keyIngredients: string[];
  benefits: string[];
  matchingRules: string[];
  imageUrl: string;
  price: number;
}

// Helper function to find products by concern
export function findProductsByConcern(concern: Concern): LorealProduct[] {
  return LOREAL_PRODUCTS.filter((product) =>
    product.concerns.includes(concern)
  );
}

// Helper function to find products by rule
export function findProductsByRule(ruleId: string): LorealProduct[] {
  return LOREAL_PRODUCTS.filter((product) =>
    product.matchingRules.includes(ruleId)
  );
}

// Helper function to find products by type and concern
export function findProductsByTypeAndConcern(
  type: ProductType,
  concern: Concern
): LorealProduct[] {
  return LOREAL_PRODUCTS.filter(
    (product) => product.type === type && product.concerns.includes(concern)
  );
}
