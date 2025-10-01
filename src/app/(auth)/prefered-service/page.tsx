'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Checkbox, Form, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const lookingForServices: string[] = [
  'Tattoos',
  'Custom Designs',
  'Touch-ups',
  'Piercings',
  'Cover-ups',
  'Guest Spots',
];

const expertiseServices: string[] = [
  'American Traditional',
  'Abstract',
  'African',
  'Anime',

  'Black & Grey',
  'Blackwork',
  'Brutal Blackwork',
  'Blackout',
  'Black Trash',
  'Biomech',
  'Botanical',

  'Chicano',
  'Coverups',
  'Comic',
  'Calligraphy',

  'Dotwork',

  'Fine Line',
  'Freckles',

  'Geometric',
  'Graphic',

  'Heavy Blackwork',

  'Illustrative',
  'Irezumi',
  'Ignorant',

  'Japanese Style',

  'Lettering',
  'Lineart',

  'Minimalist',
  'Microblading',
  'Microrealism',
  'Maori',

  'Neo Traditional',
  'New School',
  'Native American',
  'Neo Tribal',

  'Ornamental',
  'Old School',

  'Pacific Islander/Polynesian',
  'Portrait',

  'Realism',
  'Realistic Color',
  'Black & Grey',

  'Stick and Poke',
  'Scar Coverup',
  'Script',

  'Tribal',
  'Traditional',
  'Tatau',
  'Thai',
  'Tattoo Removal',
  'Tooth Gems',
  'Tebori',
  'Trash Polka',

  'White On Black',
  'White Tattoos',
  'Watercolor',
];

const PreferdService: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [selectedLookingForServices, setSelectedLookingForServices] = useState<
    string[]
  >([]);
  const [expertises, setExpertises] = useState<string[]>([]);
  const [current, setCurrent] = useState<number>(2);
  const router = useRouter();

  // Load saved services on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedRole = localStorage.getItem('role');
    if (!savedRole) {
      try {
        router.push('/user-type-selection');
        return;
      } catch (error) {
        console.error('Error parsing role', error);
      }
    } else {
      setRole(savedRole);
    }

    const savedLookingFor = localStorage.getItem('lookingFor');
    const savedExpertises = localStorage.getItem('expertise');

    if (savedLookingFor) {
      try {
        setSelectedLookingForServices(JSON.parse(savedLookingFor));
      } catch (error) {
        console.error('Error parsing lookingFor', error);
      }
    }
    if (savedExpertises) {
      try {
        setExpertises(JSON.parse(savedExpertises));
      } catch (error) {
        console.error('Error parsing expertise', error);
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
    setSelectedLookingForServices(prev => {
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
                  {lookingForServices.slice(0, 3).map(service => (
                    <Checkbox
                      key={service}
                      checked={selectedLookingForServices.includes(service)}
                      onChange={() => handleLookingForChange(service)}
                    >
                      {service}
                    </Checkbox>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {lookingForServices.slice(3).map(service => (
                    <Checkbox
                      key={service}
                      checked={selectedLookingForServices.includes(service)}
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
                  {expertiseServices?.slice(0, 14)?.map(service => (
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
                  {expertiseServices?.slice(14, 28)?.map(service => (
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
                  {expertiseServices?.slice(28, 42)?.map(service => (
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
                  {expertiseServices?.slice(42)?.map(service => (
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
