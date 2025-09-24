'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Input, Modal, Select } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { FaCalendarDay, FaDollarSign, FaStar } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import TattoDetailsModal from './TattoDetailsModal';
import Mapview from './Mapview';
import Link from 'next/link';
import { IMeta, IService } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { toast } from 'sonner';
import { updateClientRadius } from '@/services/Service';

const Services = ({
  page,
  services = [],
  meta,
}: {
  page: string;
  services: IService[];
  meta: IMeta;
}) => {
  const tattooCategories = [
    ...new Set(services?.flatMap(service => service?.artist?.expertise)),
  ];

  const [selectedTab, setSelectedTab] = useState<string>(tattooCategories[0]);
  const [isShowServiceModalOpen, setIsShowServiceModalOpen] =
    useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [isRadiusModalOpen, setIsRadiusModalOpen] = useState<boolean>(false);
  const [radius, setRadius] = useState<string>('');

  const filteredServices = services?.filter(service =>
    service?.artist?.expertise.includes(selectedTab)
  );

  const openShowServiceModal = (id: string) => {
    setSelectedService(services?.find(service => service._id === id) || null);
    setIsShowServiceModalOpen(true);
  };

  const handleShowServiceCancel = () => {
    setIsShowServiceModalOpen(false);
  };

  const handleViewChange = (view: 'list' | 'map') => {
    setView(view);
  };

  const uniqueArtistsMap = new Map();

  services?.forEach(service => {
    if (service.artist?._id) {
      uniqueArtistsMap.set(service.artist._id.toString(), service.artist);
    }
  });

  const uniqueArtists = Array.from(uniqueArtistsMap.values());

  const handleRadiusUpdate = async () => {
    if (!radius) {
      toast.warning('Please enter the radius!');
      return;
    }

    try {
      const res = await updateClientRadius(radius);
      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsRadiusModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto md:my-8">
      {services?.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
            <Select
              value={selectedTab}
              style={{ width: 150 }}
              onChange={(value: string) => {
                setSelectedTab(value);
              }}
              options={tattooCategories.map(cat => ({
                label: cat,
                value: cat,
              }))}
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

              {/* <div className="py-2 px-4 rounded-3xl bg-slate-100 text-primary">
            {selectedTab}
          </div> */}
            </div>
          </div>

          <div className="my-8 flex flex-col md:flex-row justify-between items-center">
            <p>
              {filteredServices?.length} {selectedTab}
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
                {filteredServices?.map(service => (
                  <div key={service?._id} className="border rounded-xl p-2">
                    <Image
                      onClick={() => openShowServiceModal(service?._id)}
                      src={getCleanImageUrl(service?.thumbnail)}
                      alt={service?.title}
                      height={300}
                      width={500}
                      className="cursor-pointer w-full h-60 object-cover rounded-lg"
                    />

                    <div className="flex items-center gap-2">
                      <Link href={`/artist/${service?.artist?._id}`}>
                        <Image
                          src={getCleanImageUrl(service?.artist?.auth?.image)}
                          alt={service?.title}
                          height={50}
                          width={50}
                          className="rounded-full h-12 w-12"
                        />
                      </Link>

                      <div className="py-5">
                        <h1 className="text-xl font-semibold">
                          {service?.title}
                        </h1>
                        <div className="text-secondary whitespace-nowrap">
                          {(service?.artist?.distance ?? 0 / 1000).toFixed(2) ||
                            0}{' '}
                          km
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {service?.artist?.stringLocation}
                    </div>

                    <div className="flex justify-between items-center gap-2 my-5">
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
                        {service?.artist?.totalCompletedService}
                      </div>
                      {service?.artist?.avgRating > 0 && (
                        <div className="flex gap-1 text-amber-600">
                          <FaStar />
                          {service?.artist?.avgRating}
                          <IoIosArrowForward />
                        </div>
                      )}

                      <div className="flex items-center text-primary font-bold">
                        <FaDollarSign />
                        {service?.price}
                        <IoIosArrowForward />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="my-8 flex justify-center items-center">
            <button className="py-2 px-4 border rounded-3xl bg-neutral-100 text-primary font-bold flex justify-center items-center">
              Load More
            </button>
          </div> */}
            </>
          ) : (
            <Mapview artists={uniqueArtists} />
          )}

          <div className="flex justify-center items-center pt-12">
            <div
              onClick={() => setIsRadiusModalOpen(true)}
              className="mt-4 w-fit py-2 px-4 rounded-lg bg-primary text-white hover:bg-primary/90"
            >
              Update Radius
            </div>
          </div>

          <Modal
            open={isShowServiceModalOpen}
            footer={null}
            onCancel={handleShowServiceCancel}
            centered
            width={800}
          >
            <TattoDetailsModal selectedService={selectedService} />
          </Modal>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376a9.001 9.001 0 1115.303 0M15 19.128A9.001 9.001 0 116 19.128"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-700">
            No Service Found
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Sorry! We couldn&apos;t find any service in your selected radius.
          </p>
          <div
            onClick={() => setIsRadiusModalOpen(true)}
            className="mt-4 py-2 px-4 rounded-lg bg-primary text-white hover:bg-primary/90"
          >
            Update Radius
          </div>
        </div>
      )}

      {/* Radius Update Modal */}
      <Modal
        open={isRadiusModalOpen}
        footer={null}
        onCancel={() => setIsRadiusModalOpen(false)}
        centered
        width={500}
      >
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-4">
            Update Your Radius (in km)
          </h2>

          <form
            onSubmit={e => {
              e.preventDefault();
              handleRadiusUpdate();
            }}
          >
            <Input
              type="number"
              min={1}
              placeholder="Enter radius in km"
              value={radius}
              onChange={e => setRadius(e.target.value)}
              className="mb-4"
            />

            <div className="mt-5">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary rounded-lg hover:bg-primary/90 text-center"
              >
                <span className="text-white">Save </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Services;
