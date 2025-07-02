import { UsersSlice, FollowsSlice } from "@/shared/lib";

export * from "./slices";
export type UsersStore = UsersSlice & FollowsSlice;
