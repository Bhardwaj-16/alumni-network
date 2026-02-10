import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getMainEnvironment = query({
  handler: async (ctx) => {
    const config = await ctx.db
      .query("adminConfig")
      .filter((q) => q.eq(q.field("key"), "mainEnvironment"))
      .first();
    return config?.value || "dev";
  },
});

export const setMainEnvironment = mutation({
  args: {
    environment: v.union(v.literal("dev"), v.literal("prod")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("adminConfig")
      .filter((q) => q.eq(q.field("key"), "mainEnvironment"))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.environment });
    } else {
      await ctx.db.insert("adminConfig", {
        key: "mainEnvironment",
        value: args.environment,
      });
    }

    return { success: true, environment: args.environment };
  },
});

export const getAlumniStats = query({
  handler: async (ctx) => {
    const alumni = await ctx.db.query("alumni").collect();
    const batchCounts = alumni.reduce((acc, student) => {
      acc[student.batchYear] = (acc[student.batchYear] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: alumni.length,
      batchCounts,
      recentlyAdded: alumni.slice(-5).reverse(),
    };
  },
});

export const getAllAlumni = query({
  handler: async (ctx) => {
    return await ctx.db.query("alumni").order("desc").collect();
  },
});