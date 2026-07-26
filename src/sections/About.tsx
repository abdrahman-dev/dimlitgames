import { motion } from "framer-motion";
import { fadeUp } from "../config/theme";

export function About() {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-title text-3xl md:text-4xl font-bold text-[var(--text)] mb-8">
            About
          </h2>

          <div className="space-y-6 font-body text-base md:text-lg text-[var(--muted)] leading-relaxed">
            <p>
              Dimlit Games was born from a simple belief: that games can feel like
              something more.
            </p>
            <p>
              We chase unusual ideas&mdash;atmospheric worlds, psychological horror,
              quiet exploration. Not because they&rsquo;re popular, but because
              they&rsquo;re the kind of experiences we&rsquo;ve always wanted to play.
            </p>
            <p>
              We don&rsquo;t measure success by copies sold.
            </p>
            <p className="text-[var(--text)] italic">
              We measure it by whether someone remembers how a game made them feel
              long after the credits roll.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
