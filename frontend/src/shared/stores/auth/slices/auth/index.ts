import { logout } from "@/shared/api/auth/mutations";
import { AuthSlice, AuthStore } from "@/shared/lib";
import { StateCreator } from "zustand";
import { toast } from "react-toastify";

export const authSlice: StateCreator<
	AuthStore,
	[["zustand/immer", never]],
	[],
	AuthSlice
> = (set) => ({
	// State
	user: null,
	isAuth: false, // начальное значение

	// Actions
	setUser: (user) =>
		set((state) => {
			state.user = user;
			state.isAuth = !!user;
		}),
	setIsAuth: (isAuth) => set({ isAuth }),
	logout: async () => {
		set({ user: null, isAuth: false });
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		await logout();
		toast.success("You have been logged out");
	},
});
