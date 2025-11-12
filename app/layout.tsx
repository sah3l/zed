// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
title: "ZED — Sleep, Revolutionized",
description: "Sleepwear made with natural and organic fibres — for nights that feel as good as they look.",
};


const COLORS = {
softBlue: "#8DE2ED",
deepPurple: "#582BAF",
olive: "#AABB90", // muted olive accent
};


function MarketingHeader() {
return (
<header className="sticky top-0 z-50 backdrop-blur border-b border-[#E9D5FF] bg-white/70">
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
<Link href="/" className="flex items-center gap-2">
<div
className="w-9 h-9 rounded-2xl grid place-items-center text-white font-extrabold"
style={{ background: `linear-gradient(135deg, ${COLORS.softBlue}, ${COLORS.deepPurple})` }}
title="Bunny peeks behind E (brand detail)"
>
Z
</div>
<span className="font-semibold tracking-tight">ZED</span>
</Link>
<div className="flex-1" />
<nav className="hidden md:flex items-center gap-5 text-sm">
<Link href="/" className="opacity-80 hover:opacity-100">Home</Link>
<Link href="/(marketing)/kits" className="opacity-80 hover:opacity-100">Sleep Kits</Link>
<Link href="/(marketing)/about" className="opacity-80 hover:opacity-100">About ZED</Link>
<Link href="/(marketing)/journal" className="opacity-80 hover:opacity-100">Sleep Journal</Link>
<Link href="/(marketing)/bunny" className="opacity-80 hover:opacity-100">Meet the Bunny</Link>
<Link href="/(marketing)/testimonials" className="opacity-80 hover:opacity-100">Testimonials</Link>
</nav>
<Link
href="/(marketing)/kits"
className="ml-3 px-3 py-2 rounded-2xl text-sm font-semibold border border-[#E9D5FF] hover:-translate-y-0.5 transition"
>
Explore Kits
</Link>
</div>
</header>
);
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<MarketingHeader />
{children}
</body>
</html>
);
}
