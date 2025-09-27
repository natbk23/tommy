import type { NextApiRequest, NextApiResponse } from "next";

type Rec = {
  title: string;
  author: string;
  why: string;
};

// ✅ Must export *a single default function*
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { mood } = req.body;

  if (!mood || typeof mood !== "string") {
    return res.status(400).json({ message: "Please provide a mood." });
  }

  // 🧠 Simple mock recommendation logic
  const recommendations: Rec[] = [
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      why: `A timeless tale of self-discovery, perfect if you’re feeling ${mood}.`,
    },
    {
      title: "Normal People",
      author: "Sally Rooney",
      why: `Captures raw emotion and connection — a great match for when you feel ${mood}.`,
    },
    {
      title: "A Man Called Ove",
      author: "Fredrik Backman",
      why: `Heartwarming and tender — ideal if you're in a ${mood} state of mind.`,
    },
  ];

  return res.status(200).json({ recommendations });
}
