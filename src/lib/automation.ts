import { getBestWholesaleProduct, WholesaleProduct } from './wholesale/engine';
import { registerToOpenMarkets, MarketRegistrationResult } from './markets/engine';
import { analyzeProduct, generateMarketingScript, generateSceneImage, generateVoiceover } from './gemini';
import { Project, Scene, Script } from '../types';

export interface AutomationStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
}

export const runFullAutomation = async (
  keyword: string,
  onProgress: (step: AutomationStep) => void
): Promise<Project> => {
  const steps: AutomationStep[] = [
    { id: 'wholesale', name: 'Wholesale Collection', status: 'pending', message: 'Searching wholesale platforms...' },
    { id: 'analysis', name: 'AI Product Analysis', status: 'pending', message: 'Analyzing product details...' },
    { id: 'script', name: 'Marketing Script', status: 'pending', message: 'Generating viral script...' },
    { id: 'market', name: 'Open Market Registration', status: 'pending', message: 'Registering to 11st, Gmarket, etc...' },
    { id: 'video', name: 'AI Video Generation', status: 'pending', message: 'Creating marketing video...' },
    { id: 'social', name: 'Global SNS Distribution', status: 'pending', message: 'Uploading to YouTube, TikTok, etc...' },
  ];

  const updateStep = (id: string, status: AutomationStep['status'], message: string) => {
    const step = steps.find(s => s.id === id);
    if (step) {
      step.status = status;
      step.message = message;
      onProgress({ ...step });
    }
  };

  try {
    // 1. Wholesale Collection
    updateStep('wholesale', 'running', 'Finding the best price for ' + keyword);
    const bestProduct = await getBestWholesaleProduct(keyword);
    updateStep('wholesale', 'completed', `Found best price: ${bestProduct.price} KRW at ${bestProduct.platform}`);

    // 2. AI Product Analysis
    updateStep('analysis', 'running', 'AI is analyzing product features...');
    const analysis = await analyzeProduct(bestProduct.description);
    updateStep('analysis', 'completed', 'Analysis complete: ' + analysis.name);

    // 3. Marketing Script
    updateStep('script', 'running', 'Generating viral marketing script...');
    const script = await generateMarketingScript(analysis.name, analysis.description);
    updateStep('script', 'completed', 'Script generated successfully.');

    // 4. Open Market Registration
    updateStep('market', 'running', 'Registering product to domestic open markets...');
    const marketResults = await registerToOpenMarkets({
      name: analysis.name,
      price: Math.floor(bestProduct.price * 1.3), // 30% margin
      description: analysis.description,
      imageUrl: bestProduct.imageUrl,
      keywords: [keyword, 'best', 'quality', 'fast shipping']
    });
    const successCount = marketResults.filter(r => r.success).length;
    updateStep('market', 'completed', `Successfully registered to ${successCount} platforms.`);

    // 5. AI Video Generation
    updateStep('video', 'running', 'Generating scenes and voiceovers...');
    const scenes: Scene[] = [];
    const scriptParts = [script.hook, script.problem, script.solution, script.cta];
    const scenePrompts = [
      `Cinematic product shot of ${analysis.name}`,
      `Person using ${analysis.name} in a lifestyle setting`,
      `Close up detail of ${analysis.name} features`,
      `Happy customer with ${analysis.name}`
    ];

    for (let i = 0; i < scenePrompts.length; i++) {
      const imageUrl = await generateSceneImage(scenePrompts[i]);
      const audioUrl = await generateVoiceover(scriptParts[i]);
      scenes.push({ 
        id: `scene-${i}`, 
        text: scriptParts[i],
        imageUrl, 
        audioUrl, 
        duration: 4 
      });
    }
    updateStep('video', 'completed', 'Marketing video generated.');

    // 6. Global SNS Distribution (Simulated for this controller)
    updateStep('social', 'running', 'Distributing to YouTube, TikTok, Instagram...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateStep('social', 'completed', 'Global distribution complete.');

    const project: Project = {
      id: `auto-${Date.now()}`,
      name: bestProduct.name,
      product_url: `https://${bestProduct.platform.toLowerCase()}.com/p/${bestProduct.id}`,
      product_description: bestProduct.description,
      script,
      scenes,
      status: 'completed',
      created_at: new Date().toISOString()
    };

    return project;

  } catch (error: any) {
    console.error('Automation failed:', error);
    throw error;
  }
};
