import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import { fadeIn, fadeUp } from "../../config/theme";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Joystick } from "./Joystick";

type GameState = "intro" | "playing" | "scare" | "escaped";

interface Vec2 {
  x: number;
  y: number;
}

interface Wall {
  x: number;
  y: number;
  w: number;
  h: number;
}

const PLAYER_RADIUS = 2.6;
const MOVE_SPEED = 42;
const EXIT = { x: 86, y: 13 };
const START = { x: 50, y: 80 };
const SCARE_AT = 55;
const SCARE_MS = 1000;
const MIN = { x: 3, y: 3 };
const MAX = { x: 97, y: 92 };

const WALLS: Wall[] = [
  { x: 18, y: 18, w: 6, h: 44 },
  { x: 46, y: 52, w: 38, h: 6 },
  { x: 74, y: 24, w: 6, h: 26 },
];

const MOVEMENT_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Space",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);

function hitsWall(x: number, y: number): boolean {
  return WALLS.some(
    (w) =>
      x > w.x - PLAYER_RADIUS &&
      x < w.x + w.w + PLAYER_RADIUS &&
      y > w.y - PLAYER_RADIUS &&
      y < w.y + w.h + PLAYER_RADIUS,
  );
}

export function NotFoundGame() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const [phase, setPhaseState] = useState<GameState>("intro");
  const [pos, setPos] = useState<Vec2>(START);

  const phaseRef = useRef<GameState>("intro");
  const posRef = useRef<Vec2>(START);
  const faceRef = useRef<Vec2>({ x: 0, y: 0 });
  const keysRef = useRef<Set<string>>(new Set());
  const joyRef = useRef<Vec2>({ x: 0, y: 0 });
  const movedRef = useRef(0);
  const scaredRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const scareTimerRef = useRef<number | null>(null);

  const setPhase = useCallback((next: GameState) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);

  const begin = useCallback(() => {
    posRef.current = START;
    movedRef.current = 0;
    scaredRef.current = false;
    setPos(START);
    setPhase("playing");
  }, [setPhase]);

  const reset = useCallback(() => {
    if (scareTimerRef.current !== null) {
      window.clearTimeout(scareTimerRef.current);
      scareTimerRef.current = null;
    }
    begin();
  }, [begin]);

  const handleJoystick = useCallback(
    (x: number, y: number) => {
      joyRef.current = { x, y };
      if (phaseRef.current === "intro") begin();
    },
    [begin],
  );

  const handleJoystickInteract = useCallback(() => {
    if (phaseRef.current === "intro") begin();
  }, [begin]);

  const triggerScare = useCallback(() => {
    if (scaredRef.current) return;
    scaredRef.current = true;
    setPhase("scare");
    scareTimerRef.current = window.setTimeout(() => {
      if (phaseRef.current === "scare") setPhase("playing");
    }, SCARE_MS);
  }, [setPhase]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (MOVEMENT_KEYS.has(e.code)) e.preventDefault();
      if (e.code === "Enter" || e.code === "Space") {
        if (phaseRef.current === "intro") begin();
        if (phaseRef.current === "escaped") reset();
      }
      keysRef.current.add(e.code);
    };
    const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.code);
    const onBlur = () => keysRef.current.clear();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [begin, reset]);

  useEffect(() => {
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (phaseRef.current === "playing") {
        const keys = keysRef.current;
        let dx = 0;
        let dy = 0;
        if (keys.has("ArrowLeft") || keys.has("KeyA")) dx -= 1;
        if (keys.has("ArrowRight") || keys.has("KeyD")) dx += 1;
        if (keys.has("ArrowUp") || keys.has("KeyW")) dy -= 1;
        if (keys.has("ArrowDown") || keys.has("KeyS")) dy += 1;

        dx += joyRef.current.x;
        dy += joyRef.current.y;

        const len = Math.hypot(dx, dy);
        if (len > 1) {
          dx /= len;
          dy /= len;
        }

        if (dx !== 0 || dy !== 0) {
          faceRef.current = { x: dx, y: dy };
          const p = posRef.current;
          let nx = p.x + dx * MOVE_SPEED * dt;
          let ny = p.y + dy * MOVE_SPEED * dt;

          nx = Math.min(Math.max(nx, MIN.x), MAX.x);
          ny = Math.min(Math.max(ny, MIN.y), MAX.y);

          const tryX = { x: nx, y: p.y };
          const tryY = { x: p.x, y: ny };
          if (!hitsWall(tryX.x, tryX.y)) posRef.current = tryX;
          if (!hitsWall(tryY.x, tryY.y)) {
            posRef.current = { x: posRef.current.x, y: tryY.y };
          }

          movedRef.current += Math.hypot(
            posRef.current.x - p.x,
            posRef.current.y - p.y,
          );

          setPos({ ...posRef.current });

          if (!scaredRef.current && movedRef.current >= SCARE_AT) {
            triggerScare();
          }

          const exitDist = Math.hypot(
            posRef.current.x - EXIT.x,
            posRef.current.y - EXIT.y,
          );
          if (exitDist < 6.5) setPhase("escaped");
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (scareTimerRef.current !== null) {
        window.clearTimeout(scareTimerRef.current);
      }
    };
  }, [setPhase, triggerScare]);

  const face = faceRef.current;
  const entityPos = {
    x: pos.x - face.x * 10,
    y: pos.y - face.y * 10,
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div
        className="relative w-full touch-none select-none"
        style={{ aspectRatio: "10 / 12" }}
      >
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-none border-2 border-[var(--border)] bg-[var(--background)]",
            phase === "scare" && !reduced && "nf-shake",
          )}
        >
          <div className="absolute inset-0 shadow-inner shadow-black/40" />

          {WALLS.map((w, i) => (
            <div
              key={i}
              className="absolute border-2 border-[var(--border)] bg-[var(--surface)]"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                width: `${w.w}%`,
                height: `${w.h}%`,
              }}
            />
          ))}

          <div
            className="absolute"
            style={{ left: `${EXIT.x}%`, top: `${EXIT.y}%` }}
            aria-hidden="true"
          >
            <div className="relative h-10 w-3 -translate-x-1/2 -translate-y-1/2 border-2 border-[var(--accent)] bg-[var(--accent)]/30">
              <div className="absolute inset-0 bg-[var(--accent)]/40 blur-[1px]" />
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-title text-[8px] tracking-widest text-[var(--muted)]">
                EXIT
              </span>
            </div>
          </div>

          <AnimatePresence>
            {phase === "scare" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10"
              >
                <div className="nf-flicker absolute inset-0 bg-[var(--background)]/50" />
                <div className="absolute inset-0 bg-[var(--accent)]/10 mix-blend-multiply" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === "scare" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 flex h-14 w-8 items-center justify-center border-2 border-[var(--text)]/70 bg-black/80"
                style={{ left: `${entityPos.x}%`, top: `${entityPos.y}%` }}
              >
                <div className="flex gap-1">
                  <span className="h-1 w-1 bg-[var(--accent)]" />
                  <span className="h-1 w-1 bg-[var(--accent)]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={cn(
              "absolute z-30 border-2 border-[var(--text)] bg-[var(--accent)] transition-transform duration-100",
              phase === "scare" && !reduced && "nf-flicker",
            )}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: "9px",
              height: "9px",
              transform: "translate(-50%, -50%)",
            }}
            aria-label="Player"
          />

          {phase === "scare" && (
            <div className="absolute inset-x-0 bottom-2 z-40 text-center">
              <span className="nf-flicker font-title text-sm tracking-[0.3em] text-[var(--accent)]">
                DON&apos;T LOOK BACK
              </span>
            </div>
          )}
        </div>

        <AnimatePresence>
          {phase === "intro" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[var(--background)]/95 px-6 text-center"
            >
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-title text-lg tracking-[0.25em] text-[var(--muted)]">
                  {`< DON'T LOOK BACK />`}
                </span>
                <span className="font-title text-2xl font-bold text-[var(--text)]">
                  FIND THE EXIT
                </span>
              </motion.div>
              <motion.p
                variants={fadeUp}
                className="font-body text-sm text-[var(--muted)] max-w-xs"
              >
                A dark room. Something behind you. Use WASD or the joystick to
                move.
              </motion.p>
              <motion.button
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={begin}
                className="border-2 border-[var(--accent)] bg-accent px-6 py-2.5 font-body text-sm font-medium uppercase tracking-wider text-[var(--button-text)] hover:brightness-110"
              >
                Enter the dark
              </motion.button>
              <p className="font-body text-xs text-[var(--muted)]/60">
                Or press Enter to begin.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "escaped" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-[var(--background)]/95 px-6 text-center"
            >
              <motion.span
                variants={fadeUp}
                className="font-title text-xl font-bold text-[var(--accent)]"
              >
                YOU FOUND YOUR WAY OUT.
              </motion.span>
              <motion.p
                variants={fadeUp}
                className="font-body text-sm text-[var(--muted)] max-w-xs"
              >
                This world was never meant to be found.
              </motion.p>
              <motion.button
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/")}
                className="border-2 border-[var(--accent)] bg-accent px-6 py-2.5 font-body text-sm font-medium uppercase tracking-wider text-[var(--button-text)] hover:brightness-110"
              >
                Return to Dimlit
              </motion.button>
              <button
                onClick={reset}
                className="font-body text-xs uppercase tracking-wider text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
              >
                Step back in
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between md:hidden">
        <Joystick onChange={handleJoystick} onInteract={handleJoystickInteract} />
        <div className="font-body text-xs text-[var(--muted)]/60">
          Find the exit.
          <br />
          Don&apos;t look back.
        </div>
      </div>
    </div>
  );
}