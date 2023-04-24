import WaitlistForm from "../../../components/WaitlistForm";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const WaitlistPage = () => {
  return (
    <div className="  h-screen flex items-center justify-center ">
      <div className="max-w-2xl px-4">
        <Link href="/" className="flex items-center cursor-pointer">
          <ArrowLeftIcon />
          <p>Go Back to Main Page</p>
        </Link>

        <div className="text-left mt-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
            Sign Up for our Waitlist today!
          </h1>
          <p className="mt-4 text-sm">
            Just a few questions before you get access to your new supercharged
            CRM
          </p>
        </div>
        <div>
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;
