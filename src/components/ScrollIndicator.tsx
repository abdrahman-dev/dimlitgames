import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
          <span className="text-xs font-body text-[var(--muted)] tracking-widest uppercase">
        Scroll
      </span>
      <motion.div
        className="w-px h-10 bg-[var(--muted)]/40"
        animate={{ scaleY: [1, 0.6, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "top center" }}
      />
    </motion.div>
  );
}
