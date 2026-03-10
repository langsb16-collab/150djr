export type Locale = 'ko' | 'en' | 'zh' | 'ja' | 'ru' | 'hi' | 'pt-BR' | 'id';

export const translations: Record<Locale, any> = {
  en: {
    nav: { home: "Home", features: "Create", analytics: "Analytics", settings: "Settings", language: "Language" },
    buttons: { 
      createVideo: "Create Video", 
      download: "Download", 
      share: "Share", 
      send: "Send", 
      next: "Next Step", 
      start: "Start Generating", 
      another: "Create Another Video", 
      publish: "Publish to TikTok",
      uploadAll: "Upload to Social Media",
      uploadChina: "Upload to China Platforms",
      uploading: "Uploading..."
    },
    chat: { 
      title: "Live Translation Chat", 
      voiceCall: "Voice Call", 
      videoCall: "Video Call", 
      placeholder: "Type a message...", 
      status: "Online • Real-time Translation", 
      original: "Original",
      welcome: "Hello! How can I help you today?",
      translating: "I am translating your request... (Mock Translation)"
    },
    faq: { title: "AI Platform Guide", search: "Search FAQ...", status: "AI Assistant • Always Online" },
    dashboard: { 
      title: "Global Marketing Hub", 
      subtitle: "Create, translate, and publish videos in 8 languages.",
      recentProjects: "Recent Projects",
      noVideos: "No videos generated yet.",
      createFirst: "Create your first video",
      welcome: "Welcome back, Marketer"
    },
    stats: {
      totalVideos: "Total Videos",
      totalViews: "Total Views",
      avgCtr: "Avg. CTR",
      conversions: "Conversions"
    },
    analytics: {
      title: "Performance Analytics",
      subtitle: "Track your video performance across global platforms.",
      viewsOverTime: "Views Over Time",
      platformDistribution: "Platform Distribution",
      engagementRate: "Engagement Rate",
      topPerforming: "Top Performing Videos"
    },
    settings: {
      title: "Settings",
      subtitle: "Manage your account, API keys, and preferences.",
      profile: "Profile Settings",
      apiKeys: "API Integrations",
      notifications: "Notifications",
      save: "Save Changes",
      language: "Interface Language",
      theme: "Theme Preference"
    },
    create: {
      title: "One-Click Video Magic",
      subtitle: "Paste a product link or description and let AI do the rest.",
      label: "Product URL or Description",
      placeholder: "https://amazon.com/product-link or 'A portable coffee maker for travelers...'",
      engine: "AI Generation Engine",
      ready: "Ready to transform your product into a viral video.",
      working: "AI is working its magic... This takes about 30 seconds.",
      preview: "Video preview will appear here",
      complete: "Generation Complete!",
      projectName: "Project Name",
      scriptLabel: "Marketing Script",
      logs: {
        analyzing: "Analyzing product details...",
        found: "Found",
        crafting: "Crafting high-converting script...",
        scriptGenerated: "Script generated with Hook, Problem, Solution, and CTA.",
        generatingScenes: "Generating visual scenes...",
        creatingScene: "Creating Scene",
        error: "Error during generation. Please try again."
      }
    },
    sidebar: {
      plan: "Plan: Free",
      remaining: "Unlimited Access"
    },
    faqItems: [
      { q: "What is AI Video Generator?", a: "AI automatically creates marketing videos from links or descriptions." },
      { q: "How to create a video?", a: "Enter a product URL and click generate." },
      { q: "Is it free?", a: "Yes, all features are free to use without signup." },
      { q: "Which languages are supported?", a: "We support 8 global languages including English, Korean, Chinese, and more." },
      { q: "Can I download the video?", a: "Yes, you can download in MP4 format." },
      { q: "How to share?", a: "Click the share button to get a link or post directly to SNS." },
      { q: "What is AI Script?", a: "AI generates high-converting marketing scripts automatically." },
      { q: "Can I change the voice?", a: "Yes, multiple AI voices are available in settings." },
      { q: "What are AI Subtitles?", a: "Subtitles are automatically generated and synced with the voice." },
      { q: "How long are the videos?", a: "Typically 15-60 seconds, optimized for Shorts/TikTok." }
    ]
  },
  ko: {
    nav: { home: "홈", features: "생성", analytics: "분석", settings: "설정", language: "언어" },
    buttons: { 
      createVideo: "영상 생성", 
      download: "다운로드", 
      share: "공유", 
      send: "전송", 
      next: "다음 단계", 
      start: "생성 시작", 
      another: "다른 영상 만들기", 
      publish: "틱톡에 게시",
      uploadAll: "SNS 자동 업로드",
      uploadChina: "중국 플랫폼 업로드",
      uploading: "업로드 중..."
    },
    chat: { 
      title: "실시간 번역 채팅", 
      voiceCall: "음성 통화", 
      videoCall: "영상 통화", 
      placeholder: "메시지를 입력하세요...", 
      status: "온라인 • 실시간 번역", 
      original: "원본",
      welcome: "안녕하세요! 무엇을 도와드릴까요?",
      translating: "요청하신 내용을 번역 중입니다... (가상 번역)"
    },
    faq: { title: "AI 플랫폼 가이드", search: "FAQ 검색...", status: "AI 어시스턴트 • 상시 대기" },
    dashboard: { 
      title: "글로벌 마케팅 허브", 
      subtitle: "8개 언어로 영상을 제작, 번역 및 게시하세요.",
      recentProjects: "최근 프로젝트",
      noVideos: "생성된 영상이 없습니다.",
      createFirst: "첫 번째 영상을 만들어보세요",
      welcome: "반갑습니다, 마케터님"
    },
    stats: {
      totalVideos: "총 영상 수",
      totalViews: "총 조회수",
      avgCtr: "평균 클릭률",
      conversions: "전환수"
    },
    analytics: {
      title: "성과 분석",
      subtitle: "글로벌 플랫폼에서의 영상 성과를 추적하세요.",
      viewsOverTime: "시간별 조회수",
      platformDistribution: "플랫폼별 분포",
      engagementRate: "참여율",
      topPerforming: "최고 성과 영상"
    },
    settings: {
      title: "설정",
      subtitle: "계정, API 키 및 기본 설정을 관리하세요.",
      profile: "프로필 설정",
      apiKeys: "API 연동",
      notifications: "알림 설정",
      save: "변경사항 저장",
      language: "인터페이스 언어",
      theme: "테마 설정"
    },
    create: {
      title: "원클릭 비디오 매직",
      subtitle: "상품 링크나 설명을 붙여넣으면 AI가 나머지를 처리합니다.",
      label: "상품 URL 또는 설명",
      placeholder: "https://amazon.com/product-link 또는 '여행자를 위한 휴대용 커피 메이커...'",
      engine: "AI 생성 엔진",
      ready: "상품을 바이럴 영상으로 바꿀 준비가 되었습니다.",
      working: "AI가 마법을 부리는 중입니다... 약 30초 정도 소요됩니다.",
      preview: "영상 미리보기가 여기에 표시됩니다",
      complete: "생성 완료!",
      projectName: "프로젝트 이름",
      scriptLabel: "마케팅 스크립트",
      logs: {
        analyzing: "상품 상세 정보 분석 중...",
        found: "발견됨",
        crafting: "고효율 마케팅 스크립트 작성 중...",
        scriptGenerated: "훅, 문제, 해결책, CTA가 포함된 스크립트가 생성되었습니다.",
        generatingScenes: "시각적 장면 생성 중...",
        creatingScene: "장면 생성 중",
        error: "생성 중 오류가 발생했습니다. 다시 시도해 주세요."
      }
    },
    sidebar: {
      plan: "플랜: 무료",
      remaining: "무제한 이용 가능"
    },
    faqItems: [
      { q: "AI 영상 생성이 무엇인가요?", a: "AI가 링크나 설명을 바탕으로 마케팅 영상을 자동으로 제작합니다." },
      { q: "영상은 어떻게 만드나요?", a: "상품 URL을 입력하고 생성 버튼을 누르세요." },
      { q: "무료인가요?", a: "네, 모든 기능은 회원가입 없이 무료로 이용 가능합니다." },
      { q: "어떤 언어를 지원하나요?", a: "한국어, 영어, 중국어 등 8개 글로벌 언어를 지원합니다." },
      { q: "영상을 다운로드할 수 있나요?", a: "네, MP4 형식으로 다운로드 가능합니다." },
      { q: "공유는 어떻게 하나요?", a: "공유 버튼을 눌러 링크를 복사하거나 SNS에 바로 게시하세요." },
      { q: "AI 스크립트가 무엇인가요?", a: "AI가 판매율을 높여주는 마케팅 문구를 자동으로 작성합니다." },
      { q: "목소리를 바꿀 수 있나요?", a: "네, 설정에서 다양한 AI 음성을 선택할 수 있습니다." },
      { q: "AI 자막은 무엇인가요?", a: "음성에 맞춰 자막이 자동으로 생성되고 동기화됩니다." },
      { q: "영상 길이는 얼마나 되나요?", a: "보통 15~60초이며 쇼츠/틱톡에 최적화되어 있습니다." }
    ]
  },
  zh: {
    nav: { home: "首页", features: "功能", faq: "常见问题", language: "语言" },
    buttons: { createVideo: "创建视频", download: "下载", share: "分享", send: "发送" },
    chat: { title: "实时翻译聊天", voiceCall: "语音通话", videoCall: "视频通话", placeholder: "输入消息..." },
    faq: { title: "AI 平台指南", search: "搜索常见问题..." },
    faqItems: [
      { q: "什么是 AI 视频生成器？", a: "AI 根据链接或描述自动创建营销视频。" },
      { q: "如何创建视频？", a: "输入产品 URL 并点击生成。" }
    ]
  },
  ja: {
    nav: { home: "ホーム", features: "機能", faq: "FAQ", language: "言語" },
    buttons: { createVideo: "動画作成", download: "ダウンロード", share: "共有", send: "送信" },
    chat: { title: "リアルタイム翻訳チャット", voiceCall: "音声通話", videoCall: "ビデオ通話", placeholder: "メッセージを入力..." },
    faq: { title: "AIプラットフォームガイド", search: "FAQを検索..." },
    faqItems: [
      { q: "AI動画生成とは何ですか？", a: "AIがリンクや説明からマーケティング動画を自動的に作成します。" },
      { q: "動画の作り方は？", a: "商品のURLを入力して生成をクリックします。" }
    ]
  },
  ru: {
    nav: { home: "Главная", features: "Функции", faq: "FAQ", language: "Язык" },
    buttons: { createVideo: "Создать видео", download: "Скачать", share: "Поделиться", send: "Отправить" },
    chat: { title: "Чат с переводом", voiceCall: "Голосовой звонок", videoCall: "Видеозвонок", placeholder: "Введите сообщение..." },
    faq: { title: "Руководство по платформе", search: "Поиск по FAQ..." },
    faqItems: [
      { q: "Что такое AI Video Generator?", a: "ИИ автоматически создает маркетинговые видео из ссылок или описаний." },
      { q: "Как создать видео?", a: "Введите URL продукта и нажмите «Создать»." }
    ]
  },
  hi: {
    nav: { home: "होम", features: "विशेषताएं", faq: "FAQ", language: "भाषा" },
    buttons: { createVideo: "वीडियो बनाएं", download: "डाउनलोड", share: "साझा करें", send: "भेजें" },
    chat: { title: "लाइव अनुवाद चैट", voiceCall: "वॉयस कॉल", videoCall: "वीडियो कॉल", placeholder: "संदेश टाइप करें..." },
    faq: { title: "AI प्लेटफॉर्म गाइड", search: "FAQ खोजें..." },
    faqItems: [
      { q: "AI वीडियो जेनरेटर क्या है?", a: "AI स्वचालित रूप से लिंक या विवरण से मार्केटिंग वीडियो बनाता है।" },
      { q: "वीडियो कैसे बनाएं?", a: "उत्पाद URL दर्ज करें और जेनरेट पर क्लिक करें।" }
    ]
  },
  'pt-BR': {
    nav: { home: "Início", features: "Recursos", faq: "FAQ", language: "Idioma" },
    buttons: { createVideo: "Criar Vídeo", download: "Baixar", share: "Compartilhar", send: "Enviar" },
    chat: { title: "Chat de Tradução ao Vivo", voiceCall: "Chamada de Voz", videoCall: "Chamada de Vídeo", placeholder: "Digite uma mensagem..." },
    faq: { title: "Guia da Plataforma AI", search: "Pesquisar FAQ..." },
    faqItems: [
      { q: "O que é o Gerador de Vídeo AI?", a: "A IA cria automaticamente vídeos de marketing a partir de links ou descrições." },
      { q: "Como criar um vídeo?", a: "Insira o URL do produto e clique em gerar." }
    ]
  },
  id: {
    nav: { home: "Beranda", features: "Fitur", faq: "FAQ", language: "Bahasa" },
    buttons: { createVideo: "Buat Video", download: "Unduh", share: "Bagikan", send: "Kirim" },
    chat: { title: "Obrolan Terjemahan Langsung", voiceCall: "Panggilan Suara", videoCall: "Panggilan Video", placeholder: "Ketik pesan..." },
    faq: { title: "Panduan Platform AI", search: "Cari FAQ..." },
    faqItems: [
      { q: "Apa itu AI Video Generator?", a: "AI secara otomatis membuat video pemasaran dari tautan atau deskripsi." },
      { q: "Bagaimana cara membuat video?", a: "Masukkan URL produk dan klik buat." }
    ]
  }
};
