import { create } from "zustand";
import {
	devtools,
	persist,
	subscribeWithSelector,
	createJSONStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { UsersStore } from "@/shared/lib/types";
import { usersSlice, followsSlice } from "./slices";

export const useUsersStore = create<UsersStore>()(
	devtools(
		persist(
			subscribeWithSelector(
				immer((...a) => ({
					...usersSlice(...a),
					...followsSlice(...a),
				})),
			),
			{
				name: "users-storage",
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);
