import top_01 from "../../assets/Character/outfit/top/top01.png";
import top_02 from "../../assets/Character/outfit/top/top02.png";
import top_03 from "../../assets/Character/outfit/top/top03.png";
import top_04 from "../../assets/Character/outfit/top/top04.png";
import top_05 from "../../assets/Character/outfit/top/top05.png";
import top_06 from "../../assets/Character/outfit/top/top06.png";
import top_07 from "../../assets/Character/outfit/top/top07.png";
import top_08 from "../../assets/Character/outfit/top/top08.png";
import top_09 from "../../assets/Character/outfit/top/top09.png";

import bottom_01 from "../../assets/Character/outfit/bottom/bottom01.png";
import bottom_02 from "../../assets/Character/outfit/bottom/bottom02.png";
import bottom_03 from "../../assets/Character/outfit/bottom/bottom03.png";
import bottom_04 from "../../assets/Character/outfit/bottom/bottom04.png";
import bottom_05 from "../../assets/Character/outfit/bottom/bottom05.png";
import bottom_06 from "../../assets/Character/outfit/bottom/bottom06.png";
import bottom_07 from "../../assets/Character/outfit/bottom/bottom07.png";
import bottom_08 from "../../assets/Character/outfit/bottom/bottom08.png";

import shoes_01 from "../../assets/Character/outfit/shoes/shoes01.png";
import shoes_02 from "../../assets/Character/outfit/shoes/shoes02.png";
import shoes_03 from "../../assets/Character/outfit/shoes/shoes03.png";
import shoes_04 from "../../assets/Character/outfit/shoes/shoes04.png";
import shoes_05 from "../../assets/Character/outfit/shoes/shoes05.png";
import shoes_06 from "../../assets/Character/outfit/shoes/shoes06.png";
import shoes_07 from "../../assets/Character/outfit/shoes/shoes07.png";
import shoes_08 from "../../assets/Character/outfit/shoes/shoes08.png";
import shoes_09 from "../../assets/Character/outfit/shoes/shoes09.png";

export interface OutfitItem {
  name: string;
	src: string;
	tags: string;
}

const images = {
  top: {
    top_01,
    top_02,
    top_03,
    top_04,
    top_05,
    top_06,
    top_07,
    top_08,
    top_09,
  },
  bottom: {
    bottom_01,
    bottom_02,
    bottom_03,
    bottom_04,
    bottom_05,
    bottom_06,
    bottom_07,
    bottom_08,
  },
  shoes: {
    shoes_01,
    shoes_02,
    shoes_03,
    shoes_04,
    shoes_05,
    shoes_06,
    shoes_07,
    shoes_08,
    shoes_09,
  },
};

export const OutfitImages: OutfitItem[] = [
	...Object.entries(images.top).map(([key, src]) => ({
		name: key,
		src,
		tags: '상의',
	})),
	...Object.entries(images.bottom).map(([key, src]) => ({
		name: key,
		src,
		tags: '하의',
	})),
	...Object.entries(images.shoes).map(([key, src]) => ({
		name: key,
		src,
		tags: '신발',
	})),
];

export const outfitCategories = [ "전체", "상의", "하의", "신발"];