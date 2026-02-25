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
    const normalizedName = args.fullName.trim().toLowerCase(); // 👈 normalize input name

    const alumni = await ctx.db
      .query("alumni")
      .collect();

    // Filter manually to allow case-insensitive name comparison
    const match = alumni.find(
      (a) =>
        a.fullName.toLowerCase() === normalizedName &&
        a.dob === normalizedDob &&
        a.batchYear.trim() === args.batchYear.trim()
    );

    return match ?? null;
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
      fullName: args.fullName.trim().toLowerCase(), // 👈 store as lowercase
      dob: args.dob,
      batchYear: args.batchYear.trim(),
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
      const id = await ctx.db.insert("alumni", {
        ...student,
        fullName: student.fullName.trim().toLowerCase(), // 👈 store as lowercase
        batchYear: student.batchYear.trim(),
      });
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