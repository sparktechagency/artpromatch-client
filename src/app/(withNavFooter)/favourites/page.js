'use client';
import { AllImages } from "@/assets/images/AllImages";
import { Typography } from "antd";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import Link from "next/link";
import { FaCalendarDay, FaDollarSign } from "react-icons/fa6";

const FavouritesPage = () => {
    return (
        <div className="container mx-auto px-2 md:px-0">
            <div className="mb-4 flex flex-col justify-center items-center text-center pt-16 ">
                <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                <h2 className="text-center md:text-6xl font-bold mt-6 mb-2 ">
                    Your Favourite Artists
                </h2>
                <Typography.Text className="md:text-xl text-center text-primary mt-3 md:mb-10 ">
                    Easily revisit and book the artists you love.
                </Typography.Text>
                <div className='flex flex-col md:flex-row justify-center items-center md:gap-5 mb-20'>
                    <Link href="/">
                        <button className='bg-black text-white py-3 px-6 rounded-lg mt-5'>Discover More Artists</button>
                    </Link>
                    <Link href="/">
                        <button className='bg-primary text-white py-3 px-6 rounded-lg mt-5 flex justify-center items-center gap-2'>Book a Guest Spot <IoIosArrowForward /></button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <p>12 Saved Tattoo Artists</p>
                <div className="flex justify-center items-center gap-2 border rounded-3xl px-4 py-1">
                    All Artists
                    <IoIosArrowDown className="h-4 w-4 border rounded-full" />
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10">
            
                <div className="border rounded-xl p-2">

                    <Image src={AllImages.image1} alt="image" height={300} width={500}></Image>


                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image1} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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
                {/* </motion.div> */}

                <div className="border rounded-xl p-2">
                    <Image src={AllImages.image2} alt="image" height={300} width={500}></Image>
                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image2} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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
                <div className="border rounded-xl p-2">
                    <Image src={AllImages.image3} alt="image" height={300} width={500}></Image>
                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image3} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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
                <div className="border rounded-xl p-2">
                    <Image src={AllImages.image4} alt="image" height={300} width={500}></Image>
                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image4} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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
                <div className="border rounded-xl p-2">
                    <Image src={AllImages.image2} alt="image" height={300} width={500}></Image>
                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image2} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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
                <div className="border rounded-xl p-2">
                    <Image src={AllImages.image3} alt="image" height={300} width={500}></Image>
                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image3} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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
                <div className="border rounded-xl p-2">
                    <Image src={AllImages.image4} alt="image" height={300} width={500}></Image>
                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image4} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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
                <div className="border rounded-xl p-2">
                    <Image src={AllImages.image4} alt="image" height={300} width={500}></Image>
                    <div className="flex justify-between items-center my-3">
                        <div className="flex justify-center items-center gap-2">
                            <Image src={AllImages.image4} alt="image" height={50} width={50} className="rounded-full"></Image>
                            <div>
                                <h1 className="text-xl font-semibold">Lora Craft</h1>
                                <p className="text-xs text-neutral-500">New York,USA</p>
                            </div>
                        </div>
                        <p className="text-textSecondary">3.2 miles away</p>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                        <div className="flex gap-5">
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                            <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                        </div>
                        <button className="text-textSecondary">+5</button>
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

export default FavouritesPage;