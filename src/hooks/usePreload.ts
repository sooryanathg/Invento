"use client";

import { useEffect, useState } from "react";

export function usePreload(assets: string[]) {
  const [loaded, setLoaded] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // preload assets
      await Promise.all(
        assets.map(
          (src) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = src;

              img.onload = () => {
                if (!cancelled) {
                  setLoaded((p) => p + 1);
                }
                resolve();
              };

              img.onerror = () => resolve(); // never block UX
            })
        )
      );

      // DEBUG / UX delay (optional)
      await new Promise((res) => setTimeout(res, 800));

      if (!cancelled) setDone(true);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [assets]);

  return {
    progress: Math.round((loaded / assets.length) * 100),
    done,
  };
}
