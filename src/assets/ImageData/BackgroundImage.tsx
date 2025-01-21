import starBackground01 from "../backgroundImg/starBackroundImg/backgroundImg01.png"
import starBackground02 from "../backgroundImg/starBackroundImg/backgroundImg02.png";

export interface starBackImg{
	name: string;
	src: string;
}

const images = {
	starBack: {
		starBackground01,
		starBackground02,
	}
}

export const starBackImages: starBackImg[] = [
	...Object.entries(images.starBack).map(([keyof, src]) => ({
		name: keyof,
		src,
	})),
]