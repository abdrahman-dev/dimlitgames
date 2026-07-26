import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { Button } from "../components/Button";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { site } from "../config/site";
import { fadeUp } from "../config/theme";
import bannerSrc from "../assets/logos/banner.webp";

export function Hero() {
  const handleScrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:min-h-[105vh] flex items-start overflow-hidden pt-24 md:pt-28 lg:pt-32"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        role="img"
        aria-label="Dimlit Games banner artwork"
        style={{
          backgroundImage: `url(${bannerSrc})`,
          filter: "var(--hero-filter)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-lg">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-title text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] leading-tight mb-4"
          >
            {site.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-title text-lg md:text-xl lg:text-2xl font-bold text-[var(--accent)] mb-8"
          >
            {site.tagline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body text-sm md:text-base text-[var(--muted)] leading-relaxed mb-10 max-w-md"
          >
            {site.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button onClick={handleScrollToProjects} variant="primary" ariaLabel="View projects">
              <FiArrowRight className="w-4 h-4" />
              View Projects
            </Button>
            <Button href={site.itchUrl} variant="secondary" ariaLabel="Visit itch.io">
              <FiExternalLink className="w-4 h-4" />
              Visit itch.io
            </Button>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
