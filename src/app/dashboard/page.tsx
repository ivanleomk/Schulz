import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/dist/api";
import { Skeleton } from "../../../components/ui/skeleton";
import Link from "next/link";
import Header from "../../../components/Header";

const ProtectedPage = async () => {
  const user: User | null = await currentUser();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <p>
        This is a protected page. <Link href="/">Go back </Link>
        <Header />
      </p>
    </Suspense>
  );
};

export default ProtectedPage;
