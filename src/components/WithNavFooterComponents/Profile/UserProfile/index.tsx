'use client';

import { useUser } from '@/context/UserContext';
import { updateAuthData } from '@/services/Auth';
import {
  AutoComplete,
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Row,
} from 'antd';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
  getPlaceDetailsById,
  getPlacesAutocomplete,
  reverseGeocodeLatLng,
} from '@/services/Location';

interface UserProfileFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  // country: string;
  stringLocation: string;
  latitude?: number;
  longitude?: number;
}

const UserProfile = () => {
  const { user, setIsLoading } = useUser();
  const [form] = Form.useForm<UserProfileFormValues>();
  const [suggestions, setSuggestions] = useState<
    { value: string; place_id: string }[]
  >([]);
  const [locating, setLocating] = useState(false);
  const [, startTransition] = useTransition();

  const handleUpdateData = async (values: UserProfileFormValues) => {
    try {
      const payload: {
        fullName: string;
        stringLocation: string;
        latitude?: number;
        longitude?: number;
      } = {
        fullName: values.fullName,
        stringLocation: values.stringLocation,
      };

      if (typeof values.latitude === 'number') {
        payload.latitude = values.latitude;
      }
      if (typeof values.longitude === 'number') {
        payload.longitude = values.longitude;
      }

      const res = await updateAuthData(payload);

      if (res?.success) {
        toast.success(res?.message);
        setIsLoading(true);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const fetchLocationSuggestions = (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      return;
    }
    startTransition(async () => {
      try {
        const data = await getPlacesAutocomplete(input);
        if (data.status === 'OK') {
          setSuggestions(
            (data.predictions || []).map(item => ({
              value: item.description,
              place_id: item.place_id,
            })),
          );
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error(error);
        setSuggestions([]);
        toast.error('Location suggestions unavailable right now.');
      }
    });
  };

  const geocodeByPlaceId = (placeId: string) => {
    if (!placeId) return;
    startTransition(async () => {
      try {
        const details = await getPlaceDetailsById(placeId);
        if (details.status === 'OK' && details.result?.geometry?.location) {
          const loc = details.result.geometry.location;
          const formatted =
            details.result.formatted_address || details.result.name;
          form.setFieldsValue({
            stringLocation: formatted,
            latitude: loc.lat,
            longitude: loc.lng,
          });
        } else {
          toast.error('Unable to fetch place details.');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch place details.');
      }
    });
  };

  const handleSelectSuggestion = (
    _: string,
    option: { value: string; place_id?: string },
  ) => {
    form.setFieldsValue({ stringLocation: option.value });
    if (option.place_id) {
      geocodeByPlaceId(option.place_id);
    }
  };

  const useCurrentLocation = () => {
    if (!navigator?.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        startTransition(async () => {
          try {
            const data = await reverseGeocodeLatLng(latitude, longitude);

            const formatted =
              data.results?.[0]?.formatted_address ??
              `${latitude}, ${longitude}`;
            form.setFieldsValue({
              stringLocation: formatted,
              latitude,
              longitude,
            });
          } catch (error) {
            console.error(error);
            toast.error('Unable to reverse geocode your location.');
          } finally {
            setLocating(false);
          }
        });
      },
      () => {
        setLocating(false);
        toast.error('Unable to retrieve your location');
      },
      { enableHighAccuracy: true, timeout: 5000 },
    );
  };

  return (
    <div className="px-2 md:px-0">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              borderRadius: 0,
            },
            Input: {
              borderRadius: 5,
            },
          },
        }}
      >
        <Form<UserProfileFormValues>
          form={form}
          name="personalInfo"
          initialValues={{
            fullName: user?.fullName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            stringLocation: user?.stringLocation,
          }}
          onFinish={handleUpdateData}
          layout="vertical"
          className="my-5"
        >
          <Form.Item
            name="fullName"
            label={<p className=" text-md">Full Name</p>}
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input
              style={{ padding: '6px' }}
              className=" text-md"
              placeholder="Your Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<p className=" text-md">Email</p>}
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input
              readOnly
              style={{ padding: '6px' }}
              className=" text-md"
              placeholder="Your Email"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={<p className=" text-md">Contact Number</p>}
            rules={[
              {
                required: true,
                message: 'Please input your phone number with country code!',
              },
              {
                pattern: /^[+]*[0-9]{7,15}$/,
                message: 'Please enter a valid phone number!',
              },
            ]}
          >
            <Input
              readOnly
              style={{ padding: '6px' }}
              className="text-md"
              placeholder="Contact Number"
            />
          </Form.Item>

          <Form.Item
            name="stringLocation"
            label={<p className=" text-md">Address</p>}
            rules={[{ required: true, message: 'Please enter your address!' }]}
          >
            <AutoComplete
              options={suggestions}
              onSearch={value => {
                if (!value) {
                  setSuggestions([]);
                  return;
                }
                fetchLocationSuggestions(value);
              }}
              onSelect={handleSelectSuggestion}
              style={{ width: '100%' }}
            >
              <Input
                style={{ padding: '6px' }}
                className=" text-md"
                placeholder="Your Address"
              />
            </AutoComplete>
          </Form.Item>
          <Button
            onClick={useCurrentLocation}
            loading={locating}
            className="mb-3!"
          >
            Use Current Location
          </Button>

          <Row gutter={16} hidden>
            <Col span={12}>
              <Form.Item
                name="latitude"
                label={<p className=" text-md">Latitude</p>}
                rules={[{ required: true, message: 'Latitude is required' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  className=" text-md"
                  placeholder="Latitude"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="longitude"
                label={<p className=" text-md">Longitude</p>}
                rules={[{ required: true, message: 'Longitude is required' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  className=" text-md"
                  placeholder="Longitude"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* <Form.Item
            name="country"
            label={<p className=" text-md">Country</p>}
            rules={[{ required: true, message: 'Please select your country' }]}
          >
            <Select placeholder="Select Country">
              <Option value="UAE">UAE </Option>
              <Option value="UK">UK </Option>
              <Option value="USA">USA </Option>
            </Select>
          </Form.Item> */}

          <Form.Item className="text-end">
            <button
              type="submit"
              className="px-5 py-2 bg-primary rounded-xl font-bold cursor-pointer"
            >
              <span className="text-white">Save Changes</span>
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default UserProfile;
