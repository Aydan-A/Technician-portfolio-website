import { Link, useParams } from "react-router-dom";
import VerdictStamp from "../components/VerdictStamp.jsx";
import { posts, TYPES } from "../data/posts.js";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function NotFound() {
  return (
    <main className="bg-page text-ink">
      <section className="mx-auto max-w-3xl px-5 py-24 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bronze">
          404 · Filed nowhere
        </p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] text-ink">
          That dispatch
          <br />
          does not exist.
        </h1>
        <p className="mt-6 font-sans text-base leading-7 text-graphite">
          The link you followed points to a dispatch that was never filed, or
          has been pulled from the archive.
        </p>
        <Link
          className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink underline-offset-4 hover:underline"
          to="/journal"
        >
          ← Back to the Journal
        </Link>
      </section>
    </main>
  );
}

export default function JournalArticlePage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const sorted = [...posts].sort((a, b) => b.number - a.number);
  const idx = sorted.findIndex((p) => p.id === post.id);
  const prev = sorted[idx + 1]; // older
  const next = sorted[idx - 1]; // newer

  return (
    <main className="bg-page text-ink">
      <article className="dispatch-article">
        {/* Masthead */}
        <header className="dispatch-article-masthead">
          <div className="dispatch-masthead-rule" />
          <div className="dispatch-masthead-row">
            <span className="dispatch-masthead-title">
              The Workshop Dispatch
            </span>
            <span className="dispatch-masthead-meta">
              № {String(post.number).padStart(3, "0")} · Filed{" "}
              {formatDate(post.date)} · {post.readMinutes} min
            </span>
          </div>
          <div className="dispatch-masthead-rule" />
        </header>

        {/* Title block */}
        <section className="dispatch-article-head">
          <p className="dispatch-article-tags">
            <span className="dispatch-article-tag dispatch-article-tag--category">
              {post.category}
            </span>
            <span className="dispatch-article-tag-divider" aria-hidden="true">
              ·
            </span>
            <span className="dispatch-article-tag">{TYPES[post.type]}</span>
          </p>

          <h1 className="dispatch-article-title">{post.displayTitle ?? post.title}</h1>
          <blockquote className="dispatch-article-subhead">
            {post.claim}
          </blockquote>
        </section>

        <section className="dispatch-article-meta-strip" aria-label="Dispatch details">
          <p>
            <span>Subject</span>
            {post.subject}
          </p>
          <p>
            <span>Filed by</span>
            Vagif Aliyev
          </p>
          <p>
            <span>Format</span>
            {TYPES[post.type]}
          </p>
          <p>
            <span>Read</span>
            {post.readMinutes} minutes
          </p>
        </section>

        <section className="dispatch-article-layout">
          <div className="dispatch-article-main">
            {post.body ? (
              <div
                className="dispatch-article-body"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            ) : (
              <p className="dispatch-article-body-empty">
                Article in draft. The bottom line below is the short version.
              </p>
            )}
          </div>

          <aside className="dispatch-article-sidebar" aria-label="Dispatch notes">
            <div className="dispatch-article-stamp">
              <VerdictStamp verdict={post.verdict} size="xl" />
            </div>

            <section className="dispatch-article-side-section">
              <p className="dispatch-article-side-label">Supporting headline</p>
              <h2 className="dispatch-article-side-title">{post.hook}</h2>
            </section>

            <section className="dispatch-article-side-section">
              <p className="dispatch-article-side-label">Receipts</p>
              <ul className="dispatch-article-receipts">
                {post.receipt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="dispatch-article-bottomline">
              <p className="dispatch-article-bottomline-label">Bottom line</p>
              <p className="dispatch-article-bottomline-body">{post.bottomLine}</p>
            </section>
          </aside>
        </section>

        {/* Nav */}
        <nav className="dispatch-article-nav" aria-label="Dispatch navigation">
          <div>
            {prev && (
              <Link className="dispatch-article-nav-link" to={`/journal/${prev.slug}`}>
                <span className="dispatch-article-nav-direction">
                  ← Older dispatch
                </span>
                <span className="dispatch-article-nav-title">{prev.subject}</span>
              </Link>
            )}
          </div>
          <Link
            className="dispatch-article-nav-index"
            to="/journal"
          >
            All dispatches
          </Link>
          <div className="dispatch-article-nav-right">
            {next && (
              <Link className="dispatch-article-nav-link" to={`/journal/${next.slug}`}>
                <span className="dispatch-article-nav-direction">
                  Newer dispatch →
                </span>
                <span className="dispatch-article-nav-title">{next.subject}</span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </main>
  );
}
