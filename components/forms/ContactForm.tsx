"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import Button from "@/components/ui/Button";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "+90 ",
  topic: "Genel bilgi",
  message: "",
};

const TOPICS = [
  "Genel bilgi",
  "Sipariş hakkında",
  "Kurumsal teklif",
  "Açılış / Etkinlik",
  "Düğün / Nişan",
  "Diğer",
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!state.name.trim()) errs.name = "Adınız gerekli";
    if (!state.email.trim() && !state.phone.trim())
      errs.email = "E-posta veya telefon gerekli";
    if (!state.message.trim()) errs.message = "Mesajınızı yazın";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    // Backend yokken simülasyon
    setSubmitted(true);
    setTimeout(() => {
      setState(initialState);
      setSubmitted(false);
    }, 4000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-rose-gold/30 bg-rose-gold/10 p-8 text-center"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee mb-4">
          <Check size={24} strokeWidth={2} />
        </span>
        <h3 className="font-display text-2xl text-coffee">Mesajınız bize ulaştı</h3>
        <p className="mt-2 text-sm text-coffee/70 max-w-sm mx-auto">
          Ekibimiz en kısa sürede sizinle iletişime geçecek. Teşekkür ederiz.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full rounded-2xl bg-cream border border-rose-gold/20 px-4 h-12 text-sm text-coffee placeholder:text-coffee/35 focus:outline-none focus:border-rose-gold focus:bg-white transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <Field
          label="Adınız Soyadınız"
          required
          error={errors.name}
        >
          <input
            type="text"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            placeholder="Örn: Ayşe Yılmaz"
            className={inputClass}
            required
          />
        </Field>

        <Field
          label="Konu"
        >
          <select
            value={state.topic}
            onChange={(e) => setState({ ...state, topic: e.target.value })}
            className={inputClass}
            style={{ colorScheme: "light" }}
          >
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="E-posta" error={errors.email}>
          <input
            type="email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="ornek@eposta.com"
            className={inputClass}
          />
        </Field>

        <Field label="Telefon">
          <input
            type="tel"
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            placeholder="+90 5xx xxx xx xx"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Mesajınız" required error={errors.message}>
        <textarea
          value={state.message}
          onChange={(e) => setState({ ...state, message: e.target.value })}
          rows={5}
          placeholder="Talebinizi veya sorunuzu birkaç cümleyle aktarın..."
          className="w-full rounded-2xl bg-cream border border-rose-gold/20 px-4 py-3 text-sm text-coffee placeholder:text-coffee/35 focus:outline-none focus:border-rose-gold focus:bg-white transition-colors resize-none"
          required
        />
      </Field>

      <p className="text-xs text-coffee/45 leading-relaxed">
        Formu gönderdiğinizde verileriniz yalnızca size dönüş yapmak için
        kullanılır.
      </p>

      <div>
        <Button variant="gold" size="lg" type="submit">
          <Send size={16} strokeWidth={1.7} />
          <span>Mesajı Gönder</span>
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.7rem] uppercase tracking-wider2 text-rose-gold">
        {label}
        {required && <span className="ml-0.5 text-bordo-300">*</span>}
      </span>
      {children}
      {error && (
        <span className="text-[0.7rem] text-bordo-300" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
