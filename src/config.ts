// ─────────────────────────────────────────────────────────────
// 외부 서비스 설정 (WRE-6)
// 여기 값들은 "비밀"이 아니라 공개 식별자(폼 엔드포인트·분석 도메인)다.
// 빌드 타임 상수이며, .env 의 VITE_* 로 덮어쓸 수 있다.
// 미설정 시 안전 폴백: 폼은 동작하지만 분석은 no-op.
// ─────────────────────────────────────────────────────────────

const env = import.meta.env;

// 대기자 등록 폼 제출 엔드포인트.
//  - 기본값: FormSubmit(formsubmit.co) — 계정 불필요, leon@wrtn.io 인박스로 수신.
//    최초 제출 시 활성화 메일 1회 클릭 필요(수신자=CEO).
//  - Formspree/Tally 등 대시보드형 서비스로 바꾸려면 VITE_FORM_ENDPOINT 만 교체.
//    (예: https://formspree.io/f/xxxxxxx — AJAX/JSON 응답을 주는 엔드포인트)
export const FORM_ENDPOINT: string =
  env.VITE_FORM_ENDPOINT ?? "https://formsubmit.co/ajax/leon@wrtn.io";

// 분석 제공자: "goatcounter" | "plausible" | "" (빈 값이면 비활성)
export const ANALYTICS_PROVIDER: string =
  env.VITE_ANALYTICS_PROVIDER ?? "goatcounter";

// GoatCounter — 무쿠키·프라이버시 친화·무료. 쿠키 배너 불필요(Plausible과 동일 장점).
// 대시보드: https://wretool.goatcounter.com/
export const GOATCOUNTER_ENDPOINT: string =
  env.VITE_GOATCOUNTER_ENDPOINT ?? "https://wretool.goatcounter.com/count";

// Plausible 사용 시 도메인(예: wretool.com). ANALYTICS_PROVIDER=plausible 일 때만 사용.
export const PLAUSIBLE_DOMAIN: string = env.VITE_PLAUSIBLE_DOMAIN ?? "";

// 전환 이벤트 이름/경로 (대기자 등록 성공)
export const CONVERSION_EVENT = "waitlist-signup";
