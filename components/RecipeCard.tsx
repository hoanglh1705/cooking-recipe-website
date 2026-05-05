import Image from "next/image";
import type { RecipeSummary } from "@/lib/api";
import { Icon } from "@/components/Icon";

type Props = {
  recipe: RecipeSummary;
  priority?: boolean;
};

const TAG_PALETTES = [
  "bg-sage-soft text-secondary",
  "bg-terra-soft text-terra",
];

function tagClass(index: number) {
  return TAG_PALETTES[index % TAG_PALETTES.length];
}

export function RecipeCard({ recipe, priority }: Props) {
  return (
    <a
      href={`/cong-thuc/${recipe.slug}`}
      className="bg-paper border border-line overflow-hidden rounded-sm group block"
    >
      <div className="aspect-[4/3] overflow-hidden bg-bg-subtle relative">
        {recipe.hero_image_url ? (
          <Image
            src={recipe.hero_image_url}
            alt={recipe.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-terra/40 text-5xl">
            🍲
          </div>
        )}
      </div>
      <div className="p-md">
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {recipe.tags.slice(0, 2).map((t, i) => (
              <span
                key={t}
                className={`${tagClass(i)} text-[10px] px-2 py-0.5 font-bold rounded-full uppercase`}
              >
                #{t}
              </span>
            ))}
          </div>
        )}
        <h3 className="font-h2 text-xl mb-2 text-ink">{recipe.title}</h3>
        {recipe.description && (
          <p className="text-mute text-sm line-clamp-2 mb-4 font-body">
            {recipe.description}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-mute pt-4 border-t border-line">
          <div className="flex items-center gap-1">
            <Icon name="schedule" className="!text-sm" />
            {recipe.total_time_min != null ? `${recipe.total_time_min} phút` : "—"}
          </div>
          <div className="flex items-center gap-1">
            <Icon name="group" className="!text-sm" />
            {recipe.servings != null ? `${recipe.servings} người` : "—"}
          </div>
        </div>
      </div>
    </a>
  );
}
