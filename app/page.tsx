"use client";

import { useEffect, useRef, useState } from "react";

/** Brand colors from your PDF */
const COLORS = {
  softBlue: "#8DE2ED",           // used as a dreamy accent
  deepPurple: "#582BAF",         // luxe contrast
  olive: "rgb(170, 187, 144)",   // muted olive accent
};

type Kit = { name: string; items: string; price: string };

const kits: Kit[] = [
  { name: "Zed Starter Kit", items: "PJ set + Sleep mask", price: "250–300 AED" },
  { name: "Cozy Nights Kit", items: "PJ set + Slippers + Mist", price: "350–420 AED" },
  { name: "Ultimate Sleep Kit", items: "PJ set + Sleep mask + Mist + Headband + Pouch", price: "500–600 AED" },
];

const journalTeasers = [
  "5-Minute Bedtime Rituals You’ll Actually Do",
  "Why Bamboo Beats Cotton for Summer Sleep",
  "Packing the Perfect Sleepover Kit",
];

/** simple starfield animation (no libs) */
function Stars() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="twinkle absolute -top-10 left-10 w-1 h-1 rounded-full bg-white/80" />
      <div className="twinkle absolute top-20 right-16 w-1.5 h-1.5 rounded-full bg-white/80" />
      <div className="twinkle absolute bottom-16 left-1/3 w-1 h-1 rounded-full bg-white/80" />
      <div className="twinkle absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white/80" />
      <div className="twinkle absolute bottom-10 right-8 w-1 h-1 rounded-full bg-white/80" />
      <style jsx>{`
        .twinkle { animation: twinkle 2.4s ease-in-out infinite alternate; }
        @keyframes twinkle { from { transform: scale(.6); opacity:.6 } to { transform: scale(1.3); opacity:1 } }
      `}</style>
    </div>
  );
}

/** light parallax clouds */
function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="cloud -left-20 top-10" />
      <div className="cloud right-[-120px] top-24 delay-1000" />
      <div className="cloud left-1/3 top-40 delay-700" />
      <style jsx>{`
        .cloud {
          position: absolute;
          width: 320px; height: 140px;
          filter: blur(12px); opacity: .18;
          background: radial-gradient(closest-side, #fff, rgba(255,255,255,.05));
          border-radius: 9999px;
          animation: drift 22s linear infinite;
        }
        .delay-700 { animation-delay: .7s }
        .delay-1000 { animation-delay: 1s }
        @keyframes drift { from { transform: translateX(-4%) } to { transform: translateX(4%) } }
      `}</style>
    </div>
  );
}

/** simple Pinterest-like masonry using CSS columns */
function Masonry({ items }: { items: string[] }) {
  return (
    <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {items.map((src, i) => (
        <figure key={i} className="mb-4 break-inside-avoid rounded-3xl overflow-hidden border bg-white/80 dark:bg-slate-900/60 border-white/40 shadow-[0_10px_40px_-12px_rgba(244,114,182,.35)]">
          <img
            src={src}
            alt="ZED inspo"
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </figure>
      ))}
    </div>
  );
}

