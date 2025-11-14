export interface Gradient {
  id: string;
  name: string;
  colors: string[];
  direction?: string;
  css: string;
  description?: string;
  tags?: string[];
}

// Color mapping for hex codes to color names
const colorMap: { [key: string]: string[] } = {
    // Reds and Pinks
    '#ff0084': ['magenta', 'pink', 'hot pink'],
    '#f953c6': ['fuchsia', 'pink', 'magenta'],
    '#ee9ca7': ['dusty rose', 'pink', 'coral'],
    '#ffdde1': ['pale pink', 'light pink', 'blush'],
    '#c31432': ['crimson', 'red', 'burgundy'],
    '#dd3e54': ['rose', 'red', 'coral'],
    '#f12711': ['orange red', 'flame', 'scarlet'],
    '#e94057': ['coral red', 'pink', 'salmon'],
    '#b92b27': ['dark red', 'burgundy', 'maroon'],
    '#cc2b5e': ['raspberry', 'pink', 'magenta'],
    '#c33764': ['purple red', 'magenta', 'plum'],
    '#fc466b': ['coral', 'pink', 'salmon'],
    '#fc5c7d': ['coral pink', 'salmon', 'rose'],
    '#e55d87': ['rose pink', 'coral', 'pink'],
    '#f15f79': ['coral', 'pink', 'salmon'],
    '#b24592': ['plum', 'purple', 'magenta'],
    '#ff9a9e': ['coral', 'pink', 'peach'],
    
    // Blues
    '#2193b0': ['ocean blue', 'blue', 'teal'],
    '#6dd5ed': ['sky blue', 'cyan', 'light blue'],
    '#2980b9': ['royal blue', 'blue', 'cobalt'],
    '#6bb8f4': ['light blue', 'sky blue', 'periwinkle'],
    '#373b44': ['dark blue', 'navy', 'charcoal'],
    '#4286f4': ['bright blue', 'blue', 'azure'],
    '#12c2e9': ['cyan', 'turquoise', 'aqua'],
    '#1565c0': ['sapphire', 'blue', 'cobalt'],
    '#009ffd': ['azure', 'blue', 'cyan'],
    '#2a2a72': ['navy', 'dark blue', 'midnight'],
    '#1a2980': ['navy blue', 'dark blue', 'royal'],
    '#26d0ce': ['turquoise', 'cyan', 'aqua'],
    '#5fc3e4': ['sky blue', 'cyan', 'light blue'],
    '#1e3c72': ['navy', 'dark blue', 'royal'],
    '#2a5298': ['royal blue', 'blue', 'sapphire'],
    '#3f5efb': ['electric blue', 'blue', 'violet'],
    '#6a82fb': ['periwinkle', 'blue', 'lavender'],
    '#108dc7': ['ocean blue', 'blue', 'teal'],
    '#457fca': ['blue', 'royal blue', 'azure'],
    '#5691c8': ['light blue', 'sky blue', 'periwinkle'],
    '#2196f3': ['blue', 'azure', 'sky blue'],
    '#70e1f5': ['cyan', 'turquoise', 'aqua'],
    
    // Greens
    '#30e8bf': ['turquoise', 'mint', 'teal'],
    '#99f2c8': ['mint green', 'light green', 'seafoam'],
    '#1f4037': ['dark green', 'forest green', 'emerald'],
    '#6be585': ['lime green', 'bright green', 'neon green'],
    '#2ebf91': ['teal', 'green', 'mint'],
    '#11998e': ['teal', 'green', 'emerald'],
    '#38ef7d': ['lime', 'bright green', 'neon'],
    '#3ca55c': ['forest green', 'green', 'emerald'],
    
    // Purples
    '#764ba2': ['purple', 'plum', 'violet'],
    '#667eea': ['periwinkle', 'lavender', 'blue purple'],
    '#753a88': ['purple', 'plum', 'violet'],
    '#8360c3': ['amethyst', 'purple', 'violet'],
    '#7f7fd5': ['lavender', 'purple', 'periwinkle'],
    '#86a8e7': ['periwinkle', 'lavender', 'light purple'],
    '#91eae4': ['aqua', 'mint', 'cyan'],
    '#c471ed': ['violet', 'purple', 'magenta'],
    '#654ea3': ['royal purple', 'purple', 'violet'],
    '#eaafc8': ['light pink', 'rose', 'blush'],
    '#8a2387': ['purple', 'plum', 'magenta'],
    '#7209b7': ['purple', 'violet', 'magenta'],
    '#240b36': ['dark purple', 'plum', 'eggplant'],
    '#1d2671': ['dark blue purple', 'navy', 'indigo'],
    
    // Oranges and Yellows
    '#ff8235': ['orange', 'tangerine', 'coral'],
    '#f5af19': ['golden yellow', 'amber', 'gold'],
    '#f64f59': ['coral', 'orange red', 'salmon'],
    '#f7797d': ['coral', 'salmon', 'peach'],
    '#fbd786': ['golden yellow', 'cream', 'butter'],
    '#f4791f': ['orange', 'tangerine', 'amber'],
    '#ef8e38': ['orange', 'amber', 'golden'],
    '#f05053': ['coral', 'salmon', 'orange red'],
    '#f27121': ['orange', 'tangerine', 'flame'],
    '#ffd194': ['cream', 'pale yellow', 'butter'],
    
    // Grays and Neutrals
    '#bdc3c7': ['light gray', 'silver', 'platinum'],
    '#2c3e50': ['charcoal', 'dark gray', 'slate'],
    '#33001b': ['dark burgundy', 'maroon', 'wine'],
    '#203a43': ['dark teal', 'charcoal', 'slate'],
    '#2c5364': ['teal gray', 'slate', 'charcoal'],
    '#0f2027': ['black', 'charcoal', 'midnight'],
    '#659999': ['teal gray', 'sage', 'muted teal'],
    '#003973': ['midnight blue', 'navy', 'dark blue'],
    '#e5e5be': ['cream', 'pale yellow', 'ivory'],
    '#b5ac49': ['olive', 'yellow green', 'chartreuse'],
    '#e1eec3': ['pale green', 'mint cream', 'light green'],
    
    // Pastels and Light Colors
    '#c6ffdd': ['mint cream', 'pale mint', 'light green'],
    '#fecfef': ['pale pink', 'light pink', 'blush'],
    '#fed6e3': ['light pink', 'blush', 'pale rose'],
    '#a8edea': ['mint', 'pale turquoise', 'seafoam'],
    '#d299c2': ['orchid', 'pale purple', 'lavender'],
    '#fef9d7': ['cream', 'ivory', 'vanilla'],
    '#c1c161': ['olive yellow', 'sage', 'chartreuse'],
    '#d4d4aa': ['sage', 'pale olive', 'light green'],
    
    // Additional colors for missing gradients
    '#aa4b6b': ['dusty rose', 'mauve', 'pink'],
    '#6b6b83': ['gray purple', 'lavender gray', 'muted purple'],
    '#3b8d99': ['teal', 'blue green', 'turquoise'],
    '#b91d73': ['burgundy pink', 'deep rose', 'wine red']
};

