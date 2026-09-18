import { Link } from "react-router-dom";

/* Floating "See the skeleton" badge — a small circular, tracked-uppercase
 * tool marker in the bottom-right of the homepage. Independent of the main nav.
 * Ring rotation + styling live in index.css under ".skeleton-badge". */
export default function SkeletonBadge() {
  return (
    <Link
      aria-label="See the skeleton"
      className="skeleton-badge"
      to="/skeleton"
    >
      <span aria-hidden="true" className="skeleton-badge-ring" />
      <span className="skeleton-badge-label">
        See the
        <br />
        skeleton
      </span>
    </Link>
  );
}
