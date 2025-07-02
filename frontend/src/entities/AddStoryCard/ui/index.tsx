"use client";

import Image from "next/image";
import s from "./AddStoryCard.module.scss";
import Link from "next/link";

export default function AddStoryCard() {
	return (
		<Link href={`/editor/newStory`}>
			<article className={s.card}>
				<div className={s.imageContainer}>
					<div className={s.plusIcon}>
						<svg
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 4V20M4 12H20"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</div>

					<div className={s.hint}>Создать историю</div>
				</div>
			</article>
		</Link>
	);
}
