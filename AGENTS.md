# 엘든 위키 프로젝트 지침

## 프로젝트와 실행 환경

- 엘든링 게임 정보를 제공하는 Next.js 프로젝트다. 패키지 매니저는 npm이며, 의존성 변경 시 `package-lock.json`을 함께 관리한다.

## 지원 환경

- PC와 모바일을 모두 지원한다. 화면·인터랙션 변경은 두 환경을 고려해 구현하고 검증한다.
- Chrome·Edge·Safari·Firefox의 최신 안정 버전을 지원 기준으로 삼는다. 모바일의 주요 확인 대상은 Android Chrome과 iOS Safari다.

## 작업 범위와 진행

- 관련 구현을 먼저 확인하고 목표·변경 범위·검증 방법을 정한다. 중요한 가정과 불확실성을 밝히고, 여러 단계의 작업은 검토 가능한 단위로 나눠 진행 순서를 짧게 공유한다.
- 논의·설명·리뷰와 구현 요청을 구분한다. 실행 범위가 불명확하면 확인하되, 이미 요청하거나 합의한 구현에 반복 승인을 요구하지 않는다.
- 요청 해결에 필요한 변경만 수행하고, 범위 밖 동작과 기존 작업을 보존한다. 무관한 리팩터링·포맷 변경·기존 미사용 코드 제거는 하지 않으며, 이번 변경으로 불필요해진 코드만 정리한다.
- 새 파일·추상화를 추가하거나 기존 책임·배치를 변경할 때는 이유와 절충을 짧게 공유한다. 별도의 승인 단계로 만들지는 않는다.

## 문서와 스킬 선택

| 작업                               | 확인할 문서·스킬                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| 실행·환경 설정                     | [README](README.md), `.nvmrc`, `package.json`                                    |
| 파일 배치·책임·의존 관계           | [ARCHITECTURE](docs/ARCHITECTURE.md)                                             |
| DB 구조·권한·데이터 의미·조회·등록 | [DATABASE](docs/DATABASE.md)와 관련 SQL·설정                                     |
| 공통 코드 작성·검토                | [code-conventions](.agents/skills/code-conventions/SKILL.md)                     |
| React·Next.js·Query·UI·SCSS        | [frontend-conventions](.agents/skills/frontend-conventions/SKILL.md)와 공통 코드 |
| API 연결·계약·변환·오류 전파       | [backend-conventions](.agents/skills/backend-conventions/SKILL.md)와 공통 코드   |

- 작업에 해당하는 문서·스킬의 관련 항목을 확인하고, 영향이 다른 영역으로 확장되면 확인 범위도 넓힌다.
- 문서는 관련 코드·설정·테스트와 대조한다. 현재 구현을 사용자 합의나 영구적인 제약으로 간주하지 않는다.
- 변경한 기준은 해당 문서·스킬에 갱신한다. 공통 작업 절차는 AGENTS에서 관리하며 같은 기준을 여러 곳에 중복 기록하지 않는다.

## 로컬 작업과 운영 반영

- 배포·운영 DB 마이그레이션·운영 데이터 변경은 요청받은 범위에서 수행한다. 완료 보고에서는 로컬 구현·검증과 실제 운영 반영 상태를 구분한다.

## 비밀 정보와 로그

- 비밀 키·토큰·개인정보를 클라이언트 코드·저장소·로그·보고에 노출하지 않는다. 공개 환경 변수와 오류 로그에는 공개 가능한 정보만 포함하고, 민감 값은 제외하거나 가린다.

## 게임 정보의 출처와 불확실성

- 게임 정보·수치는 출처와 확인 가능한 적용 버전·DLC 범위를 기록한다. 기존 기록 방식을 따르며, 없다면 관련 문서에 남긴다.
- 미확인 값을 임의로 채우지 않는다. 사실과 추정·해석을 구분하고, 출처가 충돌하면 차이와 채택 근거를 기록한다.

## 독립적인 판단과 의견 수정

- 사용자 선호·목표·제약은 선택에 반영하고, 사실·기술적 주장은 근거로 평가한다. 동의를 위한 판단 변경이나 형식적인 반박은 하지 않는다.
- 의견을 바꾸거나 이견을 유지할 때는 근거와 절충을 설명한다. 근거가 부족하면 불확실성과 확인 방법을 밝힌다.

## 자체 검토와 검증

- 구현 후 요구사항 충족·책임 경계·기존 동작 영향·불필요한 변경을 자체 검토하고, 필요한 수정 후 검증한다. 검증 중 코드를 바꾸면 영향을 받는 부분을 다시 검토·검증한다.
- 소스 코드 변경은 `npm run lint`와 `npm run typecheck`로 확인한다. Next.js 설정·라우팅·환경 변수·의존성·빌드 설정·서버와 클라이언트 경계에 영향이 있으면 `npm run build`도 실행한다.
- 화면·인터랙션 변경은 PC·모바일에서 관련 흐름과 영향을 받는 상태를 확인한다. 브라우저·실제 기기 검증은 변경의 호환성 위험에 따라 선택하고 결과를 구분한다. 캡처는 시각적 확인에 필요한 화면·상태만 남긴다.
- API·저장·계산 변경은 관련 정상·실패 동작과 필요한 경우 충돌 동작을 검증한다. 기존 테스트를 우선 활용하고, 변경을 확인할 수 있는 가장 작은 적절한 수단을 선택한다.
- DB 정책·제약 변경은 마이그레이션과 실제 로컬 DB에서 검증한다. 모의 응답 결과를 실제 인증·DB 정책·운영 환경 검증으로 간주하지 않는다.
- 문서·지침만 변경하면 링크·내용 정합성·포맷을 확인하며 앱 검사·빌드를 일괄 실행하지 않는다.
- 커밋 전 최종 diff와 기존 검증 결과의 유효성을 확인하고, 변경이나 검증 공백이 있을 때만 필요한 검사를 추가한다.

## 완료 보고

- 바뀐 동작·중요한 선택·검증 결과와 미확인 사항을 간결하게 보고한다. 판단에 필요한 코드 위치나 직접 확인할 흐름을 제공하고, 검증하지 못한 항목은 이유를 밝힌다.

## 생성 파일과 임시 경로

- 생성 파일·빌드 결과·임시 파일은 직접 편집하지 않고 관련 도구로 갱신한다. DB 생성 타입은 실제 스키마와 일치시킨다. 도구 실행으로 생긴 무관한 변경은 작업에 포함하지 않는다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
