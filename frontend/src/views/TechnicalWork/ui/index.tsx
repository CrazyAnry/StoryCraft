"use client";

import s from "./TechnicalWork.module.scss";
import { useEffect } from "react";
import { useHandleTechWorkNavigation } from "@/shared/lib/hooks";
import { useGlobalStore } from "@/shared/stores";

export default function TechnicalWorks() {
  const {isTechWork} = useGlobalStore();
  const { handleTechWorkNavigationBack } = useHandleTechWorkNavigation();

  useEffect(() => {
    if (!isTechWork) {
      handleTechWorkNavigationBack();
    }
  }, []);

  return (
    <div className={s.technicalWorks}>
      <h1 className={s.title}>
        Сейчас ведутся технически работы...
        <br />
        Сайт будет доступен в 18:00 Киев/МСК
        <br />
        Подробнее в нашем{" "}
        <a
          className={s.link}
          target="_blank"
          href="https://t.me/StoryCraftTeam"
        >
          телеграмм канале
        </a>{" "}
        и{" "}
        <a
          className={s.link}
          target="_blank"
          href="https://t.me/+xCg9EgDCJg40YTYy"
        >
          группе{" "}
        </a>
      </h1>
    </div>
  );
}
