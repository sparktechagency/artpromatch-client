'use client';

import { useState } from 'react';
import { ConfigProvider, Drawer, Tag } from 'antd';
import { FaUsers } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import LeftsideBar from '@/components/WithNavFooterComponents/Profile/Message/LeftsideBar/LeftsideBar';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { SearchOutlined, MoreOutlined } from '@ant-design/icons';

const MessegeLayout = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  return (
    <div className=" container mx-auto px-2 md:h-[80vh] flex flex-col lg:flex-row mb-10 border border-neutral-400">
      <div className="flex lg:hidden justify-start p-2">
        <FaUsers
          className="text-2xl cursor-pointer h-10 w-10"
          onClick={showDrawer}
        />
      </div>

      <div className="hidden lg:block w-[30%] border-r border-neutral-400">
        <LeftsideBar />
      </div>
      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              footerPaddingInline: 0,
              footerPaddingBlock: 0,
              padding: 0,
              paddingLG: 0,
              paddingXS: 30,
            },
          },
        }}
      >
        <Drawer
          title="Chat List"
          placement="left"
          onClose={closeDrawer}
          open={isDrawerVisible}
          width="80%"
          closeIcon={<FaX className="text-black " />}
        >
          <LeftsideBar />
        </Drawer>
      </ConfigProvider>
      {/* Main Chat Area */}
      <div className="w-full lg:w-[70%] p-6">
        <div className="w-full h-[10vh] ">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3 relative">
              <div className="relative">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={AllImages.user}
                  alt="User"
                />
                <div className="h-3 w-3 bg-green-500 rounded-full absolute bottom-0 left-7 border border-white"></div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Demo Name
                </h3>
                <Tag className="text-green-500 bg-transparent border-none p-0 text-xs">
                  Active Now
                </Tag>
              </div>
            </div>

            <div className="flex gap-3 text-gray-500">
              <SearchOutlined className="text-lg cursor-pointer" />
              <MoreOutlined className="text-lg cursor-pointer" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MessegeLayout;
