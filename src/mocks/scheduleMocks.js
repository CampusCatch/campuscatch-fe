// 카테고리 목록
export const CATEGORY_OPTIONS = [
  "학사",
  "장학",
  "취업",
  "국제교류",
  "근로/조교",
  "MY",
];

// 일정 목데이터
export const MOCK_SCHEDULES = [
  // ========= 혼합 카테고리 (카테고리 + MY) =========
  {
    id: "mix-1",
    title: "중간고사 기간 (내 일정)",
    startDate: "2025. 09. 15.",
    endDate: "2025. 09. 19.",
    categories: ["학사", "MY"],
    memo: "전공 과목 위주로 정리",
    description:
      "1학기 중간고사 기간입니다. 전공 과목 위주로 시험 일정과 범위를 미리 확인해 두세요.",
    originalLink: "https://portal.sejong.ac.kr/academic/midterm",
  },
  {
    id: "mix-2",
    title: "IT 직무 취업설명회 (참가 신청)",
    startDate: "2025. 9. 15.",
    endDate: "2025. 10. 03.",
    categories: ["취업", "MY"],
    memo: "포트폴리오 지참",
    description:
      "IT 직무 취업 설명회가 열립니다. 현직자의 강연과 채용 담당자의 상담이 진행되며, 포트폴리오를 지참하면 개별 피드백을 받을 수 있습니다.",
    originalLink: "https://job.sejong.ac.kr/event/it-info-session",
  },

  // ========= 학사 전용 =========
  {
    id: "acad-1",
    title: "1학기 개강",
    startDate: "2025. 09. 02.",
    endDate: "2025. 09. 15.",
    categories: ["학사"],
    memo: "",
    description:
      "2025학년도 1학기가 개강합니다. 강의 시간표와 강의실을 다시 한 번 확인해 주세요.",
    originalLink: "https://portal.sejong.ac.kr/academic/calendar",
  },
  {
    id: "acad-2",
    title: "수강신청 정정 마감",
    startDate: "2025. 09. 15.",
    endDate: "2025. 09. 15.",
    categories: ["학사"],
    memo: "",
    description:
      "수강신청 정정 기간 마감일입니다. 수강 인원, 시간표 충돌 등을 다시 확인하고 필요한 과목은 오늘까지 정정해야 합니다.",
    originalLink: "https://portal.sejong.ac.kr/academic/registration",
  },

  // ========= 장학 전용 =========
  {
    id: "scholar-1",
    title: "성적우수 장학금 신청 마감",
    startDate: "2025. 10. 10.",
    endDate: "2025. 10. 10.",
    categories: ["장학"],
    memo: "성적 증명서 준비",
    description:
      "성적우수 장학금 신청 마감일입니다. 성적 증명서와 기타 제출 서류를 준비해 마감 전에 신청을 완료하세요.",
    originalLink: "https://portal.sejong.ac.kr/scholarship/grade",
  },
  {
    id: "scholar-2",
    title: "국가장학금 2차 신청",
    startDate: "2025. 9. 15.",
    endDate: "2025. 10. 10.",
    categories: ["장학"],
    memo: "",
    description:
      "국가장학금 2차 신청 기간입니다. 한국장학재단 사이트에서 온라인 신청 후 학교에 필요한 서류를 제출해야 합니다.",
    originalLink: "https://www.kosaf.go.kr/ko/scholarship.do",
  },

  // ========= 취업 전용 =========
  {
    id: "career-1",
    title: "하반기 공채 대비 특강",
    startDate: "2025. 11. 25.",
    endDate: "2025. 11. 26.",
    categories: ["취업"],
    memo: "",
    description:
      "하반기 공채 대비를 위한 자기소개서·면접 전략 특강입니다. 주요 대기업/IT 기업의 최근 채용 트렌드를 함께 다룹니다.",
    originalLink: "https://job.sejong.ac.kr/program/public-recruit",
  },
  {
    id: "career-2",
    title: "캠퍼스 리크루팅 박람회",
    startDate: "2025. 10. 05.",
    endDate: "2025. 10. 05.",
    categories: ["취업"],
    memo: "",
    description:
      "교내 캠퍼스 리크루팅 박람회가 열립니다. 여러 기업의 채용 부스를 방문해 상담을 받고 채용 정보를 확인할 수 있습니다.",
    originalLink: "https://job.sejong.ac.kr/jobfair",
  },

  // ========= 국제교류 전용 =========
  {
    id: "intl-1",
    title: "교환학생 설명회",
    startDate: "2025. 11. 26.",
    endDate: "2025. 11. 26.",
    categories: ["국제교류"],
    memo: "질문 리스트 미리 준비",
    description:
      "해외 파견 교환학생 프로그램 안내 설명회입니다. 지원 자격, 파견 대학, 장학 혜택, 준비 일정 등을 안내합니다.",
    originalLink: "https://global.sejong.ac.kr/exchange/info",
  },
  {
    id: "intl-2",
    title: "해외 인턴십 모집 마감",
    startDate: "2025. 11. 28.",
    endDate: "2025. 11. 28.",
    categories: ["국제교류"],
    memo: "",
    description:
      "해외 인턴십 프로그램 모집 마감일입니다. 참가 신청서와 어학 성적 등 필요한 서류를 오늘까지 제출해야 합니다.",
    originalLink: "https://global.sejong.ac.kr/internship",
  },

  // ========= 근로/조교 전용 =========
  {
    id: "work-1",
    title: "도서관 근로 장학생 면접",
    startDate: "2025. 12. 12.",
    endDate: "2025. 12. 12.",
    categories: ["근로/조교"],
    memo: "이력서 출력",
    description:
      "도서관 근로 장학생 선발 면접이 진행됩니다. 이력서를 출력해 지참하고, 면접 시간 10분 전까지 대기해 주세요.",
    originalLink: "https://portal.sejong.ac.kr/workstudy/library",
  },
  {
    id: "work-2",
    title: "학부 연구생 지원 마감",
    startDate: "2025. 12. 25.",
    endDate: "2025. 12. 25.",
    categories: ["근로/조교"],
    memo: "",
    description:
      "학부 연구생 모집 지원 마감일입니다. 연구 계획서와 지도교수 서명을 포함한 지원서를 제출해야 합니다.",
    originalLink: "https://portal.sejong.ac.kr/undergrad/research",
  },

  // ========= MY 전용(개인 일정) =========
  {
    id: "my-1",
    title: "개인 프로젝트 데모",
    startDate: "2025. 09. 01.",
    endDate: "2025. 09. 01.",
    categories: ["MY"],
    memo: "캡스톤 팀 공유",
    description:
      "진행 중인 개인 프로젝트 데모를 팀원들에게 공유하는 날입니다. 주요 기능과 데모 시나리오를 정리해 두세요.",
    originalLink: "",
  },
  {
    id: "my-2",
    title: "스터디 모임",
    startDate: "2025. 10. 08.",
    endDate: "2025. 10. 08.",
    categories: ["MY"],
    memo: "",
    description:
      "주간 스터디 모임입니다. 이번 주에는 알고리즘 문제 풀이와 코드 리뷰를 진행할 예정입니다.",
    originalLink: "",
  },
];

// 관심 일정(관심 일정 등록 페이지에서 사용할 기본 선택값) 목데이터
export const MOCK_INTEREST_SCHEDULE_IDS = ["mix-1", "scholar-1", "career-2"];
