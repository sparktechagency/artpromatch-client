import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';

type Notification = {
  message: string;
  timeAgo: string;
  img?: string;
};

interface Props {
  notifications?: Notification[];
}

const NotificationModal: React.FC<Props> = ({ notifications = [] }) => {
  return (
    <div>
      <h1 className="text-xl font-bold border-0 border-b pb-2">
        ({notifications.length}) Notifications
      </h1>

      {notifications.length === 0 && (
        <p className="text-gray-500 mt-3">No notifications yet.</p>
      )}

      {notifications.map((notif, index) => (
        <div
          key={index}
          className="flex items-center gap-3 border-0 border-b pb-2 mb-2"
        >
          <Image
            src={notif.img || AllImages.user}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-neutral-600">{notif.message}</h3>
            <p className="text-gray-500 text-sm">{notif.timeAgo}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationModal;
