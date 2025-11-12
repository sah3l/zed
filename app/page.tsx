# 1) Clone & branch
git clone https://github.com/sah3l/zed
cd zed
git checkout -b feature/pinterest-ui

# 2) Unzip the new page into your repo root (it will create /app/page.tsx)
unzip ~/Downloads/zed_pinterest_ui.zip -d .
# (If you're on Windows, just drag `app/page.tsx` into the repo folder, replacing the file.)

# 3) Install & test locally
npm install
npm run dev

# 4) Commit & push
git add app/page.tsx
git commit -m "feat(ui): Pinterest-style home with themes, save, search, modal, infinite scroll"
git push -u origin feature/pinterest-ui

# 5) (Optional) Open a PR with GitHub CLI
# gh pr create --fill --title "Pinterest-style UI" --body "Girly masonry feed, themes, save, search, modal, infinite scroll."
