import { useState, type FormEvent } from "react";

// ─────────────────────────────────────────────────────────────
// wretool 랜딩페이지
// 포지셔닝: 뤼튼판 Retool — 사내 운영 도구(어드민·대시보드·내부 앱)를
//           코드 최소화로 빠르게 만드는 "내부 도구 빌더".
// AI는 메인이 아니라 보조 차별점(프롬프트로 쿼리·화면 초안 생성).
// 섹션: Nav → Hero → Trust → Features → How it works → Waitlist CTA → Footer
// ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "기능", href: "#features" },
  { label: "작동 방식", href: "#how" },
  { label: "대기자 등록", href: "#waitlist" },
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

function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("올바른 이메일 주소를 입력해주세요.");
      return;
    }
    setError("");
    // TODO: 백엔드/폼 연동 (예: Formspree, 자체 API). 현재는 클라이언트 확인만.
    setSubmitted(true);
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
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-brand-500 px-7 py-3 font-medium text-white transition hover:bg-brand-400"
              >
                등록하기
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
          <a href="#waitlist" className="transition hover:text-white">문의</a>
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
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
