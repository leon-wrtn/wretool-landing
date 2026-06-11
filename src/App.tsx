import { useState, type FormEvent } from "react";

// ─────────────────────────────────────────────────────────────
// wretool 랜딩페이지 (1차 초안)
// 카피/포지셔닝은 가설 기반 초안 — CEO 제품 확정 후 문구 교체 예정.
// 섹션: Nav → Hero → Trust → Features → How it works → Waitlist CTA → Footer
// ─────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "기능", href: "#features" },
  { label: "작동 방식", href: "#how" },
  { label: "대기자 등록", href: "#waitlist" },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "반복 업무 자동화",
    desc: "매일 반복되는 정리·취합·보고 작업을 규칙과 AI로 자동화합니다. 손이 가던 일을 흐름에 맡기세요.",
  },
  {
    icon: "🧩",
    title: "흩어진 도구를 하나로",
    desc: "여러 SaaS와 문서, 메신저에 흩어진 정보를 한 화면에서 연결해 맥락 전환 비용을 줄입니다.",
  },
  {
    icon: "🤖",
    title: "맥락을 아는 AI 어시스턴트",
    desc: "팀의 데이터를 이해하는 AI가 초안 작성, 요약, 다음 액션 제안까지 함께합니다.",
  },
  {
    icon: "📊",
    title: "한눈에 보는 업무 현황",
    desc: "지금 무엇이 진행 중이고 무엇이 막혀 있는지, 팀 전체가 같은 화면에서 확인합니다.",
  },
];

const STEPS = [
  {
    no: "01",
    title: "연결",
    desc: "쓰던 도구를 그대로 연결하세요. 마이그레이션 없이 몇 분이면 시작합니다.",
  },
  {
    no: "02",
    title: "자동화 설정",
    desc: "반복되는 업무 흐름을 템플릿으로 만들거나 AI에게 자연어로 맡기세요.",
  },
  {
    no: "03",
    title: "집중",
    desc: "반복은 wretool이 처리합니다. 팀은 판단과 창의가 필요한 일에 집중하세요.",
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
          비공개 베타 · 대기자 모집 중
        </span>
        <h1 className="animate-fade-up mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          반복은 wretool에게,
          <br />
          <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
            중요한 일은 팀에게.
          </span>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-slate-300">
          흩어진 업무 도구와 매일의 반복 작업을 하나로 묶는 AI 워크툴.
          <br className="hidden sm:block" />
          정리와 취합은 wretool이 하고, 팀은 진짜 일에 집중하세요.
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
        <p className="mt-4 text-xs text-slate-500">신용카드 불필요 · 출시되면 가장 먼저 알려드립니다</p>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-widest text-slate-500">
          이미 이런 팀들이 반복 업무에 시간을 빼앗기고 있습니다
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-slate-400">
          <span>스타트업 운영팀</span>
          <span>·</span>
          <span>마케팅팀</span>
          <span>·</span>
          <span>고객지원팀</span>
          <span>·</span>
          <span>프로덕트팀</span>
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">일을 더 적게, 성과는 더 많이</h2>
          <p className="mt-4 text-slate-300">
            wretool은 도구를 늘리지 않습니다. 흩어진 일을 모으고, 반복을 없애 팀의 시간을 돌려줍니다.
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
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="border-t border-white/5 bg-white/[0.02] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">3단계면 충분합니다</h2>
          <p className="mt-4 text-slate-300">복잡한 도입 없이, 오늘 바로 반복 업무를 줄여보세요.</p>
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
