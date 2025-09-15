import { AudioOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { IoIosAttach } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';

const MainChat = () => {
  return (
    <div>
      <div className="flex flex-col w-full px-4 py-2">
        <p className="text-center text-xs text-gray-500 my-2">
          Mon 9 Dec 12:12 PM
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-end gap-2">
            <Image
              className="w-8 h-8 rounded-full"
              src={AllImages.user}
              alt="User"
            />
            <div className="bg-gray-100 text-gray-900 text-sm px-4 py-2 rounded-lg max-w-xs">
              Hey, this is a demo message text. I'm writing to check the
              responsiveness of this message box
            </div>
          </div>
          <p className="text-xs text-gray-400 pl-10">1:15 PM</p>

          <div className="flex justify-end items-end gap-2">
            <div className="bg-black text-white text-sm px-4 py-2 rounded-lg max-w-xs">
              Hey, This is a demo message text.
            </div>
            <Image
              className="w-8 h-8 rounded-full"
              src={AllImages.user}
              alt="User"
            />
          </div>
          <div className="flex justify-end gap-1 items-center text-xs text-gray-400">
            <span>✔✔</span>
            <p>1:15 PM</p>
          </div>
        </div>

        <div className="flex justify-between items-center border rounded-3xl mt-20 md:mt-80 pt-2 px-4 ">
          <div className="flex items-center gap-2 w-[80%]">
            <BsEmojiSmile />
            <input
              type="text"
              placeholder="Type your message here..."
              className="w-full p-2 text-sm border-none outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <AudioOutlined className="text-gray-500 text-lg cursor-pointer mr-3" />
            <IoIosAttach />
            <button className="bg-primary  text-white px-4 py-1.5 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
