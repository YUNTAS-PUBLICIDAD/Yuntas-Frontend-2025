import MainLayout from "@/components/layout/MainLayout";
import React from "react";

export default function PublicLayout({children}:{children: React.ReactNode}){
  return <MainLayout>{children}</MainLayout>
}
