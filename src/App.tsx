import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Video, 
  LayoutDashboard, 
  Settings, 
  BarChart3, 
  Play, 
  Download, 
  Share2, 
  Loader2, 
  Globe,
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Type as TypeIcon,
  Image as ImageIcon,
  TrendingUp,
  Users,
  Clock,
  ExternalLink,
  Shield,
  Bell,
  User,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { Project, Scene, Script } from './types';
import { analyzeProduct, generateMarketingScript, generateSceneImage, generateVoiceover } from './lib/gemini';
import { runFullAutomation } from './lib/automation';

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ChatWidget } from './components/ChatWidget';
import { AIWidget } from './components/AIWidget';
import { LanguageSwitcher } from './components/LanguageSwitcher';

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="w-64 bg-[#1428A0] border-r border-white/10 h-screen flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
          <Sparkles className="text-[#1428A0] w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">AdBrain AI</h1>
      </div>
      
      <nav className="space-y-2 flex-1">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: t('nav.home') },
          { id: 'create', icon: Plus, label: t('nav.features') },
          { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
          { id: 'settings', icon: Settings, label: t('nav.settings') },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-white/20 text-white shadow-sm' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
          <p className="text-xs text-white/50 mb-2 uppercase tracking-widest font-bold">{t('sidebar.plan')}</p>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white w-full" />
          </div>
          <p className="text-[10px] text-white/40 mt-2">{t('sidebar.remaining')}</p>
        </div>
      </div>
    </div>
  );
};

