"use client";

import s from "./AccountInfo.module.scss";
import { useUsersStore } from "@/shared/stores/users";
import { BioBlock, RoleAndPlanBlock, UsernameBlock, LogoutBlock } from "@/features";

export default function AccountInfo() {
  const { currentUser } = useUsersStore();

  if (!currentUser) return null;


  return (
    <div className={s.info}>
      <UsernameBlock />

      <RoleAndPlanBlock />

      <BioBlock />

      <LogoutBlock />
    </div>
  );
}
