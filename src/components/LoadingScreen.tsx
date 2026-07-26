import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "../assets/logos/logo.webp";

interface LoadingScreenProps {
  onFinish: () => void;
}

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("hold"), 700);
    const exitTimer = setTimeout(() => setPhase("exit"), 1500);
    const finishTimer = setTimeout(() => onFinish(), 1900);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-10"
          style={{ backgroundColor: "var(--background)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.img
            src={logoSrc}
            alt="Dimlit Games"
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.p
            className="font-title text-lg md:text-xl text-[var(--text)] tracking-widest"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            DIMLIT GAMES
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
