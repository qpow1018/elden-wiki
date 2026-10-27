# 엘든링 위키

엘든링 게임 정보 사이트. 현재는 기능 기획 전 기본 개발 환경만 구성되어 있습니다.

## 개발 환경

- Node.js 22 이상 (`.nvmrc`: 22.23.3)
- npm / Next.js App Router / React / TypeScript
- ESLint / 일반 CSS (필요 시 CSS Modules 사용 가능)
- Supabase JavaScript SDK

## 실행

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

브라우저에서 http://localhost:3000 에 접속합니다.
기본 페이지는 Supabase 환경변수 없이도 실행됩니다.

## Supabase 설정

Supabase 프로젝트의 Connect 화면에서 URL과 publishable key를 확인하고
`.env.local`에 다음 값을 입력합니다.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

`src/lib/supabase/client.ts`의 `createSupabaseClient()`는 공개 데이터 조회용입니다.
환경변수는 클라이언트 생성 시 확인하며, 사용자 세션 저장과 자동 갱신은 비활성화되어 있습니다.
로그인이 필요해지면 쿠키 기반 서버·브라우저 클라이언트를 별도로 설계합니다.

`NEXT_PUBLIC_` 값은 브라우저에 공개됩니다. secret key와 `service_role` key는 넣지 않습니다.
실제 Supabase 프로젝트 연결, 테이블, RLS 정책, 인증 및 데이터 조회 기능은 아직 구성하지 않았습니다.
테이블을 추가할 때 공개 범위에 맞는 RLS 정책도 함께 구성해야 합니다.

공식 문서: [Supabase 클라이언트 초기화](https://supabase.com/docs/reference/javascript/initializing)

## 검증 및 빌드

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## 구조

```text
src/
  app/                  # 페이지, 레이아웃, 전역 스타일
  lib/supabase/client.ts # 공개 데이터 조회용 Supabase 클라이언트
```
