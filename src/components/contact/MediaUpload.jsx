import { useCallback, useEffect, useId, useRef, useState } from "react";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB per photo
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB per clip

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function kindOf(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  return null;
}

function keyOf(file) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

/**
 * Validates a batch of dropped/selected files against the size rules.
 * Runs entirely client-side — nothing leaves the browser until the form is sent.
 */
function screenFiles(files, existingKeys) {
  const accepted = [];
  const rejected = [];
  const seen = new Set(existingKeys);

  for (const file of files) {
    const kind = kindOf(file);
    const key = keyOf(file);

    if (!kind) {
      rejected.push({
        key,
        name: file.name,
        reason: "Not a photo or video — only images and video clips are accepted.",
      });
      continue;
    }

    if (seen.has(key)) continue;

    const limit = kind === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
    if (file.size > limit) {
      rejected.push({
        key,
        name: file.name,
        oversizeVideo: kind === "video",
        reason:
          kind === "video"
            ? `${formatBytes(file.size)} — over the 50 MB limit.`
            : `${formatBytes(file.size)} — over the 10 MB limit for photos.`,
      });
      continue;
    }

    seen.add(key);
    accepted.push({
      key,
      kind,
      file,
      size: file.size,
      name: file.name,
      url: URL.createObjectURL(file),
    });
  }

  return { accepted, rejected };
}

export default function MediaUpload({
  items,
  onItemsChange,
  videoLink,
  onVideoLinkChange,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [rejects, setRejects] = useState([]);
  const [linkVisible, setLinkVisible] = useState(false);

  const inputRef = useRef(null);
  const linkRef = useRef(null);
  const dragDepth = useRef(0);
  const itemsRef = useRef(items);
  const focusLink = useRef(false);

  const inputId = useId();
  const linkId = useId();

  itemsRef.current = items;

  // Release every preview URL when the form unmounts.
  useEffect(
    () => () => {
      itemsRef.current.forEach((item) => URL.revokeObjectURL(item.url));
    },
    [],
  );

  // Pull focus to the link field only when an oversized video revealed it.
  useEffect(() => {
    if (linkVisible && focusLink.current) {
      focusLink.current = false;
      linkRef.current?.focus();
    }
  }, [linkVisible]);

  const addFiles = useCallback(
    (fileList) => {
      const files = Array.from(fileList || []);
      if (!files.length) return;

      const current = itemsRef.current;
      const { accepted, rejected } = screenFiles(
        files,
        current.map((item) => item.key),
      );

      if (accepted.length) onItemsChange([...current, ...accepted]);
      setRejects(rejected);

      if (rejected.some((reject) => reject.oversizeVideo)) {
        focusLink.current = true;
        setLinkVisible(true);
      }
    },
    [onItemsChange],
  );

  function handleDrop(event) {
    event.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function handleDragEnter(event) {
    event.preventDefault();
    dragDepth.current += 1;
    setIsDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDragging(false);
  }

  function handleChange(event) {
    addFiles(event.target.files);
    event.target.value = ""; // let the same file be re-picked after removal
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  }

  function remove(key) {
    const item = items.find((entry) => entry.key === key);
    if (item) URL.revokeObjectURL(item.url);
    onItemsChange(items.filter((entry) => entry.key !== key));
  }

  const oversizeVideo = rejects.some((reject) => reject.oversizeVideo);

  return (
    <div className="contact-field">
      <span className="contact-field-label">Photos &amp; video</span>

      {/* Kept outside the drop zone: input.click() bubbles, and a nested
          input would re-trigger the zone's own click handler. */}
      <input
        accept="image/*,video/*"
        className="sr-only"
        id={inputId}
        multiple
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />

      <div
        aria-describedby={`${inputId}-hint`}
        className={`media-drop${isDragging ? " is-dragging" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <span aria-hidden="true" className="media-drop-mark">
          <svg
            fill="none"
            height="22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
            width="22"
          >
            <path d="M12 16V4" />
            <path d="M7.5 8.5 12 4l4.5 4.5" />
            <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
          </svg>
        </span>
        <span className="media-drop-title">
          Drop photos or a video clip here
        </span>
        <span className="media-drop-action">or click to browse</span>
        <span className="media-drop-rules" id={`${inputId}-hint`}>
          Photos up to 10 MB · Video up to 50 MB
        </span>
      </div>

      <div aria-live="polite" className="contents">
        {rejects.length > 0 && (
          <div className="media-alert" role="status">
            <p className="media-alert-title">
              {oversizeVideo
                ? "Video exceeds 50 MB limit. Please share a link instead."
                : "Some files were not added."}
            </p>
            <ul className="media-alert-list">
              {rejects.map((reject) => (
                <li key={reject.key}>
                  <span className="media-alert-name">{reject.name}</span>
                  {" — "}
                  {reject.reason}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <ul className="media-grid">
          {items.map((item) => (
            <li className="media-tile" key={item.key}>
              {item.kind === "image" ? (
                <img alt={item.name} className="media-thumb" src={item.url} />
              ) : (
                <video
                  className="media-thumb"
                  muted
                  playsInline
                  preload="metadata"
                  src={item.url}
                />
              )}

              <button
                aria-label={`Remove ${item.name}`}
                className="media-remove"
                onClick={() => remove(item.key)}
                type="button"
              >
                ×
              </button>

              <span className="media-meta">
                <span className="media-name">{item.name}</span>
                <span className="media-size">
                  {item.kind === "video" ? "Video · " : ""}
                  {formatBytes(item.size)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {linkVisible ? (
        <div className="contact-field">
          <label className="contact-field-label" htmlFor={linkId}>
            Video link
          </label>
          <input
            className="contact-input"
            id={linkId}
            inputMode="url"
            name="videoLink"
            onChange={(event) => onVideoLinkChange(event.target.value)}
            placeholder="Loom, Google Drive, Dropbox or YouTube URL"
            ref={linkRef}
            type="url"
            value={videoLink}
          />
          <span className="media-drop-rules">
            Upload the clip anywhere you like and paste the share link — make
            sure it is viewable by anyone with the link.
          </span>
        </div>
      ) : (
        <button
          className="media-link-toggle"
          onClick={() => {
            focusLink.current = true;
            setLinkVisible(true);
          }}
          type="button"
        >
          Got a longer clip? Share a video link instead →
        </button>
      )}
    </div>
  );
}
