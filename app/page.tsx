"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [subActive, setSubActive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/check-sub")
      .then((res) => res.json())
      .then((data) => setSubActive(data.active))
      .catch(() => setSubActive(true));
  }, []);

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
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-[url('/school-bg.png')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-slate-950/40" />

      <a
        href="https://smsmayurvihar.org/"
        className="absolute top-8 left-8 z-20 group"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg shadow-black/20">
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium text-slate-300">Back</span>
        </div>
      </a>

      <div className="absolute top-8 right-8 z-20">
        <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg shadow-black/20">
          <img src="/favicon.png" className="h-10 w-10" alt="School Logo" />
        </div>
      </div>

      <div className="relative z-10 w-[90%] max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />

        <div className="relative rounded-3xl bg-slate-900/60 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />

          <div className="relative p-8">
            {subActive === null && (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 rounded-full border-2 border-slate-600 border-t-blue-500 animate-spin" />
              </div>
            )}

            {subActive === false && (
              <div className="text-center py-8">
                <div className="flex justify-center mb-5">
                  <div className="p-4 rounded-full bg-red-950/60 border border-red-500/30">
                    <svg
                      className="w-10 h-10 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-slate-100 mb-2">
                  Subscription Disabled
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The subscription has been disabled. Please contact the administrator to restore access.
                </p>
              </div>
            )}

            {/* Normal form */}
            {subActive === true && (
              <>
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-semibold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent mb-2">
                    Alumni Network
                  </h1>
                  <p className="text-slate-400 text-sm">Verify your credentials to join</p>
                </div>

                <div className="space-y-4">
                  <div className="group">
                    <div className="relative">
                      <input
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value.toLowerCase())}
                        className="w-full rounded-2xl bg-slate-800/60 backdrop-blur-xl px-5 py-4 outline-none border border-white/10 focus:border-blue-500/60 focus:bg-slate-800/80 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-500 shadow-inner shadow-black/20 text-slate-200"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full rounded-2xl bg-slate-800/60 backdrop-blur-xl px-5 py-4 outline-none border border-white/10 focus:border-blue-500/60 focus:bg-slate-800/80 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 shadow-inner shadow-black/20 text-slate-200 [&::-webkit-calendar-picker-indicator]:opacity-40 [&::-webkit-calendar-picker-indicator]:invert"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <select
                        value={batchYear}
                        onChange={(e) => setBatchYear(e.target.value)}
                        className="w-full rounded-2xl bg-slate-800/60 backdrop-blur-xl px-5 py-4 outline-none border border-white/10 focus:border-blue-500/60 focus:bg-slate-800/80 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 appearance-none cursor-pointer shadow-inner shadow-black/20 text-slate-200"
                      >
                        <option value="" className="bg-slate-800 text-slate-400">Select Batch Year</option>
                        <option className="bg-slate-800">2009-2010</option>
                        <option className="bg-slate-800">2010-2011</option>
                        <option className="bg-slate-800">2012-2013</option>
                        <option className="bg-slate-800">2013-2014</option>
                        <option className="bg-slate-800">2014-2015</option>
                        <option className="bg-slate-800">2015-2016</option>
                        <option className="bg-slate-800">2016-2017</option>
                        <option className="bg-slate-800">2017-2018</option>
                        <option className="bg-slate-800">2018-2019</option>
                        <option className="bg-slate-800">2019-2020</option>
                        <option className="bg-slate-800">2020-2021</option>
                        <option className="bg-slate-800">2021-2022</option>
                        <option className="bg-slate-800">2022-2023</option>
                        <option className="bg-slate-800">2023-2024</option>
                        <option className="bg-slate-800">2024-2025</option>
                      </select>

                      <svg
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-slate-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="group relative w-full mt-6"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-50 group-hover:opacity-80 transition duration-300" />
                    <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 px-6 py-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl shadow-lg">
                      <span className="font-semibold text-white flex items-center justify-center gap-2">
                        Join WhatsApp Group
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </div>
                  </button>

                  {submitted && alumni === null && (
                    <div className="mt-4 p-4 rounded-2xl bg-red-950/60 backdrop-blur-xl border border-red-500/30">
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-400 text-sm font-medium">
                          Credentials not found. Please re-check your details.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>
      </div>
    </main>
  );
}