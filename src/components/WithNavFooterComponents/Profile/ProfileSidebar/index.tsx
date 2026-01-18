// import { LuMessageCircleMore } from 'react-icons/lu';
import { IoLocationOutline } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { GuestSpot } from '@/types';
import { LuMessageCircleMore } from 'react-icons/lu';

type ProfileSideBarProps = {
  artistName: string;
  location: string;
  hourlyRate: number | null;
  dayRate: number | null;
  consultationFee: number | null;
  phone?: string | null;
  email?: string | null;
  activeGuestSpots: GuestSpot[];
};

const ProfileSideBar = ({
  artistName,
  location,
  hourlyRate,
  dayRate,
  consultationFee,
  phone,
  email,
  activeGuestSpots = [],
}: ProfileSideBarProps) => {
  return (
    <div className="container mx-auto">
      <div className="border border-gray-400/50 p-3 rounded-lg mb-5">
        <h1 className="text-xl font-bold mb-2">Guest Spots</h1>
        {activeGuestSpots && activeGuestSpots.length > 0 ? (
          <div className="space-y-3 text-sm">
            {activeGuestSpots.map(guestSpot => {
              const startDateLabel =
                guestSpot.startDate &&
                new Date(guestSpot.startDate).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  timeZone: 'UTC',
                  year: 'numeric',
                });
              const endDateLabel =
                guestSpot.endDate &&
                new Date(guestSpot.endDate).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  timeZone: 'UTC',
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
                  className="border border-gray-400/50 rounded-md p-3 bg-gray-50 space-y-1"
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
                  {guestSpot.stringLocation && (
                    <p className="text-gray-700">
                      <span className="font-medium">Location:</span>{' '}
                      {guestSpot.stringLocation}
                    </p>
                  )}

                  {Array.isArray(guestSpot.offDays) &&
                    guestSpot.offDays.length > 0 && (
                      <div className="pt-1">
                        <p className="text-gray-700">
                          <span className="font-medium">Off days:</span>
                        </p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {guestSpot.offDays.map((day: string) => (
                            <span
                              key={day}
                              className="rounded-full bg-white border px-2.5 py-1 text-[11px] font-medium text-gray-700 capitalize"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
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
      <div className="border border-gray-400/50 p-3 rounded-lg mb-2">
        <h1 className="text-xl font-bold">Services</h1>
        <p className="text-sm font-bold mb-2">
          Hourly Rate:
          <span className="font-normal">
            {' '}
            {hourlyRate !== null ? `$${hourlyRate}/hour` : 'N/A'}
          </span>
        </p>
        <p className="text-sm font-bold mb-2">
          Day Rate:
          <span className="font-normal">
            {' '}
            {dayRate !== null ? `$${dayRate}/day` : 'N/A'}
          </span>
        </p>
        <p className="text-sm font-bold mb-2">
          Consultation Fee:
          <span className="font-normal">
            {' '}
            {consultationFee !== null ? `$${consultationFee}` : 'N/A'}
          </span>
        </p>
      </div>

      <div className="border border-gray-400/50 p-3 rounded-lg mb-2">
        <h1 className="text-xl font-bold">Contact {artistName}</h1>
        <div className="flex gap-2 text-sm">
          <LuMessageCircleMore className="h-6 w-6 text-primary" />
          <div className="font-normal">
            <p className="font-bold">Direct Message</p>
            <p>Usually replies in a few minutes</p>
          </div>
        </div>

        {location && (
          <div className="flex gap-2 text-sm">
            <IoLocationOutline className="h-6 w-6 text-primary" />
            <div className="font-normal">
              <p className="font-bold">Studio Address</p>
              <p>{location}</p>
            </div>
          </div>
        )}

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
