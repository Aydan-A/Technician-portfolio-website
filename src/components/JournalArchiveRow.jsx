import { Link } from "react-router-dom";
import { VERDICTS } from "../data/posts.js";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function JournalArchiveRow({ post }) {
  return (
    <Link className="archive-row" to={`/journal/${post.slug}`}>
      <span className="archive-row-num">
        № {String(post.number).padStart(3, "0")}
      </span>
      <time className="archive-row-date" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <span className="archive-row-verdict" data-verdict={post.verdict}>
        {VERDICTS[post.verdict].label}
      </span>
      <span className="archive-row-subject">{post.subject}</span>
      <span className="archive-row-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
