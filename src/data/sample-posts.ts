import { Post } from "@/app/types";

export const SAMPLE_POSTS: Post[] = [
  // Sanjay's Posts
  {
    id: "1",
    type: "analysis",
    images: ["/hair_data_classification/sanjay/ttc.png"],
    caption: "Getting a complete analysis of my skin and hair! 🔍",
    description:
      "Using L'Oreal's AI to understand my skin and hair better. The analysis shows I need to focus more on hydration and UV protection.",
    timestamp: Date.now() - 86400000, // 1 day ago
    username: "Sanjay",
    votes: { better: 15, worse: 2 },
    analysisResults: [
      {
        ruleId: "skincare",
        compliant: true,
        explanation:
          "Good overall skin health, but could benefit from more consistent sun protection.",
        score: 4,
        recommendedProducts: [
          "Garnier Men Power White Double Action Face Wash",
          "L'Oreal UV Perfect Super Aqua Essence",
        ],
      },
      {
        ruleId: "haircare",
        compliant: true,
        explanation: "Hair shows good strength but needs moisture balance.",
        score: 4,
        recommendedProducts: [
          "L'Oreal Serie Expert Pro Longer Lengths Renewing Cream",
        ],
      },
    ],
    comments: [
      {
        id: "c1",
        username: "Peeyush",
        text: "Great to see you taking care of both skin and hair! Which sunscreen are you using?",
        timestamp: Date.now() - 82800000,
      },
    ],
  },
  {
    id: "2",
    type: "analysis",
    images: ["/hair_data_classification/sanjay/skin.jpg"],
    caption: "Focused skin analysis today 🔎",
    description:
      "The AI detected some areas where I can improve my skincare routine. Time to level up! 💪",
    timestamp: Date.now() - 172800000,
    username: "Sanjay",
    votes: { better: 22, worse: 1 },
    analysisResults: [
      {
        ruleId: "texture",
        compliant: true,
        explanation: "Even skin texture with good cellular turnover.",
        score: 4,
        recommendedProducts: ["Garnier Men Oil Clear Clay D-Tox Face Wash"],
      },
    ],
    comments: [
      {
        id: "c2",
        username: "Peeyush",
        text: "Your skin texture looks great! What's your morning routine like?",
        timestamp: Date.now() - 169200000,
      },
    ],
  },

  // Peeyush's Posts
  {
    id: "3",
    type: "timeline",
    images: [
      "/hair_data_classification/peeyush/before.png",
      "/hair_data_classification/peeyush/after.png",
    ],
    caption: "My hair transformation journey! 💇‍♂️✨",
    description:
      "Before -> After using L'Oreal's recommended hair care routine. The difference in texture and health is amazing!",
    timestamp: Date.now() - 259200000,
    username: "Peeyush",
    votes: { better: 35, worse: 2 },
    comments: [
      {
        id: "c3",
        username: "Sanjay",
        text: "Incredible transformation! The volume improvement is really noticeable",
        timestamp: Date.now() - 255600000,
      },
    ],
  },
  {
    id: "4",
    type: "analysis",
    images: ["/hair_data_classification/peeyush/analysis.jpeg"],
    caption: "Deep dive into my hair health 🔬",
    description:
      "Used the AI analysis to understand my hair type better. Type 2A with medium porosity - now I know exactly what products to use!",
    timestamp: Date.now() - 345600000,
    username: "Peeyush",
    votes: { better: 28, worse: 1 },
    analysisResults: [
      {
        ruleId: "hairtype",
        compliant: true,
        explanation:
          "Type 2A hair with medium porosity. Good natural wave pattern with potential for more definition.",
        score: 4,
        recommendedProducts: [
          "L'Oreal Serie Expert Vitamino Color Shampoo",
          "L'Oreal Professionnel Absolut Repair Mask",
        ],
      },
    ],
    comments: [
      {
        id: "c4",
        username: "Sanjay",
        text: "The analysis is so detailed! Have you tried the recommended products yet?",
        timestamp: Date.now() - 342000000,
      },
    ],
  },
  {
    id: "5",
    type: "analysis",
    images: ["/hair_data_classification/peeyush/normal.jpeg"],
    caption: "Weekly skin checkup 🌟",
    description:
      "Regular analysis helps me track progress and adjust my routine. Loving the L'Oreal AI recommendations!",
    timestamp: Date.now() - 432000000,
    username: "Peeyush",
    votes: { better: 19, worse: 1 },
    analysisResults: [
      {
        ruleId: "hydration",
        compliant: true,
        explanation:
          "Excellent hydration levels. Skin barrier is functioning well.",
        score: 5,
        recommendedProducts: ["Garnier Men Acno Fight Anti-Pimple Face Wash"],
      },
    ],
    comments: [
      {
        id: "c5",
        username: "Sanjay",
        text: "Your skin is glowing! Need to try your routine 🔥",
        timestamp: Date.now() - 428400000,
      },
    ],
  },

  // Additional Posts
  {
    id: "6",
    type: "ai-edit",
    images: [
      "/hair_data_classification/sanjay/Screenshot 2023-09-29 at 10.51.21 PM.png",
      "/hair_data_classification/sanjay/Screenshot 2023-09-29 at 10.51.32 PM.png",
    ],
    caption: "AI helped me visualize different styling options! ✂️",
    description:
      "Used the AI to see how different hairstyles would look. Thinking of trying the second one - thoughts? 🤔",
    timestamp: Date.now() - 518400000, // 6 days ago
    username: "Sanjay",
    votes: { better: 31, worse: 2 },
    editPrompt:
      "Show how I would look with textured, styled hair with more volume",
    comments: [
      {
        id: "c6",
        username: "Peeyush",
        text: "The second style suits you perfectly! What products are you planning to use?",
        timestamp: Date.now() - 517400000,
      },
      {
        id: "c7",
        username: "Sanjay",
        text: "Thanks! Thinking of trying L'Oreal's styling range 💯",
        timestamp: Date.now() - 516400000,
      },
    ],
  },
  {
    id: "7",
    type: "analysis",
    images: [
      "/hair_data_classification/peeyush/5792d87e-0089-4cf3-9b82-b318b2e126fa.jpeg",
    ],
    caption: "Morning skincare check-in 🌅",
    description:
      "Starting the day with a fresh analysis. The Garnier face wash is really helping with oil control!",
    timestamp: Date.now() - 604800000, // 7 days ago
    username: "Peeyush",
    votes: { better: 24, worse: 1 },
    analysisResults: [
      {
        ruleId: "oilcontrol",
        compliant: true,
        explanation:
          "Significant improvement in oil control. Pores appear refined.",
        score: 5,
        recommendedProducts: [
          "Garnier Men Oil Clear Clay D-Tox",
          "Garnier Men Power White Anti Pollution Brightening Moisturiser",
        ],
      },
    ],
    comments: [
      {
        id: "c8",
        username: "Sanjay",
        text: "That Oil Clear Clay D-Tox is amazing! Been using it for a month now 💪",
        timestamp: Date.now() - 603800000,
      },
      {
        id: "c9",
        username: "Peeyush",
        text: "Game changer for sure! Have you tried their new serum?",
        timestamp: Date.now() - 602800000,
      },
    ],
  },
  {
    id: "8",
    type: "timeline",
    images: [
      "/hair_data_classification/sanjay/Screenshot 2022-01-09 at 12.05.34 AM.png",
      "/hair_data_classification/sanjay/Screenshot 2023-01-05 at 8.13.39 PM.png",
    ],
    caption: "One year of consistent skincare! 🎯",
    description:
      "Left: January 2022 | Right: January 2023\nCan't believe the difference a year of proper skincare makes! Thanks to everyone in the community for the recommendations and support! 🙏",
    timestamp: Date.now() - 691200000, // 8 days ago
    username: "Sanjay",
    votes: { better: 42, worse: 1 },
    comments: [
      {
        id: "c10",
        username: "Peeyush",
        text: "This transformation is insane! 🔥 What's been your holy grail product?",
        timestamp: Date.now() - 690200000,
      },
      {
        id: "c11",
        username: "Sanjay",
        text: "The Garnier Light Complete Serum Cream UV has been a game changer!",
        timestamp: Date.now() - 689200000,
      },
      {
        id: "c12",
        username: "Peeyush",
        text: "Need to try that one! Your skin is glowing ✨",
        timestamp: Date.now() - 688200000,
      },
    ],
  },
  {
    id: "9",
    type: "analysis",
    images: [
      "/hair_data_classification/peeyush/24fc54c4-acbe-41e3-9286-749f0fd62775.jpeg",
    ],
    caption: "Post-workout skin analysis 💪",
    description:
      "Checking how my skin reacts after an intense workout. The Acno Fight face wash keeps those post-workout breakouts away!",
    timestamp: Date.now() - 777600000, // 9 days ago
    username: "Peeyush",
    votes: { better: 27, worse: 2 },
    analysisResults: [
      {
        ruleId: "acne",
        compliant: true,
        explanation:
          "Excellent pore cleansing and no signs of workout-induced acne.",
        score: 5,
        recommendedProducts: [
          "Garnier Men Acno Fight Anti-Pimple Face Wash",
          "Garnier Men Acno Fight Pimple Clearing Whitening Cream",
        ],
      },
    ],
    comments: [
      {
        id: "c13",
        username: "Sanjay",
        text: "Drop that post-workout skincare routine! 👊",
        timestamp: Date.now() - 776600000,
      },
      {
        id: "c14",
        username: "Peeyush",
        text: "Will make a detailed post soon! The Acno Fight range is key though 🔑",
        timestamp: Date.now() - 775600000,
      },
    ],
  },
  {
    id: "10",
    type: "analysis",
    subtype: "in-depth",
    images: ["/hair_data_classification/sanjay/skin_hair_analysis.jpg"],
    caption: "Complete In-Depth Hair & Skin Analysis 🔬📊",
    description:
      "Comprehensive analysis using Fitzpatrick Scale and Andre Walker Hair Typing System. This detailed report includes both skin and hair characteristics with personalized recommendations.",
    timestamp: Date.now() - 864000000,
    username: "Sanjay",
    votes: { better: 48, worse: 1 },
    analysisResults: [
      {
        ruleId: "fitzpatrick",
        compliant: true,
        explanation: "Fitzpatrick Type IV - Medium Brown Skin",
        score: 5,
        details: {
          characteristics: [
            "Minimal to moderate sun sensitivity",
            "Tans easily, burns minimally",
            "Natural skin tone is medium brown",
            "Melanin production is relatively active",
          ],
          recommendations: [
            "SPF 30+ sunscreen daily",
            "Regular hyperpigmentation monitoring",
            "Gentle exfoliation 2-3 times weekly",
          ],
          risks: [
            "Post-inflammatory hyperpigmentation",
            "Uneven skin tone",
            "Moderate sun damage risk",
          ],
        },
        recommendedProducts: [
          "Garnier Light Complete Serum Cream UV",
          "Garnier Men Power White Anti Pollution Brightening Moisturiser",
        ],
      },
      {
        ruleId: "andre-walker",
        compliant: true,
        explanation: "Type 2B - Wavy Hair Pattern",
        score: 4,
        details: {
          hairCharacteristics: {
            type: "2B",
            pattern: "Wavy",
            texture: "Medium to coarse",
            density: "Medium to high",
            porosity: "Medium",
            elasticity: "Good",
          },
          wavePattern: {
            description: "S-shaped waves forming throughout hair shaft",
            features: [
              "Waves begin from mid-length",
              "Defined S-pattern",
              "Moderate volume at roots",
            ],
          },
          careNeeds: [
            "Moisture-protein balance",
            "Anti-frizz protection",
            "Heat protection when styling",
            "Regular deep conditioning",
          ],
        },
        recommendedProducts: [
          "L'Oreal Serie Expert Pro Longer Lengths Renewing Cream",
          "L'Oreal Professionnel Absolut Repair Mask",
        ],
      },
      {
        ruleId: "skin-analysis",
        compliant: true,
        explanation: "Combination Skin with T-Zone Concerns",
        score: 4,
        details: {
          skinCharacteristics: {
            type: "Combination",
            concerns: ["T-zone oiliness", "Occasional dryness on cheeks"],
            strengths: ["Good elasticity", "Minimal fine lines"],
            sensitivities: ["Moderate", "Some reaction to harsh chemicals"],
          },
          barrierHealth: {
            status: "Good",
            notes: "Slight compromise in T-zone area",
          },
          hydrationLevel: {
            status: "Moderate",
            distribution: "Uneven between T-zone and cheeks",
          },
        },
        recommendedProducts: [
          "Garnier Men Oil Clear Clay D-Tox",
          "Garnier Men Acno Fight Anti-Pimple Face Wash",
        ],
      },
    ],
    actionableInsights: {
      immediate: [
        "Start with double cleansing routine",
        "Incorporate weekly clay mask for T-zone",
        "Use leave-in conditioner for wave definition",
        "Apply SPF 30+ every morning",
      ],
      shortTerm: [
        "Establish protein treatment schedule",
        "Balance moisture levels with hydrating toner",
        "Protect waves with silk pillowcase",
        "Monitor hyperpigmentation weekly",
      ],
      longTerm: [
        "Build heat-free styling routine",
        "Develop seasonal skincare adaptations",
        "Regular trim schedule every 8-10 weeks",
        "Maintain skin barrier health",
      ],
    },
    comments: [
      {
        id: "c15",
        username: "Peeyush",
        text: "This is incredibly detailed! The Fitzpatrick scale analysis really helps understand sun protection needs 🌞",
        timestamp: Date.now() - 863000000,
      },
      {
        id: "c16",
        username: "Sanjay",
        text: "Thanks! The Andre Walker typing was eye-opening - finally understanding why certain products work better 🙌",
        timestamp: Date.now() - 862000000,
      },
      {
        id: "c17",
        username: "Peeyush",
        text: "How long did the whole analysis take? The actionable insights are super helpful!",
        timestamp: Date.now() - 861000000,
      },
    ],
  },
];
