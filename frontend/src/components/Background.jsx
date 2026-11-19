import { useEffect, useRef } from "react";
import "./Background.css";

export default function UniversalBackground() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!calm) {
      root.classList.add("is-idle");
    }

    const handlePointerMove = (e) => {
      const r = root.getBoundingClientRect();
      root.classList.remove("is-idle");

      root.style.setProperty(
        "--bga-02-mx",
        (((e.clientX - r.left) / r.width) * 100).toFixed(2) + "%"
      );

      root.style.setProperty(
        "--bga-02-my",
        (((e.clientY - r.top) / r.height) * 100).toFixed(2) + "%"
      );
    };

    const handlePointerLeave = () => {
      root.style.removeProperty("--bga-02-mx");
      root.style.removeProperty("--bga-02-my");

      if (!calm) {
        root.classList.add("is-idle");
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      if (root) root.classList.remove("is-idle");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="bga-02 universal-bg"
      id="bga-02-root"
      aria-label="Cursor spotlight background"
    >
      <div className="bga-02__grid" aria-hidden="true" />
      <div className="bga-02__reveal" aria-hidden="true">
        <img
          className="bga-02__photo"
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1800&auto=format&fit=crop"
          alt=""
        />
      </div>
      <div className="bga-02__beam" aria-hidden="true" />
      <div className="bga-02__vig" aria-hidden="true" />
    </div>
  );
}

