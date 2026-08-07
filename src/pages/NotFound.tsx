import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { NotFoundGame } from "../components/NotFoundGame/NotFoundGame";
import { fadeIn, fadeUp, staggerContainer } from "../config/theme";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
    >
      <div className="w-full max-w-3xl text-center">
        <motion.div
          variants={staggerContainer}
          className="flex flex-col items-center gap-6"
        >
          <motion.p
            variants={fadeIn}
            className="font-title text-2xl md:text-3xl tracking-[0.3em] text-[var(--muted)]"
          >
            ERROR // WORLD_NOT_FOUND
          </motion.p>

          <motion.span
            variants={fadeUp}
            className="font-title text-7xl md:text-9xl font-bold text-[var(--accent)] leading-none"
          >
            404
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-title text-2xl md:text-4xl font-bold text-[var(--text)] uppercase"
          >
            This world doesn&apos;t exist.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-body text-sm md:text-base text-[var(--muted)] max-w-md"
          >
            Whatever you were looking for has been lost somewhere in the dark.
          </motion.p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <NotFoundGame />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <Button onClick={() => navigate("/")}>Return to Dimlit</Button>
          <button
            onClick={() => navigate("/")}
            className="font-body text-xs tracking-wider uppercase text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline transition-colors"
          >
            Escape without playing
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}