type Props = {
  platform: "youtube" | "tiktok" | string;
  externalId: string;
  title?: string;
};

export function VideoEmbed({ platform, externalId, title }: Props) {
  if (platform === "youtube") {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${externalId}`}
          title={title ?? "YouTube video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (platform === "tiktok") {
    return (
      <div className="rounded-lg overflow-hidden">
        <blockquote
          className="tiktok-embed"
          cite={`https://www.tiktok.com/video/${externalId}`}
          data-video-id={externalId}
        >
          <a href={`https://www.tiktok.com/video/${externalId}`}>
            Xem trên TikTok
          </a>
        </blockquote>
      </div>
    );
  }

  return null;
}
