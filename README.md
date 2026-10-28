# 엘든링 위키

엘든링 게임 정보 사이트. 현재는 기능 기획 전 기본 개발 환경만 구성되어 있습니다.

## 개발 환경

- Node.js 22 이상 (`.nvmrc`: 22.23.3)
- npm / Next.js App Router / React / TypeScript
- ESLint / SCSS (컴포넌트 스타일은 SCSS Modules 사용 가능)
- Supabase JavaScript SDK

## 실행

```bash
nvm use
npm ci
npm run db:start
cp .env.example .env.local
# 아래 Supabase 설정에 따라 로컬 공개 키 입력
npm run dev
```

브라우저에서 http://localhost:3000 에 접속합니다.
기본 페이지는 Supabase 환경변수 없이도 실행됩니다.

## Supabase 설정

### 개발: Docker 로컬 Supabase

Docker를 실행한 뒤 `npm run db:start`로 로컬 서비스를 시작합니다.
첫 실행은 Docker 이미지를 다운로드하므로 시간이 걸릴 수 있습니다.
프로젝트에 버전을 고정한 Supabase CLI를 사용합니다.

`npm run db:status`에서 로컬 Publishable 키를 확인해 `.env.local`에 입력합니다.

```dotenv
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=로컬_Publishable_키
```

- Studio: http://127.0.0.1:54323
- 실행: `npm run db:start`
- 상태 확인: `npm run db:status`
- 종료: `npm run db:stop` (로컬 데이터 보존)

### 운영: Supabase 클라우드

운영용은 `qpow1018's Org`의 `elden-wiki` 프로젝트(서울 리전)입니다.
배포 서비스의 환경변수에 운영 프로젝트 URL과 publishable key를 설정합니다.
로컬 `.env.local`에는 개발용 연결값만 사용합니다. 연결값을 바꾼 뒤 개발 서버를 재시작합니다.
`NEXT_PUBLIC_` 환경변수는 빌드 시 반영되므로 운영 빌드 전에 설정합니다.

스키마 변경은 로컬에서 마이그레이션 파일로 만들고 검증한 뒤 운영에 적용합니다.
현재 CLI는 운영 프로젝트에 연결하지 않았으며, 운영 배포 명령도 등록하지 않았습니다.

`src/lib/supabase/client.ts`의 `createSupabaseClient()`는 공개 데이터 조회용입니다.
환경변수는 클라이언트 생성 시 확인하며, 사용자 세션 저장과 자동 갱신은 비활성화되어 있습니다.
로그인이 필요해지면 쿠키 기반 서버·브라우저 클라이언트를 별도로 설계합니다.

`NEXT_PUBLIC_` 값은 브라우저에 공개됩니다. secret key와 `service_role` key는 넣지 않습니다.
.env.local은 Git에서 제외되므로 다른 개발 환경에서는 로컬 키를 별도로 설정해야 합니다.
테이블, RLS 정책, 인증 및 데이터 조회 기능은 아직 구성하지 않았습니다.
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
  app/                  # 페이지, 레이아웃, 폰트 리소스
  assets/               # Sass 변수·믹스인·리셋·전역 스타일
  lib/supabase/client.ts # 공개 데이터 조회용 Supabase 클라이언트
```

`src/assets/reset.scss`와 `global.scss`는 루트 레이아웃에서 순서대로 불러옵니다.
`_variables.scss`와 `_mixins.scss`는 `next.config.ts`에서 자동 주입하므로
개별 SCSS 파일에 반복해서 `@use`를 추가하지 않습니다.
