import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Studio · The BioDispatch Admin",
  description: "Internal editorial dashboard and dispatch manager for Dr. Xuan Chien Hoang",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
