import { Link } from "react-router-dom";
import VerdictStamp from "../ui/VerdictStamp.jsx";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* One index card per dispatch. The cover is flush to the card edge with the
 * verdict chipped onto its corner, which keeps the text block to four short
 * rows — title, hook, and a footer pinned to the bottom so the meta lines up
 * across the grid. */
export default function JournalDispatchCard({ post, variant = "grid" }) {
  const isFeatured = variant === "featured";
  const href = `/journal/${post.slug}`;

  return (
    <article className={`dispatch-card dispatch-card--${variant}`} id={post.id}>
      <Link
        aria-hidden="true"
        className="dispatch-card-cover"
        tabIndex={-1}
        to={href}
      >
        {post.cover ? (
          <img src={post.cover} alt="" loading="lazy" />
        ) : (
          <span className="dispatch-card-cover-placeholder">
            <span className="dispatch-card-cover-placeholder-num">
              № {String(post.number).padStart(3, "0")}
            </span>
            <span className="dispatch-card-cover-placeholder-label">
              {post.category}
            </span>
          </span>
        )}

        <span className="dispatch-card-verdict">
          <VerdictStamp verdict={post.verdict} size={isFeatured ? "lg" : "md"} />
        </span>
      </Link>

      <div className="dispatch-card-body">
        <header className="dispatch-card-header">
          <span className="dispatch-card-number">
            № {String(post.number).padStart(3, "0")}
          </span>
          <span className="dispatch-card-divider" aria-hidden="true" />
          <time className="dispatch-card-date" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </header>

        <h3 className="dispatch-card-title">
          <Link to={href}>{post.title}</Link>
        </h3>

        <p className="dispatch-card-hook">{post.hook}</p>

        <footer className="dispatch-card-footer">
          <span className="dispatch-card-meta">
            <span className="dispatch-card-meta-category">{post.category}</span>
            <span className="dispatch-card-meta-divider" aria-hidden="true">
              ·
            </span>
            <span>{post.readMinutes} min</span>
          </span>

          <Link className="dispatch-card-read" to={href}>
            Read
            <span aria-hidden="true" className="dispatch-card-read-arrow">
              →
            </span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
