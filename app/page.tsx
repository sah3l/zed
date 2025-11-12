"use client";
import { useEffect, useMemo, useRef, useState } from "react";

// --- Types
interface Pin {
  id: string;
  title: string;
  tag: string;
  img: string;
  href?: string;
  saved?: boolean;
}

// --- Demo seeds (swap with real data later)
const demoSeeds = [
  "pink aesthetic", "lavender room", "cute desk", "pastel wallpaper",
  "girl fashion flatlay", "strawberry matcha", "nail art pink",
  "kawaii study", "rose bouquet", "macaron flatlay", "sunset cotton candy"
];

function makeDemoPin(i: number): Pin {
  const q = demoSeeds[i % demoSeeds.length].replace(/\s/g, "+");
  // Remote placeholder source — replace with your CDN/storage when ready
  const w = 600 + (i % 4) * 60;
  const h = 500 + (i % 5) * 70;
  const img = `https://source.unsplash.com/${w}x${h}/?${q}`;
  const tags = ["aesthetic", "study", "fashion", "food", "decor", "self-care"];
  return {
    id: `${Date.now()}-${i}`,
    title: demoSeeds[i % demoSeeds.length],
    tag: tags[i % tags.length],
    img,
    saved: false,
  };
}

export default function Home() {
  // --- State
  const [pins, setPins] = useState<Pin[]>(() => Array.from({ length: 18 }, (_, i) => makeDemoPin(i)));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTag, setActiveTag] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"blush" | "barbie" | "lilac">("blush");
  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState<{ title: string; tag: string; img: string; href: string }>({ title: "", tag: "aesthetic", img: "", href: "" });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // --- Persist saved pins in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("zed:savedPins");
    if (saved) {
      const ids = new Set(JSON.parse(saved) as string[]);
      setPins((prev) => prev.map((p) => ({ ...p, saved: ids.has(p.id) })));
    }
  }, []);

  useEffect(() => {
    const ids = pins.filter((p) => p.saved).map((p) => p.id);
    localStorage.setItem("zed:savedPins", JSON.stringify(ids));
  }, [pins]);

  // --- Infinite scroll
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        setTimeout(() => {
          setPins((prev) => prev.concat(Array.from({ length: 12 }, (_, i) => makeDemoPin(page * 100 + i))));
          setPage((p) => p + 1);
          setLoading(false);
        }, 350);
      }
    }, { rootMargin: "800px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [page, loading]);

  const tags = useMemo(() => ["all", "aesthetic", "study", "fashion", "food", "decor", "self-care", "saved"], []);

  const filtered = useMemo(() => {
    let base = pins;
    if (activeTag === "saved") base = pins.filter((p) => p.saved);
    else if (activeTag !== "all") base = pins.filter((p) => p.tag === activeTag);
    if (!query.trim()) return base;
    const q = query.toLowerCase();
    return base.filter((p) => p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q));
  }, [pins, activeTag, query]);

  // --- Actions
  function toggleSave(id: string) {
    setPins((prev) => prev.map((p) => p.id === id ? { ...p, saved: !p.saved } : p));
  }

  function createPin() {
    if (!draft.img || !draft.title) return;
    const pin: Pin = {
      id: `u-${Date.now()}`,
      title: draft.title,
      tag: draft.tag || "aesthetic",
      img: draft.img,
      href: draft.href || undefined,
      saved: true,
    };
    setPins((prev) => [pin, ...prev]);
    setShowModal(false);
    setDraft({ title: "", tag: "aesthetic", img: "", href: "" });
  }

  // --- Theme presets (soft, girly palettes)
  const themeVars = {
    blush: {
      from: "from-pink-50", via: "via-rose-50", to: "to-fuchsia-50",
      ring: "border-rose-200/60 dark:border-fuchsia-800/30",
      grad: "from-rose-500 to-fuchsia-500",
      shadow: "shadow-[0_2px_40px_-12px_rgba(244,114,182,.35)] hover:shadow-[0_10px_60px_-10px_rgba(244,114,182,.5)]",
    },
    barbie: {
      from: "from-fuchsia-50", via: "via-pink-50", to: "to-rose-50",
      ring: "border-fuchsia-300/60 dark:border-pink-800/30",
      grad: "from-fuchsia-600 to-pink-500",
      shadow: "shadow-[0_2px_40px_-12px_rgba(217,70,239,.35)] hover:shadow-[0_10px_60px_-10px_rgba(219,39,119,.5)]",
    },
    lilac: {
      from: "from-violet-50", via: "via-fuchsia-50", to: "to-pink-50",
      ring: "border-violet-300/60 dark:border-fuchsia-800/30",
      grad: "from-violet-500 to-fuchsia-500",
      shadow: "shadow-[0_2px_40px_-12px_rgba(139,92,246,.35)] hover:shadow-[0_10px_60px_-10px_rgba(168,85,247,.5)]",
    },
  }[theme];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${themeVars.from} ${themeVars.via} ${themeVars.to} dark:from-slate-950 dark:via-fuchsia-950/20 dark:to-slate-950 text-slate-800 dark:text-slate-100 selection:bg-pink-200/60 selection:text-fuchsia-900`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${themeVars.ring} bg-white/70 dark:bg-slate-900/60 backdrop-blur`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-2xl grid place-items-center bg-gradient-to-br ${themeVars.grad} text-white font-extrabold`}>Z</div>
            <span className="font-semibold tracking-tight">Zed</span>
          </div>
          <div className="flex-1" />
          <div className="relative hidden md:block w-full max-w-sm">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cute ideas…"
              className={`w-full px-4 py-2.5 pl-10 rounded-2xl border ${themeVars.ring} bg-white/70 dark:bg-slate-900/60 outline-none`}
            />
            <span className="absolute left-3 top-2.5 text-sm opacity-60">🔎</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <select value={theme} onChange={(e) => setTheme(e.target.value as any)} className={`px-3 py-2 rounded-2xl text-sm border ${themeVars.ring} bg-white/70 dark:bg-slate-900/60`}>
              <option value="blush">Blush</option>
              <option value="barbie">Barbiecore</option>
              <option value="lilac">Lilac Dream</option>
            </select>
            <button className={`ml-1 px-3 py-2 rounded-2xl text-sm font-semibold border ${themeVars.ring} hover:-translate-y-0.5 transition`} onClick={() => setShowModal(true)}>
              ＋ Create
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 flex gap-2 overflow-auto">
          {["all", "aesthetic", "study", "fashion", "food", "decor", "self-care", "saved"].map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              className={`px-3 py-1.5 rounded-2xl text-sm border transition whitespace-nowrap ${activeTag===t ? `bg-gradient-to-r ${themeVars.grad} text-white border-transparent` : `${themeVars.ring} bg-white/70 dark:bg-slate-900/60`}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {filtered.map((pin) => (
            <article key={pin.id} className={`mb-4 break-inside-avoid rounded-3xl overflow-hidden bg-white/90 dark:bg-slate-900/60 border ${themeVars.ring} ${themeVars.shadow} transition`}>
              <a href={pin.href ?? "#"} target="_blank" rel="noreferrer" className="group block">
                <div className="relative">
                  <img src={pin.img} alt={pin.title} loading="lazy" className="w-full h-auto object-cover group-hover:scale-[1.02] transition" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <button onClick={(e) => { e.preventDefault(); toggleSave(pin.id); }} className={`absolute top-3 right-3 px-3 py-1.5 rounded-2xl text-xs font-semibold ${pin.saved ? "bg-fuchsia-600 text-white" : "bg-white/90 text-fuchsia-700"} shadow hover:scale-105 transition`}>{pin.saved ? "Saved" : "Save"}</button>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold leading-snug">{pin.title}</h3>
                  <div className="mt-1 text-xs opacity-60">#{pin.tag}</div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* Loader / sentinel */}
        <div ref={loadMoreRef} className="flex items-center justify-center py-8">
          {loading && <div className="text-sm opacity-70 animate-pulse">Loading more inspo… ✨</div>}
        </div>
      </section>

      {/* Create Pin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Create a new Pin</h3>
            <div className="mt-4 grid gap-3">
              <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Title" className="px-4 py-2.5 rounded-xl border" />
              <select value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} className="px-4 py-2.5 rounded-xl border">
                <option>aesthetic</option>
                <option>study</option>
                <option>fashion</option>
                <option>food</option>
                <option>decor</option>
                <option>self-care</option>
              </select>
              <input value={draft.img} onChange={(e) => setDraft({ ...draft, img: e.target.value })} placeholder="Image URL" className="px-4 py-2.5 rounded-xl border" />
              <input value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} placeholder="Optional link" className="px-4 py-2.5 rounded-xl border" />
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-2xl border">Cancel</button>
              <button onClick={createPin} className={`px-4 py-2 rounded-2xl text-white bg-gradient-to-r ${themeVars.grad}`}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating action for small screens */}
      <button onClick={() => setShowModal(true)} className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 px-4 py-3 rounded-full font-semibold shadow-xl bg-gradient-to-r ${themeVars.grad} text-white hover:scale-105 active:scale-95 transition`}>
        ＋ Create Pin
      </button>

      {/* Global tweaks */}
      <style jsx global>{`
        *::-webkit-scrollbar { height: 10px; width: 10px; }
        *::-webkit-scrollbar-thumb { background: linear-gradient(45deg, #fb7185, #d946ef); border-radius: 9999px; }
        *::-webkit-scrollbar-track { background: transparent; }
        .break-inside-avoid { break-inside: avoid; }
      `}</style>
    </main>
  );
}
