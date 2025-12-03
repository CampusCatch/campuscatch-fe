// 단과대 ID → 이름 매핑
const COLLEGE_MAP = {
  1: "공과대학",
  2: "소프트웨어융합대학",
  3: "경영대학",
  4: "인문대학",
  5: "사회과학대학",
  6: "자연과학대학",
  7: "예체능대학",
  // 필요하면 계속 추가
};

// 단과대 이름 가져오기
export function getCollegeNameById(collegeId) {
  if (collegeId == null) return null; // null/undefined → 단과대 없음

  // 숫자/문자 둘 다 대비
  const key = Number(collegeId);

  return COLLEGE_MAP[key] ?? `단과대 ID: ${collegeId}`;
}

// (옵션) 드롭다운/필터 등에 쓰고 싶으면 이런 리스트도 같이 export 가능
export const COLLEGE_OPTIONS = Object.entries(COLLEGE_MAP).map(
  ([id, name]) => ({
    id: Number(id),
    name,
  })
);
