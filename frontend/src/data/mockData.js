export const HERO_BANNERS = [
  {
    id: 1,
    title: "AI MUSCLE BUILDER",
    subtitle: "AI POWERED",
    category: "AI POWERED",
    description: "Smart workouts. Personalized nutrition. 6-week transformation program.",
    image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=1600&v=2",
    color: "#FF5F04",
    cta: "Start Muscle Plan",
    features: [
      { label: "AI Workouts", sub: "Personalized", icon: "Activity" },
      { label: "Protein Plan", sub: "Included", icon: "Target" },
      { label: "Track Progress", sub: "In Real-Time", icon: "TrendingUp" }
    ],
    cardFeatures: ["Smart AI Workouts", "Protein Plan Included", "6-Week Transformation"],
    stats: { weeks: "6", kcal: "350-500", level: "Intermediate" }
  },
  {
    id: 2,
    title: "ELITE FAT BURN PROTOCOL",
    subtitle: "FAT BURN",
    category: "FAT BURN",
    description: "High-intensity cardio combined with science-backed nutrition for rapid fat loss.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=75&v=2",
    color: "#D7FF00",
    cta: "Join Fat Burn",
    features: [
      { label: "HIIT System", sub: "Intense", icon: "Flame" },
      { label: "Calorie Sync", sub: "Daily", icon: "Activity" },
      { label: "Smart Recovery", sub: "AI Guided", icon: "Zap" }
    ],
    cardFeatures: ["HIIT + Cardio System", "Daily Calorie Tracking", "Smart Recovery Tips"],
    stats: { weeks: "4", kcal: "600-800", level: "Beginner" }
  },
  {
    id: 3,
    title: "BIOSYNC NUTRITION PLAN",
    subtitle: "NUTRITION",
    category: "NUTRITION",
    description: "Personalized diet planning calibrated to your unique metabolic fingerprint.",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=1600&v=2",
    color: "#9D50FF",
    cta: "View Diet Plan",
    features: [
      { label: "Diet Planner", sub: "Personalized", icon: "Utensils" },
      { label: "Macro Tracking", sub: "Real-time", icon: "Target" },
      { label: "Hydration", sub: "Reminders", icon: "Zap" }
    ],
    cardFeatures: ["Personalized Diet Planner", "Macro & Calorie Tracking", "Water Intake Reminders"],
    stats: { weeks: "30 Days", kcal: "2000-2500", level: "All Levels" }
  },
  {
    id: 4,
    title: "PRO ATHLETE TRAINING",
    subtitle: "PERFORMANCE",
    category: "SPORTS",
    description: "Elite conditioning protocols used by world-class athletes and pro sports teams.",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1600&q=75&v=2",
    color: "#2E5BFF",
    cta: "Train Like Pro",
    features: [
      { label: "Speed & Agility", sub: "Advanced", icon: "Zap" },
      { label: "Performance", sub: "Analytics", icon: "Activity" },
      { label: "Trainer Drills", sub: "Guided", icon: "Target" }
    ],
    cardFeatures: ["Speed, Stamina, Agility", "Performance Analytics", "Trainer-Guided Drills"],
    stats: { weeks: "8", kcal: "400-600", level: "Advanced" }
  },
  {
    id: 5,
    title: "RECOVERY & MOBILITY ENGINE",
    subtitle: "RECOVERY",
    category: "RECOVERY",
    description: "Complete regeneration system combining mobility, sleep science, and injury prevention.",
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=1600&v=2",
    color: "#FFB800",
    cta: "Start Recovery",
    features: [
      { label: "Stretching", sub: "& Mobility", icon: "Activity" },
      { label: "Sleep & Hydration", sub: "Sync", icon: "Zap" },
      { label: "Injury Prevention", sub: "Science", icon: "Target" }
    ],
    cardFeatures: ["Stretching & Mobility", "Sleep & Hydration", "Injury Prevention"],
    stats: { weeks: "4", kcal: "200-300", level: "All Levels" }
  }
];

export const CATEGORIES = [
  {
    id: 1,
    title: "Top Programs For You",
    data: [
      { id: 101, title: "Beast Mode Training", category: "Strength", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=75", rating: 4.8, duration: "6 Weeks", level: "Intermediate", color: "#FF5F04" },
      { id: 102, title: "AI Muscle Builder", category: "Strength", image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&w=1000", rating: 4.9, duration: "8 Weeks", level: "Advanced", color: "#FF5F04" },
      { id: 103, title: "Elite Fat Burn", category: "Cardio", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=75", rating: 4.8, duration: "4 Weeks", level: "Beginner", color: "#D7FF00" },
      { id: 104, title: "Neural HIIT Engine", category: "Cardio", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=1000&q=75", rating: 4.7, duration: "4 Weeks", level: "Intermediate", color: "#2E5BFF" },
      { id: 105, title: "Pro Conditioning Matrix", category: "Endurance", image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1000&q=75", rating: 4.9, duration: "12 Weeks", level: "Elite", color: "#2E5BFF" },
      { id: 106, title: "Marathon Blueprint", category: "Endurance", image: "https://images.pexels.com/photos/2261145/pexels-photo-2261145.jpeg?auto=compress&w=1000", rating: 4.6, duration: "16 Weeks", level: "Advanced", color: "#FF5F04" },
      { id: 107, title: "Joint Armor Protocol", category: "Mobility", image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&w=1000", rating: 4.9, duration: "3 Weeks", level: "All Levels", color: "#FFB800" },
      { id: 108, title: "Dynamic Flow Systems", category: "Mobility", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&q=75", rating: 4.5, duration: "4 Weeks", level: "Beginner", color: "#9D50FF" },
      { id: 109, title: "Zen Mastery", category: "Mindfulness", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1000&q=75", rating: 4.8, duration: "2 Weeks", level: "All Levels", color: "#9D50FF" },
      { id: 110, title: "Recovery & Breathwork", category: "Mindfulness", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000&q=75", rating: 4.7, duration: "4 Weeks", level: "All Levels", color: "#2E5BFF" }
    ]
  }
];

export const PROGRAMS = [
  ...HERO_BANNERS,
  ...CATEGORIES[0].data
];
