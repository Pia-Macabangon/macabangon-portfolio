# Manish Kumar — Editorial Canvas Portfolio

A bespoke developer portfolio combining:
1. **Interactive Canvas & Sketchbook Architecture** from [Yuezhiui/canvas-design](https://github.com/Yuezhiui/canvas-design.git)
2. **Deep Content & Project Inventory** from [Yuezhiui/portofolio-1](https://github.com/Yuezhiui/portofolio-1)
3. **Luxury Editorial Typography & Color Palette** faithfully copied from [Apex & Asphalt Preview](https://175d351f-e563-4b34-ab9a-3783acffcc60.app-preview.com/)

---

## 🎨 Visual Identity & Color System

- **Parchment Paper Background**: `hsl(42, 28%, 93%)` (`#F5F2EB`)
- **Deep Charcoal Ink**: `hsl(240, 7%, 6%)` (`#0F0F11`)
- **Warm Bone Card & Plate Surface**: `hsl(42, 30%, 87%)` (`#EBE6DC`)
- **Muted Ash Editorial Grey**: `hsl(36, 7%, 33%)` (`#5A5752`)
- **Luxury Oxblood Highlight**: `hsl(0, 59%, 30%)` (`#7A1F1F`)
- **Hairline Border Rules**: `hsl(36, 14%, 78%)` (`#CFC8BC`)
- **Micro-Texture Paper Grain**: SVG fractal noise filter with multiply blend mode

### Typography Stack
- **Headings & Display**: `Fraunces` (weights 300..700) with signature `.display-italic` accents
- **Body & Clean UI**: `Inter Tight` (weights 300..700)
- **Monospace Metadata & Code**: `JetBrains Mono`

---

## 📐 Features & Interactive Mechanics

- **Interactive Canvas Ink Trail**: Physics-based organic ink stroke trail that follows the cursor, fading smoothly with toggle control in the footer (`Ink trail on / off`).
- **Interactive Sketch Drawing Pad**: Full HTML5 canvas sketchpad on the Studio page (`about.html`) allowing visitors to sketch diagrams or signatures, clear the canvas, and export as PNG.
- **Avatar / QR-Code Flip Toggle**: Seamless toggle on the hero plate between Manish's portrait avatar (`pfp-latest.jpg`) and mobile QR code (`qr-code.webp`).
- **Project Case Study Lightbox**: Native `<dialog class="art-dialog">` modal allowing visitors to inspect project screenshots, live metrics, tech tags, and direct demo/GitHub links.
- **Live India Clock (IST)**: Real-time clock in the top running issue bar tracking Indian Standard Time.
- **Daily Pulse / Mood Decoration**: Dynamically displays one of the 7 mood badges based on the day of the week.
- **Complete Project Folio**:
  1. **Ossium** (`ossium.in` — Next.js, TypeScript, PostgreSQL, Drizzle, Tailwind, 1,200+ users)
  2. **MX-Icons** (React SVG icon library — 4k+ downloads, 110+ stars)
  3. **Secure2FA** (Java Spring Boot, Spring Security, React — TOTP RFC 6238)
  4. **BristoHQ-Ui** (Accessible component primitives — React, TypeScript, CSS)
  5. **BlogZone** (MERN content publication suite)
  6. **Portfolio Edition II** (Tailwind responsive grid)
  7. **QuickRef UI Clone** (Productivity cheatsheet)
  8. **BlogZone-v1** (Java MVC Spring Boot edition with Thymeleaf)

---

## 🚀 Running the Project

You can open `index.html` directly in any web browser, or serve it using any local static file server:

```powershell
# Using Python
python -m http.server 3000

# Using Node / npx
npx serve .
```
Then visit `http://localhost:3000`.
