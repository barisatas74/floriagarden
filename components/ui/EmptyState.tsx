import Link from "next/link";
import { Sparkles, type LucideIcon } from "lucide-react";
import Button from "./Button";

type Props = {
  icon?: LucideIcon;
  title: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <div className="rounded-3xl glass-dark p-10 md:p-14 text-center flex flex-col items-center gap-5">
      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-gold-gradient text-coffee shadow-glow">
        <Icon size={24} strokeWidth={1.5} />
      </span>
      <h2 className="font-display text-3xl md:text-4xl text-coffee leading-tight">
        {title}
      </h2>
      <p className="text-coffee/70 max-w-md leading-relaxed">{description}</p>
      {(primaryCta || secondaryCta) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {primaryCta && (
            <Link href={primaryCta.href}>
              <Button variant="gold" size="md">
                {primaryCta.label}
              </Button>
            </Link>
          )}
          {secondaryCta && (
            <Link href={secondaryCta.href}>
              <Button variant="outline" size="md">
                {secondaryCta.label}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
