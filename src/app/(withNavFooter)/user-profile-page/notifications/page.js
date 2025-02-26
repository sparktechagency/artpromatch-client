"use client";

import { Radio, Switch } from "antd";
import React from "react";

const NotificationPage = () => {
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="p-5">
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Notifications</h1>
          <p className="text-textSecondary">Turn on all Notifications</p>
        </div>

        <button className="border rounded-xl px-4 py-2 text-secondary">
          Turn all On
        </button>
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Booking Confirmations</h1>
          <p className="text-textSecondary">
            Receive notifications when an artist confirms your booking.
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Booking Reminders</h1>
          <p className="text-textSecondary">
            Get reminders before your upcoming appointments.
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Booking Cancellations</h1>
          <p className="text-textSecondary">
            Get notified if an artist cancels or reschedules your booking.
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">App Updates</h1>
          <p className="text-textSecondary">
            Get notified about new features and improvements.
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">New Availability </h1>
          <p className="text-textSecondary">
            Get notified when your favourited artists add new availability
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Last minute bookings </h1>
          <p className="text-textSecondary">
            Get notified when your favourited artists create a last minute
            booking link
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div className="border-0 border-b p-5 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">New Guest Artists</h1>
          <p className="text-textSecondary">
            Get notified when there’s new guest artist in your favourite styles
            coming to work near you
          </p>
        </div>

        <Switch defaultChecked onChange={onChange} />
      </div>
      <div>
        <h1 className="text-xl font-bold">How You Receive Notifications</h1>
        <div className=" flex flex-col md:flex-row justify-between items-center gap-5">
          <Radio value={1}>
            <span className="text-textSecondary">In App Notification </span>
          </Radio>
          <Radio value={1}>
            <span className="text-textSecondary">E-mail Notification</span>
          </Radio>
          <Radio value={1}>
            <span className="text-textSecondary">
              Text Message Notification{" "}
            </span>
          </Radio>
        </div>
      </div>

      <div className=" flex justify-end items-end mt-5">
        <button className="bg-primary text-white py-3 px-6 rounded-lg clear-start">
          Save
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;
