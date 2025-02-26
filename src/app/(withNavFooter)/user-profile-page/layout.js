'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const UserDashboardLayout = ({ children }) => {
    const [activeTab, setActiveTab] = useState("");

    return (
        <div className='container mx-auto mt-20'>
            <div className="my-5 w-full flex flex-col md:flex-row">
                <div className="md:w-[30%]">
                    <h1 className="text-xl font-bold mb-2">Profile Information</h1>

                    <Link href="/user-profile-page/change-password-page">
                        <p 
                            className={`mb-3 cursor-pointer ${activeTab === "Password-Management" ? "text-black font-bold" : "text-textSecondary text-xl font-semibold"}`}
                            onClick={() => setActiveTab("Password-Management")}
                        >
                            Password Management
                        </p>
                    </Link>

                    <Link href="/user-profile-page/preferences">
                        <p 
                            className={`mb-3 cursor-pointer ${activeTab === "Preferences" ? "text-black font-bold" : "text-textSecondary text-xl font-semibold"}`}
                            onClick={() => setActiveTab("Preferences")}
                        >
                            Preferences
                        </p>
                    </Link>

                    <Link href="/user-profile-page/notifications">
                        <p 
                            className={`mb-3 cursor-pointer ${activeTab === "Notifications" ? "text-black font-bold" : "text-textSecondary text-xl font-semibold"}`}
                            onClick={() => setActiveTab("Notifications")}
                        >
                            Notifications
                        </p>
                    </Link>

                    <Link href="/user-profile-page/payment-history">
                        <p 
                            className={`mb-3 cursor-pointer ${activeTab === "Payment History" ? "text-black font-bold" : "text-textSecondary text-xl font-semibold"}`}
                            onClick={() => setActiveTab("Payment History")}
                        >
                            Payment History
                        </p>
                    </Link>

                    <Link href="/user-profile-page/privacy-security">
                        <p 
                            className={`mb-3 cursor-pointer ${activeTab === "Privacy & Security" ? "text-black font-bold" : "text-textSecondary text-xl font-semibold"}`}
                            onClick={() => setActiveTab("Privacy & Security")}
                        >
                            Privacy & Security
                        </p>
                    </Link>

                    <Link href="/user-profile-page/linked-accounts">
                        <p 
                            className={`mb-3 cursor-pointer ${activeTab === "Linked Accounts" ? "text-black font-bold" : "text-textSecondary text-xl font-semibold"}`}
                            onClick={() => setActiveTab("Linked Accounts")}
                        >
                            Linked Accounts
                        </p>
                    </Link>

                    <Link href="/user-profile-page/delete-account">
                        <p className="mb-3 text-red-500 text-xl cursor-pointer">
                            Delete Account
                        </p>
                    </Link>
                </div>

                <div className="md:w-[70%]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLayout;
