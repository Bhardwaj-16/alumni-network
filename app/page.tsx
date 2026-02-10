"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const alumni = useQuery(
    api.alumni.verifyAlumni,
    submitted ? { fullName, dob, batchYear } : "skip"
  );

  useEffect(() => {
    if (alumni?.whatsappLink) {
      window.location.href = alumni.whatsappLink;
    }
  }, [alumni]);

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[url('/school-bg.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />

      <a
        href="https://smsmayurvihar.org/"
        className="absolute top-6 left-6 text-sm opacity-80 hover:opacity-100 transition z-20"
      >
        ← Back
      </a>

      <img
        src="/favicon.png"
        className="absolute top-6 right-6 h-12 z-20"
        alt="School Logo"
      />

      <div className="relative z-10 w-[90%] max-w-md rounded-2xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Alumni Network Access
        </h1>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full rounded-lg bg-black/40 px-4 py-3 outline-none focus:ring-2 focus:ring-white/40"
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="date"
            className="w-full rounded-lg bg-black/40 px-4 py-3 outline-none focus:ring-2 focus:ring-white/40"
            onChange={(e) => setDob(e.target.value)}
          />

          <select
            className="w-full rounded-lg bg-black/40 px-4 py-3 outline-none focus:ring-2 focus:ring-white/40"
            onChange={(e) => setBatchYear(e.target.value)}
          >
            <option value="">Select Batch Year</option>
            <option>2023-2024</option>
            <option>2024-2025</option>
            <option>2025-2026</option>
            <option>2026-2027</option>
          </select>

          <button
            onClick={() => setSubmitted(true)}
            className="w-full rounded-lg bg-white text-black py-3 font-medium hover:scale-[1.02] hover:shadow-lg transition"
          >
            Join WhatsApp Group
          </button>

          {submitted && alumni === null && (
            <p className="text-red-400 text-sm text-center">
              Credentials not found. Please re-check your details.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}