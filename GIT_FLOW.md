# Git Flow

## 브랜치 역할
- `main`: 배포 기준 브랜치
- `develop`: 통합 개발 브랜치
- `feat/*`: 기능 개발 브랜치

## 작업 흐름
1. `develop`에서 기능 브랜치를 분기
2. `feat/*`에서 작업
3. 작업 완료 후 `develop`으로 병합
4. 배포 시점에 `develop`을 `main`으로 반영

## 브랜치 네이밍
- `feat/landing-page`
- `feat/dashboard-shell`
- `feat/agent-chat`

## 원칙
- `main` 직접 작업 금지
- `develop` 직접 작업 최소화
- 모든 기능 작업은 `feat/*`에서 진행
