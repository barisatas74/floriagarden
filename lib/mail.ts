import nodemailer, { type Transporter } from "nodemailer";

/**
 * SMTP e-posta gönderimi (Alastyr merhaba@ kutusu).
 * Vercel env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ORDER_NOTIFY_EMAIL
 * Ayarlar yoksa sessizce devre dışı kalır (sipariş yine kaydedilir).
 */

let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    transporter = null;
    return null;
  }
  const port = Number(process.env.SMTP_PORT ?? 465);
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return transporter;
}

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const t = getTransporter();
  if (!t || !opts.to) {
    console.error("[mail] SMTP transporter veya alıcı yok", {
      hasTransporter: Boolean(t),
      to: opts.to,
    });
    return false;
  }
  try {
    await t.sendMail({
      from: `"Floria Garden" <${process.env.SMTP_USER}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return true;
  } catch (error) {
    console.error("[mail] E-posta gönderilemedi", {
      to: opts.to,
      subject: opts.subject,
      error: error instanceof Error ? error.message : String(error),
    });
    return false;
  }
}

/** İşletmenin bildirim adresi (yoksa SMTP_USER'a düşer). */
export function notifyEmail(): string {
  return process.env.ORDER_NOTIFY_EMAIL || process.env.SMTP_USER || "";
}
