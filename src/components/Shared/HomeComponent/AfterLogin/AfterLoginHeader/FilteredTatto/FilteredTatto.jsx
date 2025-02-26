import { AllImages } from '@/assets/images/AllImages';
import { Modal, Select } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaCalendarDay, FaChevronLeft, FaChevronRight, FaDollarSign } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import TattoDetailsModal from './TattoDetailsModal';
import Mapview from './Mapview';
import Link from 'next/link';



const FilteredTatto = () => {
    const tattooCategories = [
        "Tattoo Artists", "Neo-Traditional", "Realism", "Black & Grey", "Watercolor",
        "Geometric", "Minimalist", "Tribal", "New School"
    ];
    const artistsData = [
        {
            id: 1,
            name: "Lora Craft",
            location: "New York, USA",
            distance: "3.2 miles away",
            price: "400/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Neo-Traditional"],
            image: AllImages.image2,
        },
        {
            id: 2,
            name: "John Doe",
            location: "Los Angeles, USA",
            distance: "2.8 miles away",
            price: "350/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Realism"],
            image: AllImages.image2,
        },
        {
            id: 3,
            name: "Jane Smith",
            location: "Miami, USA",
            distance: "5.1 miles away",
            price: "500/hr",
            availability: "This Weekend",
            categories: ["Tattoo Artists", "Black & Grey"],
            image: AllImages.image3,
        },
        {
            id: 4,
            name: "Mike Johnson",
            location: "Chicago, USA",
            distance: "4.3 miles away",
            price: "450/hr",
            availability: "Next Month",
            categories: ["Tattoo Artists", "Watercolor"],
            image: AllImages.image4,
        },
        {
            id: 5,
            name: "Lora Craft",
            location: "New York, USA",
            distance: "3.2 miles away",
            price: "400/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Neo-Traditional"],
            image: AllImages.image1,
        },
        {
            id: 6,
            name: "John Doe",
            location: "Los Angeles, USA",
            distance: "2.8 miles away",
            price: "350/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Realism"],
            image: AllImages.image2,
        },
        {
            id: 7,
            name: "Jane Smith",
            location: "Miami, USA",
            distance: "5.1 miles away",
            price: "500/hr",
            availability: "This Weekend",
            categories: ["Tattoo Artists", "Black & Grey"],
            image: AllImages.image3,
        },
        {
            id: 8,
            name: "Mike Johnson",
            location: "Chicago, USA",
            distance: "4.3 miles away",
            price: "450/hr",
            availability: "Next Month",
            categories: ["Tattoo Artists", "Watercolor"],
            image: AllImages.image4,
        },
        {
            id: 9,
            name: "Lora Craft",
            location: "New York, USA",
            distance: "3.2 miles away",
            price: "400/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Neo-Traditional"],
            image: AllImages.image1,
        },
        {
            id: 10,
            name: "John Doe",
            location: "Los Angeles, USA",
            distance: "2.8 miles away",
            price: "350/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Realism"],
            image: AllImages.image2,
        },
        {
            id: 11,
            name: "Jane Smith",
            location: "Miami, USA",
            distance: "5.1 miles away",
            price: "500/hr",
            availability: "This Weekend",
            categories: ["Tattoo Artists", "Black & Grey"],
            image: AllImages.image3,
        },
        {
            id: 12,
            name: "Mike Johnson",
            location: "Chicago, USA",
            distance: "4.3 miles away",
            price: "450/hr",
            availability: "Next Month",
            categories: ["Tattoo Artists", "Watercolor"],
            image: AllImages.image4,
        },
        {
            id: 13,
            name: "Lora Craft",
            location: "New York, USA",
            distance: "3.2 miles away",
            price: "400/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Neo-Traditional"],
            image: AllImages.image1,
        },
        {
            id: 14,
            name: "John Doe",
            location: "Los Angeles, USA",
            distance: "2.8 miles away",
            price: "350/hr",
            availability: "Next Week",
            categories: ["Tattoo Artists", "Realism"],
            image: AllImages.image2,
        },
        {
            id: 15,
            name: "Jane Smith",
            location: "Miami, USA",
            distance: "5.1 miles away",
            price: "500/hr",
            availability: "This Weekend",
            categories: ["Tattoo Artists", "Black & Grey"],
            image: AllImages.image3,
        },
        {
            id: 16,
            name: "Mike Johnson",
            location: "Chicago, USA",
            distance: "4.3 miles away",
            price: "450/hr",
            availability: "Next Month",
            categories: ["Tattoo Artists", "Watercolor"],
            image: AllImages.image4,
        },
    ];
    const images = [AllImages.image1, AllImages.image2, AllImages.image3, AllImages.image4];
    const [selectedTab, setSelectedTab] = useState("Tattoo Artists");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [onClose, setOnClose] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const filteredArtists = artistsData.filter(artist =>
        artist.categories.includes(selectedTab)
    );

    const openModal = (id) => {
        // console.log(id);
        setSelectedArtist(artistsData.find((artist) => artist.id === id));
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [view, setView] = useState('list')

    const handleViewChange = (view) => {
        setView(view);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className='container mx-auto md:my-8'>
            <div className='flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center'>
                <div className=''>
                    <Select
                        defaultValue="Tattoo Artists"
                        style={{
                            width: 150,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'Tattoo Artists',
                                label: 'Tattoo Artists',
                            },
                            {
                                value: 'Piercing Artists',
                                label: 'Piercing Artists',
                            },

                        ]}
                    />
                </div>
                <div>
                    {tattooCategories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedTab(category)}
                            className={`py-2 px-4 rounded-3xl ${selectedTab === category ? 'bg-slate-100 text-primary' : 'hover:bg-slate-50 hover:text-primary'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* <div className='my-8'>
                <div className='flex justify-between items-center'>
                    <p>{filteredArtists.length} {tattooCategories.find(cat => cat === selectedTab)}</p>
                    <div className='flex gap-2'>
                        <button className='py-2 px-6 bg-primary text-white rounded-2xl'>List View</button>
                        <button className='py-2 px-6 border border-primary text-primary rounded-2xl'>Map View</button>
                    </div>
                </div>
            </div> */}
            <div className='my-8'>
                <div className='flex flex-col md:flex-row  justify-between items-center'>
                    <p>{filteredArtists.length} {tattooCategories.find(cat => cat === selectedTab)}</p>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => handleViewChange('list')}
                            className={`py-2 px-6 rounded-2xl ${view === 'list' ? 'bg-primary text-white' : 'border border-primary text-primary'}`}>
                            List View
                        </button>
                        <button
                            onClick={() => handleViewChange('map')}
                            className={`py-2 px-6 rounded-2xl ${view === 'map' ? 'bg-primary text-white' : 'border border-primary text-primary'}`}>
                            Map View
                        </button>
                    </div>
                </div>
            </div>
            {view === 'list' ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {filteredArtists.map((artist) => (
                            <div key={artist.id} className="border rounded-xl p-2">
                                <Image onClick={() => openModal(artist.id)} src={artist.image} alt={artist.name} height={300} width={500} className='cursor-pointer' />

                                <div className="flex justify-between items-center my-3">
                                    <div className="flex items-center gap-2">
                                        <Link href="/profile-page">
                                            <Image src={artist.image} alt={artist.name} height={50} width={50} className="rounded-full" />
                                        </Link>
                                        <div>
                                            <h1 className="text-xl font-semibold">{artist.name}</h1>
                                            <p className="text-xs text-neutral-500">{artist.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-textSecondary">{artist.distance}</p>
                                </div>

                                <div className="flex justify-between items-center gap-2 mb-5">
                                    <div className="flex gap-2">
                                        <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                                        <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                                        <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                                        <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                                    </div>
                                    <button className="text-textSecondary">+5</button>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex gap-1">
                                        <FaCalendarDay />
                                        <p className="text-xs">{artist.availability}</p>
                                    </div>
                                    <div className="flex items-center text-primary font-bold">
                                        <FaDollarSign />
                                        {artist.price}
                                        <IoIosArrowForward />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='my-8 flex justify-center items-center'>
                        <button className='py-2 px-4 border rounded-3xl bg-neutral-100 text-primary font-bold flex justify-center items-center'>
                            Load More
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Replace with actual map component */}
                    <Mapview />
                </div>
            )}
            {/* {
                view === 'list' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredArtists.map((artist) => (
                        <div key={artist.id} className="border rounded-xl p-2">
    
                            <Image onClick={() => openModal(artist.id)} src={artist.image} alt={artist.name} height={300} width={500} className='cursor-pointer' />
    
                            <div className="flex justify-between items-center my-3">
                                <div className="flex items-center gap-2">
                                    <Image src={artist.image} alt={artist.name} height={50} width={50} className="rounded-full" />
                                    <div>
                                        <h1 className="text-xl font-semibold">{artist.name}</h1>
                                        <p className="text-xs text-neutral-500">{artist.location}</p>
                                    </div>
                                </div>
                                <p className="text-textSecondary">{artist.distance}</p>
                            </div>
    
                            <div className="flex justify-between items-center gap-2 mb-5">
                                <div className="flex gap-2">
                                    <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Ear</button>
                                    <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Facial</button>
                                    <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Oral</button>
                                    <button className="bg-neutral-200 px-2 py-1 rounded-3xl font-semibold">Genital</button>
                                </div>
                                <button className="text-textSecondary">+5</button>
                            </div>
    
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                    <FaCalendarDay />
                                    <p className="text-xs">{artist.availability}</p>
                                </div>
                                <div className="flex items-center text-primary font-bold">
                                    <FaDollarSign />
                                    {artist.price}
                                    <IoIosArrowForward />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='my-8 flex justify-center items-center'>
                    <button className='py-2 px-4 border rounded-3xl bg-neutral-100 text-primary font-bold flex justify-center items-center'>Load More</button>
                </div>
                ) :
                    "map view"
            } */}


            <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} centered width={800}>

                <TattoDetailsModal selectedArtist={selectedArtist} onClose={handleCancel} />
            </Modal>
        </div>
    );
};

export default FilteredTatto;
