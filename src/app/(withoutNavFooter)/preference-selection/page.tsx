import { AllImages } from '@/assets/images/AllImages';
import { Form } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const PreferenceSelection = async () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Form className="rounded-[32px] bg-white px-8 py-10 text-center ">
          <div className="flex flex-col items-center space-y-4">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-[#2c1f1f]">
                Let&apos;s Personalize Your Experience!
              </h2>
              <p className="text-base text-[#7e6d6e]">
                Tell us what you&apos;re looking for so we can tailor
                recommendations just for you.
              </p>
            </div>
          </div>
          <Link href="/preferences">
            <button className="mt-8 w-full rounded-2xl bg-[#7b5859] py-3 text-base font-semibold text-white transition hover:bg-[#6a4a4b] cursor-pointer">
              Get Started
            </button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default PreferenceSelection;
