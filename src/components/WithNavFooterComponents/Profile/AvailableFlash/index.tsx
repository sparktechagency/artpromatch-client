'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
// import { ConfigProvider, Modal } from 'antd';
// import BookingModalOne from '@/components/WithNavFooterComponents/BookingModals/BookingModalOne';
import { IFolder } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

const AvailableFlash = ({
  activeFolders = [],
}: {
  activeFolders: IFolder[];
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        {activeFolders?.map((folder, index) => (
          <div key={index}>
            <h1 className="text-2xl font-bold">{folder.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {folder?.images?.map((image, index) => (
                <div key={index} className="relative group overflow-hidden">
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <Image
                      src={getCleanImageUrl(image)}
                      alt="image"
                      height={500}
                      width={500}
                      className="rounded-sm"
                    />

                    {/* <button
                      onClick={showModal}
                      className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                    >
                      Book Now
                    </button> */}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: 'rgb(47,84,235)',
              defaultHoverColor: 'rgb(47,84,235)',
              defaultBorderColor: 'rgb(47,84,235)',
            },
          },
        }}
      >
      
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <BookingModalOne handleOk={handleOk} handleCancel={handleCancel} />
        </Modal>
      </ConfigProvider> */}
    </div>
  );
};

export default AvailableFlash;
