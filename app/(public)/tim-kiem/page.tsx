import type { Metadata } from "next";
import { searchRecipes } from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tìm kiếm công thức",
  description: "Tìm công thức nấu ăn theo tên món, nguyên liệu hoặc danh mục.",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? await searchRecipes(query).catch(() => []) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tìm kiếm công thức</h1>

      <form action="/tim-kiem" method="get" className="mb-8">
        <div className="flex gap-2 max-w-xl">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Ví dụ: phở bò, gà kho..."
            className="flex-1 px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
          >
            Tìm
          </button>
        </div>
      </form>

      {query && (
        <p className="mb-4 text-neutral-700">
          Kết quả cho <strong>"{query}"</strong>: {results.length} công thức
        </p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
