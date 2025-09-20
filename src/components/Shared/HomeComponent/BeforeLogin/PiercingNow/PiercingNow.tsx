import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import { FaCalendarDay, FaDollarSign } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const PiercingNow = () => {
  return (
    <div className="container mx-auto md:mt-20">
      <div className="flex justify-between items-center">
        <h1>
          <div className="text-2xl font-bold">Featured Tattoo Artists</div>
        </h1>
        <div className="flex justify-center items-center gap-5">
          <IoIosArrowBack className="h-8 w-8 border rounded-full" />
          <IoIosArrowForward className="h-8 w-8 border rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="border rounded-xl border-gray-300/50 p-2">
          <Image src={AllImages.image5} alt="image" height={300} width={500} />
          <div className="flex justify-between items-center my-3">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={AllImages.image5}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
            <p className="text-secondary">3.2 miles away</p>
          </div>
          <div className="flex justify-between items-center gap-2 mb-5">
            <div className="flex gap-5">
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Ear
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Facial
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Oral
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Genital
              </button>
            </div>
            <button className="text-secondary">+5</button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex  gap-1">
              <FaCalendarDay />
              <p className="text-xs">Next Week</p>
            </div>
            <div className="flex justify-center items-center text-primary font-bold">
              <FaDollarSign />
              400/ hr
              <IoIosArrowForward className="" />
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-300/50 p-2">
          <Image src={AllImages.image6} alt="image" height={300} width={500} />
          <div className="flex justify-between items-center my-3">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={AllImages.image6}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
            <p className="text-secondary">3.2 miles away</p>
          </div>
          <div className="flex justify-between items-center gap-2 mb-5">
            <div className="flex gap-5">
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Ear
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Facial
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Oral
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Genital
              </button>
            </div>
            <button className="text-secondary">+5</button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex  gap-1">
              <FaCalendarDay />
              <p className="text-xs">Next Week</p>
            </div>
            <div className="flex justify-center items-center text-primary font-bold">
              <FaDollarSign />
              400/ hr
              <IoIosArrowForward className="" />
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-300/50 p-2">
          <Image src={AllImages.image7} alt="image" height={300} width={500} />
          <div className="flex justify-between items-center my-3">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={AllImages.image7}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
            <p className="text-secondary">3.2 miles away</p>
          </div>
          <div className="flex justify-between items-center gap-2 mb-5">
            <div className="flex gap-5">
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Ear
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Facial
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Oral
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Genital
              </button>
            </div>
            <button className="text-secondary">+5</button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex  gap-1">
              <FaCalendarDay />
              <p className="text-xs">Next Week</p>
            </div>
            <div className="flex justify-center items-center text-primary font-bold">
              <FaDollarSign />
              400/ hr
              <IoIosArrowForward className="" />
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-300/50 p-2">
          <Image src={AllImages.image3} alt="image" height={300} width={500} />
          <div className="flex justify-between items-center my-3">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={AllImages.image3}
                alt="image"
                height={50}
                width={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-xl font-semibold">Lora Craft</h1>
                <p className="text-xs text-neutral-500">New York,USA</p>
              </div>
            </div>
            <p className="text-secondary">3.2 miles away</p>
          </div>
          <div className="flex justify-between items-center gap-2 mb-5">
            <div className="flex gap-5">
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Ear
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Facial
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Oral
              </button>
              <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">
                Genital
              </button>
            </div>
            <button className="text-secondary">+5</button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex  gap-1">
              <FaCalendarDay />
              <p className="text-xs">Next Week</p>
            </div>
            <div className="flex justify-center items-center text-primary font-bold">
              <FaDollarSign />
              400/ hr
              <IoIosArrowForward className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PiercingNow;