const VideoPreview = ({ scenes }: { scenes: Scene[] }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying && scenes.length > 0) {
      const scene = scenes[currentSceneIndex];
      const timer = setTimeout(() => {
        if (currentSceneIndex < scenes.length - 1) {
          setCurrentSceneIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentSceneIndex(0);
        }
      }, scene.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentSceneIndex, scenes]);

  const currentScene = scenes[currentSceneIndex];

  return (
    <div className="relative aspect-[9/16] w-full max-w-[360px] bg-black rounded-[32px] overflow-hidden shadow-2xl border-[8px] border-zinc-900 mx-auto">
      <AnimatePresence mode="wait">
        {currentScene && (
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {currentScene.imageUrl ? (
              <img 
                src={currentScene.imageUrl} 
                className="w-full h-full object-cover" 
                alt="Scene"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-zinc-600" />
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            
            {/* Subtitles */}
            <div className="absolute bottom-20 left-6 right-6 text-center">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-xl font-bold leading-tight drop-shadow-lg"
              >
                {currentScene.text}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        >
          {isPlaying ? <Loader2 className="w-6 h-6 text-black animate-spin" /> : <Play className="w-6 h-6 text-black fill-current ml-1" />}
        </button>
      </div>

      {currentScene?.audioUrl && isPlaying && (
        <audio 
          ref={audioRef}
          src={currentScene.audioUrl} 
          autoPlay 
          onEnded={() => {}} 
        />
      )}
    </div>
  );
};

const AnalyticsView = () => {
  const { t } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const data = [
    { name: 'Mon', views: 4000, engagement: 2400 },
    { name: 'Tue', views: 3000, engagement: 1398 },
    { name: 'Wed', views: 2000, engagement: 9800 },
    { name: 'Thu', views: 2780, engagement: 3908 },
    { name: 'Fri', views: 1890, engagement: 4800 },
    { name: 'Sat', views: 2390, engagement: 3800 },
    { name: 'Sun', views: 3490, engagement: 4300 },
  ];

  const platformData = [
    { name: 'TikTok', value: 45, color: '#FF0050' },
    { name: 'Instagram', value: 30, color: '#E1306C' },
    { name: 'YouTube', value: 15, color: '#FF0000' },
    { name: 'Facebook', value: 10, color: '#1877F2' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('analytics.title')}</h2>
          <p className="text-zinc-500 text-sm">{t('analytics.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors flex items-center gap-2"
          >
            <Loader2 className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : 'opacity-0'}`} />
            Refresh
          </button>
          <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors">Last 7 Days</button>
          <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-sm font-medium hover:bg-zinc-50 transition-colors">Export PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-white p-8 rounded-[32px] border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">{t('analytics.viewsOverTime')}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1428A0" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1428A0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="views" stroke="#1428A0" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">{t('analytics.platformDistribution')}</h3>
          <div className="space-y-6">
            {platformData.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{platform.name}</span>
                  <span className="text-zinc-500">{platform.value}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${platform.value}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="text-blue-600 w-8 h-8" />
          </div>
          <h4 className="text-3xl font-black">12.4%</h4>
          <p className="text-zinc-500 text-sm mt-1">{t('analytics.engagementRate')}</p>
          <p className="text-emerald-500 text-xs font-bold mt-2">↑ 2.1% from last week</p>
        </div>

        <div className="col-span-2 bg-white p-8 rounded-[32px] border border-zinc-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">{t('analytics.topPerforming')}</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-zinc-50 rounded-2xl transition-colors cursor-pointer">
                <div className="w-16 h-10 bg-zinc-100 rounded-lg overflow-hidden">
                  <img src={`https://picsum.photos/seed/ad${i}/100/60`} className="w-full h-full object-cover" alt="Thumb" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm truncate">Viral Product Ad #{i}</p>
                  <p className="text-zinc-400 text-xs">Generated 2 days ago</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{(4.2 - i * 0.5).toFixed(1)}k views</p>
                  <p className="text-emerald-500 text-xs font-bold">{(5.2 - i * 0.3).toFixed(1)}% CTR</p>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SettingsView = () => {
  const { t, locale, setLocale } = useLanguage();
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(t('settings.save') + " " + "Success!");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('settings.title')}</h2>
        <p className="text-zinc-500 text-sm">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1 space-y-2">
          {[
            { id: 'profile', icon: User, label: t('settings.profile') },
            { id: 'api', icon: Key, label: t('settings.apiKeys') },
            { id: 'notifications', icon: Bell, label: t('settings.notifications') },
            { id: 'security', icon: Shield, label: 'Security' },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                item.id === 'profile' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-sm space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Marketer Mark</h4>
                <p className="text-zinc-500 text-sm">Pro Plan Member</p>
                <button className="text-[#1428A0] text-xs font-bold mt-2 hover:underline">Change Avatar</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                <input type="text" defaultValue="Marketer Mark" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1428A0]/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                <input type="email" defaultValue="mark@adbrain.ai" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1428A0]/20" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{t('settings.language')}</label>
              <select 
                value={locale}
                onChange={(e) => setLocale(e.target.value as any)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1428A0]/20"
              >
                <option value="en">English</option>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#1428A0] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0d1b6e] transition-all shadow-lg shadow-blue-900/10 disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {t('settings.save')}
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-zinc-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">{t('settings.apiKeys')}</h3>
              <button className="text-xs font-bold text-[#1428A0]">+ Add New Key</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Gemini API', status: 'Active', key: '••••••••••••••••' },
                { name: 'TikTok API', status: 'Connected', key: '••••••••••••••••' },
                { name: 'Instagram API', status: 'Connected', key: '••••••••••••••••' },
              ].map((api) => (
                <div key={api.name} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div>
                    <p className="font-bold text-sm">{api.name}</p>
                    <p className="text-zinc-400 text-xs font-mono mt-1">{api.key}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <span className="text-xs font-bold text-emerald-600">{api.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Creation Flow State
  const [step, setStep] = useState(1);
  const [productInput, setProductInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAutomationMode, setIsAutomationMode] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addLog = (msg: string) => setGenerationLogs(prev => [...prev, msg]);

  const handleGenerate = async () => {
    if (isAutomationMode) {
      handleFullAutomation();
      return;
    }
    setIsGenerating(true);
    setGenerationLogs([]);
    try {
      addLog(`🔍 ${t('create.logs.analyzing')}`);
      const analysis = await analyzeProduct(productInput);
      addLog(`✅ ${t('create.logs.found')}: ${analysis.name}`);
      
      addLog(`✍️ ${t('create.logs.crafting')}`);
      const script = await generateMarketingScript(analysis.name, analysis.description);
      addLog(`✅ ${t('create.logs.scriptGenerated')}`);

      addLog(`🎨 ${t('create.logs.generatingScenes')}`);
      const sceneTexts = [
        script.hook,
        script.problem,
        script.solution,
        ...script.features,
        script.cta
      ];

      const scenes: Scene[] = [];
      for (let i = 0; i < sceneTexts.length; i++) {
        addLog(`🎬 ${t('create.logs.creatingScene')} ${i + 1}/${sceneTexts.length}...`);
        const imageUrl = await generateSceneImage(`${analysis.name}: ${sceneTexts[i]}`);
        const audioUrl = await generateVoiceover(sceneTexts[i]);
        scenes.push({
          id: Math.random().toString(36).substr(2, 9),
          text: sceneTexts[i],
          imageUrl,
          audioUrl,
          duration: 4
        });
      }

      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name: analysis.name,
        product_url: productInput,
        product_description: analysis.description,
        script,
        scenes,
        status: 'completed',
        created_at: new Date().toISOString()
      };

      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      setCurrentProject(newProject);
      setStep(3);
      fetchProjects();
    } catch (err) {
      console.error(err);
      addLog(`❌ ${t('create.logs.error')}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFullAutomation = async () => {
    setIsGenerating(true);
    setGenerationLogs([]);
    try {
      const project = await runFullAutomation(productInput, (step) => {
        const icon = step.id === 'wholesale' ? '🔍' : 
                     step.id === 'analysis' ? '🧠' :
                     step.id === 'script' ? '✍️' :
                     step.id === 'market' ? '🏬' :
                     step.id === 'video' ? '🎬' : '🌐';
        setGenerationLogs(prev => [...prev, `${icon} ${step.name}: ${step.message}`]);
      });
      
      setCurrentProject(project);
      setProjects(prev => [project, ...prev]);
      
      // Save to server
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      
      setStep(3);
    } catch (err) {
      console.error(err);
      setGenerationLogs(prev => [...prev, "❌ Automation failed. Please try again."]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSocialUpload = async () => {
    if (!currentProject.scenes || currentProject.scenes.length === 0) return;
    
    setIsUploading(true);
    try {
      const videoUrl = currentProject.scenes[0].imageUrl; // In a real app, this would be the compiled video URL
      const res = await fetch('/api/social/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl,
          title: currentProject.name,
          description: currentProject.product_description,
          platforms: ['youtube', 'instagram', 'facebook', 'twitter', 'tiktok', 'naver']
        })
      });
      
      const data = await res.json();
      if (data.success) {
        alert(t('chat.translating') + " -> " + "Uploaded to Global platforms!");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please check your credentials.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChinaUpload = async () => {
    if (!currentProject.scenes || currentProject.scenes.length === 0) return;
    
    setIsUploading(true);
    try {
      const videoUrl = currentProject.scenes[0].imageUrl;
      const res = await fetch('/api/social/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl,
          title: currentProject.name,
          description: currentProject.product_description,
          platforms: ['taobao', 'tmall', '1688', 'pinduoduo', 'jd', 'xiaohongshu', 'bilibili']
        })
      });
      
      const data = await res.json();
      if (data.success) {
        alert(t('chat.translating') + " -> " + "Uploaded to China platforms!");
      }
    } catch (err) {
      console.error(err);
      alert("China Upload failed. Please check your credentials.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-64 p-6">
        <header className="flex justify-end mb-6">
          <LanguageSwitcher />
        </header>
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{t('dashboard.title')}</h2>
                  <p className="text-zinc-500 text-sm">{t('dashboard.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setActiveTab('create');
                      setIsAutomationMode(true);
                      setStep(1);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <Sparkles className="w-5 h-5" />
                    수집 및 판매 시작
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('create');
                      setIsAutomationMode(false);
                      setStep(1);
                    }}
                    className="bg-zinc-950 hover:bg-zinc-800 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-zinc-950/20 transition-all active:scale-95"
                  >
                    <Plus className="w-5 h-5" />
                    {t('buttons.createVideo')}
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                  { label: t('stats.totalVideos'), value: projects.length, icon: Video, color: 'bg-[#1428A0]' },
                  { label: t('stats.totalViews'), value: '12.4k', icon: BarChart3, color: 'bg-[#1E88E5]' },
                  { label: t('stats.avgCtr'), value: '4.2%', icon: Sparkles, color: 'bg-[#FF7A00]' },
                  { label: t('stats.conversions'), value: '128', icon: CheckCircle2, color: 'bg-emerald-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
                    <div className={`${stat.color} w-8 h-8 rounded-lg flex items-center justify-center mb-3`}>
                      <stat.icon className="text-white w-4 h-4" />
                    </div>
                    <p className="text-zinc-500 text-xs font-medium">{stat.label}</p>
                    <p className="text-xl font-bold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Projects Grid */}
              <h3 className="text-xl font-bold mb-6">{t('dashboard.recentProjects')}</h3>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
                </div>
              ) : projects.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-zinc-200 rounded-[32px] h-64 flex flex-col items-center justify-center text-zinc-400">
                  <Video className="w-12 h-12 mb-4 opacity-20" />
                  <p>{t('dashboard.noVideos')}</p>
                  <button onClick={() => setActiveTab('create')} className="text-emerald-500 font-bold mt-2 hover:underline">{t('dashboard.createFirst')}</button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <motion.div 
                      key={project.id}
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setCurrentProject(project);
                        setStep(3);
                        setActiveTab('create');
                      }}
                      className="bg-white rounded-[32px] overflow-hidden border border-zinc-200 shadow-sm group cursor-pointer"
                    >
                      <div className="aspect-[16/9] bg-zinc-100 relative">
                        {project.scenes[0]?.imageUrl && (
                          <img src={project.scenes[0].imageUrl} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-black fill-current ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-lg truncate">{project.name}</h4>
                        <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{project.product_description}</p>
                        <div className="flex items-center justify-between mt-6">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            {new Date(project.created_at).toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"><Download className="w-4 h-4 text-zinc-600" /></button>
                            <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"><Share2 className="w-4 h-4 text-zinc-600" /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black tracking-tight mb-4">{t('create.title')}</h2>
                <p className="text-zinc-500 text-lg">{t('create.subtitle')}</p>
              </div>

              {step === 1 && (
                <div className="bg-white p-12 rounded-[48px] border border-zinc-200 shadow-xl max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-bold text-zinc-400 uppercase tracking-widest">{t('create.label')}</label>
                        <button 
                          onClick={() => setIsAutomationMode(!isAutomationMode)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                            isAutomationMode ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-zinc-100 text-zinc-500 border border-zinc-200'
                          }`}
                        >
                          <Sparkles className={`w-3 h-3 ${isAutomationMode ? 'text-emerald-500' : 'text-zinc-400'}`} />
                          {isAutomationMode ? 'Full Automation ON' : 'Full Automation OFF'}
                        </button>
                      </div>
                      <textarea
                        value={productInput}
                        onChange={(e) => setProductInput(e.target.value)}
                        placeholder={isAutomationMode ? "Enter a keyword (e.g., 'Wireless Earbuds') to start full automation..." : t('create.placeholder')}
                        className="w-full h-40 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 text-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                      />
                    </div>
                    {isAutomationMode && (
                      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 space-y-3">
                        <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Automation Workflow
                        </p>
                        <ul className="text-[11px] text-emerald-700 space-y-1 font-medium">
                          <li>• Automatic Wholesale Collection (Best Price)</li>
                          <li>• AI Product Analysis & Viral Scripting</li>
                          <li>• Auto-Registration to 11st, Gmarket, etc.</li>
                          <li>• AI Marketing Video Generation</li>
                          <li>• Global SNS & China Platform Distribution</li>
                        </ul>
                      </div>
                    )}
                    <button
                      disabled={!productInput || isGenerating}
                      onClick={() => setStep(2)}
                      className={`w-full py-5 rounded-3xl font-bold text-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 ${
                        isAutomationMode ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' : 'bg-zinc-950 text-white hover:bg-zinc-800'
                      }`}
                    >
                      {isAutomationMode ? '수집 및 판매 시작' : t('buttons.next')}
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-lg">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Sparkles className="text-emerald-500 w-6 h-6" />
                        {t('create.engine')}
                      </h3>
                      
                      <div className="space-y-4">
                        {generationLogs.map((log, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-3 text-sm font-medium text-zinc-600"
                          >
                            <div className="mt-1">
                              {log.startsWith('✅') ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                               log.startsWith('🎬') ? <Video className="w-4 h-4 text-blue-500" /> :
                               log.startsWith('❌') ? <AlertCircle className="w-4 h-4 text-red-500" /> :
                               <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />}
                            </div>
                            <span>{log.replace(/^[✅🎬❌🔍✍️🎨]\s*/, '')}</span>
                          </motion.div>
                        ))}
                      </div>

                      {!isGenerating && generationLogs.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-zinc-400 mb-8">{t('create.ready')}</p>
                          <button
                            onClick={handleGenerate}
                            className={`px-10 py-5 rounded-3xl font-bold text-xl shadow-lg transition-all hover:scale-105 ${
                              isAutomationMode ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-zinc-950 text-white shadow-zinc-950/10'
                            }`}
                          >
                            {isAutomationMode ? '수집 및 판매 자동화 실행' : t('buttons.start')}
                          </button>
                        </div>
                      )}

                      {isGenerating && (
                        <div className="mt-12 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                          <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                          <p className="text-emerald-700 font-bold">{t('create.working')}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sticky top-10">
                    <div className="bg-zinc-200 aspect-[9/16] rounded-[40px] flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden">
                      <div className="text-center p-10">
                        <Video className="w-16 h-16 text-zinc-400 mx-auto mb-4 opacity-20" />
                        <p className="text-zinc-400 font-medium">{t('create.preview')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && currentProject.scenes && (
                <div className="grid grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-lg">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold">{t('create.complete')}</h3>
                        <div className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Success</div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{t('create.projectName')}</label>
                          <p className="text-xl font-bold">{currentProject.name}</p>
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{t('create.scriptLabel')}</label>
                          <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 space-y-4">
                            <p><span className="text-emerald-600 font-bold">Hook:</span> {currentProject.script?.hook}</p>
                            <p><span className="text-blue-600 font-bold">Problem:</span> {currentProject.script?.problem}</p>
                            <p><span className="text-purple-600 font-bold">Solution:</span> {currentProject.script?.solution}</p>
                            <p><span className="text-amber-600 font-bold">CTA:</span> {currentProject.script?.cta}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button className="flex-1 bg-zinc-950 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all">
                            <Download className="w-5 h-5" />
                            {t('buttons.download')}
                          </button>
                          <button 
                            onClick={handleSocialUpload}
                            disabled={isUploading}
                            className="flex-1 bg-[#1428A0] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#0d1b6e] transition-all disabled:opacity-50"
                          >
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                            {isUploading ? t('buttons.uploading') : t('buttons.uploadAll')}
                          </button>
                        </div>
                        <button 
                          onClick={handleChinaUpload}
                          disabled={isUploading}
                          className="w-full mt-4 bg-red-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all disabled:opacity-50"
                        >
                          {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
                          {isUploading ? t('buttons.uploading') : t('buttons.uploadChina')}
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => { setStep(1); setProductInput(''); setGenerationLogs([]); setActiveTab('dashboard'); }}
                      className="w-full py-4 text-zinc-500 font-bold hover:text-zinc-800 transition-colors"
                    >
                      {t('buttons.another')}
                    </button>
                  </div>

                  <div className="sticky top-10">
                    <VideoPreview scenes={currentProject.scenes} />
                  </div>
                </div>
              )}
            </motion.div>
          )}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AnalyticsView />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SettingsView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <ChatWidget />
      <AIWidget />
    </div>
  );
}
