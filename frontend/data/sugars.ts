import { Sugar, SugarCategory } from "@/types/sugar";

export const sugarCategories: SugarCategory[] = [
  {
    id: "natural",
    name: "Natural Sugars",
    description: "Sugars found naturally in fruits, vegetables, and other whole foods",
    color: "#9C27B0", // Violet
  },
  {
    id: "processed",
    name: "Processed Sugars",
    description: "Sugars that have undergone some level of processing but retain some nutrients",
    color: "#FFA000", // Amber
  },
  {
    id: "artificial",
    name: "Highly Processed Sugars",
    description: "Heavily refined sugars and artificial sweeteners with minimal nutritional value",
    color: "#F44336", // Red
  },
  {
    id: "metasugar",
    name: "Metasugars",
    description: "Substances that transglycate into sugar in your body through enzymatic or hepatic processes",
    color: "#9C27B0", // Purple
  },
];

export const sugars: Sugar[] = [
  {
    id: "honey",
    name: "Raw Honey",
    category: "Natural",
    glycemicIndex: 55,
    processingLevel: 2,
    isGMO: false,
    description: "Raw honey is a natural sweetener produced by bees from the nectar of flowers. It contains trace amounts of enzymes, minerals, and antioxidants.",
    benefits: [
      "Contains antioxidants and some nutrients",
      "Has antibacterial and anti-inflammatory properties",
      "Less processed than refined sugar"
    ],
    risks: [
      "Still high in calories and sugar",
      "Can raise blood sugar levels",
      "Not suitable for infants under 12 months"
    ],
    commonUses: [
      "Natural sweetener in tea or coffee",
      "Baking and cooking",
      "Home remedies for sore throat"
    ],
    glyph: "🍯"
  },
  {
    id: "maple-syrup",
    name: "Pure Maple Syrup",
    category: "Natural",
    glycemicIndex: 54,
    processingLevel: 3,
    isGMO: false,
    description: "Maple syrup is made from the sap of maple trees. It contains minerals like manganese and zinc, as well as antioxidants.",
    benefits: [
      "Contains minerals and antioxidants",
      "Lower glycemic index than table sugar",
      "No artificial additives"
    ],
    risks: [
      "High in sugar and calories",
      "Can still impact blood sugar levels",
      "Often imitated with artificial versions"
    ],
    commonUses: [
      "Pancakes and waffles",
      "Baking",
      "Glazes for meats"
    ],
    glyph: "🍁"
  },
  {
    id: "coconut-sugar",
    name: "Coconut Sugar",
    category: "Natural",
    glycemicIndex: 35,
    processingLevel: 3,
    isGMO: false,
    description: "Made from the sap of coconut palm, coconut sugar retains some nutrients from the original plant and has a lower glycemic index than regular sugar.",
    benefits: [
      "Contains small amounts of minerals and inulin",
      "Lower glycemic index than table sugar",
      "Less processed than white sugar"
    ],
    risks: [
      "Still high in calories",
      "Limited nutritional benefits",
      "More expensive than regular sugar"
    ],
    commonUses: [
      "Baking",
      "Coffee and tea sweetener",
      "One-to-one replacement for brown sugar"
    ],
    glyph: "🥥"
  },
  {
    id: "fruit-sugar",
    name: "Fruit Sugar (Fructose)",
    category: "Natural",
    glycemicIndex: 25,
    processingLevel: 1,
    isGMO: false,
    description: "Fructose naturally occurs in fruits, vegetables, and honey. When consumed in whole foods, it comes with fiber and nutrients.",
    benefits: [
      "Lower glycemic index than glucose",
      "Naturally present in nutritious foods",
      "Provides sweetness with fewer calories than sucrose"
    ],
    risks: [
      "Excessive isolated fructose can burden the liver",
      "May contribute to insulin resistance when consumed in excess",
      "Often extracted and added to processed foods"
    ],
    commonUses: [
      "Naturally in fruits and vegetables",
      "Honey and agave nectar",
      "Some diabetic-friendly products"
    ],
    glyph: "🍎"
  },
  {
    id: "cane-sugar",
    name: "Cane Sugar",
    category: "Processed",
    glycemicIndex: 65,
    processingLevel: 6,
    isGMO: false,
    description: "Cane sugar is extracted from sugar cane plants and undergoes processing to remove molasses. It's less processed than white sugar but more than natural alternatives.",
    benefits: [
      "Less processed than white sugar",
      "Contains minimal amounts of minerals",
      "No artificial ingredients"
    ],
    risks: [
      "High glycemic index",
      "Minimal nutritional value",
      "Can contribute to blood sugar spikes"
    ],
    commonUses: [
      "Baking and cooking",
      "Beverages",
      "Condiments and sauces"
    ],
    glyph: "🌾"
  },
  {
    id: "beet-sugar",
    name: "Beet Sugar",
    category: "Processed",
    glycemicIndex: 65,
    processingLevel: 6,
    isGMO: true,
    description: "Sugar extracted from sugar beets through industrial processing. Chemically identical to cane sugar but often from GMO sources and processed with different chemicals.",
    benefits: [
      "Chemically identical to cane sugar",
      "Widely available",
      "Less expensive than cane sugar"
    ],
    risks: [
      "Often from GMO sugar beets",
      "Processed with harsh chemicals",
      "High glycemic index",
      "No nutritional value"
    ],
    commonUses: [
      "Commercial food production",
      "Baking and cooking",
      "Processed foods and beverages"
    ],
    glyph: "🌱"
  },
  {
    id: "corn-sugar",
    name: "Corn Sugar (Dextrose)",
    category: "Processed",
    glycemicIndex: 100,
    processingLevel: 8,
    isGMO: true,
    description: "Pure glucose derived from corn starch. Has the highest possible glycemic index and is rapidly absorbed into the bloodstream.",
    benefits: [
      "Quick energy source for athletes",
      "Consistent sweetness",
      "Dissolves easily"
    ],
    risks: [
      "Maximum glycemic index (100)",
      "Instant blood sugar spikes",
      "Often from GMO corn",
      "No nutritional value",
      "Can cause reactive hypoglycemia"
    ],
    commonUses: [
      "Sports drinks and energy products",
      "Medical glucose tablets",
      "Baking and confectionery"
    ],
    glyph: "🌽"
  },
  {
    id: "carrot-sugar",
    name: "Carrot Sugar",
    category: "Natural",
    glycemicIndex: 47,
    processingLevel: 4,
    isGMO: false,
    description: "Sugar extracted from carrots, containing natural sucrose along with some nutrients from the original vegetable. Rare and specialty sweetener.",
    benefits: [
      "Contains trace nutrients from carrots",
      "Lower glycemic index than table sugar",
      "Natural source",
      "Unique flavor profile"
    ],
    risks: [
      "Still high in sugar content",
      "Limited availability",
      "Expensive compared to other sugars",
      "Can still impact blood sugar"
    ],
    commonUses: [
      "Specialty baking",
      "Artisanal food products",
      "Natural sweetener alternatives"
    ],
    glyph: "🥕"
  },
  {
    id: "white-sugar",
    name: "White Sugar (Refined)",
    category: "Artificial",
    glycemicIndex: 70,
    processingLevel: 9,
    isGMO: true,
    description: "White sugar is highly processed and refined, with all nutrients and molasses removed. It provides empty calories with no nutritional benefits.",
    benefits: [
      "Consistent in recipes",
      "Long shelf life",
      "Inexpensive"
    ],
    risks: [
      "High glycemic index",
      "No nutritional value",
      "Associated with various health issues",
      "Often from GMO sources"
    ],
    commonUses: [
      "Baking and cooking",
      "Processed foods and beverages",
      "Condiments and sauces"
    ],
    glyph: "⚪"
  },
  {
    id: "corn-syrup",
    name: "High Fructose Corn Syrup",
    category: "Artificial",
    glycemicIndex: 75,
    processingLevel: 10,
    isGMO: true,
    description: "HFCS is a highly processed sweetener made from corn starch. It's chemically altered to increase sweetness and is linked to numerous health concerns.",
    benefits: [
      "Inexpensive for manufacturers",
      "Extends shelf life of products",
      "Dissolves easily in beverages"
    ],
    risks: [
      "Linked to obesity and metabolic disorders",
      "Often from GMO corn",
      "Highly processed with chemicals",
      "May contribute to fatty liver disease"
    ],
    commonUses: [
      "Sodas and sweetened beverages",
      "Processed foods",
      "Baked goods and candies"
    ],
    glyph: "🧪"
  },
  {
    id: "artificial-sweeteners",
    name: "Artificial Sweeteners",
    category: "Artificial",
    glycemicIndex: 0,
    processingLevel: 10,
    isGMO: true,
    description: "Chemical compounds that provide sweetness with few or no calories. Examples include aspartame, sucralose, and saccharin.",
    benefits: [
      "Zero or low calories",
      "No impact on blood sugar for most types",
      "Can help reduce sugar consumption"
    ],
    risks: [
      "May disrupt gut microbiome",
      "Potential negative effects on metabolism",
      "Some studies link to increased appetite",
      "Highly processed chemical compounds"
    ],
    commonUses: [
      "Diet sodas and beverages",
      "Sugar-free products",
      "Diabetic-friendly foods"
    ],
    glyph: "⚗️"
  },
  {
    id: "white-bread",
    name: "White Bread",
    category: "Metasugar",
    glycemicIndex: 75,
    processingLevel: 8,
    isGMO: true,
    isMetasugar: true,
    transglycationRate: "Fast",
    description: "Refined wheat flour that rapidly converts to glucose in your body. Despite not being chemically sugar, it transglycates faster than table sugar.",
    benefits: [
      "Convenient and widely available",
      "Long shelf life",
      "Familiar taste and texture"
    ],
    risks: [
      "Extremely high glycemic index",
      "Rapid blood sugar spikes",
      "Stripped of fiber and nutrients",
      "Often from GMO wheat",
      "Contributes to insulin resistance"
    ],
    commonUses: [
      "Sandwiches and toast",
      "Processed foods",
      "Fast food items"
    ],
    glyph: "🍞"
  },
  {
    id: "maltodextrin",
    name: "Maltodextrin",
    category: "Metasugar",
    glycemicIndex: 110,
    processingLevel: 10,
    isGMO: true,
    isMetasugar: true,
    transglycationRate: "Fast",
    description: "A highly processed starch that transglycates faster than pure glucose. Hidden in countless 'healthy' foods and supplements.",
    benefits: [
      "Cheap manufacturing ingredient",
      "Extends shelf life",
      "Improves texture in processed foods"
    ],
    risks: [
      "Higher glycemic index than sugar",
      "Instant blood sugar spikes",
      "Hidden in 'sugar-free' products",
      "Disrupts gut microbiome",
      "Often from GMO corn"
    ],
    commonUses: [
      "Sports drinks and supplements",
      "Processed snacks",
      "'Sugar-free' products",
      "Protein powders"
    ],
    glyph: "🧬"
  },
  {
    id: "rice-cakes",
    name: "Rice Cakes",
    category: "Metasugar",
    glycemicIndex: 87,
    processingLevel: 7,
    isGMO: false,
    isMetasugar: true,
    transglycationRate: "Fast",
    description: "Puffed rice that masquerades as a healthy snack but transglycates rapidly into glucose, causing blood sugar spikes.",
    benefits: [
      "Low in calories",
      "Gluten-free",
      "Perceived as healthy"
    ],
    risks: [
      "Very high glycemic index",
      "Rapid glucose conversion",
      "No fiber or nutrients",
      "Triggers hunger shortly after eating",
      "Can worsen blood sugar control"
    ],
    commonUses: [
      "Diet snacks",
      "Breakfast alternatives",
      "Gluten-free products"
    ],
    glyph: "🍘"
  },
  {
    id: "instant-oats",
    name: "Instant Oats",
    category: "Metasugar",
    glycemicIndex: 79,
    processingLevel: 6,
    isGMO: false,
    isMetasugar: true,
    transglycationRate: "Medium",
    description: "Pre-processed oats that have been stripped of fiber and structure, causing rapid transglycation compared to steel-cut oats.",
    benefits: [
      "Quick and convenient",
      "Contains some nutrients",
      "Better than many breakfast cereals"
    ],
    risks: [
      "Much higher GI than steel-cut oats",
      "Rapid blood sugar elevation",
      "Often contains added sugars",
      "Less filling than whole oats"
    ],
    commonUses: [
      "Quick breakfast",
      "Smoothie ingredients",
      "Baking"
    ],
    glyph: "🥣"
  },
  {
    id: "fruit-juice",
    name: "Fruit Juice",
    category: "Metasugar",
    glycemicIndex: 50,
    processingLevel: 5,
    isGMO: false,
    isMetasugar: true,
    transglycationRate: "Fast",
    description: "Concentrated fruit sugars without fiber, causing rapid absorption and blood sugar spikes despite being 'natural'.",
    benefits: [
      "Contains some vitamins",
      "Natural fruit flavors",
      "No artificial additives (pure juice)"
    ],
    risks: [
      "Concentrated fructose load",
      "No fiber to slow absorption",
      "Easy to overconsume",
      "Can contribute to fatty liver",
      "Higher sugar than whole fruit"
    ],
    commonUses: [
      "Breakfast beverages",
      "Smoothie bases",
      "Children's drinks"
    ],
    glyph: "🧃"
  },
  {
    id: "agave-nectar",
    name: "Agave Nectar",
    category: "Metasugar",
    glycemicIndex: 30,
    processingLevel: 8,
    isGMO: false,
    isMetasugar: true,
    transglycationRate: "Medium",
    description: "Highly processed agave that's 90% fructose - marketed as healthy but transglycates directly in the liver, bypassing normal glucose regulation.",
    benefits: [
      "Lower glycemic index than sugar",
      "Marketed as natural",
      "Dissolves easily in cold drinks"
    ],
    risks: [
      "Extremely high fructose content (90%)",
      "Bypasses normal satiety signals",
      "Directly burdens the liver",
      "Highly processed despite marketing",
      "Can contribute to insulin resistance"
    ],
    commonUses: [
      "Health food sweetener",
      "Vegan baking",
      "Cocktails and beverages"
    ],
    glyph: "🌵"
  },
  {
    id: "date-sugar",
    name: "Date Sugar",
    category: "Natural",
    glycemicIndex: 55,
    processingLevel: 2,
    isGMO: false,
    description: "Made from ground, dehydrated dates. Retains fiber and nutrients from whole dates, providing a more complex sweetness profile.",
    benefits: [
      "Contains fiber and potassium",
      "Retains nutrients from whole dates",
      "Less processed than refined sugars",
      "Rich in antioxidants"
    ],
    risks: [
      "Still high in natural sugars",
      "Can clump and doesn't dissolve well",
      "More expensive than regular sugar",
      "May affect blood sugar levels"
    ],
    commonUses: [
      "Baking (especially muffins and cookies)",
      "Oatmeal and cereal topping",
      "Natural sweetener in recipes"
    ],
    glyph: "🌴"
  },
  {
    id: "palm-sugar",
    name: "Palm Sugar",
    category: "Natural",
    glycemicIndex: 35,
    processingLevel: 3,
    isGMO: false,
    description: "Extracted from the sap of various palm trees. Contains minerals and has a lower glycemic index than regular sugar.",
    benefits: [
      "Lower glycemic index than table sugar",
      "Contains minerals like potassium and zinc",
      "Sustainable when properly sourced",
      "Rich, complex flavor"
    ],
    risks: [
      "Still high in calories",
      "Limited availability in some regions",
      "Can be expensive",
      "Quality varies by source"
    ],
    commonUses: [
      "Asian cuisine and desserts",
      "Traditional cooking",
      "Coffee and tea sweetener"
    ],
    glyph: "🌴"
  },
  {
    id: "brown-rice-syrup",
    name: "Brown Rice Syrup",
    category: "Processed",
    glycemicIndex: 98,
    processingLevel: 7,
    isGMO: false,
    description: "Made by breaking down brown rice starches into sugars. Despite being from a whole grain, it has an extremely high glycemic index.",
    benefits: [
      "Fructose-free",
      "Made from whole grain rice",
      "Vegan and gluten-free"
    ],
    risks: [
      "Extremely high glycemic index",
      "Rapid blood sugar spikes",
      "Highly processed despite natural source",
      "May contain arsenic from rice",
      "Low in nutrients"
    ],
    commonUses: [
      "Health food products",
      "Granola bars and cereals",
      "Vegan baking"
    ],
    glyph: "🌾"
  },
  {
    id: "barley-malt-syrup",
    name: "Barley Malt Syrup",
    category: "Processed",
    glycemicIndex: 42,
    processingLevel: 6,
    isGMO: false,
    description: "Made from sprouted barley that's been cooked down into a syrup. Contains mostly maltose and has a distinctive malty flavor.",
    benefits: [
      "Lower glycemic index than many syrups",
      "Contains some B vitamins and minerals",
      "Unique flavor profile",
      "Less processed than corn syrup"
    ],
    risks: [
      "Still high in sugar content",
      "Contains gluten",
      "Can affect blood sugar levels",
      "Strong flavor may not suit all recipes"
    ],
    commonUses: [
      "Bread and bagel making",
      "Beer brewing",
      "Specialty baking"
    ],
    glyph: "🌾"
  },
  {
    id: "molasses",
    name: "Molasses",
    category: "Processed",
    glycemicIndex: 55,
    processingLevel: 4,
    isGMO: false,
    description: "A byproduct of sugar refining, molasses retains many minerals and nutrients removed from white sugar. Blackstrap molasses is the most nutritious.",
    benefits: [
      "Rich in iron, calcium, and potassium",
      "Contains antioxidants",
      "Lower glycemic index than white sugar",
      "Provides some B vitamins"
    ],
    risks: [
      "Still high in sugar content",
      "Strong, distinctive flavor",
      "Can cause digestive issues in large amounts",
      "May contain sulfur dioxide"
    ],
    commonUses: [
      "Baking (gingerbread, cookies)",
      "Barbecue sauces and marinades",
      "Traditional remedies"
    ],
    glyph: "🟤"
  },
  {
    id: "turbinado-sugar",
    name: "Turbinado Sugar",
    category: "Processed",
    glycemicIndex: 65,
    processingLevel: 5,
    isGMO: false,
    description: "Partially refined cane sugar that retains some molasses, giving it a light brown color and subtle flavor. Less processed than white sugar.",
    benefits: [
      "Retains trace minerals from molasses",
      "Less processed than white sugar",
      "Natural golden color",
      "Subtle caramel flavor"
    ],
    risks: [
      "High glycemic index",
      "Minimal nutritional advantage over white sugar",
      "Still causes blood sugar spikes",
      "More expensive than regular sugar"
    ],
    commonUses: [
      "Coffee and tea sweetener",
      "Baking and desserts",
      "Topping for cereals and fruits"
    ],
    glyph: "🟤"
  },
  {
    id: "demerara-sugar",
    name: "Demerara Sugar",
    category: "Processed",
    glycemicIndex: 65,
    processingLevel: 5,
    isGMO: false,
    description: "Large-crystal raw cane sugar with a golden color and toffee-like flavor. Minimally processed with some molasses retained.",
    benefits: [
      "Retains some natural molasses",
      "Large crystals provide texture",
      "Rich, complex flavor",
      "Less refined than white sugar"
    ],
    risks: [
      "High glycemic index",
      "Limited nutritional benefits",
      "Can cause blood sugar spikes",
      "More expensive than regular sugar"
    ],
    commonUses: [
      "Coffee sweetener",
      "Baking (especially crumble toppings)",
      "Dessert garnish"
    ],
    glyph: "🟤"
  },
  {
    id: "muscovado-sugar",
    name: "Muscovado Sugar",
    category: "Processed",
    glycemicIndex: 65,
    processingLevel: 4,
    isGMO: false,
    description: "Unrefined cane sugar with all the natural molasses retained. Has a strong, complex flavor and moist texture.",
    benefits: [
      "Retains all natural molasses",
      "Contains more minerals than refined sugar",
      "Rich, complex flavor profile",
      "Moist texture adds to baked goods"
    ],
    risks: [
      "High glycemic index",
      "Strong flavor may overpower recipes",
      "Still high in calories and sugar",
      "Can clump due to moisture content"
    ],
    commonUses: [
      "Specialty baking",
      "Toffee and caramel making",
      "Rum and cocktail sweetener"
    ],
    glyph: "🟤"
  },
  {
    id: "yacon-syrup",
    name: "Yacon Syrup",
    category: "Natural",
    glycemicIndex: 1,
    processingLevel: 3,
    isGMO: false,
    description: "Extracted from the yacon root, this syrup is high in fructooligosaccharides (FOS) which act as prebiotics and have minimal impact on blood sugar.",
    benefits: [
      "Extremely low glycemic index",
      "Contains prebiotic fibers",
      "May support digestive health",
      "Lower in calories than sugar"
    ],
    risks: [
      "Can cause digestive upset in large amounts",
      "Expensive and limited availability",
      "May have laxative effects",
      "Strong, distinctive taste"
    ],
    commonUses: [
      "Health-conscious sweetening",
      "Smoothies and beverages",
      "Low-glycemic baking"
    ],
    glyph: "🌿"
  },
  {
    id: "monk-fruit",
    name: "Monk Fruit Sweetener",
    category: "Natural",
    glycemicIndex: 0,
    processingLevel: 6,
    isGMO: false,
    description: "Extracted from monk fruit, this natural sweetener is 150-200 times sweeter than sugar with zero calories and no impact on blood glucose.",
    benefits: [
      "Zero calories and carbohydrates",
      "No impact on blood sugar",
      "Natural source",
      "Very sweet, so small amounts needed"
    ],
    risks: [
      "Expensive compared to other sweeteners",
      "May have aftertaste for some people",
      "Often mixed with other sweeteners",
      "Limited long-term studies"
    ],
    commonUses: [
      "Diabetic-friendly products",
      "Keto and low-carb baking",
      "Beverage sweetening"
    ],
    glyph: "🍋"
  },
  {
    id: "stevia",
    name: "Stevia",
    category: "Natural",
    glycemicIndex: 0,
    processingLevel: 5,
    isGMO: false,
    description: "Extracted from the stevia plant, this natural sweetener is 200-300 times sweeter than sugar with zero calories and no blood sugar impact.",
    benefits: [
      "Zero calories and carbohydrates",
      "No impact on blood sugar",
      "Natural plant source",
      "May have antioxidant properties"
    ],
    risks: [
      "Bitter aftertaste for some people",
      "Highly processed despite natural origin",
      "May affect gut bacteria",
      "Often mixed with other ingredients"
    ],
    commonUses: [
      "Diet beverages and foods",
      "Diabetic-friendly products",
      "Home baking and cooking"
    ],
    glyph: "🌿"
  },
  {
    id: "erythritol",
    name: "Erythritol",
    category: "Artificial",
    glycemicIndex: 0,
    processingLevel: 8,
    isGMO: true,
    description: "A sugar alcohol that provides sweetness with minimal calories. Recent studies have raised concerns about cardiovascular risks.",
    benefits: [
      "Nearly zero calories",
      "No impact on blood sugar",
      "Doesn't cause tooth decay",
      "Tastes similar to sugar"
    ],
    risks: [
      "Recent studies link to heart attack and stroke risk",
      "May cause digestive issues",
      "Highly processed",
      "Often from GMO corn",
      "May increase blood clotting"
    ],
    commonUses: [
      "Sugar-free products",
      "Keto and diabetic baking",
      "Diet beverages"
    ],
    glyph: "⚗️"
  },
  {
    id: "xylitol",
    name: "Xylitol",
    category: "Artificial",
    glycemicIndex: 7,
    processingLevel: 8,
    isGMO: true,
    description: "A sugar alcohol that provides sweetness with fewer calories than sugar. Has dental benefits but can cause digestive issues.",
    benefits: [
      "40% fewer calories than sugar",
      "May prevent tooth decay",
      "Lower impact on blood sugar",
      "Tastes similar to sugar"
    ],
    risks: [
      "Can cause severe digestive upset",
      "Extremely toxic to dogs",
      "May cause diarrhea and gas",
      "Often from GMO corn",
      "Highly processed"
    ],
    commonUses: [
      "Sugar-free gum and mints",
      "Dental care products",
      "Diabetic-friendly foods"
    ],
    glyph: "⚗️"
  }
];

export const getGlycemicIndexRating = (gi: number): 'Low' | 'Medium' | 'High' => {
  if (gi < 55) return 'Low';
  if (gi < 70) return 'Medium';
  return 'High';
};

export const getProcessingLevelRating = (level: number): 'Minimal' | 'Moderate' | 'High' => {
  if (level <= 3) return 'Minimal';
  if (level <= 6) return 'Moderate';
  return 'High';
};

export const getSugarsByCategory = (categoryId: string): Sugar[] => {
  return sugars.filter(sugar => sugar.category.toLowerCase() === categoryId);
};