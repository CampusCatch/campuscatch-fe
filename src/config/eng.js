// 프로젝트 어디에서든 import.meta.env 직접 쓰지 말고 무조건 여기서만 꺼내쓰기
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const AI_BASE_URL = import.meta.env.VITE_AI_BASE_URL || "";

// 나중에 필요하면 더 추가 가능 (ex. 카카오 키 등)
export { API_BASE_URL, AI_BASE_URL };
