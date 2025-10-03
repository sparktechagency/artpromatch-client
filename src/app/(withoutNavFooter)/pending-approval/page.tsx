'use client';

import { AllImages } from '@/assets/images/AllImages';
import { checkProfileStatus } from '@/services/Auth';
import { Button, Card, Typography, Spin } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const PendingApprovalPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // const handleCreateProfile = () => {
  //   router.push('/user-type-selection');
  // };

  const handleCheckStatus = async () => {
    try {
      setLoading(true);

      const res = await checkProfileStatus();

      if (res?.success) {
        toast.success(res?.message);
        router.push('/');
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while checking status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <Card
        className="max-w-md w-full text-center shadow-lg rounded-2xl p-6"
        variant="outlined"
      >
        <div className="flex flex-col items-center mb-4">
          <Image src={AllImages.logo} width={60} height={60} alt="logo" />
          <Typography.Title
            level={3}
            className="!mt-4 !mb-2 text-primary font-bold"
          >
            Profile Under Review
          </Typography.Title>
          <Typography.Text className="text-gray-600">
            Your profile is currently under review by the admin. Have patience,
            we will response in a short time.
          </Typography.Text>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {/* <Button
            type="default"
            size="large"
            className="flex-1"
            onClick={handleCreateProfile}
          >
            Create Profile
          </Button> */}
          <Button
            type="primary"
            size="large"
            className="flex-1"
            onClick={handleCheckStatus}
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : 'Check Status'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PendingApprovalPage;
