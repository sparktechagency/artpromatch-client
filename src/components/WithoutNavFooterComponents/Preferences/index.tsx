'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Input, Radio, Steps, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const artStyles = [
  'American Traditional',
  'Neo Traditional',
  'Traditional',
  'Pacific Islander/Polynesian',
  'Tatau',
  'Maori',
  'African',
  'Native American',
  'Black & Grey',
  'Portrait',
  'Realism',
  'Abstract',
  'Blackwork',
  'Heavy Blackwork',
  'Brutal Blackwork',
  'Ignorant',
  'Anime',
  'White On Black',
  'White Tattoos',
  'Black Trash',
  'Trash Polka',
  'Blackout',
  'Script',
  'Lettering',
  'Fine Line',
  'Calligraphy',
  'Ornamental',
  'Watercolor',
  'Geometric',
  'Japanese Style',
  'Irezumi',
  'Tebori',
  'Tribal',
  'Neo Tribal',
  'New School',
  'Old School',
  'Illustrative',
  'Minimalist',
  'Lineart',
  'Botanical',
  'Realistic Color',
  'Realistic Black & Grey',
  'Graphic',
  'Dotwork',
  'Stick and Poke',
  'Microrealism',
  'Biomech',
  'Chicano',
  'Thai',
  'Comic',
  'Coverups',
  'Scar Coverups',
  'Microblading',
  'Freckles',
  'Tattoo Removal',
  'Tooth Gems',
];

