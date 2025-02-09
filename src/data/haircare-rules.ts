export const HAIRCARE_RULES = [
  {
    id: "hair-type",
    name: "Hair Type Classification",
    requirement:
      "Analyze hair type (straight, wavy, curly, coily) using standard hair typing system. Assess curl pattern, strand thickness, and overall texture characteristics.",
  },
  {
    id: "scalp-condition",
    name: "Scalp Health Assessment",
    requirement:
      "Evaluate scalp condition including oiliness, dryness, flaking, redness, or irritation. Check for signs of dandruff, seborrheic dermatitis, or other scalp concerns.",
  },
  {
    id: "hair-density",
    name: "Hair Density & Volume",
    requirement:
      "Assess hair density, thickness of individual strands, and overall volume. Evaluate areas of thinning or loss and distribution of hair across the scalp.",
  },
  {
    id: "moisture-level",
    name: "Moisture & Hydration",
    requirement:
      "Analyze hair's moisture content, signs of dryness, brittleness, or dehydration. Check for moisture-protein balance and hair's ability to retain hydration.",
  },
  {
    id: "damage-assessment",
    name: "Damage Evaluation",
    requirement:
      "Identify signs of damage including split ends, breakage, chemical damage, heat damage, and overall hair shaft integrity.",
  },
  {
    id: "porosity",
    name: "Hair Porosity",
    requirement:
      "Determine hair porosity levels (low, medium, high) by assessing how hair absorbs and retains moisture. Check for signs of high or low porosity characteristics.",
  },
  {
    id: "color-condition",
    name: "Color & Treatment Status",
    requirement:
      "Evaluate current hair color, signs of color damage, fading, or brassiness. Assess previous chemical treatments and their impact on hair health.",
  },
  {
    id: "elasticity",
    name: "Hair Elasticity",
    requirement:
      "Assess hair's elasticity, bounce, and ability to return to its natural state. Check for signs of protein deficiency or overload.",
  },
  {
    id: "frizz-manageability",
    name: "Frizz & Manageability",
    requirement:
      "Analyze frizz levels, hair manageability, and response to humidity. Evaluate overall hair behavior and styling challenges.",
  },
  {
    id: "growth-patterns",
    name: "Growth Patterns",
    requirement:
      "Examine hair growth patterns, including direction, cowlicks, and any irregular growth. Identify areas of concern for growth or density.",
  },
  {
    id: "shine-luster",
    name: "Shine & Luster",
    requirement:
      "Evaluate natural shine, light reflection, and overall hair vitality. Check for dullness or loss of natural luster.",
  },
  {
    id: "breakage-patterns",
    name: "Breakage Assessment",
    requirement:
      "Identify patterns of breakage, weak points, and areas prone to damage. Assess overall hair strength and resilience.",
  },
  {
    id: "scalp-circulation",
    name: "Scalp Circulation",
    requirement:
      "Assess scalp blood circulation, follicle health, and signs of inflammation or poor circulation that might affect hair growth.",
  },
  {
    id: "styling-damage",
    name: "Styling Impact",
    requirement:
      "Evaluate impact of current styling practices, heat tool usage, and daily manipulation on hair health. Identify styling-related damage or stress.",
  },
  {
    id: "environmental-damage",
    name: "Environmental Effects",
    requirement:
      "Assess damage from environmental factors like sun exposure, chlorine, hard water, or pollution. Evaluate protective needs against environmental stressors.",
  },
  {
    id: "chemical-processing",
    name: "Chemical Processing History",
    requirement:
      "Evaluate the impact and history of chemical treatments, including coloring, perming, or relaxing.",
  },
  {
    id: "heat-styling-impact",
    name: "Heat Styling Assessment",
    requirement:
      "Analyze the effects of heat styling tools and frequency of heat exposure on hair health.",
  },
  {
    id: "protein-moisture-balance",
    name: "Protein-Moisture Balance",
    requirement:
      "Assess the balance between protein and moisture levels to determine hair strength and elasticity.",
  },
  {
    id: "scalp-microbiome",
    name: "Scalp Microbiome",
    requirement:
      "Evaluate scalp microbiome health through visible signs of bacterial or fungal imbalance.",
  },
  {
    id: "water-quality-impact",
    name: "Water Quality Effects",
    requirement:
      "Analyze impact of water quality (hard water, chlorine, minerals) on hair and scalp health.",
  },
] as const;

export type HairCareRule = (typeof HAIRCARE_RULES)[number];
