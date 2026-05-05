import type { Category, RecipeSummary } from "./api";

export const DEMO_CATEGORIES: Category[] = [
  { slug: "bua-sang", name: "Bữa sáng", icon: "sunny" },
  { slug: "com", name: "Cơm", icon: "rice_bowl" },
  { slug: "canh", name: "Canh", icon: "soup_kitchen" },
  { slug: "nuong", name: "Nướng", icon: "outdoor_grill" },
  { slug: "chay", name: "Chay", icon: "eco" },
  { slug: "trang-mieng", name: "Tráng miệng", icon: "cake" },
];

export const DEMO_RECIPES: RecipeSummary[] = [
  {
    slug: "pho-bo-nam-bo",
    title: "Phở Bò Nam Bộ",
    description:
      "Món trộn thanh mát với nước mắm chua ngọt, thịt bò xào sả thơm lừng và các loại rau sống tươi ngon.",
    hero_image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDv8KJ3FDua5A0rbY1DNOc6Vske4HMgEwWBHBsPKc4G63xopGfKbQmqWK0S3jSw2gdTnLWhPgmQ4Yv327gOVzESMm2dlDONr8F7wl6D3MEAe1qpjKI84NPCoz9XlS4IZNZ05tbZeKeJP8JRcL9vIjZ-BctXDuFhHQ-ovgUJC5sOLnO_NSpugSNyw-PVMwqgEqszaStYAzD-wvstdEtvLkswsbGBGT_9tc1u4sFl-RC75iljG4FAWlQ_5JFdcvj5kP9eWaSER7FmTYdn",
    total_time_min: 30,
    servings: 2,
    tags: ["mon-viet", "healthy"],
  },
  {
    slug: "ga-kho-sa-ot",
    title: "Gà Kho Sả Ớt",
    description:
      "Thịt gà dai ngọt thấm vị cay nồng của ớt và hương thơm đặc trưng của sả, cực kỳ đưa cơm.",
    hero_image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDe5mBckXVNJ9ioj-5YRjf0Z54u8s4IZshGbIoNseMXrbGYkiDr4le3Y41IdzbVak4baETPsbqaBPVrH0hiRgfi3kgTv73BAYFoT0NYjOnAKVrnOTWyuKsBAzYzGp9_9mnvRFnjd8wC10ksAdS2JlOnLOsVIocAYKNWnhZBkSq6aWfJIDlfqo-a7X3tDMShnuC2B6fjwz9haNR_FY2_ItfcY5QAPhdcjrtkw0z3BYPUDjJfOh014g2bCjSCZdn1F47UKtboHNdR9I6h",
    total_time_min: 45,
    servings: 4,
    tags: ["com-nha"],
  },
  {
    slug: "ca-kho-to",
    title: "Cá Kho Tộ",
    description:
      "Cá được kho trong tộ đất giúp giữ nhiệt, nước kho kẹo lại màu cánh gián, vị mặn ngọt đậm đà.",
    hero_image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiebSP-KrdybNUDxpcNaohIOOFBgFNTLAapc0nJ9V4Hej290WjCej29Jlcn5LmcXW76utCdQRO_dgfb-J_olg2xFji4d1PThGp_g8qgbQTzS2Ijb-97HqszNwMPmv37xzQCDfGE_uVF6w4FnhxP-AlrTE1GPR5lFjtq7loLhtufPJ8Lf3ZudG3FdkmU1Yit4-OG4bhYZbgJ9ySD0McUgpO9dTD_MUB0fdcdgiRvw7ve7I069o_CnszorYCZWeLcJmrJZn2ypG18pE2",
    total_time_min: 60,
    servings: 3,
    tags: ["truyen-thong"],
  },
  {
    slug: "salad-thap-cam-sot-chanh-day",
    title: "Salad Thập Cẩm Sốt Chanh Dây",
    description: "Salad tươi mát, sốt chanh dây chua ngọt rất hợp ngày nóng.",
    hero_image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBj3zJ7c-l25_1-0lKn015exZR_fjRfXi2Ltian3jnm0w5I9b5m0bcJSaKlXYJhMq0re02km3nB9nmSgtr_QmE78qygmHfz4-lYegNEjs5wFBja3No2LtcIAJyVYJ73A-0pNt_No55ADX5N-oNyeXha5mpqJdg36uoEenhSBOV_pE74xksO8Ny17ongUTZaFe_ZREzD49L75cP1g4tTeX85cXmSxxiRY1-koJOHQZgkVmK_dZdxQKsAHDsD7fNR8GZZ5PLpE2S9Ffa2",
    total_time_min: 15,
    servings: 2,
    tags: ["healthy"],
  },
  {
    slug: "bun-bo-hue",
    title: "Bún Bò Huế Cay Nồng",
    description:
      "Nước dùng đậm vị mắm ruốc và sả, sợi bún to dai, thịt bò mềm và chả cua ngọt thơm.",
    hero_image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6P58hM7AY0Pa1oP4SfTsfN79BZI6rtnenp3ZM5B-bxJFyzfZz8fo-6yueR1A2IJ0yV1hmAgMmtpnSjFHIRWXSDg7bt80PLU-J7T5Ccw78WBuuUpYCZF2rvrXhmO0Q-spbReHNdCnR3hA6SLovUlZ917dkJ4pu-rZNpAuTUTa7LG9pF1AOsY0VWo_mcYtqNVBXpXm4cxSgt7Pj9H1TAaD0rF84TKmPE1R-fmWwz3emXAQYPzkDqmRnguSyVEJ9uSRq6fz5b13K1UdB",
    total_time_min: 90,
    servings: 4,
    tags: ["mon-viet", "mien-trung"],
  },
  {
    slug: "com-tam-suon",
    title: "Cơm Tấm Sườn Nướng",
    description:
      "Sườn nướng mật ong cháy cạnh, cơm tấm dẻo thơm, ăn cùng bì chả và mỡ hành béo ngậy.",
    hero_image_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDv8KJ3FDua5A0rbY1DNOc6Vske4HMgEwWBHBsPKc4G63xopGfKbQmqWK0S3jSw2gdTnLWhPgmQ4Yv327gOVzESMm2dlDONr8F7wl6D3MEAe1qpjKI84NPCoz9XlS4IZNZ05tbZeKeJP8JRcL9vIjZ-BctXDuFhHQ-ovgUJC5sOLnO_NSpugSNyw-PVMwqgEqszaStYAzD-wvstdEtvLkswsbGBGT_9tc1u4sFl-RC75iljG4FAWlQ_5JFdcvj5kP9eWaSER7FmTYdn",
    total_time_min: 50,
    servings: 2,
    tags: ["com-nha", "mien-nam"],
  },
];
