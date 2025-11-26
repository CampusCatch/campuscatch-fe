import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import TextInput from "./TextInput";

export default function LoginForm() {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState(""); // 학번
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidStudentId = /^\d{8}$/.test(studentId); // 숫자 8자리인지 확인
  const isDisabled = !isValidStudentId || !password || isSubmitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidStudentId) {
      alert("학번은 숫자 8자리로 입력해 주세요.");
      return;
    }

    // 이미 요청 중이면 중복 제출 방지
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // TODO: 로그인 API 연동
      // const response = await loginApi({ studentId, password });
      // const accessToken = response.data.accessToken;
      // localStorage.setItem("accessToken", accessToken);

      // 지금은 API 없으니까, 테스트용으로 토큰만 저장
      localStorage.setItem("accessToken", "dummy-access-token");

      // 로그인 성공 시 메인 페이지로 이동
      navigate("/", { replace: true });
    } catch (error) {
      // TODO: 에러 처리 (토스트, 에러 메시지 등)
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-md rounded-xl bg-white px-8 py-10 shadow-[0_10px_40px_rgba(15,23,42,0.15)]">
      {/* 상단 타이틀 영역 */}
      <header className="mb-8 text-center">
        <img
          src="/icons/logo.svg"
          alt="CampusCatch 로고"
          className="mx-auto mb-4 h-10 w-auto"
        />
        <h1 className="text-2xl font-semibold text-gray-90">캠퍼스캐치</h1>
        <p className="mt-2 text-sm text-gray-60">
          세종대학교 학사일정 통합 관리 서비스
        </p>
      </header>

      {/* 폼 영역 */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextInput
          label="학번"
          required
          value={studentId}
          onValueChange={setStudentId}
          placeholder="8자리 학번을 입력해 주세요"
          type="text"
        />

        <TextInput
          label="비밀번호"
          required
          value={password}
          onValueChange={setPassword}
          placeholder="포털 비밀번호를 입력해 주세요"
          type="password"
        />

        {/* 로그인 버튼 */}
        <Button type="submit" disabled={isDisabled} className="w-full mt-2">
          {isSubmitting ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </section>
  );
}
