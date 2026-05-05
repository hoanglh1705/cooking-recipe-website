import type { Recipe } from "@/lib/api";

function toIso8601Duration(minutes?: number | null): string | undefined {
  if (minutes == null || minutes <= 0) return undefined;
  return `PT${minutes}M`;
}

type Props = {
  recipe: Recipe;
  url: string;
};

export function RecipeJsonLd({ recipe, url }: Props) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    image: recipe.hero_image_url ? [recipe.hero_image_url] : undefined,
    datePublished: recipe.published_at,
    dateModified: recipe.updated_at,
    prepTime: toIso8601Duration(recipe.prep_time_min),
    cookTime: toIso8601Duration(recipe.cook_time_min),
    totalTime: toIso8601Duration(recipe.total_time_min),
    recipeYield: recipe.servings ? `${recipe.servings} người` : undefined,
    recipeCategory: recipe.category,
    recipeCuisine: "Vietnamese",
    keywords: recipe.keywords?.join(", "),
    recipeIngredient: recipe.ingredients.map((i) =>
      [i.quantity, i.unit, i.name].filter(Boolean).join(" ")
    ),
    recipeInstructions: recipe.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text: s.instruction,
      image: s.image_url,
    })),
    nutrition: recipe.calories
      ? {
          "@type": "NutritionInformation",
          calories: `${recipe.calories} kcal`,
        }
      : undefined,
    video: recipe.videos?.[0]
      ? {
          "@type": "VideoObject",
          name: recipe.videos[0].title ?? recipe.title,
          description: recipe.description,
          contentUrl: recipe.videos[0].url,
          embedUrl:
            recipe.videos[0].platform === "youtube"
              ? `https://www.youtube.com/embed/${recipe.videos[0].external_id}`
              : recipe.videos[0].url,
        }
      : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
