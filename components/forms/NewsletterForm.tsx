"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { useToast } from "@/components/toast/ToastProvider";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      setError("Geçerli bir e-posta adresi girin.");
      return;
    }
    setError(null);
    setDone(true);
    toast({
      title: "Bültene abone oldunuz",
      description: "Yeni koleksiyonlardan ilk siz haberdar olun.",
      tone: "success",
    });
    // (Gerçek backend bağlanınca burada API çağrısı olacak)
    setTimeout(() => {
      setEmail("");
      setDone(false);
    }, 4000);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-rose-gold/30 bg-cream/5 p-5 flex items-center gap-3"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee">
          <Check size={18} strokeWidth={2} />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-lg text-cream">Hoş geldiniz!</span>
          <span className="text-xs text-cream/65">
            E-bülten listemize başarıyla eklendiniz.
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@eposta.com"
          aria-label="E-posta adresiniz"
          className="flex-1 h-12 rounded-full bg-cream/5 border border-rose-gold/25 px-5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-rose-gold focus:bg-cream/10 transition-colors"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-rose-gold-gradient text-coffee text-sm font-medium tracking-wide shadow-glow hover:brightness-105 transition-all"
        >
          <Send size={16} strokeWidth={1.7} />
          <span>Abone Ol</span>
        </button>
      </div>
      {error && (
        <span role="alert" className="text-xs text-bordo-300 px-2">
          {error}
        </span>
      )}
      <p className="text-[0.7rem] text-cream/45 px-2">
        Abone olarak gizlilik politikamızı kabul etmiş olursunuz.
      </p>
    </form>
  );
}
