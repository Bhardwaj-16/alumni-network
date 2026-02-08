import { query } from "./_generated/server";
import { v } from "convex/values";

export const verifyAlumni = query({
    args: {
        fullName: v.string(),
        dob: v.string(),
        batchYear: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("alumni")
            .withIndex("by_credentials", (q) =>
                q
                    .eq("fullName", args.fullName)
                    .eq("dob", args.dob)
                    .eq("batchYear", args.batchYear)
            )
            .first();
    },
});