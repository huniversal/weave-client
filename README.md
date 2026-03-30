# Weave Client

## 목적
- Electron 기반 Weave 데스크톱 앱 개발 레포
- 상위 폴더의 기획 문서와 분리된 실제 제품 코드 저장소

## 구조 원칙
- `src/main`: 로컬 백엔드 역할
- `src/preload`: main 과 renderer 사이 브리지
- `src/renderer`: 프론트엔드 UI
- renderer 는 축소형 FSD 레이어를 사용
- 각 슬라이스는 필요한 세그먼트만 생성

## 디렉터리 개요
```text
src/
  main/
  preload/
  renderer/
    app/
    pages/
    features/
    entities/
    shared/
```

## 세그먼트 기준
- `components/`: 슬라이스 전용 UI
- `configs/`: 설정 객체와 옵션
- `constants/`: 상수와 상태 매핑값
- `hooks/`: 슬라이스 전용 훅
- `types/`: 슬라이스 타입
- `utils/`: 순수 유틸 함수
- `api/`: axios 또는 preload 호출 래퍼

## 현재 확정 사항
- 배포: `electron-builder`
- HTTP: `axios`
- renderer 아키텍처: 축소형 FSD
- 서버는 별도 웹 서버를 두지 않고 `Electron main process`가 담당
