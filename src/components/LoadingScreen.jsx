import { motion } from "framer-motion";

const LoadingScreen = ({ message = "로딩 중..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      {/* 스피너 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="h-16 w-16 rounded-full border-4 border-gray border-t-secondary mb-6"
      />
      {/* 동적 텍스트 */}
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-xl font-semibold text-darkGray"
      >
        {message}
      </motion.span>
    </div>
  );
};

export default LoadingScreen;
