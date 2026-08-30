export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-3 text-base md:text-lg opacity-90 max-w-3xl">{subtitle}</p>}
      </div>
    </section>
  );
}