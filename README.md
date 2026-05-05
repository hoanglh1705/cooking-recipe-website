# cooking-recipe-website

Frontend Next.js 14+ (App Router) cho dự án **Món Ngon Mỗi Ngày** — render công thức nấu ăn dạng SSG/ISR với JSON-LD `Recipe` để tối ưu SEO + Google AI Overviews.

Tham khảo `architech.md` mục **2.1. Frontend — Next.js 14+ (App Router)**.

## Tech stack

- **Next.js 14+** App Router (TypeScript)
- **Tailwind CSS** cho styling
- **next/image** cho Image Optimization (LCP)
- **JSON-LD schema.org/Recipe** + sitemap + robots động

## Cấu trúc

```
.
├── app/
│   ├── (public)/
│   │   ├── page.tsx                         # Trang chủ
│   │   ├── cong-thuc/[slug]/page.tsx        # Trang công thức (ISR 86400s)
│   │   ├── danh-muc/[category]/page.tsx     # Trang danh mục
│   │   └── tim-kiem/page.tsx                # Tìm kiếm (dynamic)
│   ├── api/revalidate/route.ts              # Webhook ISR cho pipeline
│   ├── sitemap.ts                           # Sitemap động
│   ├── robots.ts                            # robots.txt động
│   ├── layout.tsx                           # Root layout
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── RecipeJsonLd.tsx                     # JSON-LD schema.org/Recipe
│   ├── RecipeCard.tsx
│   └── VideoEmbed.tsx                       # Lazy iframe YouTube/TikTok
└── lib/
    └── api.ts                               # Client gọi Go backend
```

## Phát triển

```bash
cp .env.example .env.local
npm install
npm run dev
```

Mặc định chạy ở `http://localhost:3000` và gọi backend Go ở `NEXT_PUBLIC_API_BASE`.

## Build production

```bash
npm run build
npm start
```

## ISR Revalidate

Khi pipeline publish/update công thức, gọi:

```bash
curl -X POST "https://<host>/api/revalidate?path=/cong-thuc/<slug>" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET"
```

## SEO checklist

- [x] JSON-LD `Recipe` đầy đủ (`recipeIngredient`, `HowToStep`, `VideoObject`, ISO 8601 duration)
- [x] OpenGraph + Twitter Card
- [x] Canonical URL chuẩn
- [x] Sitemap chia nhóm (recipes + categories)
- [x] robots.txt cho phép Google/Bing
- [x] `next/image` cho LCP
- [x] Lazy embed video (không host)
- [ ] FAQ schema (cần dữ liệu từ backend)
- [ ] Author profile (`Person` schema) — bổ sung khi có author
# cooking-recipe-website
