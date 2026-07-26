import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameCard } from "../components/GameCard";
import { gameService } from "../services/GameService";
import { staggerContainer, fadeUp } from "../config/theme";
import type { Game } from "../types";

export function Games() {
  const [featured, setFeatured] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gameService.getFeatured().then((game) => {
      setFeatured(game ?? null);
      setLoading(false);
    });
  }, []);

  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-title text-3xl md:text-4xl font-bold text-[var(--text)] mb-12"
        >
          Projects
        </motion.h2>

        {loading ? (
          <div className="animate-pulse rounded-sm bg-[var(--surface)] aspect-[2/1]" />
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {featured && <GameCard game={featured} variant="featured" />}
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-12 p-6 md:p-8 rounded-sm border-2 border-[var(--border)] bg-[var(--surface)] shadow-inner shadow-black/20 text-center"
        >
          <p className="font-title text-lg text-[var(--muted)] mb-2">
            More Projects Coming Soon
          </p>
          <p className="font-body text-sm text-[var(--muted)]/60">
            We&apos;re crafting something strange.
            <br />
            Stay tuned.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
