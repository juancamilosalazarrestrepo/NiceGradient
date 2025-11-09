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
    id: "1",
    name: "Mini",
    colors: ["#30e8bf", "#ff8235"],
    direction: "to right",
    css: "background: linear-gradient(to right, #30e8bf, #ff8235);",
    description: "A vibrant dance between turquoise waves and sunset flames, where ocean meets fire in perfect harmony.",
    tags: getColorTags(["#30e8bf", "#ff8235"])
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
    description: "Regal midnight blue ascending to noble sapphire heights, commanding respect and admiration."
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
  }
];