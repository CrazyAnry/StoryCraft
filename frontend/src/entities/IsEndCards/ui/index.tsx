import React from "react";
import s from "./IsEndCards.module.scss";
import { useRouter } from "next/navigation";
import { Card } from "@/shared/lib/types/IEndCards";
import { useEndCards } from "@/shared/lib/hooks/useEndCards";

export default function IsEndCards() {
	const router = useRouter();
	const { EndCards } = useEndCards();

	return (
		<div className={s.choiceContainer}>
			{EndCards.map((card: Card, index) => (
				<div
					key={index}
					onClick={() => router.push(card.path)}
					className={`${s.choice} ${s.hasAccess}`}
				>
					{card.text}
				</div>
			))}
		</div>
	);
}
