"use client";

import { useEffect, useState } from "react";

export default function WebMonitor() {
  const [websites, setWebsites] = useState([]);
  const [form, setForm] = useState({ site_name: "", url: "" });
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const fetchWebsites = async () => {
    const params = new URLSearchParams();

    if (searchName) params.append("name", searchName);
    if (searchDate) params.append("date", searchDate);

    const res = await fetch(`/api/websites?${params.toString()}`);
    const data = await res.json();
    setWebsites(data);
  };

  const addWebsite = async (e) => {
    e.preventDefault();
    await fetch("/api/websites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ site_name: "", url: "" });
    fetchWebsites();
  };

  const runCheck = async () => {
    await fetch("/api/websites/check", { method: "POST" });
    fetchWebsites();
  };

  useEffect(() => {
    fetchWebsites();

    const refreshInterval = setInterval(fetchWebsites, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchWebsites();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchName, searchDate]);

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Website Health Monitor
        </h1>

        <form onSubmit={addWebsite} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Website Name"
            value={form.site_name}
            onChange={(e) => setForm({ ...form, site_name: e.target.value })}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Website
          </button>
        </form>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={runCheck}
          className="mb-8 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Check Websites Now
        </button>

        <div className="grid gap-4">
          {websites.map((site) => (
            <div
              key={site.id}
              className="p-4 bg-gray-50 border rounded-lg shadow-sm"
            >
              <h2 className="font-semibold text-xl">{site.site_name}</h2>
              <p className="text-sm text-gray-600">{site.url}</p>
              <p className="text-xs text-gray-500 mt-1">
                Last Checked: {new Date(site.last_check_time).toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {site.statusHistory.slice(0, 10).map((history) => (
                  <span
                    key={history.id}
                    className={`px-2 py-1 text-xs rounded 
                    ${
                      history.status === "Success"
                        ? "bg-green-200 text-green-800"
                        : history.status === "Slow"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {new Date(history.check_time).toLocaleTimeString()} -{" "}
                    {history.status}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
