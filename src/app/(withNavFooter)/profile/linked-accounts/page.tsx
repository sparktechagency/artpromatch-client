import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa6';
import { IoLockClosedOutline } from 'react-icons/io5';

const LinkedAccounts = () => {
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Connected Accounts</h1>
      <div className="border rounded-xl p-5 mb-4">
        <div>
          <h1 className="text-xl font-bold  flex justify-start items-center gap-2">
            <IoLockClosedOutline /> Secure Your Account
          </h1>
          <p className="text-secondary">
            Protect your account by managing linked accounts, monitoring
            third-party access, and ensuring your login methods are secure. Stay
            in control of your data and privacy to prevent unauthorized access.
          </p>
        </div>
      </div>
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-2">
          <Image src={AllImages.google} width={50} height={50} alt="logo" />
          <div>
            <h1 className="text-xl font-bold"> Google</h1>
            <p className="text-secondary">Connected on Jan 10, 2024</p>
          </div>
        </div>
        <button
          className="flex justify-center items-center gap-2 border rounded-xl 
         px-4 py-2 text-secondary bg-red-100 border-red-500"
        >
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
};

export default LinkedAccounts;
