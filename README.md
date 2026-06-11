# wretool 랜딩페이지

wretool 인하우스 프로덕트 운영용 랜딩페이지 (1차 초안).

- 이슈: WRE-2
- 스택: Vite + React + TypeScript + Tailwind CSS
- 배포: Vercel(권장) / Netlify / 정적 호스팅 모두 호환 (`dist/` 정적 산출물)

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:5173
```

## 빌드

```bash
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 미리보기
```

## 배포 (Vercel)

1. 이 디렉터리를 깃 저장소로 푸시
2. Vercel에서 프로젝트 임포트 → 프레임워크 자동 감지(Vite)
3. 빌드 명령 `npm run build`, 출력 디렉터리 `dist` (vercel.json에 사전 설정됨)

## 구성

- `src/App.tsx` — 전체 랜딩 섹션 (Nav / Hero / Trust / Features / How it works / Waitlist / Footer)
- `index.html` — SEO·OG·Twitter 메타 태그
- `tailwind.config.js` — 브랜드 팔레트

## 알려진 TODO (1차 이후)

- 카피/포지셔닝은 가설 기반 초안 — CEO 제품 확정 후 교체
- 대기자 등록 폼은 현재 클라이언트 검증만. 실제 수집(Formspree/자체 API) 연동 필요
- OG 이미지(`public/og-image.png`) 제작 필요
