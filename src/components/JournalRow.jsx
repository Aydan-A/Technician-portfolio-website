import { Link } from "react-router-dom";

export default function JournalRow({ post }) {
  return (
    <Link
      className="journal-row group grid items-center gap-4 border-t border-line py-7 md:grid-cols-[160px_180px_1fr_auto]"
      to="/journal"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-graphite">
        {post.date}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bronze">
        {post.category}
      </p>
      <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-bronze">
        {post.title}
      </h3>
      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80 transition-colors group-hover:text-bronze">
        Read
        <span
          aria-hidden
          className="inline-block transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </Link>
  );
}
