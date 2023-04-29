import { currentUser } from "@clerk/nextjs/app-beta";
import LandingPage from "../../components/LandingPage";
import Link from "next/link";
import UserAuth from "../../components/UserAuth";

const Home = async () => {
  const user = await currentUser();

  return (
    <div className="flex  flex-col items-center justify-center h-screen">
      <div className="mx-auto max-w-2xl ">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our new beta.{" "}
            <Link href="/waitlist" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Sign up today <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            A New CRM for the digital age.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Revolutionize your sales strategy with our new CRM - powered by GPT
            technology for unparalleled insights and advantages
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/waitlist">
              <p className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Join The Waitlist
              </p>
            </Link>
            {user ? (
              <Link href="/dashboard">Go To Dashboard</Link>
            ) : (
              <UserAuth />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
