import { cn } from "@/lib/utils/cn";
import FadeIn from "@/components/motion/FadeIn";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Arka plan teması: koyu (default) krem metin, açık kart üstü ise koyu metin */
  theme?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  className,
}: Props) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-3", isCenter && "justify-center")}>
          <span className="divider-gold" aria-hidden />
          <span className="eyebrow">{eyebrow}</span>
          <span className="divider-gold" aria-hidden />
        </div>
      )}
      <h2
        className={cn(
          "heading-section text-balance max-w-3xl",
          isDark && "text-cream",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-balance max-w-2xl text-[0.98rem] md:text-base leading-relaxed",
            isDark ? "text-cream/75" : "text-coffee/70",
            isCenter && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
