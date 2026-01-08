import { motion } from "motion/react";

export function TaglineBanner() {
  return (
    <motion.div 
      className="bg-[#003366] py-4 text-center mt-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <p className="text-white text-sm sm:text-base px-4 font-medium">
        Empowering Businesses with Strength, Backed by Reliability, and Grounded in Stability.
      </p>
    </motion.div>
  );
}