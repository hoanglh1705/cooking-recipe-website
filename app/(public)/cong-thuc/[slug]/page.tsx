import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getRecipeBySlug, listRecipeSlugs } from "@/lib/api";
import { RecipeJsonLd } from "@/components/RecipeJsonLd";
import { VideoEmbed } from "@/components/VideoEmbed";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monngonmoingay.vn";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await listRecipeSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug).catch(() => null);
  if (!recipe) return {};

  const url = `${SITE_URL}/cong-thuc/${recipe.slug}`;

  return {
    title: recipe.seo_title ?? recipe.title,
    description: recipe.seo_description ?? recipe.description,
    alternates: { canonical: url },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      type: "article",
      url,
      images: recipe.hero_image_url ? [{ url: recipe.hero_image_url }] : [],
      publishedTime: recipe.published_at,
      modifiedTime: recipe.updated_at,
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug).catch(() => null);
  if (!recipe) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <RecipeJsonLd recipe={recipe} url={`${SITE_URL}/cong-thuc/${recipe.slug}`} />

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{recipe.title}</h1>

        <p className="text-lg text-neutral-700 mb-4">{recipe.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
          {recipe.prep_time_min != null && (
            <span>Chuẩn bị: {recipe.prep_time_min} phút</span>
          )}
          {recipe.cook_time_min != null && (
            <span>Nấu: {recipe.cook_time_min} phút</span>
          )}
          {recipe.servings != null && <span>Khẩu phần: {recipe.servings} người</span>}
          {recipe.difficulty && <span>Độ khó: {recipe.difficulty}</span>}
        </div>
      </header>

      {recipe.hero_image_url && (
        <div className="relative aspect-video mb-8 rounded-xl overflow-hidden bg-neutral-100">
          <Image
            src={recipe.hero_image_url}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="object-cover"
          />
        </div>
      )}

      {recipe.intro_md && (
        <section className="prose mb-8 max-w-none">
          <h2 className="text-xl font-semibold mb-2">Giới thiệu</h2>
          <p className="whitespace-pre-line">{recipe.intro_md}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Nguyên liệu</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-brand-600">•</span>
              <span>
                {ing.quantity != null && <strong>{ing.quantity} </strong>}
                {ing.unit && <span>{ing.unit} </span>}
                {ing.name}
                {ing.note && <em className="text-neutral-600"> ({ing.note})</em>}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Cách làm</h2>
        <ol className="space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold">
                {i + 1}
              </span>
              <div className="flex-1">
                <p>{step.instruction}</p>
                {step.duration_s != null && (
                  <p className="text-sm text-neutral-500 mt-1">
                    ⏱ {Math.round(step.duration_s / 60)} phút
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {recipe.tips_md && (
        <section className="mb-8 p-4 bg-orange-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Mẹo nhỏ</h2>
          <p className="whitespace-pre-line">{recipe.tips_md}</p>
        </section>
      )}

      {recipe.variations_md && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Biến tấu</h2>
          <p className="whitespace-pre-line">{recipe.variations_md}</p>
        </section>
      )}

      {recipe.videos && recipe.videos.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Video tham khảo</h2>
          <div className="space-y-4">
            {recipe.videos.map((v) => (
              <div key={v.id}>
                <VideoEmbed
                  platform={v.platform}
                  externalId={v.external_id}
                  title={v.title}
                />
                {v.channel && (
                  <p className="text-sm text-neutral-600 mt-1">
                    Nguồn: {v.channel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
