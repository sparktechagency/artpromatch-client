'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { BiX, BiHomeAlt, BiRefresh } from 'react-icons/bi';

const CancelPage = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 90,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-gray-100 to-rose-50 relative overflow-hidden p-5">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-200/40 to-orange-200/40 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -60, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
            delay: 2,
          }}
          className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-red-200/40 to-pink-200/40 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 ring-1 ring-rose-100/50">
          {/* Icon Section */}
          <div className="flex justify-center mb-8">
            <motion.div
              className="relative"
              whileHover="hover"
              initial="hidden"
              animate="visible"
            >
              <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse" />
              <motion.div
                variants={iconVariants}
                className="relative w-24 h-24 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30"
              >
                <BiX className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="text-center space-y-4 mb-10">
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 tracking-tight"
            >
              Booking Cancelled
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-lg leading-relaxed"
            >
              Your payment process was cancelled. No charges were made to your
              account.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="block group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 !text-white rounded-xl font-semibold shadow-lg shadow-gray-900/20 transition-all flex items-center justify-center gap-2"
              >
                <BiRefresh className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Try Booking Again
              </motion.div>
            </Link>

            {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="flex justify-center items-center gap-4 mt-12">
              <Link href="/" className="block">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(243, 244, 246, 1)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <BiHomeAlt className="w-5 h-5" />
                  Home
                </motion.div>
              </Link>

              {/* <Link href="/contact" className="block">
                <motion.div
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(243, 244, 246, 1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                >
                  <BiSupport className="w-5 h-5" />
                  Support
                </motion.div>
              </Link> */}
            </div>
          </motion.div>

          {/* Footer Note */}
          {/* <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-gray-100 text-center"
          >
            <p className="text-sm text-gray-400">
              Have questions? <Link href="/contact" className="text-rose-500 hover:text-rose-600 font-medium hover:underline">Contact our support team</Link>
            </p>
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default CancelPage;
