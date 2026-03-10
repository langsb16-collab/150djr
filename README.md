# AdBrain AI - Global Marketing Hub

## 🚀 프로젝트 개요
**AdBrain AI**는 AI 기반 글로벌 마케팅 자동화 플랫폼입니다. 상품 정보를 입력하면 자동으로 마케팅 스크립트를 생성하고, 비디오를 제작하며, 전 세계 소셜 미디어 플랫폼에 배포합니다.

## 🌐 배포 정보

### 프로덕션 URL
- **메인 도메인**: https://feezone.shop
- **Cloudflare Pages**: https://150djr.pages.dev
- **최신 배포**: https://d8dbcbb2.150djr.pages.dev

### GitHub 저장소
- https://github.com/langsb16-collab/150djr

## ✨ 주요 기능

### 완료된 기능
- ✅ **AI 상품 분석**: Gemini AI를 사용한 자동 상품 분석
- ✅ **마케팅 스크립트 생성**: AI 기반 바이럴 마케팅 스크립트 자동 생성
- ✅ **장면 이미지 생성**: AI로 각 장면별 이미지 자동 생성
- ✅ **음성 합성**: TTS를 통한 자동 음성 생성
- ✅ **비디오 미리보기**: 실시간 비디오 프리뷰 기능
- ✅ **다국어 지원**: 한국어, 영어, 중국어, 일본어 지원
- ✅ **반응형 디자인**: 모든 디바이스에서 완벽한 UI/UX
- ✅ **분석 대시보드**: 프로젝트 통계 및 성과 분석
- ✅ **설정 관리**: 사용자 프로필 및 API 키 관리

### API 엔드포인트
- `GET /api/projects` - 프로젝트 목록 조회
- `POST /api/projects` - 새 프로젝트 생성
- `POST /api/social/upload` - 소셜 미디어 업로드

## 🛠️ 기술 스택

### 프론트엔드
- **React 19** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS 4** - 스타일링
- **Motion** - 애니메이션
- **Lucide React** - 아이콘
- **Recharts** - 차트 및 분석

### 백엔드
- **Cloudflare Pages Functions** - 서버리스 API
- **Cloudflare Workers** - 엣지 컴퓨팅

### AI & APIs
- **Google Gemini AI** - 상품 분석 및 콘텐츠 생성
- **YouTube API** - YouTube 업로드
- **Instagram API** - Instagram 업로드
- **Facebook API** - Facebook 업로드
- **Twitter API** - Twitter 업로드
- **TikTok API** - TikTok 업로드
- **Naver Blog API** - 네이버 블로그 업로드

### 중국 플랫폼 연동
- **Taobao/Tmall** - 타오바오/티몰 상품 등록
- **1688** - 알리바바 1688
- **Pinduoduo** - 핀둬둬
- **JD.com** - 징동닷컴
- **Xiaohongshu** - 샤오홍슈 (레드)
- **Bilibili** - 빌리빌리

## 📋 향후 개발 계획

### 우선순위 높음
1. **Cloudflare D1 통합** - 데이터베이스 영구 저장
2. **실제 비디오 생성** - 이미지와 오디오를 비디오로 합성
3. **실제 소셜 미디어 API 연동** - 각 플랫폼별 실제 업로드 기능
4. **사용자 인증** - 로그인/회원가입 시스템

### 우선순위 중간
5. **비디오 템플릿 시스템** - 다양한 스타일의 템플릿
6. **일괄 업로드** - 여러 플랫폼 동시 업로드
7. **스케줄링** - 예약 발행 기능
8. **A/B 테스팅** - 다양한 버전 테스트

### 우선순위 낮음
9. **협업 기능** - 팀 작업 지원
10. **API 제공** - 외부 개발자를 위한 API

## 🚀 로컬 개발 환경 설정

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (Express 모드)
npm run dev

# 프로덕션 빌드
npm run build

# Cloudflare Pages 로컬 테스트
npm run pages:dev

# Cloudflare Pages 배포
npm run pages:deploy
```

### 환경 변수 설정
`.env` 파일을 생성하고 다음 키를 설정하세요:

```env
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
# ... 기타 API 키
```

## 📊 데이터 구조

### Project
```typescript
interface Project {
  id: string;
  name: string;
  product_url: string;
  product_description: string;
  script: Script;
  scenes: Scene[];
  status: 'pending' | 'processing' | 'completed';
  created_at: string;
}
```

### Script
```typescript
interface Script {
  hook: string;
  problem: string;
  solution: string;
  features: string[];
  cta: string;
}
```

### Scene
```typescript
interface Scene {
  id: string;
  text: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
}
```

## 🎨 디자인 시스템

### 색상
- **Primary**: #1428A0 (AdBrain Blue)
- **Success**: Emerald 500
- **Background**: Zinc 50
- **Text**: Zinc 900

### 타이포그래피
- **Font Family**: System UI
- **Headings**: Bold, Tracking Tight
- **Body**: Regular, Medium

## 📝 사용자 가이드

### 1. 프로젝트 생성
1. 대시보드에서 "Create New Video" 버튼 클릭
2. 상품 URL 또는 설명 입력
3. "Full Automation" 토글로 자동화 모드 선택 가능
4. "Next" 버튼으로 다음 단계 진행

### 2. AI 생성 프로세스
- AI가 자동으로 상품 분석
- 바이럴 마케팅 스크립트 생성
- 각 장면별 이미지와 음성 생성
- 실시간 로그로 진행 상황 확인

### 3. 비디오 배포
- 생성된 비디오 미리보기
- "Upload to All Platforms" 버튼으로 글로벌 SNS 업로드
- "Upload to China" 버튼으로 중국 플랫폼 업로드

## 🔧 문제 해결

### 빌드 오류
```bash
# 캐시 삭제 후 재빌드
npm run clean
npm install
npm run build
```

### 배포 오류
```bash
# Cloudflare 인증 확인
export CLOUDFLARE_API_TOKEN=your_token
npx wrangler whoami

# 프로젝트 재배포
npm run pages:deploy
```

## 📄 라이선스
Private - All Rights Reserved

## 👥 팀
- **개발**: AdBrain AI Team
- **디자인**: AdBrain AI Team

## 📞 문의
- **이메일**: langsb16@gmail.com
- **GitHub**: https://github.com/langsb16-collab/150djr

---

**마지막 업데이트**: 2026년 3월 10일
**배포 상태**: ✅ Active
**Cloudflare Pages**: ✅ Connected
**사용자 정의 도메인**: ✅ feezone.shop
