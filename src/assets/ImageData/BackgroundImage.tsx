import starBackground01 from "../backgroundImg/starBackroundImg/backgroundImg01.png"
import starBackground02 from "../backgroundImg/starBackroundImg/backgroundImg02.png";
import starBackground03 from "../backgroundImg/starBackroundImg/backgroundImg03.png";
import starBackground04 from "../backgroundImg/starBackroundImg/backgroundImg04.png";
import starBackground05 from "../backgroundImg/starBackroundImg/backgroundImg05.png";

export interface starBackImg{
	name: string;
	src: string;
}

const images = {
  starBack: {
    starBackground01,
    starBackground02,
    starBackground03,
    starBackground04,
    starBackground05,
  },
};

export const starBackImages: starBackImg[] = [
	...Object.entries(images.starBack).map(([keyof, src]) => ({
		name: keyof,
		src,
	})),
]