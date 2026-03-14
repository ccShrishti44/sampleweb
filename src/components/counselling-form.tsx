"use client";

import React, { useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";

const COUNSELLING_DRAFT_KEY = "eduexpert_counselling_draft";
const COUNSELLING_SUBMISSIONS_KEY = "eduexpert_counselling_submissions";

export interface CounsellingFormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  preferredCourse: string;
  academicLevel: string;
  preferredLocation: string;
  entranceExam: string;
  budget: string;
  message: string;
}

const defaultForm: CounsellingFormData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  preferredCourse: "",
  academicLevel: "",
  preferredLocation: "",
  entranceExam: "",
  budget: "",
  message: "",
};

function getStoredDraft() {
  if (typeof window === "undefined") {
    return defaultForm;
  }

  const stored = window.localStorage.getItem(COUNSELLING_DRAFT_KEY);
  if (!stored) {
    return defaultForm;
  }

  try {
    return { ...defaultForm, ...JSON.parse(stored) } as CounsellingFormData;
  } catch {
    return defaultForm;
  }
}

export function CounsellingForm({
  title = "Register for counselling",
  description = "Share your details and preferences so we can guide you toward the right college and course options.",
  onSuccess,
  compact = false,
  embedded = false,
}: {
  title?: string;
  description?: string;
  onSuccess?: () => void;
  compact?: boolean;
  embedded?: boolean;
}) {
  const [form, setForm] = useState<CounsellingFormData>(defaultForm);

  useEffect(() => {
    setForm(getStoredDraft());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(COUNSELLING_DRAFT_KEY, JSON.stringify(form));
  }, [form]);

  function updateField(key: keyof CounsellingFormData, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem(COUNSELLING_SUBMISSIONS_KEY);
      const parsed = existing ? (JSON.parse(existing) as Array<Record<string, string>>) : [];
      parsed.unshift(payload);
      window.localStorage.setItem(COUNSELLING_SUBMISSIONS_KEY, JSON.stringify(parsed));
      window.localStorage.removeItem(COUNSELLING_DRAFT_KEY);
    }

    setForm(defaultForm);
    toast({
      title: "Counselling request saved",
      description: "Your details were stored successfully in this browser.",
    });
    onSuccess?.();
  }

  return (
    <div
      className={
        embedded
          ? ""
          : `rounded-[28px] border border-border bg-white shadow-sm ${compact ? "p-4 sm:p-5" : "p-6"}`
      }
    >
      {!embedded && (
        <div className={compact ? "mb-4" : "mb-6"}>
          <h3 className={`${compact ? "text-xl" : "text-2xl"} font-display font-bold text-foreground`}>{title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`grid gap-3 ${compact ? "grid-cols-1" : "md:grid-cols-2"}`}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Full name</span>
            <input
              required
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Phone</span>
            <input
              required
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">City</span>
            <input
              required
              value={form.city}
              onChange={(event) => updateField("city", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Preferred course</span>
            <input
              required
              value={form.preferredCourse}
              onChange={(event) => updateField("preferredCourse", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Academic level</span>
            <select
              required
              value={form.academicLevel}
              onChange={(event) => updateField("academicLevel", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Select level</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Integrated">Integrated</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Preferred location</span>
            <input
              value={form.preferredLocation}
              onChange={(event) => updateField("preferredLocation", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Entrance exam</span>
            <input
              value={form.entranceExam}
              onChange={(event) => updateField("entranceExam", event.target.value)}
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className={`block ${compact ? "" : "md:col-span-2"}`}>
            <span className="mb-2 block text-sm font-medium text-foreground">Budget range</span>
            <input
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              placeholder="Example: INR 2L-4L per year"
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className={`block ${compact ? "" : "md:col-span-2"}`}>
            <span className="mb-2 block text-sm font-medium text-foreground">Message</span>
            <textarea
              rows={compact ? 3 : 4}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Tell us your goals, score expectations, or any concern."
              className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary"
        >
          Submit counselling request
        </button>
      </form>
    </div>
  );
}
