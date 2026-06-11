import { useState, type FormEvent } from "react";
import { FORM_ENDPOINT, CONVERSION_EVENT } from "./config";
import { trackEvent } from "./analytics";

// ─────────────────────────────────────────────────────────────
// wretool 랜딩페이지
// 포지셔닝: 뤼튼판 Retool — 사내 운영 도구(어드민·대시보드·내부 앱)를
//           코드 최소화로 빠르게 만드는 "내부 도구 빌더".
// AI는 메인이 아니라 보조 차별점(프롬프트로 쿼리·화면 초안 생성).
// 섹션: Nav → Hero → Trust → Features → How it works → Waitlist CTA → Footer
// ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "기능", href: "#features" },
  { label: "활용 사례", href: "#usecases" },
  { label: "미리보기", href: "#preview" },
  { label: "FAQ", href: "#faq" },
  { label: "문의", href: "#contact" },
];

// 구체적 유스케이스 — 가상의 일반 시나리오. 실제 고객 사례를 사칭하지 않는다.
const USE_CASES = [
  {
    tag: "CS · 운영팀",
    title: "환불·주문 조회 어드민",
    pain: "CS팀이 환불 한 건 처리하려고 매번 개발팀에 DB 조회를 요청합니다.",
    flow: [
      "주문 DB(Postgres)를 그대로 연결",
      "주문번호 검색 폼 + 결과 테이블을 드래그앤드롭으로 배치",
      "환불 버튼에 '상태 변경 + 환불 API 호출' 쿼리 연결",
      "CS팀에만 권한을 주고 원클릭 배포",
    ],
    outcome: "개발팀 티켓 없이 CS팀이 직접 처리 — 며칠 걸리던 요청이 화면 하나로.",
  },
  {
    tag: "데이터 · 그로스",
    title: "운영 지표 대시보드",
    pain: "주간 지표를 매번 SQL 돌려 스프레드시트에 붙여넣고 캡처해 공유합니다.",
    flow: [
      "분석용 DB와 내부 매출 API를 연결",
      "차트·KPI 카드 컴포넌트로 대시보드 구성",
      "기간 필터를 SQL 파라미터에 바인딩",
      "팀 전체에 읽기 권한으로 배포",
    ],
    outcome: "항상 최신 숫자를 보는 살아있는 대시보드 — 수작업 리포트가 사라집니다.",
  },
];

const FAQS = [
  {
    q: "wretool은 지금 바로 쓸 수 있나요?",
    a: "아직 개발 중인 제품으로, 현재는 대기자 명단을 모집하고 있습니다. 이 페이지의 미리보기는 실제 출시 제품이 아닌 컨셉 시안입니다. 정식 출시와 베타 초대 소식을 가장 먼저 받으시려면 대기자 등록을 해주세요.",
  },
  {
    q: "코딩을 전혀 모르는 사람도 쓸 수 있나요?",
    a: "드래그앤드롭만으로 화면을 구성할 수 있어 비개발 직군도 시작할 수 있습니다. 다만 데이터 조회·수정 같은 로직은 SQL이나 가벼운 JavaScript를 쓰면 훨씬 강력해집니다. '로우코드'에 가깝다고 보시면 됩니다.",
  },
  {
    q: "어떤 데이터소스를 연결할 수 있나요?",
    a: "Postgres·MySQL 같은 관계형 DB, REST/GraphQL API, 그리고 사내 내부 API 연결을 목표로 설계하고 있습니다. 지원 목록은 출시 시점에 구체적으로 공지할 예정입니다.",
  },
  {
    q: "AI는 어떤 역할을 하나요?",
    a: "AI는 메인이 아니라 보조 차별점입니다. 프롬프트 한 줄로 쿼리나 화면 초안을 만들어 첫 단추를 빠르게 끼우는 용도이며, 최종 도구는 직접 다듬어 완성합니다.",
  },
  {
    q: "보안과 권한 관리는 어떻게 되나요?",
    a: "팀 단위 접근 제어, 역할별 권한, 버전 관리를 제공하는 것을 목표로 합니다. 만든 내부 앱을 필요한 사람에게만 안전하게 배포할 수 있도록 설계하고 있습니다.",
  },
  {
    q: "비용은 어떻게 되나요?",
    a: "요금제는 아직 확정되지 않았습니다. 대기자 명단에 등록해 주시면 가격 정책이 정해지는 대로 가장 먼저 안내드리겠습니다.",
  },
];

