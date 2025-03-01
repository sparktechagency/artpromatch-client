import { AllImages } from "@/assets/images/AllImages";
import { Dropdown, Typography } from "antd";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

const AfterLoginHeader = () => {
  const onSearch = (value) => {
    console.log("Search input: ", value);
  };
  const items = [
    {
      key: "1",
      label: (
        <Link target="_blank" rel="noopener noreferrer" href="">
          Current Location
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link target="_blank" rel="noopener noreferrer" href="">
          Chnage Location
        </Link>
      ),
    },
  ];
  return (
    <div>
      <div className="mb-4 flex flex-col justify-center items-center text-center pt-16 ">
        <Image src={AllImages.logo} width={50} height={50} alt="logo"></Image>
        <h2 className="text-center md:text-6xl font-bold mt-6 mb-2 ">
          Discover Artists and Studios <br /> Near You
        </h2>
        <Typography.Text className="md:text-xl text-center text-primary mt-3 mb-10 ">
          Discover tattoo artists, piercers, and studios tailored to <br /> your
          preferences.
        </Typography.Text>
        <div className="bg-slate-100 rounded-3xl p-1 flex justify-center items-center gap-3">
          <IoLocationOutline className="h-5 w-5 text-primary" />
          <h4 className="text-sm">
            118-06 Atlantic Ave, South Richmond Hill, New York
          </h4>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
          >
            <IoIosArrowDown className="h-5 w-5 text-primary" />
          </Dropdown>
        </div>
        <div className="mt-2 md:mt-5 md:w-[650px] border rounded-lg p-2 flex justify-between items-center">
          <div>
            <p className="text-sm text-primary">
              Search for tattoo artists, piercers and studios
            </p>
          </div>
          <div className="bg-primary h-8 w-8 rounded-xl flex justify-center items-center">
            <CiSearch className="text-white h-5 w-5 font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLoginHeader;
