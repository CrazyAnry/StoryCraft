import { IChoice } from "../IChoice";
import { MaxChoicesNumber } from "../IMaxChoices";

export interface IScene {
	id?: number;
	title: string;
	image?: string | null;
	isEnd: boolean;
	storyId: number;
	description: string;
	maxChoices: MaxChoicesNumber;
	choices?: IChoice[];
}
