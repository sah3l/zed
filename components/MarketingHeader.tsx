import Link from "next/link";

export default function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-200/60 dark:border-fuchsia-800/30 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl grid place-items-center bg-gradient-to-br from-rose-500 to-fuchsia-500 text-white font-extrabold">Z</div>
          <span className="font-semibold tracking-tight">Zed</span>
        </Link>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link href="/(marketing)/about" className="opacity-80 hover:opacity-100">About</Link>
          <Link href="/(marketing)/kits" className="opacity-80 hover:opacity-100">Sleep Kits</Link>
          <Link href="/(marketing)/journal" className="opacity-80 hover:opacity-100">Sleep Journal</Link>
          <Link href="/(marketing)/bunny" className="opacity-80 hover:opacity-100">Meet the Bunny</Link>
          <Link href="/(marketing)/testimonials" className="opacity-80 hover:opacity-100">Testimonials</Link>
        </nav>
      </div>
    </header>
  );
}
