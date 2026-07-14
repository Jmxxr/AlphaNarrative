"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-black text-white px-6 py-24 border-t border-gray-800">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          Contact
        </p>
        <h2 className="text-3xl font-bold mb-6">
          Let's build something.
        </h2>
        <p className="text-gray-400 mb-8">
          Based in Port Harcourt, working across strategy, product, and engineering.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <input
            type="text"
            placeholder="Your name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          <textarea
            placeholder="Your message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-gray-900 border border-gray-800 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-green-500 text-sm">Message sent — thank you!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm">Something went wrong. Try again.</p>
          )}
        </form>
      </div>

      <footer className="text-center text-gray-600 text-sm mt-24">
        © {new Date().getFullYear()} Alpha Narrative. All rights reserved.
      </footer>
    </section>
  );
}