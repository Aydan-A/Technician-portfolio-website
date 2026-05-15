import { Link } from "react-router-dom";
import VerdictStamp from "./VerdictStamp.jsx";
import { TYPES } from "../data/posts.js";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function JournalDispatchCard({ post, variant = "grid" }) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`dispatch-card dispatch-card--${variant}`}
      id={post.id}
    >
      <header className="dispatch-card-header">
        <span className="dispatch-card-number">
          № {String(post.number).padStart(3, "0")}
        </span>
        <span className="dispatch-card-divider" aria-hidden="true" />
        <time className="dispatch-card-date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </header>

      <div className="dispatch-card-stamp">
        <VerdictStamp verdict={post.verdict} size={isFeatured ? "lg" : "md"} />
      </div>

      <h3 className="dispatch-card-title">
        <Link to={`/journal/${post.slug}`}>{post.title}</Link>
      </h3>

      <p className="dispatch-card-hook">{post.hook}</p>

      {isFeatured && post.claim && (
        <div className="dispatch-card-claim">
          <p className="dispatch-card-claim-label">The claim</p>
          <p className="dispatch-card-claim-body">&ldquo;{post.claim}&rdquo;</p>
        </div>
      )}

      <footer className="dispatch-card-footer">
        <span className="dispatch-card-meta">
          <span className="dispatch-card-meta-category">{post.category}</span>
          <span className="dispatch-card-meta-divider" aria-hidden="true">·</span>
          <span>{TYPES[post.type]}</span>
          <span className="dispatch-card-meta-divider" aria-hidden="true">·</span>
          <span>{post.readMinutes} min</span>
        </span>

        <Link className="dispatch-card-read" to={`/journal/${post.slug}`}>
          Read dispatch
          <span aria-hidden="true" className="dispatch-card-read-arrow">→</span>
        </Link>
      </footer>
    </article>
  );
}