// Utility function to get color names from hex codes  
const getColorTags = (colors: string[]): string[] => {
  const tags: string[] = [];
  colors.forEach(color => {
    if (colorMap[color]) {
      tags.push(...colorMap[color]);
    }
  });
  
  // Remove duplicates and return
  return [...new Set(tags)];
};

// Function to get the primary color name for a single hex color
export const getColorName = (hexColor: string): string => {
  if (colorMap[hexColor]) {
    return colorMap[hexColor][0]; // Return the first (primary) color name
  }
  return hexColor; // Return hex if no mapping found
};

// Function to get hex color from color name (reverse lookup)
export const getHexFromColorName = (colorName: string): string | null => {
  const normalizedName = colorName.toLowerCase();
  
  for (const [hex, names] of Object.entries(colorMap)) {
    if (names.some(name => name.toLowerCase() === normalizedName)) {
      return hex;
    }
  }
  
  return null; // Return null if no hex found for the color name
};

export const gradients: Gradient[] = [
  {
    id: "NEW-001",
    name: "Quantum Flux",
    colors: ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff006e, #8338ec, #3a86ff, #06ffa5);",
    description: "Reality bending through dimensions of electric magenta, cosmic purple, digital blue, and quantum mint.",
    tags: ['magenta', 'hot pink', 'purple', 'violet', 'blue', 'electric blue', 'mint', 'cyan']
  },
  {
    id: "NEW-002",
    name: "Holographic Dreams",
    colors: ["#b794f6", "#f093fb", "#4facfe", "#43e97b"],
    direction: "to right",
    css: "background: linear-gradient(to right, #b794f6, #f093fb, #4facfe, #43e97b);",
    description: "Shimmering holographic visions dancing through lavender mist, magenta light, azure streams, and emerald glow.",
    tags: ['lavender', 'purple', 'magenta', 'pink', 'blue', 'sky blue', 'green', 'emerald']
  },
  {
    id: "NEW-003",
    name: "Neon Genesis",
    colors: ["#ff0080", "#ff8c00", "#00ff80", "#0080ff"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff0080, #ff8c00, #00ff80, #0080ff);",
    description: "Genesis of electric life pulsing through hot pink energy, orange flame, lime lightning, and cyber blue.",
    tags: ['hot pink', 'magenta', 'orange', 'tangerine', 'lime', 'bright green', 'blue', 'electric blue']
  },
  {
    id: "NEW-004",
    name: "Astral Projection",
    colors: ["#667eea", "#764ba2", "#c471ed", "#f64f59"],
    direction: "to right",
    css: "background: linear-gradient(to right, #667eea, #764ba2, #c471ed, #f64f59);",
    description: "Soul traveling through periwinkle galaxies, violet nebulae, amethyst dimensions, and coral starbursts.",
    tags: ['periwinkle', 'blue', 'purple', 'violet', 'amethyst', 'magenta', 'coral', 'pink']
  },
  {
    id: "NEW-005",
    name: "Digital Euphoria",
    colors: ["#00d4ff", "#5b86e5", "#36d1dc", "#b721ff"],
    direction: "to right",
    css: "background: linear-gradient(to right, #00d4ff, #5b86e5, #36d1dc, #b721ff);",
    description: "Euphoric data streams flowing through cyan circuits, blue networks, turquoise signals, and purple code.",
    tags: ['cyan', 'turquoise', 'blue', 'periwinkle', 'aqua', 'mint', 'purple', 'violet']
  },
  {
    id: "NEW-006",
    name: "Phoenix Rising",
    colors: ["#ff4081", "#ff6ec7", "#c471f5", "#9c88ff"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff4081, #ff6ec7, #c471f5, #9c88ff);",
    description: "Mythical phoenix ascending through rose fire, magenta flames, violet wings, and lavender smoke.",
    tags: ['rose', 'pink', 'magenta', 'fuchsia', 'violet', 'purple', 'lavender', 'periwinkle']
  },
  {
    id: "NEW-007",
    name: "Cosmic Drift",
    colors: ["#134e5e", "#71b280", "#fbc2eb", "#a6c1ee"],
    direction: "to right",
    css: "background: linear-gradient(to right, #134e5e, #71b280, #fbc2eb, #a6c1ee);",
    description: "Drifting through dark teal voids, emerald moons, cotton candy clouds, and periwinkle infinity.",
    tags: ['dark teal', 'navy', 'green', 'emerald', 'light pink', 'cotton candy', 'periwinkle', 'blue']
  },
  {
    id: "NEW-008",
    name: "Liquid Lightning",
    colors: ["#667eea", "#764ba2", "#f093fb", "#43e97b"],
    direction: "to right",
    css: "background: linear-gradient(to right, #667eea, #764ba2, #f093fb, #43e97b);",
    description: "Electric storms crystallizing into periwinkle bolts, purple thunder, magenta energy, and lime sparks.",
    tags: ['periwinkle', 'blue', 'purple', 'violet', 'magenta', 'pink', 'lime', 'bright green']
  },
  {
    id: "NEW-009",
    name: "Velvet Cosmos",
    colors: ["#2c1810", "#8b4513", "#daa520", "#ffd700"],
    direction: "to right",
    css: "background: linear-gradient(to right, #2c1810, #8b4513, #daa520, #ffd700);",
    description: "Luxurious cosmic velvet transitioning from dark chocolate depths to golden starlight brilliance.",
    tags: ['dark brown', 'chocolate', 'saddle brown', 'golden', 'amber', 'gold', 'yellow']
  },
  {
    id: "NEW-010",
    name: "Ethereal Pulse",
    colors: ["#ffecd2", "#fcb69f", "#ff9a9e", "#fecfef"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ffecd2, #fcb69f, #ff9a9e, #fecfef);",
    description: "Gentle pulse of ethereal energy flowing through cream whispers, peach dreams, coral breath, and pink mist.",
    tags: ['cream', 'ivory', 'peach', 'coral', 'pink', 'rose', 'light pink', 'blush']
  },
  {
    id: "NEW-011",
    name: "Cyber Storm",
    colors: ["#0f0f23", "#ff006e", "#00f5ff", "#39ff14"],
    direction: "to right",
    css: "background: linear-gradient(to right, #0f0f23, #ff006e, #00f5ff, #39ff14);",
    description: "Digital hurricane brewing from midnight code through magenta lightning, cyan rain, and neon green aftermath.",
    tags: ['black', 'dark navy', 'magenta', 'hot pink', 'cyan', 'electric blue', 'neon green', 'lime']
  },
  {
    id: "NEW-012",
    name: "Aurora Borealis",
    colors: ["#134e5e", "#71b280", "#a8e6a1", "#88d8c0"],
    direction: "to right",
    css: "background: linear-gradient(to right, #134e5e, #71b280, #a8e6a1, #88d8c0);",
    description: "Northern lights painting the night sky from deep teal mystery through emerald dance to mint magic.",
    tags: ['dark teal', 'navy', 'green', 'emerald', 'mint green', 'light green', 'seafoam', 'aqua']
  },
  {
    id: "NEW-013",
    name: "Galactic Core",
    colors: ["#1a1a2e", "#16213e", "#e94560", "#f38ba8"],
    direction: "to right",
    css: "background: linear-gradient(to right, #1a1a2e, #16213e, #e94560, #f38ba8);",
    description: "Journey to galactic center through dark matter veils, cosmic dust, stellar explosions, and pink nebulae.",
    tags: ['dark navy', 'midnight', 'navy', 'dark blue', 'coral red', 'pink', 'rose', 'light pink']
  },
  {
    id: "NEW-014",
    name: "Prism Break",
    colors: ["#ff0099", "#ffff00", "#00ff99", "#9900ff"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff0099, #ffff00, #00ff99, #9900ff);",
    description: "Light shattering through crystal prisms, exploding into magenta fire, yellow lightning, mint energy, violet power.",
    tags: ['magenta', 'hot pink', 'yellow', 'bright yellow', 'mint', 'bright green', 'purple', 'violet']
  },
  {
    id: "NEW-015",
    name: "Quantum Entanglement",
    colors: ["#667eea", "#f093fb", "#53a0fd", "#c471ed"],
    direction: "to right",
    css: "background: linear-gradient(to right, #667eea, #f093fb, #53a0fd, #c471ed);",
    description: "Quantum particles dancing in eternal connection across periwinkle space, magenta time, blue dimensions, violet reality.",
    tags: ['periwinkle', 'blue', 'magenta', 'pink', 'sky blue', 'azure', 'violet', 'purple']
  },
  {
    id: "NEW-016",
    name: "Synthetic Sunset",
    colors: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);",
    description: "Artificial sunset programmed with coral warmth, turquoise coolness, azure depth, and mint freshness.",
    tags: ['coral', 'salmon', 'turquoise', 'teal', 'sky blue', 'azure', 'mint green', 'seafoam']
  },
  {
    id: "NEW-017",
    name: "Dream Sequence",
    colors: ["#fbc2eb", "#a6c1ee", "#c2e9fb", "#ffecd2"],
    direction: "to right",
    css: "background: linear-gradient(to right, #fbc2eb, #a6c1ee, #c2e9fb, #ffecd2);",
    description: "Floating through dream layers of cotton candy thoughts, periwinkle memories, sky blue wishes, cream awakening.",
    tags: ['light pink', 'cotton candy', 'periwinkle', 'lavender', 'light blue', 'sky blue', 'cream', 'ivory']
  },
  {
    id: "NEW-018",
    name: "Electric Forest",
    colors: ["#134e5e", "#71b280", "#39ff14", "#00ff80"],
    direction: "to right",
    css: "background: linear-gradient(to right, #134e5e, #71b280, #39ff14, #00ff80);",
    description: "Bioluminescent forest glowing from deep teal roots through emerald trunks to neon green energy, lime life.",
    tags: ['dark teal', 'navy', 'green', 'emerald', 'neon green', 'lime', 'bright green', 'electric green']
  },
  {
    id: "NEW-019",
    name: "Metamorphosis",
    colors: ["#8e2de2", "#4a00e0", "#c471ed", "#f64f59"],
    direction: "to right",
    css: "background: linear-gradient(to right, #8e2de2, #4a00e0, #c471ed, #f64f59);",
    description: "Transformation unfolding through royal purple cocoon, deep violet change, amethyst emergence, coral rebirth.",
    tags: ['purple', 'violet', 'royal purple', 'amethyst', 'magenta', 'coral', 'pink', 'salmon']
  },
  {
    id: "NEW-020",
    name: "Interstellar Journey",
    colors: ["#0f0f23", "#667eea", "#f093fb", "#43e97b"],
    direction: "to right",
    css: "background: linear-gradient(to right, #0f0f23, #667eea, #f093fb, #43e97b);",
    description: "Epic voyage through black space, periwinkle stargates, magenta wormholes, into emerald alien worlds.",
    tags: ['black', 'dark navy', 'periwinkle', 'blue', 'magenta', 'pink', 'emerald', 'bright green']
  },
  {
    id: "1",
    name: "Mini",
    colors: ["#30e8bf", "#ff8235"],
    direction: "to right",
    css: "background: linear-gradient(to right, #30e8bf, #ff8235);",
    description: "A vibrant dance between turquoise waves and sunset flames, where ocean meets fire in perfect harmony.",
    tags: getColorTags(["#30e8bf", "#ff8235"])
  },
  {
    id: "1.1",
    name: "Stellar Bloom",
    colors: ["#667eea", "#764ba2", "#f093fb"],
    direction: "to right",
    css: "background: linear-gradient(to right, #667eea, #764ba2, #f093fb);",
    description: "Cosmic flowers blooming across galaxies, painting the universe in ethereal purple dreams.",
    tags: getColorTags(["#667eea", "#764ba2"])
  },
  {
    id: "1.2",
    name: "Liquid Fire",
    colors: ["#ff416c", "#ff4b2b"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff416c, #ff4b2b);",
    description: "Molten passion flowing like liquid flames, igniting hearts with pure burning intensity.",
    tags: ['coral', 'pink', 'red', 'orange red', 'flame']
  },
  {
    id: "1.3",
    name: "Arctic Dawn",
    colors: ["#4facfe", "#00f2fe"],
    direction: "to right",
    css: "background: linear-gradient(to right, #4facfe, #00f2fe);",
    description: "First light breaking over frozen landscapes, painting ice crystals in brilliant azure radiance.",
    tags: ['blue', 'sky blue', 'cyan', 'turquoise', 'azure']
  },
  {
    id: "1.4",
    name: "Emerald Mist",
    colors: ["#56ab2f", "#a8e6a1"],
    direction: "to right",
    css: "background: linear-gradient(to right, #56ab2f, #a8e6a1);",
    description: "Morning fog lifting from emerald valleys, revealing hidden gardens of jade and mint.",
    tags: ['green', 'emerald', 'forest green', 'mint green', 'light green']
  },
  {
    id: "1.5",
    name: "Royal Velvet",
    colors: ["#8e2de2", "#4a00e0"],
    direction: "to right",
    css: "background: linear-gradient(to right, #8e2de2, #4a00e0);",
    description: "Majestic purple tapestries woven with threads of deepest violet, fit for cosmic royalty.",
    tags: ['purple', 'violet', 'amethyst', 'royal purple', 'magenta']
  },
  {
    id: "1.6",
    name: "Sunset Symphony",
    colors: ["#fa709a", "#fee140"],
    direction: "to right",
    css: "background: linear-gradient(to right, #fa709a, #fee140);",
    description: "Orchestra of colors playing the day's final song, from rose crescendo to golden finale.",
    tags: ['pink', 'coral', 'yellow', 'golden yellow', 'sunset']
  },
  {
    id: "1.7",
    name: "Ocean Whisper",
    colors: ["#a8edea", "#fed6e3"],
    direction: "to right",
    css: "background: linear-gradient(to right, #a8edea, #fed6e3);",
    description: "Gentle waves carrying secrets from aquamarine depths to blushing coral shores.",
    tags: getColorTags(["#a8edea", "#fed6e3"])
  },
  {
    id: "1.8",
    name: "Neon Tokyo",
    colors: ["#f093fb", "#f5576c", "#4facfe"],
    direction: "to right",
    css: "background: linear-gradient(to right, #f093fb, #f5576c, #4facfe);",
    description: "Electric nights in cyberpunk streets, where magenta neon bleeds into coral and electric blue.",
    tags: ['magenta', 'pink', 'coral', 'blue', 'electric blue', 'neon']
  },
  {
    id: "1.9",
    name: "Golden Nebula",
    colors: ["#ffecd2", "#fcb69f"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ffecd2, #fcb69f);",
    description: "Stardust clouds of cream and peach swirling in cosmic ballet, birth of golden stars.",
    tags: ['cream', 'ivory', 'peach', 'coral', 'golden', 'warm']
  },
  {
    id: "1.10",
    name: "Midnight Garden",
    colors: ["#2c3e50", "#3498db", "#9b59b6"],
    direction: "to right",
    css: "background: linear-gradient(to right, #2c3e50, #3498db, #9b59b6);",
    description: "Secret garden blooming under starlight, where shadow flowers open to reveal azure and amethyst.",
    tags: ['charcoal', 'dark gray', 'blue', 'azure', 'purple', 'amethyst']
  },
  {
    id: "2",
    name: "Grade Grey",
    colors: ["#bdc3c7", "#2c3e50"],
    direction: "to right",
    css: "background: linear-gradient(to right, #bdc3c7, #2c3e50);",
    description: "From silver clouds to midnight depths, a sophisticated journey through shades of wisdom and mystery.",
    tags: getColorTags(["#bdc3c7", "#2c3e50"])
  },
  {
    id: "3",
    name: "Piggy Pink",
    colors: ["#ee9ca7", "#ffdde1"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ee9ca7, #ffdde1);",
    description: "Soft as morning blush, gentle as a lover's whisper, painting dreams in rose and cream.",
    tags: getColorTags(["#ee9ca7", "#ffdde1"])
  },
  {
    id: "4",
    name: "Cool Blues",
    colors: ["#2193b0", "#6dd5ed"],
    direction: "to right",
    css: "background: linear-gradient(to right, #2193b0, #6dd5ed);",
    description: "Deep ocean currents flowing into crystalline pools, where serenity meets infinite possibilities.",
    tags: getColorTags(["#2193b0", "#6dd5ed"])
  },
  {
    id: "5",
    name: "MegaTron",
    colors: ["#c6ffdd", "#fbd786", "#f7797d"],
    direction: "to right",
    css: "background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);",
    description: "A futuristic symphony of mint freshness, golden energy, and coral warmth dancing in digital harmony.",
    tags: getColorTags(["#c6ffdd", "#fbd786", "#f7797d"])
  },
  {
    id: "6",
    name: "Moonlit Asteroid",
    colors: ["#0f2027", "#203a43", "#2c5364"],
    direction: "to right",
    css: "background: linear-gradient(to right, #0f2027, #203a43, #2c5364);",
    description: "Silent depths of space where shadows embrace starlight, telling ancient stories of cosmic wanderers.",
    tags: getColorTags(["#0f2027", "#203a43", "#2c5364"])
  },
  {
    id: "7",
    name: "JShine",
    colors: ["#12c2e9", "#c471ed", "#f64f59"],
    direction: "to right",
    css: "background: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);",
    description: "Electric dreams flowing from cyan lightning through violet storms to coral sunrise, pure digital magic.",
    tags: getColorTags(["#12c2e9", "#c471ed", "#f64f59"])
  },
  {
    id: "8",
    name: "Evening Sunshine",
    colors: ["#b92b27", "#1565c0"],
    direction: "to right",
    css: "background: linear-gradient(to right, #b92b27, #1565c0);",
    description: "When crimson sunset meets sapphire twilight, creating moments of breathtaking transition and wonder.",
    tags: getColorTags(["#b92b27", "#1565c0"])
  },
  {
    id: "9",
    name: "Dark Ocean",
    colors: ["#373b44", "#4286f4"],
    direction: "to right",
    css: "background: linear-gradient(to right, #373b44, #4286f4);",
    description: "From stormy depths to brilliant azure, where darkness transforms into luminous hope beneath the waves.",
    tags: getColorTags(["#373b44", "#4286f4"])
  },
  {
    id: "10",
    name: "Cool Sky",
    colors: ["#2980b9", "#6bb8f4"],
    direction: "to right",
    css: "background: linear-gradient(to right, #2980b9, #6bb8f4);",
    description: "Endless heavens painted in cobalt dreams, where clouds dance with light in eternal blue serenity.",
    tags: getColorTags(["#2980b9", "#6bb8f4"])
  },
  {
    id: "11",
    name: "Yoda",
    colors: ["#ff0084", "#33001b"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff0084, #33001b);",
    description: "Mystic magenta energy fading into the wisdom of dark burgundy, where power meets ancient knowledge.",
    tags: getColorTags(["#ff0084", "#33001b"])
  },
  {
    id: "12",
    name: "Memariani",
    colors: ["#aa4b6b", "#6b6b83", "#3b8d99"],
    direction: "to right",
    css: "background: linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99);",
    description: "A poetic journey through dusty rose valleys, silver mist, and teal horizons of distant memories.",
    tags: ['dusty rose', 'pink', 'gray', 'silver', 'teal', 'blue green']
  },
  {
    id: "13",
    name: "Harvey",
    colors: ["#1f4037", "#99f2c8"],
    direction: "to right",
    css: "background: linear-gradient(to right, #1f4037, #99f2c8);",
    description: "From forest shadows emerges ethereal mint light, like hope breaking through the darkest woods.",
    tags: getColorTags(["#1f4037", "#99f2c8"])
  },
  {
    id: "14",
    name: "Neuromancer",
    colors: ["#f953c6", "#b91d73"],
    direction: "to right",
    css: "background: linear-gradient(to right, #f953c6, #b91d73);",
    description: "Cyberpunk dreams in electric fuchsia melting into deep burgundy circuits of digital consciousness.",
    tags: getColorTags(["#f953c6", "#b91d73"])
  },
  {
    id: "15",
    name: "Azur Lane",
    colors: ["#7f7fd5", "#86a8e7", "#91eae4"],
    direction: "to right",
    css: "background: linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);",
    description: "Sailing through lavender skies and periwinkle clouds toward aquamarine horizons of endless possibility.",
    tags: getColorTags(["#7f7fd5", "#86a8e7", "#91eae4"])
  },
  {
    id: "16",
    name: "Witching Hour",
    colors: ["#c31432", "#240b36"],
    direction: "to right",
    css: "background: linear-gradient(to right, #c31432, #240b36);",
    description: "Crimson spells dissolving into the mysterious depths of midnight purple, where magic awakens.",
    tags: getColorTags(["#c31432", "#240b36"])
  },
  {
    id: "17",
    name: "Flare",
    colors: ["#f12711", "#f5af19"],
    direction: "to right",
    css: "background: linear-gradient(to right, #f12711, #f5af19);",
    description: "Fierce scarlet flames dancing into golden amber, capturing the essence of passionate energy.",
    tags: getColorTags(["#f12711", "#f5af19"])
  },
  {
    id: "18",
    name: "Metapolis",
    colors: ["#659999", "#f4791f"],
    direction: "to right",
    css: "background: linear-gradient(to right, #659999, #f4791f);",
    description: "Urban teal reflections transforming into warm copper sunsets over the city's steel heart.",
    tags: getColorTags(["#659999", "#f4791f"])
  },
  {
    id: "19",
    name: "Kyoo Pal",
    colors: ["#dd3e54", "#6be585"],
    direction: "to right",
    css: "background: linear-gradient(to right, #dd3e54, #6be585);",
    description: "Rose petals falling into emerald meadows, where passion meets the freshness of spring morning.",
    tags: getColorTags(["#dd3e54", "#6be585"])
  },
  {
    id: "20",
    name: "Kye Meh",
    colors: ["#8360c3", "#2ebf91"],
    direction: "to right",
    css: "background: linear-gradient(to right, #8360c3, #2ebf91);",
    description: "Amethyst dreams flowing into jade waters, bridging the mystical with the natural world.",
    tags: getColorTags(["#8360c3", "#2ebf91"])
  },
  {
    id: "21",
    name: "By Design",
    colors: ["#009ffd", "#2a2a72"],
    direction: "to right",
    css: "background: linear-gradient(to right, #009ffd, #2a2a72);",
    description: "Brilliant azure inspiration deepening into thoughtful navy, where creativity meets contemplation.",
    tags: getColorTags(["#009ffd", "#2a2a72"])
  },
  {
    id: "22",
    name: "Ultra Violet",
    colors: ["#654ea3", "#eaafc8"],
    direction: "to right",
    css: "background: linear-gradient(to right, #654ea3, #eaafc8);",
    description: "Royal purple wisdom blossoming into gentle rose clouds, painting elegance across the sky.",
    tags: getColorTags(["#654ea3", "#eaafc8"])
  },
  {
    id: "23",
    name: "Burning Orange",
    colors: ["#ff9a9e", "#fecfef", "#fecfef"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff9a9e, #fecfef, #fecfef);",
    description: "Coral flames softening into cotton candy dreams, where intensity melts into sweetness.",
    tags: getColorTags(["#ff9a9e", "#fecfef"])
  },
  {
    id: "24",
    name: "Wiretap",
    colors: ["#8a2387", "#e94057", "#f27121"],
    direction: "to right",
    css: "background: linear-gradient(to right, #8a2387, #e94057, #f27121);",
    description: "Digital purple signals crackling through electric red into warm orange transmissions of connection.",
    tags: getColorTags(["#8a2387", "#e94057", "#f27121"])
  },
  {
    id: "25",
    name: "Purple Paradise",
    colors: ["#667eea", "#764ba2"],
    direction: "to right",
    css: "background: linear-gradient(to right, #667eea, #764ba2);",
    description: "Heavenly periwinkle gardens blooming into rich plum orchards, a divine escape into serenity.",
    tags: getColorTags(["#667eea", "#764ba2"])
  },
  {
    id: "26",
    name: "Aqua Marine",
    colors: ["#1a2980", "#26d0ce"],
    direction: "to right",
    css: "background: linear-gradient(to right, #1a2980, #26d0ce);",
    description: "Deep navy currents rushing toward crystalline turquoise shores, where depth meets clarity.",
    tags: getColorTags(["#1a2980", "#26d0ce"])
  },
  {
    id: "27",
    name: "Rose Water",
    colors: ["#e55d87", "#5fc3e4"],
    direction: "to right",
    css: "background: linear-gradient(to right, #e55d87, #5fc3e4);",
    description: "Delicate rose petals floating on tranquil sky-blue waters, pure romance in liquid form.",
    tags: getColorTags(["#e55d87", "#5fc3e4"])
  },
  {
    id: "28",
    name: "Horizon",
    colors: ["#003973", "#e5e5be"],
    direction: "to right",
    css: "background: linear-gradient(to right, #003973, #e5e5be);",
    description: "Where midnight ocean meets the pale golden dawn, endless possibilities stretch beyond the edge.",
    tags: getColorTags(["#003973", "#e5e5be"])
  },
  {
    id: "29",
    name: "Monte Carlo",
    colors: ["#cc2b5e", "#753a88"],
    direction: "to right",
    css: "background: linear-gradient(to right, #cc2b5e, #753a88);",
    description: "Luxurious raspberry velvet deepening into royal amethyst, elegance worthy of palaces.",
    tags: getColorTags(["#cc2b5e", "#753a88"])
  },
  {
    id: "30",
    name: "Lemon Twist",
    colors: ["#3ca55c", "#b5ac49"],
    direction: "to right",
    css: "background: linear-gradient(to right, #3ca55c, #b5ac49);",
    description: "Fresh mint leaves swirling into zesty citrine, a burst of natural energy and vitality.",
    tags: getColorTags(["#3ca55c", "#b5ac49"])
  },
  {
    id: "31",
    name: "Velvet Sun",
    colors: ["#e1eec3", "#f05053"],
    direction: "to right",
    css: "background: linear-gradient(to right, #e1eec3, #f05053);",
    description: "Soft honeydew morning light erupting into passionate coral sunset, day's gentle transformation.",
    tags: getColorTags(["#e1eec3", "#f05053"])
  },
  {
    id: "32",
    name: "King Yna",
    colors: ["#1e3c72", "#2a5298"],
    direction: "to right",
    css: "background: linear-gradient(to right, #1e3c72, #2a5298);",
    description: "Regal midnight blue ascending to noble sapphire heights, commanding respect and admiration.",
    tags: getColorTags(["#1e3c72", "#2a5298"])
  },
  {
    id: "33",
    name: "Sublime Vivid",
    colors: ["#fc466b", "#3f5efb"],
    direction: "to right",
    css: "background: linear-gradient(to right, #fc466b, #3f5efb);",
    description: "Electric coral energy pulsing into vivid blue lightning, pure digital euphoria unleashed.",
    tags: getColorTags(["#fc466b", "#3f5efb"])
  },
  {
    id: "34",
    name: "Sublime Light",
    colors: ["#fc5c7d", "#6a82fb"],
    direction: "to right",
    css: "background: linear-gradient(to right, #fc5c7d, #6a82fb);",
    description: "Gentle rose aurora dancing with soft periwinkle clouds, celestial beauty in harmonious motion.",
    tags: getColorTags(["#fc5c7d", "#6a82fb"])
  },
  {
    id: "35",
    name: "Pun Yeta",
    colors: ["#108dc7", "#ef8e38"],
    direction: "to right",
    css: "background: linear-gradient(to right, #108dc7, #ef8e38);",
    description: "Ocean sapphire waves crashing into golden amber shores, where adventure meets warmth.",
    tags: getColorTags(["#108dc7", "#ef8e38"])
  },
  {
    id: "36",
    name: "Quepal",
    colors: ["#11998e", "#38ef7d"],
    direction: "to right",
    css: "background: linear-gradient(to right, #11998e, #38ef7d);",
    description: "Emerald depths rising into brilliant jade light, nature's perfect symphony of growth and renewal.",
    tags: getColorTags(["#11998e", "#38ef7d"])
  },
  {
    id: "37",
    name: "Sand Strike",
    colors: ["#c1c161", "#c1c161", "#d4d4aa"],
    direction: "to right",
    css: "background: linear-gradient(to right, #c1c161, #c1c161, #d4d4aa);",
    description: "Golden desert winds carrying whispers of ancient dunes into pale sandy horizons of time.",
    tags: getColorTags(["#c1c161", "#c1c161", "#d4d4aa"])
  },
  {
    id: "38",
    name: "Isle",
    colors: ["#70e1f5", "#ffd194"],
    direction: "to right",
    css: "background: linear-gradient(to right, #70e1f5, #ffd194);",
    description: "Tropical lagoon blues melting into warm sandy beaches, paradise captured in perfect harmony.",
    tags: getColorTags(["#70e1f5", "#ffd194"])
  },
  {
    id: "39",
    name: "Plastic",
    colors: ["#a8edea", "#fed6e3"],
    direction: "to right",
    css: "background: linear-gradient(to right, #a8edea, #fed6e3);",
    description: "Ethereal mint dreams flowing into cotton candy clouds, artificial beauty made sublime.",
    tags: getColorTags(["#a8edea", "#fed6e3"])
  },
  {
    id: "40",
    name: "Loveria",
    colors: ["#d299c2", "#fef9d7"],
    direction: "to right",
    css: "background: linear-gradient(to right, #d299c2, #fef9d7);",
    description: "Tender orchid whispers dissolving into creamy vanilla sunlight, love painted in pastels.",
    tags: getColorTags(["#d299c2", "#fef9d7"])
  },
  {
    id: "41",
    name: "Celestial",
    colors: ["#c33764", "#1d2671"],
    direction: "to right",
    css: "background: linear-gradient(to right, #c33764, #1d2671);",
    description: "Cosmic raspberry nebulae spiraling into deep space indigo, where stars are born.",
    tags: getColorTags(["#c33764", "#1d2671"])
  },
  {
    id: "42",
    name: "Purpink",
    colors: ["#7209b7", "#2196f3"],
    direction: "to right",
    css: "background: linear-gradient(to right, #7209b7, #2196f3);",
    description: "Mystical violet magic transforming into brilliant azure lightning, pure enchantment unleashed.",
    tags: getColorTags(["#7209b7", "#2196f3"])
  },
  {
    id: "43",
    name: "Inbox",
    colors: ["#457fca", "#5691c8"],
    direction: "to right",
    css: "background: linear-gradient(to right, #457fca, #5691c8);",
    description: "Calming blue messages flowing into gentle sky communications, peaceful digital serenity.",
    tags: getColorTags(["#457fca", "#5691c8"])
  },
  {
    id: "44",
    name: "Blush",
    colors: ["#b24592", "#f15f79"],
    direction: "to right",
    css: "background: linear-gradient(to right, #b24592, #f15f79);",
    description: "Rich plum emotions blooming into warm coral feelings, the gentle art of falling in love.",
    tags: getColorTags(["#b24592", "#f15f79"])
  },
  {
    id: "45",
    name: "Aurora Dreams",
    colors: ["#667eea", "#764ba2", "#f093fb"],
    direction: "to right",
    css: "background: linear-gradient(to right, #667eea, #764ba2, #f093fb);",
    description: "Northern lights dancing through violet skies, painting ethereal dreams across the cosmic canvas.",
    tags: getColorTags(["#667eea", "#764ba2"])
  },
  {
    id: "46",
    name: "Mystic Forest",
    colors: ["#134e5e", "#71b280"],
    direction: "to right",
    css: "background: linear-gradient(to right, #134e5e, #71b280);",
    description: "Ancient emerald woods where shadows whisper secrets to the gentle morning light.",
    tags: ['dark teal', 'navy', 'green', 'emerald', 'forest green']
  },
  {
    id: "47",
    name: "Sunset Mirage",
    colors: ["#ff6b6b", "#feca57", "#48dbfb"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff6b6b, #feca57, #48dbfb);",
    description: "Desert sunset illusions melting into golden heat waves before dissolving into cool oasis blues.",
    tags: ['coral', 'red', 'golden yellow', 'amber', 'cyan', 'turquoise']
  },
  {
    id: "48",
    name: "Crystal Cave",
    colors: ["#a8e6cf", "#dcedc1", "#ffd3a5"],
    direction: "to right",
    css: "background: linear-gradient(to right, #a8e6cf, #dcedc1, #ffd3a5);",
    description: "Luminous jade crystals reflecting pale mint light into warm amber depths of underground wonder.",
    tags: ['mint green', 'seafoam', 'pale green', 'cream', 'peach', 'amber']
  },
  {
    id: "49",
    name: "Velvet Night",
    colors: ["#0c0c0c", "#654ea3", "#e0c3fc"],
    direction: "to right",
    css: "background: linear-gradient(to right, #0c0c0c, #654ea3, #e0c3fc);",
    description: "Midnight's embrace awakening into royal purple dreams, crowned with soft lavender moonbeams.",
    tags: ['black', 'charcoal', 'purple', 'royal purple', 'lavender', 'light purple']
  },
  {
    id: "50",
    name: "Golden Hour",
    colors: ["#f7971e", "#ffd200", "#ffb347"],
    direction: "to right",
    css: "background: linear-gradient(to right, #f7971e, #ffd200, #ffb347);",
    description: "Perfect moment when amber sunlight transforms into liquid gold, painting everything in warm honey.",
    tags: ['orange', 'amber', 'golden yellow', 'gold', 'peach', 'warm']
  },
  {
    id: "51",
    name: "Ocean Depth",
    colors: ["#1e3c72", "#2a5298", "#74b9ff"],
    direction: "to right",
    css: "background: linear-gradient(to right, #1e3c72, #2a5298, #74b9ff);",
    description: "Diving through navy trenches into sapphire waters, discovering light in the deepest blues.",
    tags: getColorTags(["#1e3c72", "#2a5298"])
  },
  {
    id: "52",
    name: "Cherry Blossom",
    colors: ["#ff9a9e", "#fecfef", "#fecfef"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff9a9e, #fecfef, #fecfef);",
    description: "Delicate pink petals floating on spring breeze, capturing the ephemeral beauty of blooming seasons.",
    tags: getColorTags(["#ff9a9e", "#fecfef"])
  },
  {
    id: "53",
    name: "Electric Storm", 
    colors: ["#667eea", "#764ba2", "#f093fb"],
    direction: "to right",
    css: "background: linear-gradient(to right, #667eea, #764ba2, #f093fb);",
    description: "Lightning crackling through violet storm clouds, unleashing pure electric energy into the night.",
    tags: getColorTags(["#667eea", "#764ba2"])
  },
  {
    id: "54",
    name: "Desert Rose",
    colors: ["#ff8a80", "#ffcc02", "#40e0d0"],
    direction: "to right",
    css: "background: linear-gradient(to right, #ff8a80, #ffcc02, #40e0d0);",
    description: "Rare coral blooms in golden sand dunes, discovering hidden turquoise oases of impossible beauty.",
    tags: ['coral', 'salmon', 'golden yellow', 'gold', 'turquoise', 'cyan']
  }
];