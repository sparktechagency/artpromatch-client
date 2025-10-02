'use client';

import { useState } from 'react';
import { Collapse, Input, Modal, Form } from 'antd';
import { toast } from 'sonner';
import { IFaq } from '@/types';

const { Search } = Input;

const Help = ({ faqs }: { faqs: IFaq[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim().toLowerCase());
  };

  // highlight function
  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const words = searchTerm.split(/\s+/).filter(Boolean);
    if (words.length === 0) return text;
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    return text.split(regex).map((part, index) =>
      words.some(w => part.toLowerCase() === w.toLowerCase()) ? (
        <span key={index} className="text-red-800 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const collapseItems = faqs?.map(faq => ({
    key: faq._id,
    label: highlightText(faq.question),
    children: highlightText(faq.answer),
  }));

  // const collapseItems = [
  //   {
  //     key: '1',
  //     label: highlightText('How do I book a service of an artist?'),
  //     children: highlightText(
  //       "Visit the artist's profile, select 'Book Now,' and follow the steps to choose a date, time, and service."
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: highlightText('What is the cancellation policy?'),
  //     children: highlightText('Message artist to cancel a booking.'),
  //   },
  //   {
  //     key: '3',
  //     label: highlightText('How do I contact an artist directly?'),
  //     children: highlightText(
  //       'Our dedicated chat system is available for you to contact an artist.'
  //     ),
  //   },
  // ];

  // handle submit new question

  const handleAddQuestion = async () => {
    try {
      const values = await form.validateFields();
      // API call to save question
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: values.question }),
      });

      if (!res.ok) throw new Error('Failed to save question');
      toast.success('Your question has been submitted!');
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className=" text-secondary">
          Find answers, manage issues, or get in touch with us
        </p>
      </div>

      <div className="mt-4 md:mt-0">
        <Search
          allowClear
          placeholder="Search articles"
          onSearch={handleSearch}
          enterButton
        />
      </div>

      <div className="mt-8">
        <Collapse accordion items={collapseItems} />
      </div>

      {/* get in touch button */}
      <div className="mt-8 flex flex-col justify-center items-center p-5 bg-[#faf7f7] rounded-xl">
        <h1 className="text-2xl font-bold mb-2">Still have questions?</h1>
        <p className="text-secondary">
          Can&apos;t find the answer you&apos;re looking for? Please chat to our
          friendly team.
        </p>
        <div
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 rounded-xl bg-primary text-white cursor-pointer"
        >
          Get in touch
        </div>
      </div>

      {/* modal */}
      <Modal
        title="Submit Your Question"
        open={isModalOpen}
        onOk={handleAddQuestion}
        onCancel={() => setIsModalOpen(false)}
        okText="Submit"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Your Question"
            name="question"
            rules={[{ required: true, message: 'Please enter your question' }]}
          >
            <Input.TextArea rows={4} placeholder="Type your question..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Help;
