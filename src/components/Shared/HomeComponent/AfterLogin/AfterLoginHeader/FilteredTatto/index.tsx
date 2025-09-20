'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Modal, Select } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { FaCalendarDay, FaDollarSign } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import TattoDetailsModal from './TattoDetailsModal';
import Mapview from './Mapview';
import Link from 'next/link';
import { IMeta, IService } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

const FilteredTatto = ({
  page,
  services,
  meta,
}: {
  page: string;
  services: IService[];
  meta: IMeta;
}) => {
  console.log({ services });

  const tattooCategories = [
    ...new Set(services?.flatMap(service => service?.artist?.expertise)),
  ];

  const [selectedTab, setSelectedTab] = useState<string>(tattooCategories[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');

  const filteredServices = services?.filter(service =>
    service?.artist?.expertise.includes(selectedTab)
  );

  const openModal = (id: string) => {
    setSelectedService(services?.find(service => service._id === id) || null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleViewChange = (view: 'list' | 'map') => {
    setView(view);
  };

  const handleCategoryChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="container mx-auto md:my-8">
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
        <Select
          defaultValue={tattooCategories[0]}
          style={{ width: 150 }}
          onChange={handleCategoryChange}
          options={tattooCategories.map(cat => ({ label: cat, value: cat }))}
        />
        <div>
          {tattooCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedTab(category)}
              className={`py-2 px-4 rounded-3xl ${
                selectedTab === category
                  ? 'bg-slate-100 text-primary'
                  : 'hover:bg-slate-50 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="my-8 flex flex-col md:flex-row justify-between items-center">
        <p>
          {filteredServices.length} {selectedTab}
        </p>
        <div className="flex gap-2">
          <div
            onClick={() => handleViewChange('list')}
            className={`py-2 px-6 rounded-2xl ${
              view === 'list'
                ? 'bg-primary text-white'
                : 'border border-primary text-primary'
            }`}
          >
            List View
          </div>
          <div
            onClick={() => handleViewChange('map')}
            className={`py-2 px-6 rounded-2xl ${
              view === 'map'
                ? 'bg-primary text-white'
                : 'border border-primary text-primary'
            }`}
          >
            Map View
          </div>
        </div>
      </div>

      {view === 'list' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredServices.map(service => (
              <div key={service?._id} className="border rounded-xl p-2">
                <Image
                  onClick={() => openModal(service?._id)}
                  src={getCleanImageUrl(service?.thumbnail)}
                  alt={service?.title}
                  height={300}
                  width={500}
                  className="cursor-pointer"
                />
                <div className="flex justify-between items-center my-3">
                  <div className="flex items-center gap-2">
                    <Link href="/profile-page">
                      <Image
                        src={getCleanImageUrl(service?.artist?.auth?.image)}
                        alt={service?.title}
                        height={50}
                        width={50}
                        className="rounded-full h-12 w-12"
                      />
                    </Link>
                    <div>
                      <h1 className="text-xl font-semibold">
                        {service?.title}
                      </h1>
                      <p className="text-xs text-neutral-500">
                        {service?.artist?.stringLocation}
                      </p>
                    </div>
                  </div>
                  <p className="text-secondary">{service?.distance}</p>
                </div>
                <div className="flex justify-between items-center gap-2 mb-5">
                  {service?.artist?.expertise
                    ?.slice(0, 2)
                    ?.map((exp: string, index: number) => (
                      <div
                        key={index}
                        className="bg-neutral-200 px-3 py-2 rounded-3xl font-medium text-sm truncate"
                      >
                        {exp}
                      </div>
                    ))}

                  <div className="text-secondary">
                    +{service?.artist?.expertise?.length - 2}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <FaCalendarDay />
                    <p className="text-xs">{service?.availability}</p>
                  </div>
                  <div className="flex items-center text-primary font-bold">
                    <FaDollarSign />
                    {service?.price}
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-8 flex justify-center items-center">
            <button className="py-2 px-4 border rounded-3xl bg-neutral-100 text-primary font-bold flex justify-center items-center">
              Load More
            </button>
          </div>
        </>
      ) : (
        <Mapview />
      )}

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        centered
        width={800}
      >
        <TattoDetailsModal
          selectedService={selectedService}
          // onClose={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default FilteredTatto;