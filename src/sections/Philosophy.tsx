import { motion } from "framer-motion";
import { fadeIn } from "../config/theme";

export function Philosophy() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="font-title text-2xl md:text-5xl lg:text-6xl font-bold text-[var(--text)] leading-tight"
        >
          We don&apos;t make games.
          <br />
          We build worlds.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="font-title text-xl md:text-4xl lg:text-5xl text-[var(--accent)] mt-6 leading-snug"
        >
          Worlds that stay
          <br />
          with you.
        </motion.p>
      </div>
    </section>
  );
}