import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { GameStatus } from "../types";
import type { Game } from "../types";
import { Button } from "./Button";
import { Image } from "./Image";
import { cn } from "../utils/cn";
import { fadeUp } from "../config/theme";

interface GameCardProps {
  game: Game;
  variant?: "default" | "featured";
}

const statusLabel: Record<GameStatus, string> = {
  [GameStatus.Released]: "Released",
  [GameStatus.InDevelopment]: "In Development",
  [GameStatus.ComingSoon]: "Coming Soon",
};

export function GameCard({ game, variant = "default" }: GameCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.article
      variants={fadeUp}
      className={cn(
    "group rounded-sm border-2 border-[var(--border)] overflow-hidden",
    "bg-[var(--surface)] shadow-inner shadow-black/20 transition-all duration-200",
    "hover:border-[var(--accent)]/60",
      )}
    >
      <div className={cn(isFeatured ? "grid md:grid-cols-2" : "flex flex-col")}>
        <div className={cn("relative overflow-hidden", isFeatured ? "aspect-[16/10]" : "aspect-[16/9]")}>
          <Image
            src={game.cover}
            alt={`${game.title} cover`}
            className="transition-transform duration-500 group-hover:scale-105"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
        </div>

        <div className={cn("flex flex-col justify-center p-6 md:p-8", isFeatured && "md:p-10")}>
          <div className="flex items-center gap-3 mb-3">
            {game.featured && (
              <span className="px-3 py-1 text-[10px] font-body font-bold uppercase tracking-widest rounded-full bg-[var(--accent)] text-[var(--button-text)]">
                Featured
              </span>
            )}
            <span className="px-3 py-1 text-[10px] font-body font-medium uppercase tracking-wider rounded-full border border-[var(--border)] text-[var(--muted)]">
              {statusLabel[game.status]}
            </span>
            <span className="px-3 py-1 text-[10px] font-body font-medium uppercase tracking-wider rounded-full border border-[var(--border)] text-[var(--muted)]">
              {game.genre}
            </span>
          </div>

          <h3
            className={cn(
              "font-title font-bold text-[var(--text)] mb-3",
              isFeatured ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {game.title}
          </h3>

          <p className={cn("font-body text-[var(--muted)] mb-6 leading-relaxed", isFeatured ? "text-base" : "text-sm")}>
            {game.description}
          </p>

          {game.itchUrl && (
            <Button
              href={game.itchUrl}
              variant="primary"
              className="self-start"
              ariaLabel={`Visit ${game.title} on itch.io`}
            >
              <FiExternalLink className="w-4 h-4" />
              Visit itch.io
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
