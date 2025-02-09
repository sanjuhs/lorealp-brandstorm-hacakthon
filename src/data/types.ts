export type SkinType =
  // Basic Types
  | "oily"
  | "dry"
  | "combination"
  | "normal"
  // Sensitivity Level
  | "sensitive"
  // Specific Conditions
  | "acne-prone"
  | "dehydrated"
  | "mature"
  | "blemish-prone"
  | "rosacea-prone"
  | "eczema-prone"
  | "hyperpigmented"
  | "sun-damaged";

export type HairClassification = {
  // Andre Walker Hair Typing System
  type: {
    category: "1" | "2" | "3" | "4"; // Main type
    subcategory: "a" | "b" | "c"; // Subtype
    description: {
      "1": "Straight";
      "2": "Wavy";
      "3": "Curly";
      "4": "Coily";
    };
    characteristics: {
      "1a": "Fine, straight, soft";
      "1b": "Medium-straight, manageable";
      "1c": "Coarse, straight, stubborn";
      "2a": "Fine, loose waves";
      "2b": "Medium, defined waves";
      "2c": "Coarse, defined waves";
      "3a": "Loose, big curls";
      "3b": "Medium, springy curls";
      "3c": "Tight, corkscrewed curls";
      "4a": "Soft, tightly coiled S-pattern";
      "4b": "Sharp, Z-pattern angles";
      "4c": "Tight, zigzag pattern";
    };
  };
  // Additional Properties
  porosity: {
    level: "low" | "medium" | "high";
    characteristics: {
      low: "Takes long to get wet, resistant to treatments";
      medium: "Balanced moisture absorption and retention";
      high: "Absorbs moisture quickly but loses it easily";
    };
  };
  density: {
    level: "fine" | "medium" | "coarse";
    characteristics: {
      fine: "Thin strand diameter, silky texture";
      medium: "Average strand thickness";
      coarse: "Thick strand diameter, robust texture";
    };
  };
  condition: {
    state:
      | "virgin"
      | "color-treated"
      | "chemically-treated"
      | "damaged"
      | "thinning";
    treatments?: string[];
  };
};

export type ScalpCondition = {
  type: "dry" | "oily" | "combination" | "sensitive" | "flaky" | "normal";
  concerns?: Array<
    "dandruff" | "seborrheic dermatitis" | "psoriasis" | "folliculitis"
  >;
  sensitivity: "low" | "medium" | "high";
};

export type FitzpatrickScale = {
  type: "I" | "II" | "III" | "IV" | "V" | "VI";
  characteristics: {
    I: {
      color: "Pale, Fair";
      features: "Freckles, Light eyes, Light hair";
      response: "Always burns, never tans";
      melanin: "Very low";
    };
    II: {
      color: "Fair";
      features: "May have freckles, Light/hazel eyes, Blonde/brown hair";
      response: "Usually burns, tans minimally";
      melanin: "Low";
    };
    III: {
      color: "Light Brown";
      features: "Dark eyes, Dark hair";
      response: "May burn, usually tans";
      melanin: "Medium";
    };
    IV: {
      color: "Olive Brown";
      features: "Dark eyes, Dark hair";
      response: "Rarely burns, tans easily";
      melanin: "Medium-high";
    };
    V: {
      color: "Brown";
      features: "Dark eyes, Dark hair";
      response: "Very rarely burns, tans very easily";
      melanin: "High";
    };
    VI: {
      color: "Black";
      features: "Dark eyes, Dark hair";
      response: "Never burns, deeply pigmented";
      melanin: "Very high";
    };
  };
  concerns: {
    uvSensitivity: "high" | "medium" | "low";
    pigmentationRisk: "high" | "medium" | "low";
    photoaging: "high" | "medium" | "low";
  };
};

// Update SkinAnalysis type to include Fitzpatrick
export type SkinAnalysis = {
  skinType: SkinType;
  fitzpatrick: FitzpatrickScale;
  conditions: string[];
  concerns: {
    pigmentation: {
      level: "none" | "mild" | "moderate" | "severe";
      type: Array<"sun spots" | "melasma" | "post-inflammatory" | "freckles">;
    };
    // ... other concerns
  };
  melaninLevel: {
    intensity:
      | "very low"
      | "low"
      | "medium"
      | "medium-high"
      | "high"
      | "very high";
    distribution: "even" | "uneven";
  };
};
