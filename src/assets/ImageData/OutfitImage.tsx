import top01 from '../../assets/Character/outfit/top/top01.png';
import top02 from '../../assets/Character/outfit/top/top02.png';
import top03 from '../../assets/Character/outfit/top/top03.png';
import top04 from '../../assets/Character/outfit/top/top04.png';
import top05 from '../../assets/Character/outfit/top/top05.png';
import top06 from "../../assets/Character/outfit/top/top06.png";
import top07 from "../../assets/Character/outfit/top/top07.png";
import top08 from "../../assets/Character/outfit/top/top08.png";
import top09 from "../../assets/Character/outfit/top/top09.png";

import bottom01 from '../../assets/Character/outfit/bottom/bottom01.png';
import bottom02 from '../../assets/Character/outfit/bottom/bottom02.png';
import bottom03 from '../../assets/Character/outfit/bottom/bottom03.png';
import bottom04 from '../../assets/Character/outfit/bottom/bottom04.png';
import bottom05 from "../../assets/Character/outfit/bottom/bottom05.png";
import bottom06 from "../../assets/Character/outfit/bottom/bottom06.png";
import bottom07 from "../../assets/Character/outfit/bottom/bottom07.png";
import bottom08 from "../../assets/Character/outfit/bottom/bottom08.png";

import shoes01 from '../../assets/Character/outfit/shoes/shoes01.png';
import shoes02 from '../../assets/Character/outfit/shoes/shoes02.png';
import shoes03 from '../../assets/Character/outfit/shoes/shoes03.png';
import shoes04 from '../../assets/Character/outfit/shoes/shoes04.png';
import shoes05 from '../../assets/Character/outfit/shoes/shoes05.png';
import shoes06 from "../../assets/Character/outfit/shoes/shoes06.png";
import shoes07 from "../../assets/Character/outfit/shoes/shoes07.png";
import shoes08 from "../../assets/Character/outfit/shoes/shoes08.png";
import shoes09 from "../../assets/Character/outfit/shoes/shoes09.png";

export interface OutfitItem {
  name: string;
	src: string;
	tags: string;
}

const images = {
  top: {
    top01,
    top02,
    top03,
    top04,
    top05,
    top06,
    top07,
    top08,
    top09,
  },
  bottom: {
    bottom01,
    bottom02,
    bottom03,
    bottom04,
    bottom05,
    bottom06,
    bottom07,
    bottom08,
  },
  shoes: {
    shoes01,
    shoes02,
    shoes03,
    shoes04,
    shoes05,
    shoes06,
    shoes07,
    shoes08,
    shoes09,
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