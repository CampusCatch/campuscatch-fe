// 카테고리 목록
export const CATEGORY_OPTIONS = [
  "학사",
  "장학",
  "취업",
  "국제교류",
  "근로/조교",
  "MY",
];

// 카테고리 ID 매핑 참고 (목데이터용)
// 학사: 1, 장학: 2, 취업: 3, 국제교류: 4, 근로/조교: 5, MY: 6

// 일정 목데이터
export const MOCK_SCHEDULES = [
  // ========= 혼합 카테고리 (카테고리 + MY) =========
  {
    id: "mix-1",
    title: "기말고사 기간",
    startDate: "2025-12-15T09:00:00",
    endDate: "2025-12-19T18:00:00",
    categories: ["학사", "MY"],
    description:
      "2학기 기말고사 기간입니다. 전공 과목 위주로 시험 일정과 범위를 미리 확인해 두세요.",
    originalLink: null,

    // 새 필드들
    categoryId: 1,
    location: "세종대학교 전 캠퍼스",
    collegeId: null,
    target: "전체 재학생",
    paymentDate: null,
    requiredDocuments: "학생증 지참",
  },
  {
    id: "mix-2",
    title: "IT 직무 취업설명회 (참가 신청)",
    startDate: "2025-12-22T10:00:00",
    endDate: "2026-01-03T18:00:00",
    categories: ["취업", "MY"],
    memo: "포트폴리오 지참",
    description:
      "IT 직무 취업 설명회가 열립니다. 현직자의 강연과 채용 담당자의 상담이 진행되며, 포트폴리오를 지참하면 개별 피드백을 받을 수 있습니다.",
    originalLink: "https://job.sejong.ac.kr/event/it-info-session",

    categoryId: 3,
    location: "대양AI센터 B103",
    collegeId: 2, // 예: 소프트웨어융합대학
    target: "IT·컴퓨터공학 계열 재학생",
    paymentDate: null,
    requiredDocuments: null,
  },

  // ========= 학사 전용 =========
  {
    id: "acad-1",
    title: "2025년 캠퍼스타운조성단 세종 글로벌 아이디어 해커톤 프로그램",
    startDate: "2025-12-12T17:00:00",
    endDate: "2025-12-12T21:00:00",
    categories: ["학사"],
    memo: "",
    description: "팀빌딩 & 다양한 워크샵, 비지니스 모델 구축, AI 전문가 멘토링",
    originalLink:
      "https://www.sejong.ac.kr/kor/intro/notice1.do?mode=view&articleNo=860510&article.offset=0&articleLimit=10",

    categoryId: 1,
    location: null,
    collegeId: null,
    target: "만 35세이하의 대학생, 청년",
    paymentDate: null,
    requiredDocuments: null,
  },
  {
    id: "acad-2",
    title: "2025년 캠퍼스타운조성단 세종 글로벌 아이디어 해커톤 프로그램",
    startDate: "2025-12-13T10:00:00",
    endDate: "2025-12-13T15:00:00",
    categories: ["학사"],
    memo: "",
    description: "팀빌딩 & 다양한 워크샵, 비지니스 모델 구축, AI 전문가 멘토링",
    originalLink:
      "https://www.sejong.ac.kr/kor/intro/notice1.do?mode=view&articleNo=860510&article.offset=0&articleLimit=10",

    categoryId: 1,
    location: null,
    collegeId: null,
    target: "만 35세이하의 대학생, 청년",
    paymentDate: null,
    requiredDocuments: null,
  },
  {
    id: "acad-3",
    title: "2025학년도 동계 계절학기 수강변경",
    startDate: "2025-12-08T10:00:00",
    endDate: "2025-12-09T17:00:00",
    categories: ["학사"],
    memo: "",
    description:
      "수강변경을 원하는 학생은 개설과목을 확인하고 수강신청 변경 기간 내에 수강신청을 완료하세요. 수강 변경 기간 이후의 수강 신청은 절대 불가합니다.",
    originalLink:
      "https://www.sejong.ac.kr/kor/intro/notice3.do?mode=view&articleNo=860451&article.offset=0&articleLimit=10",

    categoryId: 1,
    location: null,
    collegeId: null,
    target: null,
    paymentDate: null,
    requiredDocuments: null,
  },
  {
    id: "acad-4",
    title: "2025학년도 동계 계절학기 수강료 납부",
    startDate: "2025-12-15T09:00:00",
    endDate: "2025-12-17T16:00:00",
    categories: ["학사"],
    memo: "",
    description: "별도의 추가 납부기간은 없으니 반드시 기간 내 납부해야한다.",
    originalLink:
      "https://www.sejong.ac.kr/kor/intro/notice3.do?mode=view&articleNo=860451&article.offset=0&articleLimit=10",

    categoryId: 1,
    location: null,
    collegeId: null,
    target: null,
    paymentDate: null,
    requiredDocuments: null,
  },
  {
    id: "acad-5",
    title: "2025학년도 수업실연 경진대회 수상",
    startDate: "2025-12-16T13:00:00",
    endDate: "2025-12-16",
    categories: ["학사"],
    memo: "",
    description: "수상대상자는 해당 링크를 통해서 확인해주시길 바랍니다.",
    originalLink:
      "https://www.sejong.ac.kr/kor/intro/notice3.do?mode=view&articleNo=859659&article.offset=0&articleLimit=10",

    categoryId: 1,
    location: "광개토관 109호",
    collegeId: null,
    target: null,
    paymentDate: null,
    requiredDocuments: null,
  },
  {
    id: "acad-6",
    title: "2025-2학기 3차 영어졸업인증 신청",
    startDate: "2025-12-08",
    endDate: "2025-12-12",
    categories: ["학사"],
    memo: "",
    description:
      "신청 기간 내에만 접수 가능합니다. 신청 방법은 해당 링크를 통해 확인해주시길 바랍니다.",
    originalLink:
      "https://www.sejong.ac.kr/kor/intro/notice3.do?mode=view&articleNo=859580&article.offset=10&articleLimit=10",

    categoryId: 1,
    location: "광개토관 109호",
    collegeId: null,
    target: null,
    paymentDate: null,
    requiredDocuments: "유효기간이 남아 있는 공인 영어 성적표(원본) 제출",
  },

  // ========= 장학 전용 =========

  // ========= 취업 전용 =========

  // ========= 국제교류 전용 =========
  {
    id: "intl-1",
    title: "2025-2학기 크리스마스 이벤트",
    startDate: "2025-12-18T10:00:00",
    endDate: "2025-12-19T17:00:00",
    categories: ["국제교류"],
    memo: null,
    description:
      "참여방법 (1) 원스탑서비스센터 방문 (2) 소원트리작성 (3) 서명 후 기념품 받기 (4) 선착순 220개 증정",
    originalLink:
      "https://www.sejong.ac.kr/kor/intro/notice4.do?mode=view&articleNo=860436&article.offset=0&articleLimit=10",

    categoryId: 4,
    location: "학생회관 202호 원스탑서비스센터",
    collegeId: null,
    target: null,
    paymentDate: null,
    requiredDocuments: null,
  },

  // ========= 근로/조교 전용 =========

  // ========= MY 전용(개인 일정) =========
  {
    id: "my-1",
    title: "캡스톤 프로젝트 발표",
    startDate: "2025-12-05T13:30:00",
    endDate: "2025-12-05",
    categories: ["MY"],
    memo: "캡스톤 팀 발표",
    description:
      "창의경진설계대회에서 발표하는 날입니다. 주요 기능과 발표 시나리오를 정리해 두세요.",
    originalLink: "",

    categoryId: 6,
    location: "대양AI센터 3층 콜라보랩",
    collegeId: 2,
    target: "캡스톤 참여자",
    paymentDate: null,
    requiredDocuments: "포스터",
  },
];
