import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const verifyAlumni = query({
  args: {
    fullName: v.string(),
    dob: v.string(),
    batchYear: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizeDob = (dob: string) => {
      if (!dob) return "";

      if (dob.includes("/")) {
        const [d, m, y] = dob.split("/");
        return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
      }

      if (dob.includes(".")) {
        const [d, m, y] = dob.split(".");
        return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
      }

      if (dob.includes("-")) {
        const [y, m, d] = dob.split("-");
        return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
      }

      return dob;
    };

    const normalizedDob = normalizeDob(args.dob);

    const alumni = await ctx.db
      .query("alumni")
      .filter((q) =>
        q.and(
          q.eq(q.field("fullName"), args.fullName.trim()),
          q.eq(q.field("dob"), normalizedDob),
          q.eq(q.field("batchYear"), args.batchYear.trim())
        )
      )
      .first();

    return alumni;
  },
});

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

export const getAllAlumni = query({
  handler: async (ctx) => {
    return await ctx.db.query("alumni").order("desc").collect();
  },
});