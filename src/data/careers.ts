export type CareerRole = {
  id: string;
  title: string;
  type: string;
  department: string;
  /** Empty until real openings exist */
  status: "Open" | "Coming Soon" | "Closed";
  description: string;
  lookingFor: string[];
};

/**
 * ⚠️ Roles default to "Coming Soon" until the studio confirms openings.
 * Set status: "Open" only when there is a real position.
 */
export const careerRoles: CareerRole[] = [
  {
    id: "tattoo-artists",
    title: "Tattoo Artists",
    type: "Full-time / Guest spots",
    department: "Artistry",
    status: "Coming Soon",
    description:
      "Resident and guest artist positions at our Kandivali West studio. We look for strong fundamentals, a distinct point of view and hygiene discipline that matches ours.",
    lookingFor: [
      "A healed-work portfolio (not just fresh photos)",
      "Confident custom design ability",
      "Professional studio experience",
    ],
  },
  {
    id: "apprentices",
    title: "Apprentices",
    type: "Structured training",
    department: "Artistry",
    status: "Coming Soon",
    description:
      "Apprenticeships run through the Street Culture Academy pathway — drawing first, machines later, clients last. Demanding, slow and worth it.",
    lookingFor: [
      "A drawing habit you can show us",
      "Obsession with the craft, not the lifestyle",
      "Time to commit to real training",
    ],
  },
  {
    id: "content-creators",
    title: "Content Creators",
    type: "Part-time / Project",
    department: "Media",
    status: "Coming Soon",
    description:
      "Shoot and cut the studio's visual identity — sessions, healed work, artist stories. You'd own the camera language of a brand that takes visuals seriously.",
    lookingFor: [
      "Reels/short-form editing chops",
      "An eye for dark, editorial aesthetics",
      "Comfort working around live sessions",
    ],
  },
  {
    id: "social-media",
    title: "Social Media",
    type: "Full-time / Part-time",
    department: "Media",
    status: "Coming Soon",
    description:
      "Own the voice of Street Culture across Instagram and beyond — posting rhythm, community replies and the occasional fully unhinged meme.",
    lookingFor: [
      "Copy that sounds human",
      "Tattoo culture literacy",
      "Basic analytics literacy",
    ],
  },
  {
    id: "studio-roles",
    title: "Studio Roles",
    type: "Full-time / Part-time",
    department: "Operations",
    status: "Coming Soon",
    description:
      "Front-of-house, scheduling, inventory and the hundred invisible things that keep a studio safe and smooth. The backbone of the operation.",
    lookingFor: [
      "Ridiculous attention to detail",
      "Warmth with clients, steel with process",
      "Mumbai commutes you can survive",
    ],
  },
];
