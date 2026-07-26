import { motion } from "framer-motion";
import { SocialCard } from "../components/SocialCard";
import { site } from "../config/site";
import { staggerContainer, fadeUp } from "../config/theme";

export function FindUs() {
  const socials = [
    ...site.socials,
    { label: "Email", url: "", icon: "HiOutlineMail" },
  ];

  return (
    <section id="find-us" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-title text-3xl md:text-4xl font-bold text-[var(--text)] mb-6"
        >
          Find Us
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="font-body text-[var(--muted)] mb-12 max-w-md mx-auto"
        >
          Follow the journey. Strange things are taking shape.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl"
        >
          {socials.map((social) => (
            <motion.div key={social.label} variants={fadeUp}>
              <SocialCard
                label={social.label}
                url={social.label === "Email" ? `mailto:${site.email}` : social.url}
                icon={social.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
