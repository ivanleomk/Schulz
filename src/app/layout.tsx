import Header from "../../components/Header";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";

export const metadata = {
  title: "Schulz.Ai",
  description: "GPT powered CRM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

{
  /* <body className="min-h-screen bg-background font-sans ">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
          </div>
        </body> */
}

{
  /* <body className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </body> */
}
