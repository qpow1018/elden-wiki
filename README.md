# 엘든링 위키

엘든링 게임 정보 사이트. 현재 홈에서 장비 목록 조회·검색·필터·페이지 탐색을 제공합니다.

## 개발 환경

- Node.js 22 이상 (`.nvmrc`: 22.23.3)
- npm / Next.js App Router / React / TypeScript
- ESLint / SCSS Modules
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
디자인 토큰과 공용 UI는 `/design-system`에서 확인합니다. 검색 데이터나 DB 연결 없이 사용할 수 있으며, 색상·버튼·폼·탭·메뉴·모달·토스트·헤더·로딩·드래그 목록 예시를 제공합니다.
장비 데이터를 조회하려면 로컬 Supabase 실행과 환경 변수 설정이 필요합니다.

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
운영 적용 전 대상 프로젝트와 실제 적용 이력을 확인합니다. `package.json`에는 운영 배포 명령이 등록되어 있지 않습니다.

`src/api/index.ts`의 `getApiClient()`는 공개 데이터 조회용 공통 클라이언트를 제공합니다.
환경변수는 클라이언트 생성 시 확인하며, 사용자 세션 저장과 자동 갱신은 비활성화되어 있습니다.
로그인이 필요해지면 쿠키 기반 서버·브라우저 클라이언트를 별도로 설계합니다.

`NEXT_PUBLIC_` 값은 브라우저에 공개됩니다. secret key와 `service_role` key는 넣지 않습니다.
.env.local은 Git에서 제외되므로 다른 개발 환경에서는 로컬 키를 별도로 설정해야 합니다.
테이블과 공개 조회 정책은 마이그레이션으로 관리하며 장비 조회 API가 구현되어 있습니다. 사용자 인증은 아직 구현하지 않았습니다.
데이터 모델·권한·등록 기준은 [DB 문서](docs/DATABASE.md)를 확인합니다. 특정 환경의 실제 적용 상태는 해당 DB에서 별도로 확인합니다.

공식 문서: [Supabase 클라이언트 초기화](https://supabase.com/docs/reference/javascript/initializing)

## 검증 및 빌드

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## 프로젝트 문서

- [작업 지침](AGENTS.md): 작업 범위·진행·검토·검증 기준과 문서 선택 안내.
- [아키텍처](docs/ARCHITECTURE.md): 폴더 구조·역할·배치 기준·의존 방향.
- [DB 설계](docs/DATABASE.md): 데이터 의미·관계·제약·권한·등록 기준.
- 코드 작성 규칙은 작업 지침에 연결된 공통 코드·프론트엔드·백엔드 스킬을 따릅니다.
