"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  VideoIcon,
  Download,
  Trash2,
  FileText,
  LogOut,
  Search,
  CheckCircle2,
  Calendar,
  X,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  User,
  RefreshCw,
  ExternalLink,
  Music,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import BorderGlow from "@/components/BorderGlow";
import { motion as m, AnimatePresence as AP } from "framer-motion";

const ADMIN_PASSWORD_KEY = "zinetic_admin_auth";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "youtube" | "partner">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // View Mode
  const [viewMode, setViewMode] = useState<"submissions" | "contacts">(
    "submissions",
  );
  const [contacts, setContacts] = useState<any[]>([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPage, setContactsPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Unread Tracking
  const [lastSeenApps, setLastSeenApps] = useState<number>(0);
  const [lastSeenContacts, setLastSeenContacts] = useState<number>(0);

  useEffect(() => {
    setLastSeenApps(Number(localStorage.getItem("zinetic_seen_apps") || 0));
    setLastSeenContacts(Number(localStorage.getItem("zinetic_seen_contacts") || 0));
  }, []);

  // Update "seen" timestamp when switching tabs
  useEffect(() => {
    if (!isAuthenticated) return;
    const now = Date.now();
    if (viewMode === "submissions") {
      setLastSeenApps(now);
      localStorage.setItem("zinetic_seen_apps", String(now));
    } else if (viewMode === "contacts") {
      setLastSeenContacts(now);
      localStorage.setItem("zinetic_seen_contacts", String(now));
    }
  }, [viewMode, isAuthenticated]);

  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (saved) {
      fetchData(saved);
    }
  }, []);

  // Auto-polling every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      const pass = localStorage.getItem(ADMIN_PASSWORD_KEY);
      if (pass) fetchData(pass, true); // silent refresh
    }, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const fetchData = async (pass: string, silent = false) => {
    if (!silent) setIsLoading(true);
    setAuthError("");
    try {
      // 1. Fetch Submissions
      const res = await fetch(`${API}/api/admin/submissions`, {
        headers: { "x-admin-password": pass },
      });

      if (res.status === 401) {
        setAuthError("Incorrect password. Access denied.");
        setIsAuthenticated(false);
        localStorage.removeItem(ADMIN_PASSWORD_KEY);
        return;
      }

      const result = await res.json();
      if (result.success) {
        setIsAuthenticated(true);
        localStorage.setItem(ADMIN_PASSWORD_KEY, pass);
        setSubmissions(result.data);
      }

      // 2. Fetch Contacts
      const resC = await fetch(`${API}/api/admin/contacts`, {
        headers: { "x-admin-password": pass },
      });
      const resultC = await resC.json();
      if (resultC.success) {
        setContacts(resultC.data);
      }
    } catch {
      if (!silent) setAuthError("Could not connect to backend.");
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    fetchData(password);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(ADMIN_PASSWORD_KEY);
  };

  const handleDelete = async (row: any) => {
    const pass = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (!pass) return;
    setIsDeleting(true);
    try {
      const endpoint = row._isContact
        ? `${API}/api/admin/contacts/${row.id}`
        : `${API}/api/admin/submissions/${row.id}`;

      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "x-admin-password": pass },
      });
      const result = await res.json();
      if (result.success) {
        if (row._isContact) {
          setContacts((prev) => prev.filter((c) => c.id !== row.id));
        } else {
          setSubmissions((prev) => prev.filter((s) => s.id !== row.id));
        }
        setDeleteTarget(null);
        if (
          selectedRow?.id === row.id &&
          selectedRow?._isContact === row._isContact
        ) {
          setSelectedRow(null);
        }
      }
    } catch {
      alert("Delete failed. Check backend connection.");
    } finally {
      setIsDeleting(false);
    }
  };

  const downloadCSV = () => {
    if (filteredSubmissions.length === 0) return;
    const headers = Object.keys(filteredSubmissions[0]).join(",");
    const rows = filteredSubmissions
      .map((row) =>
        Object.values(row)
          .map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob([headers + "\n" + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `zinetic_submissions_${format(new Date(), "yyyy_MM_dd")}.csv`;
    link.click();
  };

  const filteredSubmissions = submissions.filter((s) => {
    const matchesFilter = filter === "all" || s.type === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (s.first_name || "").toLowerCase().includes(q) ||
      (s.last_name || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
    setContactsPage(1);
  }, [filter, searchQuery, viewMode]);

  const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.message || "").toLowerCase().includes(q)
    );
  });

  const totalContactPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const paginatedContacts = filteredContacts.slice(
    (contactsPage - 1) * ITEMS_PER_PAGE,
    contactsPage * ITEMS_PER_PAGE,
  );

  const parseDate = (d: any) => {
    // SQLite timestamps (YYYY-MM-DD HH:MM:SS) are UTC
    // Add Z to ensure browser parses as UTC
    const dateStr = String(d || "").trim();
    if (!dateStr.includes("Z") && !dateStr.includes("+")) {
      return new Date(dateStr.replace(" ", "T") + "Z").getTime();
    }
    return new Date(dateStr).getTime();
  };

  const unreadApps = submissions.filter(s => parseDate(s.created_at) > lastSeenApps).length;
  const unreadContacts = contacts.filter(c => parseDate(c.created_at) > lastSeenContacts).length;

  // ─── LOGIN ──────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#0f0f0f] border border-white/8 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#802CEE]/10 blur-3xl rounded-full pointer-events-none" />
            <div className="text-center mb-10">
              <img
                src="/logo.png"
                alt="Zinetic"
                className="w-14 h-auto mx-auto mb-5 brightness-0 invert opacity-70"
              />
              <h1 className="text-2xl font-extrabold text-white tracking-tighter">
                Admin Portal
              </h1>
              <p className="text-zinc-600 text-sm mt-1">
                Authorization required
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <BorderGlow borderRadius={14} className="w-full">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access key"
                  className="w-full h-13 bg-black/70 px-5 py-4 rounded-2xl text-white focus:outline-none font-mono text-sm"
                />
              </BorderGlow>
              {authError && (
                <p className="text-red-400 text-xs text-center bg-red-500/10 py-2 rounded-lg">
                  {authError}
                </p>
              )}
              <button
                type="submit"
                className="w-full h-12 bg-white text-black hover:bg-zinc-100 font-bold rounded-2xl text-sm transition-all active:scale-[0.98]"
              >
                Verify Identity
              </button>
            </form>
          </div>
        </m.div>
      </div>
    );
  }

  // ─── DASHBOARD ────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Topbar */}
      <nav className="border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-7 h-auto brightness-0 invert opacity-80"
            />
            <div className="h-5 w-[1px] bg-white/10" />
            <span className="font-bold text-sm tracking-tight text-white/80">
              Management Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:block text-zinc-600 text-xs mr-2">
              {format(new Date(), "MMM dd, yyyy")}
            </span>
            <button
              onClick={() =>
                fetchData(localStorage.getItem(ADMIN_PASSWORD_KEY) || "")
              }
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all text-xs font-bold"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-5 md:px-10 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight mb-1">
              Applications Overview
            </h1>
            <p className="text-zinc-600 text-sm">
              Monitor and manage all incoming applications.
            </p>
          </div>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/10 text-white text-sm font-bold px-5 h-10 rounded-xl transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Stats — compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard
            title="Total"
            value={submissions.length}
            icon={<Users />}
            color="purple"
          />
          <StatCard
            title="YouTube MCN"
            value={submissions.filter((s) => s.type === "youtube").length}
            icon={<VideoIcon />}
            color="red"
          />
          <StatCard
            title="Onboarding"
            value={submissions.filter((s) => s.type === "partner").length}
            icon={<Music />}
            color="blue"
          />
          <StatCard
            title="Last 24h"
            value={
              submissions.filter(
                (s) => Date.now() - new Date(s.created_at).getTime() < 86400000,
              ).length
            }
            icon={<BarChart3 />}
            color="green"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#111] rounded-xl border border-white/5 w-fit">
              <button
                onClick={() => setViewMode("submissions")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === "submissions" ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
              >
                Applications
                {unreadApps > 0 && viewMode !== "submissions" && (
                  <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 bg-[#22c55e] text-white text-[10px] font-black rounded-full shadow-lg">
                    {unreadApps}
                  </span>
                )}
              </button>
              <button
                onClick={() => setViewMode("contacts")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${viewMode === "contacts" ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
              >
                Direct Inquiries
                {unreadContacts > 0 && viewMode !== "contacts" && (
                  <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 bg-[#22c55e] text-black text-[10px] font-black rounded-full shadow-lg">
                    {unreadContacts}
                  </span>
                )}
              </button>
            </div>

            {viewMode === "submissions" && (
              <div className="flex items-center gap-1 p-1 bg-[#0f0f0f] rounded-xl border border-white/5 w-fit">
                <FilterBtn
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  label="All"
                />
                <FilterBtn
                  active={filter === "youtube"}
                  onClick={() => setFilter("youtube")}
                  label="YouTube"
                />
                <FilterBtn
                  active={filter === "partner"}
                  onClick={() => setFilter("partner")}
                  label="Onboarding"
                />
              </div>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              placeholder={
                viewMode === "submissions"
                  ? "Search applicants..."
                  : "Search messages..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-72 h-10 bg-[#0f0f0f] border border-white/5 rounded-xl pl-9 pr-4 text-sm focus:outline-none focus:border-[#802CEE]/40 transition-all"
            />
          </div>
        </div>

        {/* Content Area */}
        <AP mode="wait">
          {isLoading ? (
            <m.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex items-center justify-center gap-3 text-zinc-600"
            >
              <div className="w-5 h-5 border-2 border-white/10 border-t-[#802CEE] rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading data...</span>
            </m.div>
          ) : viewMode === "submissions" ? (
            /* Submissions Table */
            filteredSubmissions.length === 0 ? (
              <m.div
                key="empty-s"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0f0f0f] rounded-2xl border border-dashed border-white/8 h-56 flex flex-col items-center justify-center gap-3 text-center"
              >
                <FileText className="w-8 h-8 text-zinc-700" />
                <div>
                  <p className="text-white font-bold">No applications found</p>
                  <p className="text-zinc-600 text-sm">
                    Either the database is empty or no matches found.
                  </p>
                </div>
              </m.div>
            ) : (
              <m.div
                key="data-s"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-x-auto bg-[#0a0a0a] rounded-2xl border border-white/5"
              >
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                        Channel / Info
                      </th>
                      <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                        Date
                      </th>
                      <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em] text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {paginatedSubmissions.map((row) => (
                      <tr
                        key={row.id}
                        className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedRow(row)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center font-black text-[11px] text-zinc-400 uppercase shrink-0">
                              {(row.first_name || "?")[0]}
                              {(row.last_name || "?")[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-white text-sm group-hover:text-white transition-colors">
                                {row.first_name} {row.last_name}
                              </p>
                              <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5 text-zinc-500`}>
                                {row.type === "youtube" ? (
                                  <VideoIcon className="w-2.5 h-2.5" />
                                ) : (
                                  <Music className="w-2.5 h-2.5" />
                                )}
                                {row.type === "youtube"
                                  ? "YouTube"
                                  : "Onboarding"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-zinc-400 font-mono text-xs bg-white/5 px-2 py-1 rounded-lg">
                            {row.youtube_channel || row.artist_name || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-zinc-300 text-sm">{row.email}</p>
                          <p className="text-zinc-600 text-xs mt-0.5">
                            {row.phone}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-zinc-400 text-sm">
                            {format(new Date(row.created_at), "MMM dd")}
                          </p>
                          <p className="text-zinc-600 text-xs">
                            {format(new Date(row.created_at), "HH:mm")}
                          </p>
                        </td>
                        <td
                          className="px-6 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedRow(row)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all text-xs"
                              title="View details"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(row)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-600 hover:text-red-400 transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls - Applications */}
                {totalPages > 1 && (
                  <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between bg-[#080808]">
                    <p className="text-zinc-500 text-xs">
                      Page{" "}
                      <span className="text-white font-bold">
                        {currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="text-white font-bold">{totalPages}</span>
                    </p>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg bg-white/5 text-zinc-500 disabled:opacity-30"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg bg-white/5 text-zinc-500 disabled:opacity-30"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </m.div>
            )
          ) : /* Contacts Table */
          filteredContacts.length === 0 ? (
            <m.div
              key="empty-c"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#0f0f0f] rounded-2xl border border-dashed border-white/8 h-56 flex flex-col items-center justify-center gap-3 text-center"
            >
              <Mail className="w-8 h-8 text-zinc-700" />
              <div>
                <p className="text-white font-bold">No messages found</p>
                <p className="text-zinc-600 text-sm">
                  Your inbox is currently empty.
                </p>
              </div>
            </m.div>
          ) : (
            <m.div
              key="data-c"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-x-auto bg-[#0a0a0a] rounded-2xl border border-white/5"
            >
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                      Sender
                    </th>
                    <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                      Position
                    </th>
                    <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                      Message Preview
                    </th>
                    <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em]">
                      Date
                    </th>
                    <th className="px-6 py-4 text-zinc-600 text-[10px] font-black uppercase tracking-[0.15em] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {paginatedContacts.map((row) => (
                    <tr
                      key={row.id}
                      className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() =>
                        setSelectedRow({ ...row, _isContact: true })
                      }
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white text-sm group-hover:text-white transition-colors">
                          {row.name}
                        </p>
                        <p className="text-zinc-500 text-xs mt-0.5">
                          {row.email}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-zinc-400 text-xs bg-white/5 px-2 py-1 rounded-lg">
                          {row.position || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-zinc-400 text-sm truncate max-w-[200px]">
                          {row.message}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-zinc-400 text-sm">
                          {format(new Date(row.created_at), "MMM dd")}
                        </p>
                      </td>
                      <td
                        className="px-6 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() =>
                              setSelectedRow({ ...row, _isContact: true })
                            }
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteTarget({ ...row, _isContact: true });
                            }}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-600 hover:text-red-400 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls - Contacts */}
              {totalContactPages > 1 && (
                <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between bg-[#080808]">
                  <p className="text-zinc-500 text-xs">
                    Page{" "}
                    <span className="text-white font-bold">{contactsPage}</span>{" "}
                    of{" "}
                    <span className="text-white font-bold">
                      {totalContactPages}
                    </span>
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setContactsPage((p) => Math.max(1, p - 1))}
                      disabled={contactsPage === 1}
                      className="p-1.5 rounded-lg bg-white/5 text-zinc-500 disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setContactsPage((p) =>
                          Math.min(totalContactPages, p + 1),
                        )
                      }
                      disabled={contactsPage === totalContactPages}
                      className="p-1.5 rounded-lg bg-white/5 text-zinc-500 disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </m.div>
          )}
        </AP>
      </main>

      {/* ─── Detail Modal ─── */}
      <AP>
        {selectedRow && (
          <>
            <m.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRow(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
            />
            <m.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto">
                {/* Modal header */}
                <div className="sticky top-0 bg-[#0d0d0d] border-b border-white/5 px-6 py-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center font-black text-sm text-zinc-400 uppercase">
                      {selectedRow._isContact
                        ? (selectedRow.name || "?")[0]
                        : (selectedRow.first_name || "?")[0]}
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        {selectedRow._isContact
                          ? selectedRow.name
                          : `${selectedRow.first_name} ${selectedRow.last_name}`}
                      </p>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 text-zinc-500`}
                      >
                        {selectedRow._isContact ? (
                          <Mail className="w-2.5 h-2.5" />
                        ) : selectedRow.type === "youtube" ? (
                          <VideoIcon className="w-2.5 h-2.5" />
                        ) : (
                          <Music className="w-2.5 h-2.5" />
                        )}
                        {selectedRow._isContact
                          ? "Direct Inquiry"
                          : selectedRow.type === "youtube"
                            ? "YouTube MCN"
                            : "Onboarding"}{" "}
                        · #{selectedRow.id}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setDeleteTarget(selectedRow);
                        setSelectedRow(null);
                      }}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-600 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedRow(null)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {selectedRow._isContact ? (
                    /* Contact detail layout */
                    <>
                      <ModalSection title="Sender Information">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                          <MRow
                            icon={<User />}
                            label="Full Name"
                            value={selectedRow.name}
                          />
                          <MRow
                            icon={<FileText />}
                            label="Position"
                            value={selectedRow.position || "—"}
                          />
                          <MRow
                            icon={<Mail />}
                            label="Email"
                            value={selectedRow.email}
                          />
                          <MRow
                            icon={<Phone />}
                            label="Phone"
                            value={selectedRow.phone || "—"}
                          />
                        </div>
                      </ModalSection>
                      <ModalSection title="Message">
                        <div className="p-4 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedRow.message}
                        </div>
                      </ModalSection>
                    </>
                  ) : (
                    /* Submission detail layout (original) */
                    <>
                      {/* ID Document Image Preview */}
                      {selectedRow.id_filename && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-3">
                            ID Document
                          </p>
                          <div className="relative rounded-xl overflow-hidden border border-white/8 bg-black/40">
                            {selectedRow.id_filename.match(
                              /\.(jpg|jpeg|png|webp|gif)$/i,
                            ) ? (
                              <img
                                src={`${API}/uploads/${selectedRow.id_filename}`}
                                alt="ID Document"
                                className="w-full max-h-56 object-contain"
                              />
                            ) : (
                              <div className="h-28 flex items-center justify-center text-zinc-500 gap-3">
                                <FileText className="w-8 h-8" />
                                <div>
                                  <p className="font-bold text-white text-sm">
                                    PDF Document
                                  </p>
                                  <p className="text-xs text-zinc-500">
                                    {selectedRow.id_filename}
                                  </p>
                                </div>
                              </div>
                            )}
                            <a
                              href={`${API}/uploads/${selectedRow.id_filename}`}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/10 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-black transition-all"
                            >
                              <Download className="w-3 h-3" /> Download
                            </a>
                          </div>
                        </div>
                      )}

                      <ModalSection title="Contact">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                          <MRow
                            icon={<Mail />}
                            label="Email"
                            value={selectedRow.email}
                          />
                          <MRow
                            icon={<Phone />}
                            label="Phone"
                            value={selectedRow.phone}
                          />
                        </div>
                      </ModalSection>

                      <ModalSection title="Personal Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                          <MRow
                            icon={<User />}
                            label="Date of Birth"
                            value={selectedRow.dob || "—"}
                          />
                          <MRow
                            icon={<CreditCard />}
                            label="ID Number"
                            value={selectedRow.id_number || "—"}
                          />
                          <MRow
                            icon={<MapPin />}
                            label="Address"
                            value={selectedRow.address || "—"}
                          />
                          <MRow
                            icon={<MapPin />}
                            label="State"
                            value={selectedRow.state || "—"}
                          />
                          <MRow
                            icon={<MapPin />}
                            label="Country"
                            value={selectedRow.country || "—"}
                          />
                        </div>
                      </ModalSection>

                      {selectedRow.type === "youtube" && (
                        <ModalSection title="YouTube Channel">
                          <MRow
                            icon={<VideoIcon />}
                            label="Handle / Channel ID"
                            value={selectedRow.youtube_channel || "—"}
                            mono
                          />
                        </ModalSection>
                      )}

                      {selectedRow.type === "partner" && (
                        <>
                          <ModalSection title="Artist / Professional Info">
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                              <MRow
                                icon={<User />}
                                label="You Are"
                                value={selectedRow.you_are || "—"}
                              />
                              <MRow
                                icon={<Music />}
                                label="Artist / Label"
                                value={selectedRow.artist_name || "—"}
                              />
                              <MRow
                                icon={<Music />}
                                label="Genre"
                                value={selectedRow.genre || "—"}
                              />
                              <MRow
                                icon={<FileText />}
                                label="Distributor"
                                value={selectedRow.distributor || "—"}
                              />
                              <MRow
                                icon={<BarChart3 />}
                                label="Tracks Released"
                                value={selectedRow.tracks_released || "—"}
                              />
                              <MRow
                                icon={<BarChart3 />}
                                label="Monthly Listeners"
                                value={selectedRow.monthly_listeners || "—"}
                              />
                            </div>
                          </ModalSection>
                          <ModalSection title="Payout & Social">
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                              <MRow
                                icon={<CreditCard />}
                                label="Payout Method"
                                value={selectedRow.payout_method || "—"}
                              />
                              <MRow
                                icon={<ExternalLink />}
                                label="Facebook"
                                value={selectedRow.facebook_url || "—"}
                              />
                              <MRow
                                icon={<VideoIcon />}
                                label="YouTube ID"
                                value={selectedRow.youtube_channel_id || "—"}
                                mono
                              />
                              <MRow
                                icon={<ExternalLink />}
                                label="Spotify"
                                value={selectedRow.spotify_url || "—"}
                              />
                            </div>
                          </ModalSection>
                        </>
                      )}
                    </>
                  )}

                  <ModalSection title="Submission Info">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      <MRow
                        icon={<Calendar />}
                        label="Submitted At"
                        value={format(
                          new Date(selectedRow.created_at),
                          "MMM dd, yyyy — HH:mm",
                        )}
                      />
                      <MRow
                        icon={<FileText />}
                        label="Record ID"
                        value={`#${selectedRow.id}`}
                        mono
                      />
                    </div>
                  </ModalSection>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AP>

      {/* ─── Delete Confirm Modal ─── */}
      <AP>
        {deleteTarget && (
          <>
            <m.div
              key="dbd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <m.div
              key="dmodal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-sm bg-[#0d0d0d] border border-red-500/20 rounded-2xl p-8 pointer-events-auto text-center shadow-2xl">
                <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Trash2 className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Delete {deleteTarget._isContact ? "Inquiry" : "Submission"}?
                </h3>
                <p className="text-zinc-500 text-sm mb-6">
                  {deleteTarget._isContact ? (
                    <>
                      This will permanently delete the message from{" "}
                      <span className="text-white font-semibold">
                        {deleteTarget.name}
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      This will permanently delete the record for{" "}
                      <span className="text-white font-semibold">
                        {deleteTarget.first_name} {deleteTarget.last_name}
                      </span>{" "}
                      and their uploaded ID file.
                    </>
                  )}{" "}
                  This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 h-11 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 font-bold text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteTarget)}
                    disabled={isDeleting}
                    className="flex-1 h-11 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AP>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────

const StatCard = ({ title, value, icon }: any) => {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 px-5 py-4 rounded-xl flex items-center gap-4 hover:border-white/10 transition-all relative overflow-hidden group">
      <div
        className={`w-9 h-9 bg-white/5 text-zinc-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:text-white transition-all`}
      >
        {React.cloneElement(icon as React.ReactElement<any>, {
          className: "w-4 h-4",
        })}
      </div>
      <div>
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
          {title}
        </p>
        <p className="text-2xl font-black text-white leading-tight">{value}</p>
      </div>
    </div>
  );
};

const FilterBtn = ({ active, onClick, label }: any) => (
  <button
    onClick={onClick}
    className={`px-4 h-8 rounded-lg text-xs font-bold transition-all ${active ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
  >
    {label}
  </button>
);

const ModalSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">
      {title}
    </p>
    <div className="bg-black/40 rounded-xl border border-white/5 divide-y divide-white/[0.04] overflow-hidden">
      {children}
    </div>
  </div>
);

const MRow = ({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="flex items-start gap-3 px-4 py-3">
    <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
      {React.cloneElement(icon as React.ReactElement<any>, {
        className: "w-3.5 h-3.5 text-zinc-500",
      })}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
        {label}
      </p>
      <p
        className={`text-sm text-white break-all mt-0.5 ${mono ? "font-mono" : "font-medium"}`}
      >
        {value || "—"}
      </p>
    </div>
  </div>
);
