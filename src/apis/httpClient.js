import { API_BASE_URL, AI_BASE_URL } from "../config/env";

// 공통 옵션 합치기용 헬퍼
const buildOptions = (options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  return {
    // 기본값: GET
    method: "GET",
    // credentials, headers 등 필요하면 여기서 공통 지정
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    ...options,
  };
};

// 백엔드용
export const apiRequest = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, buildOptions(options));

  if (!response.ok) {
    // 여기는 나중에 공통 에러처리로 빼도 됨
    const errorBody = await response.text();
    throw new Error(`API Error (${response.status}): ${errorBody}`);
  }

  // 필요에 따라 .json() 대신 .blob(), .text() 등으로 바꿀 수 있음
  return response.json();
};

// AI 서버용
export const aiRequest = async (path, options = {}) => {
  const url = `${AI_BASE_URL}${path}`;

  const response = await fetch(url, buildOptions(options));

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`AI API Error (${response.status}): ${errorBody}`);
  }

  return response.json();
};
