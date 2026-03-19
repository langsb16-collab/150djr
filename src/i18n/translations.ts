export type Locale = 'ko' | 'en' | 'zh' | 'ja' | 'ru' | 'hi' | 'pt-BR' | 'id';

export const translations: Record<Locale, any> = {
  en: {
    nav: { home: "Home", features: "AI Generation", analytics: "Analytics", settings: "Settings", language: "Language" },
    buttons: { 
      createVideo: "Create Video", 
      collectAndSell: "Start Collection & Sales",
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
      welcome: "Welcome back, Marketer",
      emptyTitle: "Start Your First Campaign",
      emptySubtitle1: "Automatic generation in 8 global languages",
      emptySubtitle2: "AI handles marketing for you",
      emptyButton: "Generate Video"
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
      placeholder: "https://amazon.com/product-link or describe your product...",
      placeholderAuto: "Enter a keyword to start full automation...",
      engine: "AI Generation Engine",
      ready: "Ready to transform your product into a viral video.",
      working: "AI is working its magic... This takes about 30 seconds.",
      preview: "Video preview will appear here",
      complete: "Generation Complete!",
      projectName: "Project Name",
      scriptLabel: "Marketing Script",
      automationOn: "Full Automation ON",
      automationOff: "Full Automation OFF",
      automationTitle: "Automation Workflow",
      automationSteps: [
        "Automatic Wholesale Collection (Best Price)",
        "AI Product Analysis & Viral Scripting",
        "Auto-Registration to Marketplaces",
        "AI Marketing Video Generation",
        "Global SNS & Platform Distribution"
      ],
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
      { q: "Is it free?", a: "Yes, all features are free to use without signup." }
    ]
  },
  ko: {
    nav: { home: "홈", features: "AI 생성", analytics: "분석", settings: "설정", language: "언어" },
    buttons: { 
      createVideo: "영상 생성", 
      collectAndSell: "수집 및 판매 시작",
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
      welcome: "반갑습니다, 마케터님",
      emptyTitle: "첫 번째 캠페인을 시작하세요",
      emptySubtitle1: "글로벌 8개 언어 자동 생성",
      emptySubtitle2: "AI가 마케팅을 대신합니다",
      emptyButton: "영상 생성하기"
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
      placeholder: "https://amazon.com/product-link 또는 상품을 설명하세요...",
      placeholderAuto: "키워드를 입력하여 전체 자동화를 시작하세요...",
      engine: "AI 생성 엔진",
      ready: "상품을 바이럴 영상으로 바꿀 준비가 되었습니다.",
      working: "AI가 마법을 부리는 중입니다... 약 30초 정도 소요됩니다.",
      preview: "영상 미리보기가 여기에 표시됩니다",
      complete: "생성 완료!",
      projectName: "프로젝트 이름",
      scriptLabel: "마케팅 스크립트",
      automationOn: "전체 자동화 켜짐",
      automationOff: "전체 자동화 꺼짐",
      automationTitle: "자동화 워크플로",
      automationSteps: [
        "자동 도매 수집 (최저가)",
        "AI 상품 분석 및 바이럴 스크립트",
        "오픈마켓 자동 등록",
        "AI 마케팅 비디오 생성",
        "글로벌 SNS 및 플랫폼 배포"
      ],
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
      { q: "무료인가요?", a: "네, 모든 기능은 회원가입 없이 무료로 이용 가능합니다." }
    ]
  },
  zh: {
    nav: { home: "首页", features: "AI 生成", analytics: "分析", settings: "设置", language: "语言" },
    buttons: { 
      createVideo: "创建视频", 
      collectAndSell: "开始收集和销售",
      download: "下载", 
      share: "分享", 
      send: "发送", 
      next: "下一步", 
      start: "开始生成", 
      another: "创建另一个视频", 
      publish: "发布到抖音",
      uploadAll: "上传到社交媒体",
      uploadChina: "上传到中国平台",
      uploading: "上传中..."
    },
    chat: { 
      title: "实时翻译聊天", 
      voiceCall: "语音通话", 
      videoCall: "视频通话", 
      placeholder: "输入消息...", 
      status: "在线 • 实时翻译", 
      original: "原文",
      welcome: "您好！有什么可以帮您的吗？",
      translating: "正在翻译您的请求...（模拟翻译）"
    },
    faq: { title: "AI 平台指南", search: "搜索常见问题...", status: "AI 助手 • 始终在线" },
    dashboard: { 
      title: "全球营销中心", 
      subtitle: "创建、翻译并发布 8 种语言的视频。",
      recentProjects: "最近的项目",
      noVideos: "尚未生成视频。",
      createFirst: "创建您的第一个视频",
      welcome: "欢迎回来，营销人员",
      emptyTitle: "开始您的第一个活动",
      emptySubtitle1: "8 种全球语言自动生成",
      emptySubtitle2: "AI 为您处理营销",
      emptyButton: "生成视频"
    },
    stats: {
      totalVideos: "总视频数",
      totalViews: "总观看次数",
      avgCtr: "平均点击率",
      conversions: "转化次数"
    },
    analytics: {
      title: "性能分析",
      subtitle: "跟踪您在全球平台上的视频表现。",
      viewsOverTime: "随时间变化的观看次数",
      platformDistribution: "平台分布",
      engagementRate: "参与率",
      topPerforming: "表现最佳的视频"
    },
    settings: {
      title: "设置",
      subtitle: "管理您的帐户、API 密钥和偏好设置。",
      profile: "个人资料设置",
      apiKeys: "API 集成",
      notifications: "通知",
      save: "保存更改",
      language: "界面语言",
      theme: "主题偏好"
    },
    create: {
      title: "一键视频魔法",
      subtitle: "粘贴产品链接或描述，让 AI 完成剩下的工作。",
      label: "产品 URL 或描述",
      placeholder: "https://amazon.com/product-link 或描述您的产品...",
      placeholderAuto: "输入关键字开始完全自动化...",
      engine: "AI 生成引擎",
      ready: "准备将您的产品转化为病毒式视频。",
      working: "AI 正在施展魔法...大约需要 30 秒。",
      preview: "视频预览将显示在这里",
      complete: "生成完成！",
      projectName: "项目名称",
      scriptLabel: "营销脚本",
      automationOn: "完全自动化开启",
      automationOff: "完全自动化关闭",
      automationTitle: "自动化工作流程",
      automationSteps: [
        "自动批发收集（最优价格）",
        "AI 产品分析和病毒式脚本编写",
        "自动注册到市场",
        "AI 营销视频生成",
        "全球社交网络和平台分发"
      ],
      logs: {
        analyzing: "分析产品详细信息...",
        found: "找到",
        crafting: "编写高转化率脚本...",
        scriptGenerated: "已生成包含钩子、问题、解决方案和 CTA 的脚本。",
        generatingScenes: "生成视觉场景...",
        creatingScene: "创建场景",
        error: "生成过程中出错。请重试。"
      }
    },
    sidebar: {
      plan: "计划：免费",
      remaining: "无限访问"
    },
    faqItems: [
      { q: "什么是 AI 视频生成器？", a: "AI 根据链接或描述自动创建营销视频。" },
      { q: "如何创建视频？", a: "输入产品 URL 并点击生成。" },
      { q: "是免费的吗？", a: "是的，所有功能都可以免费使用，无需注册。" }
    ]
  },
  ja: {
    nav: { home: "ホーム", features: "AI 生成", analytics: "分析", settings: "設定", language: "言語" },
    buttons: { 
      createVideo: "動画作成", 
      collectAndSell: "収集と販売を開始",
      download: "ダウンロード", 
      share: "共有", 
      send: "送信", 
      next: "次のステップ", 
      start: "生成を開始", 
      another: "別の動画を作成", 
      publish: "TikTokに公開",
      uploadAll: "ソーシャルメディアにアップロード",
      uploadChina: "中国プラットフォームにアップロード",
      uploading: "アップロード中..."
    },
    chat: { 
      title: "リアルタイム翻訳チャット", 
      voiceCall: "音声通話", 
      videoCall: "ビデオ通話", 
      placeholder: "メッセージを入力...", 
      status: "オンライン • リアルタイム翻訳", 
      original: "原文",
      welcome: "こんにちは！今日はどのようにお手伝いできますか？",
      translating: "リクエストを翻訳しています...（模擬翻訳）"
    },
    faq: { title: "AI プラットフォームガイド", search: "FAQ を検索...", status: "AI アシスタント • 常時オンライン" },
    dashboard: { 
      title: "グローバルマーケティングハブ", 
      subtitle: "8 つの言語で動画を作成、翻訳、公開します。",
      recentProjects: "最近のプロジェクト",
      noVideos: "まだ動画が生成されていません。",
      createFirst: "最初の動画を作成する",
      welcome: "おかえりなさい、マーケター",
      emptyTitle: "最初のキャンペーンを開始",
      emptySubtitle1: "8 つのグローバル言語で自動生成",
      emptySubtitle2: "AI がマーケティングを処理します",
      emptyButton: "動画を生成"
    },
    stats: {
      totalVideos: "総動画数",
      totalViews: "総視聴回数",
      avgCtr: "平均クリック率",
      conversions: "コンバージョン数"
    },
    analytics: {
      title: "パフォーマンス分析",
      subtitle: "グローバルプラットフォームでの動画のパフォーマンスを追跡します。",
      viewsOverTime: "時間経過による視聴回数",
      platformDistribution: "プラットフォーム分布",
      engagementRate: "エンゲージメント率",
      topPerforming: "トップパフォーマンス動画"
    },
    settings: {
      title: "設定",
      subtitle: "アカウント、API キー、および設定を管理します。",
      profile: "プロフィール設定",
      apiKeys: "API 統合",
      notifications: "通知",
      save: "変更を保存",
      language: "インターフェース言語",
      theme: "テーマ設定"
    },
    create: {
      title: "ワンクリック動画マジック",
      subtitle: "製品リンクまたは説明を貼り付けて、AI に残りを任せます。",
      label: "製品 URL または説明",
      placeholder: "https://amazon.com/product-link または製品を説明...",
      placeholderAuto: "キーワードを入力して完全自動化を開始...",
      engine: "AI 生成エンジン",
      ready: "製品をバイラル動画に変換する準備ができました。",
      working: "AI が魔法をかけています...約 30 秒かかります。",
      preview: "動画プレビューがここに表示されます",
      complete: "生成完了！",
      projectName: "プロジェクト名",
      scriptLabel: "マーケティングスクリプト",
      automationOn: "完全自動化オン",
      automationOff: "完全自動化オフ",
      automationTitle: "自動化ワークフロー",
      automationSteps: [
        "自動卸売収集（最安値）",
        "AI 製品分析とバイラルスクリプト作成",
        "マーケットプレイスへの自動登録",
        "AI マーケティング動画生成",
        "グローバル SNS およびプラットフォーム配信"
      ],
      logs: {
        analyzing: "商品の詳細を分析しています...",
        found: "見つかりました",
        crafting: "高コンバージョンスクリプトを作成中...",
        scriptGenerated: "フック、問題、解決策、CTA を含むスクリプトが生成されました。",
        generatingScenes: "ビジュアルシーンを生成しています...",
        creatingScene: "シーンを作成中",
        error: "生成中にエラーが発生しました。もう一度お試しください。"
      }
    },
    sidebar: {
      plan: "プラン：無料",
      remaining: "無制限アクセス"
    },
    faqItems: [
      { q: "AI 動画生成とは何ですか？", a: "AI がリンクや説明からマーケティング動画を自動的に作成します。" },
      { q: "動画の作り方は？", a: "製品 URL を入力して生成をクリックします。" },
      { q: "無料ですか？", a: "はい、すべての機能は登録なしで無料で使用できます。" }
    ]
  },
  ru: {
    nav: { home: "Главная", features: "AI генерация", analytics: "Аналитика", settings: "Настройки", language: "Язык" },
    buttons: { 
      createVideo: "Создать видео", 
      collectAndSell: "Начать сбор и продажи",
      download: "Скачать", 
      share: "Поделиться", 
      send: "Отправить", 
      next: "Следующий шаг", 
      start: "Начать генерацию", 
      another: "Создать другое видео", 
      publish: "Опубликовать в TikTok",
      uploadAll: "Загрузить в соцсети",
      uploadChina: "Загрузить на китайские платформы",
      uploading: "Загрузка..."
    },
    chat: { 
      title: "Чат с переводом в реальном времени", 
      voiceCall: "Голосовой звонок", 
      videoCall: "Видеозвонок", 
      placeholder: "Введите сообщение...", 
      status: "Онлайн • Перевод в реальном времени", 
      original: "Оригинал",
      welcome: "Здравствуйте! Чем я могу вам помочь сегодня?",
      translating: "Перевожу ваш запрос... (Имитация перевода)"
    },
    faq: { title: "Руководство по AI платформе", search: "Поиск по FAQ...", status: "AI Ассистент • Всегда онлайн" },
    dashboard: { 
      title: "Глобальный маркетинговый центр", 
      subtitle: "Создавайте, переводите и публикуйте видео на 8 языках.",
      recentProjects: "Недавние проекты",
      noVideos: "Видео еще не созданы.",
      createFirst: "Создайте свое первое видео",
      welcome: "С возвращением, маркетолог",
      emptyTitle: "Начните свою первую кампанию",
      emptySubtitle1: "Автоматическая генерация на 8 мировых языках",
      emptySubtitle2: "AI берет маркетинг на себя",
      emptyButton: "Создать видео"
    },
    stats: {
      totalVideos: "Всего видео",
      totalViews: "Всего просмотров",
      avgCtr: "Средний CTR",
      conversions: "Конверсии"
    },
    analytics: {
      title: "Аналитика производительности",
      subtitle: "Отслеживайте эффективность ваших видео на глобальных платформах.",
      viewsOverTime: "Просмотры со временем",
      platformDistribution: "Распределение по платформам",
      engagementRate: "Уровень вовлеченности",
      topPerforming: "Лучшие видео"
    },
    settings: {
      title: "Настройки",
      subtitle: "Управляйте своей учетной записью, API ключами и настройками.",
      profile: "Настройки профиля",
      apiKeys: "Интеграции API",
      notifications: "Уведомления",
      save: "Сохранить изменения",
      language: "Язык интерфейса",
      theme: "Настройки темы"
    },
    create: {
      title: "Видео магия одним кликом",
      subtitle: "Вставьте ссылку на продукт или описание, и пусть AI сделает все остальное.",
      label: "URL продукта или описание",
      placeholder: "https://amazon.com/product-link или опишите ваш продукт...",
      placeholderAuto: "Введите ключевое слово для запуска полной автоматизации...",
      engine: "AI движок генерации",
      ready: "Готово превратить ваш продукт в вирусное видео.",
      working: "AI творит магию... Это займет около 30 секунд.",
      preview: "Предпросмотр видео появится здесь",
      complete: "Генерация завершена!",
      projectName: "Название проекта",
      scriptLabel: "Маркетинговый скрипт",
      automationOn: "Полная автоматизация включена",
      automationOff: "Полная автоматизация выключена",
      automationTitle: "Рабочий процесс автоматизации",
      automationSteps: [
        "Автоматический сбор оптовых товаров (лучшая цена)",
        "AI анализ продукта и создание вирусного скрипта",
        "Автоматическая регистрация на маркетплейсах",
        "AI генерация маркетингового видео",
        "Распространение в глобальных соцсетях и платформах"
      ],
      logs: {
        analyzing: "Анализ деталей продукта...",
        found: "Найдено",
        crafting: "Создание высококонверсионного скрипта...",
        scriptGenerated: "Скрипт создан с хуком, проблемой, решением и призывом к действию.",
        generatingScenes: "Генерация визуальных сцен...",
        creatingScene: "Создание сцены",
        error: "Ошибка при генерации. Пожалуйста, попробуйте снова."
      }
    },
    sidebar: {
      plan: "План: Бесплатный",
      remaining: "Неограниченный доступ"
    },
    faqItems: [
      { q: "Что такое AI генератор видео?", a: "AI автоматически создает маркетинговые видео из ссылок или описаний." },
      { q: "Как создать видео?", a: "Введите URL продукта и нажмите генерировать." },
      { q: "Это бесплатно?", a: "Да, все функции бесплатны для использования без регистрации." }
    ]
  },
  hi: {
    nav: { home: "होम", features: "AI जनरेशन", analytics: "विश्लेषण", settings: "सेटिंग्स", language: "भाषा" },
    buttons: { 
      createVideo: "वीडियो बनाएं", 
      collectAndSell: "संग्रह और बिक्री शुरू करें",
      download: "डाउनलोड", 
      share: "साझा करें", 
      send: "भेजें", 
      next: "अगला कदम", 
      start: "जनरेट करना शुरू करें", 
      another: "दूसरा वीडियो बनाएं", 
      publish: "TikTok पर प्रकाशित करें",
      uploadAll: "सोशल मीडिया पर अपलोड करें",
      uploadChina: "चीनी प्लेटफार्मों पर अपलोड करें",
      uploading: "अपलोड हो रहा है..."
    },
    chat: { 
      title: "लाइव अनुवाद चैट", 
      voiceCall: "वॉयस कॉल", 
      videoCall: "वीडियो कॉल", 
      placeholder: "संदेश टाइप करें...", 
      status: "ऑनलाइन • रियल-टाइम अनुवाद", 
      original: "मूल",
      welcome: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?",
      translating: "मैं आपके अनुरोध का अनुवाद कर रहा हूं... (मॉक अनुवाद)"
    },
    faq: { title: "AI प्लेटफॉर्म गाइड", search: "FAQ खोजें...", status: "AI सहायक • हमेशा ऑनलाइन" },
    dashboard: { 
      title: "वैश्विक मार्केटिंग हब", 
      subtitle: "8 भाषाओं में वीडियो बनाएं, अनुवाद करें और प्रकाशित करें।",
      recentProjects: "हाल की परियोजनाएं",
      noVideos: "अभी तक कोई वीडियो नहीं बनाया गया है।",
      createFirst: "अपना पहला वीडियो बनाएं",
      welcome: "वापस स्वागत है, मार्केटर",
      emptyTitle: "अपना पहला अभियान शुरू करें",
      emptySubtitle1: "8 वैश्विक भाषाओं में स्वचालित जनरेशन",
      emptySubtitle2: "AI आपके लिए मार्केटिंग संभालता है",
      emptyButton: "वीडियो जनरेट करें"
    },
    stats: {
      totalVideos: "कुल वीडियो",
      totalViews: "कुल व्यूज",
      avgCtr: "औसत CTR",
      conversions: "कन्वर्जन"
    },
    analytics: {
      title: "प्रदर्शन विश्लेषण",
      subtitle: "वैश्विक प्लेटफार्मों पर अपने वीडियो के प्रदर्शन को ट्रैक करें।",
      viewsOverTime: "समय के साथ व्यूज",
      platformDistribution: "प्लेटफॉर्म वितरण",
      engagementRate: "एंगेजमेंट दर",
      topPerforming: "सबसे अच्छा प्रदर्शन करने वाले वीडियो"
    },
    settings: {
      title: "सेटिंग्स",
      subtitle: "अपने खाते, API कुंजी और प्राथमिकताओं को प्रबंधित करें।",
      profile: "प्रोफ़ाइल सेटिंग्स",
      apiKeys: "API एकीकरण",
      notifications: "सूचनाएं",
      save: "परिवर्तन सहेजें",
      language: "इंटरफ़ेस भाषा",
      theme: "थीम प्राथमिकता"
    },
    create: {
      title: "एक-क्लिक वीडियो मैजिक",
      subtitle: "उत्पाद लिंक या विवरण पेस्ट करें और AI को बाकी काम करने दें।",
      label: "उत्पाद URL या विवरण",
      placeholder: "https://amazon.com/product-link या अपने उत्पाद का वर्णन करें...",
      placeholderAuto: "पूर्ण स्वचालन शुरू करने के लिए एक कीवर्ड दर्ज करें...",
      engine: "AI जनरेशन इंजन",
      ready: "आपके उत्पाद को वायरल वीडियो में बदलने के लिए तैयार।",
      working: "AI अपना जादू कर रहा है... इसमें लगभग 30 सेकंड लगते हैं।",
      preview: "वीडियो पूर्वावलोकन यहां दिखाई देगा",
      complete: "जनरेशन पूर्ण!",
      projectName: "परियोजना का नाम",
      scriptLabel: "मार्केटिंग स्क्रिप्ट",
      automationOn: "पूर्ण स्वचालन चालू",
      automationOff: "पूर्ण स्वचालन बंद",
      automationTitle: "स्वचालन वर्कफ़्लो",
      automationSteps: [
        "स्वचालित थोक संग्रह (सर्वोत्तम मूल्य)",
        "AI उत्पाद विश्लेषण और वायरल स्क्रिप्टिंग",
        "मार्केटप्लेस में स्वचालित पंजीकरण",
        "AI मार्केटिंग वीडियो जनरेशन",
        "वैश्विक SNS और प्लेटफ़ॉर्म वितरण"
      ],
      logs: {
        analyzing: "उत्पाद विवरण का विश्लेषण कर रहे हैं...",
        found: "मिल गया",
        crafting: "उच्च-परिवर्तन स्क्रिप्ट तैयार कर रहे हैं...",
        scriptGenerated: "हुक, समस्या, समाधान और CTA के साथ स्क्रिप्ट जनरेट की गई।",
        generatingScenes: "दृश्य दृश्य जनरेट कर रहे हैं...",
        creatingScene: "दृश्य बना रहे हैं",
        error: "जनरेशन के दौरान त्रुटि। कृपया पुनः प्रयास करें।"
      }
    },
    sidebar: {
      plan: "योजना: मुफ्त",
      remaining: "असीमित पहुंच"
    },
    faqItems: [
      { q: "AI वीडियो जेनरेटर क्या है?", a: "AI स्वचालित रूप से लिंक या विवरण से मार्केटिंग वीडियो बनाता है।" },
      { q: "वीडियो कैसे बनाएं?", a: "उत्पाद URL दर्ज करें और जेनरेट पर क्लिक करें।" },
      { q: "क्या यह मुफ़्त है?", a: "हां, सभी सुविधाएं बिना साइनअप के मुफ़्त में उपयोग की जा सकती हैं।" }
    ]
  },
  'pt-BR': {
    nav: { home: "Início", features: "Geração AI", analytics: "Análise", settings: "Configurações", language: "Idioma" },
    buttons: { 
      createVideo: "Criar Vídeo", 
      collectAndSell: "Iniciar Coleta e Vendas",
      download: "Baixar", 
      share: "Compartilhar", 
      send: "Enviar", 
      next: "Próxima Etapa", 
      start: "Iniciar Geração", 
      another: "Criar Outro Vídeo", 
      publish: "Publicar no TikTok",
      uploadAll: "Enviar para Redes Sociais",
      uploadChina: "Enviar para Plataformas Chinesas",
      uploading: "Enviando..."
    },
    chat: { 
      title: "Chat de Tradução ao Vivo", 
      voiceCall: "Chamada de Voz", 
      videoCall: "Chamada de Vídeo", 
      placeholder: "Digite uma mensagem...", 
      status: "Online • Tradução em Tempo Real", 
      original: "Original",
      welcome: "Olá! Como posso ajudá-lo hoje?",
      translating: "Estou traduzindo sua solicitação... (Tradução Simulada)"
    },
    faq: { title: "Guia da Plataforma AI", search: "Pesquisar FAQ...", status: "Assistente AI • Sempre Online" },
    dashboard: { 
      title: "Centro de Marketing Global", 
      subtitle: "Crie, traduza e publique vídeos em 8 idiomas.",
      recentProjects: "Projetos Recentes",
      noVideos: "Nenhum vídeo gerado ainda.",
      createFirst: "Crie seu primeiro vídeo",
      welcome: "Bem-vindo de volta, Profissional de Marketing",
      emptyTitle: "Inicie Sua Primeira Campanha",
      emptySubtitle1: "Geração automática em 8 idiomas globais",
      emptySubtitle2: "A AI cuida do marketing para você",
      emptyButton: "Gerar Vídeo"
    },
    stats: {
      totalVideos: "Total de Vídeos",
      totalViews: "Total de Visualizações",
      avgCtr: "CTR Médio",
      conversions: "Conversões"
    },
    analytics: {
      title: "Análise de Desempenho",
      subtitle: "Acompanhe o desempenho de seus vídeos em plataformas globais.",
      viewsOverTime: "Visualizações ao Longo do Tempo",
      platformDistribution: "Distribuição por Plataforma",
      engagementRate: "Taxa de Engajamento",
      topPerforming: "Vídeos de Melhor Desempenho"
    },
    settings: {
      title: "Configurações",
      subtitle: "Gerencie sua conta, chaves de API e preferências.",
      profile: "Configurações de Perfil",
      apiKeys: "Integrações de API",
      notifications: "Notificações",
      save: "Salvar Alterações",
      language: "Idioma da Interface",
      theme: "Preferência de Tema"
    },
    create: {
      title: "Mágica de Vídeo em Um Clique",
      subtitle: "Cole um link de produto ou descrição e deixe a AI fazer o resto.",
      label: "URL do Produto ou Descrição",
      placeholder: "https://amazon.com/product-link ou descreva seu produto...",
      placeholderAuto: "Digite uma palavra-chave para iniciar a automação completa...",
      engine: "Motor de Geração AI",
      ready: "Pronto para transformar seu produto em um vídeo viral.",
      working: "A AI está fazendo sua mágica... Isso leva cerca de 30 segundos.",
      preview: "A prévia do vídeo aparecerá aqui",
      complete: "Geração Completa!",
      projectName: "Nome do Projeto",
      scriptLabel: "Script de Marketing",
      automationOn: "Automação Completa LIGADA",
      automationOff: "Automação Completa DESLIGADA",
      automationTitle: "Fluxo de Trabalho de Automação",
      automationSteps: [
        "Coleta Automática no Atacado (Melhor Preço)",
        "Análise de Produto AI e Roteirização Viral",
        "Registro Automático em Marketplaces",
        "Geração de Vídeo de Marketing AI",
        "Distribuição em Redes Sociais Globais e Plataformas"
      ],
      logs: {
        analyzing: "Analisando detalhes do produto...",
        found: "Encontrado",
        crafting: "Criando script de alta conversão...",
        scriptGenerated: "Script gerado com Gancho, Problema, Solução e CTA.",
        generatingScenes: "Gerando cenas visuais...",
        creatingScene: "Criando Cena",
        error: "Erro durante a geração. Por favor, tente novamente."
      }
    },
    sidebar: {
      plan: "Plano: Gratuito",
      remaining: "Acesso Ilimitado"
    },
    faqItems: [
      { q: "O que é o Gerador de Vídeo AI?", a: "A AI cria automaticamente vídeos de marketing a partir de links ou descrições." },
      { q: "Como criar um vídeo?", a: "Insira o URL do produto e clique em gerar." },
      { q: "É gratuito?", a: "Sim, todos os recursos são gratuitos para usar sem cadastro." }
    ]
  },
  id: {
    nav: { home: "Beranda", features: "Generasi AI", analytics: "Analitik", settings: "Pengaturan", language: "Bahasa" },
    buttons: { 
      createVideo: "Buat Video", 
      collectAndSell: "Mulai Pengumpulan & Penjualan",
      download: "Unduh", 
      share: "Bagikan", 
      send: "Kirim", 
      next: "Langkah Selanjutnya", 
      start: "Mulai Menghasilkan", 
      another: "Buat Video Lain", 
      publish: "Publikasikan ke TikTok",
      uploadAll: "Unggah ke Media Sosial",
      uploadChina: "Unggah ke Platform China",
      uploading: "Mengunggah..."
    },
    chat: { 
      title: "Obrolan Terjemahan Langsung", 
      voiceCall: "Panggilan Suara", 
      videoCall: "Panggilan Video", 
      placeholder: "Ketik pesan...", 
      status: "Online • Terjemahan Real-time", 
      original: "Asli",
      welcome: "Halo! Bagaimana saya bisa membantu Anda hari ini?",
      translating: "Saya sedang menerjemahkan permintaan Anda... (Terjemahan Tiruan)"
    },
    faq: { title: "Panduan Platform AI", search: "Cari FAQ...", status: "Asisten AI • Selalu Online" },
    dashboard: { 
      title: "Pusat Pemasaran Global", 
      subtitle: "Buat, terjemahkan, dan publikasikan video dalam 8 bahasa.",
      recentProjects: "Proyek Terbaru",
      noVideos: "Belum ada video yang dihasilkan.",
      createFirst: "Buat video pertama Anda",
      welcome: "Selamat datang kembali, Pemasar",
      emptyTitle: "Mulai Kampanye Pertama Anda",
      emptySubtitle1: "Generasi otomatis dalam 8 bahasa global",
      emptySubtitle2: "AI menangani pemasaran untuk Anda",
      emptyButton: "Hasilkan Video"
    },
    stats: {
      totalVideos: "Total Video",
      totalViews: "Total Tampilan",
      avgCtr: "CTR Rata-rata",
      conversions: "Konversi"
    },
    analytics: {
      title: "Analitik Kinerja",
      subtitle: "Lacak kinerja video Anda di platform global.",
      viewsOverTime: "Tampilan Seiring Waktu",
      platformDistribution: "Distribusi Platform",
      engagementRate: "Tingkat Keterlibatan",
      topPerforming: "Video Berkinerja Teratas"
    },
    settings: {
      title: "Pengaturan",
      subtitle: "Kelola akun, kunci API, dan preferensi Anda.",
      profile: "Pengaturan Profil",
      apiKeys: "Integrasi API",
      notifications: "Notifikasi",
      save: "Simpan Perubahan",
      language: "Bahasa Antarmuka",
      theme: "Preferensi Tema"
    },
    create: {
      title: "Sihir Video Sekali Klik",
      subtitle: "Tempel tautan produk atau deskripsi dan biarkan AI melakukan sisanya.",
      label: "URL Produk atau Deskripsi",
      placeholder: "https://amazon.com/product-link atau deskripsikan produk Anda...",
      placeholderAuto: "Masukkan kata kunci untuk memulai otomatisasi penuh...",
      engine: "Mesin Generasi AI",
      ready: "Siap mengubah produk Anda menjadi video viral.",
      working: "AI sedang bekerja dengan sihirnya... Ini memakan waktu sekitar 30 detik.",
      preview: "Pratinjau video akan muncul di sini",
      complete: "Generasi Selesai!",
      projectName: "Nama Proyek",
      scriptLabel: "Skrip Pemasaran",
      automationOn: "Otomatisasi Penuh AKTIF",
      automationOff: "Otomatisasi Penuh NONAKTIF",
      automationTitle: "Alur Kerja Otomasi",
      automationSteps: [
        "Pengumpulan Grosir Otomatis (Harga Terbaik)",
        "Analisis Produk AI & Skrip Viral",
        "Pendaftaran Otomatis ke Pasar",
        "Generasi Video Pemasaran AI",
        "Distribusi Media Sosial Global & Platform"
      ],
      logs: {
        analyzing: "Menganalisis detail produk...",
        found: "Ditemukan",
        crafting: "Membuat skrip konversi tinggi...",
        scriptGenerated: "Skrip dihasilkan dengan Hook, Masalah, Solusi, dan CTA.",
        generatingScenes: "Menghasilkan adegan visual...",
        creatingScene: "Membuat Adegan",
        error: "Kesalahan saat generasi. Silakan coba lagi."
      }
    },
    sidebar: {
      plan: "Paket: Gratis",
      remaining: "Akses Tak Terbatas"
    },
    faqItems: [
      { q: "Apa itu Pembuat Video AI?", a: "AI secara otomatis membuat video pemasaran dari tautan atau deskripsi." },
      { q: "Bagaimana cara membuat video?", a: "Masukkan URL produk dan klik buat." },
      { q: "Apakah gratis?", a: "Ya, semua fitur gratis untuk digunakan tanpa pendaftaran." }
    ]
  }
};
