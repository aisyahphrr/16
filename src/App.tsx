import { useState, useEffect, useRef, useCallback } from "react";

// ─── Decorative helpers ───────────────────────────────────────────────────────

function FloatingDeco() {
  const items = [
    { emoji: "✨", top: "10%", left: "8%", delay: "0s", size: "1.4rem" },
    { emoji: "💙", top: "20%", right: "10%", delay: "0.5s", size: "1.2rem" },
    { emoji: "⭐", top: "45%", left: "5%", delay: "1s", size: "1rem" },
    { emoji: "✨", top: "65%", right: "8%", delay: "1.5s", size: "1.3rem" },
    { emoji: "💫", top: "80%", left: "12%", delay: "0.8s", size: "1.1rem" },
    { emoji: "🌟", top: "35%", right: "6%", delay: "2s", size: "1rem" },
  ];
  return (
    <>
      {items.map((d, i) => (
        <span
          key={i}
          className="pointer-events-none select-none absolute animate-float"
          style={{
            top: d.top,
            left: ("left" in d) ? d.left : undefined,
            right: ("right" in d) ? (d as any).right : undefined,
            fontSize: d.size,
            animationDelay: d.delay,
            opacity: 0.7,
          }}
        >
          {d.emoji}
        </span>
      ))}
    </>
  );
}

function Stars({ count = 12 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.6 + Math.random() * 0.8,
    delay: `${Math.random() * 3}s`,
    dur: `${2 + Math.random() * 2}s`,
  }));
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none select-none absolute animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: `${s.size}rem`,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        >
          ✦
        </span>
      ))}
    </>
  );
}

// ─── Photo placeholder ────────────────────────────────────────────────────────

function PhotoPlaceholder({
  src,
  label,
  className = "",
  style = {},
  size = "normal",
  objectPosition = "center",
}: {
  src?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: "normal" | "large" | "small";
  objectPosition?: string;
}) {
  const sizeClass =
    size === "large"
      ? "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
      : size === "small"
        ? "w-24 h-24 sm:w-28 sm:h-28"
        : "w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40";

  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-sky-100 ${sizeClass} ${className}`}
        style={style}
      >
        <img
          src={src}
          alt={label || "Foto"}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          style={{ objectPosition }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-sky-100/60 border-2 border-dashed border-sky-300 rounded-xl overflow-hidden transition-all duration-300 hover:bg-sky-100/90 ${sizeClass} ${className}`}
      style={style}
    >
      <span className="text-3xl sm:text-4xl">📷</span>
      <span className="text-xs text-sky-500 font-semibold mt-1 text-center px-2">{label || "Foto"}</span>
    </div>
  );
}

// ─── Music button ─────────────────────────────────────────────────────────────

const AUDIO_SRC = "/Sal_Priadi_-_Serta_Mulia_(mp3.pm).mp3";

function MusicButton({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={`music-btn ${playing ? "playing" : ""}`}
      onClick={onToggle}
      aria-label={playing ? "Jeda musik" : "Putar musik"}
      title={playing ? "Jeda musik" : "Putar musik ♫"}
    >
      <span className={`text-sky-500 text-lg select-none ${playing ? "animate-rotate" : ""}`}>
        {playing ? "🎵" : "♫"}
      </span>
    </button>
  );
}

// ─── Scroll reveal hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Part 0: Gift Gate ────────────────────────────────────────────────────────

