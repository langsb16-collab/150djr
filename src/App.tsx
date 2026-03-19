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
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Shield,
  Bell,
  User,
  Key,
  Zap,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Project, Scene, Script } from './types';
import { analyzeProduct, generateMarketingScript, generateSceneImage, generateVoiceover } from './lib/gemini';
import { runFullAutomation } from './lib/automation';

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ChatWidget } from './components/ChatWidget';
import { AIWidget } from './components/AIWidget';
import { LanguageSwitcher } from './components/LanguageSwitcher';

// --- Dark Mode Glass Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) => {
  const { t } = useLanguage();
  return (
    <div className="w-64 bg-[#0B1220] border-r border-white/10 h-screen flex flex-col p-6 fixed left-0 top-0 backdrop-blur-xl">
      {/* Logo with Glow */}
      <div className="flex items-center gap-3 mb-12 group">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1E6BFF] to-[#4C8DFF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(30,107,255,0.5)] group-hover:shadow-[0_0_30px_rgba(30,107,255,0.7)] transition-all">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">AdBrain AI</h1>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: t('nav.home') },
          { id: 'create', icon: Zap, label: t('nav.features') },
          { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
          { id: 'settings', icon: Settings, label: t('nav.settings') },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
              activeTab === item.id 
                ? 'bg-[#1E6BFF]/20 text-white shadow-[0_0_12px_rgba(30,107,255,0.3)] border border-[#1E6BFF]/30' 
                : 'text-[#9FB0C3] hover:text-white hover:bg-white/5 hover:shadow-[0_0_8px_rgba(30,107,255,0.2)]'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-[#1E6BFF]' : ''}`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Pro Upgrade Card */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="bg-gradient-to-br from-[#1E6BFF]/10 to-[#4C8DFF]/5 rounded-2xl p-4 border border-[#1E6BFF]/20 backdrop-blur-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E6BFF]/5 to-transparent"></div>
          <div className="relative">
            <p className="text-xs text-[#9FB0C3] mb-2 uppercase tracking-widest font-bold">{t('sidebar.plan')}</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-[#1E6BFF] to-[#4C8DFF] w-3/4 rounded-full shadow-[0_0_8px_rgba(30,107,255,0.5)]" />
            </div>
            <p className="text-[10px] text-[#9FB0C3] mt-2">{t('sidebar.remaining')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[0_0_30px_rgba(30,107,255,0.1)] ${className}`}>
    {children}
  </div>
);

const KPICard = ({ label, value, change, icon: Icon, trend }: any) => (
  <GlassCard className="p-6 hover:shadow-[0_0_40px_rgba(30,107,255,0.2)] transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${
        trend === 'up' ? 'from-emerald-500/20 to-emerald-600/10' : 'from-[#1E6BFF]/20 to-[#4C8DFF]/10'
      }`}>
        <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-emerald-400' : 'text-[#1E6BFF]'}`} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-bold ${
        trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-[#9FB0C3]'
      }`}>
        {change && (
          <>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {change}
          </>
        )}
      </div>
    </div>
    <p className="text-[#9FB0C3] text-sm font-medium mb-2">{label}</p>
    <p className="text-white text-3xl font-black tracking-tight">{value}</p>
  </GlassCard>
);

const EmptyState = ({ onCreateClick }: { onCreateClick: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <GlassCard className="h-[500px] flex flex-col items-center justify-center text-center p-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-[#1E6BFF]/20 to-[#4C8DFF]/10 rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(30,107,255,0.3)]">
          <Video className="w-12 h-12 text-[#1E6BFF]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{t('dashboard.emptyTitle')}</h3>
        <p className="text-[#9FB0C3] text-lg mb-3">{t('dashboard.emptySubtitle1')}</p>
        <p className="text-[#9FB0C3] mb-8">{t('dashboard.emptySubtitle2')}</p>
        <button 
          onClick={onCreateClick}
          className="bg-gradient-to-r from-[#1E6BFF] to-[#4C8DFF] text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(30,107,255,0.5)] transition-all flex items-center gap-2 mx-auto group"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          {t('dashboard.emptyButton')}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </GlassCard>
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
    <div className="relative aspect-[9/16] w-full max-w-[360px] bg-black rounded-[32px] overflow-hidden shadow-2xl border-[8px] border-[#0B1220] mx-auto">
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
              <div className="w-full h-full bg-[#0B1220] flex items-center justify-center">
                <Video className="w-12 h-12 text-[#1E6BFF]" />
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            
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

// Main App Content
function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
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
      const videoUrl = currentProject.scenes[0].imageUrl;
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
    <div className="min-h-screen bg-[#0B1220] text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="ml-64 p-8">
        <header className="flex justify-end mb-8">
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
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white mb-2">{t('dashboard.title')}</h2>
                  <p className="text-[#9FB0C3] text-base">{t('dashboard.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setActiveTab('create');
                      setIsAutomationMode(true);
                      setStep(1);
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all group"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {t('buttons.collectAndSell')}
                  </button>
                  <button 
                    onClick={() => {
                      setActiveTab('create');
                      setIsAutomationMode(false);
                      setStep(1);
                    }}
                    className="bg-gradient-to-r from-[#1E6BFF] to-[#4C8DFF] hover:shadow-[0_0_30px_rgba(30,107,255,0.5)] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all group"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    {t('buttons.createVideo')}
                  </button>
                </div>
              </div>

              {/* KPI Cards with Change Indicators */}
              <div className="grid grid-cols-4 gap-6 mb-12">
                <KPICard 
                  label={t('stats.totalVideos')} 
                  value={projects.length} 
                  change="+18.2%" 
                  trend="up"
                  icon={Video} 
                />
                <KPICard 
                  label={t('stats.totalViews')} 
                  value="12.4k" 
                  change="+24.5%" 
                  trend="up"
                  icon={BarChart3} 
                />
                <KPICard 
                  label={t('stats.avgCtr')} 
                  value="4.2%" 
                  change="+2.1%" 
                  trend="up"
                  icon={Target} 
                />
                <KPICard 
                  label={t('stats.conversions')} 
                  value="128" 
                  change="+12.3%" 
                  trend="up"
                  icon={CheckCircle2} 
                />
              </div>

              <h3 className="text-2xl font-bold mb-6 text-white">{t('dashboard.recentProjects')}</h3>
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1E6BFF]" />
                </div>
              ) : projects.length === 0 ? (
                <EmptyState onCreateClick={() => {
                  setActiveTab('create');
                  setStep(1);
                }} />
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <motion.div 
                      key={project.id}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => {
                        setCurrentProject(project);
                        setStep(3);
                        setActiveTab('create');
                      }}
                      className="cursor-pointer"
                    >
                      <GlassCard className="overflow-hidden group hover:shadow-[0_0_40px_rgba(30,107,255,0.3)] transition-all">
                        <div className="aspect-[16/9] bg-[#0B1220] relative overflow-hidden">
                          {project.scenes[0]?.imageUrl && (
                            <img src={project.scenes[0].imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Preview" referrerPolicy="no-referrer" />
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                              <Play className="w-6 h-6 text-black fill-current ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="font-bold text-lg truncate text-white">{project.name}</h4>
                          <p className="text-[#9FB0C3] text-sm mt-2 line-clamp-2">{project.product_description}</p>
                          <div className="flex items-center justify-between mt-6">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9FB0C3]">
                              {new Date(project.created_at).toLocaleDateString()}
                            </span>
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <Download className="w-4 h-4 text-[#9FB0C3]" />
                              </button>
                              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <Share2 className="w-4 h-4 text-[#9FB0C3]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
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
                <h2 className="text-4xl font-black tracking-tight text-white mb-4">{t('create.title')}</h2>
                <p className="text-[#9FB0C3] text-lg">{t('create.subtitle')}</p>
              </div>

              {step === 1 && (
                <GlassCard className="p-12 max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-bold text-[#9FB0C3] uppercase tracking-widest">{t('create.label')}</label>
                        <button 
                          onClick={() => setIsAutomationMode(!isAutomationMode)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                            isAutomationMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-[#9FB0C3] border border-white/10'
                          }`}
                        >
                          <Sparkles className={`w-3 h-3 ${isAutomationMode ? 'text-emerald-400' : 'text-[#9FB0C3]'}`} />
                          {isAutomationMode ? t('create.automationOn') : t('create.automationOff')}
                        </button>
                      </div>
                      <textarea
                        value={productInput}
                        onChange={(e) => setProductInput(e.target.value)}
                        placeholder={isAutomationMode ? t('create.placeholderAuto') : t('create.placeholder')}
                        className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-lg text-white placeholder:text-[#9FB0C3]/50 focus:ring-2 focus:ring-[#1E6BFF]/50 focus:border-[#1E6BFF]/50 outline-none transition-all resize-none backdrop-blur-xl"
                      />
                    </div>
                    {isAutomationMode && (
                      <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 space-y-3 backdrop-blur-xl">
                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {t('create.automationTitle')}
                        </p>
                        <ul className="text-[11px] text-emerald-300 space-y-1 font-medium">
                          {t('create.automationSteps').map((step: string, index: number) => (
                            <li key={index}>• {step}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      disabled={!productInput || isGenerating}
                      onClick={() => setStep(2)}
                      className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 group ${
                        isAutomationMode ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-[#1E6BFF] to-[#4C8DFF] text-white shadow-[0_0_30px_rgba(30,107,255,0.3)] hover:shadow-[0_0_40px_rgba(30,107,255,0.5)]'
                      }`}
                    >
                      {isAutomationMode ? t('buttons.collectAndSell') : t('buttons.next')}
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </GlassCard>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <GlassCard className="p-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                        <Sparkles className="text-[#1E6BFF] w-6 h-6" />
                        {t('create.engine')}
                      </h3>
                      
                      <div className="space-y-4">
                        {generationLogs.map((log, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-3 text-sm font-medium text-[#9FB0C3]"
                          >
                            <div className="mt-1">
                              {log.startsWith('✅') ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : 
                               log.startsWith('🎬') ? <Video className="w-4 h-4 text-[#1E6BFF]" /> :
                               log.startsWith('❌') ? <AlertCircle className="w-4 h-4 text-red-500" /> :
                               <Loader2 className="w-4 h-4 animate-spin text-[#1E6BFF]" />}
                            </div>
                            <span>{log.replace(/^[✅🎬❌🔍✍️🎨]\s*/, '')}</span>
                          </motion.div>
                        ))}
                      </div>

                      {!isGenerating && generationLogs.length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-[#9FB0C3] mb-8">{t('create.ready')}</p>
                          <button
                            onClick={handleGenerate}
                            className={`px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:scale-105 group ${
                              isAutomationMode ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-gradient-to-r from-[#1E6BFF] to-[#4C8DFF] text-white shadow-[0_0_30px_rgba(30,107,255,0.3)]'
                            }`}
                          >
                            {isAutomationMode ? t('buttons.collectAndSell') : t('buttons.start')}
                          </button>
                        </div>
                      )}

                      {isGenerating && (
                        <div className="mt-12 p-6 bg-[#1E6BFF]/10 rounded-2xl border border-[#1E6BFF]/20 flex items-center gap-4 backdrop-blur-xl">
                          <Loader2 className="w-6 h-6 animate-spin text-[#1E6BFF]" />
                          <p className="text-[#1E6BFF] font-bold">{t('create.working')}</p>
                        </div>
                      )}
                    </GlassCard>
                  </div>

                  <div className="sticky top-10">
                    <GlassCard className="aspect-[9/16] rounded-[40px] flex items-center justify-center overflow-hidden">
                      <div className="text-center p-10">
                        <Video className="w-16 h-16 text-[#1E6BFF] mx-auto mb-4 opacity-30" />
                        <p className="text-[#9FB0C3] font-medium">{t('create.preview')}</p>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              )}

              {step === 3 && currentProject.scenes && (
                <div className="grid grid-cols-2 gap-12 items-start">
                  <div className="space-y-8">
                    <GlassCard className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-white">{t('create.complete')}</h3>
                        <div className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/30">Success</div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-bold text-[#9FB0C3] uppercase tracking-widest mb-2">{t('create.projectName')}</label>
                          <p className="text-xl font-bold text-white">{currentProject.name}</p>
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-bold text-[#9FB0C3] uppercase tracking-widest mb-2">{t('create.scriptLabel')}</label>
                          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 backdrop-blur-xl">
                            <p className="text-[#9FB0C3]"><span className="text-emerald-400 font-bold">Hook:</span> {currentProject.script?.hook}</p>
                            <p className="text-[#9FB0C3]"><span className="text-[#1E6BFF] font-bold">Problem:</span> {currentProject.script?.problem}</p>
                            <p className="text-[#9FB0C3]"><span className="text-purple-400 font-bold">Solution:</span> {currentProject.script?.solution}</p>
                            <p className="text-[#9FB0C3]"><span className="text-amber-400 font-bold">CTA:</span> {currentProject.script?.cta}</p>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                            <Download className="w-5 h-5" />
                            {t('buttons.download')}
                          </button>
                          <button 
                            onClick={handleSocialUpload}
                            disabled={isUploading}
                            className="flex-1 bg-gradient-to-r from-[#1E6BFF] to-[#4C8DFF] hover:shadow-[0_0_30px_rgba(30,107,255,0.5)] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                          >
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                            {isUploading ? t('buttons.uploading') : t('buttons.uploadAll')}
                          </button>
                        </div>
                        <button 
                          onClick={handleChinaUpload}
                          disabled={isUploading}
                          className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                          {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
                          {isUploading ? t('buttons.uploading') : t('buttons.uploadChina')}
                        </button>
                      </div>
                    </GlassCard>

                    <button 
                      onClick={() => { setStep(1); setProductInput(''); setGenerationLogs([]); setActiveTab('dashboard'); }}
                      className="w-full py-4 text-[#9FB0C3] font-bold hover:text-white transition-colors"
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
              className="space-y-8"
            >
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white mb-2">{t('analytics.title')}</h2>
                  <p className="text-[#9FB0C3] text-base">{t('analytics.subtitle')}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <GlassCard className="p-8">
                    <h3 className="text-lg font-bold mb-6 text-white">{t('analytics.viewsOverTime')}</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { name: 'Mon', views: 4000 },
                          { name: 'Tue', views: 3000 },
                          { name: 'Wed', views: 2000 },
                          { name: 'Thu', views: 2780 },
                          { name: 'Fri', views: 1890 },
                          { name: 'Sat', views: 2390 },
                          { name: 'Sun', views: 3490 },
                        ]}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1E6BFF" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#1E6BFF" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9FB0C3', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#9FB0C3', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(11,18,32,0.95)', 
                              border: '1px solid rgba(255,255,255,0.1)', 
                              borderRadius: '12px',
                              backdropFilter: 'blur(12px)'
                            }}
                            labelStyle={{ color: '#E6EDF3' }}
                          />
                          <Area type="monotone" dataKey="views" stroke="#1E6BFF" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </div>

                <GlassCard className="p-8">
                  <h3 className="text-lg font-bold mb-6 text-white">{t('analytics.platformDistribution')}</h3>
                  <div className="space-y-6">
                    {[
                      { name: 'TikTok', value: 45, color: '#FF0050' },
                      { name: 'Instagram', value: 30, color: '#E1306C' },
                      { name: 'YouTube', value: 15, color: '#FF0000' },
                      { name: 'Facebook', value: 10, color: '#1877F2' },
                    ].map((platform) => (
                      <div key={platform.name} className="space-y-2">
                        <div className="flex justify-between text-sm font-medium text-white">
                          <span>{platform.name}</span>
                          <span className="text-[#9FB0C3]">{platform.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-xl">
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
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white mb-2">{t('settings.title')}</h2>
                <p className="text-[#9FB0C3] text-base">{t('settings.subtitle')}</p>
              </div>

              <GlassCard className="p-8">
                <h3 className="text-xl font-bold mb-6 text-white">Profile Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#9FB0C3] uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" defaultValue="Marketer Mark" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E6BFF]/50 backdrop-blur-xl" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9FB0C3] uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" defaultValue="mark@adbrain.ai" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1E6BFF]/50 backdrop-blur-xl" />
                  </div>
                  <button className="bg-gradient-to-r from-[#1E6BFF] to-[#4C8DFF] text-white px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(30,107,255,0.5)] transition-all">
                    {t('settings.save')}
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <ChatWidget />
      <AIWidget />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
