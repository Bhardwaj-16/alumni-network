import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addAlumni = mutation({
  args: {
    fullName: v.string(),
    dob: v.string(),
    batchYear: v.string(),
    whatsappLink: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("alumni", {
      fullName: args.fullName,
      dob: args.dob,
      batchYear: args.batchYear,
      whatsappLink: args.whatsappLink,
    });
  },
});

export const deleteAlumni = mutation({
  args: {
    id: v.id("alumni"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const bulkImportAlumni = mutation({
  args: {
    alumni: v.array(
      v.object({
        fullName: v.string(),
        dob: v.string(),
        batchYear: v.string(),
        whatsappLink: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const student of args.alumni) {
      const id = await ctx.db.insert("alumni", student);
      results.push(id);
    }
    return { count: results.length, ids: results };
  },
});

export const clearAllAlumni = mutation({
  handler: async (ctx) => {
    const allStudents = await ctx.db.query("alumni").collect();
    for (const student of allStudents) {
      await ctx.db.delete(student._id);
    }
    return { deleted: allStudents.length };
  },
});