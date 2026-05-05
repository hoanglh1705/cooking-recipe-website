import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Icon } from "@/components/Icon";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monngonmoingay.vn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Món Ngon Mỗi Ngày — Công thức nấu ăn Việt",
    template: "%s | Món Ngon Mỗi Ngày",
  },
  description:
    "Tổng hợp công thức nấu ăn Việt Nam chi tiết, có video minh hoạ, mẹo và biến tấu cho từng món.",
  keywords: ["công thức nấu ăn", "món ngon", "ẩm thực Việt", "cách nấu"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Món Ngon Mỗi Ngày",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${fraunces.variable} light`}
    >
      <body className="bg-cream font-body text-ink antialiased min-h-screen flex flex-col">
        <header className="bg-cream text-terra sticky top-0 z-50 border-b border-line flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Mở menu"
              className="hover:bg-line/30 transition-all duration-300 active:scale-95 p-2"
            >
              <Icon name="menu" />
            </button>
            <a
              href="/"
              className="text-2xl font-serif italic text-terra tracking-tight"
            >
              Món Ngon Mỗi Ngày
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/tim-kiem"
              aria-label="Tìm kiếm"
              className="hover:bg-line/30 transition-all duration-300 active:scale-95 p-2"
            >
              <Icon name="search" />
            </a>
          </div>
        </header>

        <main className="flex-1 pb-24 md:pb-0">{children}</main>

        <footer className="bg-paper border-t border-line px-6 py-xl pb-32 md:pb-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-xl max-w-6xl mx-auto">
            <div className="md:col-span-2">
              <h4 className="font-serif italic text-2xl text-terra mb-md">
                món ngon mỗi ngày .
              </h4>
              <p className="text-mute text-sm max-w-xs">
                Thư viện công thức nấu ăn được tuyển chọn, hướng dẫn chi tiết
                qua video và hình ảnh chân thực nhất.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest mb-md">
                Liên kết
              </h5>
              <ul className="space-y-sm text-sm text-mute">
                <li>
                  <a className="hover:text-terra transition-colors" href="/ve-chung-toi">
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a className="hover:text-terra transition-colors" href="/">
                    Công thức mới
                  </a>
                </li>
                <li>
                  <a className="hover:text-terra transition-colors" href="/ban-quyen">
                    Bản quyền
                  </a>
                </li>
                <li>
                  <a className="hover:text-terra transition-colors" href="/dmca">
                    DMCA
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest mb-md">
                Kết nối
              </h5>
              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Chia sẻ"
                  className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-mute hover:text-terra hover:border-terra transition-all"
                >
                  <Icon name="share" className="!text-sm" />
                </a>
                <a
                  href="#"
                  aria-label="Email"
                  className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-mute hover:text-terra hover:border-terra transition-all"
                >
                  <Icon name="mail" className="!text-sm" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-xl pt-md border-t border-line text-center max-w-6xl mx-auto">
            <p className="text-[10px] text-mute uppercase tracking-widest">
              © {new Date().getFullYear()} Món Ngon Mỗi Ngày — Bản quyền thuộc về Editorial Minimalist
            </p>
          </div>
        </footer>

        <nav
          aria-label="Điều hướng chính"
          className="bg-white/90 backdrop-blur-md font-sans text-[11px] font-medium tracking-wide uppercase fixed bottom-0 w-full z-50 rounded-t-xl border-t border-line shadow-[0_-4px_20px_rgba(0,0,0,0.03)] flex justify-around items-center pt-3 pb-safe-offset-2 px-4 h-20 md:hidden"
        >
          <a
            href="/"
            className="flex flex-col items-center justify-center text-terra bg-terra/5 rounded-full px-4 py-1 active:scale-90 transition-transform"
          >
            <Icon name="home" filled className="mb-0.5" />
            <span>Home</span>
          </a>
          <a
            href="/danh-muc/mon-chinh"
            className="flex flex-col items-center justify-center text-stone-400 hover:text-terra transition-colors active:scale-90"
          >
            <Icon name="explore" className="mb-0.5" />
            <span>Explore</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center justify-center text-stone-400 hover:text-terra transition-colors active:scale-90"
          >
            <Icon name="bookmark" className="mb-0.5" />
            <span>Saved</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center justify-center text-stone-400 hover:text-terra transition-colors active:scale-90"
          >
            <Icon name="person" className="mb-0.5" />
            <span>Profile</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
