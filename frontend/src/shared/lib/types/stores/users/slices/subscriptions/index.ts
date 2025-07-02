import { IUser } from "@/shared/lib";
import { IAccountInfoState } from "@/shared/lib/types";
import { IFollow } from "@/shared/lib/types";

export type FollowsState = {
	allFollows: IFollow[];
};

export type FollowsActions = {
	setAllFollows: (allFollows: IFollow[]) => void;
	addFollow: (follow: IFollow) => void;
	removeFollow: (followingId: number, followerId: number) => void;
	getAccountFollowers: (accountId: number) => IFollow[];
	getAccountFollowings: (accountId: number) => IFollow[];
};

export type FollowsSlice = FollowsState & FollowsActions;
