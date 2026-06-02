/**
 * Global dekoratif arka plan katmanı.
 * Beyaz zemine hafif, akışkan bordo/gold çizgiler ekler.
 *
 * Güvenli yerleşim:
 *  - fixed + inset-0  → tüm sayfalarda sabit
 *  - -z-10            → daima içeriğin ARKASINDA (yazıların üstüne binmez)
 *  - pointer-events-none → tıklamayı engellemez
 */
export default function DecorBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Sağ üst akışkan çizgiler */}
      <svg
        className="absolute top-10 right-0 w-[560px] h-[560px] text-bordo"
        viewBox="0 0 600 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <g opacity="0.14">
          <path d="M600 40 C 440 90 360 180 380 300 C 395 390 340 450 220 480" />
          <path d="M600 90 C 460 140 380 230 400 350 C 415 440 360 500 240 530" />
          <path d="M600 140 C 480 190 400 280 420 400 C 435 490 380 550 260 580" />
          <path d="M580 0 C 420 50 340 140 360 260 C 375 350 320 410 200 440" />
        </g>
      </svg>

      {/* Sol alt akışkan çizgiler */}
      <svg
        className="absolute bottom-0 left-0 w-[560px] h-[560px] text-rose-goldDark"
        viewBox="0 0 600 600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <g opacity="0.16">
          <path d="M0 560 C 160 510 240 420 220 300 C 205 210 260 150 380 120" />
          <path d="M0 510 C 140 460 220 370 200 250 C 185 160 240 100 360 70" />
          <path d="M0 610 C 120 560 200 470 180 350 C 165 260 220 200 340 170" />
        </g>
      </svg>

      {/* Merkez yatay dalga dokusu */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] text-bordo opacity-[0.06]"
        viewBox="0 0 1100 500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M0 250 C 180 190 360 310 550 250 C 740 190 920 310 1100 250" />
        <path d="M0 300 C 180 240 360 360 550 300 C 740 240 920 360 1100 300" />
        <path d="M0 200 C 180 140 360 260 550 200 C 740 140 920 260 1100 200" />
      </svg>
    </div>
  );
}
