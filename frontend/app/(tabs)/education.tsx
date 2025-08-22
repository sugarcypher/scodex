import React, { useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';
import { colors, shadows } from '@/constants/colors';
import { educationSections } from '@/data/education-sections';
import { useSugarStore } from '@/hooks/sugar-store';

export default function EducationScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const { isEducationFavorite, addToEducationFavorites, removeFromEducationFavorites } = useSugarStore();
  
  const scrollToSection = (sectionId: string) => {
    const sectionIndex = educationSections.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1 && scrollViewRef.current) {
      const yOffset = 200 + (sectionIndex * 600);
      scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    }
  };
  
  const toggleSectionFavorite = (sectionId: string) => {
    if (isEducationFavorite(sectionId)) {
      removeFromEducationFavorites(sectionId);
    } else {
      addToEducationFavorites(sectionId);
    }
  };
  
  return (
    <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.content}>

      
      <View style={styles.header}>
        <Text style={styles.title}>Sugar Education</Text>
        <Text style={styles.subtitle}>
          Understanding sugars and their impact on your health
        </Text>
      </View>
      
      <View style={[styles.navigationSection, shadows.small]}>
        <Text style={styles.navigationTitle}>Quick Navigation</Text>
        <View style={styles.navigationGrid}>
          {educationSections.map((section) => (
            <Pressable
              key={section.id}
              style={styles.navigationButton}
              onPress={() => scrollToSection(section.id)}
            >
              <Text style={styles.navigationEmoji}>{section.emoji}</Text>
              <Text style={styles.navigationText}>{section.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      
      <View style={[styles.section, shadows.small]} id="glycemic-index">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📊 What is Glycemic Index?</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('glycemic-index')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('glycemic-index') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('glycemic-index') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={styles.text}>
          The glycemic index (GI) is a value assigned to foods based on how slowly or quickly they 
          cause increases in blood glucose levels. Foods with a low GI value (55 or less) are 
          digested, absorbed, and metabolized slowly, causing a slower rise in blood glucose.
        </Text>
        <View style={styles.giScale}>
          <View style={[styles.giIndicator, { backgroundColor: colors.good }]}>
            <Text style={styles.giText}>Low GI</Text>
            <Text style={styles.giValue}>≤ 55</Text>
          </View>
          <View style={[styles.giIndicator, { backgroundColor: colors.moderate }]}>
            <Text style={styles.giText}>Medium GI</Text>
            <Text style={styles.giValue}>56-69</Text>
          </View>
          <View style={[styles.giIndicator, { backgroundColor: colors.bad }]}>
            <Text style={styles.giText}>High GI</Text>
            <Text style={styles.giValue}>≥ 70</Text>
          </View>
        </View>
      </View>
      
      <View style={[styles.section, shadows.small]} id="processing-levels">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚙️ Processing Levels</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('processing-levels')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('processing-levels') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('processing-levels') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={styles.text}>
          The level of processing a sugar undergoes can significantly impact its nutritional value. 
          Highly processed sugars often lose beneficial nutrients and may contain additives.
        </Text>
        <View style={styles.processingLevels}>
          <View style={styles.processingLevel}>
            <View style={[styles.processingIndicator, { backgroundColor: colors.good }]} />
            <View style={styles.processingInfo}>
              <Text style={styles.processingTitle}>Minimal Processing</Text>
              <Text style={styles.processingText}>
                Retains most natural nutrients and fiber. Examples: honey, maple syrup.
              </Text>
            </View>
          </View>
          <View style={styles.processingLevel}>
            <View style={[styles.processingIndicator, { backgroundColor: colors.moderate }]} />
            <View style={styles.processingInfo}>
              <Text style={styles.processingTitle}>Moderate Processing</Text>
              <Text style={styles.processingText}>
                Some nutrients removed. Examples: cane sugar, coconut sugar.
              </Text>
            </View>
          </View>
          <View style={styles.processingLevel}>
            <View style={[styles.processingIndicator, { backgroundColor: colors.bad }]} />
            <View style={styles.processingInfo}>
              <Text style={styles.processingTitle}>High Processing</Text>
              <Text style={styles.processingText}>
                Most or all nutrients removed, often with additives. Examples: white sugar, HFCS.
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={[styles.section, shadows.small]} id="gmo-sugars">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🧬 GMO in Sugars</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('gmo-sugars')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('gmo-sugars') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('gmo-sugars') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={styles.text}>
          Genetically Modified Organisms (GMOs) are organisms whose genetic material has been 
          altered using genetic engineering techniques. Some sugar sources, particularly corn 
          used for high-fructose corn syrup, are commonly genetically modified.
        </Text>
        <Text style={styles.text}>
          While the FDA considers approved GMO foods safe, some consumers prefer to avoid them 
          due to environmental or other concerns.
        </Text>
      </View>
      
      <View style={[styles.section, shadows.small]} id="artificial-sweeteners">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🍭 Artificial Sweeteners – Types, Risks & Myths</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('artificial-sweeteners')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('artificial-sweeteners') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('artificial-sweeteners') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        
        <View style={styles.artificialSection}>
          <Text style={styles.artificialSubtitle}>1. Common Types in Use</Text>
          <View style={styles.typesList}>
            <Text style={styles.typeItem}>• Aspartame (e.g., NutraSweet, Equal)</Text>
            <Text style={styles.typeItem}>• Sucralose (Splenda)</Text>
            <Text style={styles.typeItem}>• Saccharin (Sweet'n Low)</Text>
            <Text style={styles.typeItem}>• Acesulfame potassium (Ace-K)</Text>
            <Text style={styles.typeItem}>• Sugar alcohols (Erythritol, Xylitol, Sorbitol)</Text>
            <Text style={styles.typeItem}>• Natural non-nutritive: Stevia, Monk fruit</Text>
          </View>
          <Text style={styles.note}>Note: Cyclamate is banned in the U.S. but used elsewhere.</Text>
        </View>
        
        <View style={styles.artificialSection}>
          <Text style={styles.artificialSubtitle}>2. Misinformation & Misnomers</Text>
          <View style={styles.typesList}>
            <Text style={styles.typeItem}>• Claims linking artificial sweeteners to cancer stem from outdated rodent studies (e.g., saccharin → rat bladder tumors—not applicable to humans).</Text>
            <Text style={styles.typeItem}>• Aspartame was classified "possibly carcinogenic" (Group 2B) by IARC in 2023, but regulatory bodies (FDA, EFSA, JECFA) still deem it safe at recommended intake levels.</Text>
          </View>
        </View>
        
        <View style={styles.artificialSection}>
          <Text style={styles.artificialSubtitle}>3. Side Effects & Biophysical Impacts</Text>
          <View style={styles.effectsTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Sweetener</Text>
              <Text style={styles.tableHeaderText}>Common Side Effects</Text>
              <Text style={styles.tableHeaderText}>Biophysical Effects</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Sugar alcohols</Text>
              <Text style={styles.tableCell}>Bloating, gas, diarrhea</Text>
              <Text style={styles.tableCell}>Osmotic gut effects</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Sucralose</Text>
              <Text style={styles.tableCell}>Potential dioxin formation when heated {'>'}120°C; environmental persistence</Text>
              <Text style={styles.tableCell}>—</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Aspartame</Text>
              <Text style={styles.tableCell}>Phenylalanine danger for PKU; faint aftertaste</Text>
              <Text style={styles.tableCell}>Breaks down under heat/pH</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Saccharin</Text>
              <Text style={styles.tableCell}>Rare allergic reactions in sulfa-sensitive individuals</Text>
              <Text style={styles.tableCell}>—</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellBold}>Erythritol</Text>
              <Text style={styles.tableCell}>Generally well tolerated, but recent concerns... see below</Text>
              <Text style={styles.tableCell}>—</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.artificialSection}>
          <Text style={styles.artificialSubtitle}>4. Neurological & Metabolic Effects</Text>
          <View style={styles.typesList}>
            <Text style={styles.typeItem}>• Aspartame: Linked to headaches, migraines, mood changes, cognitive issues, and potential risk of neurodegenerative disease over time.</Text>
            <Text style={styles.typeItem}>• All sweeteners: May desynchronize the sweetness-calorie signaling, leading to increased cravings, appetite, and possibly weight gain.</Text>
            <Text style={styles.typeItem}>• Long-term use: Associations drawn to insulin resistance, non-alcoholic fatty liver disease, metabolic syndrome, and gut microbiome disruption.</Text>
          </View>
        </View>
        
        <View style={styles.artificialSection}>
          <Text style={styles.artificialSubtitle}>5. Erythritol Red Flags</Text>
          <View style={styles.typesList}>
            <Text style={styles.typeItem}>• Multiple new studies tie erythritol to increased blood clotting, stroke, and heart-attack risk—even with single servings.</Text>
            <Text style={styles.typeItem}>• Mechanisms include platelet activation and oxidative damage in vascular and brain tissue. It may elevate risk in those with cardiovascular predispositions.</Text>
          </View>
        </View>
        
        <View style={styles.artificialSection}>
          <Text style={styles.artificialSubtitle}>6. Deadly or Dangerous Combinations</Text>
          <View style={styles.typesList}>
            <Text style={styles.typeItem}>• Combining aspirin with sucralose heated above 120°C might form chlorinated dioxins—a recognized chemical hazard.</Text>
            <Text style={styles.typeItem}>• PKU sufferers + aspartame = serious risk due to phenylalanine content.</Text>
          </View>
        </View>
        
        <View style={styles.artificialSection}>
          <Text style={styles.artificialSubtitle}>7. Recommendations & Safe Use</Text>
          <View style={styles.recommendationsList}>
            <View style={styles.recommendation}>
              <Text style={styles.recommendationNumber}>1</Text>
              <Text style={styles.recommendationText}>Moderation: Works OK short‑term, but long‑term use has unresolved risks.</Text>
            </View>
            <View style={styles.recommendation}>
              <Text style={styles.recommendationNumber}>2</Text>
              <Text style={styles.recommendationText}>Rotate sweeteners to avoid cumulative exposure.</Text>
            </View>
            <View style={styles.recommendation}>
              <Text style={styles.recommendationNumber}>3</Text>
              <Text style={styles.recommendationText}>Avoid heating sucralose high, and no mixing sucralose + aspirin or NSAIDs.</Text>
            </View>
            <View style={styles.recommendation}>
              <Text style={styles.recommendationNumber}>4</Text>
              <Text style={styles.recommendationText}>PKU alert: Read labels—avoid aspartame.</Text>
            </View>
            <View style={styles.recommendation}>
              <Text style={styles.recommendationNumber}>5</Text>
              <Text style={styles.recommendationText}>At‑risk individuals (migraines, GI issues) should steer clear of aspartame and sugar alcohols.</Text>
            </View>
            <View style={styles.recommendation}>
              <Text style={styles.recommendationNumber}>6</Text>
              <Text style={styles.recommendationText}>Prefer natural alternatives: Monk fruit, stevia (refined), allulose, honey, or maple syrup—under moderation.</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>🔍 Summary</Text>
          <Text style={styles.summaryText}>
            Artificial sweeteners offer calorie-free sweetness—but not without trade-offs. While regulatory bodies still approve most, emerging research (especially around erythritol and long-term neuro/metabolic effects) advises caution. If you need sweetness, lean toward natural substitutes, use minimally, and avoid high-heat or risky combos.
          </Text>
        </View>
      </View>
      
      <View style={[styles.section, shadows.small]} id="blood-sugar-buffering">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🧠 Blood Sugar Buffering Combinations</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('blood-sugar-buffering')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('blood-sugar-buffering') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('blood-sugar-buffering') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={styles.text}>
          Strategic food combinations can help reduce blood sugar spikes and improve glucose control. 
          Here are evidence-based approaches to optimize your meals:
        </Text>
        
        <View style={styles.bufferingSection}>
          <Text style={styles.bufferingTitle}>🔹 Protein + Carbs</Text>
          <Text style={styles.bufferingFunction}>Function: Slows digestion, blunts postprandial glucose spikes.</Text>
          <Text style={styles.bufferingUse}>Use cases: Breakfasts, snacks, core meal builds.</Text>
          <Text style={styles.bufferingExamplesTitle}>Examples:</Text>
          <View style={styles.examplesList}>
            <Text style={styles.exampleItem}>• Greek yogurt + berries</Text>
            <Text style={styles.exampleItem}>• Nut butter + apple slices</Text>
            <Text style={styles.exampleItem}>• Eggs + whole-grain toast</Text>
            <Text style={styles.exampleItem}>• Grilled fish + rice or potatoes</Text>
          </View>
          <Text style={styles.whyItWorks}>🧪 Why it works: Protein delays gastric emptying and modulates insulin release.</Text>
        </View>
        
        <View style={styles.bufferingSection}>
          <Text style={styles.bufferingTitle}>🔹 Fiber + Starches</Text>
          <Text style={styles.bufferingFunction}>Function: Reduces glycemic impact via delayed carb absorption.</Text>
          <Text style={styles.bufferingUse}>Use cases: Grain bowls, soups, mixed dishes.</Text>
          <Text style={styles.bufferingExamplesTitle}>Examples:</Text>
          <View style={styles.examplesList}>
            <Text style={styles.exampleItem}>• Lentils + rice</Text>
            <Text style={styles.exampleItem}>• Chopped vegetables in pasta</Text>
            <Text style={styles.exampleItem}>• Flax or chia in smoothies/cereal</Text>
            <Text style={styles.exampleItem}>• Quinoa + roasted vegetables</Text>
          </View>
          <Text style={styles.whyItWorks}>🧪 Why it works: Soluble fiber adds bulk and slows glucose entry into bloodstream.</Text>
        </View>
        
        <View style={styles.bufferingSection}>
          <Text style={styles.bufferingTitle}>🔹 Healthy Fats + Carbs</Text>
          <Text style={styles.bufferingFunction}>Function: Slows gastric emptying; increases satiety.</Text>
          <Text style={styles.bufferingUse}>Use cases: Meals, snacks, recovery foods.</Text>
          <Text style={styles.bufferingExamplesTitle}>Examples:</Text>
          <View style={styles.examplesList}>
            <Text style={styles.exampleItem}>• Avocado + whole grain toast</Text>
            <Text style={styles.exampleItem}>• Olive oil + roasted veggies</Text>
            <Text style={styles.exampleItem}>• Nuts + oatmeal</Text>
            <Text style={styles.exampleItem}>• Salmon + sweet potato</Text>
          </View>
          <Text style={styles.whyItWorks}>🧪 Why it works: Unsaturated fats improve insulin response and curb spikes.</Text>
        </View>
        
        <View style={styles.bufferingSection}>
          <Text style={styles.bufferingTitle}>🔹 Acids + Starches</Text>
          <Text style={styles.bufferingFunction}>Function: Lowers glycemic response, enhances insulin sensitivity.</Text>
          <Text style={styles.bufferingUse}>Use cases: Meal prep, dressings, side pairings.</Text>
          <Text style={styles.bufferingExamplesTitle}>Examples:</Text>
          <View style={styles.examplesList}>
            <Text style={styles.exampleItem}>• Vinegar-based salad dressing + grains</Text>
            <Text style={styles.exampleItem}>• Lemon juice + roasted starches</Text>
            <Text style={styles.exampleItem}>• Sauerkraut + potatoes</Text>
          </View>
          <Text style={styles.whyItWorks}>🧪 Why it works: Acetic acid helps suppress post-meal glucose elevations.</Text>
        </View>
        
        <View style={styles.bufferingSection}>
          <Text style={styles.bufferingTitle}>🔹 Cinnamon Pairings</Text>
          <Text style={styles.bufferingFunction}>Function: Mild modulation of glucose metabolism.</Text>
          <Text style={styles.bufferingUse}>Use cases: Flavor enhancer, low-effort boost.</Text>
          <Text style={styles.bufferingExamplesTitle}>Examples:</Text>
          <View style={styles.examplesList}>
            <Text style={styles.exampleItem}>• Cinnamon in yogurt, oatmeal, smoothies</Text>
            <Text style={styles.exampleItem}>• Cinnamon with apples or roasted squash</Text>
          </View>
          <Text style={styles.whyItWorks}>🧪 Why it works: Slight improvement in fasting glucose and insulin signaling.</Text>
        </View>
        
        <View style={styles.bufferingSection}>
          <Text style={styles.bufferingTitle}>🔹 Timing & Composition</Text>
          <Text style={styles.bufferingFunction}>Function: Enhances post-meal glucose control via intake order and timing.</Text>
          <Text style={styles.bufferingUse}>Use cases: Mealtime planning, eating windows.</Text>
          <Text style={styles.bufferingExamplesTitle}>Strategies:</Text>
          <View style={styles.examplesList}>
            <Text style={styles.exampleItem}>• Veggies/protein before carbs</Text>
            <Text style={styles.exampleItem}>• Macronutrient-balanced meals (protein + fiber + fat + carb)</Text>
            <Text style={styles.exampleItem}>• Early time-restricted eating (first meal early, last meal early)</Text>
          </View>
          <Text style={styles.whyItWorks}>🧪 Why it works: Eating sequence and timing influence glycemic response.</Text>
        </View>
        
        <View style={styles.bufferingSection}>
          <Text style={styles.bufferingTitle}>🔹 Secondary Levers</Text>
          <Text style={styles.bufferingFunction}>Function: Complementary techniques for support and reinforcement.</Text>
          <Text style={styles.bufferingUse}>Use cases: Lifestyle augmentation.</Text>
          <Text style={styles.bufferingExamplesTitle}>Tools:</Text>
          <View style={styles.examplesList}>
            <Text style={styles.exampleItem}>• Hydration (staying consistently hydrated)</Text>
            <Text style={styles.exampleItem}>• Portion control (moderate high-GI loads)</Text>
            <Text style={styles.exampleItem}>• Physical form (whole {'>'}juiced or processed)</Text>
            <Text style={styles.exampleItem}>• Post-meal movement (walks reduce glucose spikes)</Text>
            <Text style={styles.exampleItem}>• Adjuncts: turmeric, fenugreek, bitter melon</Text>
          </View>
          <Text style={styles.whyItWorks}>🧪 Why it works: These reinforce primary strategies without adding complexity.</Text>
        </View>
      </View>
      
      <View style={[styles.section, shadows.small]} id="health-impact">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏥 Comprehensive Health Impact of Sugar</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('health-impact')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('health-impact') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('health-impact') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={styles.text}>
          Here's a comprehensive breakdown of all health matters influenced by sugar, including direct consequences, downstream effects, and additive risks:
        </Text>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>1. Metabolic & Weight Health</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Obesity & overweight:</Text> Excess added sugar promotes weight gain due to high caloric density and poor satiety—especially through sugary drinks.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Type 2 diabetes & insulin resistance:</Text> Chronic sugar intake impairs glucose control and fosters insulin resistance.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Metabolic syndrome:</Text> High-sugar diets contribute to the cluster of obesity, hypertension, dyslipidemia, and insulin resistance.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>2. Cardiovascular & Liver Health</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Hypertension & dyslipidemia:</Text> Sugar increases blood pressure and LDL/TG levels.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Atherosclerosis & heart disease:</Text> Via inflammation, dyslipidemia, and obesity, sugar raises cardiovascular risk.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Non-alcoholic fatty liver disease (NAFLD):</Text> Especially fructose overload triggers fat accumulation in the liver.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>3. Oral & Skeletal Health</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Tooth decay (caries):</Text> Sugar fuels enamel-destroying bacteria; widespread global impact.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Bone mineral density loss:</Text> Frequent cola consumption linked to diminished bone health in women.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>4. Inflammation & Immune Function</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Chronic inflammation:</Text> High sugar elevates inflammatory markers, contributing to many chronic conditions.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Weakened immune responses:</Text> Overconsumption may impair immune function and increase vulnerability to illness.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>5. Gastrointestinal & Renal Effects</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Ectopic fat & inflammation:</Text> Sugar consumption leads to fat deposition in liver and muscle with downstream metabolic dysfunction.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Kidney damage:</Text> Sugar-sweetened drinks are linked to chronic kidney disease and higher rates of kidney stones.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>6. Neurological & Cognitive Effects</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Cognitive decline:</Text> High sugar diets have been connected to reduced cognitive function and dementia risk.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Mood disorders & cravings:</Text> Sugar triggers dopamine-driven reward loops, fueling addictive behaviors and impacting mood stability.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>7. Cancer Risk</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Indirect cancer association:</Text> While sugar doesn't directly cause tumors, it contributes to obesity, inflammation, and metabolic dysregulation—all known cancer risk factors.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>8. Skin & Collagen (Glycation) Effects</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Accelerated aging & glycation:</Text> Sugar reacts with proteins (AGEs), damaging collagen and accelerating skin aging and other tissue deterioration.</Text>
          </View>
        </View>
        
        <View style={styles.healthSection}>
          <Text style={styles.healthSectionTitle}>9. Additive & Indirect Pathways (Ultra‑Processed Foods)</Text>
          <View style={styles.healthItemsList}>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Hyperpalatable overeating & brain rewiring:</Text> Processed foods high in sugar can alter appetite control regions in the brain.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Nutrient displacement:</Text> Extra calories from sugar displace essential nutrients, undermining dietary quality.</Text>
            <Text style={styles.healthItem}>• <Text style={styles.healthItemBold}>Exposure to toxins:</Text> Sugary processed drinks may contain benzene; heating/drying sugar also leads to harmful AGEs.</Text>
          </View>
        </View>
        
        <View style={styles.healthSummarySection}>
          <Text style={styles.healthSummaryTitle}>🧭 Summary: Sugar's Ripple Effect</Text>
          <Text style={styles.healthSummaryText}>
            Sugar's harm isn't limited to one system: Metabolic disturbance → Inflammation → Chronic diseases → Cognitive & immune decline, with cascading effects across every bodily system—oral and skeletal health, skin aging, and even liver and renal stress.
          </Text>
        </View>
      </View>
      
      <View style={[styles.section, shadows.small]} id="hidden-truth">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🚨 What They Don&apos;t Want You to Know About Sugar</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('hidden-truth')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('hidden-truth') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('hidden-truth') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={styles.text}>
          The sugar industry has spent decades manipulating science, suppressing research, and hijacking your brain's reward system. Here's the hidden truth:
        </Text>
        
        <View style={styles.hiddenSection}>
          <Text style={styles.hiddenSectionTitle}>🕵️ Industry Cover-Ups & Scientific Manipulation</Text>
          <View style={styles.hiddenItemsList}>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>The Sugar Papers (1960s):</Text> Internal documents revealed the sugar industry paid Harvard researchers $6,500 to publish studies blaming fat—not sugar—for heart disease, fundamentally shifting dietary guidelines for decades.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Buried Cancer Studies:</Text> The Sugar Research Foundation terminated and buried animal studies in 1970 that showed sucrose linked to bladder cancer and heart disease—studies that could have changed public health policy.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>WHO Manipulation:</Text> Sugar lobbyists have repeatedly pressured the World Health Organization to weaken sugar intake recommendations, threatening to withdraw U.S. funding when guidelines became "too restrictive."</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Dietary Guidelines Hijacking:</Text> Corporate-funded research groups use flawed methodologies (demanding impossible "placebo diets") to discredit evidence against sugar, creating artificial doubt about established science.</Text>
          </View>
        </View>
        
        <View style={styles.hiddenSection}>
          <Text style={styles.hiddenSectionTitle}>🧠 Your Brain on Sugar: The Addiction Machine</Text>
          <View style={styles.hiddenItemsList}>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Cocaine-Level Brain Hijacking:</Text> Brain imaging shows sugar activates the same reward pathways as cocaine and heroin—the nucleus accumbens and prefrontal cortex—creating genuine chemical addiction.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Dopamine Manipulation:</Text> Sugar triggers massive dopamine releases, but your brain adapts by reducing dopamine receptors, requiring more sugar to feel "normal"—classic addiction physiology.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Dual-Sensor System:</Text> You have sugar sensors in both your mouth AND gut that independently signal dopamine release—making sugar twice as addictive as natural foods.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Engineered Addiction:</Text> Food scientists deliberately optimize sugar-fat-salt combinations to hit your "bliss point"—the exact ratio that maximizes cravings and overconsumption.</Text>
          </View>
        </View>
        
        <View style={styles.hiddenSection}>
          <Text style={styles.hiddenSectionTitle}>💀 Hidden Health Devastation</Text>
          <View style={styles.hiddenItemsList}>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>"Type 3 Diabetes" (Alzheimer's):</Text> Researchers now call Alzheimer's "Type 3 Diabetes" due to sugar's direct role in brain degeneration—your brain literally becomes insulin resistant.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Silent Insulin Poisoning:</Text> Your insulin levels can remain dangerously elevated for YEARS while blood sugar appears normal—most doctors never test insulin, missing this critical early warning.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Accelerated Aging (AGEs):</Text> Sugar creates Advanced Glycation End-products that literally "caramelize" your proteins, destroying collagen and accelerating aging from the inside out.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Immune System Sabotage:</Text> Just 75g of sugar (one soda) can suppress your immune system for up to 5 hours, making you vulnerable to infections and illness.</Text>
          </View>
        </View>
        
        <View style={styles.hiddenSection}>
          <Text style={styles.hiddenSectionTitle}>🏛️ Government & Industry Collusion</Text>
          <View style={styles.hiddenItemsList}>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>USDA Conflicts:</Text> The same agency that promotes agriculture (including corn/sugar) creates dietary guidelines—an obvious conflict of interest that prioritizes industry profits over public health.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Lobbying Power:</Text> Sugar and corn syrup industries spend millions annually lobbying against sugar taxes, warning labels, and consumption limits—the same tactics used by Big Tobacco.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>"Low-Fat" Deception:</Text> The 1980s "low-fat craze" was industry-engineered to replace healthy fats with sugar and refined carbs, directly causing the obesity epidemic while appearing "healthy."</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Regulatory Capture:</Text> Former sugar industry executives regularly move to FDA and USDA positions, ensuring favorable policies and weak enforcement.</Text>
          </View>
        </View>
        
        <View style={styles.hiddenSection}>
          <Text style={styles.hiddenSectionTitle}>🎯 Targeted Manipulation Tactics</Text>
          <View style={styles.hiddenItemsList}>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Children as Targets:</Text> Sugar companies specifically target children with cartoon mascots and school partnerships, creating lifelong addictions during critical brain development.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>"Health Halo" Marketing:</Text> Products labeled "low-fat," "natural," or "organic" often contain MORE sugar than regular versions, exploiting health-conscious consumers.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Hidden Sugar Names:</Text> Over 60 different names for sugar on ingredient labels (dextrose, maltodextrin, rice syrup, etc.) deliberately confuse consumers trying to avoid sugar.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Portion Size Manipulation:</Text> "Serving sizes" on nutrition labels are deliberately unrealistic (who drinks 1/3 of a soda?) to hide true sugar content.</Text>
          </View>
        </View>
        
        <View style={styles.hiddenSection}>
          <Text style={styles.hiddenSectionTitle}>⚠️ The Suppressed Science</Text>
          <View style={styles.hiddenItemsList}>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Fructose = Alcohol Without the Buzz:</Text> Fructose is metabolized exactly like alcohol in your liver, causing the same damage (fatty liver, inflammation) but without the intoxication warning.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Sugar Withdrawal is Real:</Text> MRI studies show sugar withdrawal causes the same brain changes as drug withdrawal—anxiety, depression, cravings, and cognitive impairment.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Epigenetic Damage:</Text> High sugar consumption can alter your gene expression and pass metabolic dysfunction to your children—literally programming future generations for disease.</Text>
            <Text style={styles.hiddenItem}>• <Text style={styles.hiddenItemBold}>Microbiome Destruction:</Text> Sugar feeds harmful gut bacteria while starving beneficial ones, creating dysbiosis linked to depression, autoimmune disease, and chronic inflammation.</Text>
          </View>
        </View>
        
        <View style={styles.warningSection}>
          <Text style={styles.warningTitle}>🚨 The Bottom Line</Text>
          <Text style={styles.warningText}>
            Sugar isn't just "empty calories"—it's an addictive substance that hijacks your brain, destroys your metabolism, and accelerates aging. The industry has spent billions ensuring you stay addicted while suppressing the science that could save your life. Every major chronic disease epidemic (obesity, diabetes, heart disease, Alzheimer's) correlates directly with increased sugar consumption.
          </Text>
          <Text style={styles.warningText}>
            You're not lacking willpower—you're fighting a multi-billion dollar addiction machine designed to keep you consuming. The first step to freedom is understanding you've been deliberately targeted.
          </Text>
        </View>
      </View>
      
      <View style={[styles.section, shadows.small]} id="better-choices">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>✅ Making Better Choices</Text>
          <Pressable
            style={styles.favoriteButton}
            onPress={() => toggleSectionFavorite('better-choices')}
          >
            <Heart
              size={20}
              color={isEducationFavorite('better-choices') ? colors.bad : colors.textSecondary}
              fill={isEducationFavorite('better-choices') ? colors.bad : 'transparent'}
            />
          </Pressable>
        </View>
        <Text style={styles.text}>
          When choosing sweeteners, consider these factors:
        </Text>
        <View style={styles.tips}>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>1</Text>
            <Text style={styles.tipText}>
              Choose natural, minimally processed sweeteners when possible
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>2</Text>
            <Text style={styles.tipText}>
              Consider the glycemic index for blood sugar management
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>3</Text>
            <Text style={styles.tipText}>
              Be aware of added sugars in processed foods
            </Text>
          </View>
          <View style={styles.tip}>
            <Text style={styles.tipNumber}>4</Text>
            <Text style={styles.tipText}>
              Moderate total sugar intake regardless of source
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  giScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  giIndicator: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  giText: {
    color: 'white',
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  giValue: {
    color: 'white',
    fontSize: 14,
  },
  processingLevels: {
    marginTop: 8,
  },
  processingLevel: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  processingIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
    marginTop: 4,
  },
  processingInfo: {
    flex: 1,
  },
  processingTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  processingText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  artificialSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  artificialSubtitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 8,
  },
  typesList: {
    marginBottom: 8,
  },
  typeItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  note: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 8,
  },
  effectsTable: {
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700' as const,
    color: colors.primaryDark,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tableCellBold: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.text,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    lineHeight: 16,
  },
  recommendationsList: {
    marginTop: 8,
  },
  recommendation: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  recommendationNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '700' as const,
    fontSize: 12,
    marginRight: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  summarySection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  bufferingSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bufferingTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: 6,
  },
  bufferingFunction: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  bufferingUse: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  bufferingExamplesTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  examplesList: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  exampleItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 2,
  },
  whyItWorks: {
    fontSize: 13,
    color: colors.primary,
    fontStyle: 'italic',
    backgroundColor: colors.primaryLight + '20',
    padding: 8,
    borderRadius: 6,
  },
  healthSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  healthSectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 8,
  },
  healthItemsList: {
    marginBottom: 8,
  },
  healthItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  healthItemBold: {
    fontWeight: '600' as const,
    color: colors.primary,
  },
  healthSummarySection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 8,
  },
  healthSummaryTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: 8,
  },
  healthSummaryText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  healthImpacts: {
    marginTop: 8,
  },
  healthImpact: {
    marginBottom: 16,
  },
  healthImpactTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  healthImpactText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  tips: {
    marginTop: 8,
  },
  tip: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '700' as const,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  hiddenSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hiddenSectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: colors.bad,
    marginBottom: 8,
  },
  hiddenItemsList: {
    marginBottom: 8,
  },
  hiddenItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  hiddenItemBold: {
    fontWeight: '600' as const,
    color: colors.bad,
  },
  warningSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.bad + '15',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.bad + '40',
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.bad,
    marginBottom: 12,
  },
  warningText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  navigationSection: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  navigationTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  navigationButton: {
    width: '48%',
    backgroundColor: colors.primaryLight + '20',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight + '40',
  },
  navigationEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  navigationText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  splashSection: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#9C27B0',
  },
  splashTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#9C27B0',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  definitionCard: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  definitionTerm: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 4,
  },
  definitionPronunciation: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  definitionText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  definitionArrow: {
    fontSize: 16,
    color: '#9C27B0',
    marginBottom: 4,
  },
  definitionIncludes: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  definitionQuote: {
    backgroundColor: colors.primaryLight + '15',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#9C27B0',
  },
  quoteText: {
    fontSize: 14,
    color: colors.text,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  variantSection: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  variantTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#9C27B0',
    marginBottom: 12,
  },
  variantList: {
    paddingLeft: 8,
  },
  variantItem: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 6,
  },
  variantBold: {
    fontWeight: '600' as const,
    color: colors.primary,
  },
});