function GiftGate({ onEnter }: { onEnter: () => void }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMsg, setNoMsg] = useState("");
  const [attempt, setAttempt] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const messages = [
    "Hehe, gak bisa kabur ya 😌",
    "Coba lagi deh 😂",
    "Ayo dong dibuka... 😏",
    "Gak boleh nolak ya! 💙",
    "Tetap gak bisa 😄",
  ];

  const evadeButton = useCallback(() => {
    const msg = messages[attempt % messages.length];
    setNoMsg(msg);
    setAttempt((a) => a + 1);

    const maxX = typeof window !== "undefined" ? Math.min(window.innerWidth - 100, 220) : 150;
    const maxY = typeof window !== "undefined" ? Math.min(window.innerHeight - 100, 160) : 120;
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    setNoPos({ x: newX, y: newY });
  }, [attempt]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #ede9fe 100%)" }}
    >
      <Stars count={20} />
      <FloatingDeco />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm sm:max-w-md w-full text-center animate-fade-in-up">
        <div className="text-7xl sm:text-8xl animate-gift-bounce select-none" style={{ animationDuration: "1.8s" }}>
          🎁
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 w-full flex flex-col items-center gap-4">
          <h1
            className="text-2xl sm:text-3xl text-sky-700 font-bold"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Buka Hadiahmu 🎁
          </h1>
          <p className="text-sky-600 text-sm sm:text-base font-medium leading-relaxed">
            Ada sesuatu spesial untuk alan nieh xixixi, cekk yuk!
          </p>

          <div className="relative flex flex-col items-center gap-3 mt-2 w-full min-h-[120px]">
            {/* Tombol BUKA / MAU */}
            <button
              onClick={onEnter}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-white text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #38bdf8, #3b82f6)",
                boxShadow: "0 4px 18px rgba(59,130,246,0.35)",
              }}
            >
              MAU DONG 💙
            </button>

            {/* Tombol GAMAU — Menghindar saat didekati */}
            <button
              ref={btnRef}
              onMouseEnter={evadeButton}
              onTouchStart={evadeButton}
              onClick={evadeButton}
              className="py-2.5 px-6 rounded-2xl font-semibold text-sky-500 border-2 border-sky-200 bg-white/80 text-sm transition-all duration-300 whitespace-nowrap cursor-pointer select-none"
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              GAMAU 😐
            </button>
          </div>

          {noMsg && (
            <p
              className="text-sky-500 font-semibold text-xs sm:text-sm animate-fade-in"
              style={{ marginTop: -4 }}
            >
              {noMsg}
            </p>
          )}
        </div>

        <p className="text-sky-500 text-xs sm:text-sm font-medium tracking-wide opacity-80">
          ✦ dibuat oleh aisyahphr ✦
        </p>
      </div>
    </div>
  );
}

// ─── Part 1: Hero ─────────────────────────────────────────────────────────────

