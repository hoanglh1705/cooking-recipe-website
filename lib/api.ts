const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

export type Ingredient = {
  position?: number;
  name: string;
  quantity?: number | null;
  unit?: string | null;
  note?: string | null;
};

export type Step = {
  position?: number;
  instruction: string;
  image_url?: string | null;
  duration_s?: number | null;
};

export type Video = {
  id: number;
  platform: "youtube" | "tiktok" | string;
  external_id: string;
  url: string;
  title?: string | null;
  channel?: string | null;
  duration_s?: number | null;
};

export type Recipe = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category?: string | null;
  keywords?: string[];
  prep_time_min?: number | null;
  cook_time_min?: number | null;
  total_time_min?: number | null;
  servings?: number | null;
  difficulty?: string | null;
  calories?: number | null;
  intro_md?: string | null;
  tips_md?: string | null;
  variations_md?: string | null;
  hero_image_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  published_at?: string;
  updated_at?: string;
  ingredients: Ingredient[];
  steps: Step[];
  videos?: Video[];
};

export type RecipeSummary = Pick<
  Recipe,
  "slug" | "title" | "description" | "hero_image_url" | "total_time_min" | "servings"
> & {
  tags?: string[];
};

export type Category = {
  slug: string;
  name: string;
  icon?: string | null;
  description?: string | null;
  recipe_count?: number | null;
};

async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 3600, ...(init?.next ?? {}) },
  });

  if (!res.ok) {
    throw new Error(`API ${res.status} ${res.statusText} on ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function listRecipeSlugs(): Promise<string[]> {
  return apiGet<string[]>("/api/recipes/slugs");
}

export async function listLatestRecipes(limit = 20): Promise<RecipeSummary[]> {
  return apiGet<RecipeSummary[]>(`/api/recipes?limit=${limit}`);
}

export async function getRecipeBySlug(slug: string): Promise<Recipe> {
  return apiGet<Recipe>(`/api/recipes/${encodeURIComponent(slug)}`);
}

export async function listCategories(): Promise<Category[]> {
  return apiGet<Category[]>("/api/categories");
}

export async function getCategory(slug: string): Promise<Category> {
  return apiGet<Category>(`/api/categories/${encodeURIComponent(slug)}`);
}

export async function listRecipesByCategory(
  slug: string,
  limit?: number
): Promise<RecipeSummary[]> {
  const qs = limit != null ? `?limit=${limit}` : "";
  return apiGet<RecipeSummary[]>(
    `/api/categories/${encodeURIComponent(slug)}/recipes${qs}`
  );
}

export async function searchRecipes(query: string): Promise<RecipeSummary[]> {
  return apiGet<RecipeSummary[]>(
    `/api/recipes/search?q=${encodeURIComponent(query)}`,
    { next: { revalidate: 0 } }
  );
}
