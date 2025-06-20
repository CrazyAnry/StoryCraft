"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useUsersStore } from "@/shared/stores/users";
import s from "./Account.module.scss";
import { AccountInfo, AvatarContainer } from "@/widgets";
import {
  fetchUserByIdOrUsername,
  fetchFollowsByUserId,
} from "@/shared/lib/helpers";

export default function AccountPage() {
  const { userIdOrUsername } = useParams();
  const {
    users,
    setUsers,
    setCurrentUser,
    currentUser,
    setAllFollows,
    allFollows,
  } = useUsersStore();

  useEffect(() => {
    if (!userIdOrUsername) return;

    fetchUserByIdOrUsername({
      userIdOrUsername: userIdOrUsername as string,
      setCurrentUser,
      users,
      setUsers,
    });
  }, [userIdOrUsername]);

  if (!currentUser) return null;

  useEffect(() => {
    const fetchFollows = async () => {
      if (!currentUser?.id) return; // Добавляем проверку

      try {
        const result = await fetchFollowsByUserId(currentUser.id);
        console.log("Follows data:", result);

        // Проверяем, что данные существуют и являются массивами
        const followings = Array.isArray(result?.userFollowings)
          ? result.userFollowings
          : [];
        const followers = Array.isArray(result?.userFollowers)
          ? result.userFollowers
          : [];

        // Объединяем только если данные валидны
        setAllFollows([...followings, ...followers]);
        console.log(1, allFollows);
      } catch (error) {
        console.error("Error fetching follows:", error);
      }
    };

    fetchFollows();
  }, [currentUser?.id]); // Зависимость только от id

  return (
    <div className={s.container}>
      <AvatarContainer />
      <AccountInfo />
    </div>
  );
}
