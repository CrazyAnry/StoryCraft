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

  useEffect(() => {
    const fetchFollows = async () => {
      if (!currentUser?.id) return; // Early return if no current user

      try {
        const result = await fetchFollowsByUserId(currentUser.id);
        console.log("Follows data:", result);

        // Check that data exists and are arrays
        const followings = Array.isArray(result?.userFollowings)
          ? result.userFollowings
          : [];
        const followers = Array.isArray(result?.userFollowers)
          ? result.userFollowers
          : [];

        // Combine only if data is valid
        setAllFollows([...followings, ...followers]);
        console.log(1, allFollows);
      } catch (error) {
        console.error("Error fetching follows:", error);
      }
    };

    fetchFollows();
  }, [currentUser?.id]); // Dependency only on id

  // Move the conditional render AFTER all hooks
  if (!currentUser) return null;

  return (
    <div className={s.container}>
      <AvatarContainer />
      <AccountInfo />
    </div>
  );
}