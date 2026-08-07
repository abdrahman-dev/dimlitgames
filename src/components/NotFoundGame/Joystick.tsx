import { useCallback, useRef, useState } from "react";

interface JoystickProps {
  onChange: (x: number, y: number) => void;
  onInteract: () => void;
}

interface KnobState {
  dx: number;
  dy: number;
}

const MAX_RADIUS = 46;

export function Joystick({ onChange, onInteract }: JoystickProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<number | null>(null);
  const [knob, setKnob] = useState<KnobState>({ dx: 0, dy: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      baseRef.current?.setPointerCapture(e.pointerId);
      draggingRef.current = e.pointerId;
      onInteract();
      const center = getCenter(baseRef.current);
      updateKnob(e.clientX, e.clientY, center);
    },
    [onInteract],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (draggingRef.current !== e.pointerId) return;
      const center = getCenter(baseRef.current);
      updateKnob(e.clientX, e.clientY, center);
    },
    [],
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (draggingRef.current !== e.pointerId) return;
      draggingRef.current = null;
      setKnob({ dx: 0, dy: 0 });
      onChange(0, 0);
    },
    [onChange],
  );

  function updateKnob(px: number, py: number, center: { x: number; y: number }) {
    let dx = px - center.x;
    let dy = py - center.y;
    const dist = Math.hypot(dx, dy);
    if (dist > MAX_RADIUS) {
      dx = (dx / dist) * MAX_RADIUS;
      dy = (dy / dist) * MAX_RADIUS;
    }
    setKnob({ dx, dy });
    onChange(dx / MAX_RADIUS, dy / MAX_RADIUS);
  }

  return (
    <div
      ref={baseRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative h-28 w-28 rounded-full border-2 border-[var(--border)] bg-[var(--background)]/70 touch-none select-none"
      role="slider"
      aria-label="Movement joystick"
      aria-valuetext={`${Math.round(-knob.dy)} up, ${Math.round(knob.dx)} sideways`}
    >
      <div
        className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full border-2 border-[var(--accent)] bg-[var(--surface)]"
        style={{
          transform: `translate(calc(-50% + ${knob.dx}px), calc(-50% + ${knob.dy}px))`,
        }}
      />
    </div>
  );
}

function getCenter(el: HTMLElement | null): { x: number; y: number } {
  if (!el) return { x: 0, y: 0 };
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}