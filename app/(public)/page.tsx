import Image from "next/image";
import { listLatestRecipes, listCategories, type Category } from "@/lib/api";
import { DEMO_RECIPES, DEMO_CATEGORIES } from "@/lib/demo-data";
import { RecipeCard } from "@/components/RecipeCard";
import { Icon } from "@/components/Icon";

export const revalidate = 3600;

const CATEGORY_ICON_FALLBACK: Record<string, string> = {
  "bua-sang": "sunny",
  com: "rice_bowl",
  canh: "soup_kitchen",
  nuong: "outdoor_grill",
  chay: "eco",
  "trang-mieng": "cake",
  "mon-chinh": "restaurant",
  "an-vat": "lunch_dining",
};

function resolveIcon(c: Category): string {
  return c.icon || CATEGORY_ICON_FALLBACK[c.slug] || "restaurant_menu";
}

export default async function HomePage() {
  const [recipesFromApi, categoriesFromApi] = await Promise.all([
    listLatestRecipes(12).catch(() => []),
    listCategories().catch((err) => {
      console.warn("[home] listCategories failed:", err);
      return [] as Category[];
    }),
  ]);

  const recipes = recipesFromApi.length > 0 ? recipesFromApi : DEMO_RECIPES;
  const categories =
    categoriesFromApi.length > 0 ? categoriesFromApi : DEMO_CATEGORIES;

  const totalRecipes = recipes.length;
  const latest = recipes.slice(0, 6);
  const hot = recipes.slice(3, 5);

  return (
    <>
      <section className="px-6 py-xl md:py-3xl flex flex-col items-center text-center max-w-4xl mx-auto">
        <span className="font-mono text-terra uppercase tracking-widest text-xs mb-sm">
          Nền tảng ẩm thực Việt
        </span>
        <h1 className="font-h1 text-h1 mb-md italic text-ink">
          Công thức thật, từ video thật
        </h1>
        <form
          action="/tim-kiem"
          method="get"
          className="w-full max-w-2xl mt-md relative"
        >
          <input
            type="search"
            name="q"
            placeholder="Bạn muốn nấu món gì hôm nay?"
            className="w-full py-4 px-6 bg-paper border border-line rounded-lg shadow-sm focus:ring-1 focus:ring-terra focus:border-terra outline-none transition-all font-body text-body"
          />
          <button
            type="submit"
            aria-label="Tìm kiếm"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-terra hover:bg-terra-hover text-white p-2 rounded-lg transition-colors"
          >
            <Icon name="search" />
          </button>
        </form>
        <p className="mt-sm text-mute font-body text-sm italic">
          Đang có{" "}
          <span className="text-ink font-bold">{totalRecipes} món</span> · cập
          nhật mỗi ngày
        </p>
      </section>

      <section className="mb-xl overflow-hidden">
        <div className="flex gap-md overflow-x-auto hide-scrollbar px-6 pb-2 max-w-6xl mx-auto">
          {categories.map((c) => (
            <a
              key={c.slug}
              href={`/danh-muc/${c.slug}`}
              className="flex flex-col items-center gap-2 min-w-fit group"
            >
              <div className="w-16 h-16 rounded-full bg-paper border border-line flex items-center justify-center group-hover:bg-terra-soft transition-colors">
                <Icon name={resolveIcon(c)} className="text-terra" />
              </div>
              <span className="text-xs font-medium uppercase tracking-wide">
                {c.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 mb-xl max-w-6xl mx-auto">
        <div className="flex justify-between items-baseline mb-md">
          <h2 className="font-h2 text-h2 italic text-ink">Món Mới Nhất</h2>
          <a
            href="/danh-muc/mon-chinh"
            className="text-terra text-sm font-semibold hover:underline"
          >
            Xem tất cả
          </a>
        </div>
        {latest.length === 0 ? (
          <p className="text-mute italic">Chưa có công thức nào được công bố.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {latest.map((r, idx) => (
              <RecipeCard key={r.slug} recipe={r} priority={idx < 3} />
            ))}
          </div>
        )}
      </section>

      {hot.length > 0 && (
        <section className="bg-paper py-xl">
          <div className="px-6 flex justify-between items-baseline mb-md max-w-6xl mx-auto">
            <h2 className="font-h2 text-h2 italic text-ink">Món Hot Tuần Này</h2>
          </div>
          <div className="flex gap-md overflow-x-auto hide-scrollbar px-6 max-w-6xl mx-auto">
            {hot.map((r, i) => (
              <a
                key={r.slug}
                href={`/cong-thuc/${r.slug}`}
                className="min-w-[280px] md:min-w-[400px] relative overflow-hidden rounded-xl aspect-video group shadow-sm bg-bg-subtle"
              >
                {r.hero_image_url && (
                  <Image
                    src={r.hero_image_url}
                    alt={r.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1">
                    {i === 0 ? "Xu hướng" : "Yêu thích"}
                  </span>
                  <h3 className="text-white text-xl font-h2 italic">{r.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 py-2xl max-w-4xl mx-auto text-center">
        <div className="mb-sm flex justify-center">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-terra bg-bg-subtle flex items-center justify-center">
            <Icon name="restaurant" className="text-terra !text-3xl" />
          </div>
        </div>
        <h2 className="font-h2 text-2xl mb-sm italic text-ink">
          “Nấu ăn là nghệ thuật sẻ chia”
        </h2>
        <p className="text-mute font-body italic max-w-2xl mx-auto">
          Món Ngon Mỗi Ngày ra đời với mong muốn mang lại niềm cảm hứng vào bếp
          cho mọi gia đình Việt. Chúng tôi tin rằng mỗi món ăn đều chứa đựng một
          câu chuyện và sự chân thành từ người nấu.
        </p>
      </section>
    </>
  );
}
