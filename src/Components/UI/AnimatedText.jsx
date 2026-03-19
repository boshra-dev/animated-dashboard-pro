import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedText({ text, isMoved }) {
  const container = {
    hiddenText: {
      opacity: 0,
    },
    showText: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hiddenText: { opacity: 0, y: 6 },
    showText: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="text-lg md:text-2xl lg:text-3xl  font-bold whitespace-nowrap"
      style={{
        display: "inline-block",
        transformOrigin: "left center",
        scale: isMoved ? 0.6 : 1,
      }}
      initial={false}
      animate={{ scale: isMoved ? 0.6 : 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.span variants={container}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  );
}
