import { AllImages } from '@/assets/images/AllImages';
import { Form } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const PreferenceSelection = async ({
  searchParams,
}: {
  searchParams: Promise<{ role: string }>;
}) => {
  const query = await searchParams;
  const { role } = query;

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
      <div className="pt-32 pb-16">
        <div className="">
          <div className="w-[450px]">
            <Form
              name="select-user-type"
              initialValues={{ remember: true }}
              layout="vertical"
              className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
            >
              <div className="mb-4 flex flex-col justify-center items-center text-center">
                <Image src={AllImages.logo} width={50} height={50} alt="logo" />
                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                  Let&apos;s Personalize Your Experience!
                </h2>
                <div className="text-center text-base">
                  Tell us what you&apos;re looking for so we can tailor
                  recommendations just for you.
                </div>
              </div>
              <Link href="/preferences">
                <button className="w-full bg-primary py-2 rounded-lg mt-5 text-center">
                  <div className="text-lg text-white">Get Started</div>
                </button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceSelection;
