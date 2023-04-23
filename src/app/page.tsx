import Link from "next/link";
import React, { Suspense } from "react";

import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";
import UserAuth from "../../components/UserAuth";

import { Button } from "../../components/ui/button";

const Home = async () => {
  const user: User | null = await currentUser();

  return (
    <Suspense fallback={<p>Loading....</p>}>
      {user ? (
        <div>
          Currently Signed in <Link href="/dashboard">Go To Dashboard</Link>
        </div>
      ) : (
        <UserAuth />
      )}
    </Suspense>
  );
};

export default Home;
