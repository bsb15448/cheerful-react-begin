import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="text-center">
        <div className="relative mb-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl font-bold bg-gradient-to-r from-[#2a98cb] to-[#d175a1] bg-clip-text text-transparent"
          >
            ELLES
          </motion.h1>
          <div className="mt-4 flex justify-center">
            <div className="relative h-1.5 w-40">
              {/* Blue bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="absolute h-full w-full origin-left bg-[#2a98cb] opacity-80"
              />
              {/* Pink bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute h-full w-full origin-left bg-[#d175a1] opacity-80"
              />
              {/* Yellow bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="absolute h-full w-full origin-left bg-[#fdeb1d] opacity-80"
              />
              {/* Black bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="absolute h-full w-full origin-left bg-[#040404] opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;