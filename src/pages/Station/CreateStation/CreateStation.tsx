/* CreateStation.tsx
   최상위 컨테이너 컴포넌트:
   - 스텝(단계)을 관리 (정거장 정보 입력 / 배경 선택)
   - 정거장 생성에 필요한 상태(이름, 소개, 시간, 배경 등)를 상위에서 보관
   - 마지막에 서버로 전송
*/
import React, { useState } from 'react';
import s from './CreateStation.module.scss';
import { useNavigate } from 'react-router-dom';
import { fetchRequest } from '../../../functions/fetchRequest';

// 하위 스텝 컴포넌트
import CreateStationInfo from './CreateStationInfo/CreateStationInfo';
import CreateStationBackground from './CreateStationBackground/CreateStationBackground';

import background1 from '../../../assets/stationBackgroundImg/stationBackgroundImg_01.png';
import background2 from '../../../assets/stationBackgroundImg/stationBackgroundImg_02.png';
import background3 from '../../../assets/stationBackgroundImg/stationBackgroundImg_03.png';
import background4 from '../../../assets/stationBackgroundImg/stationBackgroundImg_04.png';
import backgroundPrev1 from '../../../assets/stationBackgroundImg/stationBackgroundPrevImg_01.png';
import backgroundPrev2 from '../../../assets/stationBackgroundImg/stationBackgroundPrevImg_02.png';
import backgroundPrev3 from '../../../assets/stationBackgroundImg/stationBackgroundPrevImg_03.png';
import backgroundPrev4 from '../../../assets/stationBackgroundImg/stationBackgroundPrevImg_04.png';

const stationBackgrounds = [
	background1, background2, background3, background4
];
const stationBackgroundPrevs = [
	backgroundPrev1, backgroundPrev2, backgroundPrev3, backgroundPrev4
];

const CreateStation: React.FC = () => {
	const navigate = useNavigate();
	const [step, setStep] = useState(1);

	// 정거장 정보 (이름, 소개, 시간) 상태
	const [stationName, setStationName] = useState('');
	const [stationIntro, setStationIntro] = useState('');
	const [ampm, setAmpm] = useState<'오전' | '오후'>('오전');
	const [hour, setHour] = useState('9');
	const [minute, setMinute] = useState('00');

	// 배경 선택 상태
	const [background, setBackground] = useState(background1);

	// “입력값 미완성” 팝업 표시 상태
	const [showPopup, setShowPopup] = useState(false);

	// 취소 버튼 클릭 시 동작
	const handleCancel = () => {
		navigate("/station");
		// 필요하면 뒤로가기, 모달 닫기, 메인 페이지 이동 등 원하는 로직 추가
	};
	const handleBack = () => {
		setStep(1);
	}

	// 1단계(정보 입력)에서 "다음" 버튼 누르면
	const handleInfoNext = () => {
		// 입력값 검증
		if (!stationName.trim() || !stationIntro.trim() || !hour || !minute) {
			setShowPopup(true);
			setTimeout(() => setShowPopup(false), 1500);
			return;
		}
		// 검증 통과 시 2단계(배경 선택)로 이동
		setStep(2);
	};

	// 2단계(배경 선택)에서 "완료" 버튼 누르면 서버 전송
	const handleBackgroundComplete = async () => {
		// 시간 변환 (오전/오후 → 24시간)
		const numericHour = Number(hour);
		let convertedHour = numericHour;

		if (ampm === '오후' && numericHour !== 12) {
			convertedHour = numericHour + 12;
		}
		if (ampm === '오전' && numericHour === 12) {
			convertedHour = 0;
		}
		const finalHour = convertedHour.toString().padStart(2, '0');
		const finalMinute = minute.padStart(2, '0');
		const reportNoticeTime = `${finalHour}:${finalMinute}:00`;

		const getFileName = (path: string) => {
			return path.split('/').pop()?.split('.')[0] || ''; 
		};
	
		const backgroundName = getFileName(background);

		try {
			// 서버에 최종 데이터 전송
			const response = await fetchRequest<{ message: string }>(
				'/stations',
				'POST',
				{
					backgroundName: backgroundName,
					name: stationName,
					intro: stationIntro,
					reportNoticeTime: reportNoticeTime
				}
			);
			if (!response) {
				alert('정거장 생성 실패');
				return;
			}
			// 생성 완료 후 원하는 페이지로 이동하거나 로직 추가
		} catch (error) {
			console.error('정거장 생성 중 오류:', error);
		}
	};

	return (
		<div className={s.container}>
			{/* 1단계: 정거장 정보 입력 */}
			{step === 1 && (
				<CreateStationInfo
					stationName={stationName}
					setStationName={setStationName}
					stationIntro={stationIntro}
					setStationIntro={setStationIntro}
					ampm={ampm}
					setAmpm={setAmpm}
					hour={hour}
					setHour={setHour}
					minute={minute}
					setMinute={setMinute}
					showPopup={showPopup}
					handleCancel={handleCancel}
					handleNext={handleInfoNext}
				/>
			)}

			{/* 2단계: 배경 선택 */}
			{step === 2 && (
				<CreateStationBackground
					backgrounds={stationBackgrounds}
					backgroundPrevs={stationBackgroundPrevs}
					background={background}
					setBackground={setBackground}
					handleBack={handleBack}
					handleComplete={handleBackgroundComplete}
				/>
			)}
		</div>
	);
};

export default CreateStation;