export default function Page() {
  /** demo grid images (replace with your assets later) */
  const [inspo, setInspo] = useState<string[]>(() =>
    Array.from({ length: 16 }, (_, i) => {
      const q = [
        "pastel bedroom", "bamboo pajamas", "lavender room", "soft linen bedding",
        "strawberry matcha", "sleep ritual", "moon lamp pastel", "girly desk",
        "silk scrunchies", "cozy slippers", "bath ritual", "pajama flatlay",
        "apricot gradient", "buttery soft fabric", "lavender cloud", "bunny plush"
      ][i % 16].replace(/\s/g, "+");
      const w = 600 + (i % 4) * 60, h = 500 + (i % 5) * 70;
      return `https://source.unsplash.com/${w}x${h}/?${q}`;
    })
  );

  /** lazy add more on scroll (like Pinterest) */
  const sentry = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentry.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setInspo((prev) => prev.concat(prev.slice(0, 8))); // duplicate demo set
      }
    }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-slate-800 dark:text-slate-100">
      {/* dreamy gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(1200px 600px at 10% -10%, ${COLORS.softBlue}22, transparent 60%),
                       radial-gradient(1000px 500px at 90% 10%, rgba(255,182,193,.25), transparent 60%),
                       linear-gradient(to bottom, #fffafa, #fff0f6 35%, #f5e1ff 70%, #fff)`,
        }}
      />
      <Stars />
      <Clouds />

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur border-b border-pink-200/50 dark:border-fuchsia-800/30 bg-white/60 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-2xl grid place-items-center text-white font-extrabold"
              style={{ background: `linear-gradient(135deg, ${COLORS.softBlue}, ${COLORS.deepPurple})` }}
              title="Bunny peeks behind E (brand detail)"
            >
              Z
            </div>
            <span className="font-semibold tracking-tight">ZED</span>
          </div>
          <div className="flex-1" />
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#kits" className="opacity-80 hover:opacity-100">Sleep Kits</a>
            <a href="#why" className="opacity-80 hover:opacity-100">Why ZED</a>
            <a href="#bunny" className="opacity-80 hover:opacity-100">Meet the Bunny</a>
            <a href="#journal" className="opacity-80 hover:opacity-100">Sleep Journal</a>
          </nav>
          <a href="#kits" className="ml-3 px-3 py-2 rounded-2xl text-sm font-semibold border border-rose-200/70 hover:-translate-y-0.5 transition">
            Explore Kits
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              ZED
              <span className="block mt-2 text-3xl sm:text-5xl">Sleep, Revolutionized.</span>
            </h1>
            <p className="mt-5 text-lg opacity-90">
              Sleepwear made with natural and organic fibres — for nights that feel as good as they look.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#kits"
                className="px-5 py-3 rounded-2xl font-semibold text-white shadow-lg"
                style={{ background: `linear-gradient(90deg, ${COLORS.deepPurple}, ${COLORS.softBlue})` }}
              >
                Explore Sleep Kits
              </a>
              <a
                href="#journal"
                className="px-5 py-3 rounded-2xl font-semibold border border-rose-200/70 backdrop-blur bg-white/70 hover:-translate-y-0.5 transition"
              >
                Explore Rituals
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS (from PDF) */}
      <section id="why" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl p-6 md:p-8 bg-pink-50 border border-pink-200/70">
            <h2 className="text-2xl font-bold">🌿 The Natural Collection</h2>
            <p className="mt-3 opacity-90">
              Breathable fabrics from the earth — think cotton, linen, and silk — chosen for comfort and timeless wearability.
              <br /> <span className="font-medium">Naturally soft. Beautifully simple.</span>
            </p>
          </div>
          <div className="rounded-3xl p-6 md:p-8" style={{ background: `${COLORS.olive}18` }}>
            <h2 className="text-2xl font-bold">🍃 The Organic Collection</h2>
            <p className="mt-3 opacity-90">
              Crafted from certified organic materials like bamboo cotton and banana fibre — kind to your skin and the planet.
              <br /> <span className="font-medium">Clean for the planet. Cleaner for your rest.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SLEEP KITS (from PDF) */}
      <section id="kits" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sleep Kits</h2>
          <a href="#" className="text-sm underline decoration-pink-400">See all</a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kits.map((k) => (
            <article
              key={k.name}
              className="rounded-3xl border border-rose-200/60 bg-white/80 dark:bg-slate-900/60 p-6 backdrop-blur hover:shadow-[0_20px_60px_-20px_rgba(217,70,239,.45)] transition"
            >
              <h3 className="font-semibold text-xl">{k.name}</h3>
              <p className="mt-2 text-sm opacity-80">{k.items}</p>
              <div className="mt-4 font-semibold">{k.price}</div>
              <button
                className="mt-6 px-4 py-2 rounded-2xl font-semibold text-white"
                style={{ background: `linear-gradient(90deg, ${COLORS.softBlue}, ${COLORS.deepPurple})` }}
              >
                Pre-order Now
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* MEET THE BUNNY (from PDF) */}
      <section id="bunny" className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-3xl p-6 md:p-10 border border-fuchsia-200/60 bg-gradient-to-br from-pink-50 to-fuchsia-50">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Meet ZED’s Bunny — Your Softest Sleep Companion</h2>
          <p className="mt-4 italic opacity-80">She peeks out from the “E” — and whispers: “Slow down. You’re safe now.”</p>
          <div className="mt-6 space-y-4 opacity-90">
            <p>
              At first glance, you’ll spot her peeking shyly behind the letter E in ZED. A tiny, hand-drawn bunny.
              Soft ears. Curious eyes. Quiet comfort. She’s more than a mascot — she’s the heart of ZED.
            </p>
            <p>
              Our bunny is a symbol of stillness, softness, safety, and a little bit of whimsy — those quieter moments
              when you’re lighting a candle, putting on your PJs, or pulling the duvet up to your chin.
            </p>
            <p>Look closely. She’s always near. 🐰✨</p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {["Bunnies are gentle by nature","Creatures of ritual & calm","Moon myths feature a rabbit spirit","They curl up quietly — like we do at night"].map((t,i)=>(
              <div key={i} className="rounded-2xl p-4 border border-pink-200/60 bg-white/70">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PINTEREST MASONRY (girly inspo + hover) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Inspo</h2>
        <p className="mt-2 opacity-80">Soft pastels, cozy rituals, dreamy textures.</p>
        <div className="mt-6">
          <Masonry items={inspo} />
          <div ref={sentry} />
        </div>
      </section>

      {/* JOURNAL PREVIEW (from PDF) */}
      <section id="journal" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Sleep Journal</h2>
        <p className="mt-2 opacity-90">A space for quiet thoughts, cozy rituals, and stories about better sleep.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {journalTeasers.map((title) => (
            <article key={title} className="rounded-3xl border border-rose-200/60 bg-white/80 dark:bg-slate-900/60 p-6 backdrop-blur hover:shadow-[0_20px_60px_-20px_rgba(236,72,153,.45)] transition">
              <h3 className="font-semibold text-lg">{title}</h3>
              <a href="#" className="mt-3 inline-block text-sm font-semibold underline decoration-fuchsia-400">Read More</a>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER (from PDF) */}
      <footer className="mt-6 border-t border-pink-200/60 bg-white/70 dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="font-semibold">Join the ZED Sleep Club</h4>
            <p className="mt-2 text-sm opacity-80">Drift off with us — tips, rituals, and early access.</p>
            <div className="mt-3 flex gap-2">
              <input className="px-4 py-2 rounded-xl border border-pink-200/70 bg-white/80 flex-1" placeholder="Email address" />
              <button
                className="px-4 py-2 rounded-xl text-white font-semibold"
                style={{ background: `linear-gradient(90deg, ${COLORS.deepPurple}, ${COLORS.softBlue})` }}
              >
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Follow</h4>
            <ul className="mt-3 space-y-2 text-sm opacity-80">
              <li>Instagram</li>
              <li>TikTok</li>
              <li>Pinterest</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Links</h4>
            <ul className="mt-3 space-y-2 text-sm opacity-80">
              <li>FAQ</li>
              <li>Shipping & Returns</li>
              <li>Wholesale</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs opacity-60 pb-6">© {new Date().getFullYear()} ZED. All rights reserved.</p>
      </footer>

      {/* cute scrollbar + general tweaks */}
      <style jsx global>{`
        *::-webkit-scrollbar { height: 10px; width: 10px; }
        *::-webkit-scrollbar-thumb { background: linear-gradient(45deg, ${COLORS.softBlue}, ${COLORS.deepPurple}); border-radius: 9999px; }
        *::-webkit-scrollbar-track { background: transparent; }
        .break-inside-avoid { break-inside: avoid; }
      `}</style>
    </main>
  );
}
