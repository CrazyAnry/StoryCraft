import { IUser } from "@/shared/lib";

export interface IFollow {
	id: number;
	followerId: number;
	followingId: number;
	follower: IUser;
	following: IUser;
	followerUser: IUser[];
	followingUser: IUser[];
	followedUser: IUser[];
}
