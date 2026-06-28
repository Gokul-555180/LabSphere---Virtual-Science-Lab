import type { Experiment } from '../types';

// Raw list of all 96 experiments requested
const rawExperimentsData = [
  // ==================== CLASS 10 ====================
  // Physics (8)
  {
    id: 'ohms-law',
    name: "Verification of Ohm's Law",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Verify that potential difference across a conductor is proportional to current, and find resistance."
  },
  {
    id: 'resistance-combination',
    name: "Resistance Combination (Series and Parallel)",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Study the equivalent resistance of resistor combinations in series and parallel connections."
  },
  {
    id: 'convex-lens-image',
    name: "Image Formation by Convex Lens",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80',
    simulationId: 'optics-mirror-lens-sim',
    desc: "Observe real/virtual image states by changing object positions in front of a convex lens."
  },
  {
    id: 'plane-mirror-reflection',
    name: "Reflection by Plane Mirror",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80',
    simulationId: 'optics-mirror-lens-sim',
    desc: "Study laws of reflection: angle of incidence equals angle of reflection using a plane mirror."
  },
  {
    id: 'current-conductor-field',
    name: "Magnetic Field Around a Current Carrying Conductor",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&w=400&q=80',
    simulationId: 'default-physics-sim',
    desc: "Trace magnetic field lines around straight wires and coils carrying electrical currents."
  },
  {
    id: 'electromagnetic-induction',
    name: "Electromagnetic Induction",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1141?auto=format&fit=crop&w=400&q=80',
    simulationId: 'default-physics-sim',
    desc: "Generate electric current using magnetic fluxes, verifying Faraday's Laws."
  },
  {
    id: 'power-consumption-circuits',
    name: "Power Consumption in Electrical Circuits",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Calculate electrical power ratings and consumption variables in series and parallel loads."
  },
  {
    id: 'glass-slab-refraction',
    name: "Refraction Through Glass Slab",
    subject: 'Physics',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80',
    simulationId: 'optics-mirror-lens-sim',
    desc: "Measure lateral displacement of light rays refracting through a rectangular glass slab."
  },
  // Chemistry (8)
  {
    id: 'ph-universal-indicator',
    name: "Determination of pH Using Universal Indicator",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Test the pH value of different sample liquids using universal indicator strips."
  },
  {
    id: 'acids-bases-properties',
    name: "Properties of Acids and Bases",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Observe reactions of HCl and NaOH with metals (Zn) and carbonates."
  },
  {
    id: 'soap-prep-study',
    name: "Preparation and Study of Soap",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Prepare soap through saponification of oils and test its cleansing properties."
  },
  {
    id: 'mixtures-separation',
    name: "Separation of Mixtures",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Separate mixture components using sublimation, filtration, and crystallization."
  },
  {
    id: 'chemical-reaction-types',
    name: "Types of Chemical Reactions",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Verify combination, decomposition, displacement, and double displacement reactions."
  },
  {
    id: 'copper-sulphate-crystallization',
    name: "Crystallization of Copper Sulphate",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Obtain pure crystals of copper sulphate from an impure sample via hot saturated solutions."
  },
  {
    id: 'metals-nonmetals-properties',
    name: "Testing the Properties of Metals and Non-metals",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Compare malleability, conductivity, and acidity of oxides for metals and non-metals."
  },
  {
    id: 'carbon-compounds-id',
    name: "Carbon Compounds Identification",
    subject: 'Chemistry',
    class: 'Class 10',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Identify functional groups of organic compounds (esters, acids, alcohols) via reactions."
  },
  // Biology (8)
  {
    id: 'onion-peel-mount',
    name: "Temporary Mount of Onion Peel Cells",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Prepare slides of onion epidermal cells and identify plant cell walls and nuclei."
  },
  {
    id: 'cheek-cells-mount',
    name: "Temporary Mount of Human Cheek Cells",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Prepare and study human cheek cell mounts stained with methylene blue."
  },
  {
    id: 'c10-plant-tissues',
    name: "Study of Plant Tissues",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Identify parenchyma, sclerenchyma, and collenchyma tissues in plants."
  },
  {
    id: 'c10-animal-tissues',
    name: "Study of Animal Tissues",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Examine epithelial, connective, muscular, and nervous tissue slides."
  },
  {
    id: 'photosynthesis-experiment',
    name: "Photosynthesis Experiment",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Verify that light, carbon dioxide, and chlorophyll are essential for photosynthesis."
  },
  {
    id: 'osmosis-raisins',
    name: "Osmosis Using Raisins/Potato",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Calculate endosmosis and exosmosis percentages in raisins or potatoes."
  },
  {
    id: 'flower-parts-id',
    name: "Identification of Parts of a Flower",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Dissect a flower (Hibiscus) to identify sepals, petals, stamens, and pistils."
  },
  {
    id: 'digestive-system-models',
    name: "Study of Human Digestive System Models",
    subject: 'Biology',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Identify parts of the human alimentary canal and associated digestive glands."
  },
  // Computer Science (8)
  {
    id: 'c-program-structure',
    name: "Basic C Program Structure",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Write, compile, and run your first basic C script with standard headers."
  },
  {
    id: 'c-io-programs',
    name: "Input and Output Programs",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Implement character and numeric reading/printing utilizing printf() and scanf()."
  },
  {
    id: 'c-arithmetic-operators',
    name: "Arithmetic Operators",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Evaluate arithmetic expressions using add, subtract, multiply, and modulo."
  },
  {
    id: 'c-conditional-statements',
    name: "Conditional Statements",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Easy',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Control execution flow using if, if-else, nested-if, and switch case switches."
  },
  {
    id: 'c-loops',
    name: "Loops",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Write iterative programs using for, while, and do-while loops."
  },
  {
    id: 'c-functions',
    name: "Functions",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Structure code using user-defined functions with parameter passing."
  },
  {
    id: 'c-arrays',
    name: "Arrays",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Declare and trace 1D arrays storing lists of multiple integers."
  },
  {
    id: 'c-pattern-printing',
    name: "Pattern Printing Programs",
    subject: 'Computer Science',
    class: 'Class 10',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Print star and number patterns using nested loops."
  },

  // ==================== CLASS 11 ====================
  // Physics (8)
  {
    id: 'simple-pendulum',
    name: "Simple Pendulum",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'metre-bridge-sim',
    desc: "Measure gravitational acceleration (g) by plotting l-T^2 curves for simple pendulums."
  },
  {
    id: 'projectile-motion',
    name: "Projectile Motion",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'optics-mirror-lens-sim',
    desc: "Analyze range, height, and trajectory shifts by changing launch angles and velocity."
  },
  {
    id: 'hookes-law',
    name: "Verification of Hooke's Law",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'metre-bridge-sim',
    desc: "Measure structural extension in helical springs to evaluate spring constant R."
  },
  {
    id: 'newton-second-law',
    name: "Verification of Newton's Second Law",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Understand proportional shifts of force, acceleration, and mass variables."
  },
  {
    id: 'friction-study',
    name: "Study of Friction",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'metre-bridge-sim',
    desc: "Trace coefficients of static and sliding friction between wooden surfaces."
  },
  {
    id: 'resonance-tube',
    name: "Resonance Tube Experiment",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'metre-bridge-sim',
    desc: "Determine speed of sound in air at room temperature using tuning forks."
  },
  {
    id: 'parallelogram-law-forces',
    name: "Verification of Parallelogram Law of Forces",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'metre-bridge-sim',
    desc: "Verify resultant vectors using Gravesand's apparatus and hanging weights."
  },
  {
    id: 'young-modulus',
    name: "Young's Modulus Experiment",
    subject: 'Physics',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'vernier-calipers-sim',
    desc: "Calculate modulus elasticity from wire extension using Searles apparatus."
  },
  // Chemistry (8)
  {
    id: 'standard-solution-prep',
    name: "Preparation of Standard Solution",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Prepare standard 250 mL solutions of oxalic acid (0.1M) for analysis."
  },
  {
    id: 'c11-acid-base-titration',
    name: "Acid-Base Titration",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '35 mins',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'acid-base-titration-sim',
    desc: "Perform volumetric neutralization titration of HCl and standard NaOH."
  },
  {
    id: 'purification-crystallization',
    name: "Purification by Crystallization",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Purify alum and copper sulphate samples through recrystallization."
  },
  {
    id: 'paper-chromatography',
    name: "Separation by Paper Chromatography",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Separate ink pigments or leaf extractions, measuring retention factors (Rf)."
  },
  {
    id: 'melting-point-det',
    name: "Determination of Melting Point",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Find the melting point of organic solids (naphthalene, benzoic acid)."
  },
  {
    id: 'boiling-point-det',
    name: "Determination of Boiling Point",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Measure the boiling points of liquid compounds (aniline, acetone)."
  },
  {
    id: 'functional-groups-detect',
    name: "Detection of Functional Groups",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Trace alcohols, carboxylic acids, phenols, and amines in organic compounds."
  },
  {
    id: 'salt-analysis-basic',
    name: "Salt Analysis (Basic)",
    subject: 'Chemistry',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Perform preliminary and wet tests to isolate basic cations and acid anions."
  },
  // Biology (8)
  {
    id: 'plant-cells-study',
    name: "Study of Plant Cells",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Observe plant cell details and identify mitochondria and plastids."
  },
  {
    id: 'animal-cells-study',
    name: "Study of Animal Cells",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Analyze structural differences of cheek cells under high magnification."
  },
  {
    id: 'plasmolysis-study',
    name: "Plasmolysis and Deplasmolysis",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Trace plasmolysis in Rheo leaf epidermal cells using saline solutions."
  },
  {
    id: 'mitosis-observation',
    name: "Mitosis Observation",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Examine chromosomal configurations during metaphase and anaphase."
  },
  {
    id: 'plant-tissues-types',
    name: "Types of Plant Tissues",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Identify vascular cells: xylem, phloem, tracheids, and companion cells."
  },
  {
    id: 'animal-tissue-id',
    name: "Animal Tissue Identification",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Identify striated, non-striated, and cardiac muscles."
  },
  {
    id: 'cell-organelles-study',
    name: "Study of Cell Organelles",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Examine ultra-structure models of mitochondria, chloroplasts, and ribosomes."
  },
  {
    id: 'plant-morphology',
    name: "Plant Morphology",
    subject: 'Biology',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Analyse anatomical modifications of roots, stems, and leaves."
  },
  // Computer Science (8)
  {
    id: 'py11-functions',
    name: "Functions",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Study local/global scoping and default parameter bindings in Python."
  },
  {
    id: 'py11-recursion',
    name: "Recursion",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Trace stack growth during recursive factorials and Fibonacci sequences."
  },
  {
    id: 'py11-arrays',
    name: "Arrays",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Study linear and 2D arrays storing float and integer data values."
  },
  {
    id: 'py11-strings',
    name: "Strings",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Study operations like slicing, concatenation, and reversing string blocks."
  },
  {
    id: 'py11-structures',
    name: "Structures",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Create structures storing heterogenous data parameters."
  },
  {
    id: 'py11-file-handling',
    name: "File Handling",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Implement file reads, writes, and appends utilizing text modes."
  },
  {
    id: 'py11-searching',
    name: "Searching Algorithms",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Trace target-matching loops in Linear and Binary search schemes."
  },
  {
    id: 'py11-sorting',
    name: "Sorting Algorithms",
    subject: 'Computer Science',
    class: 'Class 11',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Study sort methods: Insertion sort, Selection sort, and Bubble sort."
  },

  // ==================== CLASS 12 ====================
  // Physics (8)
  {
    id: 'meter-bridge-exp',
    name: "Meter Bridge Experiment",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'metre-bridge-sim',
    desc: "Measure unknown wire resistance and verify bridge balancing ratios."
  },
  {
    id: 'potentiometer-exp',
    name: "Potentiometer Experiment",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'metre-bridge-sim',
    desc: "Compare primary cells electromotive forces (EMF) using slide potentiometers."
  },
  {
    id: 'kirchhoff-laws',
    name: "Verification of Kirchhoff's Laws",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Verify current loop (KCL) and voltage loop (KVL) equations in circuits."
  },
  {
    id: 'zener-diode-char',
    name: "Zener Diode Characteristics",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Trace reverse breakdown voltage characteristic curves of Zener diodes."
  },
  {
    id: 'pn-junction-diode',
    name: "PN Junction Diode Characteristics",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Verify forward and reverse bias characteristic curves of PN diodes."
  },
  {
    id: 'optics-optical-bench',
    name: "Convex Lens and Optical Bench",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80',
    simulationId: 'optics-mirror-lens-sim',
    desc: "Find the focal length of a convex lens using u-v ray plot methods."
  },
  {
    id: 'prism-dispersion',
    name: "Prism Dispersion",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80',
    simulationId: 'optics-mirror-lens-sim',
    desc: "Analyse light refraction, tracing angle of deviation (D) vs incidence (i)."
  },
  {
    id: 'logic-gates',
    name: "Logic Gates Experiment",
    subject: 'Physics',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ohms-law-sim',
    desc: "Verify truth tables of logic gates: OR, AND, NOT, NAND, and NOR."
  },
  // Chemistry (8)
  {
    id: 'redox-titration',
    name: "Redox Titration",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '35 mins',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'acid-base-titration-sim',
    desc: "Perform titration of KMnO4 standard solution against Mohr's Salt."
  },
  {
    id: 'ph-meter-measurement',
    name: "pH Measurement Using pH Meter",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Calibrate and measure pH of different fruit juices and soil samples."
  },
  {
    id: 'organic-compounds-prep',
    name: "Preparation of Organic Compounds",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Synthesize pure crystals of Acetanilide or Iodoform."
  },
  {
    id: 'esterification',
    name: "Esterification",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Produce sweet-smelling ester liquids by heating alcohols and carboxylic acids."
  },
  {
    id: 'carbohydrates-id',
    name: "Identification of Carbohydrates",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Perform Molisch's and Fehling's tests to identify starch and reducing sugars."
  },
  {
    id: 'proteins-id',
    name: "Identification of Proteins",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Perform Biuret and Xanthoproteic tests to detect protein samples."
  },
  {
    id: 'water-quality-analysis',
    name: "Water Quality Analysis",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Check tap water hardness, salinity, iron traces, and pH counts."
  },
  {
    id: 'salt-analysis-advanced',
    name: "Salt Analysis (Advanced)",
    subject: 'Chemistry',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '35 mins',
    image: 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&w=400&q=80',
    simulationId: 'ph-samples-sim',
    desc: "Systematically analyze inorganic salts containing two cations and anions."
  },
  // Biology (8)
  {
    id: 'dna-extraction',
    name: "DNA Extraction",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Isolate DNA from plant sources (onion or spinach leaves) using cold ethanol."
  },
  {
    id: 'blood-group-det',
    name: "Blood Group Determination",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Observe agglutination reactions using Anti-A, Anti-B, and Anti-D antisera."
  },
  {
    id: 'human-skeleton-study',
    name: "Study of Human Skeleton",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Easy',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Analyse axial and appendicular skeletons, and study joints models."
  },
  {
    id: 'reproductive-system-study',
    name: "Human Reproductive System",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Easy',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Study cross-sectional structures of ovary and testis slides."
  },
  {
    id: 'c12-plant-anatomy',
    name: "Plant Anatomy",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Study vascular arrangements in monocot and dicot stems/roots."
  },
  {
    id: 'ecology-field-study',
    name: "Ecology Field Study Simulation",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Easy',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Determine plant population density and frequency using quadrat method."
  },
  {
    id: 'pedigree-analysis',
    name: "Pedigree Analysis",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Trace inheritance charts of traits (rolling of tongue, color blindness)."
  },
  {
    id: 'health-diseases-study',
    name: "Human Health and Diseases",
    subject: 'Biology',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '15 mins',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    simulationId: 'microscope-cells-sim',
    desc: "Identify disease-causing pathogens: Ascaris, Entamoeba, Plasmodium."
  },
  // Computer Science (8)
  {
    id: 'c12-file-handling',
    name: "File Handling",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Implement write/read routines in Python text and binary (.dat) files."
  },
  {
    id: 'c12-csv-processing',
    name: "CSV Processing",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Load, parse, and write arrays of CSV records using Python module commands."
  },
  {
    id: 'c12-stack-impl',
    name: "Stack Implementation",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Implement Stack using Python Lists with Push, Pop, and Peek functions."
  },
  {
    id: 'c12-queue-impl',
    name: "Queue Implementation",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Implement FIFO Queue using Python Lists, handling underflow bounds."
  },
  {
    id: 'c12-linked-list',
    name: "Linked List",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Build self-referencing Node classes to structure dynamic Linked Lists."
  },
  {
    id: 'c12-database-sql',
    name: "Database (SQL) Basics",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Write DDL and DML commands: SELECT, INSERT, CREATE, and JOIN filters."
  },
  {
    id: 'c12-programming-challenges',
    name: "Mini Programming Challenges",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Medium',
    duration: '25 mins',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Solve CBSE logical puzzles: string palindromes, pattern generation loops."
  },
  {
    id: 'c12-cbse-programming-q',
    name: "CBSE Practical Programming Questions",
    subject: 'Computer Science',
    class: 'Class 12',
    difficulty: 'Hard',
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    simulationId: 'bubble-sort-sim',
    desc: "Solve standard board practical programs mapping to final lab assessments."
  }
];

