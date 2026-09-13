import { useEffect, useRef, useState } from "react";
import heroPoster from "../assets/images/home-hero-poster.jpg";
import heroVideo from "../assets/images/home-hero.mp4";

/* Hero media for the homepage. Renders the poster image immediately and only
 * swaps in the autoplaying <video> once the page is idle — so the ~11 MB clip
 * never competes with first paint or blocks the rest of the load.
 *
 * prefers-reduced-motion is respected live: if the user has (or turns on) the
 * setting, we keep the static poster and pause/tear down the video. */
export default function HeroVideo() {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleId = null;

    const enable = () => {
      const start = () => setShowVideo(true);
      idleId =
        "requestIdleCallback" in window
          ? window.requestIdleCallback(start)
          : window.setTimeout(start, 200);
    };

    const cancelPending = () => {
      if (idleId == null) return;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      idleId = null;
    };

    if (!media.matches) enable();

    const onChange = (event) => {
      if (event.matches) {
        cancelPending();
        setShowVideo(false);
        videoRef.current?.pause();
      } else {
        enable();
      }
    };

    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      cancelPending();
    };
  }, []);

  return (
    <div className="h-full w-full">
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
          src={heroPoster}
        />
      )}
    </div>
  );
}
