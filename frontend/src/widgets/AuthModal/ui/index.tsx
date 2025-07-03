"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/shared/stores";

export default function HomeModal() {
  const { user } = useAuthStore();

  useEffect(() => {
    toast.info(
      `Приветствую, ${user?.username || "путник без аккаунта)"} Переместите на плашку курсор чтобы посмотреть подробнее.\n\nЗакрытое Бета Тестирование предполагает инвайты только доверенным людям. Вы можете использовать весь функционал, делиться впечатлениями, искать баги, собственно для этого мы сюда и запросили вас. Наслаждайтесь!`,
      {
        className: "toast",
      }
    );
  }, []);
  return <></>;
}
