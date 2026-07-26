import { FaGithub, FaTiktok } from "react-icons/fa";
import { SiItchdotio } from "react-icons/si";
import { site } from "../config/site";
import logoSrc from "../assets/logos/logo.webp";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt="Dimlit Games" className="w-8 h-8 object-contain" />
          <div>
            <p className="font-title text-sm font-bold text-[var(--text)]">{site.name}</p>
            <p className="text-xs text-[var(--muted)] font-body">{site.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href={site.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="w-4 h-4 text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300" />
          </a>
          <a href={site.itchUrl} target="_blank" rel="noopener noreferrer" aria-label="itch.io">
            <SiItchdotio className="w-4 h-4 text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300" />
          </a>
          <a
            href="https://tiktok.com/@dimlitgames"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok className="w-4 h-4 text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300" />
          </a>
        </div>

        <p className="text-xs text-[var(--muted)] font-body">{site.copyright}</p>
      </div>
    </footer>
  );
}
