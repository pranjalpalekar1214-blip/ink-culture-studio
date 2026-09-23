import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * AI Ink Lab — generates a personalized tattoo concept brief from a client's
 * reference image + idea description. Runs server-side so OPENAI_API_KEY
 * never reaches the browser.
 */

const SYSTEM_PROMPT = `You are the senior artist at Street Culture, a custom tattoo & piercing studio in Kandivali West, Mumbai.
You write short, punchy, practical tattoo concept briefs for clients. You are warm and a little playful — never corporate.
You never invent prices, certifications or medical claims. Format output as clean markdown-free plain text with short labelled sections.`;

type VisionContent =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

export const conceptBrief = action({
  args: {
    idea: v.string(),
    placement: v.optional(v.string()),
    style: v.optional(v.string()),
    imageDataUrl: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "The studio hasn't connected its AI key yet (OPENAI_API_KEY missing). Try WhatsApp instead!",
      );
    }

    const userText = [
      `Client's tattoo idea: ${args.idea}`,
      args.placement ? `Placement: ${args.placement}` : "",
      args.style ? `Style preference: ${args.style}` : "",
      args.imageDataUrl
        ? "A reference image is attached — study its subject, linework, shading and mood, and use it to ground the brief."
        : "",
      "",
      "Write a concept brief with exactly these sections:",
      "1. CONCEPT NAME — a short, memorable title",
      "2. THE IDEA — 3-4 sentences describing the design and its story",
      "3. STYLE & LINEWORK — techniques, line weights, shading approach",
      "4. PLACEMENT NOTES — how it flows with the body part mentioned",
      "5. SIZE & SESSIONS — realistic size guidance and rough session count",
      "6. ARTIST MATCH — whether Karan (black & grey realism, geometric) or Lucky (fine line, lettering, neo-traditional) fits better, and why",
      "7. QUESTIONS FOR YOUR ARTIST — 3 sharp questions the client should ask at consultation",
    ]
      .filter(Boolean)
      .join("\n");

    const content: VisionContent[] = [{ type: "text", text: userText }];
    if (args.imageDataUrl) {
      content.push({ type: "image_url", image_url: { url: args.imageDataUrl } });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 900,
        temperature: 0.8,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content },
        ],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`AI request failed (${response.status}). ${detail.slice(0, 200)}`);
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const brief = data.choices?.[0]?.message?.content;
    if (!brief) throw new Error("The model returned an empty brief. Try again!");

    return { brief };
  },
});
