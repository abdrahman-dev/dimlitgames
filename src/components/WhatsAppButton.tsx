import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/201148630739"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join us on WhatsApp"
      className="group fixed bottom-6 right-6 max-sm:bottom-4 max-sm:right-4 z-50 flex overflow-hidden border-2 border-[var(--accent)] bg-[var(--surface)] text-[var(--text)] shadow-lg"
      initial="initial"
      animate="initial"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="flex h-12 w-12 items-center justify-center border-r-2 border-[var(--accent)]"
        variants={{
          initial: {
            backgroundColor: "var(--surface)",
            color: "var(--text)",
          },
          hover: {
            backgroundColor: "var(--accent)",
            color: "var(--button-text)",
          },
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <FaWhatsapp size={22} />
      </motion.div>

      <motion.div
        className="flex items-center overflow-hidden"
        variants={{
          initial: {
            width: 0,
          },
          hover: {
            width: 230,
          },
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.span
          className="whitespace-nowrap px-4 text-xs uppercase tracking-wider"
          variants={{
            initial: {
              opacity: 0,
              x: 10,
            },
            hover: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{
            duration: 0.25,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Build Strange Worlds With Us?
        </motion.span>
      </motion.div>
    </motion.a>
  );
}