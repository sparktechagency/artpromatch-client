'use client';

import { reviewAfterAServiceIsCompleted } from '@/services/Booking';
import { Form, Input, InputNumber, Button, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Review = ({ bookingId }: { bookingId: string }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmitReview = async (values: any) => {
    const payload = {
      bookingId,
      review: values.review,
      rating: values.rating,
      secretReviewForAdmin: values.secretReviewForAdmin,
    };

    try {
      const res = await reviewAfterAServiceIsCompleted(payload);

      if (res?.success) {
        toast.success(res?.message);
        form.resetFields();
        router.push('/bookings');
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card title="Leave a Review" className="w-full max-w-lg shadow-md">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitReview}
          initialValues={{
            rating: 5,
            review: 'Good.',
            secretReviewForAdmin: 'Good.',
          }}
        >
          <Form.Item
            label="Review"
            name="review"
            rules={[{ required: true, message: 'Please enter your review!' }]}
          >
            <Input.TextArea rows={3} placeholder="Write your review" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please provide a rating!' }]}
          >
            <InputNumber min={0} max={5} step={0.5} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Secret Review for Admin"
            name="secretReviewForAdmin"
            rules={[
              {
                required: true,
                message: 'Please enter your private feedback!',
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Private feedback (only for admin)"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Review;
