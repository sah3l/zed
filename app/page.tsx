"use client";
<h4 className="font-semibold">Follow</h4>
<ul className="mt-3 space-y-2 text-sm opacity-90">
<li>Instagram</li>
<li>TikTok</li>
<li>Pinterest</li>
</ul>
</div>
<div>
<h4 className="font-semibold">Links</h4>
<ul className="mt-3 space-y-2 text-sm opacity-90">
<li>FAQ</li>
<li>Shipping & Returns</li>
<li>Wholesale</li>
<li>Privacy</li>
</ul>
</div>
</div>
<p className="text-center text-xs opacity-80 pb-6">© {new Date().getFullYear()} ZED. All rights reserved.</p>
</footer>


{/* cute scrollbar */}
<style jsx global>{`
*::-webkit-scrollbar { height: 10px; width: 10px; }
*::-webkit-scrollbar-thumb { background: linear-gradient(45deg, ${COLORS.softBlue}, ${COLORS.deepPurple}); border-radius: 9999px; }
*::-webkit-scrollbar-track { background: transparent; }
.break-inside-avoid { break-inside: avoid; }
`}</style>
</main>
);
}
