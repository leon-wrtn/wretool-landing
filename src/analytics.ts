// ─────────────────────────────────────────────────────────────
// 분석 계측 (WRE-6)
// 제공자 추상화: GoatCounter(기본) / Plausible / GA4(gtag) 모두 지원.
// - 페이지뷰: 스크립트 로드시 자동 집계
// - 전환 이벤트: trackEvent() 로 수동 집계 (대기자 등록 성공 시 호출)
// 미설정(provider="")이면 모든 호출이 안전하게 no-op.
// ─────────────────────────────────────────────────────────────

import {
  ANALYTICS_PROVIDER,
  GOATCOUNTER_ENDPOINT,
  PLAUSIBLE_DOMAIN,
} from "./config";

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars: { path: string; title?: string; event?: boolean }) => void;
      no_onload?: boolean;
    };
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function injectScript(src: string, attrs: Record<string, string> = {}) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

/** 앱 부트스트랩 시 1회 호출. 제공자 스크립트를 주입한다(= 페이지뷰 자동 집계). */
export function initAnalytics() {
  if (typeof window === "undefined") return;

  if (ANALYTICS_PROVIDER === "goatcounter" && GOATCOUNTER_ENDPOINT) {
    injectScript("//gc.zgo.at/count.js", {
      "data-goatcounter": GOATCOUNTER_ENDPOINT,
    });
    return;
  }

  if (ANALYTICS_PROVIDER === "plausible" && PLAUSIBLE_DOMAIN) {
    // 수동 이벤트(script.manual)도 함께 쓰도록 manual 변형 로드
    injectScript("https://plausible.io/js/script.manual.js", {
      "data-domain": PLAUSIBLE_DOMAIN,
    });
    return;
  }
  // provider="" 또는 미설정 → no-op
}

/**
 * 전환 이벤트 집계. 대기자 등록 성공 시 호출한다.
 * @param name 사람이 읽는 이벤트명 (Plausible/GA용)
 * @param path GoatCounter용 경로형 식별자 (예: "waitlist-signup")
 */
export function trackEvent(name: string, path: string) {
  if (typeof window === "undefined") return;
  try {
    // GoatCounter
    window.goatcounter?.count?.({ path, title: name, event: true });
    // Plausible
    window.plausible?.(name);
    // GA4 (있으면)
    window.gtag?.("event", path.replace(/-/g, "_"));
  } catch {
    // 분석 실패가 사용자 흐름을 막지 않도록 무시
  }
}