// Helper builder to generate complete properties for any experiment
const buildExperiment = (raw: typeof rawExperimentsData[0]): Experiment => {
  const isOhmLaw = raw.id === 'ohms-law';

  // Return full structures for already custom built labs
  if (isOhmLaw) {
    return {
      id: raw.id,
      name: raw.name,
      subject: raw.subject as any,
      class: raw.class as any,
      duration: raw.duration,
      difficulty: raw.difficulty as any,
      image: raw.image,
      simulationId: raw.simulationId,
      objectives: [
        "Determine the relation between potential difference (V) and current (I) across a resistor.",
        "Calculate the resistance (R) of a given resistor by plotting a V-I graph.",
        "Understand the factors affecting electrical resistance."
      ],
      theory: "Ohm's Law states that the current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends, provided its temperature and other physical conditions remain constant. Mathematically: V = I * R, where R is a constant called electrical resistance. By plotting current on the x-axis and voltage on the y-axis, we obtain a straight line. The slope of this line corresponds to the resistance of the conductor.",
      apparatus: [
        "Battery Eliminator / DC Power Supply",
        "Ammeter (0-3 A)",
        "Voltmeter (0-3 V)",
        "Unknown Resistor",
        "Rheostat (Variable Resistor)",
        "One-way Key (Switch)",
        "Connecting Wires"
      ],
      materialsRequired: [
        "Sandpaper (to clean connecting wire ends)",
        "Unknown resistance wire"
      ],
      safetyInstructions: [
        "Ensure all connections are tight to avoid contact resistance.",
        "Never keep the key inserted for a long duration, as continuous current heats up the resistor, which changes its resistance.",
        "Double check polarity: positive terminals of ammeter and voltmeter must connect to the positive terminal of the power supply."
      ],
      procedure: [
        "Clean the ends of connecting wires with sandpaper.",
        "Connect the battery, ammeter, rheostat, resistor, switch, and voltmeter as per the circuit diagram. Note: Voltmeter must be connected in parallel across the resistor.",
        "Ensure the key is out (switch is OFF). Adjust the rheostat to maximum resistance position.",
        "Insert the key. Adjust the rheostat slider to obtain a small reading on the voltmeter and ammeter.",
        "Record the current (I) from the ammeter and voltage (V) from the voltmeter.",
        "Shift the rheostat slider slightly to increase the voltage and current. Record the next set of readings.",
        "Take at least 5 readings to plot a proper V-I graph.",
        "Calculate resistance using R = V / I for each reading, and find the average resistance."
      ],
      realLifeApplications: [
        "Design of domestic electrical circuits and appliances.",
        "Fuses use heating effects derived from resistance limits.",
        "Rheostats are used as dimmers in fans and theater lights."
      ],
      commonMistakes: [
        "Connecting the voltmeter in series or the ammeter in parallel.",
        "Leaving the circuit turned ON while not recording readings, leading to overheating.",
        "Reading values with parallax error from the analog dial instruments."
      ],
      quiz: [
        {
          id: 'ohms-q1',
          type: 'mcq',
          question: "If you double the voltage across a constant resistor, what happens to the current flowing through it?",
          options: [
            "It remains the same",
            "It is halved",
            "It is doubled",
            "It is quadrupled"
          ],
          correctAnswer: "It is doubled",
          explanation: "According to Ohm's Law (V = I * R), voltage and current are directly proportional when resistance is constant. Doubling voltage doubles the current."
        },
        {
          id: 'ohms-q2',
          type: 'true-false',
          question: "An ammeter should always be connected in parallel with the component whose current is being measured.",
          correctAnswer: false,
          explanation: "False. An ammeter has very low resistance and must always be connected in series. Connecting it in parallel would cause a short circuit."
        }
      ]
    };
  }

  // Pre-compiled structures for other custom components
  let objectives: string[] = [`Demonstrate the core principles and aims of ${raw.name}.`];
  let theory: string = `${raw.name} is a vital practical experiment in the CBSE ${raw.subject} curriculum for ${raw.class}. It aims to verify foundational scientific theories through empirical testing and data tabulation.`;
  let apparatus: string[] = ["Standard Laboratory Bench Apparatus", "Connecting Wires/Glassware"];
  let materialsRequired: string[] = ["Reagents / Samples", "Distilled Water"];
  let safetyInstructions: string[] = ["Always wear safety goggles and lab coats in the science laboratory.", "Handle equipment with caution. Check wire connections and glassware cracks."];
  let procedure: string[] = [
    "Arrange the apparatus systematically on the laboratory desk.",
    "Log in to the LabSphere simulation board.",
    "Adjust parameter knobs and slide variables to calibrate measurements.",
    "Click 'Record Reading' to log entries in the observation journal."
  ];
  let realLifeApplications: string[] = ["Academic examination training", "Quality assurance testing"];
  let commonMistakes: string[] = ["Taking measurements with parallax error", "Not resetting instrument zero calibrations"];
  let quizQuestion = {
    id: `${raw.id}_q1`,
    type: 'mcq' as const,
    question: `What is the primary scientific principle underlying ${raw.name}?`,
    options: ["Conservation of Mass", "Conservation of Energy", "Chemical Equilibrium", "Empirical Measurement Verification"],
    correctAnswer: "Empirical Measurement Verification",
    explanation: "Virtual laboratories study empirical physical, chemical, biological, and mathematical parameters to verify standard theories."
  };

  // Specific overrides based on subject types
  if (raw.subject === 'Physics') {
    apparatus = ["Vernier Caliper jaws", "Optical Bench setup", "Batteries / Wires", "Galvanometer dials"];
    safetyInstructions = ["Ensure no short circuits occur in the electrical nodes.", "Do not slide jockey components roughly on wires."];
    quizQuestion.question = "In Physics experiments, what does the 'Least Count' of an instrument refer to?";
    quizQuestion.options = ["Maximum value measurable", "Smallest value that can be measured accurately", "Zero calibration alignment", "Instrument temperature coefficient"];
    quizQuestion.correctAnswer = "Smallest value that can be measured accurately";
    quizQuestion.explanation = "Least Count is the smallest division on the scale of the measuring instrument.";
  } else if (raw.subject === 'Chemistry') {
    apparatus = ["Conical Flask", "Burette and stand", "Pipettes", "pH Indicator strip kit"];
    safetyInstructions = ["Handle acids and bases with gloves. They can cause severe chemical burns.", "Acid dilution should always be done by pouring acid into water, never vice versa."];
    quizQuestion.question = "Which pH value denotes a strongly basic/alkaline solution?";
    quizQuestion.options = ["pH 1", "pH 5", "pH 7", "pH 13"];
    quizQuestion.correctAnswer = "pH 13";
    quizQuestion.explanation = "Solutions with pH greater than 7 are basic, and values near 14 are highly basic/alkaline.";
  } else if (raw.subject === 'Biology') {
    apparatus = ["Compound light microscope", "Glass slides and coverslips", "Safranin / Methylene Blue stains"];
    safetyInstructions = ["Handle sharp cutting edges carefully during tissue slice preparations.", "Place the coverslip gently using a needle to avoid bubble occlusion."];
    quizQuestion.question = "Why is glycerine applied on biological slides before mounting coverslips?";
    quizQuestion.options = ["To stain cell structures", "To keep specimen moist and prevent dehydration", "To clear out air bubbles", "To fix slide positions"];
    quizQuestion.correctAnswer = "To keep specimen moist and prevent dehydration";
    quizQuestion.explanation = "Glycerine acts as a mounting medium, maintaining hydration and clear optics under microscope lenses.";
  } else if (raw.subject === 'Computer Science') {
    apparatus = ["Code editor terminal", "Interactive watch debugger", "Variables memory blocks"];
    safetyInstructions = ["Ensure loop boundary variables terminate correctly to prevent infinite loop errors.", "Handle indexing exceptions properly."];
    quizQuestion.question = "What is the time complexity of searching an element in a sorted array of size N using Binary Search?";
    quizQuestion.options = ["O(N)", "O(log N)", "O(N^2)", "O(1)"];
    quizQuestion.correctAnswer = "O(log N)";
    quizQuestion.explanation = "Binary Search repeatedly divides the search interval in half, leading to log2(N) complexity.";
  }

  return {
    id: raw.id,
    name: raw.name,
    subject: raw.subject as any,
    class: raw.class as any,
    duration: raw.duration,
    difficulty: raw.difficulty as any,
    image: raw.image,
    simulationId: raw.simulationId,
    objectives,
    theory,
    apparatus,
    materialsRequired,
    safetyInstructions,
    procedure,
    realLifeApplications,
    commonMistakes,
    quiz: [quizQuestion]
  };
};

export const experiments: Experiment[] = rawExperimentsData.map(buildExperiment);
