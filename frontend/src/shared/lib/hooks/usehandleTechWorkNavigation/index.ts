"use client";

import { useRouter, usePathname } from "next/navigation";
import { useGlobalStore } from "@/shared/stores";

export function useHandleTechWorkNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { goToTechWorkPage } = useGlobalStore();

  const handleTechWorkNavigation = () => {
    if (pathname === "/technical_works") return;
    goToTechWorkPage();
    router.push("/technical_works");
  };

  return { handleTechWorkNavigation };
}