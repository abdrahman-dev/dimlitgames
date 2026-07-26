import { useState } from "react";
import { cn } from "../utils/cn";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23171717' width='400' height='300'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%232b2b2b' font-size='14' font-family='sans-serif'%3ENo%20Image%3C/text%3E%3C/svg%3E";

export function Image({ src, alt, className, wrapperClassName }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("overflow-hidden", wrapperClassName)}>
      {!loaded && !error && (
        <div
          className={cn(
            "animate-pulse bg-surface w-full h-full",
            className,
          )}
        />
      )}
      <img
        src={error ? PLACEHOLDER : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "w-full h-full object-cover",
          !loaded && !error && "hidden",
          className,
        )}
      />
    </div>
  );
}
