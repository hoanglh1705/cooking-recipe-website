import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  listRecipesByCategory,
  listCategories,
  getCategory,
} from "@/lib/api";
import { RecipeCard } from "@/components/RecipeCard";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monngonmoingay.vn";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const categories = await listCategories().catch(() => []);
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug).catch(() => null);
  const name = category?.name ?? slug;
  return {
    title: `Danh mục: ${name}`,
    description:
      category?.description ?? `Tổng hợp các công thức trong danh mục ${name}.`,
    alternates: { canonical: `${SITE_URL}/danh-muc/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const [category, recipes] = await Promise.all([
    getCategory(slug).catch(() => null),
    listRecipesByCategory(slug).catch(() => null),
  ]);

  if (!category && recipes === null) notFound();

  const name = category?.name ?? slug;

  return (
    <div className="max-w-6xl mx-auto px-6 py-xl">
      <header className="mb-lg">
        <h1 className="font-h1 text-h1 italic text-ink">{name}</h1>
        {category?.description && (
          <p className="mt-sm text-mute font-body">{category.description}</p>
        )}
      </header>

      {!recipes || recipes.length === 0 ? (
        <p className="text-mute italic">Chưa có công thức nào trong danh mục này.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {recipes.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
