import { query } from "./_generated/server";

export const listAllAlumni = query({
  handler: async (ctx) => {
    return await ctx.db.query("alumni").collect();
  },
});