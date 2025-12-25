'use client';

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, Form, Input, Slider, Steps, Typography } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getLocationName } from '@/services/Service';

export interface LocationType {
  longitude: number;
  latitude: number;
}

const PreferedLocation = () => {
  const [form] = Form.useForm();
  const [role, setRole] = useState<string>('');
  const [stringLocation, setStringLocation] = useState<string>('');
  const [location, setLocation] = useState<LocationType | null>(null);
  const [manualLatitude, setManualLatitude] = useState<string>('');
  const [manualLongitude, setManualLongitude] = useState<string>('');
  const [radius, setRadius] = useState<number>(50);
  const [current, setCurrent] = useState<number>(1);
  const router = useRouter();

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedRole = localStorage.getItem('role');
    if (!savedRole) {
      toast.error('Please select all profile section!');
      router.push('/user-type-selection');
      return;
    } else {
      setRole(savedRole);
    }

    const savedStringLocation = localStorage.getItem('stringLocation');
    const savedLocation = localStorage.getItem('location');
    const savedRadius = localStorage.getItem('radius');

    if (savedStringLocation) {
      setStringLocation(savedStringLocation);
      form.setFieldsValue({ address: savedStringLocation });
    }

    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        setLocation(parsed);
      } catch (e) {
        console.error('Error parsing location', e);
      }
    }

    if (savedRadius) {
      try {
        const parsedRadius = JSON.parse(savedRadius);
        setRadius(parsedRadius);
      } catch (e) {
        console.error('Error parsing radius', e);
      }
    }
  }, [form]);

  useEffect(() => {
    if (!location) return;
    setManualLatitude(location.latitude.toString());
    setManualLongitude(location.longitude.toString());
  }, [location]);

  useEffect(() => {
    if (typeof window === 'undefined' || !location) return;
    localStorage.setItem('location', JSON.stringify(location));
  }, [location]);

  // Use current location button
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords;
        const location = { latitude, longitude };
        setLocation(location);
        const locationName = await getLocationName([latitude, longitude]);
        setStringLocation(locationName);
      },
      err => {
        toast.warning(
          'Failed to get your location. Please allow location access!'
        );
        console.error('Geolocation error:', err.message);
      }
    );
  };

  const handleManualCoordinateChange = (
    value: string,
    coord: 'latitude' | 'longitude'
  ) => {
    if (coord === 'latitude') {
      setManualLatitude(value);
    } else {
      setManualLongitude(value);
    }

    const pendingLat = coord === 'latitude' ? value : manualLatitude;
    const pendingLon = coord === 'longitude' ? value : manualLongitude;

    const parsedLat = parseFloat(pendingLat);
    const parsedLon = parseFloat(pendingLon);

    const isLatValid =
      pendingLat.trim() !== '' &&
      Number.isFinite(parsedLat) &&
      !Number.isNaN(parsedLat);
    const isLonValid =
      pendingLon.trim() !== '' &&
      Number.isFinite(parsedLon) &&
      !Number.isNaN(parsedLon);

    if (isLatValid && isLonValid) {
      setLocation({ latitude: parsedLat, longitude: parsedLon });
    } else {
      setLocation(null);
    }
  };

  // Continue button
  const handleContinue = () => {
    if (role === 'CLIENT') {
      localStorage.setItem('radius', radius.toString());
    }

    localStorage.setItem('stringLocation', stringLocation);
    router.push('/prefered-service');
  };

  return (
    <div className="py-16 md:py-0 h-screen w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-full">
          <Form
            form={form}
            name="select-user-type"
            layout="vertical"
            className="w-full md:w-150 bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                Where do you want to find artists or studios?
              </h2>
              <Typography.Text className="text-center text-base">
                We&apos;ll prioritize results in these areas.
              </Typography.Text>
            </div>

            {/* Use Current Location */}
            <Form.Item>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="flex justify-center items-center gap-2 text-primary border border-primary w-full py-2 rounded-xl"
              >
                <FaLocationArrow />
                {location ? (
                  <p className="text-sm">
                    {location.latitude}, {location.longitude}
                  </p>
                ) : (
                  <p className="text-sm">Use my current location</p>
                )}
              </button>
            </Form.Item>

            {/* Address Input */}
            <Form.Item>
              <Input
                value={stringLocation}
                onChange={e => setStringLocation(e.target.value)}
                placeholder="Enter your address"
                className="text-md"
              />
            </Form.Item>

            {/* Manual Lat/Lon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <Form.Item label="Latitude">
                <Input
                  value={manualLatitude}
                  onChange={e =>
                    handleManualCoordinateChange(e.target.value, 'latitude')
                  }
                  placeholder="e.g. 23.8103"
                  inputMode="decimal"
                />
              </Form.Item>
              <Form.Item label="Longitude">
                <Input
                  value={manualLongitude}
                  onChange={e =>
                    handleManualCoordinateChange(e.target.value, 'longitude')
                  }
                  placeholder="e.g. 90.4125"
                  inputMode="decimal"
                />
              </Form.Item>
            </div>

            {/* Radius Slider */}

            {role === 'CLIENT' && (
              <ConfigProvider
                theme={{
                  components: {
                    Slider: {
                      handleColor: '#6b4f38',
                      trackBg: '#6b4f38',
                      railBg: '#e5e7eb',
                      handleSize: 14,
                    },
                  },
                }}
              >
                <div className="mt-4">
                  <p className="text-gray-700 font-medium">
                    Show results within
                  </p>
                  <Slider
                    value={radius}
                    min={50}
                    max={1000}
                    onChange={val => setRadius(val)}
                    tooltip={{ open: false }}
                  />
                  <div className="flex justify-between text-gray-400 text-sm">
                    <span>50 km</span>
                    <span>1000 km</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 text-center mb-5">
                    Selected radius: {radius} km
                  </p>
                </div>
              </ConfigProvider>
            )}
            {/* Continue Button */}
            <Form.Item className="text-center">
              <button
                disabled={!location || !stringLocation}
                type="button"
                onClick={handleContinue}
                className="bg-primary w-full px-6 py-2 rounded-md"
              >
                <div className="text-lg text-white">Continue</div>
              </button>
            </Form.Item>
          </Form>

          {/* Steps */}
          <Steps
            current={current}
            direction="horizontal"
            size="small"
            items={[
              { title: '', status: 'finish' },
              { title: '', status: current >= 1 ? 'finish' : 'wait' },
              { title: '', status: current >= 2 ? 'finish' : 'wait' },
              { title: '', status: current >= 3 ? 'finish' : 'wait' },
            ]}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferedLocation;
