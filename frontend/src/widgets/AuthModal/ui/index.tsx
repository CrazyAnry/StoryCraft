"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useUsersStore } from "@/shared/stores";

export default function HomeModal() {
	const { currentUser } = useUsersStore();

	useEffect(() => {
		toast.info(
			`Приветствую, ${currentUser?.username} Переместите на плашку курсор чтобы посмотреть подробнее.\n\nЗакрытое Бета Тестирование предполагает инвайты только доверенным людям. Вы можете использовать весь функционал, делиться впечатлениями, искать баги, собственно для этого мы сюда и запросили вас. Наслаждайтесь!`,
			{
				className: "toast",
			},
		);
	}, []);
	return <></>;
}
