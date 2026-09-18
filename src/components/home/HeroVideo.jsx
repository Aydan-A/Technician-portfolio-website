import { useEffect, useRef, useState } from "react";
import heroPoster from "../../assets/images/home/hero-poster.jpg";
import heroVideo from "../../assets/images/home/hero.mp4";

/* Hero media for the homepage. The poster paints immediately; the ~11 MB clip
 * is only fetched once the block is actually near the viewport AND the page is
 * idle, so it never competes with first paint — and a visitor who never scrolls
 * past the hero never downloads it at all.
 *
 * prefers-reduced-motion is respected live: if the user has (or turns on) the
 * setting, we keep the static poster and pause/tear down the video. */
export default function HeroVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleId = null;
    let observer = null;

    const cancelPending = () => {
      if (idleId == null) return;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      idleId = null;
    };

    const loadWhenIdle = () => {
      const start = () => setShowVideo(true);
      idleId =
        "requestIdleCallback" in window
          ? window.requestIdleCallback(start)
          : window.setTimeout(start, 200);
    };

    // 400px of lead-in so the swap has happened by the time it is on screen.
    const watch = () => {
      if (!container || !("IntersectionObserver" in window)) {
        loadWhenIdle();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            observer = null;
            loadWhenIdle();
          }
        },
        { rootMargin: "400px 0px" },
      );
      observer.observe(container);
    };

    if (!media.matches) watch();

    const onChange = (event) => {
      if (event.matches) {
        observer?.disconnect();
        observer = null;
        cancelPending();
        setShowVideo(false);
        videoRef.current?.pause();
      } else {
        watch();
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      observer?.disconnect();
      cancelPending();
    };
  }, []);

  return (
    <div className="h-full w-full" ref={containerRef}>
      {showVideo ? (
        <video
          autoPlay
          className="block h-full w-full object-cover"
          loop
          muted
          playsInline
          poster={heroPoster}
          preload="metadata"
          ref={videoRef}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : (
        <img
          alt="Espresso machine running on the workshop bench"
          className="block h-full w-full object-cover"
          loading="lazy"
          src={heroPoster}
        />
      )}
    </div>
  );
}
