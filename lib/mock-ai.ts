// TODO: Replace this mock with real Anthropic Claude API call

export interface QACard {
  front: string;
  back: string;
  format: "qa";
}

export interface MCQCard {
  front: string;
  back: string;
  format: "mcq";
  options: string[];
  correctAnswer: string;
}

export type Flashcard = QACard | MCQCard;

const MOCK_QA_PAIRS: Array<{ front: string; back: string }> = [
  // Biology
  {
    front: "What is the powerhouse of the cell?",
    back: "The mitochondria — organelles that generate ATP through cellular respiration, providing energy for cellular processes.",
  },
  {
    front: "What is the process by which plants make food?",
    back: "Photosynthesis — plants use sunlight, water, and carbon dioxide to produce glucose and oxygen via chlorophyll in chloroplasts.",
  },
  {
    front: "What is DNA?",
    back: "Deoxyribonucleic acid — a double-helix molecule that carries genetic information in all living organisms and many viruses.",
  },
  {
    front: "What is osmosis?",
    back: "The passive movement of water molecules through a semi-permeable membrane from a region of low solute concentration to high solute concentration.",
  },
  {
    front: "What are the four bases in DNA?",
    back: "Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). A pairs with T, and G pairs with C via hydrogen bonds.",
  },
  // Chemistry
  {
    front: "What is the periodic table?",
    back: "A tabular arrangement of chemical elements organized by atomic number, electron configuration, and recurring chemical properties.",
  },
  {
    front: "What is Avogadro's number?",
    back: "6.022 × 10²³ — the number of atoms, molecules, or particles in one mole of a substance.",
  },
  {
    front: "What is an isotope?",
    back: "Atoms of the same element that have the same number of protons but different numbers of neutrons, giving them different mass numbers.",
  },
  {
    front: "Define a covalent bond.",
    back: "A chemical bond formed by the sharing of one or more pairs of electrons between two atoms, resulting in mutual stability.",
  },
  {
    front: "What is the pH scale?",
    back: "A logarithmic scale from 0–14 measuring the acidity or alkalinity of a solution. pH 7 is neutral, below 7 is acidic, above 7 is alkaline.",
  },
  // Physics
  {
    front: "State Newton's First Law of Motion.",
    back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.",
  },
  {
    front: "What is the speed of light?",
    back: "Approximately 299,792,458 metres per second (m/s) in a vacuum, often denoted as 'c'.",
  },
  {
    front: "What is kinetic energy?",
    back: "The energy an object possesses due to its motion. KE = ½mv², where m is mass and v is velocity.",
  },
  {
    front: "What is Ohm's Law?",
    back: "V = IR — the voltage (V) across a conductor equals the current (I) flowing through it multiplied by its resistance (R).",
  },
  {
    front: "What is the electromagnetic spectrum?",
    back: "The full range of electromagnetic radiation, from radio waves to gamma rays: radio, microwave, infrared, visible light, UV, X-ray, gamma.",
  },
  // Mathematics
  {
    front: "What is the Pythagorean theorem?",
    back: "In a right-angled triangle: a² + b² = c², where c is the hypotenuse and a, b are the other two sides.",
  },
  {
    front: "What is a derivative in calculus?",
    back: "A measure of how a function changes as its input changes — the instantaneous rate of change or slope of the tangent line at a point.",
  },
  {
    front: "Define a prime number.",
    back: "A natural number greater than 1 that has no positive divisors other than 1 and itself. Examples: 2, 3, 5, 7, 11, 13.",
  },
  {
    front: "What is the Fibonacci sequence?",
    back: "A sequence where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, … starting from 0 and 1.",
  },
  {
    front: "What is Euler's identity?",
    back: "e^(iπ) + 1 = 0 — considered the most beautiful equation in mathematics, linking five fundamental constants: e, i, π, 1, and 0.",
  },
  // History
  {
    front: "When did World War II end?",
    back: "World War II ended in 1945 — in Europe on May 8 (V-E Day) and in the Pacific on September 2 (V-J Day) after Japan's formal surrender.",
  },
  {
    front: "Who was the first President of the United States?",
    back: "George Washington, who served two terms from 1789 to 1797 and was unanimously elected by the Electoral College.",
  },
  {
    front: "What was the Renaissance?",
    back: "A cultural and intellectual movement in Europe from the 14th to 17th century, reviving classical learning and inspiring art, science, and philosophy.",
  },
  {
    front: "What was the French Revolution?",
    back: "A period of radical political and societal transformation in France (1789–1799) that overthrew the monarchy and established a republic based on Enlightenment principles.",
  },
  {
    front: "Who wrote the Magna Carta and when?",
    back: "King John of England signed the Magna Carta in 1215, establishing the principle that everyone, including the king, is subject to the rule of law.",
  },
  // Computer Science
  {
    front: "What is Big O notation?",
    back: "A mathematical notation describing the limiting behavior of a function, used in CS to classify algorithm efficiency by time or space complexity.",
  },
  {
    front: "What is the difference between a stack and a queue?",
    back: "A stack is LIFO (Last In, First Out) — the last element added is the first removed. A queue is FIFO (First In, First Out) — elements are removed in the order they were added.",
  },
  {
    front: "What is recursion?",
    back: "A programming technique where a function calls itself to solve smaller instances of the same problem, with a base case to stop infinite loops.",
  },
  {
    front: "What is object-oriented programming?",
    back: "A paradigm based on 'objects' — instances of classes that encapsulate data (attributes) and behavior (methods), promoting reusability and modularity.",
  },
  {
    front: "What is a binary search algorithm?",
    back: "An efficient search algorithm that finds a target in a sorted array by repeatedly halving the search space. Time complexity: O(log n).",
  },
  {
    front: "What is the difference between HTTP and HTTPS?",
    back: "HTTP (HyperText Transfer Protocol) transmits data in plain text. HTTPS adds SSL/TLS encryption for secure, authenticated communication between client and server.",
  },
];

