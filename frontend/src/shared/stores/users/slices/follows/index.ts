import { UsersStore } from "@/shared/lib";
import { StateCreator } from "zustand";
import { FollowsSlice, IFollow } from "@/shared/lib/types";

export const followsSlice: StateCreator<
	UsersStore,
	[["zustand/immer", never]],
	[],
	FollowsSlice
> = (set, get) => ({
	// State
	allFollows: [],

	// Actions
	setAllFollows: (allFollows) =>
		set((state) => {
			state.allFollows = allFollows;
		}),
	addFollow: (follow: IFollow) =>
		set((state) => {
			state.allFollows.push(follow);
		}),
	removeFollow: (followingId: number, followerId: number) =>
		set((state) => {
			state.allFollows = state.allFollows.filter(
				(s) => s.followingId !== followingId || s.followerId !== followerId,
			);
		}),
	getAccountFollowers: (accountId: number): IFollow[] => {
		const state = get();
		return state.allFollows.filter((s) => s.followingId === accountId);
	},
	getAccountFollowings: (accountId: number): IFollow[] => {
		const state = get();
		return state.allFollows.filter((s) => s.followerId === accountId);
	},
});
