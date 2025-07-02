import { getUsersFollowings } from "@/shared/api/follow/queries";
import { getUsersFollowers } from "@/shared/api/follow/queries";

export const fetchFollowsByUserId = async (userId: number) => {
	const userFollowings = await getUsersFollowings(userId);
	const userFollowers = await getUsersFollowers(userId);

	return { userFollowings, userFollowers };
};
