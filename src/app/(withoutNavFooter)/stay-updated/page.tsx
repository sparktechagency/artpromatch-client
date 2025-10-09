'use client';

import { AllImages } from '@/assets/images/AllImages';
import { createProfile } from '@/services/Auth';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, Form, Steps, Typography, Upload } from 'antd';
import type { UploadFile } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ProfileData {
  role: string;
  stringLocation: string;
  mainLocation: {
    coordinates: [number, number];
  };
  // radius: number;
  // favoriteTattoos?: string[];
  // lookingFor: string[];
  // notificationPreferences?: string[];

  artistType?: string;
  expertise?: string[];
  description?: string;
  hourlyRate?: string;

  studioName?: string;
  contactNumber?: string;
  contactEmail?: string;
  businessType?: string;
  servicesOffered?: string[];
  operatingHours?: any;
}

const StayUpdated = () => {
  const [form] = Form.useForm();

  // artist part
  const [idCardFrontFile, setIdCardFrontFile] = useState<UploadFile[]>([]);
  const [idCardBackFile, setIdCardBackFile] = useState<UploadFile[]>([]);
  const [selfieWithIdFile, setSelfieWithIdFile] = useState<UploadFile[]>([]);

  // business part
  const [registrationCertificateFile, setRegistrationCertificateFile] =
    useState<UploadFile[]>([]);
  const [taxIdOrEquivalentFile, setTaxIdOrEquivalentFile] = useState<
    UploadFile[]
  >([]);
  const [studioLicenseFile, setStudioLicenseFile] = useState<UploadFile[]>([]);

  const [role, setRole] = useState<string | null>(null);
  const [current, setCurrent] = useState<number>(3);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

    // for client
    if (savedRole === 'CLIENT') {
      const savedNotificationPreferences = localStorage.getItem(
        'notificationPreferences'
      );

      if (savedNotificationPreferences) {
        try {
          setSelectedType(JSON.parse(savedNotificationPreferences));
        } catch (e) {
          console.error('Error parsing notificationPreferences', e);
        }
      }
    } else if (savedRole === 'ARTIST') {
      // for artist
      const savedLocation = localStorage.getItem('location');
      if (!savedLocation) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }
      const location = JSON.parse(savedLocation);

      const stringLocation = localStorage.getItem('stringLocation');
      if (!stringLocation) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const artistType = localStorage.getItem('artistType');
      if (!artistType) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const expertise: string[] = JSON.parse(
        localStorage.getItem('expertise') || '[]'
      );
      if (!expertise) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const description = localStorage.getItem('description');
      if (!description) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const hourlyRate = localStorage.getItem('hourlyRate');
      if (!hourlyRate) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const artistProfileData: ProfileData = {
        role: savedRole,
        stringLocation,
        mainLocation: {
          coordinates: [location.longitude, location.latitude],
        },
        artistType,
        expertise,
        description,
        hourlyRate,
      };

      setProfileData(artistProfileData);
    } else if (savedRole === 'BUSINESS') {
      // for business
      const studioName = localStorage.getItem('studioName');
      if (!studioName) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const contactNumber = localStorage.getItem('contactNumber');
      if (!contactNumber) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const contactEmail = localStorage.getItem('contactEmail');
      if (!contactEmail) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const businessType = localStorage.getItem('businessType');
      if (!businessType) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const savedLocation = localStorage.getItem('location');
      if (!savedLocation) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }
      const location = JSON.parse(savedLocation);

      const stringLocation = localStorage.getItem('stringLocation');
      if (!stringLocation) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const servicesOffered: string[] = JSON.parse(
        localStorage.getItem('servicesOffered') || '[]'
      );
      if (!servicesOffered) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const operatingHours = JSON.parse(
        localStorage.getItem('operatingHours') || '{}'
      );
      if (!operatingHours) {
        toast.error('Please select all profile section!');
        router.push('/user-type-selection');
        return;
      }

      const artistProfileData: ProfileData = {
        role: savedRole,
        studioName,
        contactNumber,
        contactEmail,
        businessType,
        stringLocation,
        mainLocation: {
          coordinates: [location.longitude, location.latitude],
        },
        servicesOffered,
        operatingHours,
      };

      setProfileData(artistProfileData);
    }
  }, []);

  // handleTypeChange
  const handleTypeChange = (type: string) => {
    setSelectedType(prev => {
      const updated = prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type];

      // save immediately
      localStorage.setItem('notificationPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  // beforeUpload
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      toast.error('You can only upload image files!');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isLt5M) {
      toast.error('Image must be smaller than 5MB!');
    }

    return isImage && isLt5M;
  };

  // handleCreateArtistProfile
  const handleCreateArtistProfile = async () => {
    if (!profileData) {
      toast.error('Please select all profile section!');
      router.push('/user-type-selection');
      return;
    }

    // if (idCardFrontFile.length === 0) {
    //   toast.error('Please upload your ID Card Front image!');
    //   return;
    // }

    // if (idCardBackFile.length === 0) {
    //   toast.error('Please upload your ID Card Back image!');
    //   return;
    // }

    // if (selfieWithIdFile.length === 0) {
    //   toast.error('Please upload your selfie with ID image!');
    //   return;
    // }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(profileData));

      // Append idFrontPart
      if (idCardFrontFile[0]?.originFileObj) {
        formData.append('idFrontPart', idCardFrontFile[0].originFileObj);
      }

      // Append idBackPart
      if (idCardBackFile[0]?.originFileObj) {
        formData.append('idBackPart', idCardBackFile[0].originFileObj);
      }

      // Append selfieWithId
      if (selfieWithIdFile[0]?.originFileObj) {
        formData.append('selfieWithId', selfieWithIdFile[0].originFileObj);
      }

      const res = await createProfile(formData);

      if (res?.success) {
        toast.success(res?.message);
        localStorage.clear();
        router.push('/');
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // handleCreateBusinessProfile
  const handleCreateBusinessProfile = async () => {
    if (!profileData) {
      toast.error('Please select all profile section!');
      router.push('/user-type-selection');
      return;
    }

    // if (registrationCertificateFile.length === 0) {
    //   toast.error('Please upload your Registration Certificate image!');
    //   return;
    // }

    // if (taxIdOrEquivalentFile.length === 0) {
    //   toast.error('Please upload your Tax ID or Equivalent image!');
    //   return;
    // }

    // if (studioLicenseFile.length === 0) {
    //   toast.error('Please upload your Studio License image!');
    //   return;
    // }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(profileData));

      // Append registrationCertificate
      if (registrationCertificateFile[0]?.originFileObj) {
        formData.append(
          'registrationCertificate',
          registrationCertificateFile[0].originFileObj
        );
      }

      // Append taxIdOrEquivalent
      if (taxIdOrEquivalentFile[0]?.originFileObj) {
        formData.append(
          'taxIdOrEquivalent',
          taxIdOrEquivalentFile[0].originFileObj
        );
      }

      // Append studioLicense
      if (studioLicenseFile[0]?.originFileObj) {
        formData.append('studioLicense', studioLicenseFile[0].originFileObj);
      }

      const res = await createProfile(formData);

      if (res?.success) {
        toast.success(res?.message);
        localStorage.clear();
        router.push('/');
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-10 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="p-8 w-full md:w-[700px]">
        <div className="mb-6 flex flex-col justify-center items-center text-center">
          <Image src={AllImages.logo} width={60} height={60} alt="logo" />
          <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
            {role === 'CLIENT'
              ? 'How would you like to stay updated?'
              : role === 'ARTIST'
              ? 'Upload the files'
              : role === 'BUSINESS'
              ? 'Upload the files'
              : ''}
          </h2>
          <Typography.Text className="text-center text-base text-gray-600">
            {role === 'CLIENT'
              ? 'Choose how we notify you about artists, guest spots, and bookings.'
              : role === 'ARTIST'
              ? 'Select the related files to be verified quickly.'
              : role === 'BUSINESS'
              ? 'Select the related files to be verified quickly.'
              : ''}
          </Typography.Text>
        </div>

        {role === 'CLIENT' ? (
          <div>
            <div className="flex flex-col gap-4">
              {['app', 'email', 'sms'].map(type => (
                <Checkbox
                  key={type}
                  checked={selectedType.includes(type)}
                  onChange={() => handleTypeChange(type)}
                >
                  <label className="flex w-full cursor-pointer">
                    <div className="border hover:border-primary rounded-lg p-6 md:w-96">
                      <h1 className="text-xl font-bold">
                        {type === 'app'
                          ? 'In-App Notifications'
                          : type === 'email'
                          ? 'Email Alerts'
                          : 'Text Messages'}
                      </h1>
                      <p>
                        {type === 'app'
                          ? 'Receive updates when browsing & in app.'
                          : type === 'email'
                          ? 'Get notifications sent to your email.'
                          : 'Stay updated via SMS.'}
                      </p>
                    </div>
                  </label>
                </Checkbox>
              ))}
            </div>

            <Link href="/all-set">
              <div className="w-full bg-primary text-lg font-medium text-white text-center py-3 rounded-xl mt-6 transition hover:bg-primary/90">
                Continue
              </div>
            </Link>
          </div>
        ) : role === 'ARTIST' ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateArtistProfile}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'ID Card Front Image (optional)',
                  fileList: idCardFrontFile,
                  setFile: setIdCardFrontFile,
                },
                {
                  label: 'ID Card Back Image (optional)',
                  fileList: idCardBackFile,
                  setFile: setIdCardBackFile,
                },
                {
                  label: 'Selfie With ID Image (optional)',
                  fileList: selfieWithIdFile,
                  setFile: setSelfieWithIdFile,
                },
              ].map((field, idx) => (
                <Form.Item
                  key={idx}
                  label={<span className="font-medium">{field.label}</span>}
                  // required
                  className="border border-dotted rounded-xl p-4 flex flex-col items-center justify-center"
                >
                  <div className="flex justify-center items-center">
                    <Upload
                      listType="picture-card"
                      fileList={field.fileList}
                      onChange={({ fileList }) => {
                        field.setFile(fileList);
                      }}
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      onRemove={() => field.setFile([])}
                    >
                      {field.fileList.length === 0 && (
                        <div className="flex flex-col items-center">
                          <PlusOutlined />
                          <div className="mt-2 text-sm text-gray-500">
                            Upload
                          </div>
                        </div>
                      )}
                    </Upload>
                  </div>
                  <p className="text-gray-400 text-xs text-center mt-2">
                    Upload a clear image (max 5MB)
                  </p>
                </Form.Item>
              ))}
            </div>

            {/* Submit Button */}

            <Form.Item>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primary text-lg font-medium text-white text-center p-2 rounded-xl mt-6 transition hover:bg-primary/90"
              >
                {isLoading ? 'Creating...' : 'Create Profile'}
              </button>
            </Form.Item>
          </Form>
        ) : role === 'BUSINESS' ? (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateBusinessProfile}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Registration Certificate Image (optional)',
                  fileList: registrationCertificateFile,
                  setFile: setRegistrationCertificateFile,
                },
                {
                  label: 'Tax ID or Equivalent Image (optional)',
                  fileList: taxIdOrEquivalentFile,
                  setFile: setTaxIdOrEquivalentFile,
                },
                {
                  label: 'StudioLicense Image (optional)',
                  fileList: studioLicenseFile,
                  setFile: setStudioLicenseFile,
                },
              ].map((field, idx) => (
                <Form.Item
                  key={idx}
                  label={<span className="font-medium">{field.label}</span>}
                  // required
                  className="border border-dotted rounded-xl p-4 flex flex-col items-center justify-center"
                >
                  <div className="flex justify-center items-center">
                    <Upload
                      listType="picture-card"
                      fileList={field.fileList}
                      onChange={({ fileList }) => {
                        field.setFile(fileList);
                      }}
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      onRemove={() => field.setFile([])}
                    >
                      {field.fileList.length === 0 && (
                        <div className="flex flex-col items-center">
                          <PlusOutlined />
                          <div className="mt-2 text-sm text-gray-500">
                            Upload
                          </div>
                        </div>
                      )}
                    </Upload>
                  </div>
                  <p className="text-gray-400 text-xs text-center mt-2">
                    Upload a clear image (max 5MB)
                  </p>
                </Form.Item>
              ))}
            </div>

            {/* Submit Button */}

            <Form.Item>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primary text-lg font-medium text-center p-2 rounded-xl mt-6 transition hover:bg-primary/90"
              >
                <div className="text-white">
                  {isLoading ? 'Creating...' : 'Create Profile'}
                </div>
              </button>
            </Form.Item>
          </Form>
        ) : null}

        <div className="mt-8">
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
          />
        </div>
      </div>
    </div>
  );
};

export default StayUpdated;
