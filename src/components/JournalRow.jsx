export default function JournalRow({ post }) {
  return (
    <article className="grid gap-4 border-t border-border py-6 md:grid-cols-[160px_160px_1fr_auto] md:items-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {post.date}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-copper">
        {post.category}
      </p>
      <h3 className="font-serif text-2xl text-paper">{post.title}</h3>
      <a
        className="text-sm font-medium text-ash transition-colors hover:text-copper"
        href="#journal"
      >
        Read
      </a>
    </article>
  );
}
