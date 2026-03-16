"use client";

import React, { useState } from "react";

const STORAGE_KEY = "eduexpert_college_queries";

export function CollegeQueryForm({ collegeName }: { collegeName: string }) {
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    query: "",
  });
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      ...form,
      collegeName,
      submittedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      const parsed = existing ? (JSON.parse(existing) as Array<Record<string, string>>) : [];
      parsed.unshift(payload);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }

    setForm({ fullName: "", contact: "", query: "" });
    setMessage("Your query has been saved. Our team can use these details for follow-up guidance.");
  }

  return (
    <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Got a query?
      </p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Share the basics and your question. Only the essential details are required.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Full name</span>
          <input
            required
            value={form.fullName}
            onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
            className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Email or phone</span>
          <input
            required
            value={form.contact}
            onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
            className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Your query</span>
          <textarea
            required
            rows={4}
            value={form.query}
            onChange={(event) => setForm((current) => ({ ...current, query: event.target.value }))}
            placeholder={`Ask about admissions, fees, placements, campus life, or fit for ${collegeName}.`}
            className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-2xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary"
        >
          Submit query
        </button>
      </form>

      {message && (
        <p className="mt-3 text-xs font-medium text-primary">
          {message}
        </p>
      )}
    </div>
  );
}
