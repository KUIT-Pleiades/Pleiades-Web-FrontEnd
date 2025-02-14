/* CreateStationBackground.tsx
   2단계: 배경 이미지 선택 화면
   - props로 background 상태와 setBackground를 전달받아, 사용자가 선택한 배경을 업데이트
   - "완료" or "다음" 버튼 클릭 시 handleNext를 호출 → 최종 서버 전송
*/
import React from 'react';
import s from './CreateStationBackground.module.scss';


interface CreateStationBackgroundProps {
	background: string;
	setBackground: React.Dispatch<React.SetStateAction<string>>;
	handleCancel: () => void;
	handleNext: () => void;
}

const CreateStationBackground: React.FC<CreateStationBackgroundProps> = ({
	background,
	setBackground,
	handleCancel,
	handleNext,
}) => {
	// 예시로 배경 후보 이미지를 배열로 가정
	const backgrounds = [
		'../../../../assets/stationBackgroundImg/stationBackground_01.png',
		'../../../../assets/stationBackgroundImg/stationBackground_01.png',
		'../../../../assets/stationBackgroundImg/stationBackground_01.png',
	];

	return (
		<div className={s.container}>
			{/* 헤더 영역 */}
			<div className={s.header}>
				<div className={s.headerContents}>
					<button className={s.headerCancelButton} onClick={handleCancel}>
						취소
					</button>
					<span className={s.headerTitle}>정거장 배경 선택</span>
					<button className={s.headerNextButton} onClick={handleNext}>
						완료
					</button>
				</div>
			</div>

			{/* 배경 선택 영역 */}
			<div className={s.body}>
				<span className={s.guideText}>정거장 천장에 어울리는 배경을 골라보세요!</span>
				<div className={s.backgroundList}>
					{backgrounds.map((bgSrc) => (
						<div
							key={bgSrc}
							className={`${s.backgroundItem} ${
								background === bgSrc ? s.selected : ''
							}`}
							onClick={() => setBackground(bgSrc)}
						>
							<img src={bgSrc} alt="background" className={s.backgroundImage} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CreateStationBackground;