const MOCK_MCQ_QUESTIONS: Array<{
  front: string;
  options: string[];
  correctAnswer: string;
}> = [
  {
    front: "Which organelle is responsible for protein synthesis in a cell?",
    options: ["Mitochondria", "Ribosome", "Nucleus", "Golgi apparatus"],
    correctAnswer: "Ribosome",
  },
  {
    front: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
  },
  {
    front: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mars", "Mercury"],
    correctAnswer: "Mercury",
  },
  {
    front: "In which year did the Berlin Wall fall?",
    options: ["1985", "1987", "1989", "1991"],
    correctAnswer: "1989",
  },
  {
    front: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Processing Unit",
      "Core Processing Utility",
      "Central Program Utility",
    ],
    correctAnswer: "Central Processing Unit",
  },
  {
    front: "Who developed the theory of general relativity?",
    options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Max Planck"],
    correctAnswer: "Albert Einstein",
  },
  {
    front: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Carbon dioxide", "Argon", "Nitrogen"],
    correctAnswer: "Nitrogen",
  },
  {
    front: "Which data structure operates on a LIFO principle?",
    options: ["Queue", "Stack", "Linked list", "Heap"],
    correctAnswer: "Stack",
  },
  {
    front: "What is the value of π (pi) to two decimal places?",
    options: ["3.12", "3.14", "3.16", "3.18"],
    correctAnswer: "3.14",
  },
  {
    front: "Which ancient wonder was located in Alexandria, Egypt?",
    options: [
      "The Hanging Gardens",
      "The Colossus of Rhodes",
      "The Lighthouse of Alexandria",
      "The Temple of Artemis",
    ],
    correctAnswer: "The Lighthouse of Alexandria",
  },
  {
    front: "What is the time complexity of a linear search algorithm?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
  },
  {
    front: "Which programming language is known for its use in data science?",
    options: ["Java", "C++", "Python", "Ruby"],
    correctAnswer: "Python",
  },
  {
    front: "What is the SI unit of electric current?",
    options: ["Volt", "Watt", "Ohm", "Ampere"],
    correctAnswer: "Ampere",
  },
  {
    front: "Which of these is NOT a primary color of light (additive)?",
    options: ["Red", "Green", "Yellow", "Blue"],
    correctAnswer: "Yellow",
  },
  {
    front: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
    correctAnswer: "Mitochondria",
  },
  {
    front: "Which law states that the volume of a gas is directly proportional to temperature?",
    options: [
      "Boyle's Law",
      "Charles's Law",
      "Avogadro's Law",
      "Gay-Lussac's Law",
    ],
    correctAnswer: "Charles's Law",
  },
  {
    front: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "Geoffrey Chaucer",
      "William Shakespeare",
      "John Milton",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    front: "What does RAM stand for?",
    options: [
      "Random Access Memory",
      "Read Access Memory",
      "Rapid Access Module",
      "Random Array Memory",
    ],
    correctAnswer: "Random Access Memory",
  },
  {
    front: "Which bone is the longest in the human body?",
    options: ["Humerus", "Tibia", "Femur", "Radius"],
    correctAnswer: "Femur",
  },
  {
    front: "What is the chemical formula for water?",
    options: ["HO", "H2O", "H2O2", "OH"],
    correctAnswer: "H2O",
  },
  {
    front: "In which century did the Industrial Revolution begin?",
    options: [
      "16th century",
      "17th century",
      "18th century",
      "19th century",
    ],
    correctAnswer: "18th century",
  },
  {
    front: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Standard Query Logic",
      "Sequential Query Language",
    ],
    correctAnswer: "Structured Query Language",
  },
  {
    front: "Which country invented paper?",
    options: ["Egypt", "China", "India", "Greece"],
    correctAnswer: "China",
  },
  {
    front: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Quartz", "Diamond", "Titanium"],
    correctAnswer: "Diamond",
  },
  {
    front: "Which type of bond involves the transfer of electrons between atoms?",
    options: [
      "Covalent bond",
      "Metallic bond",
      "Ionic bond",
      "Hydrogen bond",
    ],
    correctAnswer: "Ionic bond",
  },
  {
    front: "What is the largest organ of the human body?",
    options: ["Liver", "Brain", "Skin", "Lungs"],
    correctAnswer: "Skin",
  },
  {
    front: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble sort", "Insertion sort", "Merge sort", "Selection sort"],
    correctAnswer: "Merge sort",
  },
  {
    front: "What was the first programmable computer?",
    options: ["ENIAC", "Colossus", "IBM 360", "Apple I"],
    correctAnswer: "Colossus",
  },
  {
    front: "Which philosopher wrote 'The Republic'?",
    options: ["Aristotle", "Socrates", "Plato", "Descartes"],
    correctAnswer: "Plato",
  },
  {
    front: "What is the main function of the kidneys?",
    options: [
      "Produce insulin",
      "Filter blood and produce urine",
      "Regulate heartbeat",
      "Produce red blood cells",
    ],
    correctAnswer: "Filter blood and produce urine",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateMockFlashcards(
  count: number,
  format: "qa" | "mcq",
  input?: string
): Flashcard[] {
  // TODO: Replace this mock with real Anthropic Claude API call
  // The real implementation would:
  // 1. Send the input text/topic to Claude with a structured prompt
  // 2. Parse the JSON response into flashcard objects
  // 3. Return the generated cards

  if (format === "qa") {
    const shuffled = shuffleArray(MOCK_QA_PAIRS);
    return shuffled.slice(0, Math.min(count, shuffled.length)).map((pair) => ({
      front: pair.front,
      back: pair.back,
      format: "qa" as const,
    }));
  } else {
    const shuffled = shuffleArray(MOCK_MCQ_QUESTIONS);
    return shuffled
      .slice(0, Math.min(count, shuffled.length))
      .map((q) => ({
        front: q.front,
        back: q.correctAnswer,
        format: "mcq" as const,
        options: shuffleArray(q.options),
        correctAnswer: q.correctAnswer,
      }));
  }
}
