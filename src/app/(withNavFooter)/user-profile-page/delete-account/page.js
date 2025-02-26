import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
const DeleteAccount = () => {
  return (
    <div className="p-5">
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-2">
          <CiCircleMinus className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-bold">Deactivate Account</h1>
            <p className="text-textSecondary">
              Deactivating your account will temporarily hide your profile,
              bookings, and messages. You can reactivate it anytime by logging
              back in.
            </p>
          </div>
        </div>
        <Link href="/user-profile-page/delete-account/deactive">
          <IoIosArrowForward className="bg-slate-50 rounded-full h-8 w-8" />
        </Link>
      </div>
      <div className="border rounded-xl p-5 flex justify-between items-center mb-4">
        <div className="flex justify-start items-center gap-2">
        <RiDeleteBin6Line  className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-xl font-bold">Delete Account</h1>
            <p className="text-textSecondary">
              This action is irreversible. Once deleted, all your data,
              including your profile, booking history, saved artists, and
              messages, will be permanently removed.
            </p>
          </div>
        </div>

        <Link href="/user-profile-page/delete-account/confirm-delete">
          <IoIosArrowForward className="bg-slate-50 rounded-full h-8 w-8" />
        </Link>
      </div>
    </div>
  );
};

export default DeleteAccount;
