export const SKINCARE_RULES = [
  {
    id: "skin-type",
    name: "Skin Type Analysis",
    requirement:
      "Analyze skin type (oily, dry, combination, normal) by examining sebum levels, pore visibility, and skin surface texture. Look for signs of oiliness in T-zone, dry patches, or combination characteristics.",
  },
  {
    id: "hydration-level",
    name: "Hydration Assessment",
    requirement:
      "Evaluate skin hydration by checking for plumpness, bounce, fine lines caused by dehydration, and overall moisture levels. Assess if skin appears dull or shows signs of dehydration.",
  },
  {
    id: "texture-analysis",
    name: "Texture & Pores",
    requirement:
      "Examine skin texture, pore size and visibility, roughness, and surface irregularities. Check for enlarged pores, congestion, and textural inconsistencies.",
  },
  {
    id: "acne-assessment",
    name: "Acne & Blemishes",
    requirement:
      "Identify types of acne (papules, pustules, cysts), blemishes, blackheads, and post-acne marks. Assess severity and distribution of breakouts.",
  },
  {
    id: "pigmentation",
    name: "Pigmentation Analysis",
    requirement:
      "Analyze dark spots, sun damage, melasma, post-inflammatory hyperpigmentation, and overall tone evenness. Check for intensity and distribution of pigmentation.",
  },
  {
    id: "aging-signs",
    name: "Aging Indicators",
    requirement:
      "Evaluate fine lines, wrinkles, loss of firmness, and other age-related concerns. Assess depth of wrinkles and areas showing signs of aging.",
  },
  {
    id: "sensitivity",
    name: "Sensitivity & Redness",
    requirement:
      "Check for signs of skin sensitivity, redness, inflammation, broken capillaries, and reactive tendencies. Assess overall skin tolerance level.",
  },
  {
    id: "barrier-health",
    name: "Skin Barrier Function",
    requirement:
      "Evaluate skin barrier health by checking for signs of damage, sensitivity, or compromised protection. Look for inflammation, excessive sensitivity, or barrier disruption.",
  },
  {
    id: "eye-area",
    name: "Eye Area Concerns",
    requirement:
      "Analyze under-eye concerns including dark circles, puffiness, fine lines, and overall eye area health. Check for specific eye-area aging signs.",
  },
  {
    id: "sun-damage",
    name: "Sun Damage Assessment",
    requirement:
      "Identify signs of UV damage, including sunspots, premature aging, and UV-related texture changes. Evaluate overall sun damage impact.",
  },
  {
    id: "glow-vitality",
    name: "Skin Radiance",
    requirement:
      "Assess skin's natural glow, dullness levels, and overall vitality. Check for signs of fatigue and lack of radiance.",
  },
  {
    id: "scarring",
    name: "Scarring Analysis",
    requirement:
      "Evaluate presence and type of scarring, including acne scars, texture irregularities, and other marks. Assess depth and characteristics of scars.",
  },
  {
    id: "moisture-balance",
    name: "Oil-Moisture Balance",
    requirement:
      "Analyze the balance between oil production and moisture levels across different facial zones. Check for combination patterns.",
  },
  {
    id: "pore-congestion",
    name: "Pore Congestion",
    requirement:
      "Assess level of pore congestion, blackheads, and sebum buildup. Evaluate overall pore health and cleanliness.",
  },
  {
    id: "skin-tone",
    name: "Tone & Clarity",
    requirement:
      "Evaluate overall skin tone, clarity, and translucency. Check for dullness, uneven tone, and clarity issues.",
  },
  {
    id: "skin-microbiome",
    name: "Microbiome Balance",
    requirement:
      "Assess skin microbiome health through visible signs of bacterial imbalance, inflammation, or barrier disruption.",
  },
  {
    id: "hormonal-patterns",
    name: "Hormonal Patterns",
    requirement:
      "Identify patterns of hormonal breakouts, cyclical skin changes, and hormone-related pigmentation.",
  },
  {
    id: "environmental-defense",
    name: "Environmental Protection",
    requirement:
      "Evaluate skin's defense against environmental stressors, pollution damage, and blue light exposure.",
  },
  {
    id: "skin-resilience",
    name: "Skin Resilience",
    requirement:
      "Assess skin's ability to recover from stress, environmental damage, and maintain homeostasis.",
  },
] as const;

export type SkinCareRule = (typeof SKINCARE_RULES)[number];
