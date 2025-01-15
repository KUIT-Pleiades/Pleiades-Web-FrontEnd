import top01 from '../../assets/Character/outfit/top/top01.png';
import top02 from '../../assets/Character/outfit/top/top02.png';
import top03 from '../../assets/Character/outfit/top/top03.png';
import top04 from '../../assets/Character/outfit/top/top04.png';
import top05 from '../../assets/Character/outfit/top/top05.png';

import bottom01 from '../../assets/Character/outfit/bottom/bottom01.png';
import bottom02 from '../../assets/Character/outfit/bottom/bottom02.png';
import bottom03 from '../../assets/Character/outfit/bottom/bottom03.png';
import bottom04 from '../../assets/Character/outfit/bottom/bottom04.png';

import shoes01 from '../../assets/Character/outfit/shoes/shoes01.png';
import shoes02 from '../../assets/Character/outfit/shoes/shoes02.png';
import shoes03 from '../../assets/Character/outfit/shoes/shoes03.png';
import shoes04 from '../../assets/Character/outfit/shoes/shoes04.png';
import shoes05 from '../../assets/Character/outfit/shoes/shoes05.png';

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
	},
	bottom: {
		bottom01,
		bottom02,
    bottom03,
    bottom04,
	},
	shoes: {
		shoes01,
		shoes02,
		shoes03,
    shoes04,
    shoes05,
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