function HeroSection() {
  const scrollToStory = () => {
    document.getElementById("part2")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="part1"
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-24 text-center"
      style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 60%, #ffffff 100%)" }}
    >
      <Stars count={16} />
      <FloatingDeco />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-7 max-w-lg sm:max-w-xl md:max-w-2xl w-full animate-fade-in-up">
        {/* Badge Tanggal */}
        <div className="glass-card rounded-full px-5 py-2 text-xs sm:text-sm font-bold text-sky-600 tracking-wider uppercase shadow-sm">
          ✨ 16 SEPTEMBER — KE-21 TAHUN ✨
        </div>

        {/* Foto Scrapbook */}
        <div className="relative my-2">
          <div className="scrapbook-photo rounded-2xl transition-transform duration-300 hover:rotate-0 hover:scale-105" style={{ transform: "rotate(-2deg)" }}>
            <PhotoPlaceholder src="/alan0.jpeg" label="Foto Terbaik Kamu 💙" size="large" />
          </div>
          {/* Selotip dekorasi */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-200/80 rounded-sm animate-tape-wiggle"
            style={{ width: 56, height: 18, transform: "translateX(-50%) rotate(-3deg)" }}
          />
          {/* Stiker */}
          <span className="absolute -bottom-2 -right-2 text-2xl select-none">💙</span>
          <span className="absolute -top-1 -right-3 text-lg select-none animate-float" style={{ animationDelay: "0.5s" }}>⭐</span>
        </div>

        {/* Judul Utama */}
        <div className="px-2">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-sky-700 leading-tight"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Selamat Ulang Tahun,<br />
            <span className="shimmer-text">Ahlan Purba</span> 💙
          </h1>
          <p className="mt-3 text-sky-600 font-semibold text-base sm:text-xl">
            It's the day someone very special was born.
          </p>
        </div>

        {/* Ucapan Singkat */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 text-sm sm:text-base text-sky-800 leading-relaxed font-medium max-w-md shadow-md text-center space-y-2">
          <p>
            Semoga di usia yang baru, langkahmu selalu menemukan jalannya, doa-doamu menemukan jawabannya, dan segala hal baik datang pada waktu yang paling tepat. ✨
          </p>
          <p className="text-sky-600 font-semibold text-xs sm:text-sm pt-1 border-t border-sky-100/80">
            Selamat bertambah usia, Alan. Semoga tahun ini menjadi salah satu bab paling indah dalam hidupmu. 🤍
          </p>
        </div>

        {/* Tombol CTA */}
        <button
          onClick={scrollToStory}
          className="mt-2 px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-white text-base sm:text-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer shadow-lg"
          style={{
            background: "linear-gradient(135deg, #38bdf8, #3b82f6)",
            boxShadow: "0 6px 22px rgba(59,130,246,0.35)",
          }}
        >
          Lihat Cerita & Doa <span>→</span>
        </button>
      </div>
    </section>
  );
}

// ─── Part 2: Wishes + Gallery ─────────────────────────────────────────────────

const WISHES = [
  {
    icon: "🌱",
    title: "Merasa Cukup",
    text: "Aku berharap kamu selalu dikelilingi hal-hal yang membuatmu merasa cukup.",
  },
  {
    icon: "💙",
    title: "Lembut Pada Diri Sendiri",
    text: "Semoga kamu tidak terlalu keras kepada dirimu sendiri ketika sesuatu tidak berjalan seperti yang kamu inginkan.",
  },
  {
    icon: "✨",
    title: "Usaha yang Berbuah Manis",
    text: "Semoga semua usaha yang selama ini kamu simpan dalam diam perlahan menemukan hasilnya.",
  },
  {
    icon: "😊",
    title: "Banyak Alasan Tersenyum",
    text: "Semoga kamu bertemu lebih banyak alasan untuk tersenyum, lebih banyak tempat untuk pulang, dan lebih banyak hari yang membuatmu berpikir: “ternyata, hidup memang seindah ini.”",
  },
];

const GALLERY = [
  {
    rotate: "-2.5deg",
    src: "/alan1.jpeg",
    position: "center 50%",
    label: "senyum manis\ngigi ✨",
  },
  {
    rotate: "2deg",
    src: "/alan2.jpeg",
    position: "center 45%",
    label: "si paling\nmetal 🤘😆",
  },
  {
    rotate: "-1.5deg",
    src: "/alan3.jpeg",
    position: "center 88%",
    label: "OwWW anak laut\nbruh 🚤👍",
  },
  {
    rotate: "2.5deg",
    src: "/alan4.jpeg",
    position: "center 75%",
    label: "ini sebenernya\nngapain sih 😝",
  },
  {
    rotate: "-2deg",
    src: "/alan5.jpeg",
    position: "center 40%",
    label: "aura anak\nsholeh ☀️😇",
  },
  {
    rotate: "1.5deg",
    src: "/alan6.jpeg",
    position: "center 75%",
    label: "my favorit\ndriver 🚗😎",
  },
];

function WishesSection() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const refNote = useScrollReveal();
  const ref3 = useScrollReveal();
  const ref4 = useScrollReveal();

  return (
    <section
      id="part2"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Stars count={14} />
      </div>

      <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center gap-10 sm:gap-12">
        {/* Heading Doa */}
        <div ref={ref1} className="scroll-reveal text-center px-4">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-sky-700 font-bold"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            A few things I wish for you... ✨
          </h2>
          <p className="mt-3 text-sky-600 text-sm sm:text-base font-medium">
            Untuk Alan yang sedang ber-ulang tahun
          </p>
        </div>

        {/* Kartu Doa (Grid responsif untuk PC & Mobile) */}
        <div ref={ref2} className="scroll-reveal w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {WISHES.map((w, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 sm:p-6 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <span className="text-2xl sm:text-3xl mt-1 select-none">{w.icon}</span>
              <div className="flex flex-col gap-1">
                <h3 className="text-sky-800 font-bold text-base sm:text-lg">{w.title}</h3>
                <p className="text-sky-700 text-sm sm:text-base font-medium leading-relaxed">{w.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Catatan tulus penutup doa */}
        <div ref={refNote} className="scroll-reveal glass-card rounded-3xl p-6 sm:p-8 w-full max-w-xl text-center shadow-lg space-y-4">
          <p className="text-sm sm:text-base text-sky-800 font-medium leading-relaxed">
            Dan di antara banyak hal yang aku harapkan untukmu, aku hanya ingin satu hal sederhana:
          </p>
          <p className="text-base sm:text-lg text-sky-700 font-bold leading-relaxed px-2">
            “Semoga kamu selalu menjadi Alan yang aku kenal—dengan segala baik, kurang, jatuh, bangun, dan segala hal yang membuatmu menjadi dirimu sendiri.” 💙
          </p>
          <div className="border-t border-sky-100 pt-3 text-xs sm:text-sm text-sky-600 italic leading-relaxed">
            Aku mungkin belum tahu akan sejauh apa langkah kita nanti.<br />
            Tapi untuk hari ini, aku senang pernah dipertemukan denganmu. Dan aku berharap, kita masih punya banyak cerita untuk ditulis bersama. ✨
          </div>
        </div>

        {/* Gallery heading */}
        <div ref={ref3} className="scroll-reveal text-center px-4 mt-6">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl text-sky-600 font-bold"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Potret Ahlan 📸
          </h3>
          <p className="mt-2 text-sky-500 text-sm sm:text-base font-medium">
            Kumpulan sisi keren, manis, dan tengil-nya alann huft.
          </p>
        </div>

        {/* Scrapbook gallery: Pasti 2 Kolom x 3 Baris di Mobile, 3 Kolom di Desktop */}
        <div className="scroll-reveal w-full max-w-sm sm:max-w-xl md:max-w-3xl mx-auto" ref={ref4}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 justify-items-center">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className="scrapbook-photo rounded-xl relative w-full max-w-[165px] sm:max-w-[210px] transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-20 cursor-pointer"
                style={{
                  transform: `rotate(${g.rotate})`,
                }}
              >
                <PhotoPlaceholder
                  src={g.src}
                  objectPosition={g.position || "center"}
                  label=""
                  className="w-full aspect-square sm:aspect-[4/5] rounded-lg"
                  style={{ border: "none" }}
                />
                <p className="text-center text-[11px] sm:text-xs md:text-sm text-sky-800 font-semibold mt-2 px-1 min-h-[2.5rem] flex items-center justify-center leading-snug whitespace-pre-line text-balance">
                  {g.label}
                </p>
                {/* Decorative stickers */}
                {i % 3 === 0 && (
                  <span className="absolute -top-2 -right-2 text-base animate-sparkle" style={{ animationDelay: `${i * 0.3}s` }}>✨</span>
                )}
                {i % 2 === 0 && (
                  <span className="absolute -bottom-2 -left-2 text-base">💙</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Part 3: His Wish ─────────────────────────────────────────────────────────

interface WishState {
  text: string;
  saved: boolean;
  saving: boolean;
  error: string;
}

function WishSection({ onWishSaved }: { onWishSaved: () => void }) {
  const [state, setState] = useState<WishState>({
    text: "",
    saved: false,
    saving: false,
    error: "",
  });
  const ref = useScrollReveal();

  const handleSubmit = async () => {
    if (!state.text.trim()) {
      setState((s) => ({ ...s, error: "Harapanmu gak boleh kosong ya! Tulis sesuatu 💙" }));
      return;
    }
    setState((s) => ({ ...s, saving: true, error: "" }));

    // Simulasi penyimpanan (bisa diintegrasikan ke backend / fetch API)
    await new Promise((res) => setTimeout(res, 1200));

    setState((s) => ({ ...s, saving: false, saved: true }));
    onWishSaved();
  };

  return (
    <section
      id="part3"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)" }}
    >
      <Stars count={10} />
      <div ref={ref} className="scroll-reveal max-w-md sm:max-w-lg md:max-w-xl mx-auto flex flex-col items-center gap-6 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-sky-700 font-bold"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Sekarang Giliran Kamu ✨
        </h2>
        <p className="text-sky-600 text-sm sm:text-base font-medium leading-relaxed px-2">
          Setelah membaca doa-doa tadi, sekarang tuliskan satu harapan atau impian terbesarmu untuk tahun ini.
        </p>

        {/* Foto Lingkaran Animasi Alan Kecil */}
        <div className="relative flex flex-col items-center my-1">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 bg-gradient-to-tr from-sky-400 via-blue-300 to-indigo-400 shadow-xl animate-float">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner bg-sky-100">
              <img
                src="/alan-kecil.jpeg"
                alt="Alan Kecil"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
            {/* Stiker animasi */}
            <span className="absolute -top-1 -right-1 text-xl animate-sparkle" style={{ animationDelay: "0.2s" }}>✨</span>
            <span className="absolute -bottom-1 -left-1 text-lg animate-pulse-soft">💙</span>
          </div>
          <span className="mt-2 text-xs sm:text-sm font-bold text-sky-600 tracking-wide">
            Si Alan yang sekarang genap 21 tahun 🥺💙
          </span>
        </div>

        {state.saved ? (
          <div className="glass-card rounded-3xl p-6 sm:p-10 w-full flex flex-col items-center gap-4 animate-unlock-pop shadow-xl">
            <span className="text-5xl sm:text-6xl select-none">✨</span>
            <h3
              className="text-2xl sm:text-3xl text-sky-700"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              Harapanmu Sudah Tersimpan!
            </h3>
            <p className="text-sky-600 text-sm sm:text-base font-medium">
              Aku akan simpan dan aminkan doa ini baik-baik. 💙
            </p>
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 sm:p-5 w-full text-left mt-2">
              <p className="text-xs text-sky-500 font-bold uppercase tracking-wider mb-1">Harapanmu:</p>
              <p className="text-sky-800 text-sm sm:text-base font-medium italic">"{state.text}"</p>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-6 sm:p-8 w-full flex flex-col gap-4 text-left shadow-lg">
            <label className="text-sky-800 font-bold text-sm sm:text-base">
              Apa yang paling kamu harapkan di tahun ini?
            </label>
            <textarea
              value={state.text}
              onChange={(e) => setState((s) => ({ ...s, text: e.target.value, error: "" }))}
              placeholder="Tuliskan harapan atau impianmu di sini..."
              rows={4}
              className="w-full rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4 text-sky-800 text-sm sm:text-base font-medium placeholder:text-sky-300 resize-none focus:border-sky-400 focus:bg-white transition-all shadow-inner"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            />
            {state.error && (
              <p className="text-rose-500 text-xs sm:text-sm font-semibold flex items-center gap-1.5 animate-fade-in">
                <span>⚠️</span> {state.error}
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={state.saving}
              className="w-full py-3.5 sm:py-4 rounded-2xl font-bold text-white text-sm sm:text-base transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md"
              style={{
                background: state.saving
                  ? "linear-gradient(135deg, #93c5fd, #a5b4fc)"
                  : "linear-gradient(135deg, #38bdf8, #3b82f6)",
                boxShadow: "0 4px 18px rgba(59,130,246,0.3)",
              }}
            >
              {state.saving ? (
                <>
                  <span className="animate-rotate inline-block">⭐</span> Menyimpan harapanmu...
                </>
              ) : (
                "Simpan Harapanku 💙"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Part 4: Locked Letter ────────────────────────────────────────────────────

function LetterSection({ unlocked }: { unlocked: boolean }) {
  const [opened, setOpened] = useState(false);
  const ref = useScrollReveal();

  return (
    <section
      id="part4"
      className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #e0f2fe 0%, #ede9fe 50%, #f0f9ff 100%)" }}
    >
      <Stars count={12} />
      <div ref={ref} className="scroll-reveal max-w-md sm:max-w-lg md:max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-sky-700 font-bold"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          {unlocked ? "Hadiah Terakhirmu Siap Dibuka 💌" : "Satu Hadiah Terakhir..."}
        </h2>

        {!unlocked ? (
          <div className="glass-card rounded-3xl p-6 sm:p-10 w-full flex flex-col items-center gap-4 shadow-lg">
            <span className="text-6xl sm:text-7xl animate-float select-none" style={{ animationDuration: "2.5s" }}>🔒</span>
            <p className="text-sky-700 text-sm sm:text-base font-semibold leading-relaxed">
              Ada satu surat rahasia yang menunggumu...
            </p>
            <p className="text-sky-500 text-xs sm:text-sm font-medium">
              Tulis dan simpan harapanmu di bagian sebelumnya untuk membuka surat ini!
            </p>
            <button
              disabled
              className="mt-2 w-full py-3.5 rounded-2xl font-bold text-sky-400 border-2 border-sky-200 bg-white/60 text-sm sm:text-base cursor-not-allowed"
            >
              🔒 Surat Terkunci
            </button>
          </div>
        ) : !opened ? (
          <div className="glass-card rounded-3xl p-6 sm:p-10 w-full flex flex-col items-center gap-4 animate-unlock-pop shadow-xl">
            <span className="text-6xl sm:text-7xl animate-pulse-soft select-none">🔓</span>
            <p className="text-sky-700 font-bold text-base sm:text-lg">Kunci telah terbuka!</p>
            <p className="text-sky-600 text-sm font-medium">Surat spesial ini siap untuk kamu baca.</p>
            <button
              onClick={() => setOpened(true)}
              className="mt-2 w-full py-3.5 sm:py-4 rounded-2xl font-bold text-white text-sm sm:text-base transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              style={{
                background: "linear-gradient(135deg, #818cf8, #38bdf8)",
                boxShadow: "0 6px 22px rgba(129,140,248,0.35)",
              }}
            >
              Buka Surat Ulang Tahun 💌
            </button>
          </div>
        ) : (
          <div
            className="w-full rounded-3xl p-6 sm:p-10 flex flex-col gap-6 text-left animate-fade-in-up shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
              border: "2px solid #bae6fd",
              boxShadow: "0 8px 40px rgba(14,165,233,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Hiasan atas */}
            <div className="flex justify-center gap-3 text-xl select-none">
              <span className="animate-sparkle" style={{ animationDelay: "0s" }}>✨</span>
              <span className="animate-sparkle" style={{ animationDelay: "0.3s" }}>💙</span>
              <span className="animate-sparkle" style={{ animationDelay: "0.6s" }}>✨</span>
            </div>

            <h3
              className="text-2xl sm:text-3xl text-sky-700 text-center font-bold"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              Dear Alan,
            </h3>

            <div
              className="text-sky-900 text-sm sm:text-base leading-relaxed space-y-4"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              <p>
                Kalau kamu sudah sampai di bagian ini, berarti kamu sudah menitipkan satu harapanmu untuk tahun ini. Aku nggak tahu apa yang kamu tulis di sana, tapi aku berharap semoga suatu hari nanti kamu bisa melihat harapan itu menjadi nyata.
              </p>
              <p>
                Aku juga punya beberapa harapan untukmu. Aku berharap kamu selalu punya cukup keberanian untuk mengejar apa yang kamu inginkan, cukup sabar untuk menunggu apa yang belum bisa kamu miliki, dan cukup kuat untuk melewati hari-hari yang tidak selalu mudah.
              </p>
              <p>
                Aku tahu hidup nggak akan selalu berjalan sesuai rencana. Akan ada hari ketika semuanya terasa berat, ketika usaha terasa sia-sia, atau ketika kamu mulai meragukan dirimu sendiri.
              </p>
              <p>
                Kalau suatu hari nanti kamu sampai di sana, aku harap kamu ingat—kamu nggak harus selalu menjadi kuat. Kamu boleh berhenti sebentar. Boleh merasa lelah. Boleh nggak tahu harus ke mana. Dan kalau aku masih diberi kesempatan untuk berjalan di sampingmu, aku ingin menjadi salah satu orang yang mengingatkanmu bahwa kamu sudah sejauh ini.
              </p>
              <p>
                Kita memang baru memulai cerita ini, belum terlalu lama kalau dibandingkan dengan panjangnya waktu yang mungkin masih menunggu kita. Tapi anehnya, dalam waktu yang singkat itu, ada begitu banyak hal kecil tentangmu yang berhasil menjadi bagian dari hari-hariku.
              </p>
              <p>
                Percakapan sederhana. Tawa yang mungkin kamu anggap biasa. Momen-momen kecil yang mungkin akan terlupakan oleh waktu, tapi entah kenapa ingin kusimpan lebih lama.
              </p>
              <p>
                Dan mungkin itu yang paling aku sukai dari kita. Bukan tentang seberapa sempurna semuanya, tapi tentang bagaimana dua orang bisa bertemu, saling mengenal perlahan, lalu memilih untuk tetap tinggal.
              </p>
              <p>
                Jadi, di hari ulang tahunmu ini, aku nggak ingin hanya mengucapkan “semoga bahagia”. Aku ingin kamu benar-benar menemukan kebahagiaan itu. Dalam pekerjaan yang kamu perjuangkan. Dalam mimpi yang sedang kamu kejar. Dalam orang-orang yang menyayangimu. Dalam hal-hal kecil yang sering kali tidak kamu sadari.
              </p>
              <p>
                Dan kalau suatu hari nanti kamu menoleh ke belakang, aku harap kamu bisa tersenyum melihat seberapa jauh kamu sudah berjalan.
              </p>
              <p>
                Terima kasih sudah hadir di hidupku, Alan. Terima kasih untuk semua hal kecil yang mungkin nggak pernah kamu tahu ternyata berarti begitu banyak untukku.
              </p>
              <p>
                Aku nggak tahu seperti apa cerita kita nanti. Tapi untuk sekarang, aku ingin menikmati setiap halaman yang sedang kita tulis. Pelan-pelan saja. Nggak perlu terburu-buru sampai ke akhir. Karena mungkin, bagian paling indah dari sebuah cerita bukan tentang bagaimana akhirnya—tapi tentang siapa yang kita temui dan kenangan apa yang kita buat di sepanjang perjalanan.
              </p>
              <p className="font-semibold text-sky-800">
                Happy birthday, Alan. 🤍<br />
                Semoga usia yang baru ini membawamu lebih dekat kepada semua hal yang selama ini kamu doakan. Dan semoga, di antara begitu banyak hal baik yang akan datang kepadamu nanti, aku masih boleh menjadi bagian kecil dari cerita itu.
              </p>
            </div>

            <div className="border-t border-sky-100 pt-5 flex flex-col gap-1 text-right">
              <p
                className="text-sky-600 text-lg sm:text-xl font-bold"
                style={{ fontFamily: "'Pacifico', cursive" }}
              >
                With love, Aisyah. 🤍
              </p>
              <p className="text-xs sm:text-sm text-sky-500 italic mt-1">
                This isn't the end of our story.<br />
                Pelan-pelan saja. Masih banyak halaman yang belum kita tulis.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Part 5: Ending ───────────────────────────────────────────────────────────

function EndingSection() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();

  return (
    <section
      id="part5"
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden flex flex-col items-center text-center"
      style={{ background: "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 60%, #ffffff 100%)" }}
    >
      <Stars count={18} />

      <div ref={ref1} className="scroll-reveal z-10 max-w-lg w-full flex flex-col items-center gap-4">
        <h2
          className="text-4xl sm:text-5xl text-sky-700 font-bold"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Bersambung...
        </h2>
        <p className="text-sky-600 font-semibold text-base sm:text-lg">
          Ini bukanlah akhir, melainkan awal dari banyak cerita indah berikutnya.
        </p>
      </div>

      <div ref={ref2} className="scroll-reveal z-10 max-w-lg w-full flex flex-col items-center gap-6 mt-8">
        <p className="text-sky-700 text-sm sm:text-base font-medium leading-relaxed italic px-4">
          Masih banyak kenangan manis yang akan kita buat,<br />
          tempat-tempat indah yang akan kita kunjungi bersama,<br />
          pengalaman baru yang akan kita lalui,<br />
          serta ulang tahun-ulang tahun berikutnya yang akan kita rayakan.
        </p>

        {/* Kolase foto akhir berdampingan (tidak saling menumpuk) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 w-full max-w-lg">
          <div
            className="scrapbook-photo rounded-xl shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105"
            style={{ transform: "rotate(-2deg)" }}
          >
            <PhotoPlaceholder
              src="/kita1.jpeg"
              objectPosition="center 30%"
              label="kita 💙"
              size="normal"
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg"
            />
            <p className="text-center text-xs sm:text-sm text-sky-800 font-semibold mt-2">kita 💙</p>
          </div>

          <div
            className="scrapbook-photo rounded-xl shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105"
            style={{ transform: "rotate(2deg)" }}
          >
            <PhotoPlaceholder
              src="/kita3.jpeg"
              objectPosition="center 30%"
              label="selamanya ✨"
              size="normal"
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg"
            />
            <p className="text-center text-xs sm:text-sm text-sky-800 font-semibold mt-2">selamanya ✨</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <h3
            className="text-3xl sm:text-4xl text-sky-600 font-bold"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Selamat Ulang Tahun, Ahlan 💙
          </h3>
          <p
            className="text-sky-400 text-xl sm:text-2xl animate-pulse-soft"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            ILY ♡
          </p>
        </div>

        <p className="text-sky-400 text-xs sm:text-sm mt-4 tracking-widest uppercase font-medium">
          ✦ dibuat oleh aisyahphr ✦
        </p>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [entered, setEntered] = useState(false);
  const [wishSaved, setWishSaved] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audioRef.current = audio;

    document.title = "alan bday";

    // Coba putar otomatis saat pertama kali dibuka
    const tryAutoplay = () => {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        // Jika browser memblokir autoplay sebelum klik pengguna,
        // musik akan langsung diputar otomatis begitu layar disentuh/diklik
      });
    };

    tryAutoplay();

    // Fallback: Begitu user berinteraksi / menyentuh layar pertama kali
    const handleFirstUserInteraction = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setPlaying(true);
        }).catch(() => { });
      }
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstUserInteraction, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => { });
    }
  };

  const handleEnter = () => {
    setEntered(true);
    // Pastikan musik menyala saat user menekan 'MAU DONG'
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setPlaying(true);
      }).catch(() => { });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-sky-200 selection:text-sky-900">
      {!entered ? (
        <GiftGate onEnter={handleEnter} />
      ) : (
        <div className="animate-fade-in" style={{ animationDuration: "0.8s" }}>
          <HeroSection />
          <WishesSection />
          <WishSection onWishSaved={() => setWishSaved(true)} />
          <LetterSection unlocked={wishSaved} />
          <EndingSection />
        </div>
      )}
      <MusicButton playing={playing} onToggle={toggleMusic} />
    </div>
  );
}
