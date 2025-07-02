"use client";

import { useUsersStore } from "@/shared/stores";
import s from "./Billing.module.scss";
import { UserPlan } from "@/shared/lib";

export default function Billing() {
	const { currentUser } = useUsersStore();

	return (
		<div className={s.container}>
			<div className={s.billingHeader}>
				<h2 className={s.planText}>
					Ваш текущий уровень подписки:{" "}
					{!currentUser?.plan
						? "не определён"
						: currentUser.plan.toString() === UserPlan.free.toString()
							? "базовый"
							: currentUser.plan.toString() === UserPlan.level_1.toString()
								? "первый"
								: "второй"}
				</h2>
				{currentUser?.planWillDeleteAt && (
					<h2 className={s.planTerm}>
						{" "}
						Действует до: ${currentUser?.planWillDeleteAt.getDate()}{" "}
					</h2>
				)}
			</div>
			<div className={s.plansContainer}>
				<div className={s.planContainer}>
					<div className={s.planName}>
						<h2>Подписка базового уровня</h2>
						<h2>Стоимость: - </h2>
					</div>
					<h2 className={s.text}>О подписке</h2>
					<div className={s.planDescription}>
						<ul>
							<li>Публикация историй (максимум 20 на аккаунте)</li>
							<li>Неограниченное чтение историй других пользователей</li>
							<li>Максимум 20 подписок на других пользователей</li>
							<li>
								Вставка картинок на общий вес не более чем на 20мб за 3 дня
							</li>
						</ul>
					</div>
					<div className={s.btnContainer}>
						<button className={s.disabledBtn}>Приобрести</button>
					</div>
				</div>
				<div className={s.planContainer}>
					<div className={s.planName}>
						<h2>Подписка первого уровня</h2>
						<h2>Стоимость: 500₽</h2>
					</div>
					<h2 className={s.text}>О подписке</h2>
					<div className={s.planDescription}>
						<ul>
							<li>Неограниченная публикация историй</li>
							<li>Неограниченное чтение историй других пользователей</li>
							<li>
								Неограниченные подписки на других пользователей, а также лайки
							</li>
							<li>
								Вставка картинок на общий вес не более чем на 50мб за 3 дня
							</li>
							<li>Уникальная роль в нашем дискорд сервере</li>
							<li>
								Реферальная система, которая дает одноразовую скидку 20% на все
								подписки
							</li>
						</ul>
					</div>
					<div className={s.btnContainer}>
						<button className={s.btn}>Приобрести</button>
					</div>
				</div>
				<div className={s.planContainer}>
					<div className={s.planName}>
						<h2>Подписка второго уровня</h2>
						<h2>Стоимость: 1500₽</h2>
					</div>
					<h2 className={s.text}>О подписке</h2>
					<div className={s.planDescription}>
						<ul>
							<li>Неограниченная публикация историй</li>
							<li>Неограниченное чтение историй других пользователей</li>
							<li>
								Неограниченные подписки на других пользователей, а также лайки
							</li>
							<li>Вставка картинок на неогранниченное количество веса</li>
							<li>Лучшая роль спонсора в нашем дискорд сервере</li>
							<li>
								Реферальная система, которая дает одноразовую скидку 60% на все
								подписки
							</li>
							<li>Пожизненная скидка на подписки 20%</li>
						</ul>
					</div>
					<div className={s.btnContainer}>
						<button className={s.btn}>Приобрести</button>
					</div>
				</div>
			</div>
		</div>
	);
}
