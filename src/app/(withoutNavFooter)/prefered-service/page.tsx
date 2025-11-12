'use client';

import { AllImages } from '@/assets/images/AllImages';
import {
  daysOfWeek,
  expertiseServicesList,
  lookingForServicesList,
  offeredServicesList,
} from '@/constants';
import { Checkbox, Form, Steps, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface OperatingHour {
  start: string | null;
  end: string | null;
}

interface OperatingHours {
  [day: string]: OperatingHour[];
}

const PreferdService = () => {
  const [role, setRole] = useState<string | null>(null);

  // client part
  const [lookingForServices, setLookingForServices] = useState<string[]>([]);

  // artist part
  const [expertises, setExpertises] = useState<string[]>([]);

  // business part
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [operatingHours, setOperatingHours] = useState<any>({});

  const [current, setCurrent] = useState<number>(2);
  const router = useRouter();

  // Load saved services on mount
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

    // client part
    const savedLookingFor = localStorage.getItem('lookingFor');
    if (savedLookingFor) {
      try {
        setLookingForServices(JSON.parse(savedLookingFor));
      } catch (error) {
        console.error('Error parsing lookingFor', error);
      }
    }

    // artist part
    const savedExpertises = localStorage.getItem('expertise');
    if (savedExpertises) {
      try {
        setExpertises(JSON.parse(savedExpertises));
      } catch (error) {
        console.error('Error parsing expertise', error);
      }
    }

    // business part
    const servicesOffered = localStorage.getItem('servicesOffered');
    if (servicesOffered) {
      try {
        setServicesOffered(JSON.parse(servicesOffered));
      } catch (error) {
        console.error('Error parsing servicesOffered', error);
      }
    }

    const operatingHours = localStorage.getItem('operatingHours');
    if (operatingHours) {
      try {
        setOperatingHours(JSON.parse(operatingHours));
      } catch (error) {
        console.error('Error parsing operatingHours', error);
      }
    }
  }, []);

  // const handleServiceChange = (newService: string) => {
  //   const updated = selectedServices.includes(newService)
  //     ? selectedServices.filter(service => service !== newService)
  //     : [...selectedServices, newService];

  //   setSelectedServices(updated);
  //   localStorage.setItem('lookingFor', JSON.stringify(updated));
  // };

  // handleLookingForChange
  const handleLookingForChange = (service: string) => {
    setLookingForServices(prev => {
      const updated = prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service];

      // save immediately
      localStorage.setItem('lookingFor', JSON.stringify(updated));
      return updated;
    });
  };

  // handleExpertiseChange
  const handleExpertiseChange = (service: string) => {
    setExpertises(prev => {
      const updated = prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service];

      // save immediately
      localStorage.setItem('expertise', JSON.stringify(updated));
      return updated;
    });
  };

  // handleOfferedServicesChange
  const handleOfferedServicesChange = (service: string) => {
    setServicesOffered(prev => {
      const updated = prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service];

      // save immediately
      localStorage.setItem('servicesOffered', JSON.stringify(updated));
      return updated;
    });
  };

  // business part
  const handleTimeChange = (day: string, type: 'start' | 'end', value: any) => {
    setOperatingHours((prev: OperatingHours) => {
      const updated = {
        ...prev,
        [day]: [
          {
            ...(prev[day]?.[0] || {}),
            [type]: value ? value.format('HH:mm') : null,
          },
        ],
      };

      localStorage.setItem('operatingHours', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[600px]">
          <Form
            name="select-user-type"
            layout="vertical"
            className="mb-10 w-full md:w-[600px] bg-white px-2 rounded-2xl"
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                What{' '}
                {role === 'CLIENT'
                  ? 'services are you looking for'
                  : role === 'ARTIST'
                  ? 'expertises do you have'
                  : role === 'BUSINESS'
                  ? 'type of business do you have'
                  : ''}
                ?
              </h2>
              <Typography.Text className="text-center text-base">
                Select all that apply.
              </Typography.Text>
            </div>

            {/* Services checkboxes */}
            {role === 'CLIENT' ? (
              <div className="flex justify-center items-start gap-20">
                <div className="flex flex-col gap-2">
                  {lookingForServicesList.slice(0, 3).map(service => (
                    <Checkbox
                      key={service}
                      checked={lookingForServices.includes(service)}
                      onChange={() => handleLookingForChange(service)}
                    >
                      {service}
                    </Checkbox>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {lookingForServicesList.slice(3).map(service => (
                    <Checkbox
                      key={service}
                      checked={lookingForServices.includes(service)}
                      onChange={() => handleLookingForChange(service)}
                    >
                      {service}
                    </Checkbox>
                  ))}
                </div>
              </div>
            ) : role === 'ARTIST' ? (
              <div className="flex justify-center items-start gap-20">
                <div className="flex flex-col gap-2">
                  {expertiseServicesList?.slice(0, 14)?.map(service => (
                    <Checkbox
                      className="truncate"
                      key={service}
                      checked={expertises.includes(service)}
                      onChange={() => handleExpertiseChange(service)}
                    >
                      {service}
                    </Checkbox>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {expertiseServicesList?.slice(14, 28)?.map(service => (
                    <Checkbox
                      className="truncate"
                      key={service}
                      checked={expertises.includes(service)}
                      onChange={() => handleExpertiseChange(service)}
                    >
                      {service}
                    </Checkbox>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {expertiseServicesList?.slice(28, 42)?.map(service => (
                    <Checkbox
                      className="truncate"
                      key={service}
                      checked={expertises.includes(service)}
                      onChange={() => handleExpertiseChange(service)}
                    >
                      {service}
                    </Checkbox>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {expertiseServicesList?.slice(42)?.map(service => (
                    <Checkbox
                      className="truncate"
                      key={service}
                      checked={expertises.includes(service)}
                      onChange={() => handleExpertiseChange(service)}
                    >
                      {service}
                    </Checkbox>
                  ))}
                </div>
              </div>
            ) : role === 'BUSINESS' ? (
              <div className="flex flex-col gap-10">
                {/* Services Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Services Offered
                  </h3>
                  <div className="flex justify-center items-start gap-20">
                    <div className="flex flex-col gap-2">
                      {offeredServicesList.slice(0, 2).map(service => (
                        <Checkbox
                          key={service}
                          checked={servicesOffered.includes(service)}
                          onChange={() => handleOfferedServicesChange(service)}
                        >
                          {service}
                        </Checkbox>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      {offeredServicesList.slice(2).map(service => (
                        <Checkbox
                          key={service}
                          checked={servicesOffered.includes(service)}
                          onChange={() => handleOfferedServicesChange(service)}
                        >
                          {service}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Operating Hours Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Operating Hours
                  </h3>
                  <div className="flex flex-col gap-3">
                    {daysOfWeek.map(day => (
                      <div key={day} className="flex items-center gap-2">
                        <span className="w-24">{day}:</span>
                        <TimePicker
                          format="HH:mm"
                          value={
                            operatingHours[day]?.[0]?.start
                              ? dayjs(operatingHours[day][0].start, 'HH:mm')
                              : null
                          }
                          onChange={value =>
                            handleTimeChange(day, 'start', value)
                          }
                          placeholder="Start"
                        />
                        <TimePicker
                          format="HH:mm"
                          value={
                            operatingHours[day]?.[0]?.end
                              ? dayjs(operatingHours[day][0].end, 'HH:mm')
                              : null
                          }
                          onChange={value =>
                            handleTimeChange(day, 'end', value)
                          }
                          placeholder="End"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Continue button */}
            <Link href="/stay-updated">
              <div className="w-full bg-primary text-lg text-white text-center py-2 rounded-lg mt-5 mb-10">
                Get Started
              </div>
            </Link>
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

export default PreferdService;
