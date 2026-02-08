import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    alumni: defineTable({
        fullName: v.string(),
        dob: v.string(),
        batchYear: v.string(),
        whatsappLink: v.string(),
    }).index("by_credentials", ["fullName", "dob", "batchYear"]),
});