'use client';

import { Input, Modal, Select } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaDollarSign, FaStar } from 'react-icons/fa6';
import { SiGoogletasks } from 'react-icons/si';
import ServiceDetailsModal from './ServiceDetailsModal';
import Mapview from './Mapview';
import { ExpertiseType, IService } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { toast } from 'sonner';
import { updateClientRadius } from '@/services/Service';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatCount } from '@/lib/formatCount';

type ViewMode = 'list' | 'map';

const ALL = 'All';

const Services = ({ services = [] }: { services: IService[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive filters safely
  const { artistTypes, tattooCategories } = useMemo(() => {
    const types = Array.from(
      new Set(
        services
          .map(s => s?.artist?.type)
          .filter(v => Boolean(v && String(v).trim()))
      )
    );
    const categories = Array.from(
      new Set(
        services
          .flatMap(s => s?.artist?.expertise || [])
          .filter(v => Boolean(v && String(v).trim()))
      )
    );
    return {
      artistTypes: [ALL, ...types],
      tattooCategories: [ALL, ...categories],
    };
  }, [services]);

  // UI state
  const [artistType, setArtistType] = useState<string>(artistTypes[0] ?? ALL);
  const [tattooCategory, setTattooCategory] = useState<string>(
    tattooCategories[0] ?? ALL
  );
  const [isShowServiceModalOpen, setIsShowServiceModalOpen] =
    useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [view, setView] = useState<ViewMode>('list');
  const [isRadiusModalOpen, setIsRadiusModalOpen] = useState<boolean>(false);
  const [radius, setRadius] = useState<string>('');

  // Ensure state stays valid if options recalc
  if (!artistTypes.includes(artistType)) setArtistType(artistTypes[0] ?? ALL);
  if (!tattooCategories.includes(tattooCategory))
    setTattooCategory(tattooCategories[0] ?? ALL);

  useEffect(() => {
    const initialArtistType = searchParams.get('artistType') || ALL;
    const initialTattooCategory = searchParams.get('tattooCategory') || ALL;
    setArtistType(initialArtistType);
    setTattooCategory(initialTattooCategory);
  }, []);

  // Dedup artists for Map view
  const uniqueArtists = useMemo(() => {
    const map = new Map<string, NonNullable<IService['artist']>>();
    for (const s of services) {
      const a = s?.artist;
      if (a?._id) map.set(String(a._id), a);
    }
    return Array.from(map.values());
  }, [services]);

  // Apply both filters consistently
  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const byType = artistType === ALL ? true : s?.artist?.type === artistType;
      const byCategory =
        tattooCategory === ALL
          ? true
          : (s?.artist?.expertise || []).includes(
              tattooCategory as ExpertiseType
            );
      return byType && byCategory;
    });
  }, [services, artistType, tattooCategory]);

  const openShowServiceModal = useCallback(
    (id: string) => {
      setSelectedService(services.find(s => s._id === id) || null);
      setIsShowServiceModalOpen(true);
    },
    [services]
  );

  const handleRadiusUpdate = useCallback(async () => {
    const km = Number(radius);
    if (!Number.isFinite(km) || km <= 0) {
      toast.warning('Please enter a valid radius in km.');
      return;
    }

    try {
      const res = await updateClientRadius(km);
      if (res?.success) toast.success(res.message || 'Radius updated.');
      else toast.error(res?.message || 'Failed to update radius.');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsRadiusModalOpen(false);
    }
  }, [radius]);

  // helper function
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === ALL) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const newUrl = `?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="container mx-auto md:my-8">
      {services.length > 0 ? (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
            <Select
              value={artistType}
              style={{ width: 180 }}
              // onChange={(v: string) => setArtistType(v)}
              onChange={(v: string) => {
                setArtistType(v);
                updateQuery('artistType', v);
              }}
              options={artistTypes.map(t => ({ label: t, value: t }))}
            />
            <div className="flex flex-wrap items-center gap-2">
              {tattooCategories.map(category => (
                <button
                  key={category}
                  type="button"
                  // onClick={() => setTattooCategory(category)}
                  onClick={() => {
                    setTattooCategory(category);
                    updateQuery('tattooCategory', category);
                  }}
                  className={`py-2 px-4 rounded-3xl border ${
                    tattooCategory === category
                      ? 'bg-slate-100 text-primary border-primary'
                      : 'hover:bg-slate-50 hover:text-primary border-transparent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* View toggle + count */}
          <div className="my-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm md:text-base">
              {tattooCategory} ({filteredServices.length})
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setView('list')}
                className={`py-2 px-6 rounded-2xl ${
                  view === 'list'
                    ? 'bg-primary'
                    : 'border border-primary text-primary'
                }`}
              >
                <span className={` ${view === 'list' ? 'text-white' : ''}`}>
                  List View
                </span>
              </button>
              <button
                type="button"
                onClick={() => setView('map')}
                className={`py-2 px-6 rounded-2xl ${
                  view === 'map'
                    ? 'bg-primary text-white'
                    : 'border border-primary text-primary'
                }`}
              >
                <span className={` ${view === 'map' ? 'text-white' : ''}`}>
                  Map View
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          {view === 'list' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredServices.map(service => {
                  const km =
                    ((service?.artist?.distance ?? 0) / 1000).toFixed(2) +
                    ' km';
                  const rating =
                    typeof service?.avgRating === 'number' &&
                    service.avgRating > 0
                      ? service.avgRating.toFixed(1)
                      : null;

                  return (
                    <div key={service._id} className="border rounded-xl p-2">
                      <Image
                        onClick={() => openShowServiceModal(service._id)}
                        src={getCleanImageUrl(service?.thumbnail)}
                        alt={service?.title || 'Service thumbnail'}
                        height={300}
                        width={500}
                        className="cursor-pointer w-full h-60 object-cover rounded-lg"
                      />

                      <div className="flex items-center gap-2">
                        <Link href={`/artist/${service?.artist?._id ?? ''}`}>
                          <Image
                            src={getCleanImageUrl(service?.artist?.auth?.image)}
                            alt={
                              service?.artist?.auth?.fullName ||
                              'Artist profile image'
                            }
                            height={50}
                            width={50}
                            className="rounded-full h-12 w-12 object-cover"
                          />
                        </Link>

                        <div className="py-5">
                          <div className="text-xl font-semibold">
                            {service?.title}
                            <br />
                            <div className="text-sm pb-3 text-primary">
                              by {service?.artist?.auth?.fullName || 'Unknown'}
                            </div>
                          </div>

                          <div className="text-secondary whitespace-nowrap">
                            {km}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-neutral-500">
                        {service?.artist?.stringLocation || '—'}
                      </div>

                      {service?.bodyLocation ? (
                        <div className="bg-neutral-200 w-fit my-5 px-2 py-1 rounded-3xl font-semibold capitalize">
                          {service.bodyLocation}
                        </div>
                      ) : null}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <SiGoogletasks />
                          <span>
                            {formatCount(service?.totalCompletedOrder)} Done
                          </span>
                        </div>

                        {rating && (
                          <div className="flex items-center gap-1 text-amber-600">
                            <FaStar />
                            <span>
                              {Number(rating)?.toFixed(1)} (
                              {service?.totalReviewCount ?? 0})
                            </span>
                          </div>
                        )}

                        <div className="text-primary font-bold">
                          {/* <FaDollarSign /> */}${service?.price ?? 0}/hr
                          {/* <IoIosArrowForward /> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
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

          {/* Update radius trigger */}
          <div className="flex justify-center items-center pt-12">
            <button
              type="button"
              onClick={() => setIsRadiusModalOpen(true)}
              className="mt-4 w-fit py-2 px-4 rounded-lg bg-primary hover:bg-primary/90"
            >
              <span className="text-white">Update Radius</span>
            </button>
          </div>

          {/* Service details modal */}
          <Modal
            open={isShowServiceModalOpen}
            footer={null}
            onCancel={() => setIsShowServiceModalOpen(false)}
            centered
            width={800}
            destroyOnHidden
          >
            <ServiceDetailsModal selectedService={selectedService} />
          </Modal>
        </>
      ) : (
        // Empty state
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
            className="mt-4 py-2 px-4 rounded-lg bg-primary hover:bg-primary/90"
          >
            <span className="text-white">Update Radius</span>
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
        destroyOnHidden
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
              step="any"
              placeholder="Enter radius in km"
              value={radius}
              onChange={e => setRadius(e.target.value)}
              className="mb-4"
              inputMode="decimal"
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
