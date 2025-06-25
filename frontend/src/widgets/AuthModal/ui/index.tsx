"use client";

import { Modal } from "@/shared/ui";
import React, { useEffect, useState } from "react";
import s from "./MainModal.module.scss";
import { useSettingsStore, useUsersStore } from "@/shared/stores";
import { useShallow } from "zustand/shallow";

export default function HomeModal() {
	const { currentUser } = useUsersStore()
	const {theme} = useSettingsStore(useShallow((state) => state))

	return (
		<>
			{currentUser && (
				<Modal>
					<h1 className={theme === "dark" ? s.alertDark : s.alertLight}>Приветствую, {currentUser.username}</h1>
				</Modal>
			)}
		</>
	);
}
