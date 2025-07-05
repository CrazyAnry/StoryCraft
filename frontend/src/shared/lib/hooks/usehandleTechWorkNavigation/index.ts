"use client";

import { useRouter, usePathname } from "next/navigation";
import { useGlobalStore } from "@/shared/stores";
import { useEffect } from "react";

export function useHandleTechWorkNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { goToTechWorkPage, isTechWork, goToHome } = useGlobalStore();

  const handleTechWorkNavigation = () => {
    if (pathname === "/technical_works") return;
    if (!isTechWork) return;
    goToTechWorkPage();
    router.push("/technical_works");
  };

  const handleTechWorkNavigationBack = () => {
    if (pathname !== "/technical_works") return;
    if (isTechWork) return;
    goToHome();
    router.refresh();
  };

  return { handleTechWorkNavigation, handleTechWorkNavigationBack};
}