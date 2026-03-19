import { motion } from "framer-motion";
export default function AnimatedNumber({ value, hasAnimated, controle }) {
  const chars = value.toString().split("");

  return (
    <div className="flex items-center   ">
      {chars.map((char, i) =>
        isNaN(char) ? (
          <motion.span
            key={i}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold mx-0.5"
            initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
            animate={controle}
            variants={{
              show: { opacity: 1 },
            }}
            transition={{ duration: 0.01 }}
          >
            {char}
          </motion.span>
        ) : (
          <AnimatedDigit
            key={i}
            digit={Number(char)}
            controle={controle}
            hasAnimated={hasAnimated}
          />
        ),
      )}
    </div>
  );
}
function AnimatedDigit({ digit, controle, hasAnimated }) {
  const DIGIT_HEIGHT = 32;

  return (
    <div
      className="overflow-hidden relative w-3  lg:w-4"
      style={{ height: DIGIT_HEIGHT }}
    >
      <motion.div
        initial={
          hasAnimated
            ? { opacity: 1, y: -digit * DIGIT_HEIGHT }
            : { opacity: 0, y: 0 }
        }
        animate={controle}
        variants={{
          show: {
            opacity: 1,
            y: -digit * DIGIT_HEIGHT,
            transition: {
              opacity: { duration: 0.01 },
              y: { duration: 1, ease: "easeOut" },
            },
          },
          static: {
            opacity: 1,
            y: -digit * DIGIT_HEIGHT,
            transition: { duration: 0 },
          },
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{ height: DIGIT_HEIGHT }}
            className="flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-semibold leading-none"
          >
            {i}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
