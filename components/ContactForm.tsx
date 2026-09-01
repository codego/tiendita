"use client";

import Link from "next/link";
import { useState } from "react";
import {
  contactoCopy,
  saveContactMessage,
  type ContactRole,
} from "@/lib/contacto";
import { routes } from "@/lib/routes";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<ContactRole>("shopper");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    saveContactMessage({ name, email, role, message });
    setDone(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  if (done) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[50vh] flex-col justify-center"
      >
        <h1 className="max-w-[12ch] font-serif text-[40px] leading-[1.05] text-ink">
          {contactoCopy.done}
        </h1>
        <Link
          href={routes.landing}
          className="mt-10 inline-flex h-12 w-fit items-center justify-center rounded-full bg-ink px-7 font-sans text-[16px] text-paper"
        >
          {contactoCopy.doneCta}
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-serif text-[34px] leading-tight text-ink">
        {contactoCopy.title}
      </h1>
      <p className="mt-2 font-sans text-[15px] text-ink/65">{contactoCopy.sub}</p>
      <form onSubmit={submit} className="mt-8 flex flex-col gap-6">
        <label className="block">
          <span className="font-sans text-[14px] text-ink">{contactoCopy.name}</span>
          <input
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoComplete="name"
            className="mt-1 h-11 w-full border-b border-ink/25 bg-transparent font-sans text-[16px] text-ink outline-none focus:border-ink"
          />
        </label>
        <label className="block">
          <span className="font-sans text-[14px] text-ink">{contactoCopy.email}</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="mt-1 h-11 w-full border-b border-ink/25 bg-transparent font-sans text-[16px] text-ink outline-none focus:border-ink"
          />
        </label>
        <fieldset>
          <legend className="font-sans text-[14px] text-ink">{contactoCopy.soy}</legend>
          <div className="mt-3 flex gap-2">
            {(
              [
                ["marca", contactoCopy.marca],
                ["shopper", contactoCopy.shopper],
              ] as const
            ).map(([value, label]) => {
              const on = role === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setRole(value)}
                  className={`h-10 rounded-full border px-5 font-sans text-[14px] ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-ink bg-transparent text-ink"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <label className="block">
          <span className="font-sans text-[14px] text-ink">
            {contactoCopy.message}
          </span>
          <textarea
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={5}
            className="mt-2 w-full resize-none rounded-2xl border border-ink bg-transparent px-4 py-3 font-sans text-[16px] text-ink outline-none focus:border-ink"
          />
        </label>
        <button
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-ink font-sans text-[16px] font-medium text-paper"
        >
          {contactoCopy.submit}
        </button>
      </form>
    </>
  );
}
