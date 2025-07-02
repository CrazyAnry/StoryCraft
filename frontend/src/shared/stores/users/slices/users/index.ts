import { UsersSlice, UsersStore } from "@/shared/lib";
import { StateCreator } from "zustand";
import { IUser, IAccountInfoState } from "@/shared/lib/types";
import { toast } from "react-toastify";

export const usersSlice: StateCreator<
	UsersStore,
	[["zustand/immer", never]],
	[],
	UsersSlice
> = (set) => ({
	// State
	users: [],
	currentUser: null,
	accountInfoState: {
		usernameIsEditting: false,
		bioIsEditting: false,
		usernameValue: "",
		bioValue: "",
	},
	allUserStories: [],

	// Actions
	setUsers: (users) =>
		set((state) => {
			state.users = users;
		}),
	setCurrentUser: (user) =>
		set((state) => {
			state.currentUser = user;
		}),
	updateUser: (id: number, user: IUser) =>
		set((state) => {
			state.users = state.users.map((u) =>
				u.id === id ? { ...u, ...user } : u,
			);
			state.currentUser = { ...state.currentUser, ...user };
		}),
	setAllUserStories: (stories) =>
		set((state) => {
			state.allUserStories = stories;
		}),
	updateAccountInfoState: (accountInfoState: IAccountInfoState) =>
		set((state) => {
			state.accountInfoState = accountInfoState;
		}),
});
