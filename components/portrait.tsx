type EditorialImageProps = {
  kind?: "portrait" | "event" | "workshop" | "insight";
  label?: string;
  className?: string;
};

/**
 * Editorial photography placeholder.
 * Replace this component with `next/image` once Bogdan's approved photography is available.
 * Recommended crops: portrait 4:5, event/workshop 3:2, insight 16:10.
 */
export function EditorialImage({
  kind = "portrait",
  label,
  className = "",
}: EditorialImageProps) {
  const accessibleLabel =
    label ??
    (kind === "portrait"
      ? "Portrait photography placeholder for Bogdan Vizitiu"
      : `${kind} photography placeholder`);

  return (
    <div
      className={`editorial-image editorial-image--${kind} ${className}`}
      role="img"
      aria-label={accessibleLabel}
    >
      <span className="image-index" aria-hidden="true">
        BGV / {kind === "portrait" ? "01" : kind === "event" ? "02" : kind === "workshop" ? "03" : "04"}
      </span>
      <span className="image-caption" aria-hidden="true">
        Photography placeholder · replace before launch
      </span>
      <span className="image-subject" aria-hidden="true" />
    </div>
  );
}

export const Portrait = ({ event = false }: { event?: boolean }) => (
  <EditorialImage kind={event ? "event" : "portrait"} />
);
