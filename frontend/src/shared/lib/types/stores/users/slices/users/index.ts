import { IUser } from "@/shared/lib";
import { IAccountInfoState, IStoryHeader } from "@/shared/lib/types";

export type UsersState = {
	users: IUser[];
	currentUser: IUser | null;
	accountInfoState: IAccountInfoState;
	allUserStories: IStoryHeader[];
};

export type UsersActions = {
	setUsers: (users: IUser[]) => void;
	setCurrentUser: (user: IUser | null) => void;
	updateUser: (id: number, user: IUser) => void;
	updateAccountInfoState: (accountInfoState: IAccountInfoState) => void;
	setAllUserStories: (stories: IStoryHeader[]) => void;
};

export type UsersSlice = UsersState & UsersActions;
