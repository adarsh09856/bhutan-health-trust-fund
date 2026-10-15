import { createFileRoute } from "@tanstack/react-router";
import { Camera, ExternalLink, MapPin, Play } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { getPublicGallery, getPublicVideos } from "@/lib/api/public.functions";
import type { MediaGalleryItem, MediaVideo } from "@/lib/db/schema";

export const Route = createFileRoute("/news/media")({
  loader: async () => {
    const [gallery, videos] = await Promise.all([
      getPublicGallery().catch(() => [] as MediaGalleryItem[]),
      getPublicVideos().catch(() => [] as MediaVideo[]),
    ]);
    return { gallery, videos };
  },
  head: () => ({
    meta: [
      { title: "Field Media & Documentaries | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Photographs and documentaries showing healthcare delivery, vaccine programs, and field operations across Bhutan.",
      },
    ],
  }),
  component: FieldMediaPage,
});

function getEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;

    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1);
      return /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) {
      const id = url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:embed|shorts)\/([\w-]{11})$/)?.[1];
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (["vimeo.com", "www.vimeo.com"].includes(url.hostname)) {
      const id = url.pathname.match(/^\/(\d+)\/?$/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function FieldMediaPage() {
  const { gallery, videos } = Route.useLoaderData();

  return (
    <main className="bg-[#FAF8F3] text-slate-800">
      <PageHero
        title="Stories from the field"
        subtitle="Photographs and documentaries show how essential medicines, vaccines, and care reach communities across Bhutan."
        badge="Field media"
        breadcrumb={[
          { label: "News & Events", to: "/news" },
          { label: "Field Media" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20" aria-labelledby="field-gallery-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#0B4F42]/15 pb-6 sm:mb-10">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4F42]">
              <span className="h-px w-7 bg-[#D4A237]" /> Community & care
            </p>
            <h2 id="field-gallery-title" className="font-serif text-3xl font-semibold tracking-tight text-[#0B4F42] sm:text-4xl">
              Field operations gallery
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-slate-600">
            A visual record of outreach clinics, immunization programs, and the teams serving every Dzongkhag.
          </p>
        </div>

        {gallery.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <article
                key={item.id}
                className={`group overflow-hidden rounded-2xl border border-[#0B4F42]/10 bg-white shadow-[0_10px_30px_rgba(11,79,66,0.06)] ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
              >
                <a href={item.imageUrl} target="_blank" rel="noreferrer" className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B4F42]">
                  <div className={`overflow-hidden bg-[#e8ece5] ${index === 0 ? "aspect-[16/9] sm:aspect-[4/3]" : "aspect-[4/3]"}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="space-y-3 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B4F42]/75">
                      <span>{item.category}</span>
                      <span className="inline-flex items-center gap-1 normal-case tracking-normal text-slate-500">
                        <MapPin className="h-3 w-3" /> {item.dzongkhag}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold leading-snug text-[#0B4F42] sm:text-2xl">{item.title}</h3>
                    {item.caption && <p className="text-sm leading-6 text-slate-600">{item.caption}</p>}
                  </div>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#0B4F42]/25 bg-white/70 px-6 py-12 text-center">
            <Camera className="mx-auto mb-4 h-7 w-7 text-[#0B4F42]/50" />
            <p className="font-serif text-xl font-semibold text-[#0B4F42]">Field stories will appear here</p>
            <p className="mt-2 text-sm text-slate-600">The gallery is being prepared by the BHTF media team.</p>
          </div>
        )}
      </section>

      <section className="border-y border-white/10 bg-[#092f29] text-white" aria-labelledby="field-films-title">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-6 sm:mb-10">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f2c56b]">
                <span className="h-px w-7 bg-[#f2c56b]" /> Watch & learn
              </p>
              <h2 id="field-films-title" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Documentaries & briefings
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-white/70">
              First-hand accounts of Bhutan’s health programs, frontline teams, and the work behind reliable access to care.
            </p>
          </div>

          {videos.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => {
                const embedUrl = getEmbedUrl(video.videoUrl);
                return (
                  <article key={video.id} className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06]">
                    {embedUrl ? (
                      <div className="aspect-video bg-black">
                        <iframe
                          src={embedUrl}
                          title={video.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="h-full w-full border-0"
                        />
                      </div>
                    ) : (
                      <a href={video.videoUrl} target="_blank" rel="noreferrer" className="group relative block aspect-video bg-black">
                        {video.thumbnailUrl && <img src={video.thumbnailUrl} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-60" />}
                        <span className="absolute inset-0 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#d4a237] text-[#092f29]"><Play className="ml-0.5 h-5 w-5 fill-current" /></span></span>
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-white">Open video <ExternalLink className="h-3 w-3" /></span>
                      </a>
                    )}
                    <div className="space-y-3 p-5">
                      <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f2c56b]">
                        <span>{video.category}</span><span className="text-white/60">{video.duration}</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold leading-snug">{video.title}</h3>
                      {video.description && <p className="text-sm leading-6 text-white/70">{video.description}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/25 bg-white/[0.04] px-6 py-12 text-center">
              <Play className="mx-auto mb-4 h-7 w-7 text-[#f2c56b]/70" />
              <p className="font-serif text-xl font-semibold">Film stories will appear here</p>
              <p className="mt-2 text-sm text-white/65">The media team will add documentaries and briefings as they are released.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
