import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import Link from 'next/link';

interface ConfirmModalProps {
  handleOk?: () => void;
  handleCancel?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  handleOk,
  handleCancel,
}) => {
  return (
    <div className="flex  flex-col justify-center items-center">
      <Image src={AllImages.checkCircle} width={50} height={50} alt="logo" />

      <h1 className="text-2xl font-bold">Your booking is confirmed!</h1>
      <p className="text-gray-500 my-2">
        We&apos;ve sent the details to your email and notifications. Alex will
        reach out to confirm any additional details.
      </p>

      <div className="flex justify-center items-center gap-5 my-5">
        <Link href="/message">
          <button
            onClick={handleOk}
            className="px-10 py-2 rounded-xl border hover:border-primary hover:text-primary"
          >
            Message Alex
          </button>
        </Link>
        <Link href="/">
          <button
            onClick={handleCancel}
            className="px-10 py-2 rounded-xl border hover:border-primary hover:text-primary"
          >
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmModal;
