import Image from "next/image";

/**
 * <Screenshot src="/images/projects/<slug>/01.jpg" alt="…" caption="…" />
 * Defaults to a 16:9 desktop shot; pass width/height for other sizes (e.g. 780x1688 for a phone).
 */
export function Screenshot({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-10">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-28px_rgb(0_0_0/0.35)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