const Preferences = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [role, setRole] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [favoriteTattoos, setFavoriteTattoos] = useState<string[]>([]);
  const [artistType, setArtistType] = useState<string>('');

  // const [studioName, setStudioName] = useState<string>('');
  // const [contactNumber, setContactNumber] = useState<string>('');
  // const [contactEmail, setContactEmail] = useState<string>('');
  // const [businessType, setBusinessType] = useState<string>('');

  useEffect(() => {
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

    // client part
    const savedFavoriteTattoos = localStorage.getItem('favoriteTattoos');
    if (savedFavoriteTattoos) {
      try {
        setFavoriteTattoos(JSON.parse(savedFavoriteTattoos));
      } catch (error) {
        console.error('Error parsing favorite tattoos', error);
      }
    }

    // artist part
    const savedArtistType = localStorage.getItem('artistType');
    if (savedArtistType) {
      try {
        setArtistType(savedArtistType);
      } catch (error) {
        console.error('Error parsing artistType', error);
      }
    }

    // business part
    const studioName = localStorage.getItem('studioName');
    const contactNumber = localStorage.getItem('contactNumber');
    const contactEmail = localStorage.getItem('contactEmail');
    const businessType = localStorage.getItem('businessType');

    form.setFieldsValue({
      studioName,
      contactNumber,
      contactEmail,
      businessType,
    });
  }, [form]);

  // handleSelect
  const handleSelect = (style: string) => {
    const updated = favoriteTattoos.includes(style)
      ? favoriteTattoos.filter(item => item !== style)
      : [...favoriteTattoos, style];

    setFavoriteTattoos(updated);
    localStorage.setItem('favoriteTattoos', JSON.stringify(updated));
  };

  // handleArtistType
  const handleArtistType = (type: string) => {
    setArtistType(type);
    localStorage.setItem('artistType', type);
  };

  // handleBusinessDetails
  const handleBusinessDetails = (values: any) => {
    localStorage.setItem('studioName', values.studioName);
    localStorage.setItem('contactNumber', values.contactNumber);
    localStorage.setItem('contactEmail', values.contactEmail);
    localStorage.setItem('businessType', values.businessType);

    router.push('/preferd-location');
  };

  return role === 'CLIENT' ? (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <Form
          form={form}
          name="select-user-type"
          layout="vertical"
          className="pb-10 w-full mx-auto bg-white px-2 rounded-2xl"
        >
          <div className="mb-4 flex flex-col justify-center items-center text-center">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
              What styles of art do you love?
            </h2>
            <Typography.Text className="text-center text-base">
              Pick as many as you&apos;d like.
            </Typography.Text>
          </div>

          {/* Buttons in groups of 10 */}
          <div className="flex flex-col gap-4">
            {Array.from(
              { length: Math.ceil(artStyles.length / 10) },
              (_, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center gap-4 flex-wrap"
                >
                  {artStyles.slice(i * 10, i * 10 + 10).map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleSelect(style)}
                      className={`px-4 py-2 rounded-3xl border transition ${
                        favoriteTattoos.includes(style)
                          ? 'border-primary text-blue-500 font-semibold bg-gray-400/30'
                          : 'hover:border-primary'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Navigation buttons */}
          <Link href="/preferd-location">
            <button
              disabled={!favoriteTattoos.length || !role}
              type="button"
              className="w-full bg-primary text-white py-2 rounded-lg mt-5 mb-10"
            >
              <div className="text-lg text-white"> Get Started</div>
            </button>
          </Link>
        </Form>

        {/* Steps */}
        <Steps
          current={current}
          direction="horizontal"
          size="small"
          items={[
            { title: '', status: current >= 0 ? 'finish' : 'wait' },
            { title: '', status: current >= 1 ? 'finish' : 'wait' },
            { title: '', status: current >= 2 ? 'finish' : 'wait' },
            { title: '', status: current >= 3 ? 'finish' : 'wait' },
          ]}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  ) : role === 'ARTIST' ? (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <Form
          form={form}
          name="select-style-type"
          layout="vertical"
          className="pb-10 w-full mx-auto bg-white px-2 rounded-2xl"
        >
          <div className="mb-4 flex flex-col justify-center items-center text-center">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
              What styles of art do you provide?
            </h2>
            <Typography.Text className="text-center text-base">
              Pick one that you&apos;d like.
            </Typography.Text>
          </div>

          {/* Buttons in groups of 10 */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <Radio.Group
              onChange={e => handleArtistType(e.target.value)}
              value={artistType}
            >
              {['Tattoo Artist', 'Piercer', 'Both']?.map(type => (
                <Radio
                  key={type}
                  value={type}
                  className="w-full flex justify-center items-center"
                >
                  <div
                    className={`border rounded-lg p-6 mb-5 w-50 text-center ${
                      artistType === type
                        ? 'border-blue-500 shadow-md'
                        : 'hover:border-blue-500'
                    }`}
                  >
                    <h1 className="text-xl font-bold">{type}</h1>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          </div>

          {/* Navigation buttons */}
          <Link href="/preferd-location">
            <button
              disabled={!artistType || !role}
              type="button"
              className="w-full bg-primary text-white py-2 rounded-lg mt-5 mb-10"
            >
              <div className="text-lg text-white"> Get Started</div>
            </button>
          </Link>
        </Form>

        {/* Steps */}
        <Steps
          current={current}
          direction="horizontal"
          size="small"
          items={[
            { title: '', status: current >= 0 ? 'finish' : 'wait' },
            { title: '', status: current >= 1 ? 'finish' : 'wait' },
            { title: '', status: current >= 2 ? 'finish' : 'wait' },
            { title: '', status: current >= 3 ? 'finish' : 'wait' },
          ]}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  ) : role === 'BUSINESS' ? (
    <div className="py-16 md:py-0 h-[100vh] flex items-center justify-center">
      <div className="">
        <Form
          form={form}
          name="business-details"
          layout="vertical"
          className="w-120"
          onFinish={handleBusinessDetails}
        >
          <div className="mb-4 flex flex-col justify-center items-center text-center ">
            <Image src={AllImages.logo} width={50} height={50} alt="logo" />
            <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
              Your Business details
            </h2>
            <Typography.Text className="text-center text-base">
              Fill-up the form carefully.
            </Typography.Text>
          </div>

          <Form.Item
            name="studioName"
            label="Enter your Studio Name"
            rules={[
              { required: true, message: 'Studio name is required' },
              { min: 3, message: 'Studio name must be at least 3 characters' },
            ]}
          >
            <Input placeholder="Enter your studio name" className="text-md" />
          </Form.Item>

          <Form.Item
            name="contactNumber"
            label="Enter your Contact Number"
            rules={[
              { required: true, message: 'Contact number is required' },
              {
                pattern: /^[0-9]{10,15}$/,
                message: 'Enter a valid contact number (10–15 digits)',
              },
            ]}
          >
            <Input
              placeholder="Enter your contact number"
              className="text-md"
            />
          </Form.Item>

          <Form.Item
            name="contactEmail"
            label="Enter your Contact Email"
            rules={[
              { required: true, message: 'Contact email is required' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input placeholder="Enter your contact email" className="text-md" />
          </Form.Item>

          <Form.Item
            name="businessType"
            label="Select Business Type"
            rules={[
              { required: true, message: 'Please select a business type' },
            ]}
          >
            <Radio.Group>
              {['Studio', 'Event Organizer', 'Both'].map(type => (
                <Radio key={type} value={type} className="w-full">
                  <div
                    className={`border rounded-lg p-3 mb-5 w-50 text-center`}
                  >
                    <h1 className="text-xl font-bold">{type}</h1>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg mt-5 mb-10"
            >
              <div className="text-lg text-white"> Get Started</div>
            </button>
          </Form.Item>
        </Form>

        {/* Steps */}
        <Steps
          current={current}
          direction="horizontal"
          size="small"
          items={[
            { title: '', status: current >= 0 ? 'finish' : 'wait' },
            { title: '', status: current >= 1 ? 'finish' : 'wait' },
            { title: '', status: current >= 2 ? 'finish' : 'wait' },
            { title: '', status: current >= 3 ? 'finish' : 'wait' },
          ]}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  ) : null;
};

export default Preferences;
