export type Course = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "All Levels";
  /** Editable placeholder — do not invent durations or certifications */
  duration: string;
  summary: string;
  outcomes: string[];
  /** 01, 02... for the editorial numbering */
  number: string;
  image?: string;
  images?: string[];
  instructor?: string;
};

/**
 * ⚠️ PLACEHOLDER CONTENT — durations, curriculum depth and any certification
 * claims must be replaced with real information before launch.
 */
export const courses: Course[] = [
  {
    id: "master-course",
    number: "01",
    title: "Master Course",
    level: "All Levels",
    duration: "5 months",
    instructor: "Taught by Lucky Solanki · Assisted by Karan Parmar",
    summary: "A complete tattoo education pathway moving from drawing fundamentals to tattooing, colour, designing, and the professional mindset required to build a lasting studio practice.",
    outcomes: [
      "Drawing: form, value, dimension, light, anatomy, perspective",
      "Tattooing: tools, needles, hygiene, lining, colour, realism, shading",
      "Colour: theory, packing, blending, harmony, texture, live demonstration",
      "Designing: Photoshop, Illustrator, iPad sketching, composition and body flow",
      "Management: client care, communication, studio systems, marketing and social media",
    ],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drawing%2001-pJ4Y8s3Tta71lHn2rQMI8vrZ7QjHC9.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tattooing%2002-YY5LGkuspresZIjV5p5D4wSZoc5pJt.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Tat%2003-TAidZ09pCoatYYTlb4jibhvoP7aVeF.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Designing%2004-dtVezGolcT80At2vVKhjGd7LftjcSX.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mngmant%2005-7qrjYTdmT3IxBwBNi6VuG9TjUkMOnL.jpg",
    ],
  },
  {
    id: "fundamentals",
    number: "01",
    title: "Beginner Tattoo Fundamentals",
    level: "Beginner",
    duration: "[Duration TBC]",
    summary:
      "The foundation every tattoo artist needs: drawing discipline, studio culture, and what professional tattooing actually demands before a machine is ever picked up.",
    outcomes: [
      "Design translation from paper to skin",
      "Studio etiquette & professional mindset",
      "Understanding the tattoo workflow end-to-end",
    ],
  },
  {
    id: "design-drawing",
    number: "02",
    title: "Tattoo Design & Drawing",
    level: "Beginner",
    duration: "[Duration TBC]",
    summary:
      "Train the hand before the machine. Composition, flash studies, custom design thinking and building drawings that belong on a body — not just on paper.",
    outcomes: [
      "Composition & flow for body placement",
      "Original flash design & custom briefs",
      "Building a repeatable drawing practice",
    ],
  },
  {
    id: "machine-needle",
    number: "03",
    title: "Machine & Needle Fundamentals",
    level: "Beginner",
    duration: "[Duration TBC]",
    summary:
      "Coils, rotors, cartridges and voltage — how machines actually work, how needles behave in skin, and how to set up and tear down safely every single time.",
    outcomes: [
      "Machine types, tuning & troubleshooting",
      "Needle groups and their use cases",
      "Setup & breakdown without shortcuts",
    ],
  },
  {
    id: "linework",
    number: "04",
    title: "Linework",
    level: "Intermediate",
    duration: "[Duration TBC]",
    summary:
      "The discipline that separates professionals from hobbyists. Line weight, deliberate trajectories, and confident single-pass lines on practice material.",
    outcomes: [
      "Line weight & consistency control",
      "Hand speed and depth awareness",
      "Repairing and owning mistakes",
    ],
  },
  {
    id: "shading",
    number: "05",
    title: "Shading",
    level: "Intermediate",
    duration: "[Duration TBC]",
    summary:
      "Black & grey gradients, whip shading, packing and texture — building smooth, healed-friendly value transitions that give tattoos depth.",
    outcomes: [
      "Smooth gradient building",
      "Whip shading, packing & texture techniques",
      "Designing for how tattoos age",
    ],
  },
  {
    id: "colour-theory",
    number: "06",
    title: "Colour Theory",
    level: "Intermediate",
    duration: "[Duration TBC]",
    summary:
      "Pigment behaviour in skin, palette building, saturation strategy and colour packing — plus how colour reads across different skin tones over time.",
    outcomes: [
      "Pigment chemistry fundamentals",
      "Colour packing without trauma",
      "Skin-tone-aware palette decisions",
    ],
  },
  {
    id: "hygiene",
    number: "07",
    title: "Hygiene & Studio Practice",
    level: "All Levels",
    duration: "[Duration TBC]",
    summary:
      "Non-negotiable. Cross-contamination control, sterile field setup, surface disinfection, safe waste handling and the routines that keep clients safe.",
    outcomes: [
      "Cross-contamination prevention",
      "Sterile setup & single-use discipline",
      "Aftercare guidance done right",
    ],
  },
  {
    id: "consultation",
    number: "08",
    title: "Client Consultation",
    level: "All Levels",
    duration: "[Duration TBC]",
    summary:
      "Turning ideas into designs and strangers into returning clients. Listening, expectation-setting, pricing conversations and saying no when you should.",
    outcomes: [
      "Consultation structure that converts",
      "Managing expectations honestly",
      "Design briefing for custom work",
    ],
  },
  {
    id: "portfolio",
    number: "09",
    title: "Portfolio Building",
    level: "All Levels",
    duration: "[Duration TBC]",
    summary:
      "Your portfolio is your resume. Shooting work properly, selecting ruthlessly, presenting healed results and building the body of work you want to be booked for.",
    outcomes: [
      "Photographing tattoos correctly",
      "Curation & presentation strategy",
      "Planning the work you want to attract",
    ],
  },
];

export const academyFaqs = [
  {
    question: "Do I need drawing experience to join?",
    answer:
      "You need willingness, not mastery. The curriculum starts with drawing discipline before any machine work — but students who already draw regularly progress faster.",
  },
  {
    question: "Is there a certification at the end?",
    answer:
      "We're finalising the program structure. Certification details will be announced with real course documentation — we don't hand out paper without proof of skill.",
  },
  {
    question: "Will I tattoo real people during training?",
    answer:
      "Only after passing practical checkpoints on practice material, and always under direct supervision. Client safety is never a training exercise.",
  },
  {
    question: "How do I apply?",
    answer:
      "Send an enquiry through this page or message us on WhatsApp with a bit about you and, if you have one, sketches of your work. We shortlist from there.",
  },
];