const FEATURES = [
  {
    icon: "🔌",
    title: "데이터소스 즉시 연결",
    desc: "Postgres·MySQL 등 DB부터 REST/GraphQL API, 사내 내부 API까지 몇 분이면 연결합니다. 데이터를 옮길 필요 없이 있는 그대로 붙이세요.",
  },
  {
    icon: "🧱",
    title: "드래그앤드롭 UI 빌더",
    desc: "테이블·폼·차트·버튼 같은 컴포넌트를 끌어다 놓아 운영 화면을 조립합니다. 프론트엔드를 처음부터 짤 필요가 없습니다.",
  },
  {
    icon: "⌨️",
    title: "쿼리 & 로직",
    desc: "SQL로 데이터를 다루고 JavaScript로 워크플로우를 구성합니다. 조회·수정·승인 같은 운영 로직을 코드 최소화로 연결하세요.",
  },
  {
    icon: "🔐",
    title: "권한 관리 & 원클릭 배포",
    desc: "팀 협업, 접근 제어, 버전 관리까지. 만든 내부 앱을 한 번의 클릭으로 팀에 배포하고 안전하게 운영합니다.",
  },
];

const STEPS = [
  {
    no: "01",
    title: "연결 (Connect)",
    desc: "DB·API·내부 시스템 등 쓰던 데이터소스를 그대로 연결합니다. 마이그레이션 없이 바로 시작합니다.",
  },
  {
    no: "02",
    title: "조립 (Build)",
    desc: "드래그앤드롭으로 화면을 만들고 SQL·JavaScript로 로직을 붙여 운영 도구를 완성합니다.",
  },
  {
    no: "03",
    title: "배포 (Ship)",
    desc: "권한을 설정하고 원클릭으로 팀에 배포합니다. 몇 주가 아닌 몇 시간 만에 운영에 투입하세요.",
  },
];

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">w</span>
          <span className="text-lg">wretool</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-300 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#waitlist"
          className="rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-brand-400"
        >
          시작하기
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-grid relative overflow-hidden pt-36 pb-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[140px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          사내 운영 도구 빌더 · 대기자 모집 중
        </span>
        <h1 className="animate-fade-up mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          연결하고, 조립하고,
          <br />
          <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
            바로 배포.
          </span>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-slate-300">
          데이터에 연결하고, 드래그로 조립하고, 바로 배포 —
          <br className="hidden sm:block" />
          어드민·대시보드 같은 사내 운영 도구를 몇 주가 아닌 몇 시간 만에 만드세요.
        </p>
        <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#waitlist"
            className="w-full rounded-full bg-brand-500 px-7 py-3 font-medium text-white transition hover:bg-brand-400 sm:w-auto"
          >
            대기자 명단 등록
          </a>
          <a
            href="#features"
            className="w-full rounded-full border border-white/15 px-7 py-3 font-medium text-slate-200 transition hover:bg-white/5 sm:w-auto"
          >
            기능 살펴보기
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-500">엔지니어 리소스는 절약하고, 운영팀은 직접 만듭니다</p>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-widest text-slate-500">
          이런 팀이 내부 도구를 만드느라 엔지니어 리소스를 쓰고 있습니다
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-slate-400">
          <span>사내 운영팀</span>
          <span>·</span>
          <span>스타트업·SMB</span>
          <span>·</span>
          <span>데이터·BI팀</span>
          <span>·</span>
          <span>CS·세일즈 Ops</span>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">내부 도구, 코드 최소화로 빠르게</h2>
          <p className="mt-4 text-slate-300">
            wretool은 데이터소스 연결부터 UI·로직·배포까지 한 곳에서. 내부 앱 하나 만들려고 풀스택을 짤 필요가 없습니다.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand-500/40 hover:bg-white/[0.05]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-xl">{f.icon}</div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* AI 보조 차별점 — 메인 포지션은 Retool형 빌더, AI는 거드는 역할 */}
        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-brand-500/20 bg-brand-500/[0.06] px-6 py-5 text-center">
          <p className="text-sm text-slate-200">
            <span className="mr-2 rounded-full bg-brand-500/20 px-2.5 py-1 text-xs font-medium text-brand-200">
              뤼튼답게
            </span>
            프롬프트 한 줄로 쿼리와 화면 초안을 생성 — AI가 내부 도구 제작의 첫 단추를 대신 끼워줍니다.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="border-t border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">연결 → 조립 → 배포</h2>
          <p className="mt-4 text-slate-300">복잡한 셋업 없이, 오늘 바로 첫 운영 도구를 띄워보세요.</p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.no} className="relative rounded-2xl border border-white/10 bg-ink/40 p-8">
              <span className="text-5xl font-bold text-brand-500/30">{s.no}</span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 컨셉 미리보기 — 실제 제품 스크린샷이 아니라 코드로 그린 UI 시안.
