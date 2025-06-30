// 얼굴 탭의 세부 카테고리 정의 (id는 파일명의 prefix와 일치시킵니다)
export const FACE_TABS = [
  { id: 'all', name: '전체' },
  { id: 'face_skin', name: '피부색' },
  { id: 'face_hair', name: '머리' },
  { id: 'face_eyes', name: '눈' },
  { id: 'face_nose', name: '코' },
  { id: 'face_mouth', name: '입' },
  { id: 'face_mole', name: '점' },
];

// 패션 탭의 세부 카테고리 정의 (id는 파일명의 prefix와 일치시킵니다)
export const FASHION_TABS = [
  { id: 'all', name: '전체' },
  { id: 'fashion_top', name: '상의' },
  { id: 'fashion_bottom', name: '하의' },
  { id: 'fashion_set', name: '세트' },
  { id: 'fashion_shoes', name: '신발' },
  { id: 'fashion_acc', name: '악세서리' }, // 모든 악세서리는 fashion_acc로 시작
];

/**
 * 이미지 파일 이름에서 카테고리(prefix)를 추출하는 함수입니다.
 * 새로운 파일명 규칙을 완벽하게 지원하도록 수정되었습니다.
 * 예: "fashion_acc_head_01.png" -> "fashion_acc_head"
 */
export const getCategoryFromFileName = (fileName: string): string => {
  // ".png"와 같은 확장자를 제거합니다.
  const nameWithoutExtension = fileName.split('.')[0];
  // 마지막 숫자 부분을 제거합니다. (예: "face_hair_02" -> "face_hair")
  const category = nameWithoutExtension.replace(/_\d+$/, '');
  return category;
};

/**
 * 파일 이름에서 대표 카테고리(face, outfit, item)를 반환하는 함수입니다.
 * Zustand 스토어를 업데이트할 때 사용됩니다.
 */
export const getMainCategory = (fileName: string) => {
    if (fileName.startsWith('face_')) return 'face';
    if (fileName.startsWith('fashion_')) return 'outfit';
    // 악세서리는 outfit.item 이 아닌 item 객체에 속하므로 별도 처리
    if (fileName.startsWith('fashion_acc_')) return 'item';
    return 'unknown';
}

/**
 * 파일 이름에서 세부 파츠(skinColor, hair, top 등)를 반환하는 함수입니다.
 * Zustand 스토어를 업데이트할 때 사용됩니다.
 */
export const getPartName = (fileName: string) => {
    const category = getCategoryFromFileName(fileName);
    // face_skin -> skinColor, fashion_acc_head -> head 와 같이 변환
    if(category.startsWith('face_')) return category.substring(5); // "face_" 제거
    if(category.startsWith('fashion_top')) return 'top';
    if(category.startsWith('fashion_bottom')) return 'bottom';
    if(category.startsWith('fashion_set')) return 'set';
    if(category.startsWith('fashion_shoes')) return 'shoes';
    if(category.startsWith('fashion_acc_')) return category.substring(12); // "fashion_acc_" 제거

    return category;
}