"use client";

import React from "react";
import s from "./NoStories.module.scss";
import { useRouter } from "next/navigation";

export default function NoStories() {
	const router = useRouter();
	return (
		<div className={s.emptyState}>
			<div className={s.orbit}>
				<div className={s.planet}></div>
				<div className={s.ring}></div>
			</div>
			<h1 className={s.title}>Пока здесь пусто</h1>
			<p className={s.subtitle}>Будьте первым, кто создаст историю!</p>
			<button className={s.createButton} onClick={() => router.push("/create")}>
				Создать историю
			</button>
		</div>
	);
}
