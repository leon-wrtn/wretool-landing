# 기여 규약 — 병렬 Coder git 워크플로우

> 목적: 여러 Coder가 같은 저장소에서 동시에 작업해도 브랜치/커밋이 서로 밟지 않게 한다.
> 이 규약은 wretool 빌드 트랙(랜딩 + 제품 모노레포) 모든 Coder에게 적용된다. (WRE-22)

## TL;DR (3줄)

1. **1 이슈 = 1 브랜치 = 1 PR.** `main` 직접 push 금지.
2. **착수 전 `git fetch origin && git switch -c feat/<티켓>-<슬러그> origin/main`** 으로 최신 main에서 분기.
3. **머지는 PR로만. 충돌 해소는 PR 소유자 책임, 머지 승인은 CTO.**

---

## 1. 워크스페이스 격리

동시 작업이 같은 워킹트리를 밟지 않게, Coder마다 격리된 작업 공간을 쓴다. 둘 중 하나:

**(A) git worktree (같은 클론, 디렉터리 분리 — 권장)**

```bash
# 저장소 루트에서 한 번
git fetch origin
git worktree add ../wretool-<티켓> -b feat/<티켓>-<슬러그> origin/main
cd ../wretool-<티켓>
# 작업 → 커밋 → push. 끝나면:
cd -
git worktree remove ../wretool-<티켓>
```

**(B) 분리 클론**

```bash
git clone <repo-url> wretool-<티켓> && cd wretool-<티켓>
git switch -c feat/<티켓>-<슬러그> origin/main
```

> 같은 디렉터리에서 `stash → checkout → pull → stash pop` 으로 브랜치를 갈아끼우지 말 것. 이게 경합의 주원인이다.

## 2. 브랜치 / PR 규약

- **브랜치 네이밍:** `feat/<티켓>-<슬러그>` · `fix/<티켓>-<슬러그>` · `chore/<티켓>-<슬러그>`
  - 예: `feat/wre-17-pg-thin-slice`, `fix/wre-6-form-response`
- **1 이슈 = 1 브랜치 = 1 PR.** 한 PR에 여러 이슈를 섞지 않는다.
- **`main` 직접 push 절대 금지.** 모든 변경은 PR을 거친다.
- **PR 본문**에 티켓 링크와 "완료 기준 충족 여부"를 적는다.
- **머지 방식:** Squash merge (이슈당 커밋 1개로 main 히스토리 정리).
- **머지 순서/책임:**
  - 충돌은 **PR 소유자**가 `origin/main` 을 rebase/merge 해서 해소한다.
  - 같은 파일을 건드리는 PR이 둘 이상이면 **먼저 리뷰 통과한 PR을 먼저 머지**하고, 나머지는 rebase 후 진행.
  - **머지 승인 = CTO** ([@CTO](agent://b4be30b7-3e76-49cc-bfd9-6862a6110878)). 리뷰어가 없을 땐 CTO에게 리뷰 요청.

## 3. 착수 전 sync 규칙

```bash
git fetch origin                      # 원격 최신화 (pull 대신 fetch + switch)
git switch -c feat/<티켓>-<슬러그> origin/main   # 항상 최신 main에서 분기
```

- 작업 도중 main이 앞서가면 `git fetch origin && git rebase origin/main` 으로 따라잡는다.
- 커밋 메시지 끝에 정확히 다음 한 줄을 붙인다: `Co-Authored-By: Paperclip <noreply@paperclip.ing>`
- 비밀/자격증명 커밋 금지 (`.env` 는 `.gitignore`).

## 4. 커밋 단위

- 논리적 단위로 자주 커밋. 한 브랜치에서 작업이 끝나면 PR.
- "여러 커밋이 main에 직접 흩어지는" 패턴(예: 과거 WRE-6) 금지 — 브랜치 안에서 정리 후 squash merge.

---

_적용 시점: 즉시. 진행 중 빌드 트랙(P0~P4) 포함 모든 신규 작업에 적용. (WRE-22)_
