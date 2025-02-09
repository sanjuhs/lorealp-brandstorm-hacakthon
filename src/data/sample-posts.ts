import { Post } from "@/app/types";

export const SAMPLE_POSTS: Post[] = [
  // Analysis Posts
  {
    id: "1",
    type: "analysis",
    images: ["/samples/skin-analysis-1.jpg"],
    caption: "Getting my skin analyzed! 🔍✨",
    description:
      "Used L'Oreal's AI to check my skin health. Pretty impressed with the detailed analysis!",
    timestamp: Date.now() - 86400000, // 1 day ago
    username: "Sanjay",
    votes: { better: 12, worse: 2 },
    analysisResults: [
      {
        ruleId: "hydration",
        compliant: true,
        explanation:
          "Good hydration levels detected. Skin barrier appears healthy.",
        score: 4,
        recommendedProducts: [
          "Garnier Men Power White Anti Pollution Brightening Moisturiser",
          "Garnier Men Turbo Bright Super Serum Gel",
        ],
      },
      {
        ruleId: "texture",
        compliant: false,
        explanation:
          "Some uneven texture detected. Consider gentle exfoliation.",
        score: 3,
        recommendedProducts: ["L'Oreal Revitalift Bright Reveal Peel Pads"],
      },
    ],
    comments: [
      {
        id: "c1",
        username: "Peeyush",
        text: "Great results bro! Which moisturizer are you using?",
        timestamp: Date.now() - 82800000,
      },
    ],
  },

  // AI Edit Posts
  {
    id: "2",
    type: "ai-edit",
    images: ["/samples/hair-before.jpg", "/samples/hair-after.jpg"],
    caption: "AI helped me visualize my next hair transformation! 💇‍♂️",
    description:
      "Used the AI edit feature to see how I'd look with styled hair. What do you think?",
    timestamp: Date.now() - 172800000, // 2 days ago
    username: "Peeyush",
    votes: { better: 25, worse: 1 },
    editPrompt: "Show how my hair would look with more volume and styling",
    comments: [
      {
        id: "c2",
        username: "Sanjay",
        text: "This looks amazing! You should definitely try this style!",
        timestamp: Date.now() - 169200000,
      },
    ],
  },

  // Hair Analysis
  {
    id: "3",
    type: "analysis",
    images: ["/samples/hair-analysis.jpg"],
    caption: "Hair care journey begins! 🌟",
    description:
      "Got my hair analyzed - apparently I have type 2B waves with medium porosity!",
    timestamp: Date.now() - 259200000, // 3 days ago
    username: "Peeyush",
    votes: { better: 18, worse: 3 },
    analysisResults: [
      {
        ruleId: "hairtype",
        compliant: true,
        explanation:
          "Type 2B wavy hair with medium porosity. Good natural wave pattern.",
        score: 4,
        recommendedProducts: ["L'Oreal Elvive Wave Cream"],
      },
    ],
    comments: [
      {
        id: "c3",
        username: "Sanjay",
        text: "We have similar hair type! Let's compare routines sometime",
        timestamp: Date.now() - 255600000,
      },
    ],
  },

  // Timeline/Progress Post
  {
    id: "4",
    type: "timeline",
    images: ["/samples/skin-progress-1.jpg", "/samples/skin-progress-2.jpg"],
    caption: "3 months of consistent skincare! 🌟",
    description:
      "Left: January 2024 | Right: March 2024\nSticking to my L'Oreal routine has made such a difference!",
    timestamp: Date.now() - 345600000, // 4 days ago
    username: "Sanjay",
    votes: { better: 45, worse: 2 },
    comments: [
      {
        id: "c4",
        username: "Peeyush",
        text: "The glow up is real! 🔥",
        timestamp: Date.now() - 342000000,
      },
    ],
  },

  // More posts...
];
