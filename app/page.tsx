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
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-[url('/school-bg.png')] bg-cover bg-center opacity-5" />

      <a
        href="https://smsmayurvihar.org/"
        className="absolute top-8 left-8 z-20 group"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 backdrop-blur-2xl border border-white/80 hover:bg-white/70 hover:border-white/90 transition-all duration-300 shadow-lg shadow-black/5">
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium text-slate-700">Back</span>
        </div>
      </a>

      <div className="absolute top-8 right-8 z-20">
        <div className="p-2 rounded-2xl bg-white/60 backdrop-blur-2xl border border-white/80 shadow-lg shadow-black/5">
          <img
            src="/favicon.png"
            className="h-10 w-10"
            alt="School Logo"
          />
        </div>
      </div>

      <div className="relative z-10 w-[90%] max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-200/60 via-purple-200/60 to-pink-200/60 rounded-3xl blur-2xl" />
        
        <div className="relative rounded-3xl bg-white/70 backdrop-blur-3xl border border-white/90 shadow-2xl shadow-black/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent" />
          
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/60" />
          
          <div className="relative p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-semibold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-2">
                Alumni Network
              </h1>
              <p className="text-slate-600 text-sm">Verify your credentials to join</p>
            </div>

            <div className="space-y-4">
              <div className="group">
                <div className="relative">
                  <input
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl bg-white/50 backdrop-blur-xl px-5 py-4 outline-none border border-white/80 focus:border-blue-300 focus:bg-white/60 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 placeholder:text-slate-400 shadow-inner shadow-black/5 text-slate-700"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full rounded-2xl bg-white/50 backdrop-blur-xl px-5 py-4 outline-none border border-white/80 focus:border-blue-300 focus:bg-white/60 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 shadow-inner shadow-black/5 text-slate-700 [&::-webkit-calendar-picker-indicator]:opacity-60"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="group">
                <div className="relative">
                  <select
                    value={batchYear}
                    onChange={(e) => setBatchYear(e.target.value)}
                    className="w-full rounded-2xl bg-white/50 backdrop-blur-xl px-5 py-4 outline-none border border-white/80 focus:border-blue-300 focus:bg-white/60 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 appearance-none cursor-pointer shadow-inner shadow-black/5 text-slate-700"
                  >
                    <option value="" className="bg-white">Select Batch Year</option>
                      <option className="bg-white">2009-2010</option>
                      <option className="bg-white">2010-2011</option>
                      <option className="bg-white">2012-2013</option>
                      <option className="bg-white">2013-2014</option>
                      <option className="bg-white">2014-2015</option>
                      <option className="bg-white">2015-2016</option>
                      <option className="bg-white">2016-2017</option>
                      <option className="bg-white">2017-2018</option>
                      <option className="bg-white">2018-2019</option>
                      <option className="bg-white">2019-2020</option>
                      <option className="bg-white">2020-2021</option>
                      <option className="bg-white">2021-2022</option>
                      <option className="bg-white">2022-2023</option>
                      <option className="bg-white">2023-2024</option>
                      <option className="bg-white">2024-2025</option>
                  </select>
                  
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
                </div>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="group relative w-full mt-6"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300" />
                
                <div className="relative rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 px-6 py-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl shadow-lg">
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
                <div className="mt-4 p-4 rounded-2xl bg-red-50/80 backdrop-blur-xl border border-red-200/80">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 text-sm font-medium">
                      Credentials not found. Please re-check your details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />
        </div>
      </div>
    </main>
  );
}