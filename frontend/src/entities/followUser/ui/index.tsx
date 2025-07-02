"use client";

import Image from "next/image";
import Link from "next/link";
import s from "./followUser.module.scss";
import { useEffect, useRef, useState } from "react";
import { FastAverageColorResult, FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

export default function FollowUser({
	id,
	avatarUrl,
	username,
}: {
	id: number;
	avatarUrl?: string;
	username: string;
}) {
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const target = e.currentTarget;
		target.src = "/withoutAvatar.png";
	};

	const imgRef = useRef<HTMLImageElement>(null);
	const [shadowColor, setShadowColor] = useState<string>("#666666");
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);

	useEffect(() => {
		const img = imgRef.current;
		if (!img || !imageLoaded) return;

		const isDefaultImage = img.src.includes("withoutAvatar.png");

		if (isDefaultImage) {
			setShadowColor("#666666");
			return;
		}

		fac
			.getColorAsync(img)
			.then((res: FastAverageColorResult) => {
				setShadowColor(res.hex || res.rgb);
			})
			.catch((error: Error) => {
				console.warn("FastAverageColor error:", error);
				setShadowColor("#666666");
			});
	}, [avatarUrl, imageLoaded]);

	return (
		<Link href={`/account/${id}`} className={s.container}>
			<Image
				src={
					avatarUrl
						? `/api/image-proxy?url=${encodeURIComponent(avatarUrl)}`
						: "/withoutAvatar.png"
				}
				alt={username}
				width={64}
				height={64}
				onError={handleImageError}
				onLoadingComplete={() => setImageLoaded(true)}
				className={s.avatar}
				ref={imgRef}
				style={{
					boxShadow: `0 0 25px 5px ${shadowColor}`,
					border: `2px solid ${shadowColor}`,
				}}
			/>
			<p className={s.username}>{username}</p>
		</Link>
	);
}
