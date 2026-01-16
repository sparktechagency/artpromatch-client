import Link from 'next/link';
import { BiCheck } from 'react-icons/bi';
import styles from './success.module.css';

// Confetti
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 });

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[1000]">
      {confettiPieces.map((_, index) => (
        <div
          key={index}
          className={`absolute w-2.5 h-2.5 -top-2.5 opacity-0 ${styles.confetti}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

// SuccessPageContent
const SuccessPageContent = ({ message }: { message: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7b5859] to-[#764ba2] relative overflow-hidden p-5">
      <Confetti />

      {/* Animated gradient overlay */}
      <div
        className={`absolute inset-0 ${styles.gradientShift}`}
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 w-full max-w-[500px]">
        <div
          className={`bg-white/95 backdrop-blur-xl rounded-3xl px-10 py-12 sm:px-6 sm:py-8 shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.1)] ${styles.cardSlideIn}`}
        >
          {/* Animated Success Icon */}
          <div className="flex justify-center mb-8">
            <div
              className={`relative w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center ${styles.iconPop}`}
            >
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 ${styles.pulseRing}`}
              ></div>
              <BiCheck className="w-20 h-20 sm:w-16 sm:h-16 text-white relative z-[1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h1
              className={`text-[32px] sm:text-2xl font-extrabold bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 ${styles.slideUp1}`}
            >
              {message || 'Payment Successful!'}
            </h1>
            <p
              className={`text-base sm:text-sm text-gray-500 leading-relaxed mb-8 ${styles.slideUp2}`}
            >
              Thank you for your purchase! Your payment has been processed
              successfully. We&apos;re excited to have you on board!
            </p>

            {/* Details Card */}
            <div
              className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 ${styles.slideUp3}`}
            >
              <div className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                  ✓
                </div>
                <div className="flex-1 text-left">
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Status
                  </div>
                  <div className="text-base text-gray-800 font-semibold mt-0.5">
                    Confirmed
                  </div>
                </div>
              </div>
              {/* <div className="flex items-center gap-4 py-3 border-t border-gray-200">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                  📧
                </div>
                <div className="flex-1 text-left">
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Confirmation
                  </div>
                  <div className="text-base text-gray-800 font-semibold mt-0.5">
                    Sent to your email
                  </div>
                </div>
              </div> */}
            </div>

            {/* Action Button */}
            <Link
              href="/"
              className={`inline-flex items-center gap-2 bg-gradient-to-br from-[#7b5859] to-[#764ba2] text-white px-8 py-4 rounded-xl text-base font-semibold no-underline transition-all duration-300 shadow-[0_4px_16px_rgba(102,126,234,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(102,126,234,0.5)] active:translate-y-0 ${styles.slideUp4}`}
            >
              <span>Continue to Dashboard</span>
              <svg
                className="transition-transform duration-300 group-hover:translate-x-1"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessPage = async () => {
  return <SuccessPageContent message={'Payment Successful!'} />;
};

export default SuccessPage;