// "컨셉/미리보기" 라벨을 명시해 실제 제품 화면 사칭을 방지한다.
function ConceptPreview() {
  return (
    <section id="preview" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            컨셉 미리보기 · 실제 제품 화면이 아닙니다
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">이런 모습이 될 거예요</h2>
          <p className="mt-4 text-slate-300">
            아래는 개발 방향을 보여주기 위한 디자인 시안입니다. 실제 빌더 화면은 출시 시점에 공개됩니다.
          </p>
        </div>

        {/* 빌더 UI 목업 — 워터마크로 '컨셉 시안' 명시 */}
        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="pointer-events-none absolute -inset-x-10 -top-10 h-40 rounded-full bg-brand-600/20 blur-[120px]" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink/60 shadow-2xl">
            {/* 윈도우 상단바 */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-xs text-slate-400">
                wretool — 환불 처리 어드민 (컨셉)
              </span>
            </div>
            {/* 본문: 좌측 컴포넌트 패널 / 중앙 캔버스 / 우측 쿼리 패널 */}
            <div className="grid grid-cols-12 gap-px bg-white/5 text-xs">
              {/* 좌측 패널 */}
              <div className="col-span-3 hidden space-y-2 bg-ink/60 p-4 md:block">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">컴포넌트</p>
                {["🔘 버튼", "📋 테이블", "📝 폼", "📊 차트", "🔍 검색"].map((c) => (
                  <div key={c} className="rounded-md border border-white/5 bg-white/[0.03] px-3 py-2 text-slate-300">
                    {c}
                  </div>
                ))}
              </div>
              {/* 중앙 캔버스 */}
              <div className="col-span-12 space-y-4 bg-ink/40 p-5 md:col-span-6">
                <div className="flex gap-2">
                  <div className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-slate-400">
                    주문번호 검색…
                  </div>
                  <div className="rounded-md bg-brand-500 px-4 py-2 font-medium text-white">조회</div>
                </div>
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <div className="grid grid-cols-4 bg-white/[0.04] px-3 py-2 font-medium text-slate-300">
                    <span>주문번호</span><span>고객</span><span>금액</span><span>상태</span>
                  </div>
                  {[
                    ["#10293", "김wretool", "₩42,000", "결제완료"],
                    ["#10294", "이운영", "₩18,500", "배송중"],
                    ["#10295", "박지원", "₩88,000", "환불요청"],
                  ].map((row) => (
                    <div key={row[0]} className="grid grid-cols-4 border-t border-white/5 px-3 py-2 text-slate-400">
                      {row.map((cell, i) => (
                        <span key={i} className={i === 3 && cell === "환불요청" ? "text-amber-300" : ""}>{cell}</span>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <div className="rounded-md border border-brand-500/40 bg-brand-500/15 px-4 py-2 font-medium text-brand-200">
                    환불 승인 →
                  </div>
                </div>
              </div>
              {/* 우측 쿼리 패널 */}
              <div className="col-span-3 hidden bg-ink/60 p-4 md:block">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">쿼리 · refund_order</p>
                <pre className="mt-2 whitespace-pre-wrap rounded-md bg-black/30 p-3 font-mono text-[10px] leading-relaxed text-slate-300">{`UPDATE orders
SET status = 'refunded'
WHERE id = {{ table.row.id }};

-- 환불 API 호출
post(payApi, {
  orderId: row.id
})`}</pre>
              </div>
            </div>
            {/* 워터마크 */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <span className="rotate-[-12deg] select-none text-4xl font-bold tracking-widest text-white/[0.06] sm:text-6xl">
                컨셉 시안 · CONCEPT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section id="usecases" className="border-t border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">이런 운영 도구를 만듭니다</h2>
          <p className="mt-4 text-slate-300">
            추상적인 기능 설명 대신, 실제로 자주 만드는 내부 도구 시나리오로 보여드립니다.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {USE_CASES.map((u) => (
            <div key={u.title} className="rounded-2xl border border-white/10 bg-ink/40 p-7">
              <span className="inline-block rounded-full bg-brand-500/15 px-3 py-1 text-xs font-medium text-brand-200">
                {u.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{u.title}</h3>
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-medium text-slate-300">문제 · </span>
                {u.pain}
              </p>
              <ol className="mt-5 space-y-2.5">
                {u.flow.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-[11px] font-semibold text-brand-200">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-5 border-t border-white/5 pt-4 text-sm text-slate-300">
                <span className="font-medium text-brand-200">결과 · </span>
                {u.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">자주 묻는 질문</h2>
          <p className="mt-4 text-slate-300">출시 전 제품인 만큼, 가장 많이 받는 질문을 정직하게 정리했습니다.</p>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/20 [&_summary]:list-none"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-slate-100">
                {f.q}
                <span className="shrink-0 text-brand-300 transition group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">더 궁금한 점이 있으신가요?</h2>
        <p className="mt-4 text-slate-300">
          도입 문의, 협업 제안, 또는 어떤 내부 도구가 필요한지 — 편하게 알려주세요.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="mailto:wretool@wrtn.io?subject=wretool%20문의"
            className="w-full rounded-full bg-brand-500 px-7 py-3 font-medium text-white transition hover:bg-brand-400 sm:w-auto"
          >
            wretool@wrtn.io 로 문의하기
          </a>
          <a
            href="#waitlist"
            className="w-full rounded-full border border-white/15 px-7 py-3 font-medium text-slate-200 transition hover:bg-white/5 sm:w-auto"
          >
            대기자 명단 등록
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-500">보통 영업일 기준 2~3일 안에 답변드립니다.</p>
      </div>
    </section>
  );
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// 이미 등록한 이메일을 브라우저에 기억해 새로고침 후 중복 제출을 막는다.
const WAITLIST_STORAGE_KEY = "wretool:waitlist:emails";

function loadRegistered(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(WAITLIST_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function rememberRegistered(email: string) {
  if (typeof window === "undefined") return;
  try {
    const list = loadRegistered();
    if (!list.includes(email)) {
      window.localStorage.setItem(
        WAITLIST_STORAGE_KEY,
        JSON.stringify([...list, email]),
      );
    }
  } catch {
    // 저장 실패는 등록 흐름을 막지 않도록 무시
  }
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const submitting = status === "submitting";
  const submitted = status === "success";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const value = email.trim().toLowerCase();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setError("올바른 이메일 주소를 입력해주세요.");
      setStatus("error");
      return;
    }

    // 이미 이 브라우저에서 등록한 이메일이면 재요청 없이 성공으로 처리
    if (loadRegistered().includes(value)) {
      setError("");
      setStatus("success");
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: value,
          _subject: "wretool 대기자 신규 등록",
          source: "wretool-landing",
        }),
      });

      if (!res.ok) throw new Error(`submit failed: ${res.status}`);

      rememberRegistered(value);
      setStatus("success");
      // 전환 이벤트 집계 (대기자 등록 성공)
      trackEvent("Waitlist Signup", CONVERSION_EVENT);
    } catch {
      setStatus("error");
      setError("등록 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
    }
  }

  return (
    <section id="waitlist" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-brand-600/15 to-white/[0.02] p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[100px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">가장 먼저 wretool을 만나보세요</h2>
          <p className="relative mx-auto mt-4 max-w-md text-slate-300">
            대기자 명단에 등록하면 출시 소식과 베타 초대를 가장 먼저 보내드립니다.
          </p>

          {submitted ? (
            <div className="relative mx-auto mt-8 max-w-md rounded-xl border border-brand-500/30 bg-brand-500/10 px-6 py-5">
              <p className="font-medium text-white">등록이 완료되었습니다 🎉</p>
              <p className="mt-1 text-sm text-slate-300">
                <span className="font-medium text-brand-200">{email}</span> 으로 소식을 보내드릴게요.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              noValidate
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="이메일 주소"
                disabled={submitting}
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={submitting}
                className="shrink-0 rounded-full bg-brand-500 px-7 py-3 font-medium text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "등록 중…" : "등록하기"}
              </button>
            </form>
          )}
          {error && <p className="relative mt-3 text-sm text-red-400">{error}</p>}
          <p className="relative mt-4 text-xs text-slate-500">언제든 구독을 취소할 수 있습니다.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-brand-500 text-xs text-white">w</span>
          <span>wretool</span>
        </div>
        <p className="text-xs text-slate-500">© 2026 wretool. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-slate-400">
          <a href="#features" className="transition hover:text-white">기능</a>
          <a href="#usecases" className="transition hover:text-white">활용 사례</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
          <a href="#contact" className="transition hover:text-white">문의</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Features />
        <HowItWorks />
        <ConceptPreview />
        <UseCases />
        <FAQ />
        <Waitlist />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
