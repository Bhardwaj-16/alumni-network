"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function AdminDashboard() {
  const [selectedEnv, setSelectedEnv] = useState<"dev" | "prod">("dev");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "add" | "manage">(
    "overview"
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const cursorRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    batchYear: "",
    whatsappLink: "",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const mainEnvironment = useQuery(api.admin.getMainEnvironment);
  const alumniStats = useQuery(api.admin.getAlumniStats);
  const allAlumni = useQuery(api.admin.getAllAlumni);

  const setMainEnvironment = useMutation(api.admin.setMainEnvironment);
  const clearAllAlumni = useMutation(api.alumni.clearAllAlumni);
  const addAlumni = useMutation(api.alumni.addAlumni);
  const deleteAlumni = useMutation(api.alumni.deleteAlumni);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const spring = 0.15;
      const friction = 0.75;

      const dx = mousePosition.x - cursorRef.current.x;
      const dy = mousePosition.y - cursorRef.current.y;

      cursorRef.current.vx += dx * spring;
      cursorRef.current.vy += dy * spring;

      cursorRef.current.vx *= friction;
      cursorRef.current.vy *= friction;

      cursorRef.current.x += cursorRef.current.vx;
      cursorRef.current.y += cursorRef.current.vy;

      setCursorPosition({
        x: cursorRef.current.x,
        y: cursorRef.current.y,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin@1243") setIsAuthenticated(true);
    else alert("Invalid password");
  };

  const handleAddAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.dob || !formData.batchYear) {
      alert("Please fill all required fields");
      return;
    }
    await addAlumni(formData);
    setFormData({ fullName: "", dob: "", batchYear: "", whatsappLink: "" });
    alert("Alumni added");
  };

  const handleDeleteAlumni = async (id: Id<"alumni">, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    await deleteAlumni({ id });
    alert("Alumni deleted");
  };

  const handleSetMainEnvironment = async (env: "dev" | "prod") => {
    await setMainEnvironment({ environment: env });
    alert(`Main environment set to ${env}`);
  };

  const handleClearDatabase = async () => {
    if (
      !confirm(
        `⚠️ Clear ALL alumni from ${selectedEnv.toUpperCase()}? This cannot be undone`
      )
    )
      return;
    await clearAllAlumni();
    alert("Database cleared");
  };

  const filteredAlumni =
    allAlumni?.filter(
      (a) =>
        a.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.batchYear?.includes(searchQuery) ||
        a.dob?.includes(searchQuery)
    ) ?? [];

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}>
        <div
          className="fixed w-32 h-32 rounded-full pointer-events-none z-50 mix-blend-screen"
          style={{
            left: cursorPosition.x - 64,
            top: cursorPosition.y - 64,
            background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="w-full max-w-md px-4">
          <form
            onSubmit={handleLogin}
            className={`backdrop-blur-xl p-8 rounded-2xl shadow-2xl border transform transition-all duration-500 hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800/50 border-gray-700/50"
                : "bg-white/70 border-white/50"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-3xl font-bold transition-colors ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Admin Login
              </h1>
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-gray-800/10 text-gray-800"
                }`}
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
            </div>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl mb-4 outline-none transition-all duration-300 focus:ring-2 ${
                isDarkMode
                  ? "bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500"
                  : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
              }`}
              placeholder="Enter admin password"
            />
            
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div
        className="fixed w-32 h-32 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: cursorPosition.x - 64,
          top: cursorPosition.y - 64,
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="max-w-7xl mx-auto p-8 space-y-6">
        <div className={`backdrop-blur-xl p-6 rounded-2xl shadow-xl border transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800/50 border-gray-700/50"
            : "bg-white/70 border-white/50"
        }`}>
          <div className="flex justify-between items-center">
            <h1 className={`text-4xl font-bold transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Admin Dashboard
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                isDarkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-gray-800/10 text-gray-800"
              }`}
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        <div className={`backdrop-blur-xl p-6 rounded-2xl shadow-xl border transition-all duration-300 hover:shadow-2xl ${
          isDarkMode
            ? "bg-gray-800/50 border-gray-700/50"
            : "bg-white/70 border-white/50"
        }`}>
          <p className={`text-lg mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Main Environment:{" "}
            <span className={`font-bold ${
              mainEnvironment === "prod" ? "text-green-500" : "text-blue-500"
            }`}>
              {mainEnvironment?.toUpperCase() ?? "—"}
            </span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleSetMainEnvironment("dev")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Set Dev
            </button>
            <button
              onClick={() => handleSetMainEnvironment("prod")}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Set Prod
            </button>
          </div>
        </div>

        <div className={`backdrop-blur-xl rounded-2xl shadow-xl border transition-all duration-300 overflow-hidden ${
          isDarkMode
            ? "bg-gray-800/50 border-gray-700/50"
            : "bg-white/70 border-white/50"
        }`}>
          <div className={`flex border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            {["overview", "add", "manage"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 relative overflow-hidden group ${
                  activeTab === tab
                    ? isDarkMode
                      ? "text-blue-400"
                      : "text-blue-600"
                    : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="relative z-10">{tab.toUpperCase()}</span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
                )}
                <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                  isDarkMode ? "bg-gray-700/30" : "bg-gray-100/50"
                }`} />
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "overview" && alumniStats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isDarkMode
                    ? "bg-blue-500/20 hover:bg-blue-500/30"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}>
                  <div className="text-sm font-semibold text-blue-500 mb-2">TOTAL ALUMNI</div>
                  <div className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {alumniStats.total}
                  </div>
                </div>
                <div className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isDarkMode
                    ? "bg-green-500/20 hover:bg-green-500/30"
                    : "bg-green-50 hover:bg-green-100"
                }`}>
                  <div className="text-sm font-semibold text-green-500 mb-2">BATCH YEARS</div>
                  <div className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {Object.keys(alumniStats.batchCounts).length}
                  </div>
                </div>
                <div className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isDarkMode
                    ? "bg-purple-500/20 hover:bg-purple-500/30"
                    : "bg-purple-50 hover:bg-purple-100"
                }`}>
                  <div className="text-sm font-semibold text-purple-500 mb-2">RECENTLY ADDED</div>
                  <div className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {alumniStats.recentlyAdded.length}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "add" && (
              <form onSubmit={handleAddAlumni} className="space-y-4 max-w-2xl">
                <input
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 ${
                    isDarkMode
                      ? "bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500"
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                  }`}
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <input
                  type="date"
                  className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 ${
                    isDarkMode
                      ? "bg-gray-700/50 border border-gray-600 text-white focus:ring-purple-500"
                      : "bg-white border border-gray-300 text-gray-900 focus:ring-blue-500"
                  }`}
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />
                <input
                  placeholder="Batch Year (e.g., 2024)"
                  className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 ${
                    isDarkMode
                      ? "bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500"
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                  }`}
                  value={formData.batchYear}
                  onChange={(e) =>
                    setFormData({ ...formData, batchYear: e.target.value })
                  }
                />
                <input
                  placeholder="WhatsApp Link (optional)"
                  className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 ${
                    isDarkMode
                      ? "bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500"
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                  }`}
                  value={formData.whatsappLink}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappLink: e.target.value })
                  }
                />
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                  Add Alumni
                </button>
              </form>
            )}

            {activeTab === "manage" && (
              <div className="space-y-4">
                <input
                  placeholder="Search by name, batch, or DOB..."
                  className={`w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 ${
                    isDarkMode
                      ? "bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500"
                      : "bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="overflow-x-auto rounded-xl">
                  <table className="w-full">
                    <thead>
                      <tr className={`${isDarkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
                        <th className={`px-4 py-3 text-left font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Name</th>
                        <th className={`px-4 py-3 text-left font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>DOB</th>
                        <th className={`px-4 py-3 text-left font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Batch</th>
                        <th className={`px-4 py-3 text-left font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>WhatsApp</th>
                        <th className={`px-4 py-3 text-left font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAlumni.map((a) => (
                        <tr
                          key={a._id}
                          className={`border-t transition-colors duration-200 ${
                            isDarkMode
                              ? "border-gray-700 hover:bg-gray-700/30"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {a.fullName}
                          </td>
                          <td className={`px-4 py-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {a.dob}
                          </td>
                          <td className={`px-4 py-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {a.batchYear}
                          </td>
                          <td className="px-4 py-3">
                            {a.whatsappLink ? (
                              <a
                                href={a.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-400 underline transition-colors"
                              >
                                Link
                              </a>
                            ) : (
                              <span className={isDarkMode ? "text-gray-600" : "text-gray-400"}>—</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() =>
                                handleDeleteAlumni(a._id, a.fullName)
                              }
                              className="text-red-500 hover:text-red-400 font-semibold transition-all duration-200 hover:scale-110"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`backdrop-blur-xl p-6 rounded-2xl shadow-xl border transition-all duration-300 ${
          isDarkMode
            ? "bg-red-900/20 border-red-800/50"
            : "bg-red-50/70 border-red-200/50"
        }`}>
          <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? "text-red-400" : "text-red-700"}`}>
            ⚠️ Danger Zone
          </h3>
          <button
            onClick={handleClearDatabase}
            className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            Clear All Alumni ({selectedEnv.toUpperCase()})
          </button>
        </div>
      </div>
    </div>
  );
}