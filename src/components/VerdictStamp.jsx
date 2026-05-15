import { VERDICTS } from "../data/posts.js";

export default function VerdictStamp({ verdict, size = "md" }) {
  const meta = VERDICTS[verdict];
  if (!meta) return null;

  return (
    <span
      aria-label={`Verdict: ${meta.label}`}
      className={`verdict-stamp verdict-stamp--${meta.tone} verdict-stamp--${size}`}
      data-verdict={verdict}
    >
      <span className="verdict-stamp-inner">{meta.label}</span>
    </span>
  );
}
