import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Mystery Box ledger — the online source of truth for discount codes.
 *
 * When a booking is confirmed the site issues a code here; the studio
 * counter redeems it exactly once via the /redeem page. Codes that were
 * never issued (hand-fabricated) fail validation because they have no
 * ledger row.
 */

const EMPTY = "—";

export const issue = mutation({
  args: {
    code: v.string(),
    percent: v.number(),
    customer: v.optional(v.string()),
    service: v.optional(v.string()),
    size: v.optional(v.string()),
    whatsapp: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("mysteryCodes")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
    // Idempotent: the same code is never double-issued or overwritten.
    if (existing) return existing._id;

    return await ctx.db.insert("mysteryCodes", {
      code: args.code.toUpperCase(),
      percent: args.percent,
      status: "active",
      customer: args.customer ?? EMPTY,
      service: args.service ?? EMPTY,
      size: args.size ?? EMPTY,
      whatsapp: args.whatsapp ?? EMPTY,
      createdAt: Date.now(),
    });
  },
});

export const verify = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("mysteryCodes")
      .withIndex("by_code", (q) => q.eq("code", args.code.trim().toUpperCase()))
      .first();
  },
});

/** Mark a code redeemed at the studio counter. Returns the record or an error. */
export const redeem = mutation({
  args: {
    code: v.string(),
    staff: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const code = args.code.trim().toUpperCase();
    const record = await ctx.db
      .query("mysteryCodes")
      .withIndex("by_code", (q) => q.eq("code", code))
      .first();

    if (!record) return { ok: false as const, error: "not_found" as const };
    if (record.status === "redeemed") {
      return { ok: false as const, error: "already_redeemed" as const, record };
    }
    if (record.status === "void") {
      return { ok: false as const, error: "void" as const, record };
    }

    await ctx.db.patch(record._id, {
      status: "redeemed",
      redeemedAt: Date.now(),
      staff: args.staff ?? EMPTY,
    });
    const updated = await ctx.db.get(record._id);
    if (!updated) return { ok: false as const, error: "not_found" as const };
    return { ok: true as const, record: updated };
  },
});
