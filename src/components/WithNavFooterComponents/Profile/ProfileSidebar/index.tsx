// import { LuMessageCircleMore } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { GuestSpot, IService } from '@/types';
import Image from 'next/image';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

type ProfileSideBarProps = {
  artistName: string;
  location: string;
  hourlyRate: number | null;
  phone?: string | null;
  email?: string | null;
  activeGuestSpots: GuestSpot[];
  activeServices: IService[];
};

const ProfileSideBar = ({
  artistName,
  location,
  hourlyRate,
  phone,
  email,
  activeGuestSpots = [],
  activeServices = [],
}: ProfileSideBarProps) => {
  // endDate : "2025-11-27T18:00:00.000Z"
  // endTime : "10:00 pm"
  // location : {coordinates: Array(2), until: '2025-11-27T18:00:00.000Z'}
  // offDays : null
  // startDate : "2025-11-15T18:00:00.000Z"
  // startTime : "9:00 am"
  // _id  : "691864e8dbf4133216044f3c"

  return (
    <div className="container mx-auto">
      <div className="border p-3 rounded-lg mb-5">
        <h1 className="text-xl font-bold mb-2">Guest Spots</h1>
        {activeGuestSpots && activeGuestSpots.length > 0 ? (
          <div className="space-y-3 text-sm">
            {activeGuestSpots.map(guestSpot => {
              const [lat, lng] = guestSpot.location?.coordinates || [];

              const startDateLabel =
                guestSpot.startDate &&
                new Date(guestSpot.startDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
              const endDateLabel =
                guestSpot.endDate &&
                new Date(guestSpot.endDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });

              const dateRangeLabel =
                startDateLabel && endDateLabel
                  ? `${startDateLabel} - ${endDateLabel}`
                  : startDateLabel || endDateLabel || 'Dates not set';

              const timeRangeLabel =
                guestSpot.startTime && guestSpot.endTime
                  ? `${guestSpot.startTime} - ${guestSpot.endTime}`
                  : guestSpot.startTime || guestSpot.endTime || 'Time not set';

              return (
                <div
                  key={guestSpot._id}
                  className="border rounded-md p-3 bg-gray-50 space-y-1"
                >
                  <p className="font-semibold">
                    Guest Spot #{guestSpot._id.slice(-4)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Dates:</span> {dateRangeLabel}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Time:</span> {timeRangeLabel}
                  </p>
                  {lat !== undefined && lng !== undefined && (
                    <p className="text-gray-700">
                      <span className="font-medium">Location (coords):</span>{' '}
                      {lat}, {lng}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No active guest spots right now.
          </p>
        )}
      </div>
      <div className="border p-3 rounded-lg mb-2">
        <h1 className="text-xl font-bold">Services</h1>
        <p className="text-sm font-bold mb-2">
          Hourly Rate
          <span className="font-normal">
            {' '}
            {hourlyRate !== null ? `$${hourlyRate}/hour` : 'N/A'}
          </span>
        </p>

        {activeServices && activeServices.length > 0 ? (
          <div className="space-y-3">
            {activeServices.map(service => (
              <div
                key={service._id}
                className="flex gap-3 p-2 border rounded-md bg-gray-50"
              >
                {service.thumbnail && (
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                    <Image
                      src={getCleanImageUrl(service.thumbnail)}
                      alt={service.title || 'Service thumbnail'}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold line-clamp-1">
                      {service.title}
                    </p>
                    <p className="text-sm font-bold text-primary whitespace-nowrap">
                      ${service.price}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-600">
                    {service.avgRating !== undefined && (
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        <span>
                          {service.avgRating.toFixed
                            ? service.avgRating.toFixed(1)
                            : service.avgRating}
                        </span>
                        {service.totalReviewCount !== undefined && (
                          <span>({service.totalReviewCount} reviews)</span>
                        )}
                      </span>
                    )}
                    {service.totalCompletedOrder !== undefined && (
                      <span>{service.totalCompletedOrder} completed</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-600">
                    {service.bodyLocation && (
                      <span className="px-2 py-0.5 rounded-full bg-white border">
                        {service.bodyLocation}
                      </span>
                    )}
                    {service.sessionType && (
                      <span className="px-2 py-0.5 rounded-full bg-white border">
                        {service.sessionType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-1">
            No active services right now.
          </p>
        )}
        {/* <p className="text-sm font-bold">
          Day Rate<span className="font-normal"> $1000</span>
        </p> */}
        {/* <p className="text-sm font-bold">
          Consultations
          <span className="font-normal">
            {' '}
            $50 (deductible from final price)
          </span>
        </p> */}
      </div>
      <div className="border p-3 rounded-lg mb-2">
        <h1 className="text-xl font-bold">Contact {artistName}</h1>

        {/* <div className="flex gap-2 text-sm">
          <LuMessageCircleMore className="h-6 w-6 text-primary" />
          <div className="font-normal">
            <p className="font-bold">Direct Message</p>
            <p>Usually replies in a few minutes</p>
          </div>
        </div> */}

        <div className="flex gap-2 text-sm">
          <IoLocationOutline className="h-6 w-6 text-primary" />
          <div className="font-normal">
            <p className="font-bold">Location</p>
            <p>{location}</p>
          </div>
        </div>

        {phone && (
          <p className="text-sm font-bold flex gap-2">
            <FiPhone className="h-6 w-6 text-primary" />
            Phone
            <span className="font-normal">{phone}</span>
          </p>
        )}

        {email && (
          <p className="text-sm font-bold flex gap-2">
            <MdOutlineEmail className="h-6 w-6 text-primary" />
            Email
            <span className="font-normal">{email}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileSideBar;
