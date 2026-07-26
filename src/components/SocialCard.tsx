import { motion } from "framer-motion";
import { FaGithub, FaTiktok } from "react-icons/fa";
import { SiItchdotio } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

interface SocialCardProps {
  label: string;
  url?: string;
  icon: string;
  className?: string;
}

const iconMap: Record<string, ReactNode> = {
  FaGithub: <FaGithub className="w-5 h-5" />,
  SiItchdotio: <SiItchdotio className="w-5 h-5" />,
  FaTiktok: <FaTiktok className="w-5 h-5" />,
  HiOutlineMail: <HiOutlineMail className="w-5 h-5" />,
};

export function SocialCard({ label, url, icon, className }: SocialCardProps) {
  const content = (
    <motion.div
      className={cn(
        "flex items-center gap-4 p-4 rounded-none border-2 border-[var(--border)]",
        "bg-[var(--surface)] cursor-pointer transition-colors duration-200",
        "hover:border-[var(--accent)] shadow-inner shadow-black/20",
        className,
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-[var(--accent)]">{iconMap[icon]}</span>
      <span className="font-body text-sm text-[var(--text)]">{label}</span>
    </motion.div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {content}
      </a>
    );
  }

  return content;
}
